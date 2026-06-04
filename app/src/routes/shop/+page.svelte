<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let products = $derived((data.products || []) as Array<any>);
	let collections = $derived((data.collections || []) as Array<any>);
	let colors = $derived((data.colors || []) as string[]);
	let isGridView = $state(true);
	let showFilters = $state(false);

	const colorHex: Record<string, string> = {
		Black: '#101411',
		White: '#ffffff',
		Ivory: '#fff7ed',
		Emerald: '#047857',
		Midnight: '#111827',
		Sage: '#8fa99a',
		Olive: '#64763c',
		Charcoal: '#374151',
		Navy: '#172554'
	};

	function productImage(item: any) {
		return item.images && item.images.length > 0 ? item.images[0].url : '';
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

	function addProductToCart(item: any) {
		if (isOutOfStock(item)) return;
		const variant = primaryVariant(item);

		cart.addItem({
			id: variant ? variant.id : item.id,
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
	<title>Shop All | Abayiza</title>
</svelte:head>

<section class="bg-[#fbf9f2] px-4 py-10 text-[#14352d] sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 border-b border-[#14352d]/10 pb-8">
			<p class="mb-3 text-xs font-black tracking-[0.2em] text-[#b58b2b] uppercase">Shop Abayiza</p>
			<div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
				<div>
					<h1 class="font-serif text-4xl leading-tight uppercase sm:text-5xl">The Collection</h1>
					<p class="mt-4 max-w-2xl text-sm leading-6 font-medium text-[#596c62] sm:text-base">
						Explore premium abayas for daily wear, occasion styling, and refined modest wardrobes.
					</p>
				</div>
				<div class="flex flex-wrap gap-2">
					<span
						class="rounded-full border border-[#14352d]/10 bg-white px-4 py-2 text-xs font-bold text-[#14352d]"
					>
						{products.length} Pieces
					</span>
					<span
						class="rounded-full border border-[#14352d]/10 bg-white px-4 py-2 text-xs font-bold text-[#14352d]"
					>
						DB Catalog
					</span>
				</div>
			</div>
		</div>

		<div
			class="mb-8 flex flex-col gap-4 rounded-md border border-[#14352d]/10 bg-white/86 p-4 shadow-[0_18px_45px_rgba(20,53,45,0.08)] md:flex-row md:items-center md:justify-between"
		>
			<button
				type="button"
				class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#14352d] px-5 text-xs font-black tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] md:hidden"
				aria-expanded={showFilters}
				onclick={() => (showFilters = !showFilters)}
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.7"
						d="M3 4h18M6 12h12M10 20h4"
					/>
				</svg>
				Filter
			</button>

			<p class="hidden text-sm font-bold text-[#596c62] md:block">
				Showing {products.length} products
			</p>

			<div class="flex flex-wrap items-center justify-between gap-4 md:justify-end">
				<label class="flex items-center gap-2 text-sm font-medium text-[#596c62]">
					<span>Sort by</span>
					<select
						class="rounded-full border border-[#14352d]/10 bg-[#fbf9f2] px-4 py-2 text-sm font-bold text-[#14352d] focus:border-[#14352d] focus:ring-[#14352d]"
					>
						<option>Featured</option>
						<option>New Arrivals</option>
						<option>Price: Low to High</option>
						<option>Price: High to Low</option>
					</select>
				</label>

				<div
					class="hidden items-center gap-2 rounded-full border border-[#14352d]/10 bg-[#fbf9f2] p-1 md:flex"
				>
					<button
						type="button"
						aria-label="Grid view"
						class="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors {isGridView
							? 'bg-[#14352d] text-white'
							: 'text-[#596c62] hover:bg-white'}"
						onclick={() => (isGridView = true)}
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
						</svg>
					</button>
					<button
						type="button"
						aria-label="List view"
						class="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors {!isGridView
							? 'bg-[#14352d] text-white'
							: 'text-[#596c62] hover:bg-white'}"
						onclick={() => (isGridView = false)}
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 md:flex-row">
			<aside class="w-full shrink-0 md:w-64 {showFilters ? 'block' : 'hidden md:block'}">
				<div class="sticky top-28 space-y-4">
					<div
						class="rounded-md border border-[#14352d]/10 bg-white/90 p-5 shadow-[0_14px_34px_rgba(20,53,45,0.06)]"
					>
						<div class="mb-5 flex items-center justify-between">
							<h2 class="text-xs font-black tracking-[0.16em] uppercase">Filters</h2>
							<a href="/shop" class="text-xs font-bold text-[#b58b2b]">Clear</a>
						</div>

						<div class="border-t border-[#14352d]/10 py-5 first:border-t-0 first:pt-0">
							<h3 class="mb-4 text-xs font-black tracking-[0.14em] uppercase">Categories</h3>
							<ul class="space-y-3">
								{#each collections as collection}
									<li>
										<a
											href={`/shop?collection=${collection.slug}`}
											class="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-[#596c62] transition-colors hover:bg-[#fbf9f2] hover:text-[#14352d]"
										>
											<span>{collection.name}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>

						<div class="border-t border-[#14352d]/10 pt-5">
							<h3 class="mb-4 text-xs font-black tracking-[0.14em] uppercase">Color</h3>
							<div class="flex flex-wrap gap-3">
								{#each colors as color}
									<button
										type="button"
										class="h-7 w-7 rounded-full border border-[#14352d]/12 ring-1 ring-[#14352d]/12 ring-offset-2 ring-offset-white transition-transform hover:scale-110"
										style={`background-color: ${colorHex[color] || '#d9d0bd'}`}
										title={color}
										aria-label={color}
									></button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</aside>

			<div class="min-w-0 flex-1">
				<div
					class="grid {isGridView
						? 'auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
						: 'grid-cols-1 gap-6'}"
				>
					{#each products as item}
						<article
							class="group flex h-full overflow-hidden rounded-md border border-[#14352d]/10 bg-white shadow-[0_16px_38px_rgba(20,53,45,0.08)] transition-transform duration-300 hover:-translate-y-1 {isGridView
								? 'flex-col'
								: 'flex-col sm:flex-row'}"
						>
							<a
								href={`/shop/${item.slug}`}
								class="relative block aspect-[4/3] overflow-hidden bg-[#e4eee9] {isGridView
									? ''
									: 'sm:w-64 sm:shrink-0'}"
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
									<div class="min-h-[2.65rem] min-w-0">
										<a
											href={`/shop/${item.slug}`}
											class="block overflow-hidden font-serif text-sm leading-tight font-semibold text-ellipsis whitespace-nowrap text-[#14352d] transition-colors hover:text-[#b58b2b]"
										>
											{item.name}
										</a>
										<p class="mt-2 text-xs font-bold tracking-[0.08em] text-[#596c62] uppercase">
											{primaryVariant(item)?.color || 'Signature edit'}
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

								{#if !isGridView}
									<p class="mb-5 max-w-2xl text-sm leading-6 font-medium text-[#596c62]">
										{item.description}
									</p>
								{/if}

								<div class="mt-auto flex items-center gap-2">
									<button
										type="button"
										disabled={isOutOfStock(item)}
										class="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#14352d] px-4 text-sm font-bold text-white transition-colors hover:bg-[#e4b43d] hover:text-[#14352d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
										onclick={() => addProductToCart(item)}
									>
										{isOutOfStock(item) ? 'Out of Stock' : 'Add to Cart'}
									</button>
									<button
										type="button"
										class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#fbf9f2] text-[#14352d] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d]"
										aria-label={`Add ${item.name} to wishlist`}
									>
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.7"
												d="M12 20.25l-1.45-1.32C5.4 14.36 2 11.28 2 7.5A4.5 4.5 0 016.5 3c1.74 0 3.41.81 4.5 2.09A5.96 5.96 0 0115.5 3 4.5 4.5 0 0120 7.5c0 3.78-3.4 6.86-8.55 11.43L12 20.25z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</article>
					{/each}
				</div>

				<div
					class="mt-14 border-t border-[#14352d]/10 pt-8 text-center text-sm font-bold text-[#596c62]"
				>
					Showing all products from the database.
				</div>
			</div>
		</div>
	</div>
</section>
