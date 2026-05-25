<script lang="ts">
	import ImageFileQueue from '$lib/components/admin/ImageFileQueue.svelte';

	type VariantKind = 'size' | 'color';
	type VariantRow = {
		id: number;
		type: VariantKind;
		size: string;
		color: string;
		stockCount: number;
		sku: string;
	};

	let { data, form } = $props();
	// svelte-ignore state_referenced_locally
	const product = data.product as any;
	// svelte-ignore state_referenced_locally
	const allCollections = (data.allCollections || []) as Array<any>;
	let showDeleteConfirm = $state(false);
	let nextVariantId = product.variants.length + 1;
	let variants = $state<VariantRow[]>(
		(product.variants.length
			? product.variants.map((variant: any, index: number) => ({
					id: index + 1,
					type:
						variant.size === 'One Size' && variant.color && variant.color !== 'Default'
							? ('color' as VariantKind)
							: ('size' as VariantKind),
					size: variant.size || 'S (52)',
					color: variant.color === 'Default' ? 'Black' : variant.color || 'Black',
					stockCount: variant.stockCount || 0,
					sku: variant.sku || ''
				}))
			: [{ id: 1, type: 'size', size: 'S (52)', color: 'Black', stockCount: 0, sku: '' }]) as VariantRow[]
	);

	const sizes = ['XS (50)', 'S (52)', 'M (54)', 'L (56)', 'XL (58)', 'XXL (60)', 'S-XL', 'XS-L'];
	const colors = [
		{ name: 'Black', hex: '#000000' },
		{ name: 'White', hex: '#ffffff' },
		{ name: 'Blue', hex: '#2563eb' },
		{ name: 'Red', hex: '#dc2626' },
		{ name: 'Yellow', hex: '#facc15' },
		{ name: 'Orange', hex: '#f97316' },
		{ name: 'Navy', hex: '#172554' },
		{ name: 'Ivory', hex: '#fff7ed' },
		{ name: 'Dusty Rose', hex: '#c08497' }
	];

	const selectedCollectionIds = product.collections.map((collection: any) => collection.id);
	const totalInventory = product.variants.reduce((total: number, variant: any) => total + Number(variant.stockCount || 0), 0);
	const productStatus = !product.isActive ? 'DRAFT' : totalInventory <= 0 ? 'OUT_OF_STOCK' : 'ACTIVE';
	const productStatusLabel =
		productStatus === 'OUT_OF_STOCK' ? 'Out of Stock' : productStatus === 'DRAFT' ? 'Draft' : 'Active';
	const productStatusClass =
		productStatus === 'OUT_OF_STOCK'
			? 'bg-red-100 text-red-800'
			: productStatus === 'DRAFT'
				? 'bg-yellow-100 text-yellow-800'
				: 'bg-blue-100 text-blue-800';

	const addVariant = (type: VariantKind = 'size') => {
		variants = [
			...variants,
			{
				id: nextVariantId++,
				type,
				size: 'S (52)',
				color: 'Black',
				stockCount: 0,
				sku: ''
			}
		];
	};

	const removeVariant = (id: number) => {
		if (variants.length === 1) return;
		variants = variants.filter((variant) => variant.id !== id);
	};
</script>

<svelte:head>
	<title>Edit: {product.name} | Admin</title>
</svelte:head>

<div class="mx-auto max-w-5xl pb-12">
	<div class="mb-6 flex items-center justify-between gap-4">
		<div class="flex items-center space-x-4">
			<a
				href="/admin/products"
				class="rounded-md border border-gray-300 bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50"
				aria-label="Back to products"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</a>
			<div>
				<h1 class="text-2xl font-bold text-[#000]">{product.name}</h1>
				<span
					class={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${productStatusClass}`}
				>
					{productStatusLabel}
				</span>
			</div>
		</div>

		<button
			type="button"
			onclick={() => (showDeleteConfirm = true)}
			class="inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
		>
			<svg class="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
			Delete Product
		</button>
	</div>

	{#if form?.error}
		<div class="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	<form method="POST" action="?/update" enctype="multipart/form-data">
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div class="space-y-6 lg:col-span-2">
				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div class="space-y-5">
						<div>
							<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Title</label>
							<input
								id="name"
								name="name"
								type="text"
								value={product.name}
								required
								class="block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
							/>
						</div>
						<div>
							<label for="slug" class="mb-1 block text-sm font-medium text-gray-700">Slug</label>
							<input
								id="slug"
								name="slug"
								type="text"
								value={product.slug}
								class="block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
							/>
						</div>
						<div>
							<label for="description" class="mb-1 block text-sm font-medium text-gray-700"
								>Description</label
							>
							<textarea
								id="description"
								name="description"
								rows="5"
								class="block w-full rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
							>{product.description}</textarea>
						</div>
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Media</h3>
					{#if product.images?.length}
						<div class="mb-4 grid gap-3 sm:grid-cols-2">
							{#each product.images as image}
								<label class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
									<div class="aspect-[4/3] bg-gray-100">
										<img
											src={image.url}
											alt={image.altText || product.name}
											class="h-full w-full object-cover"
										/>
									</div>
									<div class="flex items-center justify-between gap-3 border-t border-gray-200 px-3 py-2">
										<span class="truncate text-xs font-medium text-gray-600">Current image</span>
										<span class="inline-flex items-center gap-2 text-xs font-semibold text-red-600">
											<input
												type="checkbox"
												name="removeImageIds"
												value={image.id}
												class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
											/>
											Remove
										</span>
									</div>
								</label>
							{/each}
						</div>
					{:else}
						<p class="mb-4 rounded-md border border-dashed border-gray-300 px-3 py-4 text-sm text-gray-500">
							No images uploaded yet.
						</p>
					{/if}
					<ImageFileQueue
						inputId="edit-product-image-picker"
						label="Add More Images"
						emptyText="Select new images one by one. Checked current images will be removed after saving."
					/>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Pricing</h3>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label for="price" class="mb-1 block text-sm font-medium text-gray-700">Price</label>
							<div class="relative rounded-md shadow-sm">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<span class="text-sm text-gray-500">Rs.</span>
								</div>
								<input
									id="price"
									name="price"
									type="number"
									step="0.01"
									value={product.price}
									required
									class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-7 text-sm focus:border-[#000] focus:ring-[#000]"
								/>
							</div>
						</div>
						<div>
							<label for="salePrice" class="mb-1 block text-sm font-medium text-gray-700"
								>Discount Price</label
							>
							<div class="relative rounded-md shadow-sm">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<span class="text-sm text-gray-500">Rs.</span>
								</div>
								<input
									id="salePrice"
									name="salePrice"
									type="number"
									step="0.01"
									value={product.salePrice ?? ''}
									class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-7 text-sm focus:border-[#000] focus:ring-[#000]"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
						<h3 class="text-base font-medium text-[#000]">Variants</h3>
						<div class="flex flex-wrap gap-2">
							<button
								type="button"
								class="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
								onclick={() => addVariant('size')}
							>
								Add Size Variant
							</button>
							<button
								type="button"
								class="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100"
								onclick={() => addVariant('color')}
							>
								Add Colour Variant
							</button>
						</div>
					</div>

					<div class="space-y-4">
						{#each variants as variant, index (variant.id)}
							<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
								<div class="grid gap-3 md:grid-cols-[9rem_1fr_7rem_1fr_auto] md:items-end">
									<div>
										<label for={`variant-type-${variant.id}`} class="mb-1 block text-xs font-medium text-gray-600"
											>Variant Type</label
										>
										<select
											id={`variant-type-${variant.id}`}
											name="variantType"
											bind:value={variant.type}
											class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#000] focus:ring-[#000]"
										>
											<option value="size">Size</option>
											<option value="color">Colour</option>
										</select>
									</div>

									{#if variant.type === 'size'}
										<div>
											<label for={`variant-size-${variant.id}`} class="mb-1 block text-xs font-medium text-gray-600"
												>Size</label
											>
											<select
												id={`variant-size-${variant.id}`}
												name="variantSize"
												bind:value={variant.size}
												class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#000] focus:ring-[#000]"
											>
												{#each sizes as size}
													<option value={size}>{size}</option>
												{/each}
											</select>
											<input type="hidden" name="variantColor" value="Default" />
										</div>
									{:else}
										<div>
											<label for={`variant-color-${variant.id}`} class="mb-1 block text-xs font-medium text-gray-600"
												>Colour</label
											>
											<select
												id={`variant-color-${variant.id}`}
												name="variantColor"
												bind:value={variant.color}
												class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#000] focus:ring-[#000]"
											>
												{#each colors as color}
													<option value={color.name}>{color.name}</option>
												{/each}
											</select>
											<input type="hidden" name="variantSize" value="One Size" />
										</div>
									{/if}

									<div>
										<label for={`variant-stock-${variant.id}`} class="mb-1 block text-xs font-medium text-gray-600"
											>Stock</label
										>
										<input
											id={`variant-stock-${variant.id}`}
											name="variantStock"
											type="number"
											min="0"
											bind:value={variant.stockCount}
											class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#000] focus:ring-[#000]"
										/>
									</div>
									<div>
										<label for={`variant-sku-${variant.id}`} class="mb-1 block text-xs font-medium text-gray-600"
											>SKU</label
										>
										<input
											id={`variant-sku-${variant.id}`}
											name="variantSku"
											type="text"
											bind:value={variant.sku}
											placeholder={`Auto SKU ${index + 1}`}
											class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#000] focus:ring-[#000]"
										/>
									</div>
									<button
										type="button"
										class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
										disabled={variants.length === 1}
										onclick={() => removeVariant(variant.id)}
									>
										Remove
									</button>
								</div>

								{#if variant.type === 'color'}
									<div class="mt-3 flex flex-wrap gap-2">
										{#each colors as color}
											<button
												type="button"
												class="h-6 w-6 rounded-full border border-gray-300 ring-offset-2 transition {variant.color === color.name
													? 'ring-2 ring-[#000]'
													: ''}"
												style={`background-color: ${color.hex}`}
												aria-label={`Select ${color.name}`}
												onclick={() => (variant.color = color.name)}
											></button>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Product Status</h3>
					<select
						name="productStatus"
						class="mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
					>
						<option value="ACTIVE" selected={productStatus === 'ACTIVE'}>Active</option>
						<option value="OUT_OF_STOCK" selected={productStatus === 'OUT_OF_STOCK'}>Out of Stock</option>
						<option value="DRAFT" selected={productStatus === 'DRAFT'}>Draft</option>
					</select>
					<p class="text-xs leading-5 text-gray-500">
						Out of Stock stays visible on the storefront but disables cart and checkout.
					</p>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Categories</h3>
					<div class="space-y-2">
						{#each allCollections as collection}
							<label
								class="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm transition-colors hover:bg-yellow-50"
							>
								<span class="font-medium text-gray-700">{collection.name}</span>
								<input
									type="checkbox"
									name="collectionIds"
									value={collection.id}
									checked={selectedCollectionIds.includes(collection.id)}
									class="h-4 w-4 rounded border-gray-300 text-[#000] focus:ring-[#000]"
								/>
							</label>
						{/each}
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<button
						type="submit"
						class="w-full rounded-md bg-[#000] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
					>
						Save Changes
					</button>
					<a
						href="/admin/products"
						class="mt-3 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</a>
				</div>
			</div>
		</div>
	</form>
</div>

{#if showDeleteConfirm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/50 p-4">
		<div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
			<div class="mb-4 flex items-center space-x-3">
				<div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
					<svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-[#000]">Delete Product</h3>
			</div>
			<p class="mb-6 text-sm text-gray-600">
				Delete <strong>{product.name}</strong>? This removes the product, images, and variants.
			</p>
			<div class="flex space-x-3">
				<button
					type="button"
					onclick={() => (showDeleteConfirm = false)}
					class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					Cancel
				</button>
				<form method="POST" action="?/delete" class="flex-1">
					<button
						type="submit"
						class="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
					>
						Yes, Delete
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
