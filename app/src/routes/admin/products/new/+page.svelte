<script lang="ts">
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
	let collections = $derived((data.collections || []) as Array<any>);
	let nextVariantId = 2;
	let variants = $state<VariantRow[]>([
		{ id: 1, type: 'size', size: 'S (52)', color: 'Black', stockCount: 0, sku: '' }
	]);

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
	<title>Add Product | Abayiza Admin</title>
</svelte:head>

<div class="mx-auto max-w-5xl pb-12">
	<div class="mb-6 flex items-center space-x-4">
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
		<h1 class="text-2xl font-bold text-[#000]">Add Product</h1>
	</div>

	{#if form?.error}
		<div class="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	<form method="POST" action="?/create">
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
								required
								placeholder="e.g. Signature Nida Abaya"
								class="block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
							/>
						</div>
						<div>
							<label for="slug" class="mb-1 block text-sm font-medium text-gray-700">Slug</label>
							<input
								id="slug"
								name="slug"
								type="text"
								placeholder="auto-generated if empty"
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
								placeholder="Describe fabric, silhouette, and care details..."
							></textarea>
						</div>
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Media</h3>
					<label for="imageUrl" class="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="url"
						placeholder="https://..."
						class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
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
									required
									class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-7 text-sm focus:border-[#000] focus:ring-[#000]"
									placeholder="0.00"
								/>
							</div>
						</div>
						<div>
							<label for="salePrice" class="mb-1 block text-sm font-medium text-gray-700"
								>Sale Price</label
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
									class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-7 text-sm focus:border-[#000] focus:ring-[#000]"
									placeholder="0.00"
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
						name="isActive"
						class="mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#000] focus:ring-[#000]"
					>
						<option value="true">Active</option>
						<option value="false">Draft</option>
					</select>
					<p class="text-xs text-gray-500">Draft products stay hidden from the storefront.</p>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-base font-medium text-[#000]">Categories</h3>
					<div class="space-y-2">
						{#each collections as collection}
							<label
								class="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm transition-colors hover:bg-yellow-50"
							>
								<span class="font-medium text-gray-700">{collection.name}</span>
								<input
									type="checkbox"
									name="collectionIds"
									value={collection.id}
									class="h-4 w-4 rounded border-gray-300 text-[#000] focus:ring-[#000]"
								/>
							</label>
						{/each}
						{#if collections.length === 0}
							<p class="text-sm text-gray-500">Add categories first from Admin Categories.</p>
						{/if}
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<button
						type="submit"
						class="w-full rounded-md bg-[#000] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
					>
						Save Product
					</button>
					<a
						href="/admin/products"
						class="mt-3 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Discard
					</a>
				</div>
			</div>
		</div>
	</form>
</div>
