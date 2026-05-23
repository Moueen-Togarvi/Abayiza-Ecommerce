<script lang="ts">
	let orderNumber = '';
	let email = '';
	let submitted = false;

	const mockOrder = {
		id: '#10284',
		status: 'Out for Delivery',
		date: 'May 21, 2026',
		estimatedDelivery: 'May 24, 2026',
		items: [{ name: 'Signature Nida Abaya', color: 'Midnight Black', size: 'M (54)', qty: 1, price: 145 }],
		shippingAddress: 'Fatima Zahra, 123 Luxury Ave, New York, NY 10001',
		carrier: 'DHL Express',
		trackingNumber: '1234567890',
		steps: [
			{ label: 'Order Placed', date: 'May 21, 2:30 PM', done: true },
			{ label: 'Processing', date: 'May 21, 6:00 PM', done: true },
			{ label: 'Shipped', date: 'May 22, 9:00 AM', done: true },
			{ label: 'Out for Delivery', date: 'May 24, 8:00 AM', done: true },
			{ label: 'Delivered', date: 'Expected May 24', done: false }
		]
	};
</script>

<svelte:head>
	<title>Track Your Order | Abayiza</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<div class="text-center mb-12">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">Track Your Order</h1>
		<div class="w-12 h-[1px] bg-gold mx-auto"></div>
	</div>

	{#if !submitted}
	<!-- Lookup Form -->
	<div class="bg-white border border-gray-200 p-8 md:p-12 shadow-sm">
		<p class="text-gray-500 font-light text-center mb-8">Enter your order number and email address to track your shipment.</p>
		<form class="space-y-5" onsubmit={(e) => { e.preventDefault(); submitted = true; }}>
			<div>
				<label for="orderNum" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Order Number</label>
				<input type="text" id="orderNum" bind:value={orderNumber} placeholder="#10284" class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors rounded-none bg-white">
			</div>
			<div>
				<label for="trackEmail" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
				<input type="email" id="trackEmail" bind:value={email} placeholder="your@email.com" class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors rounded-none bg-white">
			</div>
			<button type="submit" class="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
				Track Order
			</button>
		</form>
	</div>

	{:else}
	<!-- Tracking Result -->
	<div class="space-y-6">
		<!-- Status Banner -->
		<div class="bg-black text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
			<div>
				<p class="text-xs tracking-widest uppercase text-white/60 mb-1">Order {mockOrder.id}</p>
				<h2 class="text-xl font-serif">{mockOrder.status}</h2>
				<p class="text-sm text-white/70 font-light mt-1">Estimated Delivery: {mockOrder.estimatedDelivery}</p>
			</div>
			<div class="text-right">
				<p class="text-xs tracking-widest uppercase text-white/60 mb-1">{mockOrder.carrier}</p>
				<p class="text-sm font-mono">{mockOrder.trackingNumber}</p>
			</div>
		</div>

		<!-- Progress Tracker -->
		<div class="bg-white border border-gray-200 p-8 shadow-sm">
			<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-8">Shipment Progress</h3>
			<div class="relative">
				<!-- Line -->
				<div class="absolute left-4 top-0 bottom-0 w-[1px] bg-gray-200"></div>
				<div class="space-y-8">
					{#each mockOrder.steps as step, i}
					<div class="flex items-start pl-12 relative">
						<!-- Dot -->
						<div class="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 {step.done ? 'bg-black border-black' : 'bg-white border-gray-300'}">
							{#if step.done}
							<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
							{:else}
							<div class="w-2 h-2 rounded-full bg-gray-300"></div>
							{/if}
						</div>
						<div>
							<p class="text-sm font-medium {step.done ? 'text-black' : 'text-gray-400'}">{step.label}</p>
							<p class="text-xs text-gray-400 font-light mt-0.5">{step.date}</p>
						</div>
					</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Order Items & Shipping Info -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="bg-white border border-gray-200 p-6 shadow-sm">
				<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-4">Items in Order</h3>
				{#each mockOrder.items as item}
				<div class="flex items-center gap-4">
					<div class="w-12 h-16 bg-gray-100 flex-shrink-0">
						<img src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=100&auto=format&fit=crop" alt={item.name} class="w-full h-full object-cover">
					</div>
					<div>
						<p class="text-sm font-serif">{item.name}</p>
						<p class="text-xs text-gray-400 font-light">{item.color} / {item.size}</p>
						<p class="text-xs text-gray-500 font-medium mt-1">Qty: {item.qty} · ${item.price}</p>
					</div>
				</div>
				{/each}
			</div>
			<div class="bg-white border border-gray-200 p-6 shadow-sm">
				<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-4">Shipping To</h3>
				<p class="text-sm text-gray-600 font-light leading-relaxed">{mockOrder.shippingAddress}</p>
				<div class="mt-4 pt-4 border-t border-gray-100">
					<a href="https://www.dhl.com/track" target="_blank" class="text-xs font-medium uppercase tracking-widest border-b border-black text-black hover:text-gold hover:border-gold transition-colors">
						Track on DHL →
					</a>
				</div>
			</div>
		</div>

		<button class="text-sm text-gray-500 hover:text-black underline transition-colors" onclick={() => submitted = false}>
			← Track another order
		</button>
	</div>
	{/if}

	<!-- Help Section -->
	<div class="mt-12 pt-12 border-t border-gray-200 text-center">
		<p class="text-sm text-gray-500 font-light mb-4">Need help with your order?</p>
		<div class="flex flex-col sm:flex-row justify-center gap-4">
			<a href="/contact" class="text-sm font-medium uppercase tracking-widest border-b border-black text-black hover:text-gold hover:border-gold transition-colors">Contact Support</a>
			<span class="hidden sm:block text-gray-300">|</span>
			<a href="https://wa.me/1234567890" target="_blank" class="text-sm font-medium uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors flex items-center justify-center gap-2">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				WhatsApp Us
			</a>
		</div>
	</div>
</div>
