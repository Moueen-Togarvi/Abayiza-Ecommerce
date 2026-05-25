<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let products = $derived((data.products || []) as Array<any>);

	const statusClass = (status: string) =>
		({
			Active: 'bg-blue-100 text-blue-800',
			Draft: 'bg-yellow-100 text-yellow-800',
			'Out of Stock': 'bg-red-100 text-red-800'
		})[status] || 'bg-gray-100 text-gray-700';
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Products</h1>
		<div class="flex space-x-3">
			<button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm">
				Export
			</button>
			<a href="/abayiza-secure-admin-7k9x2p/products/new" class="bg-[#000] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm flex items-center">
				<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
				Add Product
			</a>
		</div>
	</div>

	<!-- Filters & Search -->
	<div class="bg-white p-4 rounded-t-lg border-x border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 shadow-sm">
		<div class="flex space-x-4">
			<button class="text-sm font-medium border-b-2 border-[#000] text-[#000] pb-1">All</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1">Active</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1">Draft</button>
			<button class="text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 pb-1">Archived</button>
		</div>
		<div class="flex items-center space-x-2 w-full sm:w-auto">
			<div class="relative flex-1 sm:w-64">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</div>
				<input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] sm:text-sm" placeholder="Filter products">
			</div>
			<button
				class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white"
				aria-label="Filter products"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
			</button>
		</div>
	</div>

	<!-- Product Table -->
	<div class="bg-white shadow-sm border border-gray-200 rounded-b-lg overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
						<input type="checkbox" class="rounded border-gray-300 text-[#000] focus:ring-[#000]">
					</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
					<th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each products as product}
				<tr class="hover:bg-gray-50 group cursor-pointer" onclick={() => window.location.href = `/abayiza-secure-admin-7k9x2p/products/${product.id}`}>
					<td class="px-6 py-4 whitespace-nowrap">
						<input type="checkbox" class="rounded border-gray-300 text-[#000] focus:ring-[#000]">
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<div class="flex items-center">
							<div class="h-10 w-8 flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200">
								<img class="h-full w-full object-cover" src={product.images && product.images.length > 0 ? product.images[0].url : ''} alt={product.name}>
							</div>
							<div class="ml-4">
								<div class="text-sm font-medium text-blue-600 group-hover:underline">{product.name}</div>
								<p class="max-w-xs truncate text-xs text-gray-500">{product.description}</p>
							</div>
						</div>
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass(product.status)}`}>
							{product.status}
						</span>
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
						{formatMoney(product.salePrice || product.price)}
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm {product.totalInventory === 0 ? 'text-red-500' : 'text-gray-500'}">
						{product.totalInventory} in stock for {product.variants.length} variants
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						{product.collections.map((collection: any) => collection.name).join(', ') || 'No category'}
					</td>
					<td class="px-6 py-4 whitespace-nowrap text-right text-sm">
						<div class="flex justify-end gap-2">
							<a
								href={`/abayiza-secure-admin-7k9x2p/products/${product.id}`}
								class="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 font-semibold text-blue-700 hover:bg-blue-100"
								onclick={(event) => event.stopPropagation()}
							>
								Edit
							</a>
							<form
								method="POST"
								action="?/delete"
								onsubmit={(event) => {
									event.stopPropagation();
									if (!confirm(`Delete ${product.name}?`)) event.preventDefault();
								}}
							>
								<input type="hidden" name="id" value={product.id} />
								<button
									type="submit"
									class="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 font-semibold text-red-700 hover:bg-red-100"
									onclick={(event) => event.stopPropagation()}
								>
									Delete
								</button>
							</form>
						</div>
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
						Showing <span class="font-medium">1</span> to <span class="font-medium">{products.length}</span> of <span class="font-medium">{products.length}</span> results
					</p>
				</div>
				<div>
					<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
					<button type="button" aria-label="Previous" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
					</button>
					<button type="button" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900">1</button>
					<button type="button" aria-label="Next" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
					</button>
				</nav>
				</div>
			</div>
		</div>
	</div>
</div>
