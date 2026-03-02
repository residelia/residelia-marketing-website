import { useNuxtApp } from "#app";
import { useMarketingTracking } from './useMarketingTracking';

export const useTracking = () => {
  const nuxtApp = useNuxtApp();
  const { locale } = useI18n()
  const { trackMarketingEvent } = useMarketingTracking()

  // 🔹 Verifica si Segment está listo
  const isSegmentReady = () => !!nuxtApp.$segment;

  // 🔹 Rastreo de páginas (SPA)
  const trackPage = async (route:string, params:object) => {
    if(!isSegmentReady()) await new Promise(r => setTimeout(r, 300));
    if (isSegmentReady()) {
      nuxtApp.$segment.page(route,{...params, origin: 'website' });
      console.log("📍 Evento de página enviado");
      return true
    }
    return false
  };

  // 🔹 Rastreo de eventos personalizados
  const trackEvent = (eventName: string, properties = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.track(eventName, {...properties, origin: 'website' });
      console.log(`🎯 Evento "${eventName}" enviado:`, {...properties, origin: 'website' });
    }
  };

  // 🔹 Identificar Usuarios
  const identifyUser = (userId: string, traits = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.identify(userId, {...traits, origin: 'website' });
      console.log(`🆔 Usuario identificado: ${userId}`, {...traits, origin: 'website' });
    }
  };

  // 🔹 Agrupar Usuarios (ej. empresa/equipo)
  const groupUser = (groupId: string, traits = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.group(groupId, {...traits, origin: 'website' });
      console.log(`👥 Usuario agregado al grupo: ${groupId}`, {...traits, origin: 'website' });
    }
  };

  const handleClick = (link, isVideo) => {
    const eventName = isVideo ? 'Video Clicked' : 'Link Clicked'
    const trackingData = {
        category: 'Navigation',
        id: link.id,
        referrer: document.referrer,
        language: locale.value,
    };

    trackEvent(eventName, trackingData);
    trackMarketingEvent(eventName, trackingData);
  };


  return { handleClick, trackPage, trackEvent, identifyUser, groupUser };
};
