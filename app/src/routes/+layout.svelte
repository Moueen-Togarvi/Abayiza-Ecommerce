<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-cream text-black font-sans">
	<!-- Navbar -->
	<header class="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-black/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-20">
				<!-- Mobile menu button -->
				<div class="flex items-center md:hidden">
					<button class="text-black hover:text-gold transition-colors">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

				<!-- Logo -->
				<div class="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
					<a href="/" class="text-2xl font-serif tracking-widest uppercase">Abayiza</a>
				</div>

				<!-- Desktop Navigation -->
				<nav class="hidden md:flex space-x-10">
					<a href="/shop" class="text-sm font-medium tracking-wide hover:text-gold transition-colors">Shop</a>
					<a href="/collections" class="text-sm font-medium tracking-wide hover:text-gold transition-colors">Collections</a>
					<a href="/about" class="text-sm font-medium tracking-wide hover:text-gold transition-colors">Brand Story</a>
				</nav>

				<!-- Icons -->
				<div class="flex items-center space-x-6">
					<button class="text-black hover:text-gold transition-colors" aria-label="Search">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
					<a href="/account" class="text-black hover:text-gold transition-colors hidden sm:block" aria-label="Account">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</a>
					<a href="/cart" class="text-black hover:text-gold transition-colors relative" aria-label="Cart">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
						<span class="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-grow">
		{@render children()}
	</main>

	<!-- Minimal Footer -->
	<footer class="bg-black text-white pt-16 pb-8">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-12">
				<div class="col-span-1 md:col-span-1">
					<h3 class="text-xl font-serif tracking-widest uppercase mb-6">Abayiza</h3>
					<p class="text-gray-400 text-sm font-light">Elevating modest fashion with premium craftsmanship and timeless design.</p>
				</div>
				<div>
					<h4 class="text-sm font-medium tracking-widest uppercase mb-6 text-gray-200">Shop</h4>
					<ul class="space-y-4 text-sm text-gray-400 font-light">
						<li><a href="/collections/everyday" class="hover:text-gold transition-colors">Everyday Abayas</a></li>
						<li><a href="/collections/wedding" class="hover:text-gold transition-colors">Wedding Collection</a></li>
						<li><a href="/collections/summer" class="hover:text-gold transition-colors">Summer Edit</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-medium tracking-widest uppercase mb-6 text-gray-200">Help</h4>
					<ul class="space-y-4 text-sm text-gray-400 font-light">
						<li><a href="/contact" class="hover:text-gold transition-colors">Contact Us</a></li>
						<li><a href="/faq" class="hover:text-gold transition-colors">Shipping & Returns</a></li>
						<li><a href="/size-guide" class="hover:text-gold transition-colors">Size Guide</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-medium tracking-widest uppercase mb-6 text-gray-200">Newsletter</h4>
					<p class="text-gray-400 text-sm font-light mb-4">Be the first to know about new drops and exclusive offers.</p>
					<form class="flex border-b border-gray-700 pb-2">
						<input type="email" placeholder="Your email address" class="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:ring-0 flex-grow px-0" />
						<button type="submit" class="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wider">Subscribe</button>
					</form>
				</div>
			</div>
			<div class="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
				<p class="text-gray-500 text-xs">&copy; 2026 Abayiza. All rights reserved.</p>
				<div class="flex space-x-6 mt-4 md:mt-0 text-gray-500">
					<a href="#" class="hover:text-white transition-colors">Instagram</a>
					<a href="#" class="hover:text-white transition-colors">TikTok</a>
					<a href="#" class="hover:text-white transition-colors">WhatsApp</a>
				</div>
			</div>
		</div>
	</footer>
</div>
