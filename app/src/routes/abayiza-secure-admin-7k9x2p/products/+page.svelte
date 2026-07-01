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

<div class="mx-auto max-w-7xl">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Products</h1>
		<div class="flex space-x-3">
			<button
				class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
			>
				Export
			</button>
			<a
				href="/abayiza-secure-admin-7k9x2p/products/new"
				class="flex items-center rounded-md bg-[#000] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
			>
				<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/></svg
				>
				Add Product
			</a>
		</div>
	</div>

	<!-- Filters & Search -->
	<div
		class="flex flex-col items-start justify-between space-y-4 rounded-t-lg border-x border-t border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:space-y-0"
	>
		<div class="flex space-x-4">
			<button class="border-b-2 border-[#000] pb-1 text-sm font-medium text-[#000]">All</button>
			<button
				class="border-b-2 border-transparent pb-1 text-sm font-medium text-gray-500 hover:text-gray-700"
				>Active</button
			>
			<button
				class="border-b-2 border-transparent pb-1 text-sm font-medium text-gray-500 hover:text-gray-700"
				>Draft</button
			>
			<button
				class="border-b-2 border-transparent pb-1 text-sm font-medium text-gray-500 hover:text-gray-700"
				>Archived</button
			>
		</div>
		<div class="flex w-full items-center space-x-2 sm:w-auto">
			<div class="relative flex-1 sm:w-64">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</div>
				<input
					type="text"
					class="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-[#000] focus:ring-1 focus:ring-[#000] focus:outline-none sm:text-sm"
					placeholder="Filter products"
				/>
			</div>
			<button
				class="rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50"
				aria-label="Filter products"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
					/></svg
				>
			</button>
		</div>
	</div>

	<!-- Product Table -->
	<div class="overflow-x-auto rounded-b-lg border border-gray-200 bg-white shadow-sm">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="w-8 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
					>
						<input type="checkbox" class="rounded border-gray-300 text-[#000] focus:ring-[#000]" />
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Product</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Status</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Price</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Inventory</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Categories</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Actions</th
					>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each products as product}
					<tr
						class="group cursor-pointer hover:bg-gray-50"
						onclick={() =>
							(window.location.href = `/abayiza-secure-admin-7k9x2p/products/${product.id}`)}
					>
						<td class="px-6 py-4 whitespace-nowrap">
							<input
								type="checkbox"
								class="rounded border-gray-300 text-[#000] focus:ring-[#000]"
							/>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="flex items-center">
								<div
									class="h-10 w-8 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100"
								>
									<img
										class="h-full w-full object-cover"
										src={product.images && product.images.length > 0 ? product.images[0].url : ''}
										alt={product.name}
									/>
								</div>
								<div class="ml-4">
									<div class="text-sm font-medium text-blue-600 group-hover:underline">
										{product.name}
									</div>
									<p class="max-w-xs truncate text-xs text-gray-500">{product.description}</p>
								</div>
							</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(product.status)}`}
							>
								{product.status}
							</span>
						</td>
						<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-700">
							{formatMoney(product.salePrice || product.price)}
						</td>
						<td
							class="px-6 py-4 text-sm whitespace-nowrap {product.totalInventory === 0
								? 'text-red-500'
								: 'text-gray-500'}"
						>
							{product.totalInventory} in stock for {product.variants.length} variants
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
							{product.collections.map((collection: any) => collection.name).join(', ') ||
								'No category'}
						</td>
						<td class="px-6 py-4 text-right text-sm whitespace-nowrap">
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
		<div
			class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
		>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700">
						Showing <span class="font-medium">1</span> to
						<span class="font-medium">{products.length}</span>
						of <span class="font-medium">{products.length}</span> results
					</p>
				</div>
				<div>
					<nav
						class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<button
							type="button"
							aria-label="Previous"
							class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
						<button
							type="button"
							class="relative inline-flex items-center border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900"
							>1</button
						>
						<button
							type="button"
							aria-label="Next"
							class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
