import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SEARCH_ROOTS = [
	ROOT,
	path.join(ROOT, "src"),
	path.join(ROOT, "src", "content"),
	path.join(ROOT, "docs"),
];
const TARGET_EXTENSIONS = new Set([".md", ".mdx"]);
const OLD_PREFIX =
	process.argv[2] ||
	"https://raw.githubusercontent.com/mayuhaos/blog-images/notepix/";
const NEW_PREFIX =
	process.argv[3] ||
	"https://cdn.jsdelivr.net/gh/mayuhaos/blog-images@notepix/";
const SKIP_DIRS = new Set([
	".astro",
	".git",
	".idea",
	".codex",
	"dist",
	"node_modules",
	"public",
]);

let changedFiles = 0;
let replacementCount = 0;
const visitedDirs = new Set();

if (OLD_PREFIX === NEW_PREFIX) {
	console.error("Old prefix and new prefix are identical. Nothing to replace.");
	process.exit(1);
}

for (const root of SEARCH_ROOTS) {
	await replaceInDirectory(root);
}

console.log(
	`Replaced ${replacementCount} occurrence(s) in ${changedFiles} file(s).`,
);

async function replaceInDirectory(dir) {
	const normalizedDir = path.resolve(dir);
	if (visitedDirs.has(normalizedDir)) {
		return;
	}
	visitedDirs.add(normalizedDir);

	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (SKIP_DIRS.has(entry.name)) {
					continue;
				}
				await replaceInDirectory(fullPath);
				continue;
			}

			if (!TARGET_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
				continue;
			}

			await replaceInFile(fullPath);
		}
	} catch (error) {
		if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
			return;
		}
		throw error;
	}
}

async function replaceInFile(filePath) {
	const source = await fs.readFile(filePath, "utf8");
	const matches = source.matchAll(new RegExp(escapeRegExp(OLD_PREFIX), "g"));
	const count = Array.from(matches).length;

	if (count === 0) {
		return;
	}

	const updated = source.split(OLD_PREFIX).join(NEW_PREFIX);
	await fs.writeFile(filePath, updated, "utf8");
	changedFiles += 1;
	replacementCount += count;
	console.log(`${path.relative(ROOT, filePath)}: ${count}`);
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
