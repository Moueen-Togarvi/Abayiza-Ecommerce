<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data, form } = $props();
	let products = $derived((data.products || []) as Array<any>);
	let sections = $derived((data.sections || []) as Array<any>);
	let saleTapeItems = $derived((form?.saleTapeItems ?? data.saleTapeItems ?? '') as string);
	let saleTapePreview = $derived(
		saleTapeItems
			.split(/\r?\n/)
			.map((item) => item.trim())
			.filter(Boolean)
	);
	let selections = $state<Record<string, string[]>>({});
	let searches = $state<Record<string, string>>({});
	let initialized = $state(false);

	let productMap = $derived(new Map(products.map((product) => [product.id, product])));

	$effect(() => {
		if (initialized || !sections.length) return;

		selections = Object.fromEntries(
			sections.map((section) => [section.key, section.products.map((product: any) => product.id)])
		);
		searches = Object.fromEntries(sections.map((section) => [section.key, '']));
		initialized = true;
	});

	function productImage(product: any) {
		return product.images?.[0]?.url || '/image.png';
	}

	function selectedIds(sectionKey: string) {
		return selections[sectionKey] ?? [];
	}

	function selectedProducts(sectionKey: string) {
		return selectedIds(sectionKey)
			.map((id) => productMap.get(id))
			.filter(Boolean);
	}

	function updateSelection(sectionKey: string, productIds: string[]) {
		selections = {
			...selections,
			[sectionKey]: productIds
		};
	}

	function addProduct(sectionKey: string, productId: string) {
		const ids = selectedIds(sectionKey);
		if (ids.includes(productId)) return;
		updateSelection(sectionKey, [...ids, productId]);
	}

	function removeProduct(sectionKey: string, productId: string) {
		updateSelection(
			sectionKey,
			selectedIds(sectionKey).filter((id) => id !== productId)
		);
	}

	function moveProduct(sectionKey: string, productId: string, offset: number) {
		const ids = [...selectedIds(sectionKey)];
		const index = ids.indexOf(productId);
		const nextIndex = index + offset;

		if (index < 0 || nextIndex < 0 || nextIndex >= ids.length) return;

		[ids[index], ids[nextIndex]] = [ids[nextIndex], ids[index]];
		updateSelection(sectionKey, ids);
	}

	function updateSearch(sectionKey: string, event: Event) {
		searches = {
			...searches,
			[sectionKey]: (event.currentTarget as HTMLInputElement).value
		};
	}

	function availableProducts(sectionKey: string) {
		const query = (searches[sectionKey] || '').trim().toLowerCase();
		const selected = new Set(selectedIds(sectionKey));

		return products
			.filter((product) => {
				if (selected.has(product.id)) return false;
				if (!query) return true;

				return [
					product.name,
					product.slug,
					product.description,
					...(product.collections || []).map((collection: any) => collection.name)
				]
					.filter(Boolean)
					.some((value) => String(value).toLowerCase().includes(query));
			})
			.slice(0, 8);
	}
</script>

<svelte:head>
	<title>Storefront Sections | Abayiza Admin</title>
</svelte:head>

<div class="mx-auto max-w-7xl pb-12">
	<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-xs font-bold tracking-[0.22em] text-blue-600 uppercase">Online Store</p>
			<h1 class="mt-1 text-2xl font-bold text-gray-950">Homepage Sections</h1>
			<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
				Choose which active abayas appear in each homepage section. Empty sections use automatic
				fallback products on the public site.
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="/"
				class="inline-flex min-h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
			>
				Preview Home
			</a>
			<a
				href="/shop"
				class="inline-flex min-h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
			>
				View Shop
			</a>
		</div>
	</div>

	{#if form?.error}
		<div class="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	<div class="space-y-6">
		<form
			method="POST"
			action="?/saveSaleTape"
			class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
		>
			<div
				class="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
			>
				<div>
					<p class="text-xs font-black tracking-[0.18em] text-blue-600 uppercase">
						Homepage ticker
					</p>
					<h2 class="mt-1 text-xl font-black text-gray-950">Sale Tape Text</h2>
					<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Edit the moving yellow strip under the hero. Add one text item per line.
					</p>
				</div>
				<button
					type="submit"
					class="inline-flex min-h-10 items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white shadow-sm hover:bg-gray-800"
				>
					Save Tape Text
				</button>
			</div>

			<div class="grid gap-5 p-5 lg:grid-cols-[1fr_24rem]">
				<div>
					<label
						for="saleTapeItems"
						class="mb-2 block text-sm font-black tracking-[0.12em] text-gray-900 uppercase"
					>
						Tape items
					</label>
					<textarea
						id="saleTapeItems"
						name="saleTapeItems"
						rows="5"
						class="w-full rounded-md border-gray-300 text-sm focus:border-black focus:ring-black"
						>{saleTapeItems}</textarea
					>
				</div>

				<div class="rounded-xl border border-gray-200 bg-[#f7f4ec] p-4">
					<p class="mb-3 text-xs font-black tracking-[0.14em] text-gray-700 uppercase">
						Current preview
					</p>
					<div class="flex flex-wrap gap-2">
						{#each saleTapePreview as item}
							<span
								class="rounded-full bg-[#e4b43d] px-3 py-1.5 text-xs font-black tracking-[0.12em] text-[#14352d] uppercase"
							>
								{item}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</form>

		{#each sections as section}
			<form
				method="POST"
				action="?/saveSection"
				class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
			>
				<input type="hidden" name="sectionKey" value={section.key} />
				<div
					class="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
				>
					<div>
						<p class="text-xs font-black tracking-[0.18em] text-blue-600 uppercase">
							{section.eyebrow}
						</p>
						<h2 class="mt-1 text-xl font-black text-gray-950">{section.title}</h2>
						<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
							Homepage shows first {section.homepageLimit}; View All opens
							<a href={section.viewAllHref} class="font-semibold text-blue-700 hover:underline">
								{section.viewAllHref}
							</a>
						</p>
					</div>
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-900">
							{selectedIds(section.key).length} selected
						</span>
						<button
							type="submit"
							class="inline-flex min-h-10 items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white shadow-sm hover:bg-gray-800"
						>
							Save Section
						</button>
					</div>
				</div>

				<div class="grid gap-0 lg:grid-cols-[1fr_22rem]">
					<section class="p-5">
						<div class="mb-4 flex items-center justify-between gap-3">
							<h3 class="text-sm font-black tracking-[0.14em] text-gray-900 uppercase">
								Selected order
							</h3>
							<button
								type="button"
								class="text-xs font-bold text-gray-500 hover:text-red-700"
								onclick={() => updateSelection(section.key, [])}
							>
								Clear all
							</button>
						</div>

						{#each selectedProducts(section.key) as product, index}
							<input type="hidden" name="productIds" value={product.id} />
							<article
								class="mb-3 grid gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:grid-cols-[4rem_1fr_auto] sm:items-center"
							>
								<div class="aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
									<img
										src={productImage(product)}
										alt={product.name}
										class="h-full w-full object-cover object-top"
									/>
								</div>
								<div class="min-w-0">
									<div class="flex flex-wrap items-center gap-2">
										<span
											class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-900 px-2 text-xs font-black text-white"
										>
											{index + 1}
										</span>
										<h4 class="truncate text-sm font-black text-gray-950">{product.name}</h4>
									</div>
									<p class="mt-1 truncate text-xs font-semibold text-gray-500">
										{product.collections?.map((collection: any) => collection.name).join(', ') ||
											'No category'}
									</p>
									<p class="mt-1 text-xs font-bold text-gray-900">
										{formatMoney(product.salePrice || product.price)}
									</p>
								</div>
								<div class="flex flex-wrap gap-2 sm:justify-end">
									<button
										type="button"
										disabled={index === 0}
										class="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
										onclick={() => moveProduct(section.key, product.id, -1)}
									>
										Up
									</button>
									<button
										type="button"
										disabled={index === selectedIds(section.key).length - 1}
										class="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
										onclick={() => moveProduct(section.key, product.id, 1)}
									>
										Down
									</button>
									<button
										type="button"
										class="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
										onclick={() => removeProduct(section.key, product.id)}
									>
										Remove
									</button>
								</div>
							</article>
						{/each}

						{#if selectedIds(section.key).length === 0}
							<div
								class="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center"
							>
								<p class="text-sm font-semibold text-gray-500">
									No manual selection. Public homepage will use automatic fallback products.
								</p>
							</div>
						{/if}
					</section>

					<aside class="border-t border-gray-200 bg-gray-50 p-5 lg:border-t-0 lg:border-l">
						<label
							for={`search-${section.key}`}
							class="mb-2 block text-sm font-black tracking-[0.12em] text-gray-900 uppercase"
						>
							Add active abayas
						</label>
						<input
							id={`search-${section.key}`}
							type="search"
							value={searches[section.key] || ''}
							placeholder="Search products"
							class="mb-4 w-full rounded-md border-gray-300 text-sm focus:border-black focus:ring-black"
							oninput={(event) => updateSearch(section.key, event)}
						/>

						<div class="max-h-[26rem] space-y-2 overflow-y-auto pr-1">
							{#each availableProducts(section.key) as product}
								<article
									class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2"
								>
									<div class="h-12 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
										<img
											src={productImage(product)}
											alt={product.name}
											class="h-full w-full object-cover object-top"
										/>
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-bold text-gray-950">{product.name}</p>
										<p class="truncate text-xs font-medium text-gray-500">
											{product.collections?.map((collection: any) => collection.name).join(', ') ||
												'No category'}
										</p>
									</div>
									<button
										type="button"
										class="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 hover:bg-blue-100"
										onclick={() => addProduct(section.key, product.id)}
									>
										Add
									</button>
								</article>
							{/each}

							{#if availableProducts(section.key).length === 0}
								<p
									class="rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm font-semibold text-gray-500"
								>
									No matching active products.
								</p>
							{/if}
						</div>
					</aside>
				</div>
			</form>
		{/each}
	</div>
</div>
