<script lang="ts">
	let query = '';
	let hasSearched = false;

	const allProducts = [
		{ id: 1, name: 'Signature Nida Abaya', price: 145, collection: 'Everyday Edit', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=400&auto=format&fit=crop' },
		{ id: 2, name: 'Pearl Embellished Open Abaya', price: 220, collection: 'Occasion Wear', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=400&auto=format&fit=crop' },
		{ id: 3, name: 'Velvet Trim Evening Abaya', price: 185, collection: 'Evening Luxe', image: 'https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=400&auto=format&fit=crop' },
		{ id: 4, name: 'Chiffon Layered Abaya', price: 165, collection: 'Summer Breeze', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop' },
		{ id: 5, name: 'Classic Black Abaya', price: 120, collection: 'Everyday Edit', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=400&auto=format&fit=crop' },
		{ id: 6, name: 'Embroidered Collar Abaya', price: 195, collection: 'Artisan Edit', image: 'https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=400&auto=format&fit=crop' },
	];

	let results = $derived(
		hasSearched && query.length >= 2
			? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.collection.toLowerCase().includes(query.toLowerCase()))
			: []
	);

	function handleSearch(e: Event) {
		e.preventDefault();
		hasSearched = true;
	}
</script>

<svelte:head>
	<title>Search | Abayiza</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<!-- Search Header -->
	<div class="text-center mb-10">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-8">Search</h1>
		<form onsubmit={handleSearch} class="max-w-2xl mx-auto flex items-stretch">
			<div class="relative flex-1">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</div>
				<input
					type="search"
					bind:value={query}
					placeholder="Search for abayas, collections..."
					class="w-full h-14 pl-12 pr-4 border border-gray-300 border-r-0 text-sm focus:border-black focus:ring-0 outline-none transition-colors rounded-none bg-white"
					autofocus
				>
			</div>
			<button type="submit" class="bg-black text-white px-8 text-sm tracking-widest uppercase hover:bg-gold transition-colors whitespace-nowrap border border-black">
				Search
			</button>
		</form>
	</div>

	<!-- Popular Searches -->
	{#if !hasSearched}
	<div class="text-center">
		<p class="text-xs uppercase tracking-widest text-gray-400 mb-4">Popular Searches</p>
		<div class="flex flex-wrap justify-center gap-2">
			{#each ['Black Abaya', 'Chiffon', 'Wedding', 'Nida', 'Open Abaya', 'Embellished', 'Size Guide'] as tag}
			<button
				class="border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition-colors"
				onclick={() => { query = tag; hasSearched = true; }}
			>
				{tag}
			</button>
			{/each}
		</div>
	</div>

	{:else if results.length === 0}
	<!-- No Results -->
	<div class="text-center py-16">
		<svg class="w-16 h-16 mx-auto text-gray-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
		<h2 class="text-xl font-serif text-black mb-3">No results for "{query}"</h2>
		<p class="text-gray-500 font-light mb-8">Try a different search term or browse our collections.</p>
		<a href="/shop" class="inline-block bg-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
			Browse All Products
		</a>
	</div>

	{:else}
	<!-- Results Grid -->
	<div>
		<p class="text-sm text-gray-500 font-light mb-8">
			<span class="font-medium text-black">{results.length} result{results.length > 1 ? 's' : ''}</span> for "{query}"
		</p>
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
			{#each results as product}
			<div class="group">
				<a href="/shop/{product.id}" class="block">
					<div class="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
						<img src={product.image} alt={product.name} class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105">
						<div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
							<button class="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors">
								Quick View
							</button>
						</div>
					</div>
					<p class="text-xs text-gray-400 font-light tracking-widest uppercase mb-1">{product.collection}</p>
					<h3 class="text-sm font-serif hover:text-gold transition-colors mb-1 leading-snug">{product.name}</h3>
					<p class="text-sm font-medium">${product.price.toFixed(2)}</p>
				</a>
			</div>
			{/each}
		</div>
	</div>
	{/if}
</div>
