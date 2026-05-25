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
		{ href: '/size-guide', label: 'Size Guide' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const iconButtonClass =
		'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/24 bg-[#14352d]/92 text-white shadow-[0_12px_28px_rgba(20,53,45,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c8ff46] hover:text-[#14352d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14352d]';

	let isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
	let isScrolled = $derived(scrollY > 24);
</script>

<svelte:window bind:scrollY />

<div class={`flex min-h-screen flex-col font-sans text-black ${isAdminRoute ? 'bg-white' : 'bg-cream'}`}>
	{#if !isAdminRoute}
		<!-- Navbar -->
		<header class="sticky top-0 z-50 px-3 pt-3 sm:px-5">
			<div class="mx-auto max-w-7xl">
				<div class={`transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm' : ''}`}>
					<div class="flex h-14 items-center justify-between gap-2">
						<a href="/" class="group inline-flex min-w-0 shrink-0 items-center gap-2.5">
							<img
								src="/image.png"
								alt="Abayiza"
								width="640"
								height="640"
								class="h-12 w-12 rounded-full object-cover shadow-[0_14px_30px_rgba(20,53,45,0.22)] ring-1 ring-white/50"
							/>
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
							{#each primaryNavItems.slice(0, 4) as item}
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

						<div class="ml-auto flex items-center gap-1.5">
							<a
								href="/account"
								class={`${iconButtonClass} !hidden lg:!inline-flex`}
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
								class={`${iconButtonClass} !hidden lg:!inline-flex`}
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
							<button
								type="button"
								class={`${iconButtonClass} lg:!hidden`}
								aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
							<span>Free delivery over Rs. 15,000</span>
							<span class="text-[#c8ff46]">PKR</span>
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

	{#if !isAdminRoute}
		<a
			href="https://wa.me/923116857822"
			target="_blank"
			rel="noreferrer"
			class="fixed right-4 bottom-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_rgba(20,53,45,0.28)] ring-2 ring-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1fb95a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
			aria-label="Contact Abayiza on WhatsApp"
		>
			<svg class="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
				<path
					d="M16.04 3.2A12.7 12.7 0 0 0 5.3 22.7L3.6 28.9l6.35-1.66A12.7 12.7 0 1 0 16.04 3.2Zm0 2.27a10.43 10.43 0 1 1-5.3 19.42l-.38-.23-3.77.99 1-3.67-.25-.39A10.42 10.42 0 0 1 16.04 5.47Zm-4.44 5.56c-.23 0-.6.09-.92.44-.31.35-1.2 1.17-1.2 2.85s1.23 3.31 1.4 3.54c.17.23 2.38 3.8 5.86 5.18 2.9 1.15 3.5.92 4.13.86.63-.06 2.03-.83 2.31-1.63.29-.8.29-1.49.2-1.63-.08-.15-.31-.23-.66-.4-.34-.17-2.03-1-2.34-1.11-.31-.12-.54-.17-.77.17-.23.34-.89 1.11-1.09 1.34-.2.23-.4.26-.74.09-.34-.17-1.45-.53-2.76-1.7-1.02-.91-1.71-2.03-1.91-2.37-.2-.34-.02-.53.15-.7.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.12-.23.06-.43-.03-.6-.08-.17-.77-1.85-1.06-2.54-.28-.67-.56-.58-.77-.59h-.65Z"
				/>
			</svg>
		</a>

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
							<li><a href="/shop" class="transition-colors hover:text-gold">All Products</a></li>
							<li><a href="/collections" class="transition-colors hover:text-gold">Categories</a></li>
							<li><a href="/search" class="transition-colors hover:text-gold">Search Catalog</a></li>
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
						<a href="https://wa.me/923116857822" class="transition-colors hover:text-white">WhatsApp</a>
					</div>
				</div>
			</div>
		</footer>
	{/if}
</div>
