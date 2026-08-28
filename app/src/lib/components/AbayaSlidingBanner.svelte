<script lang="ts">
	import { onMount } from 'svelte';

	let { settings = {} } = $props();

	let activeSlide = $state(0);
	let sliderHovered = $state(false);

	const defaultSliderItems = [
		{
			title: 'Andalusia Jacquard',
			link: '/shop?category=nida-essentials',
			image: '/banner-andalusia-1.webp'
		},
		{
			title: 'Andalusia Jacquard Collection',
			link: '/shop?category=occasion',
			image: '/banner-andalusia-2.webp'
		},
		{
			title: 'Midnight Bloom Jacquard',
			link: '/shop?category=eid-edit',
			image: '/banner-midnight-bloom.webp'
		}
	];

	let sliderItems = $derived([
		{
			...defaultSliderItems[0],
			link: settings.slide1Link || defaultSliderItems[0].link,
			image: settings.slide1Image || defaultSliderItems[0].image
		},
		{
			...defaultSliderItems[1],
			link: settings.slide2Link || defaultSliderItems[1].link,
			image: settings.slide2Image || defaultSliderItems[1].image
		},
		{
			...defaultSliderItems[2],
			link: settings.slide3Link || defaultSliderItems[2].link,
			image: settings.slide3Image || defaultSliderItems[2].image
		}
	]);

	let slideInterval: ReturnType<typeof setInterval>;

	function startSlider() {
		stopSlider();
		slideInterval = setInterval(() => {
			if (!sliderHovered) {
				activeSlide = (activeSlide + 1) % sliderItems.length;
			}
		}, 3000);
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
			class="relative my-6 h-[440px] sm:h-[360px] md:h-[390px] w-full overflow-hidden rounded-2xl border border-[#14352d]/10 shadow-[0_20px_50px_rgba(20,53,45,0.05)]"
		>
			{#each sliderItems as item, index}
				<!-- GPU Accelerated Horizontal sliding container -->
				<div
					class="absolute inset-0 overflow-hidden rounded-2xl transition-transform duration-700 ease-in-out"
					style="transform: translateX({(index - activeSlide) * 100}%);"
				>
					<a href={item.link} class="block h-full w-full" aria-label={item.title}>
						<img
							src={item.image}
							alt={item.title}
							loading={index === 0 ? 'eager' : 'lazy'}
							decoding="async"
							class="h-full w-full object-cover object-center"
						/>
					</a>
				</div>
			{/each}

			<!-- Slider Controls: Arrows -->
			<div class="absolute inset-y-0 left-2 z-20 flex items-center sm:left-4">
				<button
					onclick={handlePrev}
					class="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#14352d] sm:h-9 sm:w-9"
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
					class="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#14352d] sm:h-9 sm:w-9"
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
							? 'w-6 bg-[#e4b43d]'
							: 'w-1.5 bg-white/30'}"
						aria-label={`Go to slide ${idx + 1}`}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
