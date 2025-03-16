import { useNuxtApp } from '#app';

export const useMarketingTracking = () => {
  const nuxtApp = useNuxtApp();

  const trackMarketingEvent = (eventName: string, properties = {}) => {
    // Google Ads (Google Tag Manager)
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...properties });
      console.log(`📢 Evento "${eventName}" enviado a Google Ads`);
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, properties);
      console.log(`📢 Evento "${eventName}" enviado a Meta Pixel`);
    }

    // LinkedIn Pixel
    if (window._linkedin_data_partner_ids) {
      console.log(`📢 Evento "${eventName}" enviado a LinkedIn Pixel`);
    }

    // Twitter/X Pixel
    if (window.twq) {
      window.twq('track', eventName, properties);
      console.log(`📢 Evento "${eventName}" enviado a Twitter/X Pixel`);
    }
  };

  return { trackMarketingEvent };
};