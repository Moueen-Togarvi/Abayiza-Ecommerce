<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';
	import { formatMoney } from '$lib/shared/money';

	let step = $state(1);
	const expressShipping = 1200;
</script>

<svelte:head>
	<title>Checkout | Abayiza</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Minimal Checkout Header -->
	<header class="border-b border-gray-200 py-6">
		<div class="max-w-4xl mx-auto px-4 flex justify-center">
			<a href="/" class="text-2xl font-serif tracking-widest uppercase">Abayiza</a>
		</div>
	</header>

	<div class="max-w-4xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-12">
		<!-- Checkout Flow -->
		<div class="w-full md:w-3/5">
			
			<!-- Breadcrumbs / Steps -->
			<nav class="flex items-center text-xs tracking-widest uppercase mb-10">
				<a href="/cart" class="text-gray-400 hover:text-black">Cart</a>
				<svg class="w-3 h-3 mx-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
				<span class="{step >= 1 ? 'text-black font-medium' : 'text-gray-400'}">Information</span>
				<svg class="w-3 h-3 mx-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
				<span class="{step >= 2 ? 'text-black font-medium' : 'text-gray-400'}">Shipping</span>
				<svg class="w-3 h-3 mx-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
				<span class="{step >= 3 ? 'text-black font-medium' : 'text-gray-400'}">Payment</span>
			</nav>

			{#if step === 1}
				<!-- Step 1: Address -->
				<div>
					<div class="flex justify-between items-center mb-4">
						<h2 class="text-xl font-serif">Contact Information</h2>
						<span class="text-sm text-gray-500 font-light">Already have an account? <a href="/login" class="text-black underline">Log in</a></span>
					</div>
					<div class="mb-8">
						<input type="email" placeholder="Email" class="w-full border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<label class="flex items-center space-x-2 mt-3 cursor-pointer">
							<input type="checkbox" class="form-checkbox text-black border-gray-300 rounded-none focus:ring-black h-4 w-4">
							<span class="text-xs text-gray-500">Email me with news and offers</span>
						</label>
					</div>

					<h2 class="text-xl font-serif mb-4">Shipping Address</h2>
					<div class="grid grid-cols-2 gap-4 mb-6">
						<input type="text" placeholder="First name" class="col-span-2 md:col-span-1 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="Last name" class="col-span-2 md:col-span-1 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="Address" class="col-span-2 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="Apartment, suite, etc. (optional)" class="col-span-2 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="City" class="col-span-2 md:col-span-1 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="Postal code" class="col-span-2 md:col-span-1 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
						<input type="text" placeholder="Phone" class="col-span-2 border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
					</div>
					
					<div class="flex justify-between items-center pt-4">
						<a href="/cart" class="text-sm text-gray-500 hover:text-black flex items-center">
							<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
							Return to cart
						</a>
						<button class="bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors" onclick={() => step = 2}>
							Continue to shipping
						</button>
					</div>
				</div>
			{:else if step === 2}
				<!-- Step 2: Shipping -->
				<div>
					<div class="border border-gray-200 rounded-none p-4 mb-8 text-sm font-light">
						<div class="flex justify-between border-b border-gray-100 pb-3 mb-3">
							<span class="text-gray-500">Contact</span>
							<span>Entered at information step</span>
							<button class="text-xs text-gray-400 underline" onclick={() => step = 1}>Change</button>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-500">Ship to</span>
							<span class="text-right mx-4 truncate">Entered at information step</span>
							<button class="text-xs text-gray-400 underline" onclick={() => step = 1}>Change</button>
						</div>
					</div>

					<h2 class="text-xl font-serif mb-4">Shipping Method</h2>
					<div class="border border-gray-200 rounded-none divide-y divide-gray-100 mb-8">
						<label class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
							<div class="flex items-center">
								<input type="radio" name="shipping" checked class="form-radio text-black border-gray-300 focus:ring-black h-4 w-4">
								<span class="ml-3 text-sm">Standard Shipping (5-7 Business Days)</span>
							</div>
							<span class="text-sm font-medium">Free</span>
						</label>
						<label class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
							<div class="flex items-center">
								<input type="radio" name="shipping" class="form-radio text-black border-gray-300 focus:ring-black h-4 w-4">
								<span class="ml-3 text-sm">DHL Express (2-3 Business Days)</span>
							</div>
							<span class="text-sm font-medium">{formatMoney(expressShipping)}</span>
						</label>
					</div>

					<div class="flex justify-between items-center pt-4">
						<button class="text-sm text-gray-500 hover:text-black flex items-center" onclick={() => step = 1}>
							<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
							Return to information
						</button>
						<button class="bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors" onclick={() => step = 3}>
							Continue to payment
						</button>
					</div>
				</div>
			{:else}
				<!-- Step 3: Payment -->
				<div>
					<h2 class="text-xl font-serif mb-2">Payment</h2>
					<p class="text-sm text-gray-500 font-light mb-6">All transactions are secure and encrypted.</p>
					
					<div class="border border-gray-200 rounded-none mb-8">
						<!-- Cash on Delivery -->
						<div class="border-b border-gray-200">
							<label class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 bg-gray-50">
								<div class="flex items-center">
									<input type="radio" name="payment" checked class="form-radio text-black border-gray-300 focus:ring-black h-4 w-4">
									<span class="ml-3 text-sm font-medium">Cash on Delivery (COD)</span>
								</div>
							</label>
							<div class="p-6 bg-white text-center text-sm text-gray-500 font-light">
								Pay with cash upon delivery. 
							</div>
						</div>
						
						<!-- JazzCash (Requested by user) -->
						<div>
							<label class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
								<div class="flex items-center">
									<input type="radio" name="payment" class="form-radio text-black border-gray-300 focus:ring-black h-4 w-4">
									<span class="ml-3 text-sm font-medium">JazzCash</span>
								</div>
								<div class="text-xs font-bold bg-[#ed1c24] text-white px-2 py-1 rounded-sm">JazzCash</div>
							</label>
						</div>
					</div>

					<div class="flex justify-between items-center pt-4">
						<button class="text-sm text-gray-500 hover:text-black flex items-center" onclick={() => step = 2}>
							<svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
							Return to shipping
						</button>
						<button class="bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
							Complete order
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Order Summary Sidebar -->
		<div class="w-full md:w-2/5 border-l border-gray-200 md:pl-10">
			{#if cart.items.length === 0}
				<div class="mb-6 rounded border border-gray-200 p-4 text-sm text-gray-500">
					Your bag is empty. Add a product before checkout.
				</div>
			{:else}
				{#each cart.items as item}
					<div class="mb-6 flex items-center">
						<div class="relative h-16 w-16 flex-shrink-0 border border-gray-200 bg-gray-100">
							<img src={item.image} alt={item.name} class="h-full w-full object-cover" />
							<span
								class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-[10px] text-white"
							>
								{item.quantity}
							</span>
						</div>
						<div class="ml-4 flex-grow">
							<h4 class="font-serif text-sm">{item.name}</h4>
							<p class="text-xs font-light text-gray-500">
								{[item.color, item.size].filter(Boolean).join(' / ')}
							</p>
						</div>
						<span class="ml-4 text-right text-sm font-medium">{formatMoney(item.price * item.quantity)}</span>
					</div>
				{/each}
			{/if}

			<!-- Discount Code -->
			<div class="flex space-x-2 py-4 border-y border-gray-200 mb-4">
				<input type="text" placeholder="Gift card or discount code" class="flex-grow border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
				<button class="bg-gray-200 text-gray-500 px-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-300 transition-colors">Apply</button>
			</div>

			<!-- Totals -->
			<div class="space-y-3 mb-6 text-sm font-light border-b border-gray-200 pb-4">
				<div class="flex justify-between">
					<span class="text-gray-600">Subtotal</span>
					<span class="font-medium text-black">{formatMoney(cart.subtotal)}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Shipping</span>
					<span class="text-xs text-gray-500">{step >= 2 ? 'Free' : 'Calculated at next step'}</span>
				</div>
			</div>

			<div class="flex justify-between items-end">
				<span class="text-base font-medium uppercase tracking-widest text-black">Total</span>
				<div class="flex items-center">
					<span class="text-xs text-gray-500 mr-2">PKR</span>
					<span class="text-2xl font-serif text-black">{formatMoney(cart.subtotal)}</span>
				</div>
			</div>
		</div>
	</div>
</div>
