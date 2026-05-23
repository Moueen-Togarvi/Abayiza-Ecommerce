<script lang="ts">
	let wishlistItems = [
		{
			id: 1, name: 'Signature Nida Abaya', price: 145.00, originalPrice: 180.00,
			color: 'Midnight Black', inStock: true,
			image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=600&auto=format&fit=crop'
		},
		{
			id: 2, name: 'Pearl Embellished Open Abaya', price: 220.00, originalPrice: null,
			color: 'Ivory White', inStock: true,
			image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=600&auto=format&fit=crop'
		},
		{
			id: 3, name: 'Velvet Trim Evening Abaya', price: 185.00, originalPrice: null,
			color: 'Dusty Rose', inStock: false,
			image: 'https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=600&auto=format&fit=crop'
		},
		{
			id: 4, name: 'Chiffon Layered Abaya', price: 165.00, originalPrice: 200.00,
			color: 'Smoke Grey', inStock: true,
			image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop'
		}
	];

	function removeFromWishlist(id: number) {
		wishlistItems = wishlistItems.filter(item => item.id !== id);
	}
</script>

<svelte:head>
	<title>My Wishlist | Abayiza</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">My Wishlist</h1>
		<div class="w-12 h-[1px] bg-gold mx-auto"></div>
		{#if wishlistItems.length > 0}
		<p class="text-gray-500 font-light text-sm mt-4">{wishlistItems.length} saved {wishlistItems.length === 1 ? 'piece' : 'pieces'}</p>
		{/if}
	</div>

	{#if wishlistItems.length === 0}
	<!-- Empty State -->
	<div class="text-center py-20">
		<svg class="w-16 h-16 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
		</svg>
		<h2 class="text-xl font-serif text-black mb-4">Your wishlist is empty</h2>
		<p class="text-gray-500 font-light mb-8">Save your favourite pieces to revisit them later.</p>
		<a href="/shop" class="inline-block bg-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
			Explore Collection
		</a>
	</div>
	{:else}
	<!-- Wishlist Grid -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
		{#each wishlistItems as item}
		<div class="group relative">
			<!-- Product Image -->
			<div class="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
				<a href="/shop/{item.id}">
					<img src={item.image} alt={item.name} class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				</a>
				<!-- Out of stock overlay -->
				{#if !item.inStock}
				<div class="absolute inset-0 bg-white/70 flex items-center justify-center">
					<span class="text-xs font-medium tracking-widest uppercase text-black bg-white/90 px-4 py-2">Sold Out</span>
				</div>
				{/if}
				<!-- Remove from wishlist -->
				<button
					class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
					onclick={() => removeFromWishlist(item.id)}
					aria-label="Remove from wishlist"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
				</button>
				<!-- Quick Add -->
				{#if item.inStock}
				<div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button class="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors">
						Add to Bag
					</button>
				</div>
				{/if}
			</div>
			<!-- Info -->
			<div>
				<a href="/shop/{item.id}" class="block text-sm font-serif hover:text-gold transition-colors mb-1 leading-snug">{item.name}</a>
				<p class="text-xs text-gray-400 font-light mb-2">{item.color}</p>
				<div class="flex items-center space-x-2">
					<span class="text-sm font-medium">${item.price.toFixed(2)}</span>
					{#if item.originalPrice}
					<span class="text-sm text-gray-400 line-through font-light">${item.originalPrice.toFixed(2)}</span>
					<span class="text-xs text-red-500 font-medium">
						{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
					</span>
					{/if}
				</div>
			</div>
		</div>
		{/each}
	</div>

	<!-- Actions Bar -->
	<div class="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
		<button class="text-sm text-gray-500 hover:text-black underline transition-colors">
			Move all to Bag
		</button>
		<div class="flex gap-4">
			<a href="/shop" class="border border-black text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors">
				Continue Shopping
			</a>
			<button class="bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
				Add All to Bag
			</button>
		</div>
	</div>
	{/if}
</div>
