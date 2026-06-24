<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { products = [], onAddToCart } = $props<{
		products?: any[];
		onAddToCart?: (product: any) => void;
	}>();

	let selectedColor = $state('Midnight');
	let selectedSize = $state('M (54)');
	
	// Try to find Haya Everyday Abaya or Emerald Layered Abaya in products
	let spotlightProduct = $derived(
		products.find((p: any) => p.slug.includes('haya') || p.slug.includes('emerald')) || 
		products[0] || {
			id: 'default-spotlight',
			name: 'Haya Soft Nida Abaya',
			price: 7200,
			salePrice: null,
			description: 'Clean silhouette in deep midnight black, featuring a soft graceful fall.',
			images: [{ url: '/abaya11.png' }]
		}
	);

	function handleSpotlightAddToCart() {
		if (onAddToCart) {
			onAddToCart(spotlightProduct);
		}
	}
</script>

<section class="bg-[#fbf9f2] px-4 py-14 sm:px-6 lg:px-8 border-t border-[#14352d]/8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 text-center">
			<p class="mb-2 text-xs font-bold tracking-[0.2em] text-[#7b6a3d] uppercase">Special Offers</p>
			<h2 class="font-serif text-3xl leading-tight text-[#14352d] uppercase sm:text-4xl">Exclusive Deals & Edits</h2>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
			
			<!-- COLUMN 1: SLEEK CIRCULAR PRODUCT SPOTLIGHT (7 Cols) -->
			<div class="lg:col-span-7 flex flex-col justify-center overflow-hidden rounded-2xl bg-[#fffaf0] border border-[#14352d]/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(20,53,45,0.06)] relative group">
				<div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#e4b43d]/6 blur-[120px] pointer-events-none"></div>
				
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 w-full">
					<!-- Left Half: Content & Actions (5 cols) -->
					<div class="md:col-span-5 flex flex-col justify-center space-y-4">
						<div>
							<p class="text-[0.62rem] sm:text-[0.72rem] font-black tracking-[0.16em] text-[#7b6a3d] uppercase">New Arrival Offer</p>
							<h3 class="font-serif text-xl sm:text-2xl text-[#14352d] uppercase mt-0.5 leading-tight">{spotlightProduct.name}</h3>
						</div>

						<div class="flex items-baseline gap-2">
							<span class="text-2xl font-black text-[#14352d]">
								{spotlightProduct.salePrice ? formatMoney(spotlightProduct.salePrice) : formatMoney(spotlightProduct.price * 0.7)}
							</span>
							<span class="text-xs font-semibold text-red-600 line-through">
								{formatMoney(spotlightProduct.price)}
							</span>
						</div>

						<!-- Color Selector -->
						<div>
							<span class="block text-[0.62rem] font-bold tracking-wider text-[#596c62] uppercase mb-1.5 font-sans">Color: <span class="text-[#14352d] font-bold">{selectedColor}</span></span>
							<div class="flex gap-2">
								{#each ['Midnight', 'Sage', 'Mocha'] as color}
									<button
										onclick={() => selectedColor = color}
										class="h-5 w-5 rounded-full border transition-all duration-300 relative flex items-center justify-center {selectedColor === color ? 'border-[#14352d] ring-1 ring-[#14352d]' : 'border-gray-300'}"
										aria-label={color}
									>
										<span 
											class="h-3.5 w-3.5 rounded-full" 
											style="background-color: {color === 'Midnight' ? '#101411' : color === 'Sage' ? '#8fa99a' : '#7b5142'};"
										></span>
									</button>
								{/each}
							</div>
						</div>

						<!-- Size Selector -->
						<div>
							<span class="block text-[0.62rem] font-bold tracking-wider text-[#596c62] uppercase mb-1.5 font-sans">Size: <span class="text-[#14352d] font-bold">{selectedSize}</span></span>
							<div class="flex gap-1.5">
								{#each ['S (52)', 'M (54)', 'L (56)'] as size}
									<button
										onclick={() => selectedSize = size}
										class="px-2.5 py-1 rounded text-[0.58rem] font-black border transition-all duration-300 {selectedSize === size ? 'bg-[#14352d] text-white border-[#14352d]' : 'bg-[#fbf9f2] text-[#596c62] border-gray-200 hover:border-gray-400'}"
									>
										{size.split(' ')[0]}
									</button>
								{/each}
							</div>
						</div>

						<!-- CTA Button -->
						<div class="pt-2">
							<button
								onclick={handleSpotlightAddToCart}
								class="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#14352d] px-5 text-[0.72rem] font-black uppercase text-white shadow-md transition-all duration-300 hover:bg-[#e4b43d] hover:text-[#14352d] hover:-translate-y-0.5"
							>
								<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.4a2 2 0 001.9-1.4L21 7H6"/>
								</svg>
								Add to Cart
							</button>
						</div>
					</div>

					<!-- Right Half: Big Image & Circular Spotlight (7 cols) -->
					<div class="md:col-span-7 relative flex justify-center items-center h-[310px] md:h-[400px] overflow-visible">
						<!-- Big Circular Background -->
						<div class="absolute w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full bg-gradient-to-b from-[#e8eedc] via-[#ecdac8]/60 to-[#fffaf0] shadow-[inset_0_4px_30px_rgba(20,53,45,0.06)] flex items-center justify-center">
							<div class="w-[88%] h-[88%] rounded-full border border-[#14352d]/6 border-dashed"></div>
						</div>

						<!-- Image - significantly scaled up -->
						<div class="relative w-[230px] h-[290px] md:w-[300px] md:h-[380px] z-10 transition-transform duration-700 group-hover:scale-[1.03]">
							<img
								src={spotlightProduct.images?.[0]?.url || '/abaya11.png'}
								alt={spotlightProduct.name}
								class="w-full h-full object-cover rounded-2xl border border-[#14352d]/8 shadow-[0_15px_35px_rgba(20,53,45,0.15)] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
							/>
						</div>

						<!-- Floating Badges -->
						<div class="absolute top-2 right-4 z-20 flex h-16 w-16 md:h-18 md:w-18 shrink-0 rotate-12 flex-col items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d] shadow-lg outline outline-offset-2 outline-1 outline-[#e4b43d]/50 transition-transform duration-500 group-hover:scale-110">
							<span class="text-[0.58rem] md:text-[0.62rem] font-black tracking-[0.05em] uppercase leading-none">Save</span>
							<span class="text-base md:text-lg font-black leading-none my-0.5">30%</span>
							<span class="text-[0.45rem] md:text-[0.5rem] font-bold uppercase leading-none font-sans">Off</span>
						</div>

						<div class="absolute bottom-4 left-4 z-20 rounded-full bg-[#14352d] px-3 py-1 text-[0.58rem] font-bold text-white shadow-md tracking-wider uppercase">
							Online Exclusive
						</div>
					</div>
				</div>
			</div>

			<!-- COLUMN 2: CURATED CATEGORY CARDS (5 Cols) -->
			<div class="lg:col-span-5 flex flex-col justify-between gap-4">
				
				<!-- CARD 1: CHIFFON HIJABS -->
				<a 
					href="/shop?q=hijab"
					class="flex-1 flex items-center justify-between overflow-hidden rounded-xl bg-white border border-[#14352d]/8 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#e4b43d]/40 group"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div class="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9]">
							<img
								src="/ChatGPT Image May 25, 2026, 06_25_13 PM.png"
								alt="Premium Hijabs"
								class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div>
							<span class="inline-flex rounded-full bg-[#e4b43d]/12 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-[#7b6a3d] uppercase mb-0.5">
								Essential Match
							</span>
							<h4 class="font-serif text-sm sm:text-base font-bold text-[#14352d] uppercase">Premium Hijabs</h4>
							<p class="text-[0.68rem] font-medium text-[#596c62] mt-0.5">Soft Georgette & Chiffon, 12 colors.</p>
							<span class="block text-xs font-black text-[#7b6a3d] mt-1.5">From Rs. 1,490</span>
						</div>
					</div>
					<div class="h-7 w-7 rounded-full bg-[#14352d]/5 flex items-center justify-center text-[#14352d] group-hover:bg-[#14352d] group-hover:text-white transition-colors">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>

				<!-- CARD 2: EVERYDAY CREPE -->
				<a 
					href="/shop?category=daily-wear"
					class="flex-1 flex items-center justify-between overflow-hidden rounded-xl bg-white border border-[#14352d]/8 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#e4b43d]/40 group"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div class="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9]">
							<img
								src="/abaya11.png"
								alt="Everyday wear"
								class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div>
							<span class="inline-flex rounded-full bg-[#14352d]/6 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-[#14352d] uppercase mb-0.5">
								Free Shipping
							</span>
							<h4 class="font-serif text-sm sm:text-base font-bold text-[#14352d] uppercase">Daily Crepe Cuts</h4>
							<p class="text-[0.68rem] font-medium text-[#596c62] mt-0.5">Minimalist cuts for all-day comfort.</p>
							<span class="block text-xs font-black text-[#7b6a3d] mt-1.5">From Rs. 4,990</span>
						</div>
					</div>
					<div class="h-7 w-7 rounded-full bg-[#14352d]/5 flex items-center justify-center text-[#14352d] group-hover:bg-[#14352d] group-hover:text-white transition-colors">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>

				<!-- CARD 3: LUXURY EMBROIDERY -->
				<a 
					href="/shop?category=occasion"
					class="flex-1 flex items-center justify-between overflow-hidden rounded-xl bg-white border border-[#14352d]/8 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#e4b43d]/40 group"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div class="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9]">
							<img
								src="/abaya22.png"
								alt="Luxe stonework"
								class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div>
							<span class="inline-flex rounded-full bg-[#14352d]/6 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-red-600 uppercase mb-0.5">
								Limited Edition
							</span>
							<h4 class="font-serif text-sm sm:text-base font-bold text-[#14352d] uppercase">Luxe Stonework</h4>
							<p class="text-[0.68rem] font-medium text-[#596c62] mt-0.5">Intricate hand-stitched sleeve detailing.</p>
							<span class="block text-xs font-black text-[#7b6a3d] mt-1.5">From Rs. 7,490</span>
						</div>
					</div>
					<div class="h-7 w-7 rounded-full bg-[#14352d]/5 flex items-center justify-center text-[#14352d] group-hover:bg-[#14352d] group-hover:text-white transition-colors">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>

			</div>

		</div>
	</div>
</section>
