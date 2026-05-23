<svelte:head>
	<title>Returns & Exchanges | Abayiza</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<div class="text-center mb-12">
		<h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-black mb-4">Returns & Exchanges</h1>
		<div class="w-12 h-[1px] bg-gold mx-auto"></div>
	</div>

	<div class="prose prose-gray max-w-none space-y-10 font-light text-gray-700 leading-relaxed">
		<section>
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4 not-prose">Our Promise</h2>
			<p>We want you to love every piece from Abayiza. If for any reason you are not completely satisfied with your purchase, we are here to help. We accept returns and exchanges within <strong class="font-medium text-black">14 days</strong> of your delivery date.</p>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4 not-prose">Eligibility for Returns</h2>
			<p class="mb-4">To be eligible for a return, your item must meet the following conditions:</p>
			<ul class="space-y-3 not-prose">
				{#each [
					'Item must be unworn, unwashed, and in its original condition',
					'All original tags must still be attached to the garment',
					'Item must be returned in its original packaging',
					'A valid proof of purchase (order confirmation) must be provided',
					'Return request must be initiated within 14 days of delivery'
				] as condition}
				<li class="flex items-start">
					<svg class="w-5 h-5 mr-3 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
					<span class="text-sm text-gray-600">{condition}</span>
				</li>
				{/each}
			</ul>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4 not-prose">Non-Returnable Items</h2>
			<p class="mb-4">The following items are <strong class="font-medium text-black">final sale</strong> and cannot be returned or exchanged:</p>
			<ul class="space-y-3 not-prose">
				{#each ['Custom or personalised orders', 'Items purchased during a Final Sale event', 'Accessories including hijabs, pins, and pouches', 'Items that have been worn, washed, or altered', 'Gift cards'] as item}
				<li class="flex items-start">
					<svg class="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
					<span class="text-sm text-gray-600">{item}</span>
				</li>
				{/each}
			</ul>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4 not-prose">How to Initiate a Return</h2>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose">
				{#each [
					{ step: '01', title: 'Contact Us', desc: 'Email support@abayiza.com or WhatsApp us with your order number and reason for return.' },
					{ step: '02', title: 'Ship Item Back', desc: 'Pack your item securely and ship it to our returns address. You are responsible for return shipping costs.' },
					{ step: '03', title: 'Refund Processed', desc: 'Once we receive and inspect your return, your refund will be processed within 5–7 business days.' }
				] as item}
				<div class="text-center p-6 border border-gray-200 bg-cream">
					<div class="text-3xl font-serif text-gold mb-3">{item.step}</div>
					<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-2">{item.title}</h3>
					<p class="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
				</div>
				{/each}
			</div>
		</section>

		<section class="border-t border-gray-100 pt-8">
			<h2 class="text-lg font-serif tracking-widest uppercase text-black mb-4 not-prose">Refund Policy</h2>
			<p>Refunds will be issued to your original payment method. Please allow <strong class="font-medium text-black">5–10 business days</strong> for the funds to appear in your account after the refund has been processed. Shipping costs are non-refundable unless the item was received damaged or defective.</p>
		</section>

		<section class="border-t border-gray-100 pt-8 bg-cream p-6 not-prose">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div>
					<h3 class="text-sm font-bold tracking-widest uppercase text-black mb-1">Have a Question?</h3>
					<p class="text-sm text-gray-500 font-light">Our team is here to help with your return.</p>
				</div>
				<a href="/contact" class="bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors whitespace-nowrap">
					Contact Support
				</a>
			</div>
		</section>
	</div>
</div>
