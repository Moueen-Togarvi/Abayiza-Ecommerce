<script lang="ts">
	let { data } = $props();
	let collections = $derived(data.collections || []);
</script>

<svelte:head>
	<title>Collections | Abayiza</title>
</svelte:head>

<!-- Hero Banner -->
<section class="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0 bg-black/40 z-10"></div>
	<img 
		src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=2000&auto=format&fit=crop"
		alt="Collections" 
		class="absolute inset-0 w-full h-full object-cover object-center"
	/>
	<div class="relative z-20 text-center px-4">
		<h1 class="text-4xl md:text-5xl text-white font-serif tracking-widest uppercase mb-4">Our Collections</h1>
		<p class="text-white/80 font-light text-lg">Curated with intention. Crafted with love.</p>
	</div>
</section>

<!-- Collections Grid -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
	<!-- Featured 2-up -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
		{#each collections.slice(0, 2) as col}
		<a href="/shop?collection={col.slug}" class="group relative aspect-[4/3] overflow-hidden block bg-gray-100">
			<img src={col.imageUrl} alt={col.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
			<div class="absolute bottom-0 left-0 right-0 p-8">
				<h2 class="text-2xl md:text-3xl font-serif text-white mb-2">{col.name}</h2>
				<p class="text-white/70 font-light text-sm mb-4">{col.description}</p>
				<span class="inline-flex items-center text-white text-xs tracking-widest uppercase border-b border-white/50 pb-0.5 group-hover:border-gold group-hover:text-gold transition-colors">
					Shop {col._count.products} Pieces
					<svg class="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
				</span>
			</div>
		</a>
		{/each}
	</div>

	<!-- 4-up Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
		{#each collections.slice(2) as col}
		<a href="/shop?collection={col.slug}" class="group relative aspect-[3/4] overflow-hidden block bg-gray-100">
			<img src={col.imageUrl} alt={col.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
			<div class="absolute bottom-0 left-0 right-0 p-5">
				<h2 class="text-base md:text-lg font-serif text-white mb-1">{col.name}</h2>
				<p class="text-white/60 font-light text-xs">{col._count.products} Pieces</p>
			</div>
		</a>
		{/each}
	</div>
</div>
