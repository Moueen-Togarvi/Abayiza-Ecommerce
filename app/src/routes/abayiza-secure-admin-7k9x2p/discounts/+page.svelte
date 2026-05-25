<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let activeTab = $state('codes');
	let coupons = $derived((data.coupons || []) as Array<any>);

	function couponValue(coupon: any) {
		return coupon.discountType === 'PERCENTAGE'
			? `${coupon.discountValue}%`
			: formatMoney(coupon.discountValue);
	}
</script>

<div class="mx-auto max-w-7xl">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Discounts</h1>
		<button
			class="flex items-center rounded-md bg-[#000] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
			type="button"
		>
			<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			Create Discount
		</button>
	</div>

	<div class="mb-6 flex space-x-6 border-b border-gray-200">
		<button
			type="button"
			onclick={() => (activeTab = 'codes')}
			class="border-b-2 pb-3 text-sm font-medium transition-colors {activeTab === 'codes'
				? 'border-[#000] text-[#000]'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Discount Codes
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'automatic')}
			class="border-b-2 pb-3 text-sm font-medium transition-colors {activeTab === 'automatic'
				? 'border-[#000] text-[#000]'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Automatic Discounts
		</button>
	</div>

	<div class="rounded-t-lg border-x border-t border-gray-200 bg-white p-4 shadow-sm">
		<div class="relative w-full sm:w-80">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<input
				type="text"
				class="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 text-sm leading-5 focus:border-[#000] focus:ring-1 focus:ring-[#000]"
				placeholder="Search discounts"
			/>
		</div>
	</div>

	<div class="overflow-x-auto rounded-b-lg border border-gray-200 bg-white shadow-sm">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="w-8 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
						<input type="checkbox" class="rounded border-gray-300 text-[#000]" />
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Code</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Value</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Used</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Expires</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each coupons as coupon}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-4"><input type="checkbox" class="rounded border-gray-300 text-[#000]" /></td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="font-mono text-sm font-medium text-blue-600">{coupon.code}</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span
								class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium {coupon.isActive
									? 'bg-blue-100 text-blue-800'
									: 'bg-red-100 text-red-800'}"
							>
								{coupon.isActive ? 'Active' : 'Inactive'}
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{coupon.discountType}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
							{couponValue(coupon)}
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{coupon.usageCount} uses</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
							{coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'No expiry'}
						</td>
					</tr>
				{/each}
				{#if coupons.length === 0}
					<tr>
						<td colspan="7" class="px-6 py-8 text-center text-sm text-gray-500">
							No discounts saved in the database.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
