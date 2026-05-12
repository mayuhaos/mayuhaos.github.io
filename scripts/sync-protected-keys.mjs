import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const API_TOKEN = process.env.CF_API_TOKEN;
const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const KV_NAMESPACE_ID = process.env.CF_KV_NAMESPACE_ID;
const API_BASE = process.env.CF_API_BASE || "https://api.cloudflare.com/client/v4";
const DRY_RUN = process.env.DRY_RUN === "1";

const CONTENT_ROOTS = [
	{ dir: path.join(ROOT, "src", "content", "posts") },
	{ dir: path.join(ROOT, "src", "content", "dao") },
];

if (!API_TOKEN || !ACCOUNT_ID || !KV_NAMESPACE_ID) {
	console.error(
		"Missing required env vars: CF_API_TOKEN, CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID",
	);
	process.exit(1);
}

const files = (
	await Promise.all(CONTENT_ROOTS.map(({ dir }) => walkMarkdownFiles(dir)))
).flat();

const keyMap = new Map();
let protectedArticleCount = 0;

for (const file of files) {
	const source = await fs.readFile(file, "utf8");
	const { data } = matter(source);
	const password =
		typeof data.password === "string" ? data.password.trim() : "";
	if (!password) {
		continue;
	}

	protectedArticleCount += 1;
	const slug = path
		.relative(path.join(ROOT, "src", "content"), file)
		.replace(/\\/g, "/");
	for (const candidate of buildSlugCandidates(slug)) {
		keyMap.set(`article-key:${candidate}`, password);
	}
}

console.log(
	`Found ${protectedArticleCount} protected article(s), syncing ${keyMap.size} KV key(s).`,
);

if (DRY_RUN) {
	for (const [key, value] of keyMap.entries()) {
		console.log(`${key} => ${value}`);
	}
	process.exit(0);
}

let successCount = 0;
for (const [key, value] of keyMap.entries()) {
	await putKvValue(key, value);
	successCount += 1;
	console.log(`Synced ${successCount}/${keyMap.size}: ${key}`);
}

console.log("Protected keys sync completed.");

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

function buildSlugCandidates(slug) {
	const normalized = slug.replace(/^\/+|\/+$/g, "");
	const noExt = normalized.replace(/\.(md|mdx)$/i, "");
	return Array.from(
		new Set([normalized, noExt, `${noExt}.md`, `${noExt}.mdx`]),
	);
}

async function putKvValue(key, value) {
	const url = new URL(
		`${API_BASE}/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${encodeURIComponent(key)}`,
	);
	const response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			"Content-Type": "text/plain; charset=utf-8",
		},
		body: value,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to sync ${key}: ${response.status} ${errorText}`);
	}
}
