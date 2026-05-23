<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	let { data } = $props();
	let product = $derived(data.product);

	let activeImage = $state(0);
	let images = $derived(product.images?.map(i => i.url) || []);
	
	let selectedColor = $state('');
	let selectedSize = $state('');
	
	$effect(() => {
		if (product.variants && product.variants.length > 0) {
			if (!selectedColor) selectedColor = product.variants[0].color || '';
			if (!selectedSize) selectedSize = product.variants[0].size || '';
		}
	});

	let quantity = $state(1);
	let activeTab = $state('details'); // details, shipping, reviews
</script>

<svelte:head>
	<title>{product.name} | Abayiza</title>
</svelte:head>

<!-- Breadcrumbs -->
<div class="border-b border-black/5 bg-cream/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
		<nav class="flex text-xs tracking-widest uppercase text-gray-500">
			<a href="/" class="hover:text-black transition-colors">Home</a>
			<span class="mx-2">/</span>
			<a href="/shop" class="hover:text-black transition-colors">Shop</a>
			<span class="mx-2">/</span>
			<a href="/collections/everyday" class="hover:text-black transition-colors">Everyday</a>
			<span class="mx-2">/</span>
			<span class="text-black">{product.name}</span>
		</nav>
	</div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
		
		<!-- Image Gallery -->
		<div class="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
			<!-- Thumbnails (Desktop: Vertical, Mobile: Horizontal) -->
			<div class="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 lg:w-20 flex-shrink-0">
				{#each images as img, i}
				<button 
					class="w-16 h-20 lg:w-20 lg:h-28 flex-shrink-0 bg-gray-100 border-2 transition-colors {activeImage === i ? 'border-black' : 'border-transparent hover:border-gray-300'}"
					onclick={() => activeImage = i}
				>
					<img src={img} alt="Thumbnail {i+1}" class="w-full h-full object-cover object-top" />
				</button>
				{/each}
			</div>
			
			<!-- Main Image -->
			<div class="flex-grow bg-gray-100 relative group cursor-zoom-in aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
				<div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
					Bestseller
				</div>
				<img src={images[activeImage]} alt="Product Main" class="w-full h-full object-cover object-top transition-transform duration-500" />
			</div>
		</div>
		
		<!-- Product Info -->
		<div class="w-full lg:w-1/2 flex flex-col">
			<div class="mb-8">
				<h1 class="text-3xl md:text-4xl font-serif tracking-wide text-black mb-2">{product.name}</h1>
				<div class="flex items-center space-x-4 mb-4">
					<p class="text-2xl font-light text-black">${product.salePrice || product.price}</p>
					{#if product.salePrice}
					<p class="text-xl font-light text-gray-400 line-through">${product.price}</p>
					{/if}
					<div class="flex items-center space-x-1 border-l border-gray-300 pl-4">
						{#each [1, 2, 3, 4, 5] as star}
						<svg class="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
						{/each}
						<span class="text-xs text-gray-500 ml-2 underline cursor-pointer">42 Reviews</span>
					</div>
				</div>
				<p class="text-gray-600 font-light text-sm leading-relaxed whitespace-pre-wrap">
					{product.description}
				</p>
			</div>

			<!-- Color Selection -->
			<div class="mb-6">
				<div class="flex justify-between items-end mb-3">
					<span class="text-sm font-medium tracking-widest uppercase">Color: <span class="text-gray-500 font-light normal-case ml-1">{selectedColor}</span></span>
				</div>
				<div class="flex space-x-3">
					<button onclick={() => selectedColor = 'Midnight Black'} class="w-8 h-8 rounded-full bg-black ring-1 ring-offset-2 {selectedColor === 'Midnight Black' ? 'ring-black' : 'ring-transparent hover:ring-gray-300'} transition-all" title="Midnight Black"></button>
					<button onclick={() => selectedColor = 'Dusty Rose'} class="w-8 h-8 rounded-full bg-[#d1b8b4] ring-1 ring-offset-2 {selectedColor === 'Dusty Rose' ? 'ring-[#d1b8b4]' : 'ring-transparent hover:ring-gray-300'} transition-all" title="Dusty Rose"></button>
					<button onclick={() => selectedColor = 'Cream'} class="w-8 h-8 rounded-full bg-[#fdfbf7] border border-gray-200 ring-1 ring-offset-2 {selectedColor === 'Cream' ? 'ring-gray-400' : 'ring-transparent hover:ring-gray-300'} transition-all" title="Cream"></button>
				</div>
			</div>

			<!-- Size Selection -->
			<div class="mb-8">
				<div class="flex justify-between items-end mb-3">
					<span class="text-sm font-medium tracking-widest uppercase">Size (Length): <span class="text-gray-500 font-light normal-case ml-1">{selectedSize}</span></span>
					<button class="text-xs text-gray-500 underline hover:text-black transition-colors flex items-center">
						<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
						Size Guide
					</button>
				</div>
				<div class="grid grid-cols-4 gap-3">
					{#each ['S (52)', 'M (54)', 'L (56)', 'XL (58)', 'XXL (60)'] as size}
					<button 
						onclick={() => selectedSize = size}
						class="py-3 border text-sm font-medium transition-colors {selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-black'}"
					>
						{size}
					</button>
					{/each}
				</div>
				<p class="text-xs text-red-500 mt-2 font-light flex items-center">
					<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
					Only 2 left in this size
				</p>
			</div>

			<!-- Add to Cart / Actions -->
			<div class="flex flex-col sm:flex-row gap-4 mb-10">
				<!-- Quantity -->
				<div class="flex border border-gray-300 w-full sm:w-32 h-14">
					<button class="w-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors" onclick={() => quantity > 1 ? quantity-- : 1}>-</button>
					<input type="number" class="w-full bg-transparent border-none text-center focus:ring-0 text-sm font-medium" bind:value={quantity} min="1">
					<button class="w-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors" onclick={() => quantity++}>+</button>
				</div>
				
				<!-- Add to Cart Btn -->
				<button 
					class="flex-grow bg-black text-white h-14 text-sm tracking-widest uppercase hover:bg-gold transition-colors flex items-center justify-center space-x-2"
					onclick={() => {
						const matchingVariant = product.variants.find(v => v.color === selectedColor && v.size === selectedSize) || product.variants[0];
						cart.addItem({
							id: matchingVariant ? matchingVariant.id : product.id,
							productId: product.id,
							name: product.name,
							price: Number(product.salePrice || product.price),
							quantity: quantity,
							image: images[0] || '',
							color: selectedColor,
							size: selectedSize
						});
					}}
				>
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
					<span>Add to Bag</span>
				</button>
				
				<!-- Wishlist -->
				<button class="w-14 h-14 border border-gray-300 flex-shrink-0 flex items-center justify-center hover:border-black hover:text-black transition-colors" title="Add to Wishlist">
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
				</button>
			</div>

			<!-- Shipping info quick banner -->
			<div class="bg-gray-50 p-4 flex items-start space-x-4 mb-10 border border-gray-100">
				<svg class="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				<div>
					<p class="text-sm font-medium mb-1">Free Worldwide Shipping</p>
					<p class="text-xs text-gray-500 font-light">On all orders over $250. Express delivery options available at checkout.</p>
				</div>
			</div>

			<!-- Accordion Info (Tabs) -->
			<div class="border-t border-gray-200">
				<div class="flex space-x-8 border-b border-gray-200">
					<button class="py-4 text-sm font-medium tracking-widest uppercase relative {activeTab === 'details' ? 'text-black' : 'text-gray-400 hover:text-black'}" onclick={() => activeTab = 'details'}>
						Details
						{#if activeTab === 'details'}
							<span class="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
						{/if}
					</button>
					<button class="py-4 text-sm font-medium tracking-widest uppercase relative {activeTab === 'shipping' ? 'text-black' : 'text-gray-400 hover:text-black'}" onclick={() => activeTab = 'shipping'}>
						Shipping & Returns
						{#if activeTab === 'shipping'}
							<span class="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
						{/if}
					</button>
				</div>
				
				<div class="py-6 text-sm text-gray-600 font-light leading-relaxed">
					{#if activeTab === 'details'}
						<ul class="list-disc pl-4 space-y-2">
							<li>Fabric: 100% Premium Korean Nida</li>
							<li>Matching Shayla (hijab) included</li>
							<li>Hidden front button closure</li>
							<li>Discreet side slit pockets</li>
							<li>Model is 170cm (5'7") and wears size 56</li>
							<li>Care: Hand wash or delicate machine wash cold. Do not tumble dry.</li>
						</ul>
					{:else}
						<p class="mb-4"><strong>Shipping:</strong> We process all orders within 1-2 business days. Express international shipping typically takes 3-5 business days via DHL Express.</p>
						<p><strong>Returns:</strong> We accept returns and exchanges within 14 days of delivery. Items must be unworn, with all original tags attached. Please note that return shipping costs are the responsibility of the customer unless the item is faulty.</p>
					{/if}
				</div>
			</div>
			
			<!-- WhatsApp contact -->
			<div class="mt-8 pt-6 border-t border-gray-200">
				<a href="https://wa.me/1234567890" target="_blank" class="flex items-center text-sm font-medium hover:text-gold transition-colors">
					<svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
					Have questions about this item? Chat with us
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Complete The Look / Cross-sell -->
<div class="bg-white py-24 border-t border-gray-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-2xl font-serif tracking-widest uppercase text-black mb-4">Complete The Look</h2>
			<div class="w-12 h-[1px] bg-gold mx-auto"></div>
		</div>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			<!-- Product Array Loop (Simulated) -->
			{#each [5, 6, 7, 8] as item}
			<div class="group cursor-pointer">
				<div class="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
					<img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop&sig={item}" alt="Accessory {item}" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
					<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
						<button class="w-full bg-black text-white py-2 text-xs tracking-widest uppercase hover:bg-gold transition-colors">Quick Add</button>
					</div>
				</div>
				<h3 class="text-sm font-serif mb-1 group-hover:text-gold transition-colors">Premium Chiffon Hijab</h3>
				<p class="text-xs text-gray-500 font-medium">$25.00</p>
			</div>
			{/each}
		</div>
	</div>
</div>
