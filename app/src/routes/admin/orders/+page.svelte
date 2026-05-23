<script lang="ts">
	// Placeholder
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Orders</h1>
		<div class="flex space-x-3">
			<button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm">
				Export
			</button>
			<button class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm">
				Create order
			</button>
		</div>
	</div>

	<!-- Filters & Search -->
	<div class="bg-white p-4 rounded-t-lg border-x border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 shadow-sm">
		<div class="flex space-x-4 overflow-x-auto w-full sm:w-auto">
			<button class="text-sm font-medium border-b-2 border-black text-black pb-1 whitespace-nowrap">All</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1 whitespace-nowrap">Unfulfilled</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1 whitespace-nowrap">Unpaid</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1 whitespace-nowrap">Open</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1 whitespace-nowrap">Closed</button>
		</div>
		<div class="flex items-center space-x-2 w-full sm:w-auto">
			<div class="relative flex-1 sm:w-64">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</div>
				<input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm" placeholder="Filter orders">
			</div>
			<button class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
			</button>
		</div>
	</div>

	<!-- Orders Table -->
	<div class="bg-white shadow-sm border border-gray-200 rounded-b-lg overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
						<input type="checkbox" class="rounded border-gray-300 text-black focus:ring-black">
					</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment Status</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each [1, 2, 3, 4, 5, 6, 7, 8] as i}
				<tr class="hover:bg-gray-50 group cursor-pointer">
					<td class="px-6 py-4 whitespace-nowrap">
						<input type="checkbox" class="rounded border-gray-300 text-black focus:ring-black">
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
						#102{i}
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						Today at 10:{i}4 AM
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<div class="text-sm font-medium text-blue-600 hover:underline">Fatima Zahra</div>
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						${145 + (i * 25)}.00
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {i === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}">
							<span class="w-1.5 h-1.5 rounded-full mr-1.5 {i === 2 ? 'bg-yellow-500' : 'bg-gray-500'}"></span>
							{i === 2 ? 'Pending (COD)' : 'Paid'}
						</span>
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {i < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}">
							<span class="w-1.5 h-1.5 rounded-full mr-1.5 {i < 3 ? 'bg-yellow-500' : 'bg-gray-500'}"></span>
							{i < 3 ? 'Unfulfilled' : 'Fulfilled'}
						</span>
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{1 + (i % 3)} item{i % 3 !== 0 ? 's' : ''}
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		
		<!-- Pagination -->
		<div class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
			<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700">
						Showing <span class="font-medium">1</span> to <span class="font-medium">8</span> of <span class="font-medium">97</span> results
					</p>
				</div>
				<div>
					<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
						<a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
							<span class="sr-only">Previous</span>
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
						</a>
						<a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900">1</a>
						<a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">2</a>
						<a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">3</a>
						<a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
							<span class="sr-only">Next</span>
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
						</a>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
