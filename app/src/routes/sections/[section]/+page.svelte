<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	import { formatMoney } from '$lib/shared/money';

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

	$effect(() => {
		searchQuery = filters.q || '';
		selectedCategory = filters.category || '';
		selectedColor = filters.color || '';
		selectedSize = filters.size || '';
	});

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
	<title>{section.title} | Abayiza</title>
	<meta name="description" content={section.description} />
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

		<form
			method="GET"
			action={section.href}
			class="mb-8 grid gap-3 rounded-md border border-[#14352d]/10 bg-white/90 p-4 shadow-[0_18px_45px_rgba(20,53,45,0.08)] md:grid-cols-[1.4fr_1fr_1fr_1fr_auto_auto] md:items-end"
		>
			<div>
				<label for="section-q" class="mb-1 block text-xs font-black tracking-[0.12em] uppercase">
					Search
				</label>
				<input
					id="section-q"
					name="q"
					type="search"
					bind:value={searchQuery}
					placeholder="Search abayas"
					class="w-full rounded-md border-[#14352d]/15 text-sm focus:border-[#14352d] focus:ring-[#14352d]"
				/>
			</div>
			<div>
				<label
					for="section-category"
					class="mb-1 block text-xs font-black tracking-[0.12em] uppercase"
				>
					Category
				</label>
				<select
					id="section-category"
					name="category"
					bind:value={selectedCategory}
					class="w-full rounded-md border-[#14352d]/15 text-sm font-bold text-[#14352d] focus:border-[#14352d] focus:ring-[#14352d]"
				>
					<option value="">All categories</option>
					{#each filterOptions.categories as category}
						<option value={category.slug}>{category.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label
					for="section-color"
					class="mb-1 block text-xs font-black tracking-[0.12em] uppercase"
				>
					Color
				</label>
				<select
					id="section-color"
					name="color"
					bind:value={selectedColor}
					class="w-full rounded-md border-[#14352d]/15 text-sm font-bold text-[#14352d] focus:border-[#14352d] focus:ring-[#14352d]"
				>
					<option value="">All colors</option>
					{#each filterOptions.colors as color}
						<option value={color}>{color}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="section-size" class="mb-1 block text-xs font-black tracking-[0.12em] uppercase">
					Size
				</label>
				<select
					id="section-size"
					name="size"
					bind:value={selectedSize}
					class="w-full rounded-md border-[#14352d]/15 text-sm font-bold text-[#14352d] focus:border-[#14352d] focus:ring-[#14352d]"
				>
					<option value="">All sizes</option>
					{#each filterOptions.sizes as size}
						<option value={size}>{size}</option>
					{/each}
				</select>
			</div>
			<button
				type="submit"
				class="inline-flex min-h-10 items-center justify-center rounded-full bg-[#14352d] px-5 text-xs font-black tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
			>
				Apply
			</button>
			<a
				href={section.href}
				class="inline-flex min-h-10 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-5 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase transition-colors hover:bg-[#f5f0e5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
			>
				Clear
			</a>
		</form>

		{#if products.length}
			<div class="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each products as item}
					<article
						class="group flex h-full flex-col overflow-hidden rounded-md border border-[#14352d]/10 bg-white shadow-[0_16px_38px_rgba(20,53,45,0.08)] transition-transform duration-300 hover:-translate-y-1"
					>
						<a
							href={productHref(item)}
							class="relative block aspect-[4/3] overflow-hidden bg-[#e4eee9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
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
									class="absolute top-3 right-3 z-10 rounded-full bg-red-600 px-3 py-1 text-[0.65rem] font-black tracking-[0.12em] text-white uppercase"
								>
									Out of Stock
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

						<div class="flex flex-1 flex-col p-4">
							<div class="mb-3 flex items-start justify-between gap-3">
								<div class="min-h-[3.25rem] min-w-0">
									<a
										href={productHref(item)}
										class="block font-serif text-lg leading-tight text-[#14352d] transition-colors hover:text-[#b58b2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
									>
										{item.name}
									</a>
									<p class="mt-2 text-xs font-bold tracking-[0.08em] text-[#596c62] uppercase">
										{primaryVariant(item)?.color || productCategory(item)}
									</p>
								</div>
								<div class="shrink-0 text-right">
									<p class="text-base font-black whitespace-nowrap text-[#14352d]">
										{formatMoney(item.salePrice || item.price)}
									</p>
									{#if item.salePrice}
										<p class="text-xs font-bold whitespace-nowrap text-red-600 line-through">
											{formatMoney(item.price)}
										</p>
									{/if}
								</div>
							</div>

							<div class="mb-5 flex flex-wrap gap-2">
								<span
									class="inline-flex min-h-6 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-2.5 text-center text-[0.66rem] font-bold text-[#14352d]"
								>
									{productCategory(item)}
								</span>
								{#if primaryVariant(item)?.size}
									<span
										class="inline-flex min-h-6 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-2.5 text-center text-[0.66rem] font-bold text-[#14352d]"
									>
										{primaryVariant(item)?.size}
									</span>
								{/if}
							</div>

							<div class="mt-auto flex items-center gap-2">
								<button
									type="button"
									disabled={isOutOfStock(item)}
									class="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#14352d] px-4 text-sm font-bold text-white transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
									onclick={() => addProductToCart(item)}
								>
									{isOutOfStock(item) ? 'Out of Stock' : 'Add to Cart'}
								</button>
								<a
									href={productHref(item)}
									class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#fbf9f2] text-[#14352d] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
									aria-label={`View ${item.name}`}
								>
									<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.8"
											d="M7 17L17 7M9 7h8v8"
										/>
									</svg>
								</a>
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
</section>
