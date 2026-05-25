<script lang="ts">
	let { data } = $props();
	let collections = $derived((data.collections || []) as Array<any>);
	let categorySearch = $state('');

	let filteredCollections = $derived(
		collections.filter((collection) => {
			const query = categorySearch.trim().toLowerCase();
			if (!query) return true;

			return [collection.name]
				.filter(Boolean)
				.some((value) => String(value).toLowerCase().includes(query));
		})
	);
</script>

<svelte:head>
	<title>Collections | Abayiza</title>
</svelte:head>

<section class="bg-[#fbf9f2] px-4 py-10 text-[#14352d] sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 border-b border-[#14352d]/10 pb-8">
			<p class="mb-3 text-xs font-black tracking-[0.2em] text-[#b58b2b] uppercase">
				Shop By Category
			</p>
			<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 class="font-serif text-4xl leading-tight uppercase sm:text-5xl">Collections</h1>
					<p class="mt-4 max-w-2xl text-sm leading-6 font-medium text-[#596c62] sm:text-base">
						Find abayas by category name, then open the matching shop view.
					</p>
				</div>

				<label class="relative block w-full max-w-lg">
					<span class="sr-only">Search categories</span>
					<span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#596c62]">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.8"
								d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</span>
					<input
						type="search"
						bind:value={categorySearch}
						placeholder="Search categories"
						class="min-h-12 w-full rounded-full border border-[#14352d]/10 bg-white pr-4 pl-11 text-sm font-bold text-[#14352d] shadow-[0_14px_34px_rgba(20,53,45,0.07)] placeholder:text-[#596c62]/60 focus:border-[#14352d] focus:ring-[#14352d]"
					/>
				</label>
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
			<p class="text-sm font-bold text-[#596c62]">
				Showing {filteredCollections.length} categories
			</p>
			{#if categorySearch}
				<button
					type="button"
					class="rounded-full border border-[#14352d]/10 bg-white px-4 py-2 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase transition-colors hover:bg-[#14352d] hover:text-white"
					onclick={() => (categorySearch = '')}
				>
					Clear Search
				</button>
			{/if}
		</div>

		{#if filteredCollections.length}
			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredCollections as collection}
					<a
						href={`/shop?collection=${collection.slug}`}
						class="group flex min-h-32 items-center justify-center rounded-md border border-[#14352d]/10 bg-white p-6 text-center shadow-[0_16px_38px_rgba(20,53,45,0.08)] transition-transform duration-300 hover:-translate-y-1"
					>
						<h2
							class="font-serif text-2xl leading-tight text-[#14352d] transition-colors group-hover:text-[#b58b2b]"
						>
							{collection.name}
						</h2>
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="rounded-md border border-[#14352d]/10 bg-white p-10 text-center shadow-[0_16px_38px_rgba(20,53,45,0.08)]"
			>
				<p class="font-serif text-2xl text-[#14352d]">No categories found</p>
				<p class="mt-3 text-sm font-medium text-[#596c62]">Try another category name.</p>
			</div>
		{/if}
	</div>
</section>
