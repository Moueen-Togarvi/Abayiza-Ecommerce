import { env } from '$env/dynamic/private';
import { formatMoney } from '$lib/shared/money';

type NotificationOrder = {
	id: string;
	orderNumber: string;
	guestEmail?: string | null;
	totalAmount: number;
	subtotal: number;
	shippingCost: number;
	discountTotal: number;
	paymentMethod: string;
	shippingAddress: Record<string, unknown>;
	items: Array<{
		productName: string;
		variantColor?: string | null;
		variantSize?: string | null;
		quantity: number;
		priceAtPurchase: number;
	}>;
};

const escapeHtml = (value: unknown) =>
	String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');

const addressLine = (address: Record<string, unknown>) =>
	[
		`${address.firstName || ''} ${address.lastName || ''}`.trim(),
		address.addressLine1,
		address.addressLine2,
		address.city,
		address.postalCode,
		address.country,
		address.phone
	]
		.filter(Boolean)
		.map(String)
		.join(', ');

const renderOrderEmail = (order: NotificationOrder) => {
	const rows = order.items
		.map((item) => {
			const options = [item.variantColor, item.variantSize].filter(Boolean).join(' / ');
			return `
				<tr>
					<td style="padding: 10px 0; border-bottom: 1px solid #eee;">
						<strong>${escapeHtml(item.productName)}</strong><br />
						<span style="color: #667; font-size: 12px;">${escapeHtml(options || 'Abayiza')}</span>
					</td>
					<td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
					<td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${formatMoney(item.priceAtPurchase * item.quantity)}</td>
				</tr>
			`;
		})
		.join('');

	return `
		<div style="font-family: Arial, sans-serif; color: #14352d; max-width: 620px; margin: 0 auto;">
			<h1 style="font-size: 28px; margin: 0 0 8px;">Thank you for your order</h1>
			<p style="margin: 0 0 24px; color: #596c62;">Your Abayiza order has been received successfully.</p>
			<div style="background: #fbf9f2; border: 1px solid #eee7d8; padding: 18px; margin-bottom: 20px;">
				<p style="margin: 0 0 6px;"><strong>Order:</strong> ${escapeHtml(order.orderNumber)}</p>
				<p style="margin: 0 0 6px;"><strong>Payment:</strong> Cash on Delivery</p>
				<p style="margin: 0;"><strong>Total:</strong> ${formatMoney(order.totalAmount)}</p>
			</div>
			<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
				<thead>
					<tr>
						<th style="text-align: left; padding-bottom: 8px;">Item</th>
						<th style="text-align: center; padding-bottom: 8px;">Qty</th>
						<th style="text-align: right; padding-bottom: 8px;">Amount</th>
					</tr>
				</thead>
				<tbody>${rows}</tbody>
			</table>
			<p style="margin: 0 0 8px;"><strong>Shipping address</strong></p>
			<p style="margin: 0; color: #596c62;">${escapeHtml(addressLine(order.shippingAddress))}</p>
		</div>
	`;
};

const sendEmail = async (to: string, subject: string, html: string) => {
	const apiKey = env.RESEND_API_KEY;
	if (!apiKey || !to) return { skipped: true };

	const from = env.RESEND_FROM_EMAIL || 'Abayiza <onboarding@resend.dev>';
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to: [to],
			subject,
			html
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Resend email failed: ${response.status} ${body}`);
	}

	return response.json();
};

export const sendOrderNotifications = async (order: NotificationOrder) => {
	const customerEmail = order.guestEmail || '';
	const adminEmail = env.ORDER_NOTIFY_EMAIL || env.RESEND_NOTIFY_EMAIL || '';
	const html = renderOrderEmail(order);
	const subject = `Abayiza order ${order.orderNumber}`;

	const results = await Promise.allSettled([
		customerEmail ? sendEmail(customerEmail, subject, html) : Promise.resolve({ skipped: true }),
		adminEmail ? sendEmail(adminEmail, `New ${subject}`, html) : Promise.resolve({ skipped: true })
	]);

	for (const result of results) {
		if (result.status === 'rejected') {
			console.warn(result.reason);
		}
	}
};
