<script lang="ts">
	let currentStatus = 'Processing';
	const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
</script>

<div class="max-w-5xl mx-auto pb-12">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
		<div class="flex items-center space-x-4">
			<a href="/admin/orders" class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
			</a>
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Order #10284</h1>
				<p class="text-sm text-gray-500 mt-0.5">May 21, 2026 at 3:45 PM · 1 item</p>
			</div>
		</div>
		<div class="flex items-center space-x-3">
			<button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm">Refund</button>
			<button class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm">Mark as Fulfilled</button>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Left Column -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Fulfillment Status -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
					<div>
						<h3 class="font-medium text-gray-900">Fulfillment</h3>
						<span class="text-sm text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full text-xs mt-1 inline-block">Unfulfilled</span>
					</div>
					<button class="text-sm text-blue-600 hover:text-blue-500">Fulfill items</button>
				</div>
				<div class="p-6">
					<div class="flex items-center gap-4">
						<div class="h-14 w-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
							<img src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=100&auto=format&fit=crop" alt="Product" class="w-full h-full object-cover">
						</div>
						<div class="flex-grow">
							<p class="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Signature Nida Abaya</p>
							<p class="text-xs text-gray-500 mt-0.5">Midnight Black / M (54)</p>
							<p class="text-xs text-gray-400">SKU: SNA-BLK-M</p>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium">$145.00</p>
							<p class="text-xs text-gray-500">× 1</p>
						</div>
					</div>
					<div class="mt-4 pt-4 border-t border-gray-100">
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-xs font-medium text-gray-700 mb-1">Tracking Number</label>
								<input type="text" placeholder="Enter tracking number" class="w-full border-gray-300 text-sm rounded-md shadow-sm focus:ring-black focus:border-black px-3 py-2">
							</div>
							<div>
								<label class="block text-xs font-medium text-gray-700 mb-1">Shipping Carrier</label>
								<select class="w-full border-gray-300 text-sm rounded-md shadow-sm focus:ring-black focus:border-black px-3 py-2">
									<option>DHL Express</option>
									<option>Aramex</option>
									<option>FedEx</option>
									<option>Other</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Payment -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
					<h3 class="font-medium text-gray-900">Payment</h3>
					<span class="text-sm text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full text-xs">Pending (COD)</span>
				</div>
				<div class="p-6 space-y-2 text-sm">
					<div class="flex justify-between text-gray-600"><span>Subtotal (1 item)</span><span>$145.00</span></div>
					<div class="flex justify-between text-gray-600"><span>Shipping (DHL Express)</span><span>$25.00</span></div>
					<div class="flex justify-between text-gray-600"><span>Discount (WELCOME15)</span><span class="text-green-600">-$21.75</span></div>
					<div class="flex justify-between font-medium text-gray-900 pt-3 border-t border-gray-100">
						<span>Total</span><span>$148.25</span>
					</div>
					<div class="flex justify-between text-gray-600 pt-2"><span>Payment method</span><span>Cash on Delivery</span></div>
				</div>
			</div>

			<!-- Timeline -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Order Timeline</h3>
				</div>
				<div class="p-6">
					<div class="space-y-6">
						{#each [
							{ event: 'Order placed by customer', time: 'May 21, 3:45 PM', icon: '📦' },
							{ event: 'Payment confirmed (COD)', time: 'May 21, 3:45 PM', icon: '💰' },
							{ event: 'Order confirmed and sent to fulfillment', time: 'May 21, 6:00 PM', icon: '✅' },
						] as event}
						<div class="flex gap-4">
							<div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">{event.icon}</div>
							<div>
								<p class="text-sm text-gray-900">{event.event}</p>
								<p class="text-xs text-gray-400 mt-0.5">{event.time}</p>
							</div>
						</div>
						{/each}
					</div>
					<div class="mt-6 pt-4 border-t border-gray-100">
						<textarea class="w-full border-gray-300 rounded-md text-sm focus:ring-black focus:border-black" rows="2" placeholder="Add a note to this order..."></textarea>
						<button class="mt-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 shadow-sm">Add Note</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column (Customer & Addresses) -->
		<div class="space-y-6">
			<!-- Customer -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Customer</h3>
				</div>
				<div class="p-6">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-serif font-bold">F</div>
						<div>
							<a href="/admin/customers/1" class="text-sm font-medium text-blue-600 hover:underline">Fatima Zahra</a>
							<p class="text-xs text-gray-400">3 previous orders</p>
						</div>
					</div>
					<div class="space-y-2 text-sm">
						<a href="mailto:fatima.z@example.com" class="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
							fatima.z@example.com
						</a>
						<a href="tel:+15551234567" class="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
							+1 (555) 123-4567
						</a>
					</div>
				</div>
			</div>

			<!-- Shipping Address -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Shipping Address</h3>
				</div>
				<div class="p-6 text-sm text-gray-600 leading-relaxed">
					<p class="font-medium text-gray-900 mb-1">Fatima Zahra</p>
					123 Luxury Ave<br>
					Apt 4B<br>
					New York, NY 10001<br>
					United States<br>
					<a href="tel:+15551234567" class="mt-2 block text-gray-500">+1 (555) 123-4567</a>
				</div>
			</div>

			<!-- Order Status Control -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Update Status</h3>
				</div>
				<div class="p-6 space-y-3">
					<select bind:value={currentStatus} class="w-full border-gray-300 rounded-md text-sm shadow-sm focus:ring-black focus:border-black px-3 py-2">
						{#each statuses as s}<option>{s}</option>{/each}
					</select>
					<button class="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800">
						Update Order
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
