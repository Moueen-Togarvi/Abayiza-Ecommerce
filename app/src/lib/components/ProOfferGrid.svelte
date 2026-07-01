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

<section class="border-t border-[#14352d]/8 bg-[#fbf9f2] px-4 py-14 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 text-center">
			<p class="mb-2 text-xs font-bold tracking-[0.2em] text-[#7b6a3d] uppercase">Special Offers</p>
			<h2 class="font-serif text-3xl leading-tight text-[#14352d] uppercase sm:text-4xl">
				Exclusive Deals & Edits
			</h2>
		</div>

		<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
			<!-- COLUMN 1: SLEEK CIRCULAR PRODUCT SPOTLIGHT (7 Cols) -->
			<div
				class="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-[#14352d]/10 bg-[#fffaf0] p-6 shadow-[0_20px_50px_rgba(20,53,45,0.06)] sm:p-8 lg:col-span-7"
			>
				<div
					class="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#e4b43d]/6 blur-[120px]"
				></div>

				<div class="z-10 grid w-full grid-cols-1 items-center gap-6 md:grid-cols-12">
					<!-- Left Half: Content & Actions (5 cols) -->
					<div
						class="order-2 flex flex-col items-center justify-center space-y-4 text-center md:order-1 md:col-span-5 md:items-start md:text-left"
					>
						<div>
							<p
								class="text-[0.62rem] font-black tracking-[0.16em] text-[#7b6a3d] uppercase sm:text-[0.72rem]"
							>
								New Arrival Offer
							</p>
							<h3
								class="mt-0.5 font-serif text-xl leading-tight text-[#14352d] uppercase sm:text-2xl"
							>
								{spotlightProduct.name}
							</h3>
						</div>

						<div class="flex items-baseline justify-center gap-2 md:justify-start">
							<span class="text-2xl font-black text-[#14352d]">
								{spotlightProduct.salePrice
									? formatMoney(spotlightProduct.salePrice)
									: formatMoney(spotlightProduct.price * 0.7)}
							</span>
							<span class="text-xs font-semibold text-red-600 line-through">
								{formatMoney(spotlightProduct.price)}
							</span>
						</div>

						<!-- Color Selector -->
						<div class="flex w-full flex-col items-center md:items-start">
							<span
								class="mb-1.5 block font-sans text-[0.62rem] font-bold tracking-wider text-[#596c62] uppercase"
								>Color: <span class="font-bold text-[#14352d]">{selectedColor}</span></span
							>
							<div class="flex justify-center gap-2 md:justify-start">
								{#each ['Midnight', 'Sage', 'Mocha'] as color}
									<button
										onclick={() => (selectedColor = color)}
										class="relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 {selectedColor ===
										color
											? 'border-[#14352d] ring-1 ring-[#14352d]'
											: 'border-gray-300'}"
										aria-label={color}
									>
										<span
											class="h-3.5 w-3.5 rounded-full"
											style="background-color: {color === 'Midnight'
												? '#101411'
												: color === 'Sage'
													? '#8fa99a'
													: '#7b5142'};"
										></span>
									</button>
								{/each}
							</div>
						</div>

						<!-- Size Selector -->
						<div class="flex w-full flex-col items-center md:items-start">
							<span
								class="mb-1.5 block font-sans text-[0.62rem] font-bold tracking-wider text-[#596c62] uppercase"
								>Size: <span class="font-bold text-[#14352d]">{selectedSize}</span></span
							>
							<div class="flex justify-center gap-1.5 md:justify-start">
								{#each ['S (52)', 'M (54)', 'L (56)'] as size}
									<button
										onclick={() => (selectedSize = size)}
										class="rounded border px-2.5 py-1 text-[0.58rem] font-black transition-all duration-300 {selectedSize ===
										size
											? 'border-[#14352d] bg-[#14352d] text-white'
											: 'border-gray-200 bg-[#fbf9f2] text-[#596c62] hover:border-gray-400'}"
									>
										{size.split(' ')[0]}
									</button>
								{/each}
							</div>
						</div>

						<!-- CTA Button -->
						<div class="w-full pt-2">
							<button
								onclick={handleSpotlightAddToCart}
								class="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#14352d] px-5 text-[0.72rem] font-black text-white uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e4b43d] hover:text-[#14352d]"
							>
								<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.2"
										d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.4a2 2 0 001.9-1.4L21 7H6"
									/>
								</svg>
								Add to Cart
							</button>
						</div>
					</div>

					<!-- Right Half: Big Image & Circular Spotlight (7 cols) -->
					<div
						class="relative order-1 flex h-[310px] items-center justify-center overflow-visible md:order-2 md:col-span-7 md:h-[400px]"
					>
						<!-- Big Circular Background -->
						<div
							class="absolute flex h-[240px] w-[240px] items-center justify-center rounded-full bg-gradient-to-b from-[#e8eedc] via-[#ecdac8]/60 to-[#fffaf0] shadow-[inset_0_4px_30px_rgba(20,53,45,0.06)] md:h-[300px] md:w-[300px]"
						>
							<div
								class="h-[88%] w-[88%] rounded-full border border-dashed border-[#14352d]/6"
							></div>
						</div>

						<!-- Image - significantly scaled up -->
						<div
							class="relative z-10 h-[290px] w-[230px] transition-transform duration-700 group-hover:scale-[1.03] md:h-[380px] md:w-[300px]"
						>
							<img
								src={spotlightProduct.images?.[0]?.url || '/abaya11.png'}
								alt={spotlightProduct.name}
								class="h-full w-full rounded-2xl border border-[#14352d]/8 object-cover shadow-[0_15px_35px_rgba(20,53,45,0.15)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] filter"
							/>
						</div>

						<!-- Floating Badges -->
						<div
							class="absolute top-2 right-4 z-20 flex h-16 w-16 shrink-0 rotate-12 flex-col items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d] shadow-lg outline outline-1 outline-offset-2 outline-[#e4b43d]/50 transition-transform duration-500 group-hover:scale-110 md:h-18 md:w-18"
						>
							<span
								class="text-[0.58rem] leading-none font-black tracking-[0.05em] uppercase md:text-[0.62rem]"
								>Save</span
							>
							<span class="my-0.5 text-base leading-none font-black md:text-lg">30%</span>
							<span
								class="font-sans text-[0.45rem] leading-none font-bold uppercase md:text-[0.5rem]"
								>Off</span
							>
						</div>

						<div
							class="absolute bottom-4 left-4 z-20 rounded-full bg-[#14352d] px-3 py-1 text-[0.58rem] font-bold tracking-wider text-white uppercase shadow-md"
						>
							Online Exclusive
						</div>
					</div>
				</div>
			</div>

			<!-- COLUMN 2: CURATED CATEGORY CARDS (5 Cols) -->
			<div class="flex flex-col justify-between gap-4 lg:col-span-5">
				<!-- CARD 1: CHIFFON HIJABS -->
				<a
					href="/shop?q=hijab"
					class="group flex flex-1 items-center justify-between overflow-hidden rounded-xl border border-[#14352d]/8 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e4b43d]/40 hover:shadow-md"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div
							class="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9] sm:h-24 sm:w-24"
						>
							<img
								src="/ChatGPT Image May 25, 2026, 06_25_13 PM.png"
								alt="Premium Hijabs"
								class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div>
							<span
								class="mb-0.5 inline-flex rounded-full bg-[#e4b43d]/12 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-[#7b6a3d] uppercase"
							>
								Essential Match
							</span>
							<h4 class="font-serif text-sm font-bold text-[#14352d] uppercase sm:text-base">
								Premium Hijabs
							</h4>
							<p class="mt-0.5 text-[0.68rem] font-medium text-[#596c62]">
								Soft Georgette & Chiffon, 12 colors.
							</p>
							<span class="mt-1.5 block text-xs font-black text-[#7b6a3d]">From Rs. 1,490</span>
						</div>
					</div>
					<div
						class="flex h-7 w-7 items-center justify-center rounded-full bg-[#14352d]/5 text-[#14352d] transition-colors group-hover:bg-[#14352d] group-hover:text-white"
					>
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>

				<!-- CARD 2: EVERYDAY CREPE -->
				<a
					href="/shop?category=daily-wear"
					class="group flex flex-1 items-center justify-between overflow-hidden rounded-xl border border-[#14352d]/8 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e4b43d]/40 hover:shadow-md"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div
							class="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9] sm:h-24 sm:w-24"
						>
							<img
								src="/abaya11.png"
								alt="Everyday wear"
								class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div>
							<span
								class="mb-0.5 inline-flex rounded-full bg-[#14352d]/6 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-[#14352d] uppercase"
							>
								Free Shipping
							</span>
							<h4 class="font-serif text-sm font-bold text-[#14352d] uppercase sm:text-base">
								Daily Crepe Cuts
							</h4>
							<p class="mt-0.5 text-[0.68rem] font-medium text-[#596c62]">
								Minimalist cuts for all-day comfort.
							</p>
							<span class="mt-1.5 block text-xs font-black text-[#7b6a3d]">From Rs. 4,990</span>
						</div>
					</div>
					<div
						class="flex h-7 w-7 items-center justify-center rounded-full bg-[#14352d]/5 text-[#14352d] transition-colors group-hover:bg-[#14352d] group-hover:text-white"
					>
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>

				<!-- CARD 3: LUXURY EMBROIDERY -->
				<a
					href="/shop?category=occasion"
					class="group flex flex-1 items-center justify-between overflow-hidden rounded-xl border border-[#14352d]/8 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e4b43d]/40 hover:shadow-md"
				>
					<div class="flex items-center gap-3.5 pr-2">
						<div
							class="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#14352d]/10 bg-[#e4eee9] sm:h-24 sm:w-24"
						>
							<img
								src="/abaya22.png"
								alt="Luxe stonework"
								class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div>
							<span
								class="mb-0.5 inline-flex rounded-full bg-[#14352d]/6 px-2 py-0.5 text-[0.52rem] font-bold tracking-wide text-red-600 uppercase"
							>
								Limited Edition
							</span>
							<h4 class="font-serif text-sm font-bold text-[#14352d] uppercase sm:text-base">
								Luxe Stonework
							</h4>
							<p class="mt-0.5 text-[0.68rem] font-medium text-[#596c62]">
								Intricate hand-stitched sleeve detailing.
							</p>
							<span class="mt-1.5 block text-xs font-black text-[#7b6a3d]">From Rs. 7,490</span>
						</div>
					</div>
					<div
						class="flex h-7 w-7 items-center justify-center rounded-full bg-[#14352d]/5 text-[#14352d] transition-colors group-hover:bg-[#14352d] group-hover:text-white"
					>
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
