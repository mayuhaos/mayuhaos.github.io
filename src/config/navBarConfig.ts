import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";

const getDynamicNavBarConfig = (): NavBarConfig => {
	const links: (NavBarLink | LinkPreset)[] = [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Diary,
	];

	if (siteConfig.pages.guestbook) {
		links.push(LinkPreset.Guestbook);
	}

	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			...(siteConfig.pages.gallery ? [LinkPreset.Gallery] : []),
			...(siteConfig.pages.bangumi ? [LinkPreset.Bangumi] : []),
			{
				name: "所谓道",
				url: "/dao/",
				icon: "material-symbols:auto-stories",
			},
		],
	});

	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: [
			...(siteConfig.pages.sponsor ? [LinkPreset.Sponsor] : []),
			LinkPreset.About,
			...(siteConfig.pages.friends ? [LinkPreset.Friends] : []),
		],
	});

	links.push({
		name: "链接",
		url: "/links/",
		icon: "material-symbols:link",
		children: [
			{
				name: "GitHub",
				url: "https://github.com/mayuhaos",
				external: true,
				icon: "fa7-brands:github",
			},
			{
				name: "Gitee",
				url: "https://gitee.com/yhstu",
				external: true,
				icon: "fa7-brands:gitee",
			},
			{
				name: "CSDN",
				url: "https://blog.csdn.net/qq_47913744?spm=1000.2115.3001.5343",
				external: true,
				icon: "fa7-brands:blogger",
			},
			{
				name: "QQ",
				url: "https://wpa.qq.com/msgrd?v=3&uin=1757442521&site=qq&menu=yes",
				external: true,
				icon: "fa7-brands:qq",
			},
			{
				name: "AI-token中转站",
				url: "https://cn.chrouter.com:8443/",
				external: true,
				icon: "material-symbols:token",
			},
		],
	});

	return { links } as NavBarConfig;
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
