import type { GalleryConfig } from "@/types/config";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表
	albums: [
		// 支持 jpg/png/webp/avif/gif 格式
		// id: 相册唯一标识，用于目录命名和 URL 路径
		// cover: 手动指定封面，可选；未指定时优先取视频封面，再取 cover.* 或第一张图
		// videos: 可选的视频嵌入列表，适合 B 站等 iframe 内容
		{
			id: "qinghai",
			name: "高原的风",
			description: "天空很近，湖水很蓝，风吹过来都是自由的味道。",
			location: "青海",
			date: "2026-01-01",
			tags: ["青海"],
		},
		{
			id: "shanghai",
			name: "城市漫步",
			description: "霓虹与梧桐之间，记录属于这座城市的日常。",
			location: "上海",
			date: "2026-01-01",
			tags: ["上海"],
		},
		{
			id: "jiayoushaonian",
			name: "加油少年",
			description: "晨起，叠被，做一碗面。",
			location: "生活日常",
			date: "2026-05-11",
			tags: ["加油少年"],
			videos: [
				{
					title: "晨起，叠被，做一碗面。",
					embedUrl:
						"https://player.bilibili.com/player.html?bvid=BV1FQmcBWE6S&p=1&autoplay=0",
					cover:
						"https://i0.hdslb.com/bfs/archive/d82cb7c674a7fc4ef780f6768deb15bbfbcaaa54.jpg",
					description: "记录一个认真生活的清晨。",
				},
			],
		},
		{
			id: "nainai",
			name: "奶奶",
			description: "谨以此片，献给我最爱的奶奶。",
			location: "家庭记录",
			date: "2026-05-11",
			tags: ["奶奶"],
			videos: [
				{
					title: "纪录片《我的奶奶》谨以此片，献给我最爱的奶奶",
					embedUrl:
						"https://player.bilibili.com/player.html?bvid=BV1pgPMzpEqN&p=1&autoplay=0",
					cover:
						"https://i1.hdslb.com/bfs/archive/2b48703862f2bd96be4e63fb6ee1eec640c4bde1.jpg",
					description: "献给奶奶的一段影像记录。",
				},
			],
		},
	],

	// 瀑布流最小列宽(px)，浏览器会根据容器宽度自动计算列数
	columnWidth: 240,
};
