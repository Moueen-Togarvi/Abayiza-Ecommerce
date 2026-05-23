<script lang="ts">
	// Placeholder
</script>

<div class="max-w-4xl mx-auto pb-12">
	<!-- Header -->
	<div class="flex items-center space-x-4 mb-6">
		<a href="/admin/products" class="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
		</a>
		<h1 class="text-2xl font-bold text-gray-900">Add Product</h1>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		
		<!-- Left Column (Main Info) -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Title and Description -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<div class="space-y-5">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
						<input type="text" placeholder="e.g. Signature Nida Abaya" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2.5 border">
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<!-- Fake Rich Text Editor -->
						<div class="border border-gray-300 rounded-md shadow-sm overflow-hidden">
							<div class="bg-gray-50 border-b border-gray-300 px-3 py-2 flex space-x-2">
								<button class="p-1 hover:bg-gray-200 rounded"><span class="font-bold font-serif px-1">B</span></button>
								<button class="p-1 hover:bg-gray-200 rounded"><span class="italic font-serif px-1">I</span></button>
								<button class="p-1 hover:bg-gray-200 rounded underline"><span class="font-serif px-1">U</span></button>
								<div class="w-px h-6 bg-gray-300 mx-1"></div>
								<button class="p-1 hover:bg-gray-200 rounded text-gray-600"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
							</div>
							<textarea rows="6" class="block w-full border-0 focus:ring-0 sm:text-sm p-3" placeholder="Describe the abaya, its fabric, and care instructions..."></textarea>
						</div>
					</div>
				</div>
			</div>

			<!-- Media (Images) -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<h3 class="text-base font-medium text-gray-900 mb-4">Media</h3>
				<div class="border-2 border-dashed border-gray-300 rounded-lg p-10 flex justify-center items-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
					<div class="space-y-2">
						<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
						<div class="text-sm text-gray-600">
							<span class="font-medium text-blue-600 hover:underline">Add files</span> or drop files to upload
						</div>
						<p class="text-xs text-gray-500">High-resolution images recommended (1200x1600px)</p>
					</div>
				</div>
			</div>

			<!-- Pricing -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<h3 class="text-base font-medium text-gray-900 mb-4">Pricing</h3>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
						<div class="relative rounded-md shadow-sm">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<span class="text-gray-500 sm:text-sm">$</span>
							</div>
							<input type="text" class="block w-full pl-7 pr-3 py-2 border-gray-300 border rounded-md focus:ring-black focus:border-black sm:text-sm" placeholder="0.00">
						</div>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Compare at price</label>
						<div class="relative rounded-md shadow-sm">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<span class="text-gray-500 sm:text-sm">$</span>
							</div>
							<input type="text" class="block w-full pl-7 pr-3 py-2 border-gray-300 border rounded-md focus:ring-black focus:border-black sm:text-sm" placeholder="0.00">
						</div>
					</div>
				</div>
				<div class="mt-4 pt-4 border-t border-gray-200">
					<label class="flex items-center space-x-2 cursor-pointer">
						<input type="checkbox" checked class="form-checkbox text-black border-gray-300 rounded focus:ring-black h-4 w-4">
						<span class="text-sm text-gray-700">Charge tax on this product</span>
					</label>
				</div>
			</div>

			<!-- Variants -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<h3 class="text-base font-medium text-gray-900 mb-4">Variants</h3>
				
				<div class="space-y-4">
					<div class="border-l-2 border-blue-500 pl-4">
						<label class="block text-sm font-medium text-gray-700 mb-1">Option 1</label>
						<div class="flex gap-2">
							<select class="block w-1/3 border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm py-2 px-3">
								<option>Size</option>
								<option>Color</option>
								<option>Material</option>
							</select>
							<input type="text" value="S (52), M (54), L (56)" class="block w-2/3 border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2">
						</div>
					</div>
					
					<div class="border-l-2 border-gray-300 pl-4">
						<label class="block text-sm font-medium text-gray-700 mb-1">Option 2</label>
						<div class="flex gap-2">
							<select class="block w-1/3 border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm py-2 px-3">
								<option>Color</option>
								<option>Size</option>
							</select>
							<input type="text" value="Midnight Black, Dusty Rose" class="block w-2/3 border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2">
						</div>
					</div>

					<button class="text-sm text-blue-600 font-medium hover:underline mt-2">+ Add another option</button>
				</div>
			</div>
		</div>

		<!-- Right Column (Sidebar Settings) -->
		<div class="space-y-6">
			<!-- Product Status -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<h3 class="text-base font-medium text-gray-900 mb-4">Product status</h3>
				<select class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm py-2 px-3 mb-4">
					<option>Active</option>
					<option>Draft</option>
				</select>
				<p class="text-xs text-gray-500">This product will be hidden from all sales channels.</p>
			</div>

			<!-- Organization -->
			<div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
				<h3 class="text-base font-medium text-gray-900 mb-4">Product organization</h3>
				<div class="space-y-4">
					<div>
						<label class="block text-sm text-gray-700 mb-1">Product category</label>
						<select class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm py-2 px-3">
							<option>Apparel & Accessories > Clothing</option>
						</select>
					</div>
					<div>
						<label class="block text-sm text-gray-700 mb-1">Product type</label>
						<input type="text" placeholder="e.g. Abaya" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2">
					</div>
					<div>
						<label class="block text-sm text-gray-700 mb-1">Vendor</label>
						<input type="text" value="Abayiza" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2">
					</div>
					<div class="pt-2 border-t border-gray-200">
						<label class="block text-sm text-gray-700 mb-1">Collections</label>
						<input type="text" placeholder="Search for collections" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2 mb-2">
						<div class="flex flex-wrap gap-2">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
								Everyday Edit <button class="ml-1 text-gray-500 hover:text-gray-700">&times;</button>
							</span>
						</div>
					</div>
					<div class="pt-2 border-t border-gray-200">
						<label class="block text-sm text-gray-700 mb-1">Tags</label>
						<input type="text" placeholder="Find or create tags" class="block w-full border-gray-300 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm px-3 py-2">
					</div>
				</div>
			</div>
		</div>

	</div>

	<!-- Bottom Action Bar -->
	<div class="mt-8 border-t border-gray-200 pt-5 flex justify-end">
		<div class="flex space-x-3">
			<button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm">
				Discard
			</button>
			<button class="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm">
				Save
			</button>
		</div>
	</div>
</div>
