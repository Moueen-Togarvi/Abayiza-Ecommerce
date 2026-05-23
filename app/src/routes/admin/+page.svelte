<script lang="ts">
	let { data } = $props();
	let selectedDateRange = $state('Last 7 days');
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
		
		<div class="relative inline-block text-left">
			<select bind:value={selectedDateRange} class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md shadow-sm">
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
		<div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 bg-green-50 rounded-md p-3">
						<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-gray-900">${data.stats.totalSales.toFixed(2)}</div>
								<div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
									<svg class="self-center flex-shrink-0 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
									<span class="sr-only">Increased by</span>
									12.5%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Orders -->
		<div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 bg-blue-50 rounded-md p-3">
						<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-gray-900">{data.stats.totalOrders}</div>
								<div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
									<svg class="self-center flex-shrink-0 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
									<span class="sr-only">Increased by</span>
									5.4%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Store Conversion -->
		<div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 bg-purple-50 rounded-md p-3">
						<svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Store Conversion Rate</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-gray-900">{data.stats.conversionRate}%</div>
								<div class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
									<svg class="self-center flex-shrink-0 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
									<span class="sr-only">Decreased by</span>
									0.4%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<!-- Average Order Value -->
		<div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0 bg-yellow-50 rounded-md p-3">
						<svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
							<dd class="flex items-baseline">
								<div class="text-2xl font-bold text-gray-900">${data.stats.averageOrderValue.toFixed(2)}</div>
								<div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
									<svg class="self-center flex-shrink-0 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
									<span class="sr-only">Increased by</span>
									2.1%
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Two Column Layout: Chart & Top Products -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
		<!-- Revenue Chart (Placeholder) -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200 lg:col-span-2">
			<div class="px-6 py-5 border-b border-gray-200">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Revenue</h3>
			</div>
			<div class="p-6 h-80 flex items-center justify-center bg-gray-50 rounded-b-lg">
				<!-- Placeholder for Chart.js or similar -->
				<div class="text-center">
					<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
					<p class="mt-2 text-sm text-gray-500">Revenue Line Chart Visualization</p>
					<p class="text-xs text-gray-400">(Requires Chart.js or similar library)</p>
				</div>
			</div>
		</div>

		<!-- Top Products List -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Top Products</h3>
				<a href="/admin/products" class="text-sm font-medium text-blue-600 hover:text-blue-500">View all</a>
			</div>
			<div class="p-0">
				<ul class="divide-y divide-gray-200">
					{#each data.topProducts as product}
					<li class="p-4 hover:bg-gray-50">
						<div class="flex items-center space-x-4">
							<div class="flex-shrink-0 h-12 w-10 bg-gray-100 rounded overflow-hidden">
								<img src={product.image} alt={product.name} class="h-full w-full object-cover">
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-gray-900 truncate">{product.name}</p>
								<p class="text-sm text-gray-500 truncate">{product.sales} sold</p>
							</div>
							<div>
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
									${product.revenue.toFixed(2)}
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
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
				<a href="/admin/orders" class="text-sm font-medium text-blue-600 hover:text-blue-500">View all</a>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each data.recentOrders as order}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
								<a href="/admin/orders/{order.id}">#{order.shortId}</a>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
									{order.status}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">${order.total.toFixed(2)}</td>
						</tr>
						{/each}
						{#if data.recentOrders.length === 0}
						<tr>
							<td colspan="4" class="px-6 py-8 text-center text-sm text-gray-500">
								No orders yet
							</td>
						</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Low Stock Alerts -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Inventory Alerts</h3>
			</div>
			<div class="p-0">
				<ul class="divide-y divide-gray-200">
					{#each data.lowStockVariants as variant}
					<li class="p-4 hover:bg-gray-50 flex items-center justify-between">
						<div class="flex items-center">
							<div class="flex-shrink-0 h-10 w-8 bg-gray-100 rounded overflow-hidden">
								<img src={variant.image} alt={variant.productName} class="h-full w-full object-cover">
							</div>
							<div class="ml-4">
								<p class="text-sm font-medium text-gray-900">{variant.productName}</p>
								<p class="text-xs text-gray-500">SKU: {variant.sku} • Size: {variant.size}</p>
							</div>
						</div>
						<div class="text-right">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
								Only {variant.stockCount} left
							</span>
							<p class="text-xs text-blue-600 mt-1 cursor-pointer">Update stock</p>
						</div>
					</li>
					{/each}
					{#if data.lowStockVariants.length === 0}
					<li class="p-4 text-center text-sm text-gray-500">
						Inventory levels are healthy
					</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</div>
