import {
	getSortedDao,
	getSortedDiary,
	getSortedPosts,
} from "@/utils/content-utils";
import {
	getDaoUrlBySlug,
	getDiaryUrlBySlug,
	getPostUrlBySlug,
} from "@/utils/url-utils";

export async function GET() {
	const posts = await getSortedPosts();
	const diaryEntries = await getSortedDiary();
	const daoEntries = await getSortedDao();

	const allPostsData = [
		...posts.map((post) => ({
			id: post.id,
			title: post.data.title,
			description: post.data.description,
			published: post.data.published.getTime(),
			category: post.data.category || "",
			password: !!post.data.password,
			collection: "posts",
			url: getPostUrlBySlug(post.id),
		})),
		...diaryEntries.map((entry) => ({
			id: entry.id,
			title: entry.data.title,
			description: entry.data.description,
			published: entry.data.date.getTime(),
			category: "diary",
			password: false,
			collection: "diary",
			url: getDiaryUrlBySlug(entry.id),
		})),
		...daoEntries.map((entry) => ({
			id: entry.id,
			title: entry.data.title,
			description: entry.data.description || "",
			published: entry.data.published.getTime(),
			category: entry.data.category || "",
			password: !!entry.data.password,
			collection: "dao",
			url: getDaoUrlBySlug(entry.id),
		})),
	].sort((a, b) => b.published - a.published);

	return new Response(JSON.stringify(allPostsData));
}
