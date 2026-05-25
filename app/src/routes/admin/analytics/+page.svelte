<script lang="ts">
	let dateRange = 'Last 30 days';
</script>

<div class="max-w-7xl mx-auto">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
		<select bind:value={dateRange} class="border-gray-300 rounded-md text-sm shadow-sm focus:ring-[#000] focus:border-[#000]">
			<option>Today</option>
			<option>Last 7 days</option>
			<option>Last 30 days</option>
			<option>Last 90 days</option>
			<option>This year</option>
		</select>
	</div>

	<!-- KPI Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
		{#each [
			{ label: 'Total Revenue', value: '$48,290', change: '+18.2%', up: true, color: 'orange' },
			{ label: 'Total Orders', value: '312', change: '+11.4%', up: true, color: 'blue' },
			{ label: 'New Customers', value: '94', change: '-3.1%', up: false, color: 'red' },
			{ label: 'Avg. Order Value', value: '$154.78', change: '+6.0%', up: true, color: 'yellow' },
		] as kpi}
		<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-5">
			<p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</p>
			<p class="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
			<p class="text-sm {kpi.up ? 'text-blue-600' : 'text-red-500'} font-medium">
				{kpi.up ? '↑' : '↓'} {kpi.change} vs previous period
			</p>
		</div>
		{/each}
	</div>

	<!-- Charts Row -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
		<!-- Revenue Chart -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200 lg:col-span-2">
			<div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<h3 class="font-medium text-gray-900">Revenue Over Time</h3>
				<div class="flex space-x-2">
					{#each ['Revenue', 'Orders'] as legend, i}
					<span class="flex items-center text-xs text-gray-500">
						<span class="w-3 h-1 inline-block rounded mr-1 {i === 0 ? 'bg-[#000]' : 'bg-yellow-500'}"></span>
						{legend}
					</span>
					{/each}
				</div>
			</div>
			<div class="p-6 h-64 flex items-center justify-center bg-gray-50 rounded-b-lg">
				<div class="text-center">
					<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
					<p class="mt-2 text-sm text-gray-500">Revenue Chart (Connect Chart.js)</p>
				</div>
			</div>
		</div>

		<!-- Traffic Sources -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200">
				<h3 class="font-medium text-gray-900">Traffic Sources</h3>
			</div>
			<div class="p-6 space-y-4">
				{#each [
					{ source: 'Direct', percentage: 38, color: 'bg-[#000]' },
					{ source: 'Instagram', percentage: 28, color: 'bg-orange-500' },
					{ source: 'Google Search', percentage: 20, color: 'bg-blue-500' },
					{ source: 'WhatsApp', percentage: 9, color: 'bg-yellow-500' },
					{ source: 'Other', percentage: 5, color: 'bg-gray-300' },
				] as src}
				<div>
					<div class="flex justify-between text-xs text-gray-600 mb-1">
						<span>{src.source}</span>
						<span class="font-medium">{src.percentage}%</span>
					</div>
					<div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
						<div class="h-full {src.color} rounded-full" style="width: {src.percentage}%"></div>
					</div>
				</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Row: Top Products & Geo -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Top Products Table -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200">
				<h3 class="font-medium text-gray-900">Top Selling Products</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
							<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
							<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each [
							{ name: 'Signature Nida Abaya', units: 88, revenue: '$12,760' },
							{ name: 'Chiffon Layered Abaya', units: 64, revenue: '$10,560' },
							{ name: 'Pearl Embellished Open Abaya', units: 42, revenue: '$9,240' },
							{ name: 'Velvet Trim Evening Abaya', units: 38, revenue: '$7,030' },
						] as prod}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-3 text-sm text-gray-900">{prod.name}</td>
							<td class="px-6 py-3 text-sm text-gray-500 text-right">{prod.units}</td>
							<td class="px-6 py-3 text-sm font-medium text-gray-900 text-right">{prod.revenue}</td>
						</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Top Countries -->
		<div class="bg-white shadow-sm rounded-lg border border-gray-200">
			<div class="px-6 py-5 border-b border-gray-200">
				<h3 class="font-medium text-gray-900">Top Markets</h3>
			</div>
			<div class="p-6 space-y-4">
				{#each [
					{ country: '🇦🇪 United Arab Emirates', orders: 98, revenue: '$15,240' },
					{ country: '🇸🇦 Saudi Arabia', orders: 72, revenue: '$11,100' },
					{ country: '🇵🇰 Pakistan', orders: 45, revenue: '$6,280' },
					{ country: '🇬🇧 United Kingdom', orders: 38, revenue: '$5,960' },
					{ country: '🇺🇸 United States', orders: 31, revenue: '$4,850' },
				] as market}
				<div class="flex items-center justify-between">
					<div class="text-sm font-medium text-gray-900">{market.country}</div>
					<div class="text-right">
						<div class="text-sm font-medium text-gray-900">{market.revenue}</div>
						<div class="text-xs text-gray-400">{market.orders} orders</div>
					</div>
				</div>
				{/each}
			</div>
		</div>
	</div>
</div>
