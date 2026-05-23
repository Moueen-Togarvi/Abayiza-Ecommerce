<script lang="ts">
	let { children } = $props();
	let isSidebarOpen = true;
</script>

<svelte:head>
	<title>Abayiza Admin</title>
</svelte:head>

<div class="min-h-screen bg-[#f4f6f8] flex font-sans text-gray-800">
	
	<!-- Sidebar -->
	<aside class="{isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 hidden md:flex sticky top-0 h-screen z-20">
		<div class="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
			{#if isSidebarOpen}
				<span class="text-xl font-serif font-bold text-black tracking-widest">ABAYIZA</span>
			{/if}
			<button class="text-gray-500 hover:text-black" onclick={() => isSidebarOpen = !isSidebarOpen}>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
		
		<nav class="flex-1 overflow-y-auto py-4">
			<ul class="space-y-1 px-3">
				<li>
					<a href="/admin" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
						{#if isSidebarOpen}<span>Dashboard</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/orders" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
						{#if isSidebarOpen}<span>Orders</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/products" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
						{#if isSidebarOpen}<span>Products</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/customers" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
						{#if isSidebarOpen}<span>Customers</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/discounts" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						{#if isSidebarOpen}<span>Discounts</span>{/if}
					</a>
				</li>
				<li>
					<a href="/admin/analytics" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
						{#if isSidebarOpen}<span>Analytics</span>{/if}
					</a>
				</li>
			</ul>

			<h3 class="px-6 mt-8 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
				{#if isSidebarOpen}Sales Channels{/if}
			</h3>
			<ul class="space-y-1 px-3">
				<li>
					<a href="/admin/storefront" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
						<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
						{#if isSidebarOpen}<span>Online Store</span>{/if}
					</a>
				</li>
			</ul>
		</nav>

		<div class="p-4 border-t border-gray-200">
			<a href="/admin/settings" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
				<svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
				{#if isSidebarOpen}<span>Settings</span>{/if}
			</a>
		</div>
	</aside>

	<!-- Main content area -->
	<div class="flex-1 flex flex-col overflow-hidden">
		<!-- Top header -->
		<header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 sticky top-0">
			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button class="text-gray-500 hover:text-black focus:outline-none">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
				</button>
				<span class="ml-4 text-xl font-serif font-bold text-black tracking-widest uppercase">Abayiza Admin</span>
			</div>
			
			<!-- Search bar (Desktop) -->
			<div class="hidden md:flex flex-1 max-w-2xl px-4">
				<div class="w-full relative text-gray-400 focus-within:text-gray-600">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					</div>
					<input class="block w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm transition-colors" placeholder="Search orders, products, or customers" type="search">
				</div>
			</div>

			<!-- Right actions -->
			<div class="ml-4 flex items-center md:ml-6 space-x-4">
				<button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black relative">
					<span class="sr-only">View notifications</span>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
					<span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
				</button>
				
				<!-- Profile dropdown -->
				<div class="relative">
					<button class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
						<span class="font-medium text-gray-700 mr-2">Admin</span>
						<div class="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-bold font-serif">A</div>
					</button>
				</div>
			</div>
		</header>

		<!-- Main content -->
		<main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
			{@render children()}
		</main>
	</div>
</div>
