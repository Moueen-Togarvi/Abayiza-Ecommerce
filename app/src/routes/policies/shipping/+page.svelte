<svelte:head>
	<title>Shipping Information | Abayiza</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<div class="text-center mb-12">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">Shipping Information</h1>
		<div class="w-12 h-[1px] bg-gold mx-auto"></div>
	</div>

	<div class="space-y-10 font-light text-gray-700 leading-relaxed">
		<!-- Shipping Methods Table -->
		<section>
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-6">Shipping Options</h2>
			<div class="overflow-x-auto">
				<table class="w-full text-sm border-collapse">
					<thead>
						<tr class="bg-black text-white">
							<th class="px-5 py-3 text-left text-xs tracking-widest uppercase font-medium">Method</th>
							<th class="px-5 py-3 text-left text-xs tracking-widest uppercase font-medium">Delivery Time</th>
							<th class="px-5 py-3 text-left text-xs tracking-widest uppercase font-medium">Cost</th>
						</tr>
					</thead>
					<tbody>
						{#each [
							{ method: 'Standard Shipping', time: '5-7 Business Days', cost: 'Rs. 300 (Free over Rs. 15,000)' },
							{ method: 'DHL Express', time: '2-3 Business Days', cost: 'Rs. 1,200' },
							{ method: 'Overnight (Domestic)', time: '1 Business Day', cost: 'Confirmed on WhatsApp' },
							{ method: 'International Standard', time: '10–15 Business Days', cost: 'Calculated at checkout' },
							{ method: 'International Express', time: '5–7 Business Days', cost: 'Calculated at checkout' },
						] as row, i}
						<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100">
							<td class="px-5 py-4 font-medium text-black">{row.method}</td>
							<td class="px-5 py-4 text-gray-600">{row.time}</td>
							<td class="px-5 py-4 text-gray-600">{row.cost}</td>
						</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="text-xs text-gray-400 mt-3">*All orders placed before 2:00 PM GST are processed same day (Mon–Fri, excluding public holidays).</p>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4">Free Shipping</h2>
			<p>Enjoy complimentary standard shipping on all orders over <strong class="font-medium text-black">Rs. 15,000 PKR</strong>. This offer applies automatically at checkout. Free shipping is valid on domestic orders only.</p>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4">International Shipping</h2>
			<p class="mb-4">We ship to over 50 countries worldwide. International orders may be subject to customs duties and import taxes, which are the responsibility of the recipient. We are not responsible for delays caused by customs processing.</p>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{#each ['United Arab Emirates', 'Saudi Arabia', 'Pakistan', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany'] as country}
				<div class="bg-cream border border-gray-200 p-3 text-center">
					<p class="text-xs font-medium text-black">{country}</p>
				</div>
				{/each}
			</div>
			<p class="text-xs text-gray-400 mt-3">And 40+ more countries. Shipping availability is confirmed at checkout.</p>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4">Order Tracking</h2>
			<p>Once your order has shipped, you will receive an email containing your tracking number. You can track your shipment at any time using our <a href="/track" class="text-black underline hover:text-gold transition-colors">Order Tracking</a> page or directly on the carrier's website.</p>
		</section>

		<section class="border-t border-gray-100 pt-8 bg-cream p-6">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div>
					<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-1">Questions About Your Shipment?</h3>
					<p class="text-sm text-gray-500 font-light">We're here to help every step of the way.</p>
				</div>
				<div class="flex gap-3">
					<a href="/track" class="border border-black text-black px-6 py-3 text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors whitespace-nowrap">Track Order</a>
					<a href="/contact" class="bg-black text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors whitespace-nowrap">Contact Us</a>
				</div>
			</div>
		</section>
	</div>
</div>
