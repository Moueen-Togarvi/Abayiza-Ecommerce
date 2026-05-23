<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
	let product = $derived(data.product);

	let showDeleteConfirm = $state(false);
	let saving = $state(false);
	let deleting = $state(false);
	let successMessage = $state('');
</script>

<svelte:head>
	<title>Edit: {product.name} | Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto pb-12">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<div class="flex items-center space-x-4">
			<a href="/admin/products" class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white shadow-sm" aria-label="Back to products">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
			</a>
			<h1 class="text-2xl font-bold text-gray-900">{product.name}</h1>
			<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {product.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
				{product.isActive ? 'Active' : 'Draft'}
			</span>
		</div>
		<!-- Delete Button -->
		<button
			onclick={() => showDeleteConfirm = true}
			class="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
		>
			<svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
			Delete Product
		</button>
	</div>

	{#if successMessage}
	<div class="mb-4 bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800">{successMessage}</div>
	{/if}

	<!-- Edit Form -->
	<form method="POST" action="?/update" use:enhance={() => {
		saving = true;
		return async ({ update }) => {
			await update();
			saving = false;
		};
	}}>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

			<!-- Left Column -->
			<div class="lg:col-span-2 space-y-6">

				<!-- Title and Description -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<div class="space-y-5">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
							<input id="name" name="name" type="text" value={product.name} required
								class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2.5 border">
						</div>
						<div>
							<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
							<textarea id="description" name="description" rows="6"
								class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-3"
								>{product.description}</textarea>
						</div>
					</div>
				</div>

				<!-- Media preview -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-4">Media</h3>
					{#if product.images && product.images.length > 0}
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
						{#each product.images as img}
						<div class="relative aspect-[3/4] rounded-md overflow-hidden border border-gray-200 bg-gray-50">
							<img src={img.url} alt={img.altText || product.name} class="w-full h-full object-cover">
						</div>
						{/each}
					</div>
					{:else}
					<div class="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500 text-sm">
						No images uploaded
					</div>
					{/if}
				</div>

				<!-- Pricing -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-4">Pricing</h3>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
							<div class="relative rounded-md shadow-sm">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span class="text-gray-500 sm:text-sm">$</span>
								</div>
								<input id="price" name="price" type="number" step="0.01" value={product.price} required
									class="block w-full pl-7 pr-3 py-2 border-gray-300 border rounded-md focus:ring-black focus:border-black sm:text-sm">
							</div>
						</div>
						<div>
							<label for="salePrice" class="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
							<div class="relative rounded-md shadow-sm">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span class="text-gray-500 sm:text-sm">$</span>
								</div>
								<input id="salePrice" name="salePrice" type="number" step="0.01" value={product.salePrice ?? ''}
									class="block w-full pl-7 pr-3 py-2 border-gray-300 border rounded-md focus:ring-black focus:border-black sm:text-sm"
									placeholder="0.00">
							</div>
						</div>
					</div>
				</div>

				<!-- Variants (read-only display) -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-4">Variants ({product.variants.length})</h3>
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 text-sm">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">SKU</th>
									<th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Color</th>
									<th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Size</th>
									<th class="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider text-xs">Stock</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each product.variants as v}
								<tr class="hover:bg-gray-50">
									<td class="px-4 py-2 text-gray-600 font-mono text-xs">{v.sku}</td>
									<td class="px-4 py-2 text-gray-700">{v.color}</td>
									<td class="px-4 py-2 text-gray-700">{v.size}</td>
									<td class="px-4 py-2 text-right {v.stockCount < 5 ? 'text-red-600 font-semibold' : 'text-gray-700'}">{v.stockCount}</td>
								</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

			</div>

			<!-- Right Column -->
			<div class="space-y-6">
				<!-- Status -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-4">Product status</h3>
					<select name="isActive" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm py-2 px-3 mb-2">
						<option value="true" selected={product.isActive}>Active</option>
						<option value="false" selected={!product.isActive}>Draft</option>
					</select>
				</div>

				<!-- Collections -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-4">Collections</h3>
					<div class="flex flex-wrap gap-2">
						{#each product.collections as col}
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							{col.name}
						</span>
						{/each}
						{#if product.collections.length === 0}
						<p class="text-sm text-gray-400">No collections assigned</p>
						{/if}
					</div>
				</div>

				<!-- Slug info -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
					<h3 class="text-base font-medium text-gray-900 mb-2">URL Handle</h3>
					<p class="text-sm text-gray-500 font-mono break-all">/shop/{product.slug}</p>
				</div>

				<!-- Save Action -->
				<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex flex-col gap-3">
					<button type="submit" disabled={saving}
						class="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-60 transition-colors">
						{saving ? 'Saving...' : 'Save Changes'}
					</button>
					<a href="/admin/products" class="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1">
						Cancel
					</a>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
	<div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
		<div class="flex items-center space-x-3 mb-4">
			<div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
				<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			</div>
			<h3 class="text-lg font-semibold text-gray-900">Delete Product</h3>
		</div>
		<p class="text-sm text-gray-600 mb-6">
			Are you sure you want to delete <strong>{product.name}</strong>? This will permanently remove the product, all its variants, and images. This action cannot be undone.
		</p>
		<div class="flex space-x-3">
			<button onclick={() => showDeleteConfirm = false}
				class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
				Cancel
			</button>
			<form method="POST" action="?/delete" use:enhance={() => {
				deleting = true;
				return async ({ update }) => { await update(); deleting = false; };
			}} class="flex-1">
				<button type="submit" disabled={deleting}
					class="w-full px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition-colors">
					{deleting ? 'Deleting...' : 'Yes, Delete'}
				</button>
			</form>
		</div>
	</div>
</div>
{/if}
