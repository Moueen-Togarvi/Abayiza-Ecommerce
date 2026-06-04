<script lang="ts">
	import { formatMoney } from '$lib/shared/money';

	let { data, form } = $props();
	let order = $derived(data.order as any);
	let address = $derived((order.shippingAddress || {}) as Record<string, string>);
	let showCancelModal = $state(false);

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
			PENDING: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
			PROCESSING: 'bg-blue-100 text-blue-800 ring-blue-200',
			SHIPPED: 'bg-purple-100 text-purple-800 ring-purple-200',
			DELIVERED: 'bg-green-100 text-green-800 ring-green-200',
			CANCELLED: 'bg-red-100 text-red-800 ring-red-200'
		})[status] || 'bg-gray-100 text-gray-800 ring-gray-200';

	const actionDisabled = (status: string) =>
		order.status === status || order.status === 'DELIVERED' || order.status === 'CANCELLED';
	const backHref = $derived(
		order.status === 'DELIVERED'
			? '/abayiza-secure-admin-7k9x2p/orders/completed'
			: order.status === 'CANCELLED'
				? '/abayiza-secure-admin-7k9x2p/orders/cancelled'
				: '/abayiza-secure-admin-7k9x2p/orders'
	);
</script>

<svelte:head>
	<title>Order {order.orderNumber} | Abayiza Admin</title>
</svelte:head>

<div class="mx-auto max-w-7xl pb-12">
	<div class="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
		<div class="grid gap-0 lg:grid-cols-[17rem_1fr]">
			<div class="relative min-h-64 bg-gray-100">
				{#if order.items?.[0]?.image}
					<img
						src={order.items[0].image}
						alt={order.items[0].productName}
						class="absolute inset-0 h-full w-full object-cover"
					/>
				{:else}
					<div
						class="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-400"
					>
						No image
					</div>
				{/if}
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
				></div>
				<a
					href={backHref}
					class="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm hover:bg-white"
					aria-label="Back to orders"
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
				<div class="absolute right-4 bottom-4 left-4">
					<p class="text-xs font-black tracking-[0.16em] text-white/75 uppercase">Primary item</p>
					<h2 class="mt-1 font-serif text-xl leading-tight text-white">
						{order.items?.[0]?.productName || 'Abayiza order'}
					</h2>
				</div>
			</div>

			<div class="p-6 lg:p-8">
				<div class="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
					<div>
						<div class="flex flex-wrap items-center gap-3">
							<span
								class={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${statusClass(order.status)}`}
							>
								{statusLabel(order.status)}
							</span>
							<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
								Cash on Delivery
							</span>
						</div>
						<h1 class="mt-4 text-3xl font-black tracking-tight text-gray-950">
							{order.orderNumber}
						</h1>
						<p class="mt-2 text-sm text-gray-500">
							Placed {new Date(order.createdAt).toLocaleString()} / {order.items.length} item{order
								.items.length === 1
								? ''
								: 's'}
						</p>
					</div>

					<div class="flex flex-wrap gap-2">
						<form method="POST" action="?/updateStatus">
							<input type="hidden" name="status" value="PROCESSING" />
							<button
								type="submit"
								disabled={actionDisabled('PROCESSING')}
								class="inline-flex min-h-10 items-center rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-black text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45"
							>
								In Progress
							</button>
						</form>
						<form method="POST" action="?/updateStatus">
							<input type="hidden" name="status" value="DELIVERED" />
							<button
								type="submit"
								disabled={actionDisabled('DELIVERED')}
								class="inline-flex min-h-10 items-center rounded-full bg-green-600 px-4 text-sm font-black text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-45"
							>
								Complete Order
							</button>
						</form>
						<button
							type="button"
							disabled={order.status === 'DELIVERED' || order.status === 'CANCELLED'}
							class="inline-flex min-h-10 items-center rounded-full border border-red-200 bg-red-50 px-4 text-sm font-black text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
							onclick={() => (showCancelModal = true)}
						>
							Cancel Order
						</button>
					</div>
				</div>

				<div class="mt-8 grid gap-4 md:grid-cols-4">
					<div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p class="text-xs font-bold text-gray-500 uppercase">Total</p>
						<p class="mt-2 text-xl font-black text-gray-950">{formatMoney(order.totalAmount)}</p>
					</div>
					<div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p class="text-xs font-bold text-gray-500 uppercase">Customer</p>
						<p class="mt-2 truncate text-sm font-black text-gray-950">{order.customerName}</p>
					</div>
					<div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p class="text-xs font-bold text-gray-500 uppercase">Mobile</p>
						<p class="mt-2 truncate text-sm font-black text-gray-950">
							{order.customerPhone || '-'}
						</p>
					</div>
					<div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p class="text-xs font-bold text-gray-500 uppercase">City</p>
						<p class="mt-2 truncate text-sm font-black text-gray-950">
							{order.customerCity || '-'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if form?.error}
		<div class="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_23rem]">
		<div class="space-y-6">
			<section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div class="flex items-center justify-between border-b border-gray-100 px-6 py-5">
					<div>
						<p class="text-xs font-black tracking-[0.16em] text-gray-400 uppercase">
							Ordered abayas
						</p>
						<h3 class="mt-1 text-lg font-black text-gray-950">Items in this order</h3>
					</div>
					<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
						{order.items.length} item{order.items.length === 1 ? '' : 's'}
					</span>
				</div>

				<div class="divide-y divide-gray-100">
					{#each order.items as item}
						<div class="grid gap-4 p-5 md:grid-cols-[7.5rem_1fr_auto] md:items-center">
							<div
								class="h-36 overflow-hidden rounded-xl border border-gray-100 bg-gray-100 md:h-32"
							>
								{#if item.image}
									<img
										src={item.image}
										alt={item.productName}
										class="h-full w-full object-cover object-center"
									/>
								{:else}
									<div
										class="flex h-full items-center justify-center text-xs font-bold text-gray-400"
									>
										No image
									</div>
								{/if}
							</div>
							<div class="min-w-0">
								<p class="font-serif text-xl leading-tight text-gray-950">{item.productName}</p>
								<div class="mt-3 flex flex-wrap gap-2">
									{#if item.variantColor}
										<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
											>{item.variantColor}</span
										>
									{/if}
									{#if item.variantSize}
										<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
											>{item.variantSize}</span
										>
									{/if}
									<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
										>Qty {item.quantity}</span
									>
								</div>
							</div>
							<div class="text-left md:text-right">
								<p class="text-sm font-semibold text-gray-500">
									{formatMoney(item.priceAtPurchase)} each
								</p>
								<p class="mt-1 text-xl font-black text-gray-950">{formatMoney(item.lineTotal)}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<div class="mb-5 flex items-center justify-between">
					<div>
						<p class="text-xs font-black tracking-[0.16em] text-gray-400 uppercase">Payment</p>
						<h3 class="mt-1 text-lg font-black text-gray-950">Cash collection summary</h3>
					</div>
					<span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
						{order.isPaid ? 'Paid' : 'Unpaid'}
					</span>
				</div>
				<div class="space-y-3 text-sm">
					<div class="flex justify-between text-gray-600">
						<span>Subtotal</span><span>{formatMoney(order.subtotal)}</span>
					</div>
					<div class="flex justify-between text-gray-600">
						<span>Shipping</span><span>{formatMoney(order.shippingCost)}</span>
					</div>
					<div
						class="flex justify-between border-t border-gray-100 pt-4 text-lg font-black text-gray-950"
					>
						<span>Total due</span><span>{formatMoney(order.totalAmount)}</span>
					</div>
				</div>
			</section>
		</div>

		<aside class="space-y-6">
			<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black tracking-[0.16em] text-gray-400 uppercase">Customer</p>
				<h3 class="mt-2 font-serif text-2xl text-gray-950">{order.customerName}</h3>
				<div class="mt-5 space-y-3 text-sm text-gray-600">
					<div>
						<p class="text-xs font-bold text-gray-400 uppercase">Email</p>
						<p class="mt-1 font-medium break-all text-gray-900">
							{order.customerEmail || 'No email saved'}
						</p>
					</div>
					<div>
						<p class="text-xs font-bold text-gray-400 uppercase">Mobile number</p>
						<p class="mt-1 font-medium text-gray-900">{order.customerPhone || 'No phone saved'}</p>
					</div>
				</div>
			</section>

			<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black tracking-[0.16em] text-gray-400 uppercase">Delivery address</p>
				<div class="mt-4 space-y-3 text-sm">
					<div>
						<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">Name</p>
						<p class="mt-1 font-black text-gray-950">
							{address.firstName || '-'}
							{address.lastName || ''}
						</p>
					</div>
					<div>
						<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">
							Address
						</p>
						<p class="mt-1 leading-6 text-gray-800">{address.addressLine1 || '-'}</p>
						{#if address.addressLine2}<p class="leading-6 text-gray-800">
								{address.addressLine2}
							</p>{/if}
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">
								City
							</p>
							<p class="mt-1 font-medium text-gray-900">{address.city || '-'}</p>
						</div>
						<div>
							<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">
								Postal Code
							</p>
							<p class="mt-1 font-medium text-gray-900">{address.postalCode || '-'}</p>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">
								Country
							</p>
							<p class="mt-1 font-medium text-gray-900">{address.country || '-'}</p>
						</div>
						<div>
							<p class="text-[0.68rem] font-black tracking-[0.12em] text-gray-400 uppercase">
								Mobile
							</p>
							<p class="mt-1 font-medium text-gray-900">{address.phone || '-'}</p>
						</div>
					</div>
				</div>
			</section>

			<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black tracking-[0.16em] text-gray-400 uppercase">Fulfillment</p>
				<div class="mt-4 space-y-3 text-sm text-gray-600">
					<div class="flex items-center justify-between">
						<span>Tracking</span>
						<span class="font-medium text-gray-950">{order.trackingNumber || 'Not assigned'}</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Status</span>
						<span class={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(order.status)}`}>
							{statusLabel(order.status)}
						</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Updated</span>
						<span class="font-medium text-gray-950"
							>{new Date(order.updatedAt).toLocaleDateString()}</span
						>
					</div>
				</div>
			</section>
		</aside>
	</div>
</div>

{#if showCancelModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
		<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
			<div class="flex items-start justify-between gap-4">
				<div>
					<p class="text-xs font-black tracking-[0.16em] text-red-600 uppercase">Confirm cancel</p>
					<h2 class="mt-2 text-xl font-black text-gray-950">Cancel this order?</h2>
				</div>
				<button
					type="button"
					class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
					aria-label="Close cancel dialog"
					onclick={() => (showCancelModal = false)}
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<p class="mt-4 text-sm leading-6 text-gray-600">
				Order {order.orderNumber} will move from active orders to cancelled orders. This action can be
				reviewed later from the cancelled orders page.
			</p>
			<div class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					class="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
					onclick={() => (showCancelModal = false)}
				>
					Keep Order
				</button>
				<form method="POST" action="?/updateStatus">
					<input type="hidden" name="status" value="CANCELLED" />
					<button
						type="submit"
						class="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
					>
						Yes, Cancel Order
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
