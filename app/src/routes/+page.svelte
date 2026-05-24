<script lang="ts">
	import { onMount } from 'svelte';

	let heroRoot: HTMLElement;

	const curatedEdits = [
		{
			href: '/collections/everyday',
			label: 'Daily Wear',
			title: 'Sage Nida Abaya',
			description: 'Clean drape with a soft cloud-sage finish for polished everyday wear.',
			price: '$135',
			tags: ['Nida', 'Relaxed fit', 'Daily'],
			image: '/ChatGPT%20Image%20May%2024,%202026,%2002_01_35%20AM.png',
			alt: 'Sage modest abaya above clouds'
		},
		{
			href: '/collections/wedding',
			label: 'Occasion',
			title: 'Emerald Layered Abaya',
			description: 'Fluid chiffon movement with a graceful silhouette for evening styling.',
			price: '$155',
			tags: ['Chiffon', 'Layered', 'Occasion'],
			image: '/abaya22.png',
			alt: 'Emerald layered abaya in a warm archway'
		},
		{
			href: '/collections/summer',
			label: 'Signature',
			title: 'Midnight Veil Abaya',
			description: 'A darker signature layer with quiet contrast and airy movement.',
			price: '$165',
			tags: ['Signature', 'Light veil', 'Premium'],
			image: '/abaya11.png',
			alt: 'Midnight layered abaya in a warm archway'
		}
	];

	const newArrivals = [
		{
			href: '/shop',
			label: 'New',
			title: 'Ayla Nida Abaya',
			color: 'Cloud Sage',
			description: 'Soft everyday drape with a composed modest silhouette.',
			price: '$120',
			image: '/ChatGPT%20Image%20May%2024,%202026,%2002_01_35%20AM.png',
			alt: 'Cloud sage nida abaya',
			specs: ['Nida', '52 in', 'S-XL']
		},
		{
			href: '/shop',
			label: 'Limited',
			title: 'Zahra Wrap Abaya',
			color: 'Emerald',
			description: 'A layered wrap style with fluid chiffon movement.',
			price: '$145',
			image: '/abaya22.png',
			alt: 'Emerald layered abaya',
			specs: ['Chiffon', '54 in', 'XS-L']
		},
		{
			href: '/shop',
			label: 'Fresh',
			title: 'Lina Silk Blend',
			color: 'Midnight',
			description: 'Light veil finish with refined contrast and soft volume.',
			price: '$165',
			image: '/abaya11.png',
			alt: 'Midnight veil abaya',
			specs: ['Silk mix', '53 in', 'S-XL']
		},
		{
			href: '/shop',
			label: 'Edit',
			title: 'Nour Embellished',
			color: 'Soft Black',
			description: 'Polished occasion abaya with quiet detailing.',
			price: '$180',
			image:
				'https://images.pexels.com/photos/35150034/pexels-photo-35150034.jpeg?auto=compress&cs=tinysrgb&w=700',
			alt: 'Black embellished abaya',
			specs: ['Premium', '52 in', 'M-XL']
		}
	];

	onMount(() => {
		let active = true;
		let destroyAnimation: (() => void) | undefined;

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
						const bgImage = heroRoot.querySelector('.hero-bg img');

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
								{ scale: 1.045, filter: 'blur(4px)' },
								{ scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'power2.out' },
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
	class="hero-cinematic relative isolate -mt-[4.75rem] overflow-hidden bg-[#e4eee9] text-[#14352d]"
>
	<div class="hero-bg absolute inset-0 -z-30" data-depth="0">
		<img
			src="/ChatGPT%20Image%20May%2024,%202026,%2002_01_35%20AM.png"
			alt="Abayiza signature abaya floating above soft clouds"
			width="1672"
			height="941"
			fetchpriority="high"
			class="h-full w-full object-cover object-[38%_center] sm:object-center"
		/>
	</div>

	<div
		class="relative z-20 mx-auto flex max-w-7xl items-end px-4 pt-28 pb-12 sm:px-6 md:items-center md:pb-16 lg:px-8"
	>
		<div class="max-w-[36rem] pb-2 md:pb-0">
			<p class="hero-reveal text-xs font-bold tracking-[0.16em] text-[#7b6a3d] uppercase">
				New Season Edit
			</p>
			<h1
				class="hero-reveal mt-4 max-w-[9ch] font-serif text-5xl leading-[0.95] text-[#14352d] uppercase sm:text-6xl md:text-7xl"
			>
				Premium Abayas
			</h1>
			<p
				class="hero-reveal mt-5 max-w-md text-base leading-7 font-medium text-[#354238] sm:text-lg"
			>
				Clean Nida silhouettes with soft movement, refined finishing, and everyday grace.
			</p>

			<div class="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#14352d] px-7 text-sm font-bold text-white shadow-[0_16px_34px_rgba(20,53,45,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c5a880] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					Shop Collection
					<span
						class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/92 text-[#14352d]"
					>
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
					class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#14352d]/20 bg-white/64 px-7 text-sm font-bold text-[#14352d] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					View Lookbook
				</a>
			</div>
		</div>
	</div>
</section>

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
			<p class="max-w-md text-sm leading-6 font-medium text-[#596c62]">
				Refined edits for the pieces you reach for most: daily essentials, occasion layers, and
				timeless black abayas.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each curatedEdits as edit}
				<a
					href={edit.href}
					class="group mx-auto flex h-full w-full max-w-[21rem] flex-col overflow-hidden rounded-md bg-[#fffaf0] shadow-[0_18px_48px_rgba(20,53,45,0.10)] ring-1 ring-[#14352d]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,53,45,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					<span class="block aspect-[16/10] overflow-hidden bg-[#e4eee9]">
						<img
							src={edit.image}
							alt={edit.alt}
							class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
						/>
					</span>
					<span class="flex flex-1 flex-col px-5 pt-5 pb-6">
						<span class="text-[0.68rem] font-bold tracking-[0.18em] text-[#8a7444] uppercase">
							{edit.label}
						</span>
						<span class="mt-2 block font-serif text-xl leading-tight text-[#14352d]">
							{edit.title}
						</span>
						<span class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#596c62]">
							{#each edit.tags as tag}
								<span>{tag}</span>
							{/each}
						</span>
						<span class="mt-4 block text-sm leading-6 font-medium text-[#596c62]">
							{edit.description}
						</span>
						<span class="mt-auto flex items-end justify-between gap-3 pt-6">
							<span>
								<span class="block text-xl font-black text-[#c0983f]">{edit.price}</span>
								<span class="mt-1 block text-xs font-semibold text-[#596c62]">Free delivery</span>
							</span>
							<span
								class="inline-flex min-h-10 min-w-[7.5rem] items-center justify-center rounded-full bg-[#e4b43d] px-4 text-xs font-black text-[#14352d] shadow-[0_10px_22px_rgba(196,152,63,0.24)] transition-colors group-hover:bg-[#14352d] group-hover:text-white"
							>
								View Edit
							</span>
						</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Brand Story Strip -->
<section class="border-y border-[#14352d]/8 bg-[#fbfdfc] px-4 py-14 sm:px-6 lg:px-8">
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
				Every Abayiza piece is shaped around fluid movement, refined finishing, and modest
				silhouettes that feel composed from morning plans to evening gatherings.
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
<section class="bg-[#e4eee9] px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 flex items-end justify-between">
			<div>
				<h2 class="mb-2 font-serif text-3xl tracking-widest text-black uppercase">New Arrivals</h2>
				<p class="font-light text-gray-500">The latest additions to our collection</p>
			</div>
			<a
				href="/collections/new"
				class="hidden border-b border-black pb-1 text-sm tracking-widest uppercase transition-colors hover:border-gold hover:text-gold md:inline-block"
			>
				View All
			</a>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each newArrivals as item}
				<a
					href={item.href}
					class="group overflow-hidden rounded-md bg-[#fffaf0] shadow-[0_18px_44px_rgba(20,53,45,0.10)] ring-1 ring-[#14352d]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,53,45,0.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14352d]"
				>
					<span class="relative block aspect-[1.05/1] overflow-hidden bg-[#f0c44a]">
						<img
							src={item.image}
							alt={item.alt}
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
							{item.label}
						</span>
					</span>

					<span class="block px-4 pt-4 pb-5">
						<span class="flex items-start justify-between gap-3">
							<span>
								<span class="block font-serif text-lg leading-tight text-[#14352d]">
									{item.title}
								</span>
								<span
									class="mt-1 block text-[0.68rem] font-bold tracking-[0.12em] text-[#8a7444] uppercase"
								>
									{item.color}
								</span>
							</span>
							<span
								class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4b43d] text-white shadow-[0_10px_22px_rgba(196,152,63,0.24)]"
							>
								<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 21.25l-1.45-1.32C5.4 15.24 2 12.16 2 8.38 2 5.3 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A5.96 5.96 0 0116.5 3C19.58 3 22 5.3 22 8.38c0 3.78-3.4 6.86-8.55 11.55L12 21.25z"
									/>
								</svg>
							</span>
						</span>

						<span class="mt-3 block min-h-10 text-sm leading-5 font-medium text-[#596c62]">
							{item.description}
						</span>

						<span class="mt-3 flex flex-wrap gap-2">
							{#each item.specs as spec}
								<span
									class="inline-flex min-h-7 items-center justify-center rounded-full border border-[#14352d]/10 bg-[#f5f0e5] px-3 text-center text-[0.7rem] font-bold text-[#14352d]"
								>
									{spec}
								</span>
							{/each}
						</span>

						<span class="mt-5 flex items-end justify-between gap-3">
							<span class="text-xl font-black text-[#14352d]">{item.price}</span>
							<span
								class="inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-full bg-[#e4b43d] px-4 text-xs font-black text-[#14352d] transition-colors group-hover:bg-[#14352d] group-hover:text-white"
							>
								Add to Cart
							</span>
						</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Trust / Quality Highlights -->
<section class="border-y border-gray-100 bg-white py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
			<div class="flex flex-col items-center">
				<svg class="mb-4 h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
					/>
				</svg>
				<h4 class="mb-2 text-sm font-medium tracking-widest uppercase">Premium Nida</h4>
				<p class="text-xs font-light text-gray-500">Finest fabrics sourced globally</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="mb-4 h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
					/>
				</svg>
				<h4 class="mb-2 text-sm font-medium tracking-widest uppercase">Handstitched</h4>
				<p class="text-xs font-light text-gray-500">Impeccable attention to detail</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="mb-4 h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h4 class="mb-2 text-sm font-medium tracking-widest uppercase">Ships Worldwide</h4>
				<p class="text-xs font-light text-gray-500">Fast, reliable global shipping</p>
			</div>
			<div class="flex flex-col items-center">
				<svg class="mb-4 h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				<h4 class="mb-2 text-sm font-medium tracking-widest uppercase">Easy Returns</h4>
				<p class="text-xs font-light text-gray-500">14-day hassle-free return policy</p>
			</div>
		</div>
	</div>
</section>

<!-- Bestsellers (With Badges & Ratings) -->
<section class="bg-cream py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-serif text-3xl tracking-widest text-black uppercase">Most Loved</h2>
			<div class="mx-auto h-[1px] w-16 bg-gold"></div>
		</div>

		<div class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
			<!-- Product Array Loop (Simulated for top 4) -->
			{#each [1, 2, 3, 4] as item}
				<div class="group cursor-pointer">
					<div class="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100">
						{#if item === 1}
							<div
								class="absolute top-3 left-3 z-10 bg-white/90 px-2 py-1 text-[10px] font-bold tracking-widest text-black uppercase backdrop-blur"
							>
								Most Loved
							</div>
						{/if}
						{#if item === 3}
							<div
								class="absolute top-3 left-3 z-10 bg-gold px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase"
							>
								Limited
							</div>
						{/if}
						<img
							src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop&sig={item}"
							alt="Bestseller {item}"
							class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
						/>
					</div>
					<div class="mb-2 flex items-center space-x-1">
						{#each [1, 2, 3, 4, 5] as star}
							<svg class="h-3 w-3 text-gold" fill="currentColor" viewBox="0 0 20 20"
								><path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path></svg
							>
						{/each}
						<span class="ml-1 text-xs text-gray-400">(24)</span>
					</div>
					<h3 class="text-md mb-1 font-serif transition-colors group-hover:text-gold">
						Classic Essential Abaya
					</h3>
					<p class="text-sm font-medium">$89.00</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Lookbook / Style Gallery -->
<section class="overflow-hidden py-0">
	<div class="grid h-64 grid-cols-2 md:h-80 md:grid-cols-4 lg:grid-cols-6">
		{#each [1, 2, 3, 4, 5, 6] as item}
			<div
				class="group relative cursor-pointer overflow-hidden {item > 4
					? 'hidden lg:block'
					: ''} {item > 2 && item <= 4 ? 'hidden md:block' : ''}"
			>
				<div
					class="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30"
				>
					<svg
						class="h-8 w-8 scale-50 transform text-white opacity-0 transition-opacity duration-300 group-hover:scale-100 group-hover:opacity-100"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
				</div>
				<img
					src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=400&auto=format&fit=crop&sig={item +
						10}"
					alt="Instagram {item}"
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
			</div>
		{/each}
	</div>
	<div class="bg-black py-6 text-center">
		<a
			href="https://instagram.com"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center justify-center text-xs tracking-widest text-white uppercase transition-colors hover:text-gold"
		>
			<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"
				><path
					d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
				/></svg
			>
			Follow @Abayiza on Instagram
		</a>
	</div>
</section>

<!-- Customer Reviews -->
<section class="bg-white py-24">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="mb-16 font-serif text-3xl tracking-widest text-black uppercase">
			The Abayiza Experience
		</h2>

		<div class="relative">
			<div class="flex flex-col items-center">
				<div class="mb-6 flex space-x-1">
					{#each [1, 2, 3, 4, 5] as star}
						<svg class="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20"
							><path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							></path></svg
						>
					{/each}
				</div>
				<p class="mb-8 font-serif text-xl leading-relaxed italic md:text-2xl">
					"The craftsmanship is unparalleled. I purchased the Everyday Abaya for work, and the Nida
					fabric drapes so beautifully. It feels incredibly luxurious yet practical. I will
					definitely be purchasing more."
				</p>
				<p class="text-sm font-medium tracking-widest uppercase">Aisha K.</p>
				<p class="mt-1 text-xs text-gray-500">Verified Buyer</p>
			</div>

			<!-- Carousel Controls (Static for now) -->
			<div class="mt-12 flex justify-center space-x-4">
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gold hover:text-gold"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15 19l-7-7 7-7"
						/></svg
					>
				</button>
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gold hover:text-gold"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9 5l7 7-7 7"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
</section>
