import { useNuxtApp } from "#app";

export const useTracking = () => {
  const nuxtApp = useNuxtApp();
  const { locale } = useI18n()

  // 🔹 Verifica si Segment está listo
  const isSegmentReady = () => !!nuxtApp.$segment;

  // 🔹 Rastreo de páginas (SPA)
  const trackPage = async (route:string, params:object) => {
    if(!isSegmentReady()) await new Promise(r => setTimeout(r, 300));
    if (isSegmentReady()) {
      nuxtApp.$segment.page(route,params);
      console.log("📍 Evento de página enviado");
      return true
    }
    return false
  };

  // 🔹 Rastreo de eventos personalizados
  const trackEvent = (eventName: string, properties = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.track(eventName, properties);
      console.log(`🎯 Evento "${eventName}" enviado:`, properties);
    }
  };

  // 🔹 Identificar Usuarios
  const identifyUser = (userId: string, traits = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.identify(userId, traits);
      console.log(`🆔 Usuario identificado: ${userId}`, traits);
    }
  };

  // 🔹 Agrupar Usuarios (ej. empresa/equipo)
  const groupUser = (groupId: string, traits = {}) => {
    if (isSegmentReady()) {
      nuxtApp.$segment.group(groupId, traits);
      console.log(`👥 Usuario agregado al grupo: ${groupId}`, traits);
    }
  };

  const handleClick = (link, isVideo) => {
    console.log("Click performed")
    console.log(link)
    let eventName = isVideo ? 'Video Clicked' : 'Link Clicked'
    let trackingData = {
        // url: link.link.slug.find(l => l._key === locale).value.current,
        category: 'Navigation',
        id: link.id,
        refererrer: location.window.refererrer,
        language: locale,
    };

    trackEvent(eventName, trackingData);
    trackMarketingEvent(eventName, trackingData);

    console.log(`🎯 Tracking: ${props.eventName} - ${props.url}`);
};


  return { handleClick, trackPage, trackEvent, identifyUser, groupUser };
};
