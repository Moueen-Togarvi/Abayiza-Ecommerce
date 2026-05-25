<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let selectedDateRange = $state('Last 7 days');
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-[#000]">Dashboard</h1>
		
		<div class="relative inline-block text-left">
			<select bind:value={selectedDateRange} class="block w-full rounded-md border border-[#000]/15 bg-white py-2 pr-10 pl-3 text-base text-[#000] shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm">
				<option>Today</option>
				<option>Yesterday</option>
				<option>Last 7 days</option>
				<option>Last 30 days</option>
				<option>This month</option>
			</select>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
		<!-- Total Sales -->
		<div class="overflow-hidden rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 rounded-md bg-orange-50 p-3">
						<svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="truncate text-sm font-medium text-[#000]/55">Total Sales</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-[#000]">{formatMoney(data.stats.totalSales)}</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Orders -->
		<div class="overflow-hidden rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 rounded-md bg-blue-50 p-3">
						<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="truncate text-sm font-medium text-[#000]/55">Total Orders</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-[#000]">{data.stats.totalOrders}</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Products -->
		<div class="overflow-hidden rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 rounded-md bg-red-50 p-3">
						<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="truncate text-sm font-medium text-[#000]/55">Products In DB</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-[#000]">{data.meta.productCount}</div>
								<div class="ml-2 text-sm font-semibold text-red-600">
									{data.meta.categoryCount} categories
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Average Order Value -->
		<div class="overflow-hidden rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 rounded-md bg-yellow-50 p-3">
						<svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="truncate text-sm font-medium text-[#000]/55">Average Order Value</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-[#000]">{formatMoney(data.stats.averageOrderValue)}</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Two Column Layout: Chart & Top Products -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
		<!-- Revenue Chart -->
		<div class="rounded-lg border border-[#000]/10 bg-white shadow-sm lg:col-span-2">
			<div class="border-b border-[#000]/10 px-6 py-5">
				<h3 class="text-lg leading-6 font-medium text-[#000]">Revenue</h3>
			</div>
			<div class="flex h-80 items-center justify-center rounded-b-lg bg-yellow-50/35 p-6">
				<div class="text-center">
					<svg class="mx-auto h-12 w-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
					<p class="mt-2 text-sm text-[#000]/60">Revenue Line Chart Visualization</p>
					<p class="text-xs text-[#000]/35">(Requires Chart.js or similar library)</p>
				</div>
			</div>
		</div>

		<!-- Top Products List -->
		<div class="rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="flex items-center justify-between border-b border-[#000]/10 px-6 py-5">
				<h3 class="text-lg leading-6 font-medium text-[#000]">Catalog Products</h3>
				<a href="/abayiza-secure-admin-7k9x2p/products" class="text-sm font-medium text-blue-600 hover:text-blue-500">View all</a>
			</div>
			<div class="p-0">
				<ul class="divide-y divide-[#000]/10">
					{#each data.topProducts as product}
					<li class="p-4 hover:bg-blue-50/60">
						<div class="flex items-center space-x-4">
							<div class="h-12 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
								<img src={product.image} alt={product.name} class="h-full w-full object-cover">
							</div>
							<div class="flex-1 min-w-0">
								<p class="truncate text-sm font-medium text-[#000]">{product.name}</p>
								<p class="truncate text-sm text-[#000]/55">{product.inventory} in stock</p>
							</div>
							<div>
								<span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-900">
									{formatMoney(product.salePrice || product.price)}
								</span>
							</div>
						</div>
					</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Two Column Layout: Recent Orders & Low Stock -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Recent Orders -->
		<div class="rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="flex items-center justify-between border-b border-[#000]/10 px-6 py-5">
				<h3 class="text-lg leading-6 font-medium text-[#000]">Recent Orders</h3>
				<a href="/abayiza-secure-admin-7k9x2p/orders" class="text-sm font-medium text-blue-600 hover:text-blue-500">View all</a>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-[#000]/10">
					<thead class="bg-orange-50/50">
						<tr>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-[#000]/55 uppercase">Order</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-[#000]/55 uppercase">Customer</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-[#000]/55 uppercase">Status</th>
							<th scope="col" class="px-6 py-3 text-right text-xs font-medium tracking-wider text-[#000]/55 uppercase">Total</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#000]/10 bg-white">
						{#each data.recentOrders as order}
						<tr class="hover:bg-blue-50/50">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
								<a href="/abayiza-secure-admin-7k9x2p/orders/{order.id}">#{order.shortId}</a>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-[#000]/55">{order.customerName}</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">
									{order.status}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[#000]">{formatMoney(order.total)}</td>
						</tr>
						{/each}
						{#if data.recentOrders.length === 0}
						<tr>
							<td colspan="4" class="px-6 py-8 text-center text-sm text-[#000]/55">
								No orders yet
							</td>
						</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Low Stock Alerts -->
		<div class="rounded-lg border border-[#000]/10 bg-white shadow-sm">
			<div class="flex items-center justify-between border-b border-[#000]/10 px-6 py-5">
				<h3 class="text-lg leading-6 font-medium text-[#000]">Inventory Alerts</h3>
			</div>
			<div class="p-0">
				<ul class="divide-y divide-[#000]/10">
					{#each data.lowStockVariants as variant}
					<li class="flex items-center justify-between p-4 hover:bg-red-50/50">
						<div class="flex items-center">
							<div class="h-10 w-8 flex-shrink-0 overflow-hidden rounded bg-gray-100">
								<img src={variant.image} alt={variant.productName} class="h-full w-full object-cover">
							</div>
							<div class="ml-4">
								<p class="text-sm font-medium text-[#000]">{variant.productName}</p>
								<p class="text-xs text-[#000]/55">SKU: {variant.sku} • Size: {variant.size}</p>
							</div>
						</div>
						<div class="text-right">
							<span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
								Only {variant.stockCount} left
							</span>
							<p class="text-xs text-blue-600 mt-1 cursor-pointer">Update stock</p>
						</div>
					</li>
					{/each}
					{#if data.lowStockVariants.length === 0}
					<li class="p-4 text-center text-sm text-[#000]/55">
						Inventory levels are healthy
					</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</div>
