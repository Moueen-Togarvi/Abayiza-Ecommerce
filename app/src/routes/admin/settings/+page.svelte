<script lang="ts">
	// Placeholder
</script>

<div class="max-w-4xl mx-auto pb-12">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Settings</h1>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<!-- Left Nav -->
		<div class="md:col-span-1">
			<nav class="space-y-1">
				<a href="#" class="bg-gray-100 text-gray-900 font-medium px-3 py-2 rounded-md block text-sm">Store details</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Locations</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Users and permissions</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Payments</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Checkout</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Shipping and delivery</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Notifications</a>
				<a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md block text-sm">Policies</a>
			</nav>
		</div>

		<!-- Main content -->
		<div class="md:col-span-2 space-y-6">
			<!-- Profile -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-4 py-5 sm:p-6">
					<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Profile</h3>
					<div class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Store name</label>
							<input type="text" value="Abayiza" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Store contact email</label>
								<input type="email" value="contact@abayiza.com" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Sender email</label>
								<input type="email" value="noreply@abayiza.com" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Standards and Formats -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200">
				<div class="px-4 py-5 sm:p-6">
					<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Standards and formats</h3>
					<div class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
								<select class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
									<option>(GMT+04:00) Abu Dhabi, Muscat</option>
								</select>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Unit system</label>
								<select class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
									<option>Metric system</option>
								</select>
							</div>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Store currency</label>
							<select class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-[#000] focus:border-[#000] sm:text-sm px-3 py-2">
								<option>US Dollars (USD)</option>
								<option>United Arab Emirates Dirham (AED)</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<!-- Save button -->
			<div class="flex justify-end pt-2">
				<button class="bg-[#000] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
