interface KVNamespace {
	get(key: string): Promise<string | null>;
}

interface Env {
	PROTECTED_KEY_KV: KVNamespace;
	WECHAT_TOKEN?: string;
	DYNAMIC_CODE_SECRET?: string;
	ALLOWED_ORIGIN?: string;
	WECHAT_KEYWORD?: string;
	SITE_URL?: string;
}

const TEN_MINUTES_MS = 10 * 60 * 1000;
const SHANGHAI_TIMEZONE = "Asia/Shanghai";
const textEncoder = new TextEncoder();

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			const url = new URL(request.url);

			if (request.method === "OPTIONS") {
				return new Response(null, {
					status: 204,
					headers: buildCorsHeaders(request, env),
				});
			}

			if (url.pathname === "/debug/env") {
				return jsonResponse(
					{
						ok: true,
						hasWechatToken: Boolean(env.WECHAT_TOKEN),
						hasDynamicCodeSecret: Boolean(env.DYNAMIC_CODE_SECRET),
						hasAllowedOrigin: Boolean(env.ALLOWED_ORIGIN),
						hasWechatKeyword: Boolean(env.WECHAT_KEYWORD),
						hasSiteUrl: Boolean(env.SITE_URL),
						hasProtectedKeyKv: Boolean(env.PROTECTED_KEY_KV),
					},
					200,
					buildCorsHeaders(request, env),
				);
			}

			if (url.pathname === "/wechat/callback") {
				if (request.method === "GET") {
					return handleWechatVerify(url, env);
				}
				if (request.method === "POST") {
					return handleWechatMessage(request, url, env);
				}
			}

			if (url.pathname === "/api/unlock" && request.method === "POST") {
				return handleUnlock(request, env);
			}

			return jsonResponse(
				{ ok: false, message: "not_found" },
				404,
				buildCorsHeaders(request, env),
			);
		} catch (error) {
			const message =
				error instanceof Error ? `${error.name}: ${error.message}` : String(error);
			return new Response(`worker_error: ${message}`, {
				status: 500,
				headers: {
					"content-type": "text/plain; charset=utf-8",
				},
			});
		}
	},
};

async function handleWechatVerify(url: URL, env: Env): Promise<Response> {
	if (!env.WECHAT_TOKEN) {
		return new Response("wechat_token_missing", { status: 500 });
	}

	const signature = url.searchParams.get("signature") ?? "";
	const timestamp = url.searchParams.get("timestamp") ?? "";
	const nonce = url.searchParams.get("nonce") ?? "";
	const echostr = url.searchParams.get("echostr") ?? "";

	const isValid = await verifyWechatSignature(
		env.WECHAT_TOKEN,
		timestamp,
		nonce,
		signature,
	);

	return new Response(isValid ? echostr : "invalid signature", {
		status: isValid ? 200 : 401,
		headers: {
			"content-type": "text/plain; charset=utf-8",
		},
	});
}

async function handleWechatMessage(
	request: Request,
	url: URL,
	env: Env,
): Promise<Response> {
	if (!env.WECHAT_TOKEN) {
		return new Response("wechat_token_missing", { status: 500 });
	}

	const signature = url.searchParams.get("signature") ?? "";
	const timestamp = url.searchParams.get("timestamp") ?? "";
	const nonce = url.searchParams.get("nonce") ?? "";
	const isValid = await verifyWechatSignature(
		env.WECHAT_TOKEN,
		timestamp,
		nonce,
		signature,
	);

	if (!isValid) {
		return new Response("invalid signature", { status: 401 });
	}

	const xml = await request.text();
	const fromUser = extractXmlValue(xml, "FromUserName");
	const toUser = extractXmlValue(xml, "ToUserName");
	const msgType = extractXmlValue(xml, "MsgType").toLowerCase();
	const content = extractXmlValue(xml, "Content").trim();
	const keyword = (env.WECHAT_KEYWORD || "\u53e3\u4ee4").trim();

	let message = buildWechatHelpMessage(env, keyword);
	if (msgType === "text" && content === keyword) {
		if (!env.DYNAMIC_CODE_SECRET) {
			message =
				"\u53e3\u4ee4\u670d\u52a1\u5c1a\u672a\u5b8c\u6210\u914d\u7f6e\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002";
		} else {
			const window = getCurrentWindow();
			const code = await buildDynamicCode(env.DYNAMIC_CODE_SECRET, window);
			const expiresAt = new Date((window + 1) * TEN_MINUTES_MS);
			message = buildWechatUnlockMessage(env, keyword, code, expiresAt);
		}
	}

	return new Response(buildTextReplyXml(toUser, fromUser, message), {
		status: 200,
		headers: {
			"content-type": "application/xml; charset=utf-8",
		},
	});
}

async function handleUnlock(request: Request, env: Env): Promise<Response> {
	const corsHeaders = buildCorsHeaders(request, env);
	if (!env.DYNAMIC_CODE_SECRET) {
		return jsonResponse(
			{ ok: false, message: "unlock_service_not_configured" },
			500,
			corsHeaders,
		);
	}

	let payload: { slug?: string; code?: string };
	try {
		payload = (await request.json()) as { slug?: string; code?: string };
	} catch {
		return jsonResponse(
			{ ok: false, message: "invalid_request" },
			400,
			corsHeaders,
		);
	}

	const slug = payload.slug?.trim();
	const code = payload.code?.trim().toUpperCase();

	if (!slug || !code) {
		return jsonResponse(
			{ ok: false, message: "invalid_request" },
			400,
			corsHeaders,
		);
	}

	const window = getCurrentWindow();
	const expectedCode = await buildDynamicCode(env.DYNAMIC_CODE_SECRET, window);
	if (code !== expectedCode) {
		return jsonResponse(
			{ ok: false, message: "invalid_or_expired_code" },
			401,
			corsHeaders,
		);
	}

	const articleKey = await resolveArticleKey(env, slug);
	if (!articleKey) {
		return jsonResponse(
			{ ok: false, message: "article_key_not_found" },
			404,
			corsHeaders,
		);
	}

	const expiresAt = new Date((window + 1) * TEN_MINUTES_MS);
	return jsonResponse(
		{
			ok: true,
			key: articleKey,
			expiresAt: formatShanghaiIso(expiresAt),
		},
		200,
		corsHeaders,
	);
}

async function resolveArticleKey(
	env: Env,
	slug: string,
): Promise<string | null> {
	const candidates = buildSlugCandidates(slug);
	for (const candidate of candidates) {
		const value = await env.PROTECTED_KEY_KV.get(`article-key:${candidate}`);
		if (value) {
			return value;
		}
	}
	return null;
}

function buildSlugCandidates(slug: string): string[] {
	const normalized = slug.replace(/^\/+|\/+$/g, "");
	const noExt = normalized.replace(/\.(md|mdx)$/i, "");
	return Array.from(
		new Set([normalized, noExt, `${noExt}.md`, `${noExt}.mdx`]),
	);
}

function buildWechatHelpMessage(env: Env, keyword: string): string {
	const siteUrl = env.SITE_URL || firstAllowedOrigin(env) || "";
	return [
		"\u6b22\u8fce\u6765\u5230\u6587\u7ae0\u89e3\u9501\u52a9\u624b\u3002",
		`\u8bf7\u56de\u590d\u5173\u952e\u8bcd\u201c${keyword}\u201d\u83b7\u53d6\u5f53\u524d 10 \u5206\u949f\u6709\u6548\u53e3\u4ee4\u3002`,
		siteUrl ? `\u535a\u5ba2\u5730\u5740\uff1a${siteUrl}` : "",
	]
		.filter(Boolean)
		.join("\n");
}

function buildWechatUnlockMessage(
	env: Env,
	keyword: string,
	code: string,
	expiresAt: Date,
): string {
	const siteUrl = env.SITE_URL || firstAllowedOrigin(env) || "";
	return [
		"\u52a8\u6001\u53e3\u4ee4\u5df2\u751f\u6210\u3002",
		`\u5173\u952e\u8bcd\uff1a${keyword}`,
		`\u5f53\u524d\u53e3\u4ee4\uff1a${code}`,
		`\u5931\u6548\u65f6\u95f4\uff1a${formatShanghaiDateTime(expiresAt)}`,
		"\u8bf7\u56de\u5230\u6587\u7ae0\u9875\u9762\u8f93\u5165\u53e3\u4ee4\u89e3\u9501\u3002",
		siteUrl ? `\u535a\u5ba2\u5730\u5740\uff1a${siteUrl}` : "",
	]
		.filter(Boolean)
		.join("\n");
}

function buildTextReplyXml(
	toUser: string,
	fromUser: string,
	message: string,
): string {
	const createTime = Math.floor(Date.now() / 1000);
	return `<xml>
<ToUserName><![CDATA[${escapeCdata(fromUser)}]]></ToUserName>
<FromUserName><![CDATA[${escapeCdata(toUser)}]]></FromUserName>
<CreateTime>${createTime}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${escapeCdata(message)}]]></Content>
</xml>`;
}

function escapeCdata(value: string): string {
	return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

function extractXmlValue(xml: string, tag: string): string {
	const cdataPattern = new RegExp(
		`<${tag}><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>`,
		"s",
	);
	const plainPattern = new RegExp(`<${tag}>(.*?)<\\/${tag}>`, "s");
	return (
		xml.match(cdataPattern)?.[1] || xml.match(plainPattern)?.[1] || ""
	).trim();
}

function getCurrentWindow(now = Date.now()): number {
	return Math.floor(now / TEN_MINUTES_MS);
}

async function buildDynamicCode(
	secret: string,
	window: number,
): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw",
		textEncoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		textEncoder.encode(String(window)),
	);
	return toHex(signature).slice(0, 8).toUpperCase();
}

async function verifyWechatSignature(
	token: string,
	timestamp: string,
	nonce: string,
	signature: string,
): Promise<boolean> {
	const raw = [token, timestamp, nonce].sort().join("");
	const digest = await crypto.subtle.digest(
		"SHA-1",
		textEncoder.encode(raw),
	);
	return toHex(digest) === signature.toLowerCase();
}

function toHex(buffer: ArrayBuffer): string {
	return Array.from(new Uint8Array(buffer))
		.map((value) => value.toString(16).padStart(2, "0"))
		.join("");
}

function buildCorsHeaders(request: Request, env: Env): HeadersInit {
	const origin = request.headers.get("Origin");
	const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGIN);
	let allowOrigin = "*";

	if (origin && allowedOrigins.length > 0) {
		allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
	} else if (allowedOrigins.length > 0) {
		allowOrigin = allowedOrigins[0];
	}

	return {
		"Access-Control-Allow-Origin": allowOrigin,
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		Vary: "Origin",
	};
}

function parseAllowedOrigins(input?: string): string[] {
	return (input || "")
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}

function firstAllowedOrigin(env: Env): string | null {
	return parseAllowedOrigins(env.ALLOWED_ORIGIN)[0] || null;
}

function jsonResponse(
	data: Record<string, unknown>,
	status: number,
	headers?: HeadersInit,
): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			...headers,
		},
	});
}

function formatShanghaiDateTime(date: Date): string {
	const parts = new Intl.DateTimeFormat("zh-CN", {
		timeZone: SHANGHAI_TIMEZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).formatToParts(date);

	const map = Object.fromEntries(
		parts
			.filter((part) => part.type !== "literal")
			.map((part) => [part.type, part.value]),
	) as Record<string, string>;

	return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
}

function formatShanghaiIso(date: Date): string {
	return `${formatShanghaiDateTime(date).replace(" ", "T")}+08:00`;
}
