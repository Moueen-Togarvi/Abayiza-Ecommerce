import prisma from '$lib/server/prisma';

type SettingValues = Record<string, string>;

export const defaultStoreSettings: SettingValues = {
	store_name: 'Abayiza',
	store_contact_email: 'contact@abayiza.com',
	sender_email: 'noreply@abayiza.com',
	support_phone: '923116857822',
	support_phone_secondary: '923346657779',
	whatsapp_catalog: 'https://wa.me/c/923116857822',
	whatsapp_order_number: '923116857822',
	whatsapp_order_number_secondary: '923346657779',
	timezone: 'Asia/Karachi',
	unit_system: 'metric',
	store_currency: 'PKR',
	default_country: 'Pakistan',
	free_shipping_threshold: '15000',
	cod_enabled: 'true',
	jazzcash_status: 'coming_soon',
	return_policy_days: '14',
	shipping_note: 'Free delivery over Rs. 15,000',
	order_notify_email: '',
	resend_from_email: ''
};

export const defaultStorefrontSettings: SettingValues = {
	hero_eyebrow: 'New Season Edit',
	hero_headline_phrases:
		'Premium Abayas\nLuxury Abayas\nNida Essentials\nModest Layers\nEid Sale Abayiza',
	hero_subheading:
		'Clean Nida silhouettes with soft movement, refined finishing, and everyday grace.',
	hero_primary_label: 'Shop Collection',
	hero_primary_href: '/shop',
	hero_secondary_label: 'View Lookbook',
	hero_secondary_href: '/lookbook',
	hero_images:
		'/ChatGPT%20Image%20May%2025,%202026,%2006_25_42%20PM.png\n/ChatGPT%20Image%20May%2025,%202026,%2006_25_51%20PM.png\n/ChatGPT%20Image%20May%2025,%202026,%2006_25_13%20PM.png\n/ChatGPT%20Image%20May%2025,%202026,%2006_07_28%20PM.png\n/ChatGPT%20Image%20May%2025,%202026,%2006_25_25%20PM.png',
	sale_tape_enabled: 'true',
	sale_tape_items: 'EID SALE\n30% OFF\nABAYIZA',
	sale_tape_speed: '18',
	show_featured_collections: 'true',
	show_ethos: 'true',
	show_new_arrivals: 'true',
	show_promise: 'true',
	show_most_loved: 'true',
	show_inventory: 'true'
};

const descriptions: Record<string, string> = {
	store_name: 'Store display name',
	store_contact_email: 'Public contact email',
	sender_email: 'Default sender email',
	support_phone: 'Customer support phone',
	support_phone_secondary: 'Secondary customer support phone',
	whatsapp_catalog: 'WhatsApp catalog URL',
	whatsapp_order_number: 'WhatsApp order support number',
	whatsapp_order_number_secondary: 'Secondary WhatsApp order support number',
	timezone: 'Store timezone',
	unit_system: 'Store measurement unit system',
	store_currency: 'Store currency',
	default_country: 'Default checkout country',
	free_shipping_threshold: 'Free shipping threshold',
	cod_enabled: 'Cash on delivery status',
	jazzcash_status: 'JazzCash availability status',
	return_policy_days: 'Return policy window in days',
	shipping_note: 'Shipping note shown by the store',
	order_notify_email: 'Admin order notification email',
	resend_from_email: 'Resend sender email',
	hero_eyebrow: 'Home hero eyebrow',
	hero_headline_phrases: 'Home hero typewriter phrases',
	hero_subheading: 'Home hero subheading',
	hero_primary_label: 'Home hero primary button label',
	hero_primary_href: 'Home hero primary button URL',
	hero_secondary_label: 'Home hero secondary button label',
	hero_secondary_href: 'Home hero secondary button URL',
	hero_images: 'Home hero slide image URLs',
	sale_tape_enabled: 'Home sale tape visibility',
	sale_tape_items: 'Home sale tape items',
	sale_tape_speed: 'Home sale tape animation speed',
	show_featured_collections: 'Home featured collections visibility',
	show_ethos: 'Home ethos section visibility',
	show_new_arrivals: 'Home new arrivals visibility',
	show_promise: 'Home promise section visibility',
	show_most_loved: 'Home most loved visibility',
	show_inventory: 'Home inventory section visibility'
};

export const getSettings = async (defaults: SettingValues) => {
	const keys = Object.keys(defaults);
	const rows = await prisma.storeSetting.findMany({
		where: { key: { in: keys } }
	});
	const values = { ...defaults };

	for (const row of rows) {
		values[row.key] = row.value;
	}

	return values;
};

export const saveSettings = async (values: SettingValues) => {
	await prisma.$transaction(
		Object.entries(values).map(([key, value]) =>
			prisma.storeSetting.upsert({
				where: { key },
				update: { value },
				create: {
					key,
					value,
					description: descriptions[key] || null
				}
			})
		)
	);
};

export const toLines = (value: string) =>
	value
		.split(/\r?\n/)
		.map((item) => item.trim())
		.filter(Boolean);

export const toBoolean = (value: string | undefined) => value === 'true' || value === 'on';

const heroPhrase = (value: string) => {
	if (value.includes('\\n')) return value.replaceAll('\\n', '\n');
	const words = value.trim().split(/\s+/);
	if (words.length <= 1) return value.trim();
	const midpoint = Math.ceil(words.length / 2);
	return `${words.slice(0, midpoint).join(' ')}\n${words.slice(midpoint).join(' ')}`;
};

export const publicStorefrontSettingsFromValues = (settings: SettingValues) => {
	return {
		heroEyebrow: settings.hero_eyebrow,
		heroHeadlinePhrases: toLines(settings.hero_headline_phrases).map(heroPhrase),
		heroSubheading: settings.hero_subheading,
		heroPrimaryLabel: settings.hero_primary_label,
		heroPrimaryHref: settings.hero_primary_href,
		heroSecondaryLabel: settings.hero_secondary_label,
		heroSecondaryHref: settings.hero_secondary_href,
		heroImages: toLines(settings.hero_images),
		saleTapeEnabled: toBoolean(settings.sale_tape_enabled),
		saleTapeItems: toLines(settings.sale_tape_items),
		saleTapeSpeed: Number(settings.sale_tape_speed) || 18,
		showFeaturedCollections: toBoolean(settings.show_featured_collections),
		showEthos: toBoolean(settings.show_ethos),
		showNewArrivals: toBoolean(settings.show_new_arrivals),
		showPromise: toBoolean(settings.show_promise),
		showMostLoved: toBoolean(settings.show_most_loved),
		showInventory: toBoolean(settings.show_inventory)
	};
};

export const getPublicStorefrontSettings = async () => {
	const settings = await getSettings(defaultStorefrontSettings);

	return publicStorefrontSettingsFromValues(settings);
};
