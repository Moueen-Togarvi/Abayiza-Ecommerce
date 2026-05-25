<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let customers = $derived(data.customers || []);
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Customers</h1>
		<div class="flex space-x-3">
			<button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm">
				Export
			</button>
			<button class="bg-[#000] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm">
				Add customer
			</button>
		</div>
	</div>

	<!-- Filters & Search -->
	<div class="bg-white p-4 rounded-t-lg border-x border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 shadow-sm">
		<div class="flex items-center space-x-2 w-full">
			<div class="relative flex-1">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</div>
				<input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] sm:text-sm" placeholder="Filter customers">
			</div>
			<button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium text-sm hover:bg-gray-50 bg-white">
				Filter
			</button>
		</div>
	</div>

	<!-- Customers Table -->
	<div class="bg-white shadow-sm border border-gray-200 rounded-b-lg overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
						<input type="checkbox" class="rounded border-gray-300 text-[#000] focus:ring-[#000]">
					</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer name</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
					<th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount spent</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each customers as customer}
				<tr class="hover:bg-gray-50 group cursor-pointer" onclick={() => window.location.href = `/admin/customers/${customer.id}`}>
					<td class="px-6 py-4 whitespace-nowrap">
						<input type="checkbox" class="rounded border-gray-300 text-[#000] focus:ring-[#000]">
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<div class="text-sm font-medium text-blue-600 hover:underline">{customer.firstName} {customer.lastName}</div>
						<div class="text-xs text-gray-500">{customer.email}</div>
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						-
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{customer.orderCount} orders
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
						{formatMoney(customer.totalSpent)}
					</td>
				</tr>
				{/each}
				{#if customers.length === 0}
				<tr>
					<td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
						No customers found
					</td>
				</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
