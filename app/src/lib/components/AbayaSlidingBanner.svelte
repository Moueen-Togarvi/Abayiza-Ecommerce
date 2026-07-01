<script lang="ts">
	import { onMount } from 'svelte';

	let { settings = {} } = $props();

	let activeSlide = $state(0);
	let sliderHovered = $state(false);

	const defaultSliderItems = [
		{
			title: 'Premium Nida Essentials',
			tagline: 'EVERYDAY COMFORT',
			description:
				'Double-stitched durability and flowy silhouettes in authentic premium Nida fabric. Styled for standard modest daily wear.',
			link: '/shop?category=nida-essentials',
			image: '/abaya_banner_nida.png',
			bgClass: 'bg-[#f4f7f5]',
			accentText: 'text-[#14352d]',
			ribbonBg: 'bg-[#14352d]',
			ribbonText: 'text-white',
			badge: 'Bestseller Edit',
			promoBadge: '40% OFF',
			descColor: 'text-[#596c62]'
		},
		{
			title: 'Luxury Occasion Wear',
			tagline: 'ELEGANT LAYERS',
			description:
				'Featuring intricate hand-stitched beadwork and premium drapes on soft premium flowy georgette edits.',
			link: '/shop?category=occasion',
			image: '/abaya_banner_occasion.png',
			bgClass: 'bg-[#fff9f0]',
			accentText: 'text-[#7b6a3d]',
			ribbonBg: 'bg-[#e4b43d]',
			ribbonText: 'text-[#14352d]',
			badge: 'New Season',
			promoBadge: '50% OFF',
			descColor: 'text-[#7a6e5a]'
		},
		{
			title: 'Eid Signature Edit',
			tagline: 'LIMITED EMBROIDERY',
			description:
				'Sophisticated dark cuts with delicate gold-lace details, designed to leave a quiet, modest presence.',
			link: '/shop?category=eid-edit',
			image: '/abaya_banner_eid.png',
			bgClass: 'bg-[#14352d]',
			accentText: 'text-[#e4b43d]',
			ribbonBg: 'bg-[#e4b43d]',
			ribbonText: 'text-[#14352d]',
			badge: 'Eid Special',
			promoBadge: '30% OFF',
			descColor: 'text-[#a3bfae]'
		}
	];

	let sliderItems = $derived([
		{
			...defaultSliderItems[0],
			title: settings.slide1Title || defaultSliderItems[0].title,
			tagline: settings.slide1Tagline || defaultSliderItems[0].tagline,
			description: settings.slide1Description || defaultSliderItems[0].description,
			link: settings.slide1Link || defaultSliderItems[0].link,
			image: settings.slide1Image || defaultSliderItems[0].image,
			promoBadge: settings.slide1Promo || defaultSliderItems[0].promoBadge
		},
		{
			...defaultSliderItems[1],
			title: settings.slide2Title || defaultSliderItems[1].title,
			tagline: settings.slide2Tagline || defaultSliderItems[1].tagline,
			description: settings.slide2Description || defaultSliderItems[1].description,
			link: settings.slide2Link || defaultSliderItems[1].link,
			image: settings.slide2Image || defaultSliderItems[1].image,
			promoBadge: settings.slide2Promo || defaultSliderItems[1].promoBadge
		},
		{
			...defaultSliderItems[2],
			title: settings.slide3Title || defaultSliderItems[2].title,
			tagline: settings.slide3Tagline || defaultSliderItems[2].tagline,
			description: settings.slide3Description || defaultSliderItems[2].description,
			link: settings.slide3Link || defaultSliderItems[2].link,
			image: settings.slide3Image || defaultSliderItems[2].image,
			promoBadge: settings.slide3Promo || defaultSliderItems[2].promoBadge
		}
	]);

	let slideInterval: ReturnType<typeof setInterval>;

	function startSlider() {
		stopSlider();
		slideInterval = setInterval(() => {
			if (!sliderHovered) {
				activeSlide = (activeSlide + 1) % sliderItems.length;
			}
		}, 5500);
	}

	function stopSlider() {
		if (slideInterval) clearInterval(slideInterval);
	}

	function handlePrev() {
		activeSlide = (activeSlide - 1 + sliderItems.length) % sliderItems.length;
		startSlider();
	}

	function handleNext() {
		activeSlide = (activeSlide + 1) % sliderItems.length;
		startSlider();
	}

	onMount(() => {
		startSlider();
		return stopSlider;
	});
</script>

<section
	class="relative overflow-hidden border-y border-[#14352d]/8 bg-[#fbf9f2]"
	onmouseenter={() => (sliderHovered = true)}
	onmouseleave={() => (sliderHovered = false)}
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div
			class="relative my-6 h-[480px] w-full overflow-hidden rounded-2xl border border-[#14352d]/10 shadow-[0_20px_50px_rgba(20,53,45,0.05)] sm:h-[360px] md:h-[420px]"
		>
			{#each sliderItems as item, index}
				<!-- GPU Accelerated Horizontal sliding container -->
				<div
					class="absolute inset-0 flex flex-col items-stretch justify-between overflow-hidden rounded-2xl transition-transform duration-[800ms] ease-in-out sm:flex-row {item.bgClass}"
					style="transform: translateX({(index - activeSlide) * 100}%);"
				>
					<!-- Dotted Grid Accents -->
					<div
						class="pointer-events-none absolute top-6 left-8 h-24 w-24 bg-[radial-gradient(#14352d_2px,transparent_2px)] [background-size:12px_12px] opacity-10"
					></div>
					<div
						class="pointer-events-none absolute bottom-6 left-1/3 h-20 w-32 bg-[radial-gradient(#14352d_2px,transparent_2px)] [background-size:12px_12px] opacity-10"
					></div>

					<!-- Decorative Sparkles -->
					<svg
						class="absolute top-12 left-[48%] h-5 w-5 animate-pulse text-[#e4b43d] opacity-40"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
					</svg>
					<svg
						class="absolute bottom-16 left-12 h-4 w-4 text-[#e4b43d] opacity-40"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
					</svg>

					<!-- Big concentric background circles framing the Model -->
					<div
						class="pointer-events-none absolute top-1/2 -right-20 z-0 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#e4b43d]/10 sm:h-[480px] sm:w-[480px]"
					></div>
					<div
						class="pointer-events-none absolute top-1/2 -right-10 z-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-white/20 sm:h-[400px] sm:w-[400px] {index ===
						2
							? ''
							: 'border border-white/40'}"
					></div>

					<!-- Left Section: Content -->
					<div
						class="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 pt-8 pb-4 text-center sm:max-w-[72%] sm:items-start sm:py-0 sm:pr-8 sm:pl-16 sm:text-left md:pr-12 md:pl-20"
					>
						<!-- Small Top Badge with slide-up transition -->
						<div
							class="mb-2 flex transform items-center justify-center gap-2 transition-all duration-700 ease-out sm:mb-4 sm:justify-start {activeSlide ===
							index
								? 'translate-y-0 opacity-100'
								: 'translate-y-4 opacity-0'} delay-[100ms]"
						>
							<span
								class="inline-flex rounded-full border border-[#14352d]/10 bg-[#14352d]/8 px-3.5 py-1.5 text-[0.58rem] font-black tracking-[0.1em] text-[#14352d] uppercase sm:text-[0.68rem]"
							>
								{item.badge}
							</span>
							<span
								class="hidden text-[0.65rem] font-bold tracking-[0.25em] sm:inline-block {item.accentText} uppercase"
							>
								{item.tagline}
							</span>
						</div>

						<!-- Skewed Main Title Ribbon -->
						<div
							class="relative my-2 inline-block transform self-center transition-all duration-700 ease-out sm:self-start {activeSlide ===
							index
								? 'translate-y-0 opacity-100'
								: 'translate-y-6 opacity-0'} delay-[200ms]"
						>
							<h3
								class="rotate-[-1.5deg] rounded px-3 py-1.5 font-serif text-[1.05rem] font-black tracking-wide uppercase shadow-lg sm:px-5 sm:py-2.5 sm:text-4xl md:text-5xl lg:text-[2.6rem] {item.ribbonBg} {item.ribbonText}"
							>
								{item.title}
							</h3>
						</div>

						<!-- Description -->
						<p
							class="mt-2.5 text-[0.68rem] font-medium sm:mt-5 sm:text-sm md:text-[0.95rem] {item.descColor} mx-auto line-clamp-2 max-w-xl transform leading-relaxed transition-all duration-700 ease-out sm:mx-0 sm:line-clamp-none {activeSlide ===
							index
								? 'translate-y-0 opacity-100'
								: 'translate-y-6 opacity-0'} delay-[300ms]"
						>
							{item.description}
						</p>

						<!-- Promo Discount Badge & CTA -->
						<div
							class="mt-4 flex transform items-center justify-center gap-3 transition-all duration-700 ease-out sm:mt-8 sm:justify-start sm:gap-5 {activeSlide ===
							index
								? 'translate-y-0 opacity-100'
								: 'translate-y-6 opacity-0'} delay-[400ms]"
						>
							<!-- Save Box -->
							<div
								class="flex min-w-[70px] rotate-[1.5deg] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#14352d]/30 bg-white/60 p-1.5 shadow-md backdrop-blur-sm sm:min-w-[100px] sm:px-4 sm:py-2.5"
							>
								<span
									class="text-[0.48rem] leading-none font-bold tracking-wider text-[#596c62] uppercase sm:text-[0.55rem]"
									>Save Up To</span
								>
								<span class="mt-1.5 text-xs leading-none font-black text-[#14352d] sm:text-xl"
									>{item.promoBadge}</span
								>
							</div>

							<!-- Shop Button -->
							<a
								href={item.link}
								class="inline-flex min-h-8 items-center justify-center gap-2 rounded-full bg-[#14352d] px-4 text-[0.58rem] font-black text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e4b43d] hover:text-[#14352d] hover:shadow-xl sm:min-h-12 sm:px-8 sm:text-[0.78rem]"
							>
								Shop Now
								<svg
									class="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.8"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</div>
					</div>

					<!-- Right Section: Cropped Model Image Overlapping Circle -->
					<div
						class="relative z-10 flex h-[180px] w-full shrink-0 items-end justify-center overflow-hidden sm:h-full sm:w-[36%] sm:justify-end md:w-[40%]"
					>
						<!-- Diagonal brush fade -->
						<div
							class="absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-transparent to-transparent sm:block"
							style="background-image: linear-gradient(to right, {index === 0
								? '#f4f7f5'
								: index === 1
									? '#fff9f0'
									: '#14352d'} 0%, transparent 100%);"
						></div>

						<!-- Clean modest abaya image -->
						<img
							src={item.image}
							alt={item.title}
							class="h-[95%] w-auto object-contain object-bottom drop-shadow-[0_15px_30px_rgba(20,53,45,0.25)] filter transition-transform duration-[1500ms] ease-out sm:h-[98%]"
							style="transform: scale({activeSlide === index ? '1.04' : '1.02'});"
						/>
					</div>
				</div>
			{/each}

			<!-- Slider Controls: Arrows -->
			<div class="absolute inset-y-0 left-2 z-20 flex items-center sm:left-4">
				<button
					onclick={handlePrev}
					class="flex h-7 w-7 items-center justify-center rounded-full border border-[#14352d]/10 bg-white/80 text-[#14352d] shadow-md backdrop-blur-sm transition-all hover:bg-[#14352d] hover:text-white sm:h-9 sm:w-9"
					aria-label="Previous slide"
				>
					<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>
			<div class="absolute inset-y-0 right-2 z-20 flex items-center sm:right-4">
				<button
					onclick={handleNext}
					class="flex h-7 w-7 items-center justify-center rounded-full border border-[#14352d]/10 bg-white/80 text-[#14352d] shadow-md backdrop-blur-sm transition-all hover:bg-[#14352d] hover:text-white sm:h-9 sm:w-9"
					aria-label="Next slide"
				>
					<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			<!-- Slider Indicators (Dots) -->
			<div class="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5 sm:gap-2">
				{#each sliderItems as _, idx}
					<button
						onclick={() => {
							activeSlide = idx;
							startSlider();
						}}
						class="h-1.5 rounded-full transition-all duration-300 {activeSlide === idx
							? 'w-6 bg-[#14352d]'
							: 'w-1.5 bg-[#14352d]/30'}"
						aria-label={`Go to slide ${idx + 1}`}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
