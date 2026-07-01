<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data } = $props();
	let orders = $derived(data.orders || []);
	let filters = $derived(data.filters || {});

	const statusLabel = (status: string) =>
		({
			PENDING: 'Pending',
			PROCESSING: 'In Progress',
			SHIPPED: 'Shipped',
			DELIVERED: 'Completed',
			CANCELLED: 'Cancelled'
		})[status] || status;

	const statusClass = (status: string) =>
		({
			PENDING: 'bg-yellow-100 text-yellow-800',
			PROCESSING: 'bg-blue-100 text-blue-800',
			SHIPPED: 'bg-purple-100 text-purple-800',
			DELIVERED: 'bg-green-100 text-green-800',
			CANCELLED: 'bg-red-100 text-red-800'
		})[status] || 'bg-gray-100 text-gray-800';
</script>

<div class="mx-auto max-w-7xl">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Active Orders</h1>
			<p class="mt-1 text-sm text-gray-500">
				Completed orders move to their own page automatically.
			</p>
		</div>
		<div class="flex space-x-3">
			<a
				href="/abayiza-secure-admin-7k9x2p/orders/completed"
				class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
			>
				Completed Orders
			</a>
			<a
				href="/abayiza-secure-admin-7k9x2p/orders/cancelled"
				class="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100"
			>
				Cancelled Orders
			</a>
		</div>
	</div>

	<!-- Filters & Search -->
	<form method="GET" class="rounded-t-lg border-x border-t border-gray-200 bg-white p-4 shadow-sm">
		<div class="grid grid-cols-1 gap-3 md:grid-cols-6">
			<input
				name="date"
				type="date"
				value={filters.date || ''}
				class="rounded-md border-gray-300 text-sm focus:border-[#000] focus:ring-[#000]"
			/>
			<input
				name="email"
				type="search"
				value={filters.email || ''}
				placeholder="Email"
				class="rounded-md border-gray-300 text-sm focus:border-[#000] focus:ring-[#000]"
			/>
			<input
				name="phone"
				type="search"
				value={filters.phone || ''}
				placeholder="Phone"
				class="rounded-md border-gray-300 text-sm focus:border-[#000] focus:ring-[#000]"
			/>
			<input
				name="name"
				type="search"
				value={filters.name || ''}
				placeholder="Name"
				class="rounded-md border-gray-300 text-sm focus:border-[#000] focus:ring-[#000]"
			/>
			<input
				name="city"
				type="search"
				value={filters.city || ''}
				placeholder="City"
				class="rounded-md border-gray-300 text-sm focus:border-[#000] focus:ring-[#000]"
			/>
			<div class="flex gap-2">
				<button
					type="submit"
					class="flex-1 rounded-md bg-[#000] px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
				>
					Filter
				</button>
				<a
					href="/abayiza-secure-admin-7k9x2p/orders"
					class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
				>
					Clear
				</a>
			</div>
		</div>
	</form>

	<!-- Orders Table -->
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
						>Order</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Date</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Customer</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Total</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Phone / City</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Status</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Items</th
					>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each orders as order}
					<tr
						class="group cursor-pointer hover:bg-gray-50"
						onclick={() =>
							(window.location.href = `/abayiza-secure-admin-7k9x2p/orders/${order.id}`)}
					>
						<td class="px-6 py-4 whitespace-nowrap">
							<input
								type="checkbox"
								class="rounded border-gray-300 text-[#000] focus:ring-[#000]"
							/>
						</td>
						<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
							{order.orderNumber}
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
							{new Date(order.createdAt).toLocaleDateString()}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="text-sm font-medium text-blue-600 hover:underline">
								{order.customerName}
							</div>
							<div class="text-xs text-gray-500">{order.customerEmail}</div>
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
							{formatMoney(order.total)}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="text-sm text-gray-700">{order.customerPhone || '-'}</div>
							<div class="text-xs text-gray-500">{order.customerCity || '-'}</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(order.status)}`}
							>
								{statusLabel(order.status)}
							</span>
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
							{order.items.length} item{order.items.length !== 1 ? 's' : ''}
						</td>
					</tr>
				{/each}
				{#if orders.length === 0}
					<tr>
						<td colspan="8" class="px-6 py-8 text-center text-sm text-gray-500">
							No orders found
						</td>
					</tr>
				{/if}
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
						<span class="font-medium">{orders.length}</span>
						of <span class="font-medium">{orders.length}</span> results
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
