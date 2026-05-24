<script lang="ts">
	import { page } from '$app/state';

	const allProducts = [
		{
			id: 1,
			name: 'Signature Nida Abaya',
			price: 145,
			collection: 'Everyday Edit',
			image:
				'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=400&auto=format&fit=crop'
		},
		{
			id: 2,
			name: 'Pearl Embellished Open Abaya',
			price: 220,
			collection: 'Occasion Wear',
			image:
				'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=400&auto=format&fit=crop'
		},
		{
			id: 3,
			name: 'Velvet Trim Evening Abaya',
			price: 185,
			collection: 'Evening Luxe',
			image:
				'https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=400&auto=format&fit=crop'
		},
		{
			id: 4,
			name: 'Chiffon Layered Abaya',
			price: 165,
			collection: 'Summer Breeze',
			image:
				'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop'
		},
		{
			id: 5,
			name: 'Classic Black Abaya',
			price: 120,
			collection: 'Everyday Edit',
			image:
				'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=400&auto=format&fit=crop'
		},
		{
			id: 6,
			name: 'Embroidered Collar Abaya',
			price: 195,
			collection: 'Artisan Edit',
			image:
				'https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=400&auto=format&fit=crop'
		}
	];

	let query = $derived(page.url.searchParams.get('q')?.trim() ?? '');
	let hasSearched = $derived(query.length > 0);

	let results = $derived(
		query.length >= 2
			? allProducts.filter(
					(p) =>
						p.name.toLowerCase().includes(query.toLowerCase()) ||
						p.collection.toLowerCase().includes(query.toLowerCase())
				)
			: []
	);
</script>

<svelte:head>
	<title>Search | Abayiza</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
	<!-- Search Header -->
	<div class="mb-10 text-center">
		<h1 class="mb-8 font-serif text-3xl tracking-widest text-black uppercase md:text-4xl">
			Search
		</h1>
		<form action="/search" method="GET" class="mx-auto flex max-w-2xl items-stretch">
			<div class="relative flex-1">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
					<svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</div>
				<input
					type="search"
					name="q"
					value={query}
					placeholder="Search for abayas, collections..."
					class="h-14 w-full rounded-none border border-r-0 border-gray-300 bg-white pr-4 pl-12 text-sm transition-colors outline-none focus:border-black focus:ring-0"
				/>
			</div>
			<button
				type="submit"
				class="border border-black bg-black px-8 text-sm tracking-widest whitespace-nowrap text-white uppercase transition-colors hover:bg-gold"
			>
				Search
			</button>
		</form>
	</div>

	<!-- Popular Searches -->
	{#if !hasSearched}
		<div class="text-center">
			<p class="mb-4 text-xs tracking-widest text-gray-400 uppercase">Popular Searches</p>
			<div class="flex flex-wrap justify-center gap-2">
				{#each ['Black Abaya', 'Chiffon', 'Wedding', 'Nida', 'Open Abaya', 'Embellished', 'Size Guide'] as tag}
					<a
						href={`/search?q=${encodeURIComponent(tag)}`}
						class="border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-black hover:text-black"
					>
						{tag}
					</a>
				{/each}
			</div>
		</div>
	{:else if query.length < 2}
		<div class="py-16 text-center">
			<svg
				class="mx-auto mb-6 h-16 w-16 text-gray-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<h2 class="mb-3 font-serif text-xl text-black">Type at least 2 characters</h2>
			<p class="font-light text-gray-500">
				Use a longer term to browse matching abayas and collections.
			</p>
		</div>
	{:else if results.length === 0}
		<!-- No Results -->
		<div class="py-16 text-center">
			<svg
				class="mx-auto mb-6 h-16 w-16 text-gray-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
			<h2 class="mb-3 font-serif text-xl text-black">No results for "{query}"</h2>
			<p class="mb-8 font-light text-gray-500">
				Try a different search term or browse our collections.
			</p>
			<a
				href="/shop"
				class="inline-block bg-black px-10 py-4 text-sm tracking-widest text-white uppercase transition-colors hover:bg-gold"
			>
				Browse All Products
			</a>
		</div>
	{:else}
		<!-- Results Grid -->
		<div>
			<p class="mb-8 text-sm font-light text-gray-500">
				<span class="font-medium text-black"
					>{results.length} result{results.length > 1 ? 's' : ''}</span
				>
				for "{query}"
			</p>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
				{#each results as product}
					<div class="group">
						<a href="/shop/{product.id}" class="block">
							<div class="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100">
								<img
									src={product.image}
									alt={product.name}
									class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
								/>
								<div
									class="absolute right-0 bottom-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
								>
									<button
										class="w-full bg-black py-3 text-xs tracking-widest text-white uppercase transition-colors hover:bg-gold"
									>
										Quick View
									</button>
								</div>
							</div>
							<p class="mb-1 text-xs font-light tracking-widest text-gray-400 uppercase">
								{product.collection}
							</p>
							<h3 class="mb-1 font-serif text-sm leading-snug transition-colors hover:text-gold">
								{product.name}
							</h3>
							<p class="text-sm font-medium">${product.price.toFixed(2)}</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
