<script lang="ts">
	let activeTab: 'login' | 'register' = 'login';
	let showPassword = false;
</script>

<svelte:head>
	<title>{activeTab === 'login' ? 'Sign In' : 'Create Account'} | Abayiza</title>
</svelte:head>

<div class="min-h-screen bg-cream flex items-center justify-center py-16 px-4">
	<div class="w-full max-w-md">
		<!-- Logo -->
		<div class="text-center mb-10">
			<a href="/" class="text-3xl font-serif tracking-widest uppercase text-black">Abayiza</a>
			<div class="w-10 h-[1px] bg-gold mx-auto mt-4"></div>
		</div>

		<!-- Tab Switcher -->
		<div class="flex border-b border-gray-200 mb-8">
			<button
				class="flex-1 py-3 text-sm tracking-widest uppercase font-medium transition-colors border-b-2 {activeTab === 'login' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}"
				onclick={() => activeTab = 'login'}
			>
				Sign In
			</button>
			<button
				class="flex-1 py-3 text-sm tracking-widest uppercase font-medium transition-colors border-b-2 {activeTab === 'register' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}"
				onclick={() => activeTab = 'register'}
			>
				Create Account
			</button>
		</div>

		{#if activeTab === 'login'}
		<!-- Login Form -->
		<form class="space-y-5">
			<div>
				<label for="email" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
				<input type="email" id="email" required autocomplete="email" class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="your@email.com">
			</div>
			<div>
				<label for="password" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
				<div class="relative">
					<input type={showPassword ? 'text' : 'password'} id="password" required autocomplete="current-password" class="w-full border border-gray-300 p-3.5 pr-12 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="••••••••">
					<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors" onclick={() => showPassword = !showPassword}>
						{#if showPassword}
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
						{:else}
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
						{/if}
					</button>
				</div>
			</div>
			<div class="flex justify-end">
				<a href="/forgot-password" class="text-xs text-gray-500 hover:text-black underline transition-colors">Forgot your password?</a>
			</div>
			<button type="submit" class="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors font-medium">
				Sign In
			</button>
			<div class="relative flex items-center py-2">
				<div class="flex-grow border-t border-gray-200"></div>
				<span class="mx-4 text-xs text-gray-400 uppercase tracking-widest">or</span>
				<div class="flex-grow border-t border-gray-200"></div>
			</div>
			<p class="text-center text-sm text-gray-500 font-light">
				Don't have an account? 
				<button type="button" class="text-black font-medium underline hover:text-gold transition-colors" onclick={() => activeTab = 'register'}>Create one</button>
			</p>
		</form>

		{:else}
		<!-- Register Form -->
		<form class="space-y-5">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="firstName" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
					<input type="text" id="firstName" required class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="Fatima">
				</div>
				<div>
					<label for="lastName" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
					<input type="text" id="lastName" required class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="Zahra">
				</div>
			</div>
			<div>
				<label for="regEmail" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
				<input type="email" id="regEmail" required class="w-full border border-gray-300 p-3.5 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="your@email.com">
			</div>
			<div>
				<label for="regPassword" class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
				<div class="relative">
					<input type={showPassword ? 'text' : 'password'} id="regPassword" required class="w-full border border-gray-300 p-3.5 pr-12 text-sm focus:border-black focus:ring-0 outline-none transition-colors bg-white rounded-none" placeholder="Min. 8 characters">
					<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors" onclick={() => showPassword = !showPassword}>
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
					</button>
				</div>
			</div>
			<label class="flex items-start space-x-3 cursor-pointer">
				<input type="checkbox" class="form-checkbox mt-0.5 h-4 w-4 text-black border-gray-300 rounded-none focus:ring-0">
				<span class="text-xs text-gray-500 font-light leading-relaxed">I agree to the <a href="/policies/terms" class="text-black underline">Terms of Service</a> and <a href="/policies/privacy" class="text-black underline">Privacy Policy</a></span>
			</label>
			<label class="flex items-start space-x-3 cursor-pointer">
				<input type="checkbox" class="form-checkbox mt-0.5 h-4 w-4 text-black border-gray-300 rounded-none focus:ring-0">
				<span class="text-xs text-gray-500 font-light">Subscribe to exclusive offers & new collection alerts</span>
			</label>
			<button type="submit" class="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors font-medium">
				Create Account
			</button>
			<p class="text-center text-sm text-gray-500 font-light">
				Already have an account? 
				<button type="button" class="text-black font-medium underline hover:text-gold transition-colors" onclick={() => activeTab = 'login'}>Sign in</button>
			</p>
		</form>
		{/if}
	</div>
</div>
