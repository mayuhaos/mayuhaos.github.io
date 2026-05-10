<script lang="ts">
	import I18nKey from "@/i18n/i18nKey";
	import { i18n } from "@/i18n/translation";
	import { getDiaryUrlBySlug } from "@/utils/url-utils";

	export let sortedDiary: DiaryEntry[] = [];

	interface DiaryEntry {
		id: string;
		data: {
			title: string;
			date: Date;
			weather: string;
			location: string;
			description: string;
			cover?: string;
		};
	}

	interface MonthGroup {
		year: number;
		month: number;
		entries: DiaryEntry[];
	}

	interface YearGroup {
		year: number;
		months: MonthGroup[];
	}

	let groups: YearGroup[] = [];
	let expandedYears = new Set<number>();
	let expandedMonths = new Set<string>();

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	function formatDate(date: Date) {
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${month}-${day}`;
	}

	function formatMonth(month: number) {
		return `${month.toString().padStart(2, "0")}月`;
	}

	function getMonthKey(year: number, month: number) {
		return `${year}-${month.toString().padStart(2, "0")}`;
	}

	function isYearExpanded(year: number) {
		return expandedYears.has(year);
	}

	function isMonthExpanded(year: number, month: number) {
		return expandedMonths.has(getMonthKey(year, month));
	}

	function toggleYear(year: number) {
		const nextYears = new Set(expandedYears);
		if (nextYears.has(year)) {
			nextYears.delete(year);
		} else {
			nextYears.add(year);
		}
		expandedYears = nextYears;
	}

	function toggleMonth(year: number, month: number) {
		const key = getMonthKey(year, month);
		const nextMonths = new Set(expandedMonths);
		if (nextMonths.has(key)) {
			nextMonths.delete(key);
		} else {
			nextMonths.add(key);
		}
		expandedMonths = nextMonths;
	}

	$: {
		const grouped = sortedDiary.reduce(
			(acc, entry) => {
				const year = entry.data.date.getFullYear();
				const month = entry.data.date.getMonth() + 1;
				if (!acc[year]) {
					acc[year] = {};
				}
				if (!acc[year][month]) {
					acc[year][month] = [];
				}
				acc[year][month].push(entry);
				return acc;
			},
			{} as Record<number, Record<number, DiaryEntry[]>>,
		);

		groups = Object.keys(grouped)
			.map((year) => {
				const yearNum = Number.parseInt(year, 10);
				const months = Object.keys(grouped[yearNum])
					.map((month) => {
						const monthNum = Number.parseInt(month, 10);
						return {
							year: yearNum,
							month: monthNum,
							entries: grouped[yearNum][monthNum],
						};
					})
					.sort((a, b) => b.month - a.month);

				return {
					year: yearNum,
					months,
				};
			})
			.sort((a, b) => b.year - a.year);

		if (groups.length > 0 && expandedYears.size === 0 && expandedMonths.size === 0) {
			const defaultYears = new Set<number>();
			const defaultMonths = new Set<string>();

			for (const group of groups) {
				for (const monthGroup of group.months) {
					if (
						monthGroup.year === currentYear &&
						monthGroup.month === currentMonth
					) {
						defaultYears.add(group.year);
						defaultMonths.add(getMonthKey(group.year, monthGroup.month));
					}
				}
			}

			if (defaultYears.size === 0 && groups[0]?.months[0]) {
				defaultYears.add(groups[0].year);
				defaultMonths.add(
					getMonthKey(groups[0].year, groups[0].months[0].month),
				);
			}

			expandedYears = defaultYears;
			expandedMonths = defaultMonths;
		}
	}
</script>

<div class="card-base px-6 md:px-8 py-6">
	{#each groups as group}
		<div class="mb-8 last:mb-0">
			<button
				type="button"
				class="w-full rounded-2xl transition-colors hover:bg-black/3 dark:hover:bg-white/3"
				on:click={() => toggleYear(group.year)}
				aria-expanded={isYearExpanded(group.year)}
				aria-controls={`diary-year-${group.year}`}
			>
				<div class="flex flex-row w-full items-center h-15 mb-1">
					<div class="w-[18%] md:w-[10%] transition text-2xl font-bold text-right text-75">
						{group.year}
					</div>
					<div class="w-[12%] md:w-[8%]">
						<div
							class="h-3 w-3 bg-none rounded-full outline outline-(--primary) mx-auto -outline-offset-2 z-50 outline-3"
						></div>
					</div>
					<div class="w-[58%] md:w-[70%] transition text-left text-50">
						{group.months.length} 个月
					</div>
					<div class="w-[12%] md:w-[12%] flex justify-end pr-2">
						<div
							class={`transition-transform text-xl text-(--primary) ${isYearExpanded(group.year) ? "rotate-90" : ""}`}
						>
							›
						</div>
					</div>
				</div>
			</button>

			<div
				id={`diary-year-${group.year}`}
				class={`diary-group overflow-hidden transition-all duration-300 ease-out ${
					isYearExpanded(group.year)
						? "max-h-[8000px] opacity-100 mt-1"
						: "max-h-0 opacity-0 mt-0 pointer-events-none"
				}`}
			>
				{#each group.months as monthGroup}
					<div class="mb-4 last:mb-0">
						<button
							type="button"
							class="w-full rounded-xl transition-colors hover:bg-black/3 dark:hover:bg-white/3"
							on:click={() => toggleMonth(monthGroup.year, monthGroup.month)}
							aria-expanded={isMonthExpanded(monthGroup.year, monthGroup.month)}
							aria-controls={`diary-month-${getMonthKey(monthGroup.year, monthGroup.month)}`}
						>
							<div class="flex flex-row w-full items-center h-12">
								<div class="w-[18%] md:w-[10%]"></div>
								<div class="w-[12%] md:w-[8%] relative flex justify-center">
									<div class="absolute top-0 bottom-0 w-px bg-(--line-divider)"></div>
									<div
										class="relative mx-auto w-2 h-2 rounded-full bg-(--primary)/70 outline outline-4 outline-(--card-bg)"
									></div>
								</div>
								<div class="w-[58%] md:w-[70%] text-left font-semibold text-black/70 dark:text-white/70">
									{formatMonth(monthGroup.month)}
									<span class="ml-2 text-sm text-50">
										{monthGroup.entries.length} {i18n(I18nKey.diaryEntries)}
									</span>
								</div>
								<div class="w-[12%] md:w-[12%] flex justify-end pr-2">
									<div
										class={`transition-transform text-lg text-(--primary) ${
											isMonthExpanded(monthGroup.year, monthGroup.month)
												? "rotate-90"
												: ""
										}`}
									>
										›
									</div>
								</div>
							</div>
						</button>

						<div
							id={`diary-month-${getMonthKey(monthGroup.year, monthGroup.month)}`}
							class={`overflow-hidden transition-all duration-300 ease-out ${
								isMonthExpanded(monthGroup.year, monthGroup.month)
									? "max-h-[6000px] opacity-100"
									: "max-h-0 opacity-0 pointer-events-none"
							}`}
						>
							{#each monthGroup.entries as entry}
								<a
									href={getDiaryUrlBySlug(entry.id)}
									aria-label={entry.data.title}
									class="group block rounded-2xl hover:text-[initial] active:scale-[0.99] transition-transform"
								>
									<div class="flex items-stretch">
										<div class="w-[18%] md:w-[10%] text-right pt-6 pr-2">
											<div class="text-sm text-50">{formatDate(entry.data.date)}</div>
										</div>

										<div class="w-[12%] md:w-[8%] relative flex justify-center">
											<div class="absolute top-0 bottom-0 w-px bg-(--line-divider)"></div>
											<div
												class="relative mt-7 transition-all mx-auto w-2.5 h-2.5 rounded-full bg-(--primary) outline outline-4 outline-(--card-bg) group-hover:scale-125"
											></div>
										</div>

										<div class="w-[70%] md:w-[82%] pb-5">
											<div class="card-base rounded-2xl p-4 md:p-5 transition-all group-hover:translate-x-1 group-hover:bg-(--btn-plain-bg-hover)">
												<div class="flex flex-col md:flex-row gap-4">
													<div class="flex-1 min-w-0">
														<div class="flex flex-wrap items-center gap-2 mb-2">
															<h3 class="text-lg md:text-xl font-bold text-black/85 dark:text-white/85 line-clamp-1">
																{entry.data.title}
															</h3>
															<span class="inline-flex items-center px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 text-xs text-60">
																{i18n(I18nKey.diaryWeather)}: {entry.data.weather}
															</span>
															<span class="inline-flex items-center px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 text-xs text-60">
																{i18n(I18nKey.diaryLocation)}: {entry.data.location}
															</span>
														</div>

														<p class="text-sm md:text-base text-black/60 dark:text-white/60 leading-7 line-clamp-3">
															{entry.data.description}
														</p>
													</div>

													{#if entry.data.cover}
														<div class="shrink-0 w-full md:w-40">
															<img
																src={entry.data.cover}
																alt={entry.data.title}
																class="w-full h-28 md:h-24 object-cover rounded-xl"
																loading="lazy"
															/>
														</div>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
