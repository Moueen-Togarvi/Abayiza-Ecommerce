<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy } from 'svelte';

	let { children, data } = $props();
	let isSidebarOpen = $state(true);
	let isMobileMenuOpen = $state(false);
	let adminUser = $derived(data.adminUser);
	let isAuthPage = $derived(page.url.pathname === '/admin/login');
	let toast = $state<{ type: string; message: string } | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	const isActive = (href: string) => {
		if (href === '/admin') return page.url.pathname === href;
		if (href === '/admin/orders/completed') return page.url.pathname.startsWith(href);
		if (href === '/admin/orders/cancelled') return page.url.pathname.startsWith(href);
		if (href === '/admin/orders') {
			return page.url.pathname === href || /^\/admin\/orders\/(?!(completed|cancelled))/.test(page.url.pathname);
		}
		return page.url.pathname.startsWith(href);
	};

	const toastShellClass = (type: string) => {
		if (type === 'error') return 'border-red-200 bg-red-50 text-red-950';
		if (type === 'info') return 'border-blue-200 bg-blue-50 text-blue-950';
		return 'border-green-200 bg-green-50 text-green-950';
	};

	const toastIconClass = (type: string) => {
		if (type === 'error') return 'bg-red-600 text-white';
		if (type === 'info') return 'bg-blue-600 text-white';
		return 'bg-green-600 text-white';
	};

	$effect(() => {
		if (!data.flash?.message) return;

		toast = data.flash;
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toast = null;
		}, 3000);
	});

	onDestroy(() => {
		if (toastTimer) clearTimeout(toastTimer);
	});
</script>

<svelte:head>
	<title>Abayiza Admin</title>
</svelte:head>

{#if toast}
	<div
		class={`fixed top-4 right-4 z-[90] flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl ${toastShellClass(toast.type)}`}
		role="status"
		aria-live="polite"
	>
		<span
			class={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${toastIconClass(toast.type)}`}
		>
			{#if toast.type === 'error'}
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M6 18 18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M5 13l4 4L19 7" />
				</svg>
			{/if}
		</span>
		<div class="min-w-0 flex-1">
			<p class="text-sm font-black">Done</p>
			<p class="mt-0.5 text-sm font-semibold opacity-75">{toast.message}</p>
		</div>
		<button
			type="button"
			class="rounded-md p-1 opacity-55 transition-opacity hover:opacity-100"
			aria-label="Dismiss notification"
			onclick={() => (toast = null)}
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}

{#if isAuthPage}
	{@render children()}
{:else}
<div class="flex min-h-screen bg-white font-sans text-[#000]">
	{#if isMobileMenuOpen}
		<button
			type="button"
			class="fixed inset-0 z-30 bg-black/45 md:hidden"
			aria-label="Close admin menu"
			onclick={() => (isMobileMenuOpen = false)}
		></button>
	{/if}

	<!-- Sidebar -->
	<aside class={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-shrink-0 flex-col border-r border-[#000]/10 bg-white transition-all duration-300 md:sticky md:top-0 md:z-20 ${isSidebarOpen ? 'md:w-64' : 'md:w-20'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
		<div class="flex h-16 items-center justify-between border-b border-[#000]/10 px-6">
			{#if isSidebarOpen || isMobileMenuOpen}
				<div>
					<span class="font-serif text-xl font-bold tracking-widest text-[#000]">ABAYIZA</span>
					<span class="block text-[10px] font-semibold tracking-[0.22em] text-blue-600 uppercase"
						>Admin</span
					>
				</div>
			{/if}
			<button
				type="button"
				class="hidden rounded-md p-2 text-[#000]/55 transition-colors hover:bg-yellow-100 hover:text-[#000] md:block"
				aria-label="Toggle admin sidebar"
				onclick={() => (isSidebarOpen = !isSidebarOpen)}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<button
				type="button"
				class="rounded-md p-2 text-[#000]/55 transition-colors hover:bg-red-50 hover:text-[#000] md:hidden"
				aria-label="Close admin menu"
				onclick={() => (isMobileMenuOpen = false)}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
		
		<nav class="flex-1 overflow-y-auto py-4">
			<ul class="space-y-1 px-3">
				<li>
					<a href="/admin" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin') ? 'border-blue-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-blue-500 hover:bg-blue-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Dashboard</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/orders" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/orders') ? 'border-orange-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-orange-500 hover:bg-orange-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Orders</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/orders/completed" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/orders/completed') ? 'border-green-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-green-500 hover:bg-green-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Completed Orders</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/orders/cancelled" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/orders/cancelled') ? 'border-red-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-red-500 hover:bg-red-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Cancelled Orders</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/products" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/products') ? 'border-yellow-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-yellow-500 hover:bg-yellow-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Products</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/categories" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/categories') ? 'border-yellow-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-yellow-500 hover:bg-yellow-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h10" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Categories</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/reviews" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/reviews') ? 'border-blue-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-blue-500 hover:bg-blue-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2 1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Review Photos</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/customers" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/customers') ? 'border-blue-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-blue-500 hover:bg-blue-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Customers</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/users" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/users') ? 'border-blue-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-blue-500 hover:bg-blue-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Users</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/discounts" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/discounts') ? 'border-red-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-red-500 hover:bg-red-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Discounts</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/analytics" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/analytics') ? 'border-orange-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-orange-500 hover:bg-orange-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Analytics</span>{/if}
					</a>
				</li>
			</ul>

			<h3 class="mt-8 mb-2 px-6 text-xs font-semibold tracking-wider text-[#000]/35 uppercase">
				{#if isSidebarOpen || isMobileMenuOpen}Sales Channels{/if}
			</h3>
			<ul class="space-y-1 px-3">
				<li>
					<a href="/admin/storefront" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/storefront') ? 'border-yellow-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-yellow-500 hover:bg-yellow-50 hover:text-[#000]'}`}>
						<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
						{#if isSidebarOpen || isMobileMenuOpen}<span>Online Store</span>{/if}
					</a>
				</li>
			</ul>
		</nav>

		<div class="border-t border-[#000]/10 p-4">
			<a href="/admin/settings" class={`flex items-center rounded-md border-l-4 px-3 py-2 text-sm font-semibold transition-colors ${isActive('/admin/settings') ? 'border-red-500 bg-[#000] text-white shadow-sm' : 'border-transparent text-[#000]/70 hover:border-red-500 hover:bg-red-50 hover:text-[#000]'}`}>
				<svg class="mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
				{#if isSidebarOpen || isMobileMenuOpen}<span>Settings</span>{/if}
			</a>
		</div>
	</aside>

	<!-- Main content area -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Top header -->
		<header class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#000]/10 bg-white px-6">
			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					type="button"
					class="rounded-md p-2 text-[#000]/60 hover:bg-yellow-100 hover:text-[#000] focus:outline-none"
					aria-label="Open admin menu"
					onclick={() => (isMobileMenuOpen = true)}
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
				</button>
				<span class="ml-4 font-serif text-xl font-bold tracking-widest text-[#000] uppercase">Abayiza Admin</span>
			</div>
			
			<!-- Search bar (Desktop) -->
			<div class="hidden max-w-2xl flex-1 px-4 md:flex">
				<div class="relative w-full text-[#000]/40 focus-within:text-blue-600">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					</div>
					<input class="block h-10 w-full rounded-md border border-[#000]/15 bg-white py-2 pr-3 pl-10 text-[#000] placeholder-[#000]/40 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-sm" placeholder="Search orders, products, or customers" type="search">
				</div>
			</div>

			<!-- Right actions -->
			<div class="ml-4 flex items-center space-x-4 md:ml-6">
				<button class="relative rounded-full border border-[#000]/10 p-2 text-[#000]/55 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-[#000] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
					<span class="sr-only">View notifications</span>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
					<span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
				</button>
				
				<div class="relative">
					<form method="POST" action="/admin/logout" class="flex items-center gap-3">
						<div class="hidden text-right sm:block">
							<p class="text-sm font-bold text-[#000]">
								{adminUser?.firstName || 'Admin'} {adminUser?.lastName || ''}
							</p>
							<p class="text-xs font-semibold text-[#000]/45">{adminUser?.role}</p>
						</div>
						<button class="flex max-w-xs items-center rounded-full border border-[#000]/10 bg-white px-2 py-1 text-sm transition-colors hover:border-red-300 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none">
							<span class="mr-2 font-medium text-[#000]/70">Logout</span>
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#000] font-serif font-bold text-white">A</div>
						</button>
					</form>
				</div>
			</div>
		</header>

		<!-- Main content -->
		<main class="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8">
			{@render children()}
		</main>
	</div>
</div>
{/if}
