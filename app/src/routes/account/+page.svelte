<script lang="ts">
	let activeTab = 'orders'; // orders, addresses, settings
</script>

<svelte:head>
	<title>My Account | Abayiza</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
	<div class="flex flex-col md:flex-row gap-12">
		
		<!-- Sidebar Navigation -->
		<div class="w-full md:w-1/4 flex flex-col">
			<div class="mb-8 pb-8 border-b border-gray-200">
				<h1 class="text-2xl font-serif tracking-widest uppercase text-black mb-2">My Account</h1>
				<p class="text-gray-500 font-light text-sm">Welcome back, Fatima</p>
			</div>
			
			<nav class="flex flex-col space-y-4">
				<button 
					class="text-left text-sm font-medium tracking-widest uppercase transition-colors {activeTab === 'orders' ? 'text-black' : 'text-gray-400 hover:text-black'}"
					onclick={() => activeTab = 'orders'}
				>
					Order History
				</button>
				<button 
					class="text-left text-sm font-medium tracking-widest uppercase transition-colors {activeTab === 'addresses' ? 'text-black' : 'text-gray-400 hover:text-black'}"
					onclick={() => activeTab = 'addresses'}
				>
					Saved Addresses
				</button>
				<button 
					class="text-left text-sm font-medium tracking-widest uppercase transition-colors {activeTab === 'settings' ? 'text-black' : 'text-gray-400 hover:text-black'}"
					onclick={() => activeTab = 'settings'}
				>
					Profile Settings
				</button>
				<a href="/login" class="text-left text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-red-500 transition-colors pt-8 mt-auto">
					Sign Out
				</a>
			</nav>
		</div>
		
		<!-- Main Content Area -->
		<div class="w-full md:w-3/4">
			{#if activeTab === 'orders'}
				<h2 class="text-xl font-serif tracking-widest uppercase text-black mb-8">Order History</h2>
				
				<div class="space-y-6">
					{#each [1, 2] as order}
					<div class="border border-gray-200 bg-white">
						<div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
							<div class="mb-2 sm:mb-0">
								<p class="text-sm font-medium text-black">Order #1028{order}</p>
								<p class="text-xs text-gray-500 font-light">Placed on {order === 1 ? 'Oct 12, 2026' : 'Aug 04, 2026'}</p>
							</div>
							<div class="flex items-center space-x-4">
								<span class="inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest {order === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
									{order === 1 ? 'Processing' : 'Delivered'}
								</span>
								<p class="text-sm font-medium text-black">${order === 1 ? '145.00' : '230.00'}</p>
							</div>
						</div>
						
						<div class="p-6">
							<div class="flex items-center">
								<img src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=100&auto=format&fit=crop&sig={order}" alt="Product" class="w-16 h-20 object-cover bg-gray-100 border border-gray-200">
								<div class="ml-4 flex-grow">
									<h4 class="text-sm font-serif">Signature Nida Abaya</h4>
									<p class="text-xs text-gray-500 font-light mt-1">Midnight Black / M (54)</p>
									<p class="text-xs text-gray-500 font-light mt-1">Qty: 1</p>
								</div>
								<a href="/track" class="text-xs font-medium uppercase tracking-widest border-b border-black text-black hover:text-gold hover:border-gold transition-colors hidden sm:block">Track Order</a>
							</div>
							<div class="mt-4 sm:hidden">
								<a href="/track" class="text-xs font-medium uppercase tracking-widest border-b border-black text-black hover:text-gold hover:border-gold transition-colors">Track Order</a>
							</div>
						</div>
					</div>
					{/each}
				</div>

			{:else if activeTab === 'addresses'}
				<h2 class="text-xl font-serif tracking-widest uppercase text-black mb-8">Saved Addresses</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Default Address -->
					<div class="border border-black p-6 relative">
						<span class="absolute top-4 right-4 text-xs font-medium uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1">Default</span>
						<p class="text-sm font-medium mb-2">Fatima Zahra</p>
						<p class="text-sm text-gray-600 font-light leading-relaxed mb-6">
							123 Luxury Ave<br>
							Apt 4B<br>
							New York, NY 10001<br>
							United States<br>
							+1 (555) 123-4567
						</p>
						<div class="flex space-x-4">
							<button class="text-xs font-medium uppercase tracking-widest border-b border-black text-black hover:text-gold hover:border-gold transition-colors">Edit</button>
						</div>
					</div>

					<!-- Add New -->
					<button class="border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors min-h-[220px]">
						<svg class="w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" /></svg>
						<span class="text-sm font-medium uppercase tracking-widest">Add New Address</span>
					</button>
				</div>

			{:else if activeTab === 'settings'}
				<h2 class="text-xl font-serif tracking-widest uppercase text-black mb-8">Profile Settings</h2>
				
				<div class="max-w-md space-y-6">
					<div>
						<label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
						<input type="text" value="Fatima" class="w-full border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
					</div>
					<div>
						<label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
						<input type="text" value="Zahra" class="w-full border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
					</div>
					<div>
						<label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
						<input type="email" value="fatima.z@example.com" class="w-full border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
					</div>
					<div class="pt-4 border-t border-gray-200">
						<label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">New Password (Optional)</label>
						<input type="password" placeholder="••••••••" class="w-full border-gray-300 p-3 text-sm focus:border-black focus:ring-black rounded-none">
					</div>
					<button class="w-full bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors mt-4">
						Save Changes
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
