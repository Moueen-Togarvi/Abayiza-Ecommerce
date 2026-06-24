<script lang="ts">
	import { onMount } from 'svelte';
	import AbayizaWordmark from './AbayizaWordmark.svelte';

	let { settings = {} } = $props();

	// Calculate initial time dynamically
	const getInitialTime = () => {
		const h = settings.flashSaleHours !== undefined ? Number(settings.flashSaleHours) : 2;
		const m = settings.flashSaleMinutes !== undefined ? Number(settings.flashSaleMinutes) : 14;
		const s = settings.flashSaleSeconds !== undefined ? Number(settings.flashSaleSeconds) : 30;
		return h * 3600 + m * 60 + s;
	};

	let timeLeft = $state(getInitialTime());

	let hours = $derived(Math.floor(timeLeft / 3600));
	let minutes = $derived(Math.floor((timeLeft % 3600) / 60));
	let seconds = $derived(timeLeft % 60);

	onMount(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				timeLeft = getInitialTime(); // reset/loop
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	function pad(num: number): string[] {
		return String(num).padStart(2, '0').split('');
	}
</script>

<section class="relative border-y border-[#14352d]/8 overflow-hidden bg-[#fbf9f2]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden rounded-2xl my-6 border border-[#e4b43d]/20 bg-[#14352d] shadow-[0_20px_50px_rgba(20,53,45,0.15)] flex items-stretch justify-between">
			
			<!-- Fine Lines Grid Overlay (Subtle) -->
			<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

			<!-- Glowing gold blur background element -->
			<div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#e4b43d]/10 blur-[90px] pointer-events-none"></div>

			<!-- Left Section: Model in Abaya (using transparent generated asset) -->
			<div class="relative w-[38%] sm:w-[42%] h-full shrink-0 flex items-end justify-start overflow-hidden pl-4 sm:pl-12 z-10">
				<!-- Concentric background circles framing the model -->
				<div class="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#e4b43d]/8 pointer-events-none"></div>
				<div class="absolute left-[10px] top-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#fffaf0]/5 pointer-events-none border border-white/10"></div>

				<!-- Sparkle accent -->
				<svg class="absolute top-12 left-1/2 h-4 w-4 text-[#e4b43d] opacity-30 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
				</svg>

				<!-- Modest abaya image -->
				<img
					src={settings.flashSaleImage || '/abaya_banner_occasion.png'}
					alt="Flash Sale Abaya Highlight"
					class="h-[95%] sm:h-[98%] w-auto object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
				/>
			</div>

			<!-- Right Section: Offer Info & Countdown -->
			<div class="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-12 md:px-16 z-10 relative">
				
				<!-- Badge -->
				<div class="flex items-center justify-center gap-1.5 mb-2.5 sm:mb-4">
					<span class="inline-flex rounded-full bg-[#e4b43d]/10 px-3 py-1.5 text-[0.58rem] sm:text-[0.68rem] font-black tracking-[0.1em] text-[#e4b43d] uppercase border border-[#e4b43d]/20">
						Limited Edition Offer
					</span>
				</div>

				<!-- Title Ribbon -->
				<div class="relative my-1 inline-block self-center">
					<h3 class="font-serif text-[1.3rem] sm:text-3xl md:text-4xl lg:text-[2.2rem] font-black uppercase tracking-wide px-5 py-2.5 bg-[#e4b43d] text-[#14352d] shadow-lg rounded rotate-[-1.5deg]">
						{settings.flashSaleTitle || 'FLASH SALE'}
					</h3>
					<!-- Cursive overlapping text -->
					<span class="absolute -bottom-2.5 -right-3 sm:-right-6 font-serif italic text-lg sm:text-2xl md:text-3xl text-[#fffaf0] drop-shadow-md select-none rotate-[2.5deg]">
						{settings.flashSaleSubtitle || 'Ends Soon!'}
					</span>
				</div>

				<!-- Promo details description -->
				<p class="mt-4 sm:mt-6 text-[0.7rem] sm:text-xs md:text-[0.85rem] font-black tracking-[0.25em] text-[#fffaf0]/80 uppercase text-center w-full">
					{settings.flashSaleDescription || 'UP TO 70% OFF SELECTED ITEMS'}
				</p>

				<!-- Countdown Timer Box -->
				<div class="mt-4 sm:mt-6 flex flex-col items-center gap-2">
					<span class="text-[0.55rem] sm:text-[0.62rem] font-bold tracking-[0.15em] text-[#e4b43d] uppercase">
						Remaining Time:
					</span>

					<div class="flex items-center justify-center gap-2 bg-[#173f35]/60 backdrop-blur border border-white/5 p-2.5 sm:p-3.5 rounded-xl shadow-inner">
						<!-- Hours -->
						<div class="flex flex-col items-center gap-1">
							<div class="flex gap-0.5 sm:gap-1">
								{#each pad(hours) as digit}
									<div class="w-6 h-8 sm:w-10 sm:h-13 bg-[#fffaf0] rounded-md shadow-md flex items-center justify-center text-sm sm:text-xl font-black text-[#14352d]">
										{digit}
									</div>
								{/each}
							</div>
							<span class="text-[0.48rem] sm:text-[0.58rem] font-semibold tracking-[0.12em] text-white/50 uppercase mt-1">Hours</span>
						</div>

						<div class="text-[#e4b43d] font-bold text-sm sm:text-lg pb-4 sm:pb-5">:</div>

						<!-- Minutes -->
						<div class="flex flex-col items-center gap-1">
							<div class="flex gap-0.5 sm:gap-1">
								{#each pad(minutes) as digit}
									<div class="w-6 h-8 sm:w-10 sm:h-13 bg-[#fffaf0] rounded-md shadow-md flex items-center justify-center text-sm sm:text-xl font-black text-[#14352d]">
										{digit}
									</div>
								{/each}
							</div>
							<span class="text-[0.48rem] sm:text-[0.58rem] font-semibold tracking-[0.12em] text-white/50 uppercase mt-1">Mins</span>
						</div>

						<div class="text-[#e4b43d] font-bold text-sm sm:text-lg pb-4 sm:pb-5">:</div>

						<!-- Seconds -->
						<div class="flex flex-col items-center gap-1">
							<div class="flex gap-0.5 sm:gap-1">
								{#each pad(seconds) as digit}
									<div class="w-6 h-8 sm:w-10 sm:h-13 bg-[#fffaf0] rounded-md shadow-md flex items-center justify-center text-sm sm:text-xl font-black text-[#14352d]">
										{digit}
									</div>
								{/each}
							</div>
							<span class="text-[0.48rem] sm:text-[0.58rem] font-semibold tracking-[0.12em] text-white/50 uppercase mt-1">Secs</span>
						</div>
					</div>
				</div>

				<!-- Action button -->
				<a
					href={settings.flashSaleCtaLink || '/shop?on-sale=true'}
					class="mt-4 sm:mt-6 inline-flex min-h-9 sm:min-h-11 items-center justify-center gap-2 rounded-full bg-[#fffaf0] px-5 sm:px-8 text-[0.62rem] sm:text-[0.72rem] font-black uppercase text-[#14352d] shadow-md transition-all duration-300 hover:bg-[#e4b43d] hover:text-[#14352d] hover:-translate-y-0.5 hover:shadow-lg"
				>
					{settings.flashSaleCtaLabel || 'Shop The Sale'}
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M9 5l7 7-7 7" />
					</svg>
				</a>

			</div>
		</div>
	</div>
</section>
