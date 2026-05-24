<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import { cart } from '$lib/client/cart.svelte';

	let { children } = $props();
	let mobileMenuOpen = $state(false);
	let scrollY = $state(0);

	const primaryNavItems = [
		{ href: '/', label: 'Home' },
		{ href: '/shop', label: 'Shop' },
		{ href: '/collections', label: 'Collections' },
		{ href: '/lookbook', label: 'Lookbook' },
		{ href: '/size-guide', label: 'Size Guide' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const iconButtonClass =
		'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/24 bg-[#14352d]/92 text-white shadow-[0_12px_28px_rgba(20,53,45,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c8ff46] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14352d]';

	let isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
	let isScrolled = $derived(scrollY > 24);

	$effect(() => {
		if (isScrolled && mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	});
</script>

<svelte:window bind:scrollY />

<div class="flex min-h-screen flex-col bg-cream font-sans text-black">
	{#if !isAdminRoute}
		<!-- Navbar -->
		<header class="sticky top-0 z-50 px-3 pt-3 sm:px-5">
			<div class="mx-auto max-w-7xl">
				<div class={`transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm' : ''}`}>
					<div class="flex h-14 items-center gap-2">
						<button
							type="button"
							class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/24 bg-[#14352d]/92 text-white shadow-[0_12px_28px_rgba(20,53,45,0.18)] backdrop-blur-md transition-all duration-300 hover:bg-[#c8ff46] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14352d] lg:hidden"
							aria-label="Toggle menu"
							aria-expanded={mobileMenuOpen}
							onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						>
							{#if mobileMenuOpen}
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							{:else}
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M4 7h16M4 12h16M4 17h16"
									/>
								</svg>
							{/if}
						</button>

						<a href="/" class="group inline-flex min-w-0 shrink-0 items-center gap-2.5">
							<span
								class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#14352d] font-serif text-lg text-white shadow-[0_14px_30px_rgba(20,53,45,0.22)]"
							>
								A
							</span>
							<span class="hidden leading-none sm:block">
								<span class="block text-sm font-black tracking-[0.18em] text-[#14352d]"
									>ABAYIZA</span
								>
								<span
									class="mt-1 block text-[10px] font-semibold tracking-[0.18em] text-[#355f48] uppercase"
									>Modest Atelier</span
								>
							</span>
						</a>

						<nav
							class="mx-auto hidden items-center gap-1 text-xs font-black lg:flex"
							aria-label="Primary navigation"
						>
							{#each primaryNavItems.slice(1, 5) as item}
								<a
									href={item.href}
									class={`rounded-full px-3.5 py-2 transition-all duration-300 ${
										page.url.pathname === item.href ||
										(item.href !== '/' && page.url.pathname.startsWith(item.href))
											? 'bg-[#14352d] text-white shadow-[0_10px_24px_rgba(20,53,45,0.18)]'
											: 'text-[#14352d] hover:bg-[#c8ff46]/88 hover:text-[#14352d]'
									}`}
								>
									{item.label}
								</a>
							{/each}
						</nav>

						<form action="/search" method="GET" class="ml-auto hidden min-w-0 lg:block">
							<label
								class="flex h-11 w-[13rem] items-center gap-2 overflow-hidden rounded-full border border-white/24 bg-[#14352d]/88 pr-3 pl-4 text-white shadow-[0_12px_28px_rgba(20,53,45,0.16)] backdrop-blur-md transition-colors focus-within:bg-[#14352d]"
							>
								<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<input
									type="search"
									name="q"
									placeholder="Search abayas"
									class="h-full w-full border-0 bg-transparent px-0 text-xs font-semibold text-white placeholder:text-white/62 focus:ring-0"
								/>
							</label>
						</form>

						<div class="flex items-center gap-1.5">
							<a href="/search" class={`${iconButtonClass} lg:hidden`} aria-label="Search">
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</a>
							<a
								href="/account"
								class={`${iconButtonClass} hidden sm:inline-flex`}
								aria-label="Account"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 20a7 7 0 0114 0"
									/>
								</svg>
							</a>
							<a
								href="/wishlist"
								class={`${iconButtonClass} hidden sm:inline-flex`}
								aria-label="Wishlist"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M12 20.25l-1.45-1.32C5.4 14.36 2 11.28 2 7.5A4.5 4.5 0 016.5 3c1.74 0 3.41.81 4.5 2.09A5.96 5.96 0 0115.5 3 4.5 4.5 0 0120 7.5c0 3.78-3.4 6.86-8.55 11.43L12 20.25z"
									/>
								</svg>
							</a>
							<a href="/cart" class={`${iconButtonClass} relative`} aria-label="Cart">
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M6 7h15l-1.5 8.25H8.25L6 4.5H3"
									/>
									<circle cx="9" cy="19" r="1.25" fill="currentColor"></circle>
									<circle cx="18" cy="19" r="1.25" fill="currentColor"></circle>
								</svg>
								{#if cart.totalItems > 0}
									<span
										class="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c5a880] px-1 text-[9px] font-bold text-[#1f2926]"
									>
										{cart.totalItems}
									</span>
								{/if}
							</a>
						</div>
					</div>
				</div>

				{#if mobileMenuOpen}
					<div
						class="mt-2 overflow-hidden rounded-[1.25rem] border border-white/24 bg-[#14352d]/92 p-3 text-white shadow-[0_22px_60px_rgba(20,53,45,0.22)] backdrop-blur-xl lg:hidden"
					>
						<form action="/search" method="GET">
							<label
								class="flex h-12 items-center gap-3 overflow-hidden rounded-full border border-white/12 bg-white/10 pr-3 pl-4 text-white"
							>
								<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.8"
										d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<input
									type="search"
									name="q"
									placeholder="Search premium abayas"
									class="h-full w-full border-0 bg-transparent px-0 text-sm text-white placeholder:text-white/58 focus:ring-0"
								/>
							</label>
						</form>

						<nav class="mt-3 grid grid-cols-2 gap-2" aria-label="Mobile navigation">
							{#each primaryNavItems as item}
								<a
									href={item.href}
									class={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
										page.url.pathname === item.href ||
										(item.href !== '/' && page.url.pathname.startsWith(item.href))
											? 'bg-[#c8ff46] text-[#14352d] shadow-[0_12px_28px_rgba(200,255,70,0.16)]'
											: 'bg-white/9 text-white hover:bg-white/16'
									}`}
									onclick={() => (mobileMenuOpen = false)}
								>
									{item.label}
								</a>
							{/each}
						</nav>

						<div
							class="mt-3 flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-xs font-semibold text-white"
						>
							<span>Free delivery over $200</span>
							<span class="text-[#c8ff46]">USD</span>
						</div>
					</div>
				{/if}
			</div>
		</header>
	{/if}

	<!-- Main Content -->
	<main class="flex-grow">
		{@render children()}
	</main>

	<!-- Minimal Footer -->
	<footer class="bg-black pt-16 pb-8 text-white">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 md:text-left lg:px-8">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
				<div class="col-span-1 md:col-span-1">
					<h3 class="mb-6 font-serif text-xl tracking-widest uppercase">Abayiza</h3>
					<p class="text-sm font-light text-gray-400">
						Elevating modest fashion with premium craftsmanship and timeless design.
					</p>
				</div>
				<div>
					<h4 class="mb-6 text-sm font-medium tracking-widest text-gray-200 uppercase">Shop</h4>
					<ul class="space-y-4 text-sm font-light text-gray-400">
						<li>
							<a href="/collections/everyday" class="transition-colors hover:text-gold"
								>Everyday Abayas</a
							>
						</li>
						<li>
							<a href="/collections/wedding" class="transition-colors hover:text-gold"
								>Wedding Collection</a
							>
						</li>
						<li>
							<a href="/collections/summer" class="transition-colors hover:text-gold">Summer Edit</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-6 text-sm font-medium tracking-widest text-gray-200 uppercase">Help</h4>
					<ul class="space-y-4 text-sm font-light text-gray-400">
						<li><a href="/contact" class="transition-colors hover:text-gold">Contact Us</a></li>
						<li>
							<a href="/faq" class="transition-colors hover:text-gold">Shipping & Returns</a>
						</li>
						<li>
							<a href="/size-guide" class="transition-colors hover:text-gold">Size Guide</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-6 text-sm font-medium tracking-widest text-gray-200 uppercase">
						Newsletter
					</h4>
					<p class="mb-4 text-sm font-light text-gray-400">
						Be the first to know about new drops and exclusive offers.
					</p>
					<form class="flex border-b border-gray-700 pb-2">
						<input
							type="email"
							placeholder="Your email address"
							class="flex-grow border-none bg-transparent px-0 text-sm text-white placeholder-gray-500 focus:ring-0"
						/>
						<button
							type="submit"
							class="text-sm font-medium tracking-wider uppercase transition-colors hover:text-gold"
							>Subscribe</button
						>
					</form>
				</div>
			</div>
			<div
				class="mt-16 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row"
			>
				<p class="text-xs text-gray-500">&copy; 2026 Abayiza. All rights reserved.</p>
				<div class="mt-4 flex space-x-6 text-gray-500 md:mt-0">
					<a href="https://instagram.com" class="transition-colors hover:text-white">Instagram</a>
					<a href="https://tiktok.com" class="transition-colors hover:text-white">TikTok</a>
					<a href="https://wa.me" class="transition-colors hover:text-white">WhatsApp</a>
				</div>
			</div>
		</div>
	</footer>
</div>
