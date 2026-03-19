import { useNuxtApp } from '#app';

export const useMarketingTracking = () => {
  const nuxtApp = useNuxtApp();

  const trackMarketingEvent = (eventName: string, properties = {}) => {
    // Google Ads (Google Tag Manager)
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...properties, origin: 'website' });
      console.log(`📢 Evento "${eventName}" enviado a Google Ads`);
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, { event: eventName, ...properties, origin: 'website' });
      console.log(`📢 Evento "${eventName}" enviado a Meta Pixel`);
    }

    // LinkedIn Pixel — lintrk para eventos de conversión custom (Insight Tag auto-trackea page views)
    if ((window as any).lintrk && (properties as any).conversion_id) {
      (window as any).lintrk('track', { conversion_id: (properties as any).conversion_id });
      console.log(`📢 Evento "${eventName}" enviado a LinkedIn Pixel`);
    }

    // Twitter/X Pixel (API actual: twq('event', conversionId, props))
    if (window.twq) {
      window.twq('event', eventName, properties);
      console.log(`📢 Evento "${eventName}" enviado a Twitter/X Pixel`);
    }
  };

  return { trackMarketingEvent };
};