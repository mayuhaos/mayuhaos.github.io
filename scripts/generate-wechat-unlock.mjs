import fs from "node:fs/promises";
import path from "node:path";
import { createCipheriv, createHmac, pbkdf2Sync } from "node:crypto";
import matter from "gray-matter";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "wechat-unlock.json");
const SECRET = process.env.WECHAT_UNLOCK_SECRET || "change-me-in-actions-secret";
const WINDOW_MINUTES = Number(process.env.WECHAT_UNLOCK_WINDOW_MINUTES || "1440");
const WINDOW_MS = WINDOW_MINUTES * 60 * 1000;
const SALT_LEN = 16;
const IV_LEN = 12;
const TAG_LEN = 16;
const KEY_LEN = 32;
const ITERATIONS = 100000;
const CONTENT_ROOT = path.join(ROOT, "src", "content");
const COLLECTIONS = ["posts", "dao"];

if (!SECRET || SECRET === "change-me-in-actions-secret") {
	console.error("WECHAT_UNLOCK_SECRET is missing.");
	process.exit(1);
}

const windowStartMs = Math.floor(Date.now() / WINDOW_MS) * WINDOW_MS;
const currentWindow = buildWindow(windowStartMs);
const nextWindow = buildWindow(windowStartMs + WINDOW_MS);

const articleMap = await collectProtectedArticles();
const payload = {
	ok: true,
	generatedAt: new Date().toISOString(),
	windowMinutes: WINDOW_MINUTES,
	windows: [currentWindow, nextWindow].map((item) => ({
		...item,
		articleKeys: wrapArticleKeys(item.code, articleMap),
	})),
};

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Generated ${path.relative(ROOT, OUTPUT_FILE)} with ${articleMap.size} protected article(s).`);

function buildWindow(windowStart) {
	const windowId = Math.floor(windowStart / WINDOW_MS);
	const code = buildDynamicCode(SECRET, windowId);
	return {
		windowId,
		code,
		startsAt: new Date(windowStart).toISOString(),
		expiresAt: new Date(windowStart + WINDOW_MS).toISOString(),
	};
}

function buildDynamicCode(secret, windowId) {
	return createHmac("sha256", secret)
		.update(String(windowId))
		.digest("hex")
		.slice(0, 8)
		.toUpperCase();
}

async function collectProtectedArticles() {
	const map = new Map();
	for (const collection of COLLECTIONS) {
		const dir = path.join(CONTENT_ROOT, collection);
		const files = await walkMarkdownFiles(dir);
		for (const file of files) {
			const source = await fs.readFile(file, "utf8");
			const { data } = matter(source);
			const password =
				typeof data.password === "string" ? data.password.trim() : "";
			if (!password) {
				continue;
			}

			const slug = path.relative(CONTENT_ROOT, file).replace(/\\/g, "/");
			for (const candidate of buildSlugCandidates(slug)) {
				map.set(candidate, password);
			}
		}
	}
	return map;
}

async function walkMarkdownFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkMarkdownFiles(fullPath)));
			continue;
		}
		if (/\.(md|mdx)$/i.test(entry.name)) {
			files.push(fullPath);
		}
	}
	return files;
}

function wrapArticleKeys(code, articleMap) {
	const wrapped = {};
	for (const [slug, articleKey] of articleMap.entries()) {
		wrapped[slug] = encryptValue(articleKey, code, slug);
	}
	return wrapped;
}

function buildSlugCandidates(slug) {
	const normalized = slug.replace(/^\/+|\/+$/g, "");
	const noExt = normalized.replace(/\.(md|mdx)$/i, "");
	return Array.from(
		new Set([normalized, noExt, `${noExt}.md`, `${noExt}.mdx`]),
	);
}

function deriveBytes(key, context, length) {
	return createHmac("sha256", key).update(context).digest().subarray(0, length);
}

function encryptValue(value, password, slug) {
	const salt = deriveBytes(password, `salt:${slug}`, SALT_LEN);
	const iv = deriveBytes(password, `iv:${slug}`, IV_LEN);
	const key = pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, "sha256");
	const cipher = createCipheriv("aes-256-gcm", key, iv);
	const encrypted = Buffer.concat([
		cipher.update(value, "utf8"),
		cipher.final(),
	]);
	const authTag = cipher.getAuthTag();
	return Buffer.concat([salt, iv, authTag, encrypted]).toString("base64");
}
