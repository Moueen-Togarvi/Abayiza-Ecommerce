<script lang="ts">
	// Placeholder - Admin Discounts page
	let activeTab = 'codes';
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Discounts</h1>
		<button class="bg-[#000] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm flex items-center">
			<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
			Create Discount
		</button>
	</div>

	<!-- Tabs -->
	<div class="border-b border-gray-200 mb-6 flex space-x-6">
		<button onclick={() => activeTab = 'codes'} class="pb-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'codes' ? 'border-[#000] text-[#000]' : 'border-transparent text-gray-500 hover:text-gray-700'}">Discount Codes</button>
		<button onclick={() => activeTab = 'automatic'} class="pb-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'automatic' ? 'border-[#000] text-[#000]' : 'border-transparent text-gray-500 hover:text-gray-700'}">Automatic Discounts</button>
	</div>

	<!-- Search -->
	<div class="bg-white p-4 rounded-t-lg border-x border-t border-gray-200 shadow-sm">
		<div class="relative w-full sm:w-80">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
			</div>
			<input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-sm focus:ring-1 focus:ring-[#000] focus:border-[#000]" placeholder="Search discounts">
		</div>
	</div>

	<!-- Table -->
	<div class="bg-white shadow-sm border border-gray-200 rounded-b-lg overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"><input type="checkbox" class="rounded border-gray-300 text-[#000]"></th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code / Title</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each [
					{ code: 'WELCOME15', status: 'Active', type: 'Percentage', value: '15%', used: 34, expires: 'Dec 31, 2026' },
					{ code: 'SUMMER25', status: 'Active', type: 'Percentage', value: '25%', used: 122, expires: 'Aug 31, 2026' },
					{ code: 'FREESHIP', status: 'Active', type: 'Free Shipping', value: 'Free Shipping', used: 56, expires: 'No expiry' },
					{ code: 'VIP50', status: 'Expired', type: 'Fixed Amount', value: '$50', used: 88, expires: 'Jan 1, 2026' },
					{ code: 'LAUNCH10', status: 'Scheduled', type: 'Percentage', value: '10%', used: 0, expires: 'Jun 1, 2026' },
				] as discount}
				<tr class="hover:bg-gray-50 cursor-pointer">
					<td class="px-6 py-4"><input type="checkbox" class="rounded border-gray-300 text-[#000]"></td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span class="text-sm font-mono font-medium text-blue-600">{discount.code}</span>
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {discount.status === 'Active' ? 'bg-blue-100 text-blue-800' : discount.status === 'Expired' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}">
							{discount.status}
						</span>
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.type}</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{discount.value}</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.used} uses</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.expires}</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
