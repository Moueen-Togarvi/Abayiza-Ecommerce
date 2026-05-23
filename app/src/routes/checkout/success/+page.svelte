<script lang="ts">
	// Placeholder
</script>

<svelte:head>
	<title>Order Confirmed | Abayiza</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
	<div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-600">
		<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
	</div>
	
	<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">Order Confirmed</h1>
	<p class="text-gray-500 font-light mb-2">Thank you for your purchase!</p>
	<p class="text-sm font-medium mb-10">Order #10284</p>
	
	<div class="bg-gray-50 border border-gray-200 p-8 text-left mb-10">
		<h2 class="text-lg font-serif mb-6">Order Details</h2>
		<div class="space-y-4 text-sm">
			<div class="flex justify-between border-b border-gray-200 pb-4">
				<div class="flex">
					<img src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=100&auto=format&fit=crop" class="w-12 h-16 object-cover bg-gray-100 mr-4" alt="Item">
					<div>
						<p class="font-medium text-black">Signature Nida Abaya</p>
						<p class="text-gray-500 text-xs mt-1">Midnight Black / M (54)</p>
						<p class="text-gray-500 text-xs mt-1">Qty: 1</p>
					</div>
				</div>
				<span class="font-medium">$145.00</span>
			</div>
			
			<div class="flex justify-between text-gray-600">
				<span>Subtotal</span>
				<span>$145.00</span>
			</div>
			<div class="flex justify-between text-gray-600">
				<span>Shipping</span>
				<span>Free</span>
			</div>
			<div class="flex justify-between text-black font-medium text-base pt-4 border-t border-gray-200">
				<span>Total</span>
				<span>$145.00</span>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12 border-b border-gray-200 pb-12">
		<div>
			<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-3">Shipping Address</h3>
			<p class="text-sm text-gray-600 font-light leading-relaxed">
				Fatima Zahra<br>
				123 Luxury Ave<br>
				Apt 4B<br>
				New York, NY 10001<br>
				United States
			</p>
		</div>
		<div>
			<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-3">Payment Method</h3>
			<p class="text-sm text-gray-600 font-light leading-relaxed">
				Cash on Delivery (COD)
			</p>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row justify-center gap-4">
		<a href="/shop" class="bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors">
			Continue Shopping
		</a>
		<a href="https://wa.me/1234567890" target="_blank" class="border border-black text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors flex items-center justify-center">
			<svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			Support via WhatsApp
		</a>
	</div>
</div>
