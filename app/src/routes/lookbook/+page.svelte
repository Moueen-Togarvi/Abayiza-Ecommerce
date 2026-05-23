<script lang="ts">
	let lookbookImages = [
		{ id: 1, caption: 'The Everyday Edit', sub: 'Signature Nida Abaya in Midnight Black', img: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=800&auto=format&fit=crop', productId: 1 },
		{ id: 2, caption: 'Evening Luxe', sub: 'Pearl Embellished Abaya', img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop', productId: 2 },
		{ id: 3, caption: 'Summer Breeze', sub: 'Chiffon Layered Abaya in Sand', img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop', productId: 4 },
		{ id: 4, caption: 'The Artisan Edit', sub: 'Hand-embroidered Collar Abaya', img: 'https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=800&auto=format&fit=crop', productId: 6 },
		{ id: 5, caption: 'Occasion Wear', sub: 'Velvet Trim Evening Abaya in Dusty Rose', img: 'https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=800&auto=format&fit=crop', productId: 3 },
		{ id: 6, caption: 'The Wedding Edit', sub: 'Ivory Silk Embellished Abaya', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop', productId: 5 },
	];

	let activeImage: number | null = null;
</script>

<svelte:head>
	<title>Lookbook | Abayiza</title>
</svelte:head>

<!-- Hero -->
<section class="relative h-[65vh] min-h-[400px] flex items-end justify-center overflow-hidden pb-16">
	<div class="absolute inset-0 bg-black/50 z-10"></div>
	<img 
		src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=2000&auto=format&fit=crop"
		alt="Lookbook Hero"
		class="absolute inset-0 w-full h-full object-cover object-center"
	/>
	<div class="relative z-20 text-center px-4">
		<p class="text-white/70 text-sm font-light tracking-widest uppercase mb-3">Summer / Autumn 2026</p>
		<h1 class="text-4xl md:text-6xl text-white font-serif tracking-widest uppercase mb-4">The Lookbook</h1>
		<div class="w-16 h-[1px] bg-white/40 mx-auto"></div>
	</div>
</section>

<!-- Intro Text -->
<div class="max-w-2xl mx-auto text-center px-4 py-16">
	<h2 class="text-2xl font-serif text-black mb-6">Style Meets Substance</h2>
	<p class="text-gray-500 font-light leading-relaxed">This season, Abayiza presents a collection steeped in quiet luxury. Each piece is a study in restraint — fabric that moves, silhouettes that empower, and details that whisper rather than shout.</p>
</div>

<!-- Masonry-Style Gallery -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
	<div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
		{#each lookbookImages as item, i}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative break-inside-avoid group overflow-hidden cursor-pointer {i === 1 ? 'mt-16' : ''} {i === 3 ? 'mt-8' : ''}"
			onmouseenter={() => activeImage = item.id}
			onmouseleave={() => activeImage = null}
		>
			<div class="aspect-[{i % 3 === 1 ? '2/3' : '3/4'}] overflow-hidden bg-gray-100">
				<img 
					src={item.img} 
					alt={item.caption}
					class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
			</div>
			<!-- Overlay -->
			<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
				<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-6">
					<a href="/shop/{item.productId}" class="inline-block bg-white text-black text-xs px-6 py-3 tracking-widest uppercase hover:bg-gold hover:text-white transition-colors mb-3">
						Shop the Look
					</a>
				</div>
			</div>
			<!-- Caption bar -->
			<div class="pt-4 pb-2">
				<h3 class="text-sm font-serif text-black">{item.caption}</h3>
				<p class="text-xs text-gray-400 font-light mt-1">{item.sub}</p>
			</div>
		</div>
		{/each}
	</div>

	<!-- Bottom CTA -->
	<div class="text-center mt-20 pt-16 border-t border-gray-200">
		<p class="text-sm font-light text-gray-500 mb-2 tracking-widest uppercase">Share Your Look</p>
		<h2 class="text-2xl md:text-3xl font-serif text-black mb-6">Tag us @abayiza</h2>
		<a href="/shop" class="inline-block bg-black text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
			Shop the Collection
		</a>
	</div>
</div>
