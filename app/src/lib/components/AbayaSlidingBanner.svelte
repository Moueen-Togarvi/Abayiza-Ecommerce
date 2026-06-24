<script lang="ts">
	import { onMount } from 'svelte';

	let { settings = {} } = $props();

	let activeSlide = $state(0);
	let sliderHovered = $state(false);

	const defaultSliderItems = [
		{
			title: 'Premium Nida Essentials',
			tagline: 'EVERYDAY COMFORT',
			description: 'Double-stitched durability and flowy silhouettes in authentic premium Nida fabric. Styled for standard modest daily wear.',
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
			description: 'Featuring intricate hand-stitched beadwork and premium drapes on soft premium flowy georgette edits.',
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
			description: 'Sophisticated dark cuts with delicate gold-lace details, designed to leave a quiet, modest presence.',
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
	class="relative border-y border-[#14352d]/8 overflow-hidden bg-[#fbf9f2]"
	onmouseenter={() => sliderHovered = true}
	onmouseleave={() => sliderHovered = false}
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative h-[480px] sm:h-[360px] md:h-[420px] w-full overflow-hidden rounded-2xl my-6 border border-[#14352d]/10 shadow-[0_20px_50px_rgba(20,53,45,0.05)]">
			{#each sliderItems as item, index}
				<!-- GPU Accelerated Horizontal sliding container -->
				<div
					class="absolute inset-0 flex flex-col sm:flex-row items-stretch justify-between rounded-2xl overflow-hidden transition-transform duration-[800ms] ease-in-out {item.bgClass}"
					style="transform: translateX({(index - activeSlide) * 100}%);"
				>
					<!-- Dotted Grid Accents -->
					<div class="absolute top-6 left-8 w-24 h-24 bg-[radial-gradient(#14352d_2px,transparent_2px)] [background-size:12px_12px] opacity-10 pointer-events-none"></div>
					<div class="absolute bottom-6 left-1/3 w-32 h-20 bg-[radial-gradient(#14352d_2px,transparent_2px)] [background-size:12px_12px] opacity-10 pointer-events-none"></div>

					<!-- Decorative Sparkles -->
					<svg class="absolute top-12 left-[48%] h-5 w-5 text-[#e4b43d] opacity-40 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
					</svg>
					<svg class="absolute bottom-16 left-12 h-4 w-4 text-[#e4b43d] opacity-40" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
					</svg>

					<!-- Big concentric background circles framing the Model -->
					<div class="absolute -right-20 top-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-[#e4b43d]/10 z-0 pointer-events-none"></div>
					<div class="absolute -right-10 top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-white/20 z-0 pointer-events-none {index === 2 ? '' : 'border border-white/40'}"></div>

					<!-- Left Section: Content -->
					<div class="flex-1 w-full sm:max-w-[72%] flex flex-col justify-center items-center text-center sm:items-start sm:text-left pt-8 pb-4 px-6 sm:py-0 sm:pl-16 sm:pr-8 md:pl-20 md:pr-12 z-10 relative">
						<!-- Small Top Badge with slide-up transition -->
						<div class="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-4 transition-all duration-700 ease-out transform {activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} delay-[100ms]">
							<span class="inline-flex rounded-full bg-[#14352d]/8 px-3.5 py-1.5 text-[0.58rem] sm:text-[0.68rem] font-black tracking-[0.1em] text-[#14352d] uppercase border border-[#14352d]/10">
								{item.badge}
							</span>
							<span class="hidden sm:inline-block text-[0.65rem] font-bold tracking-[0.25em] {item.accentText} uppercase">
								{item.tagline}
							</span>
						</div>

						<!-- Skewed Main Title Ribbon -->
						<div class="relative my-2 inline-block self-center sm:self-start transition-all duration-700 ease-out transform {activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} delay-[200ms]">
							<h3 class="font-serif text-[1.05rem] sm:text-4xl md:text-5xl lg:text-[2.6rem] font-black uppercase tracking-wide px-3 py-1.5 sm:px-5 sm:py-2.5 rotate-[-1.5deg] shadow-lg rounded {item.ribbonBg} {item.ribbonText}">
								{item.title}
							</h3>
						</div>

						<!-- Description -->
						<p class="mt-2.5 sm:mt-5 text-[0.68rem] sm:text-sm md:text-[0.95rem] font-medium {item.descColor} max-w-xl mx-auto sm:mx-0 leading-relaxed line-clamp-2 sm:line-clamp-none transition-all duration-700 ease-out transform {activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} delay-[300ms]">
							{item.description}
						</p>

						<!-- Promo Discount Badge & CTA -->
						<div class="mt-4 sm:mt-8 flex items-center justify-center sm:justify-start gap-3 sm:gap-5 transition-all duration-700 ease-out transform {activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} delay-[400ms]">
							<!-- Save Box -->
							<div class="border-2 border-dashed border-[#14352d]/30 rounded-xl p-1.5 sm:px-4 sm:py-2.5 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm shadow-md min-w-[70px] sm:min-w-[100px] rotate-[1.5deg]">
								<span class="text-[0.48rem] sm:text-[0.55rem] font-bold text-[#596c62] uppercase tracking-wider leading-none">Save Up To</span>
								<span class="text-xs sm:text-xl font-black text-[#14352d] mt-1.5 leading-none">{item.promoBadge}</span>
							</div>

							<!-- Shop Button -->
							<a
								href={item.link}
								class="inline-flex min-h-8 sm:min-h-12 items-center justify-center gap-2 rounded-full bg-[#14352d] px-4 sm:px-8 text-[0.58rem] sm:text-[0.78rem] font-black uppercase text-white shadow-lg transition-all duration-300 hover:bg-[#e4b43d] hover:text-[#14352d] hover:-translate-y-0.5 hover:shadow-xl"
							>
								Shop Now
								<svg class="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>

					<!-- Right Section: Cropped Model Image Overlapping Circle -->
					<div class="relative w-full sm:w-[36%] md:w-[40%] h-[180px] sm:h-full shrink-0 z-10 flex items-end justify-center sm:justify-end overflow-hidden">
						<!-- Diagonal brush fade -->
						<div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent to-transparent z-10 hidden sm:block" 
							style="background-image: linear-gradient(to right, {index === 0 ? '#f4f7f5' : index === 1 ? '#fff9f0' : '#14352d'} 0%, transparent 100%);">
						</div>
						
						<!-- Clean modest abaya image -->
						<img
							src={item.image}
							alt={item.title}
							class="h-[95%] sm:h-[98%] w-auto object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(20,53,45,0.25)] transition-transform duration-[1500ms] ease-out"
							style="transform: scale({activeSlide === index ? '1.04' : '1.02'});"
						/>
					</div>
				</div>
			{/each}

			<!-- Slider Controls: Arrows -->
			<div class="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center">
				<button
					onclick={handlePrev}
					class="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#14352d]/10 bg-white/80 text-[#14352d] backdrop-blur-sm shadow-md transition-all hover:bg-[#14352d] hover:text-white"
					aria-label="Previous slide"
				>
					<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
			</div>
			<div class="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center">
				<button
					onclick={handleNext}
					class="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#14352d]/10 bg-white/80 text-[#14352d] backdrop-blur-sm shadow-md transition-all hover:bg-[#14352d] hover:text-white"
					aria-label="Next slide"
				>
					<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<!-- Slider Indicators (Dots) -->
			<div class="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-1.5 sm:gap-2">
				{#each sliderItems as _, idx}
					<button
						onclick={() => { activeSlide = idx; startSlider(); }}
						class="h-1.5 rounded-full transition-all duration-300 {activeSlide === idx ? 'w-6 bg-[#14352d]' : 'w-1.5 bg-[#14352d]/30'}"
						aria-label={`Go to slide ${idx + 1}`}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
