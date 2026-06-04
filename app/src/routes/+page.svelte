<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/client/cart.svelte';
	import AbayizaWordmark from '$lib/components/AbayizaWordmark.svelte';
	import WishlistButton from '$lib/components/WishlistButton.svelte';
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let products = $derived((data.products || []) as Array<any>);
	let collections = $derived((data.collections || []) as Array<any>);
	let reviewPhotos = $derived((data.reviewPhotos || []) as Array<any>);
	let homeSections = $derived((data.homeSections || {}) as Record<string, any>);
	let storefrontSettings = $derived((data.storefrontSettings || {}) as Record<string, any>);

	let heroRoot: HTMLElement;
	let heroSlideIndex = $state(0);
	let previousHeroSlideIndex = $state<number | null>(null);
	let heroSlideDirection = $state<'next' | 'previous'>('next');
	let previousHeroSlideTimer: ReturnType<typeof setTimeout> | undefined;

	const heroHeadlinePhrases = [
		'Premium\nAbayas',
		'Luxury\nAbayas',
		'Nida\nEssentials',
		'Modest\nLayers',
		'Eid Sale\nAbayiza'
	];
	let heroHeadlineText = $state(heroHeadlinePhrases[0]);

	const heroSlides = [
		{
			src: '/ChatGPT%20Image%20May%2025,%202026,%2006_25_42%20PM.png',
			alt: 'Abayiza hero abaya editorial slide one'
		},
		{
			src: '/ChatGPT%20Image%20May%2025,%202026,%2006_25_51%20PM.png',
			alt: 'Abayiza hero abaya editorial slide two'
		},
		{
			src: '/ChatGPT%20Image%20May%2025,%202026,%2006_25_13%20PM.png',
			alt: 'Abayiza hero abaya editorial slide three'
		},
		{
			src: '/ChatGPT%20Image%20May%2025,%202026,%2006_07_28%20PM.png',
			alt: 'Abayiza hero abaya editorial slide four'
		},
		{
			src: '/ChatGPT%20Image%20May%2025,%202026,%2006_25_25%20PM.png',
			alt: 'Abayiza hero abaya editorial slide five'
		}
	];

	function showHeroSlide(direction: 'next' | 'previous') {
		previousHeroSlideIndex = heroSlideIndex;
		heroSlideDirection = direction;
		heroSlideIndex =
			direction === 'next'
				? (heroSlideIndex + 1) % heroSlides.length
				: (heroSlideIndex - 1 + heroSlides.length) % heroSlides.length;

		if (previousHeroSlideTimer) clearTimeout(previousHeroSlideTimer);
		previousHeroSlideTimer = setTimeout(() => {
			previousHeroSlideIndex = null;
		}, 950);
	}

	function homeSection(key: string, homepageLimit: number) {
		return (
			homeSections[key] || {
				products: products.slice(0, homepageLimit),
				total: products.length,
				homepageLimit,
				viewAllHref: `/sections/${key}`,
				usesFallback: true
			}
		);
	}

	function hasViewAll(section: any) {
		return (
			Number(section.total || 0) > Number(section.homepageLimit || section.products?.length || 0)
		);
	}

	let signatureCollectionsSection = $derived(homeSection('signature-collections', 3));
	let newArrivalsSection = $derived(homeSection('new-arrivals', 4));
	let mostLovedSection = $derived(homeSection('most-loved', 8));
	let curatedEdits = $derived((signatureCollectionsSection.products || []) as Array<any>);
	let newArrivals = $derived((newArrivalsSection.products || []) as Array<any>);
	let bestsellers = $derived((mostLovedSection.products || []) as Array<any>);
	let bestsellerRows = $derived([
		bestsellers.slice(0, 4),
		bestsellers.slice(4, 8).length ? bestsellers.slice(4, 8) : [...bestsellers].reverse()
	]);
	let bestsellerCategoryTags = $derived(collections.map((collection) => collection.name));
	let shouldAnimateReviewPhotos = $derived(reviewPhotos.length > 2);
	let reviewPhotoLoop = $derived(
		shouldAnimateReviewPhotos ? [...reviewPhotos, ...reviewPhotos] : reviewPhotos
	);

	let saleTapeItems = $derived(
		(storefrontSettings.saleTapeItems?.length
			? storefrontSettings.saleTapeItems
			: ['EID SALE', '30% OFF', 'ABAYIZA']) as string[]
	);
	let saleTapeLoop = $derived(Array.from({ length: 8 }, () => saleTapeItems).flat());
	let saleTapeEnabled = $derived(storefrontSettings.saleTapeEnabled !== false);
	const brandPattern = /^(Abayiza|ABAYIZA)$/;

	function textWithBrand(value: string) {
		return value.split(/(Abayiza|ABAYIZA)/g).filter(Boolean);
	}

	function isBrandText(value: string) {
		return brandPattern.test(value);
	}

	function productImage(item: any) {
		return item.images?.[0]?.url || collections[0]?.imageUrl || '/image.png';
	}

	function primaryVariant(item: any) {
		return (
			item.variants?.find((variant: any) => Number(variant.stockCount || 0) > 0) ||
			item.variants?.[0]
		);
	}

	function isOutOfStock(item: any) {
		return !item.variants?.some((variant: any) => Number(variant.stockCount || 0) > 0);
	}

	function productHref(item: any) {
		return `/shop/${item.slug}`;
	}

	function productCategory(item: any) {
		return item.collections?.[0]?.name || 'Abayiza';
	}

	function productTags(item: any) {
		return [
			primaryVariant(item)?.color,
			primaryVariant(item)?.size,
			...((item.collections || []).map((collection: any) => collection.name) as string[])
		]
			.filter(Boolean)
			.slice(0, 3);
	}

	function productPrice(item: any) {
		return Number(item.salePrice || item.price);
	}

	function addProductToCart(item: any) {
		if (isOutOfStock(item)) return;
		const variant = primaryVariant(item);

		cart.addItem({
			id: variant?.id || item.id,
			productId: item.id,
			variantId: variant?.id,
			name: item.name,
			price: productPrice(item),
			quantity: 1,
			image: productImage(item),
			color: variant?.color,
			size: variant?.size
		});
	}

	onMount(() => {
		let active = true;
		let destroyAnimation: (() => void) | undefined;
		let typewriterTimer: ReturnType<typeof setTimeout> | undefined;
		const slideTimer = setInterval(() => {
			showHeroSlide('next');
		}, 3000);

		let phraseIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
		heroHeadlineText = '';

		const typeHeadline = () => {
			const phrase = heroHeadlinePhrases[phraseIndex];
			let delay = isDeleting ? 85 : 130;

			if (isDeleting) {
				charIndex = Math.max(0, charIndex - 1);
				heroHeadlineText = phrase.slice(0, charIndex);

				if (charIndex === 0) {
					isDeleting = false;
					phraseIndex = (phraseIndex + 1) % heroHeadlinePhrases.length;
					delay = 260;
				}
			} else {
				charIndex = Math.min(phrase.length, charIndex + 1);
				heroHeadlineText = phrase.slice(0, charIndex);

				if (charIndex === phrase.length) {
					isDeleting = true;
					delay = 1200;
				}
			}

			typewriterTimer = setTimeout(typeHeadline, delay);
		};

		typewriterTimer = setTimeout(typeHeadline, 120);

		import('gsap').then(({ gsap }) => {
			if (!active || !heroRoot) return;

			const mm = gsap.matchMedia();
			const ctx = gsap.context(() => {
				mm.add(
					{
						reduceMotion: '(prefers-reduced-motion: reduce)'
					},
					(context) => {
						const reduceMotion = Boolean(context.conditions?.reduceMotion);
						const revealItems = gsap.utils.toArray<HTMLElement>('.hero-reveal');
						const bgImage = heroRoot.querySelector('.hero-bg');

						gsap.set(revealItems, { willChange: 'transform, opacity' });

						if (reduceMotion) {
							gsap.set([revealItems, bgImage].flat().filter(Boolean), {
								autoAlpha: 1,
								clearProps: 'transform,filter,willChange'
							});
							return () => {};
						}

						const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

						if (bgImage) {
							tl.fromTo(
								bgImage,
								{ filter: 'blur(4px)' },
								{ filter: 'blur(0px)', duration: 1.3, ease: 'power2.out' },
								0
							);
						}

						tl.fromTo(
							revealItems,
							{ autoAlpha: 0, y: 18 },
							{
								autoAlpha: 1,
								y: 0,
								duration: 0.72,
								stagger: 0.075
							},
							0.2
						);

						return () => {
							gsap.set(revealItems, { clearProps: 'willChange' });
						};
					}
				);
			}, heroRoot);

			destroyAnimation = () => {
				mm.revert();
				ctx.revert();
			};
		});

		return () => {
			active = false;
			clearInterval(slideTimer);
			if (typewriterTimer) clearTimeout(typewriterTimer);
			if (previousHeroSlideTimer) clearTimeout(previousHeroSlideTimer);
			destroyAnimation?.();
		};
	});
</script>

<svelte:head>
	<title>Abayiza | Premium Modest Fashion</title>
	<meta
		name="description"
		content="Elevating modest fashion with premium craftsmanship and timeless design."
	/>
</svelte:head>

<section
	bind:this={heroRoot}
	class="hero-cinematic relative isolate -mt-[4.25rem] overflow-hidden bg-[#e4eee9] text-[#14352d] md:-mt-[4.75rem]"
>
	<div
		class="hero-bg absolute inset-0 -z-30"
		class:hero-bg--previous={heroSlideDirection === 'previous'}
		data-depth="0"
	>
		{#each heroSlides as slide, index}
			<img
				src={slide.src}
				alt={slide.alt}
				width="1672"
				height="941"
				fetchpriority={index === 0 ? 'high' : 'auto'}
				aria-hidden={index !== heroSlideIndex}
				class="hero-bg__slide h-full w-full bg-[#eadac8] object-cover object-center"
				class:hero-bg__slide--active={index === heroSlideIndex}
				class:hero-bg__slide--previous-next={index === previousHeroSlideIndex &&
					heroSlideDirection === 'next'}
				class:hero-bg__slide--previous-previous={index === previousHeroSlideIndex &&
					heroSlideDirection === 'previous'}
			/>
		{/each}
	</div>

	<div class="absolute inset-0 -z-20 bg-black/12"></div>

	<div
		class="pointer-events-none absolute inset-x-3 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between sm:inset-x-6"
	>
		<button
			type="button"
			class="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/78 text-[#14352d] shadow-[0_14px_32px_rgba(20,53,45,0.20)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14352d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
			aria-label="Previous hero image"
			onclick={() => showHeroSlide('previous')}
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		</button>
		<button
			type="button"
			class="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/78 text-[#14352d] shadow-[0_14px_32px_rgba(20,53,45,0.20)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14352d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
			aria-label="Next hero image"
			onclick={() => showHeroSlide('next')}
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<div
		class="relative z-20 mx-auto flex min-h-[min(560px,100svh)] max-w-7xl items-end px-4 pt-24 pb-6 sm:min-h-0 sm:items-start sm:px-6 sm:pt-10 sm:pb-10 md:items-center md:pt-28 md:pb-16 lg:px-8"
	>
		<div
			class="mt-0 ml-0 max-w-[15.5rem] pb-2 text-black drop-shadow-[0_4px_18px_rgba(255,255,255,0.45)] sm:mt-16 sm:ml-10 sm:max-w-[32rem] md:mt-20 md:ml-16 md:pb-0"
		>
			<p
				class="hero-reveal text-[0.58rem] font-bold tracking-[0.16em] text-black/70 uppercase sm:text-[0.68rem]"
			>
				New Season Edit
			</p>
			<h1
				class="hero-reveal mt-1.5 ml-[11px] min-h-[2.95rem] max-w-[8.5ch] font-serif text-2xl leading-[0.95] whitespace-pre-line text-black uppercase sm:mt-3 sm:ml-[7px] sm:min-h-[5.9rem] sm:text-5xl md:min-h-[6.9rem] md:text-6xl"
			>
				<span class="hero-typewriter">
					{#each textWithBrand(heroHeadlineText) as part}
						{#if isBrandText(part)}
							<AbayizaWordmark class="align-baseline" />
						{:else}
							{part}
						{/if}
					{/each}
				</span>
			</h1>
			<p
				class="hero-reveal mt-2 max-w-[14.5rem] text-[0.66rem] leading-4 font-semibold text-black/82 sm:mt-4 sm:max-w-sm sm:text-base sm:leading-6"
			>
				Clean Nida silhouettes with soft movement, refined finishing, and everyday grace.
			</p>

			<div class="hero-reveal mt-3 flex flex-row flex-nowrap gap-1.5 sm:mt-8 sm:gap-2">
				<a
					href="/shop"
					class="inline-flex min-h-7 items-center justify-center gap-1 rounded-full bg-[#14352d] px-2 text-[0.56rem] font-bold whitespace-nowrap text-white shadow-[0_16px_34px_rgba(20,53,45,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c5a880] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] sm:min-h-12 sm:gap-2 sm:px-7 sm:text-sm"
				>
					Shop Collection
					<span
						class="inline-flex h-3 w-3 items-center justify-center rounded-full bg-white/92 text-[#14352d] sm:h-5 sm:w-5"
					>
						<svg
							class="h-2 w-2 sm:h-3 sm:w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.4"
								d="M7 17L17 7M9 7h8v8"
							/>
						</svg>
					</span>
				</a>
				<a
					href="/lookbook"
					class="inline-flex min-h-7 items-center justify-center rounded-full border border-[#14352d]/20 bg-white/72 px-2 text-[0.56rem] font-bold whitespace-nowrap text-[#14352d] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] sm:min-h-12 sm:px-7 sm:text-sm"
				>
					View Lookbook
				</a>
			</div>
		</div>
	</div>
</section>

{#if saleTapeEnabled && saleTapeItems.length}
	<!-- Eid Sale Tape -->
	<section class="relative overflow-hidden bg-[#f7f4ec] px-4 py-4 sm:px-6 lg:px-8">
		<div class="sale-tape-stage" aria-hidden="true">
			<div class="sale-tape sale-tape--gold">
				<div class="sale-tape__track sale-tape__track--ltr">
					{#each saleTapeLoop as item}
						<span>
							{#if isBrandText(item)}
								<AbayizaWordmark />
							{:else}
								{item}
							{/if}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

<!-- Featured Collections -->
<section class="border-t border-[#14352d]/8 bg-[#fbf9f2] px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="mb-3 text-xs font-bold tracking-[0.18em] text-[#7b6a3d] uppercase">
					Curated Edits
				</p>
				<h2 class="font-serif text-3xl leading-tight text-[#14352d] uppercase sm:text-4xl">
					Signature Collections
				</h2>
			</div>
			<div class="max-w-md space-y-4 sm:text-right">
				<p class="text-sm leading-6 font-medium text-[#596c62]">
					Refined edits for the pieces you reach for most: daily essentials, occasion layers, and
					timeless black abayas.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
			{#each curatedEdits as edit}
				<div
					class="group mx-auto flex h-full w-full max-w-[24rem] flex-col overflow-hidden rounded-md bg-[#fffaf0] shadow-[0_18px_48px_rgba(20,53,45,0.10)] ring-1 ring-[#14352d]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,53,45,0.14)]"
				>
					<a
						href={productHref(edit)}
						class="relative block aspect-[4/3] overflow-hidden bg-[#e4eee9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
						aria-label={`View ${edit.name}`}
					>
						<img
							src={productImage(edit)}
							alt={edit.name}
							width="1200"
							height="900"
							class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
						/>
						{#if isOutOfStock(edit)}
							<span
								class="absolute top-3 right-3 inline-flex min-h-7 items-center justify-center rounded-full bg-red-600 px-3 text-[0.62rem] font-black tracking-[0.12em] text-white uppercase"
							>
								Out of Stock
							</span>
						{/if}
					</a>
					<span class="flex flex-1 flex-col px-4 pt-3 pb-3">
						<span class="text-[0.68rem] font-bold tracking-[0.18em] text-[#8a7444] uppercase">
							{productCategory(edit)}
						</span>
						<a
							href={productHref(edit)}
							class="mt-2 block font-serif text-[1.1rem] leading-tight text-[#14352d] transition-colors hover:text-[#c0983f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
						>
							{edit.name}
						</a>
						<span class="mt-2 flex flex-wrap gap-2">
							{#each productTags(edit) as tag}
								<span
									class="inline-flex min-h-6 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-2.5 text-center text-[0.66rem] font-bold text-[#14352d]"
								>
									{tag}
								</span>
							{/each}
						</span>
						<span class="mt-2 block text-xs leading-4 font-medium text-[#596c62]">
							{edit.description}
						</span>
						<span class="mt-auto flex items-center justify-between gap-3 pt-3">
							<span class="min-w-0">
								<span class="block">
									<span class="block text-lg font-black whitespace-nowrap text-[#c0983f]">
										{formatMoney(edit.salePrice || edit.price)}
									</span>
									{#if edit.salePrice}
										<span
											class="mt-1 block text-xs font-bold whitespace-nowrap text-red-600 line-through"
										>
											{formatMoney(edit.price)}
										</span>
									{/if}
								</span>
								<span class="mt-1 block text-xs font-semibold text-[#596c62]">Free delivery</span>
							</span>
							<button
								type="button"
								disabled={isOutOfStock(edit)}
								class="inline-flex min-h-10 min-w-[6.8rem] shrink-0 items-center justify-center gap-2 rounded-full bg-[#e4b43d] px-4 text-xs font-black text-[#14352d] shadow-[0_10px_22px_rgba(196,152,63,0.24)] transition-colors hover:bg-[#14352d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
								onclick={() => addProductToCart(edit)}
							>
								<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.4a2 2 0 001.9-1.4L21 7H6"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 21h.01M18 21h.01"
									/>
								</svg>
								{isOutOfStock(edit) ? 'Out of Stock' : 'Add to Cart'}
							</button>
							<WishlistButton
								product={edit}
								class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#14352d]/10 bg-white text-[#14352d] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d]"
							/>
						</span>
					</span>
				</div>
			{/each}
		</div>

		{#if hasViewAll(signatureCollectionsSection)}
			<div class="mt-8 text-center">
				<a
					href={signatureCollectionsSection.viewAllHref}
					class="inline-flex min-h-11 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-6 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase shadow-[0_12px_28px_rgba(20,53,45,0.08)] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					View All
				</a>
			</div>
		{/if}
	</div>
</section>

<!-- Brand Story Strip -->
<section class="border-y border-[#14352d]/8 bg-cream px-4 py-14 sm:px-6 lg:px-8">
	<div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.88fr_1.12fr] md:items-center">
		<div class="aspect-[4/3] overflow-hidden rounded-md bg-[#e4eee9] md:max-h-[360px]">
			<img
				src="/abaya11.png"
				alt="Midnight layered abaya in a warm archway"
				class="h-full w-full object-cover object-center"
			/>
		</div>

		<div class="max-w-2xl md:pl-6">
			<p class="mb-3 text-xs font-bold tracking-[0.18em] text-[#8a7444] uppercase">Our Ethos</p>
			<h2 class="font-serif text-3xl leading-tight text-[#14352d] uppercase sm:text-4xl">
				Designed for Quiet Presence
			</h2>
			<p class="mt-5 max-w-xl text-base leading-7 font-medium text-[#596c62]">
				Every <AbayizaWordmark class="text-[0.78em] text-[#14352d]" /> piece is shaped around fluid movement,
				refined finishing, and modest silhouettes that feel composed from morning plans to evening gatherings.
			</p>

			<div class="mt-8 grid grid-cols-3 gap-3 border-y border-[#14352d]/10 py-5">
				<div>
					<p class="text-sm font-black text-[#14352d]">Nida</p>
					<p class="mt-1 text-xs font-semibold text-[#596c62]">Soft drape</p>
				</div>
				<div>
					<p class="text-sm font-black text-[#14352d]">Finish</p>
					<p class="mt-1 text-xs font-semibold text-[#596c62]">Clean seams</p>
				</div>
				<div>
					<p class="text-sm font-black text-[#14352d]">Fit</p>
					<p class="mt-1 text-xs font-semibold text-[#596c62]">Easy layers</p>
				</div>
			</div>

			<a
				href="/about"
				class="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#14352d] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(20,53,45,0.18)] transition-colors hover:bg-[#c5a880] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
			>
				Read Our Story
			</a>
		</div>
	</div>
</section>

<!-- New Arrivals (Horizontal Scroll / Grid) -->
<section class="bg-cream px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="mb-2 font-serif text-3xl tracking-widest text-black uppercase">New Arrivals</h2>
				<p class="font-light text-gray-500">The latest additions to our collection</p>
			</div>
		</div>

		<div class="grid grid-cols-2 items-stretch gap-3 sm:gap-6 lg:grid-cols-4">
			{#each newArrivals as item}
				<div
					class="group flex h-full flex-col overflow-hidden rounded-md bg-[#fffaf0] shadow-[0_18px_44px_rgba(20,53,45,0.10)] ring-1 ring-[#14352d]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,53,45,0.15)]"
				>
					<a
						href={productHref(item)}
						class="relative block aspect-[4/3] overflow-hidden bg-[#e4eee9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
						aria-label={`View ${item.name}`}
					>
						<img
							src={productImage(item)}
							alt={item.name}
							width="1200"
							height="900"
							class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
						/>
						<span
							class="absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/82 text-[#14352d] shadow-[0_10px_20px_rgba(20,53,45,0.12)] backdrop-blur-md"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</span>
						<span
							class="absolute top-0 right-0 inline-flex h-14 w-14 items-center justify-center rounded-bl-md bg-white text-[#14352d] shadow-[0_10px_22px_rgba(20,53,45,0.12)]"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.9"
									d="M6 7h15l-1.5 8.25H8.25L6 4.5H3"
								/>
								<circle cx="9" cy="19" r="1.2" fill="currentColor"></circle>
								<circle cx="18" cy="19" r="1.2" fill="currentColor"></circle>
							</svg>
						</span>
						<span
							class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/72 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.1em] text-[#14352d] uppercase backdrop-blur-md"
						>
							{productCategory(item)}
						</span>
						{#if isOutOfStock(item)}
							<span
								class="absolute top-3 left-14 inline-flex min-h-7 items-center justify-center rounded-full bg-red-600 px-3 text-[0.62rem] font-black tracking-[0.12em] text-white uppercase"
							>
								Out of Stock
							</span>
						{/if}
					</a>

					<span class="flex flex-1 flex-col px-2.5 pt-2.5 pb-3 sm:px-4 sm:pt-3">
						<span
							class="flex min-h-[3rem] items-start justify-between gap-2 sm:min-h-[3.2rem] sm:gap-3"
						>
							<span class="min-w-0">
								<a
									href={productHref(item)}
									class="line-clamp-2 block font-serif text-[0.82rem] leading-tight text-[#14352d] transition-colors hover:text-[#c0983f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] sm:text-[1.05rem]"
								>
									{item.name}
								</a>
								<span
									class="mt-1 block text-[0.58rem] font-bold tracking-[0.08em] text-[#8a7444] uppercase sm:text-[0.68rem] sm:tracking-[0.12em]"
								>
									{primaryVariant(item)?.color || productCategory(item)}
								</span>
							</span>
							<WishlistButton
								product={item}
								class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e4b43d] text-white shadow-[0_10px_22px_rgba(196,152,63,0.24)] transition-colors hover:bg-[#14352d] sm:h-8 sm:w-8"
								savedClass="bg-[#14352d] text-white"
								iconClass="h-3 w-3 sm:h-3.5 sm:w-3.5"
							/>
						</span>

						<span class="mt-1.5 flex flex-wrap gap-1 sm:mt-2 sm:gap-2">
							{#each productTags(item) as spec}
								<span
									class="inline-flex min-h-5 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-1.5 text-center text-[0.52rem] font-bold text-[#14352d] sm:min-h-6 sm:px-2.5 sm:text-[0.66rem]"
								>
									{spec}
								</span>
							{/each}
						</span>

						<span
							class="mt-auto grid gap-2 pt-2 sm:flex sm:items-center sm:justify-between sm:gap-3 sm:pt-3"
						>
							<span class="min-w-0">
								<span class="block text-sm font-black whitespace-nowrap text-[#14352d] sm:text-lg">
									{formatMoney(item.salePrice || item.price)}
								</span>
								{#if item.salePrice}
									<span
										class="mt-1 block text-[0.62rem] font-bold whitespace-nowrap text-red-600 line-through sm:text-xs"
									>
										{formatMoney(item.price)}
									</span>
								{/if}
							</span>
							<button
								type="button"
								disabled={isOutOfStock(item)}
								class="inline-flex min-h-9 w-full min-w-0 shrink-0 items-center justify-center gap-1 rounded-full bg-[#e4b43d] px-2 text-[0.62rem] font-black text-[#14352d] transition-colors hover:bg-[#14352d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 sm:min-h-10 sm:w-auto sm:min-w-[6.8rem] sm:gap-2 sm:px-4 sm:text-xs"
								onclick={() => addProductToCart(item)}
							>
								<svg
									class="h-3 w-3 sm:h-3.5 sm:w-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.4a2 2 0 001.9-1.4L21 7H6"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 21h.01M18 21h.01"
									/>
								</svg>
								{isOutOfStock(item) ? 'Out of Stock' : 'Add to Cart'}
							</button>
						</span>
					</span>
				</div>
			{/each}
		</div>

		{#if hasViewAll(newArrivalsSection)}
			<div class="mt-8 text-center">
				<a
					href={newArrivalsSection.viewAllHref}
					class="inline-flex min-h-11 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-6 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase shadow-[0_12px_28px_rgba(20,53,45,0.08)] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					View All
				</a>
			</div>
		{/if}
	</div>
</section>

<!-- Trust / Quality Highlights -->
<section class="bg-[#14352d] px-4 py-12 text-[#fffaf0] sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div
			class="flex flex-col gap-4 border-b border-white/12 pb-7 md:flex-row md:items-end md:justify-between"
		>
			<div>
				<p class="mb-3 text-[0.68rem] font-black tracking-[0.2em] text-[#e4b43d] uppercase">
					<AbayizaWordmark class="text-[0.92em]" /> Promise
				</p>
				<h2 class="font-serif text-3xl leading-tight uppercase sm:text-4xl">
					Crafted For Quiet Luxury
				</h2>
			</div>
			<p class="max-w-md text-sm leading-6 font-medium text-white/70">
				Every piece is designed around fabric quality, careful finishing, reliable delivery, and
				easy aftercare.
			</p>
		</div>

		<div
			class="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
		>
			<div class="bg-[#173f35] p-6 transition-colors hover:bg-[#1c4a3f]">
				<div class="mb-7 flex items-center justify-between">
					<span class="text-xs font-black tracking-[0.16em] text-[#e4b43d]">01</span>
					<span
						class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d]"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.6"
								d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
							/>
						</svg>
					</span>
				</div>
				<h4 class="font-serif text-lg tracking-[0.12em] uppercase">Premium Nida</h4>
				<p class="mt-3 text-sm leading-6 text-white/68">
					Soft drape fabrics selected for everyday polish.
				</p>
			</div>

			<div class="bg-[#173f35] p-6 transition-colors hover:bg-[#1c4a3f]">
				<div class="mb-7 flex items-center justify-between">
					<span class="text-xs font-black tracking-[0.16em] text-[#e4b43d]">02</span>
					<span
						class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d]"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.6"
								d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
							/>
						</svg>
					</span>
				</div>
				<h4 class="font-serif text-lg tracking-[0.12em] uppercase">Handstitched</h4>
				<p class="mt-3 text-sm leading-6 text-white/68">
					Finishing details checked by hand before dispatch.
				</p>
			</div>

			<div class="bg-[#173f35] p-6 transition-colors hover:bg-[#1c4a3f]">
				<div class="mb-7 flex items-center justify-between">
					<span class="text-xs font-black tracking-[0.16em] text-[#e4b43d]">03</span>
					<span
						class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d]"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.6"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</span>
				</div>
				<h4 class="font-serif text-lg tracking-[0.12em] uppercase">Ships Worldwide</h4>
				<p class="mt-3 text-sm leading-6 text-white/68">
					Tracked delivery with reliable global partners.
				</p>
			</div>

			<div class="bg-[#173f35] p-6 transition-colors hover:bg-[#1c4a3f]">
				<div class="mb-7 flex items-center justify-between">
					<span class="text-xs font-black tracking-[0.16em] text-[#e4b43d]">04</span>
					<span
						class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e4b43d] text-[#14352d]"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.6"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</span>
				</div>
				<h4 class="font-serif text-lg tracking-[0.12em] uppercase">Easy Returns</h4>
				<p class="mt-3 text-sm leading-6 text-white/68">
					A simple 14-day return window for peace of mind.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Bestsellers -->
<section class="overflow-hidden bg-cream py-14">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 flex flex-col gap-6">
			<div class="text-center">
				<h2 class="font-serif text-3xl tracking-widest text-[#14352d] uppercase">Most Loved</h2>
			</div>

			<div class="category-ribbon" aria-label="Bestseller categories">
				<div class="category-ribbon__track">
					{#each bestsellerCategoryTags as tag}
						<span
							class="inline-flex min-h-8 shrink-0 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#fffaf0] px-4 text-[0.68rem] font-black tracking-[0.12em] text-[#14352d] uppercase shadow-[0_10px_22px_rgba(20,53,45,0.08)]"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="product-loop-stack">
			{#each bestsellerRows as row, rowIndex}
				<div
					class="product-loop {rowIndex === 1 ? 'product-loop--second' : ''}"
					aria-label={`Most loved products row ${rowIndex + 1}`}
				>
					<div class="product-loop__track">
						{#each [...row, ...row] as item, itemIndex}
							<div
								class={`product-loop__item group relative min-w-0 sm:w-[18rem] sm:shrink-0 lg:w-[19rem] ${itemIndex >= row.length ? 'product-loop__item--duplicate' : ''}`}
							>
								<div class="relative">
									<a
										href={productHref(item)}
										class="relative block aspect-[4/3] overflow-hidden rounded-md bg-[#dfe9e4] ring-1 ring-[#14352d]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
										aria-label={`View ${item.name}`}
									>
										<img
											src={productImage(item)}
											alt={item.name}
											width="1200"
											height="900"
											class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
										/>
										<span
											class="absolute top-2 left-2 inline-flex min-h-6 max-w-[6.5rem] items-center justify-center truncate rounded-full bg-white/82 px-2 text-[0.5rem] font-black tracking-[0.1em] text-[#14352d] uppercase shadow-[0_10px_20px_rgba(20,53,45,0.10)] backdrop-blur-md sm:top-3 sm:left-3 sm:min-h-8 sm:max-w-none sm:px-3 sm:text-[0.62rem] sm:tracking-[0.12em]"
										>
											{productCategory(item)}
										</span>
										{#if isOutOfStock(item)}
											<span
												class="absolute top-2 right-2 inline-flex min-h-6 items-center justify-center rounded-full bg-red-600 px-2 text-[0.5rem] font-black tracking-[0.1em] text-white uppercase shadow-[0_10px_20px_rgba(20,53,45,0.10)] sm:top-3 sm:right-3 sm:min-h-8 sm:px-3 sm:text-[0.62rem] sm:tracking-[0.12em]"
											>
												Out of Stock
											</span>
										{/if}
									</a>
									<WishlistButton
										product={item}
										class="absolute right-2 bottom-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/86 text-[#14352d] shadow-[0_10px_22px_rgba(20,53,45,0.16)] backdrop-blur transition-colors hover:bg-[#e4b43d] sm:right-3 sm:bottom-3"
										iconClass="h-4 w-4"
									/>
								</div>

								<div class="pt-2 sm:pt-4">
									<a
										href={productHref(item)}
										class="line-clamp-2 block min-h-[2.15rem] font-serif text-sm leading-tight text-[#14352d] transition-colors hover:text-[#c0983f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d] sm:min-h-0 sm:text-lg"
									>
										{item.name}
									</a>

									<div class="mt-1.5 flex flex-wrap items-baseline gap-1.5 sm:mt-2 sm:gap-2">
										<span class="text-sm font-black text-[#14352d] sm:text-lg">
											{formatMoney(item.salePrice || item.price)}
										</span>
										{#if item.salePrice}
											<span class="text-[0.65rem] font-bold text-red-600 line-through sm:text-sm">
												{formatMoney(item.price)}
											</span>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		{#if hasViewAll(mostLovedSection)}
			<div class="mt-8 text-center">
				<a
					href={mostLovedSection.viewAllHref}
					class="inline-flex min-h-11 items-center justify-center rounded-full border border-[#14352d]/12 bg-white px-6 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase shadow-[0_12px_28px_rgba(20,53,45,0.08)] transition-colors hover:border-[#e4b43d] hover:bg-[#e4b43d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					View All
				</a>
			</div>
		{/if}
	</div>
</section>

{#if reviewPhotos.length}
	<!-- Review Photos -->
	<section class="overflow-hidden bg-cream py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<p class="mb-4 text-xs font-black tracking-[0.2em] text-[#b58b2b] uppercase">Customer Love</p>
			<h2 class="font-serif text-3xl tracking-widest text-[#14352d] uppercase sm:text-4xl">
				Reviews
			</h2>
		</div>

		<div
			class={`review-photo-loop mt-10 ${shouldAnimateReviewPhotos ? 'review-photo-loop--animated' : 'review-photo-loop--static'}`}
			aria-label="Customer review photos"
		>
			<div class="review-photo-loop__track">
				{#each reviewPhotoLoop as photo, index}
					<figure class="review-photo-card">
						<img
							src={photo.url}
							alt={`Abayiza customer review ${index + 1}`}
							class="h-full w-full object-cover object-center"
							loading="lazy"
						/>
					</figure>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.hero-bg {
		overflow: hidden;
	}

	.hero-bg__slide {
		position: absolute;
		inset: 0;
		z-index: 0;
		visibility: hidden;
		transform: translateX(-100%);
		transition: transform 950ms cubic-bezier(0.72, 0, 0.2, 1);
		will-change: transform;
	}

	.hero-bg--previous .hero-bg__slide {
		transform: translateX(100%);
	}

	.hero-bg__slide--active {
		z-index: 2;
		visibility: visible;
		transform: translateX(0);
	}

	.hero-bg__slide--previous-next {
		z-index: 1;
		visibility: visible;
		transform: translateX(100%);
	}

	.hero-bg__slide--previous-previous {
		z-index: 1;
		visibility: visible;
		transform: translateX(-100%);
	}

	.hero-typewriter {
		display: inline-block;
		min-width: 8.5ch;
	}

	.hero-typewriter::after {
		content: '';
		display: inline-block;
		height: 0.78em;
		margin-left: 0.08em;
		border-right: 0.055em solid currentColor;
		animation: hero-caret-blink 0.78s steps(1) infinite;
	}

	@keyframes hero-caret-blink {
		50% {
			opacity: 0;
		}
	}

	.sale-tape-stage {
		position: relative;
		min-height: 3.8rem;
		margin-inline: -4rem;
	}

	.sale-tape {
		position: absolute;
		left: -10%;
		width: 120%;
		overflow: hidden;
		box-shadow: 0 22px 48px rgba(20, 53, 45, 0.14);
		filter: blur(0.28px);
	}

	.sale-tape--gold {
		top: 0.45rem;
		transform: rotate(0deg);
		background: #e4b43d;
		color: #14352d;
	}

	.sale-tape__track {
		display: flex;
		width: max-content;
		align-items: center;
		gap: 2rem;
		min-height: 2.9rem;
		padding-inline: 1.5rem;
		will-change: transform;
	}

	.sale-tape__track--ltr {
		animation: sale-tape-left-to-right 18s linear infinite;
	}

	.sale-tape__track span {
		flex: 0 0 auto;
		font-size: clamp(1.05rem, 2.45vw, 2.35rem);
		font-weight: 900;
		letter-spacing: 0.08em;
		line-height: 1;
		text-transform: uppercase;
		white-space: nowrap;
	}

	@keyframes sale-tape-left-to-right {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	.category-ribbon {
		overflow-x: auto;
		padding-block: 0.65rem;
		scrollbar-width: none;
	}

	.category-ribbon::-webkit-scrollbar {
		display: none;
	}

	.category-ribbon__track {
		display: flex;
		width: max-content;
		gap: 0.75rem;
		margin-inline: auto;
	}

	.product-loop-stack {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}

	.product-loop {
		margin-inline: -1rem;
		overflow: hidden;
		padding-block: 0.65rem;
	}

	.product-loop__track {
		display: flex;
		width: max-content;
		gap: 1.5rem;
		animation: product-loop-slide 28s linear infinite;
		will-change: transform;
	}

	.product-loop--second .product-loop__track {
		animation-duration: 34s;
	}

	.product-loop:hover .product-loop__track,
	.product-loop:focus-within .product-loop__track {
		animation-play-state: paused;
	}

	@keyframes product-loop-slide {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	.review-photo-loop {
		margin-inline: -1rem;
		overflow: hidden;
		padding-block: 0.5rem;
	}

	.review-photo-loop__track {
		display: flex;
		width: max-content;
		gap: 1rem;
		will-change: transform;
	}

	.review-photo-loop--static .review-photo-loop__track {
		width: 100%;
		justify-content: center;
	}

	.review-photo-loop--animated .review-photo-loop__track {
		animation: review-photo-slide 34s linear infinite;
	}

	.review-photo-loop--animated:hover .review-photo-loop__track,
	.review-photo-loop--animated:focus-within .review-photo-loop__track {
		animation-play-state: paused;
	}

	.review-photo-card {
		aspect-ratio: 4 / 5;
		width: min(18rem, 72vw);
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 0.45rem;
		background: #e4eee9;
		box-shadow: 0 18px 44px rgba(20, 53, 45, 0.1);
		outline: 1px solid rgba(20, 53, 45, 0.1);
	}

	@keyframes review-photo-slide {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-bg__slide {
			transition: none;
		}

		.product-loop__track,
		.review-photo-loop__track {
			animation: none;
			transform: none;
		}
	}

	@media (max-width: 640px) {
		.sale-tape-stage {
			min-height: 3.3rem;
			margin-inline: -2rem;
		}

		.sale-tape__track {
			min-height: 2.45rem;
			gap: 1.25rem;
		}

		.sale-tape--gold {
			top: 0.4rem;
		}

		.product-loop-stack {
			gap: 1rem;
		}

		.product-loop {
			margin-inline: 0;
			overflow: visible;
			padding-block: 0.2rem;
		}

		.product-loop__track {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.8rem;
			animation: none;
			transform: none;
		}

		.product-loop__item {
			width: auto;
			min-width: 0;
		}

		.product-loop__item--duplicate {
			display: none;
		}

		.category-ribbon {
			margin-inline: -1rem;
			padding-inline: 1rem;
		}

		.category-ribbon__track {
			margin-inline: 0;
		}

		.review-photo-loop {
			margin-inline: -1rem;
		}

		.review-photo-loop__track {
			gap: 0.75rem;
		}

		.review-photo-loop--animated .review-photo-loop__track {
			animation-duration: 28s;
		}

		.review-photo-card {
			width: 12.5rem;
		}
	}
</style>
