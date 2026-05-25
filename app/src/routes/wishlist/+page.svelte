<svelte:head>
	<title>My Wishlist | Abayiza</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 font-serif text-3xl tracking-widest text-black uppercase md:text-4xl">
			My Wishlist
		</h1>
		<div class="mx-auto h-[1px] w-12 bg-gold"></div>
	</div>

	<div class="py-20 text-center">
		<svg
			class="mx-auto mb-6 h-16 w-16 text-gray-300"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			/>
		</svg>
		<h2 class="mb-4 font-serif text-xl text-black">Your wishlist is empty</h2>
		<p class="mb-8 font-light text-gray-500">
			Saved products will appear here once customer accounts are connected.
		</p>
		<a
			href="/shop"
			class="inline-block bg-black px-10 py-4 text-sm tracking-widest text-white uppercase transition-colors hover:bg-gold"
		>
			Explore Collection
		</a>
	</div>
</div>
