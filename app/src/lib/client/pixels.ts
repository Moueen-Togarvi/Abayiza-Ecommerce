import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

declare global {
	interface Window {
		fbq?: (...args: any[]) => void;
		ttq?: {
			page?: () => void;
			track?: (event: string, payload?: Record<string, unknown>) => void;
		};
	}
}

export const metaPixelId = (env.PUBLIC_META_PIXEL_ID || '').trim();
export const tikTokPixelId = (env.PUBLIC_TIKTOK_PIXEL_ID || '').trim();

export function pixelsEnabled() {
	return Boolean(metaPixelId || tikTokPixelId);
}

export function trackPageView() {
	if (!browser) return;

	window.fbq?.('track', 'PageView');
	window.ttq?.page?.();
}

export function trackMetaEvent(event: string, payload?: Record<string, unknown>) {
	if (!browser) return;
	window.fbq?.('track', event, payload);
}

export function trackTikTokEvent(event: string, payload?: Record<string, unknown>) {
	if (!browser) return;
	window.ttq?.track?.(event, payload);
}

export function trackProductView(payload: Record<string, unknown>) {
	trackMetaEvent('ViewContent', payload);
	trackTikTokEvent('ViewContent', payload);
}

export function trackAddToCart(payload: Record<string, unknown>) {
	trackMetaEvent('AddToCart', payload);
	trackTikTokEvent('AddToCart', payload);
}

export function trackInitiateCheckout(payload: Record<string, unknown>) {
	trackMetaEvent('InitiateCheckout', payload);
	trackTikTokEvent('InitiateCheckout', payload);
}

export function trackPurchase(payload: Record<string, unknown>) {
	trackMetaEvent('Purchase', payload);
	trackTikTokEvent('CompletePayment', payload);
}
