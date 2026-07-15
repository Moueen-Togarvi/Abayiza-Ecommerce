<script lang="ts">
	import { page } from '$app/state';
	import { cart } from '$lib/client/cart.svelte';
	import { formatMoney } from '$lib/shared/money';
	import { SITE_NAME, absoluteUrl, jsonLdScript, metaDescription } from '$lib/shared/seo';

	let { data } = $props();
	let section = $derived(data.section);
	let products = $derived((data.products || []) as Array<any>);
	let pagination = $derived(data.pagination);
	let filters = $derived(
		(data.filters || { q: '', category: '', color: '', size: '' }) as Record<string, string>
	);
	let filterOptions = $derived(
		(data.filterOptions || { categories: [], colors: [], sizes: [] }) as Record<string, any>
	);
	let visiblePages = $derived(buildVisiblePages(pagination.page, pagination.totalPages));
	let searchQuery = $state('');
	let selectedCategory = $state('');
	let selectedColor = $state('');
	let selectedSize = $state('');
	let sectionTitle = $derived(`${section.title} | ${SITE_NAME}`);
	let sectionDescription = $derived(metaDescription(section.description));
	let sectionJsonLd = $derived(
		jsonLdScript([
			{
				'@context': 'https://schema.org',
				'@type': 'CollectionPage',
				name: section.title,
				description: sectionDescription,
				url: absoluteUrl(section.href, page.url.origin)
			},
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: absoluteUrl('/', page.url.origin)
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: section.title,
						item: absoluteUrl(section.href, page.url.origin)
					}
				]
			}
		])
	);

	$effect(() => {
		searchQuery = filters.q || '';
		selectedCategory = filters.category || '';
		selectedColor = filters.color || '';
		selectedSize = filters.size || '';
	});

	const colorHex: Record<string, string> = {
		Black: '#101411',
		White: '#ffffff',
		Ivory: '#fff7ed',
		Emerald: '#047857',
		Midnight: '#111827',
		Sage: '#8fa99a',
		Olive: '#64763c',
		Charcoal: '#374151',
		Navy: '#172554',
		Mocha: '#7b5142'
	};

	function productImage(item: any) {
		return item.images?.[0]?.url || '/image.png';
	}

	function primaryVariant(item: any) {
		return (
			item.variants?.find((variant: any) => Number(variant.stockCount || 0) > 0) ||
			item.variants?.[0]
		);
	}

	function isOutOfStock(item: any) {
		return !item.variants?.some((variant: any) => Number(variant.stockCount || 0) > 0);
	}

	function productPrice(item: any) {
		return Number(item.salePrice || item.price);
	}

	function productCategory(item: any) {
		return item.collections?.[0]?.name || 'Abayiza';
	}

	function productHref(item: any) {
		return `/shop/${item.slug}`;
	}

	function pageHref(page: number) {
		const params = new URLSearchParams();
		params.set('page', String(page));
		if (filters.q) params.set('q', filters.q);
		if (filters.category) params.set('category', filters.category);
		if (filters.color) params.set('color', filters.color);
		if (filters.size) params.set('size', filters.size);

		return `${section.href}?${params.toString()}`;
	}

	function buildVisiblePages(currentPage: number, totalPages: number) {
		return Array.from(
			new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])
		).filter((page) => page >= 1 && page <= totalPages);
	}

	function addProductToCart(item: any) {
		if (isOutOfStock(item)) return;
		const variant = primaryVariant(item);

		cart.addItem({
			id: variant?.id || item.id,
			productId: item.id,
			variantId: variant?.id,
			name: item.name,
			price: productPrice(item),
			quantity: 1,
			image: productImage(item),
			color: variant?.color,
			size: variant?.size
		});
	}
</script>

<svelte:head>
	<title>{sectionTitle}</title>
	<meta name="description" content={sectionDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={sectionTitle} />
	<meta property="og:description" content={sectionDescription} />
	<meta name="twitter:title" content={sectionTitle} />
	<meta name="twitter:description" content={sectionDescription} />
	{@html sectionJsonLd}
</svelte:head>

<section class="bg-[#fbf9f2] px-4 py-10 text-[#14352d] sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 border-b border-[#14352d]/10 pb-8">
			<a
				href="/"
				class="mb-6 inline-flex min-h-10 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-4 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase shadow-[0_12px_28px_rgba(20,53,45,0.08)] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
			>
				Back Home
			</a>
			<div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
				<div>
					<p class="mb-3 text-xs font-black tracking-[0.2em] text-[#b58b2b] uppercase">
						{section.eyebrow}
					</p>
					<h1 class="font-serif text-4xl leading-tight uppercase sm:text-5xl">
						{section.title}
					</h1>
					<p class="mt-4 max-w-2xl text-sm leading-6 font-medium text-[#596c62] sm:text-base">
						{section.description}
					</p>
				</div>
				<div class="flex flex-wrap gap-2">
					<span
						class="rounded-full border border-[#14352d]/10 bg-white px-4 py-2 text-xs font-bold text-[#14352d]"
					>
						{pagination.total} Pieces
					</span>
					<span
						class="rounded-full border border-[#14352d]/10 bg-white px-4 py-2 text-xs font-bold text-[#14352d]"
					>
						Page {pagination.page} of {pagination.totalPages}
					</span>
				</div>
			</div>
		</div>

		<div
			class="mb-8 flex flex-col gap-4 rounded-md border border-[#14352d]/10 bg-white/86 p-4 shadow-[0_18px_45px_rgba(20,53,45,0.08)] md:flex-row md:items-center md:justify-between"
		>
			<div class="flex items-center justify-between gap-3">
				<p class="text-sm font-bold text-[#596c62]">
					Showing {products.length} of {pagination.total} matching products
				</p>
			</div>
			<p class="text-sm font-bold text-[#596c62]">
				Page {pagination.page} of {pagination.totalPages} · {pagination.pageSize} per page
			</p>
		</div>

		<div class="flex flex-col gap-8 md:flex-row md:items-start">
			<aside class="w-full shrink-0 md:block md:w-72 lg:w-80">
				<form
					method="GET"
					action={section.href}
					class="sticky top-28 rounded-md border border-[#14352d]/10 bg-white/92 p-3 shadow-[0_18px_45px_rgba(20,53,45,0.08)]"
				>
					<div class="mb-3 flex items-center justify-between gap-3">
						<h2 class="text-sm font-black tracking-[0.14em] text-[#b58b2b] uppercase">
							Filter Search
						</h2>
						<a
							href={section.href}
							class="rounded-full border border-[#14352d]/10 px-2.5 py-1 text-[0.65rem] font-black tracking-[0.1em] text-[#14352d] uppercase transition-colors hover:bg-[#fbf9f2]"
						>
							Clear
						</a>
					</div>

					<div class="space-y-3">
						<div>
							<label
								for="section-sidebar-q"
								class="mb-1 block text-[0.68rem] font-black tracking-[0.12em] uppercase"
							>
								Search
							</label>
							<input
								id="section-sidebar-q"
								name="q"
								type="search"
								bind:value={searchQuery}
								placeholder="Search by name, color..."
								class="h-9 w-full rounded-md border-[#14352d]/15 bg-[#fbf9f2] text-xs font-semibold text-[#14352d] placeholder:text-[#596c62]/70 focus:border-[#14352d] focus:ring-[#14352d]"
							/>
						</div>

						<div class="border-t border-[#14352d]/10 pt-3">
							<h3 class="mb-2 text-[0.68rem] font-black tracking-[0.14em] uppercase">Category</h3>
							<div class="grid gap-1.5">
								<label
									class="flex min-h-8 cursor-pointer items-center justify-between rounded-md border px-2.5 text-xs font-bold transition-colors {selectedCategory ===
									''
										? 'border-[#14352d] bg-[#14352d] text-white'
										: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
								>
									<span>All categories</span>
									<input
										class="sr-only"
										type="radio"
										name="category"
										value=""
										bind:group={selectedCategory}
									/>
								</label>
								{#each filterOptions.categories as category}
									<label
										class="flex min-h-8 cursor-pointer items-center justify-between gap-2 rounded-md border px-2.5 text-xs font-bold transition-colors {selectedCategory ===
										category.slug
											? 'border-[#14352d] bg-[#14352d] text-white'
											: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
									>
										<span>{category.name}</span>
										<input
											class="sr-only"
											type="radio"
											name="category"
											value={category.slug}
											bind:group={selectedCategory}
										/>
									</label>
								{/each}
							</div>
						</div>

						<div class="border-t border-[#14352d]/10 pt-3">
							<h3 class="mb-2 text-[0.68rem] font-black tracking-[0.14em] uppercase">Color</h3>
							<div class="grid grid-cols-2 gap-1.5">
								<label
									class="flex min-h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 text-xs font-bold transition-colors {selectedColor ===
									''
										? 'border-[#14352d] bg-[#14352d] text-white'
										: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
								>
									<span
										class="h-3.5 w-3.5 rounded-full border border-current bg-white"
										aria-hidden="true"
									></span>
									<span>All</span>
									<input
										class="sr-only"
										type="radio"
										name="color"
										value=""
										bind:group={selectedColor}
									/>
								</label>
								{#each filterOptions.colors as color}
									<label
										class="flex min-h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 text-xs font-bold transition-colors {selectedColor ===
										color
											? 'border-[#14352d] bg-[#14352d] text-white'
											: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
									>
										<span
											class="h-3.5 w-3.5 rounded-full border border-[#14352d]/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
											style={`background-color: ${colorHex[color] || '#d9d0bd'}`}
											aria-hidden="true"
										></span>
										<span>{color}</span>
										<input
											class="sr-only"
											type="radio"
											name="color"
											value={color}
											bind:group={selectedColor}
										/>
									</label>
								{/each}
							</div>
						</div>

						<div class="border-t border-[#14352d]/10 pt-3">
							<h3 class="mb-2 text-[0.68rem] font-black tracking-[0.14em] uppercase">Size</h3>
							<div class="flex flex-wrap gap-1.5">
								<label
									class="inline-flex min-h-8 cursor-pointer items-center rounded-full border px-3 text-xs font-black transition-colors {selectedSize ===
									''
										? 'border-[#14352d] bg-[#14352d] text-white'
										: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
								>
									All
									<input
										class="sr-only"
										type="radio"
										name="size"
										value=""
										bind:group={selectedSize}
									/>
								</label>
								{#each filterOptions.sizes as size}
									<label
										class="inline-flex min-h-8 cursor-pointer items-center rounded-full border px-3 text-xs font-black transition-colors {selectedSize ===
										size
											? 'border-[#14352d] bg-[#14352d] text-white'
											: 'border-[#14352d]/10 bg-[#fbf9f2] text-[#596c62] hover:border-[#14352d]/30 hover:text-[#14352d]'}"
									>
										{size}
										<input
											class="sr-only"
											type="radio"
											name="size"
											value={size}
											bind:group={selectedSize}
										/>
									</label>
								{/each}
							</div>
						</div>
					</div>

					<button
						type="submit"
						class="mt-4 inline-flex min-h-9 w-full items-center justify-center rounded-full bg-[#14352d] px-4 text-xs font-black tracking-[0.1em] text-white uppercase transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
					>
						Apply Filters
					</button>
				</form>
			</aside>

			<div class="min-w-0 flex-1">
				{#if products.length}
					<div class="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
						{#each products as item}
							<article
								class="group flex h-full flex-col overflow-hidden rounded-md border border-[#14352d]/10 bg-white shadow-[0_16px_38px_rgba(20,53,45,0.08)] transition-transform duration-300 hover:-translate-y-1"
							>
								<a
									href={productHref(item)}
									class="relative block aspect-[3/4] overflow-hidden bg-[#e4eee9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
									aria-label={`View ${item.name}`}
								>
									{#if item.salePrice}
										<span
											class="absolute top-3 left-3 z-10 rounded-full bg-[#e4b43d] px-3 py-1 text-[0.65rem] font-black tracking-[0.12em] text-[#14352d] uppercase"
										>
											Sale
										</span>
									{/if}
									{#if isOutOfStock(item)}
										<span
											class="absolute top-2 right-2 z-10 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.5rem] font-black tracking-[0.08em] text-white uppercase sm:top-3 sm:right-3 sm:px-2 sm:py-1 sm:text-[0.58rem]"
										>
											Sold Out
										</span>
									{/if}
									<img
										src={productImage(item)}
										alt={item.name}
										width="1200"
										height="900"
										class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
									/>
								</a>

								<div class="relative flex flex-1 flex-col p-3 sm:p-4">
									<!-- Cart icon at top-right of text area -->
									<button
										type="button"
										disabled={isOutOfStock(item)}
										onclick={() => addProductToCart(item)}
										class="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d] shadow-[0_4px_12px_rgba(196,152,63,0.30)] transition-colors hover:bg-[#14352d] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:h-9 sm:w-9"
										aria-label="Add to cart"
									>
										<svg
											class="h-4 w-4 sm:h-4 sm:w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.4a2 2 0 001.9-1.4L21 7H6"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 21h.01M18 21h.01"
											/>
										</svg>
									</button>

									<div class="pr-10">
										<a
											href={productHref(item)}
											class="line-clamp-2 block font-serif text-[0.82rem] leading-tight text-[#14352d] transition-colors hover:text-[#b58b2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] sm:text-lg"
										>
											{item.name}
										</a>
										<p
											class="mt-1 text-[0.58rem] font-bold tracking-[0.08em] text-[#596c62] uppercase sm:text-[0.65rem] sm:tracking-[0.1em]"
										>
											{primaryVariant(item)?.color || productCategory(item)}
										</p>
									</div>

									<div class="mt-2 mb-3 flex flex-wrap gap-1 sm:mt-3 sm:mb-4 sm:gap-2">
										<span
											class="inline-flex min-h-5 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-1.5 text-center text-[0.52rem] font-bold text-[#14352d] sm:min-h-6 sm:px-2.5 sm:text-[0.66rem]"
										>
											{productCategory(item)}
										</span>
										{#if primaryVariant(item)?.size}
											<span
												class="inline-flex min-h-5 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-1.5 text-center text-[0.52rem] font-bold text-[#14352d] sm:min-h-6 sm:px-2.5 sm:text-[0.66rem]"
											>
												{primaryVariant(item)?.size}
											</span>
										{/if}
									</div>

									<div class="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3">
										<div class="min-w-0">
											<p
												class="text-sm font-black whitespace-nowrap text-[#14352d] sm:text-[0.95rem]"
											>
												{formatMoney(item.salePrice || item.price)}
											</p>
											{#if item.salePrice}
												<p
													class="mt-0.5 text-[0.62rem] font-bold whitespace-nowrap text-red-600 line-through sm:text-xs"
												>
													{formatMoney(item.price)}
												</p>
											{/if}
										</div>
										{#if isOutOfStock(item)}
											<button
												disabled
												class="inline-flex min-h-8 shrink-0 items-center justify-center rounded-full bg-gray-200 px-3 text-[0.62rem] font-black whitespace-nowrap text-gray-500 cursor-not-allowed sm:min-h-9 sm:px-4 sm:text-xs"
											>
												Sold Out
											</button>
										{:else}
											<a
												href={productHref(item)}
												class="inline-flex min-h-8 shrink-0 items-center justify-center rounded-full bg-[#14352d] px-3 text-[0.62rem] font-black whitespace-nowrap text-white transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] sm:min-h-9 sm:px-4 sm:text-xs"
											>
												Buy Now
											</a>
										{/if}
									</div>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div
						class="rounded-md border border-dashed border-[#14352d]/18 bg-white/80 px-5 py-16 text-center shadow-[0_16px_38px_rgba(20,53,45,0.06)]"
					>
						<p class="font-serif text-2xl text-[#14352d]">No abayas found</p>
						<p class="mx-auto mt-3 max-w-md text-sm leading-6 font-medium text-[#596c62]">
							This section has no active products right now.
						</p>
						<a
							href="/shop"
							class="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#14352d] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
						>
							View Shop
						</a>
					</div>
				{/if}

				{#if pagination.totalPages > 1}
					<nav
						class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#14352d]/10 pt-8 text-sm font-bold text-[#14352d] sm:flex-row"
						aria-label={`${section.title} pagination`}
					>
						{#if pagination.hasPrevious}
							<a
								href={pageHref(pagination.previousPage)}
								class="inline-flex min-h-10 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-5 transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
							>
								Previous
							</a>
						{:else}
							<span
								class="inline-flex min-h-10 cursor-not-allowed items-center justify-center rounded-full border border-[#14352d]/8 bg-white/50 px-5 text-[#596c62]/55"
							>
								Previous
							</span>
						{/if}

						<div class="flex flex-wrap items-center justify-center gap-2">
							{#each visiblePages as page, index}
								{#if index > 0 && page - visiblePages[index - 1] > 1}
									<span class="px-1 text-[#596c62]">...</span>
								{/if}
								{#if page === pagination.page}
									<span
										aria-current="page"
										class="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#14352d] px-3 text-white"
									>
										{page}
									</span>
								{:else}
									<a
										href={pageHref(page)}
										class="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-3 transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
									>
										{page}
									</a>
								{/if}
							{/each}
						</div>

						{#if pagination.hasNext}
							<a
								href={pageHref(pagination.nextPage)}
								class="inline-flex min-h-10 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-5 transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
							>
								Next
							</a>
						{:else}
							<span
								class="inline-flex min-h-10 cursor-not-allowed items-center justify-center rounded-full border border-[#14352d]/8 bg-white/50 px-5 text-[#596c62]/55"
							>
								Next
							</span>
						{/if}
					</nav>
				{/if}
			</div>
		</div>
	</div>
</section>
