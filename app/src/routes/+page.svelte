<script lang="ts">
	// Hero section images or data could be loaded here
</script>

<svelte:head>
	<title>Abayiza | Premium Modest Fashion</title>
	<meta name="description" content="Elevating modest fashion with premium craftsmanship and timeless design." />
</svelte:head>

<!-- Hero Section -->
<section class="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
	<!-- Background Image Placeholder (You can replace this with an actual image or video) -->
	<div class="absolute inset-0 bg-black/40 z-10"></div>
	<img 
		src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=2000&auto=format&fit=crop" 
		alt="Abayiza Collection" 
		class="absolute inset-0 w-full h-full object-cover object-top"
	/>
	
	<!-- Hero Content -->
	<div class="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
		<h1 class="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-widest uppercase mb-6 leading-tight">
			Grace in Every Thread
		</h1>
		<p class="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl">
			Discover our new luxury collection of abayas, crafted for elegance and designed for the modern woman.
		</p>
		<a 
			href="/collections/new" 
			class="inline-block bg-white text-black px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300 transform hover:scale-105"
		>
			Shop New Collection
		</a>
	</div>
</section>

<!-- Featured Collections -->
<section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
	<div class="text-center mb-16">
		<h2 class="text-3xl font-serif tracking-widest uppercase text-black mb-4">Curated Edits</h2>
		<div class="w-16 h-[1px] bg-gold mx-auto"></div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<!-- Collection Card 1 -->
		<a href="/collections/everyday" class="group relative block h-[500px] overflow-hidden">
			<div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
			<img 
				src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop" 
				alt="Everyday Abaya" 
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div class="absolute inset-0 z-20 flex flex-col justify-end p-8">
				<h3 class="text-white text-2xl font-serif tracking-wide mb-2">Everyday Elegance</h3>
				<span class="text-white/80 text-sm tracking-wider uppercase group-hover:text-gold transition-colors duration-300">Shop Now &rarr;</span>
			</div>
		</a>

		<!-- Collection Card 2 -->
		<a href="/collections/wedding" class="group relative block h-[500px] overflow-hidden md:-mt-8">
			<div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
			<img 
				src="https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=800&auto=format&fit=crop" 
				alt="Wedding Abaya" 
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div class="absolute inset-0 z-20 flex flex-col justify-end p-8">
				<h3 class="text-white text-2xl font-serif tracking-wide mb-2">The Wedding Edit</h3>
				<span class="text-white/80 text-sm tracking-wider uppercase group-hover:text-gold transition-colors duration-300">Shop Now &rarr;</span>
			</div>
		</a>

		<!-- Collection Card 3 -->
		<a href="/collections/summer" class="group relative block h-[500px] overflow-hidden">
			<div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
			<img 
				src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop" 
				alt="Summer Edit" 
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div class="absolute inset-0 z-20 flex flex-col justify-end p-8">
				<h3 class="text-white text-2xl font-serif tracking-wide mb-2">Summer Breeze</h3>
				<span class="text-white/80 text-sm tracking-wider uppercase group-hover:text-gold transition-colors duration-300">Shop Now &rarr;</span>
			</div>
		</a>
	</div>
</section>

<!-- Brand Story Strip -->
<section class="bg-[#111111] text-white py-24 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
		<div class="w-full md:w-1/2 relative h-[600px]">
			<img 
				src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop" 
				alt="Craftsmanship" 
				class="absolute inset-0 w-full h-full object-cover"
			/>
			<div class="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-gold hidden md:block"></div>
		</div>
		<div class="w-full md:w-1/2 flex flex-col items-start">
			<h2 class="text-sm tracking-widest text-gold uppercase mb-4">Our Ethos</h2>
			<h3 class="text-4xl font-serif leading-tight mb-8">Modesty is not just how we dress, it's how we carry ourselves.</h3>
			<p class="text-gray-400 font-light text-lg mb-10">
				At Abayiza, we believe in the art of refinement. Every piece is meticulously handstitched using premium Nida fabric, blending traditional silhouettes with contemporary minimalism. Our designs are crafted to empower you with quiet confidence.
			</p>
			<a href="/about" class="border-b border-white pb-1 text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors">
				Read Our Story
			</a>
		</div>
	</div>
</section>

<!-- New Arrivals (Horizontal Scroll / Grid) -->
<section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
	<div class="flex justify-between items-end mb-12">
		<div>
			<h2 class="text-3xl font-serif tracking-widest uppercase text-black mb-2">New Arrivals</h2>
			<p class="text-gray-500 font-light">The latest additions to our collection</p>
		</div>
		<a href="/collections/new" class="hidden md:inline-block border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors">
			View All
		</a>
	</div>
	
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
		<!-- Product Card 1 -->
		<div class="group cursor-pointer">
			<div class="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
				<img src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=600&auto=format&fit=crop" alt="Ayla Nida Abaya" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button class="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors">Quick Add</button>
				</div>
			</div>
			<h3 class="text-lg font-serif mb-1 group-hover:text-gold transition-colors">Ayla Nida Abaya</h3>
			<p class="text-sm text-gray-500 font-light mb-2">Dusty Rose</p>
			<p class="text-md font-medium">$120.00</p>
		</div>
		<!-- Product Card 2 -->
		<div class="group cursor-pointer">
			<div class="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
				<div class="absolute top-4 left-4 z-10 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">New</div>
				<img src="https://images.unsplash.com/photo-1627589255869-42b78b8f2d5e?q=80&w=600&auto=format&fit=crop" alt="Zahra Wrap Abaya" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button class="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors">Quick Add</button>
				</div>
			</div>
			<h3 class="text-lg font-serif mb-1 group-hover:text-gold transition-colors">Zahra Wrap Abaya</h3>
			<p class="text-sm text-gray-500 font-light mb-2">Midnight Black</p>
			<p class="text-md font-medium">$145.00</p>
		</div>
		<!-- Product Card 3 -->
		<div class="group cursor-pointer">
			<div class="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
				<img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=600&auto=format&fit=crop" alt="Lina Silk Blend" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button class="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors">Quick Add</button>
				</div>
			</div>
			<h3 class="text-lg font-serif mb-1 group-hover:text-gold transition-colors">Lina Silk Blend</h3>
			<p class="text-sm text-gray-500 font-light mb-2">Sand</p>
			<p class="text-md font-medium">$165.00</p>
		</div>
		<!-- Product Card 4 -->
		<div class="group cursor-pointer hidden lg:block">
			<div class="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
				<img src="https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=600&auto=format&fit=crop" alt="Nour Embellished" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				<div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button class="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors">Quick Add</button>
				</div>
			</div>
			<h3 class="text-lg font-serif mb-1 group-hover:text-gold transition-colors">Nour Embellished</h3>
			<p class="text-sm text-gray-500 font-light mb-2">Emerald</p>
			<p class="text-md font-medium">$180.00</p>
		</div>
	</div>
</section>

<!-- Trust / Quality Highlights -->
<section class="bg-white py-16 border-y border-gray-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			<div class="flex flex-col items-center">
				<svg class="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
				</svg>
				<h4 class="text-sm font-medium tracking-widest uppercase mb-2">Premium Nida</h4>
				<p class="text-xs text-gray-500 font-light">Finest fabrics sourced globally</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
				</svg>
				<h4 class="text-sm font-medium tracking-widest uppercase mb-2">Handstitched</h4>
				<p class="text-xs text-gray-500 font-light">Impeccable attention to detail</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h4 class="text-sm font-medium tracking-widest uppercase mb-2">Ships Worldwide</h4>
				<p class="text-xs text-gray-500 font-light">Fast, reliable global shipping</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				<h4 class="text-sm font-medium tracking-widest uppercase mb-2">Easy Returns</h4>
				<p class="text-xs text-gray-500 font-light">14-day hassle-free return policy</p>
			</div>
		</div>
	</div>
</section>

<!-- Bestsellers (With Badges & Ratings) -->
<section class="py-24 bg-cream">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-serif tracking-widest uppercase text-black mb-4">Most Loved</h2>
			<div class="w-16 h-[1px] bg-gold mx-auto"></div>
		</div>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
			<!-- Product Array Loop (Simulated for top 4) -->
			{#each [1, 2, 3, 4] as item}
			<div class="group cursor-pointer">
				<div class="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
					{#if item === 1}
						<div class="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Most Loved</div>
					{/if}
					{#if item === 3}
						<div class="absolute top-3 left-3 z-10 bg-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Limited</div>
					{/if}
					<img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop&sig={item}" alt="Bestseller {item}" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
				</div>
				<div class="flex items-center space-x-1 mb-2">
					{#each [1, 2, 3, 4, 5] as star}
					<svg class="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
					{/each}
					<span class="text-xs text-gray-400 ml-1">(24)</span>
				</div>
				<h3 class="text-md font-serif mb-1 group-hover:text-gold transition-colors">Classic Essential Abaya</h3>
				<p class="text-sm font-medium">$89.00</p>
			</div>
			{/each}
		</div>
	</div>
</section>

<!-- Lookbook / Style Gallery -->
<section class="py-0 overflow-hidden">
	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-64 md:h-80">
		{#each [1, 2, 3, 4, 5, 6] as item}
		<div class="relative group cursor-pointer overflow-hidden {item > 4 ? 'hidden lg:block' : ''} {item > 2 && item <= 4 ? 'hidden md:block' : ''}">
			<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 z-10 flex items-center justify-center">
				<svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
				</svg>
			</div>
			<img src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=400&auto=format&fit=crop&sig={item + 10}" alt="Instagram {item}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
		</div>
		{/each}
	</div>
	<div class="bg-black text-center py-6">
		<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-white text-xs tracking-widest uppercase hover:text-gold transition-colors flex items-center justify-center">
			<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
			Follow @Abayiza on Instagram
		</a>
	</div>
</section>

<!-- Customer Reviews -->
<section class="py-24 bg-white">
	<div class="max-w-4xl mx-auto px-4 text-center">
		<h2 class="text-3xl font-serif tracking-widest uppercase text-black mb-16">The Abayiza Experience</h2>
		
		<div class="relative">
			<div class="flex flex-col items-center">
				<div class="flex space-x-1 mb-6">
					{#each [1, 2, 3, 4, 5] as star}
					<svg class="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
					{/each}
				</div>
				<p class="text-xl md:text-2xl font-serif leading-relaxed italic mb-8">
					"The craftsmanship is unparalleled. I purchased the Everyday Abaya for work, and the Nida fabric drapes so beautifully. It feels incredibly luxurious yet practical. I will definitely be purchasing more."
				</p>
				<p class="text-sm tracking-widest uppercase font-medium">Aisha K.</p>
				<p class="text-xs text-gray-500 mt-1">Verified Buyer</p>
			</div>
			
			<!-- Carousel Controls (Static for now) -->
			<div class="flex justify-center space-x-4 mt-12">
				<button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" /></svg>
				</button>
				<button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
				</button>
			</div>
		</div>
	</div>
</section>
