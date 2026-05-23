<script lang="ts">
	let activeTab = 'orders';
</script>

<div class="max-w-5xl mx-auto pb-12">
	<!-- Header -->
	<div class="flex items-center space-x-4 mb-6">
		<a href="/admin/customers" class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
		</a>
		<h1 class="text-2xl font-bold text-gray-900">Fatima Zahra</h1>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Left Column -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Stats Row -->
			<div class="grid grid-cols-3 gap-4">
				{#each [
					{ label: 'Total Spent', value: '$435.00' },
					{ label: 'Total Orders', value: '3' },
					{ label: 'Avg. Order Value', value: '$145.00' },
				] as stat}
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-4 text-center">
					<p class="text-xl font-bold text-gray-900">{stat.value}</p>
					<p class="text-xs text-gray-500 mt-1">{stat.label}</p>
				</div>
				{/each}
			</div>

			<!-- Tabs: Orders / Addresses / Notes -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="border-b border-gray-200 px-6 pt-1 flex space-x-4">
					{#each ['orders', 'addresses', 'notes'] as tab}
					<button
						onclick={() => activeTab = tab}
						class="pb-3 pt-2 text-sm font-medium capitalize border-b-2 transition-colors {activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}"
					>
						{tab}
					</button>
					{/each}
				</div>

				{#if activeTab === 'orders'}
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each [
								{ id: '#10284', date: 'May 21, 2026', status: 'Processing', total: '$148.25' },
								{ id: '#10201', date: 'Mar 14, 2026', status: 'Delivered', total: '$165.00' },
								{ id: '#10140', date: 'Jan 5, 2026', status: 'Delivered', total: '$121.75' },
							] as order}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 text-sm text-blue-600 font-medium">
									<a href="/admin/orders/10284">{order.id}</a>
								</td>
								<td class="px-6 py-4 text-sm text-gray-500">{order.date}</td>
								<td class="px-6 py-4">
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">{order.status}</span>
								</td>
								<td class="px-6 py-4 text-sm font-medium text-gray-900 text-right">{order.total}</td>
							</tr>
							{/each}
						</tbody>
					</table>
				</div>

				{:else if activeTab === 'addresses'}
				<div class="p-6">
					<div class="border border-gray-200 p-4 rounded-md">
						<p class="text-xs text-gray-500 font-medium uppercase tracking-widest mb-2">Default Address</p>
						<p class="text-sm text-gray-700 leading-relaxed">Fatima Zahra<br>123 Luxury Ave, Apt 4B<br>New York, NY 10001<br>United States</p>
					</div>
				</div>

				{:else}
				<div class="p-6">
					<textarea rows="4" class="w-full border-gray-300 rounded-md text-sm focus:ring-black focus:border-black" placeholder="Add a note about this customer..."></textarea>
					<button class="mt-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 shadow-sm">Save Note</button>
				</div>
				{/if}
			</div>
		</div>

		<!-- Right Column -->
		<div class="space-y-6">
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Customer Details</h3>
				</div>
				<div class="p-6 space-y-4">
					<div class="flex items-center gap-3">
						<div class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-serif font-bold text-lg">F</div>
						<div>
							<p class="font-medium text-gray-900">Fatima Zahra</p>
							<p class="text-xs text-gray-400">Customer since Jan 2026</p>
						</div>
					</div>
					<div class="space-y-2 text-sm">
						<div class="flex items-center gap-2 text-gray-600">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
							<a href="mailto:fatima.z@example.com" class="hover:text-black">fatima.z@example.com</a>
						</div>
						<div class="flex items-center gap-2 text-gray-600">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
							+1 (555) 123-4567
						</div>
					</div>
					<div class="pt-4 border-t border-gray-100">
						<label class="flex items-center space-x-2">
							<input type="checkbox" checked class="form-checkbox text-black border-gray-300 focus:ring-black h-4 w-4">
							<span class="text-sm text-gray-700">Marketing emails subscribed</span>
						</label>
					</div>
					<button class="w-full mt-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 shadow-sm">
						Edit Customer
					</button>
				</div>
			</div>

			<!-- Tags -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-6 py-5 border-b border-gray-200">
					<h3 class="font-medium text-gray-900">Tags</h3>
				</div>
				<div class="p-6">
					<div class="flex flex-wrap gap-2 mb-3">
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
							VIP <button class="ml-2 text-gray-400 hover:text-gray-700">&times;</button>
						</span>
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
							Repeat Buyer <button class="ml-2 text-gray-400 hover:text-gray-700">&times;</button>
						</span>
					</div>
					<input type="text" placeholder="Add tag..." class="w-full border-gray-300 text-sm rounded-md shadow-sm focus:ring-black focus:border-black px-3 py-2">
				</div>
			</div>
		</div>
	</div>
</div>
