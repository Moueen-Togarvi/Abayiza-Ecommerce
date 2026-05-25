<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	import { formatMoney } from '$lib/shared/money';

	let shipping = 300;
	let giftWrapPrice = 500;
	let freeShippingThreshold = 15000;
	let isGift = $state(false);
	let giftMessage = $state('');
</script>

<svelte:head>
	<title>Your Bag | Abayiza</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<div class="text-center mb-12">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">Your Bag</h1>
		<div class="w-12 h-[1px] bg-gold mx-auto"></div>
	</div>

	{#if cart.items.length === 0}
		<div class="text-center py-20">
			<p class="text-gray-500 font-light mb-8 text-lg">Your bag is currently empty.</p>
			<a href="/shop" class="inline-block bg-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">Continue Shopping</a>
		</div>
	{:else}
		<div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
			
			<!-- Cart Items -->
			<div class="w-full lg:w-3/5">
				<div class="hidden md:flex justify-between border-b border-black/10 pb-4 mb-6 text-sm tracking-widest uppercase text-gray-500">
					<div class="w-1/2">Product</div>
					<div class="w-1/6 text-center">Quantity</div>
					<div class="w-1/6 text-right">Total</div>
				</div>

				<div class="space-y-8">
					{#each cart.items as item}
					<div class="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-100">
						<!-- Product Image & Info -->
						<div class="flex w-full md:w-1/2 mb-4 md:mb-0">
							<a href="/shop/{item.productId}" class="w-24 h-32 flex-shrink-0 bg-gray-100 block">
								<img src={item.image} alt={item.name} class="w-full h-full object-cover object-top" />
							</a>
							<div class="ml-6 flex flex-col justify-center">
								<a href="/shop/{item.productId}" class="text-sm md:text-base font-serif hover:text-gold transition-colors mb-1">{item.name}</a>
								<p class="text-xs text-gray-500 font-light mb-1">Color: {item.color}</p>
								<p class="text-xs text-gray-500 font-light mb-2">Size: {item.size}</p>
								<p class="text-sm font-medium block md:hidden">{formatMoney(item.price)}</p>
								<button class="text-xs text-gray-400 underline hover:text-black self-start mt-2 uppercase tracking-wider" onclick={() => cart.removeItem(item.id)}>Remove</button>
							</div>
						</div>

						<!-- Quantity -->
						<div class="w-full md:w-1/6 flex justify-start md:justify-center mb-4 md:mb-0">
							<div class="flex border border-gray-300 w-24 h-10">
								<button class="w-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors" onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}>-</button>
								<input type="number" class="w-full bg-transparent border-none text-center focus:ring-0 text-sm font-medium p-0" bind:value={item.quantity} onchange={() => cart.updateQuantity(item.id, item.quantity)} min="1">
								<button class="w-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors" onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}>+</button>
							</div>
						</div>

						<!-- Item Total -->
						<div class="w-full md:w-1/6 text-left md:text-right">
							<p class="text-sm font-medium">{formatMoney(item.price * item.quantity)}</p>
						</div>
					</div>
					{/each}
				</div>
				
				<!-- Gift Wrapping Option -->
				<div class="mt-8 bg-cream/50 p-6 border border-gray-100">
					<label class="flex items-start space-x-3 cursor-pointer">
						<input type="checkbox" bind:checked={isGift} class="form-checkbox h-5 w-5 text-black border-gray-300 rounded-none focus:ring-black mt-0.5">
						<div>
							<span class="text-sm font-medium tracking-wide uppercase block mb-1">
								Add Premium Gift Wrapping ({formatMoney(giftWrapPrice)})
							</span>
							<span class="text-xs text-gray-500 font-light">Your items will be beautifully packaged in our signature Abayiza gift box with a satin ribbon.</span>
						</div>
					</label>
					
					{#if isGift}
						<div class="mt-4 pl-8">
							<label for="gift-message" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Gift Message (Optional)</label>
							<textarea id="gift-message" bind:value={giftMessage} rows="3" class="w-full bg-white border-gray-300 text-sm focus:border-black focus:ring-black" placeholder="Write a personal note..."></textarea>
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Order Summary -->
			<div class="w-full lg:w-2/5">
				<div class="bg-gray-50 p-8 border border-gray-200 sticky top-28">
					<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
					
					<div class="space-y-4 mb-6 text-sm font-light">
						<div class="flex justify-between">
							<span class="text-gray-600">Subtotal</span>
							<span>{formatMoney(cart.subtotal)}</span>
						</div>
						{#if isGift}
						<div class="flex justify-between">
							<span class="text-gray-600">Gift Wrapping</span>
							<span>{formatMoney(giftWrapPrice)}</span>
						</div>
						{/if}
						<div class="flex justify-between">
							<span class="text-gray-600">Estimated Shipping</span>
							<span>{cart.subtotal > freeShippingThreshold ? 'Free' : formatMoney(shipping)}</span>
						</div>
					</div>

					<div class="border-t border-gray-200 pt-6 mb-8">
						<div class="flex justify-between items-end">
							<span class="text-base font-medium uppercase tracking-widest">Total</span>
							<span class="text-xl font-serif text-black">
								{formatMoney(cart.subtotal + (isGift ? giftWrapPrice : 0) + (cart.subtotal > freeShippingThreshold ? 0 : shipping))}
							</span>
						</div>
						<p class="text-xs text-gray-500 mt-2 text-right">Taxes calculated at checkout</p>
					</div>

					<a href="/checkout" class="block w-full bg-black text-white text-center py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors mb-4">
						Proceed to Checkout
					</a>
					
					<div class="flex justify-center items-center space-x-2 text-xs text-gray-400">
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
						<span>Secure Encrypted Checkout</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
