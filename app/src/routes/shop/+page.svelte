<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	let { data } = $props();
	let products = $derived(data.products || []);
	let isGridView = $state(true);
	let showFilters = $state(false);
</script>

<svelte:head>
	<title>Shop All | Abayiza</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Page Header -->
	<div class="mb-12 text-center md:text-left">
		<h1 class="text-4xl font-serif tracking-widest uppercase text-black mb-4">The Collection</h1>
		<p class="text-gray-500 font-light max-w-2xl">
			Explore our full range of meticulously crafted abayas. From everyday essentials to opulent occasion wear, find the perfect piece to elevate your wardrobe.
		</p>
	</div>

	<!-- Controls Toolbar -->
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-y border-black/10 mb-8 space-y-4 md:space-y-0">
		<button 
			class="flex items-center space-x-2 text-sm tracking-widest uppercase hover:text-gold transition-colors md:hidden"
			onclick={() => showFilters = !showFilters}
		>
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
			</svg>
			<span>Filter</span>
		</button>

		<div class="text-sm text-gray-500 font-light hidden md:block">
			Showing {products.length} Products
		</div>

		<div class="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
			<div class="flex items-center space-x-2">
				<span class="text-sm font-light text-gray-500">Sort by:</span>
				<select class="border-none bg-transparent text-sm font-medium tracking-wide focus:ring-0 cursor-pointer hover:text-gold transition-colors">
					<option>Featured</option>
					<option>New Arrivals</option>
					<option>Price: Low to High</option>
					<option>Price: High to Low</option>
				</select>
			</div>
			
			<div class="hidden md:flex items-center space-x-2 border-l border-black/10 pl-6">
				<button class="text-gray-400 hover:text-black transition-colors {isGridView ? 'text-black' : ''}" onclick={() => isGridView = true}>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
				</button>
				<button class="text-gray-400 hover:text-black transition-colors {!isGridView ? 'text-black' : ''}" onclick={() => isGridView = false}>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
				</button>
			</div>
		</div>
	</div>

	<div class="flex flex-col md:flex-row gap-12">
		<!-- Sidebar Filters (Desktop) -->
		<aside class="w-full md:w-64 flex-shrink-0 {showFilters ? 'block' : 'hidden md:block'}">
			<div class="space-y-8 sticky top-28">
				<!-- Collection Filter -->
				<div>
					<h3 class="text-sm font-medium tracking-widest uppercase mb-4 border-b border-black/10 pb-2">Collection</h3>
					<ul class="space-y-3">
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Everyday Abaya</span>
							</label>
						</li>
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Wedding Edit</span>
							</label>
						</li>
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Summer Breeze</span>
							</label>
						</li>
					</ul>
				</div>

				<!-- Color Filter -->
				<div>
					<h3 class="text-sm font-medium tracking-widest uppercase mb-4 border-b border-black/10 pb-2">Color</h3>
					<div class="flex flex-wrap gap-3">
						<button class="w-6 h-6 rounded-full bg-black ring-1 ring-offset-2 ring-black" title="Black"></button>
						<button class="w-6 h-6 rounded-full bg-[#d1b8b4] ring-1 ring-offset-2 ring-transparent hover:ring-gray-300" title="Dusty Rose"></button>
						<button class="w-6 h-6 rounded-full bg-[#fdfbf7] border border-gray-200 ring-1 ring-offset-2 ring-transparent hover:ring-gray-300" title="Cream"></button>
						<button class="w-6 h-6 rounded-full bg-[#c5a880] ring-1 ring-offset-2 ring-transparent hover:ring-gray-300" title="Gold"></button>
						<button class="w-6 h-6 rounded-full bg-[#2c3e50] ring-1 ring-offset-2 ring-transparent hover:ring-gray-300" title="Navy"></button>
					</div>
				</div>

				<!-- Fabric Filter -->
				<div>
					<h3 class="text-sm font-medium tracking-widest uppercase mb-4 border-b border-black/10 pb-2">Fabric</h3>
					<ul class="space-y-3">
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Premium Nida</span>
							</label>
						</li>
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Silk Blend</span>
							</label>
						</li>
						<li>
							<label class="flex items-center space-x-3 cursor-pointer group">
								<input type="checkbox" class="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black">
								<span class="text-sm text-gray-600 font-light group-hover:text-black transition-colors">Linen</span>
							</label>
						</li>
					</ul>
				</div>
			</div>
		</aside>

		<!-- Product Grid -->
		<div class="flex-grow">
			<div class="grid {isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'grid-cols-1 gap-12'}">
				{#each products as item}
				<div class="group cursor-pointer {isGridView ? '' : 'flex flex-col sm:flex-row gap-8'}">
					<!-- Image -->
					<div class="relative overflow-hidden mb-4 bg-gray-100 {isGridView ? 'aspect-[3/4]' : 'w-full sm:w-1/3 aspect-[3/4] flex-shrink-0'}">
						{#if item.salePrice}
							<div class="absolute top-4 left-4 z-10 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">Sale</div>
						{/if}
						<img src={item.images && item.images.length > 0 ? item.images[0].url : ''} alt={item.name} class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
						
						<!-- Hover Actions -->
						<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex space-x-2">
							<button class="flex-1 bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors" onclick={(e) => {
								e.preventDefault();
								cart.addItem({
									id: item.variants && item.variants.length > 0 ? item.variants[0].id : item.id,
									productId: item.id,
									name: item.name,
									price: Number(item.salePrice || item.price),
									quantity: 1,
									image: item.images && item.images.length > 0 ? item.images[0].url : '',
									color: item.variants && item.variants.length > 0 ? item.variants[0].color : undefined,
									size: item.variants && item.variants.length > 0 ? item.variants[0].size : undefined,
								});
							}}>Add</button>
							<button class="w-12 bg-white text-black py-3 flex items-center justify-center hover:bg-gray-100 transition-colors" title="Add to Wishlist">
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
							</button>
						</div>
					</div>
					
					<!-- Info -->
					<div class="flex flex-col justify-center {isGridView ? '' : 'flex-grow py-4'}">
						<div class="flex justify-between items-start mb-1">
							<h3 class="text-lg font-serif group-hover:text-gold transition-colors">{item.name}</h3>
							<div class="flex flex-col items-end">
								<p class="text-md font-medium whitespace-nowrap ml-4">${item.salePrice || item.price}</p>
								{#if item.salePrice}
								<p class="text-sm font-light text-gray-400 line-through">${item.price}</p>
								{/if}
							</div>
						</div>
						
						<p class="text-sm text-gray-500 font-light mb-3">{item.variants && item.variants.length > 0 ? item.variants[0].color : ''}</p>
						
						{#if !isGridView}
							<p class="text-gray-600 font-light text-sm mb-6 max-w-xl">
								{item.description}
							</p>
							<a href="/shop/{item.slug}" class="inline-block border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors self-start">
								View Details
							</a>
						{/if}
					</div>
				</div>
				{/each}
			</div>

			<!-- Pagination -->
			<div class="mt-20 border-t border-black/10 pt-8 flex justify-center">
				<nav class="flex items-center space-x-2">
					<button class="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" /></svg>
					</button>
					<button class="w-10 h-10 flex items-center justify-center border border-black bg-black text-white text-sm font-medium">1</button>
					<button class="w-10 h-10 flex items-center justify-center border border-gray-200 text-black text-sm font-medium hover:border-black transition-colors">2</button>
					<button class="w-10 h-10 flex items-center justify-center border border-gray-200 text-black text-sm font-medium hover:border-black transition-colors">3</button>
					<span class="px-2 text-gray-400">...</span>
					<button class="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
					</button>
				</nav>
			</div>
		</div>
	</div>
</div>
