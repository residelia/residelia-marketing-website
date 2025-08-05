import { useScript } from "#imports";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const config = useRuntimeConfig();
  const SEGMENT_WRITE_KEY = config.public.segmentWriteKey;

  let segmentLoaded = false;

  const waitForSegment = (attempts = 10, interval = 500) => {
    return new Promise((resolve, reject) => {
      let tries = 0;

      const checkAnalytics = setInterval(() => {
        if (window.analytics) {
          clearInterval(checkAnalytics);
          resolve(true);
        } else if (tries >= attempts) {
          clearInterval(checkAnalytics);
          reject(new Error('❌ Segment no se inicializó correctamente después de múltiples intentos.'));
        }
        tries++;
      }, interval);
    });
  };

  // 🔹 Cargar Segment solo si el usuario da consentimiento
  const loadSegment = async () => {
    if (!SEGMENT_WRITE_KEY) {
      console.warn('⚠️ Segment Write Key no está configurado.');
      return;
    }

    if (segmentLoaded) {
      console.log('🔹 Segment ya está cargado.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://cdn.segment.com/analytics.js/v1/${SEGMENT_WRITE_KEY}/analytics.min.js`;
    script.async = true;
    script.id = 'segment-script';

    script.onload = async () => {
      try {
        await waitForSegment();
        console.log('✅ Segment cargado correctamente.');

        if (!nuxtApp.$segment) {
          Object.defineProperty(nuxtApp, '$segment', {
            get: () => window.analytics,
            configurable: true
          });
        }
        segmentLoaded = true;
      } catch (error) {
        console.error(error?.message || '❌ Error al cargar Segment');
      }
    };

    document.head.appendChild(script);
  };

  // 🔹 Desactivar Segment y eliminar cookies de analítica
  const disableSegment = () => {
    const script = document.getElementById('segment-script');
    if (script) {
      script.remove();
      console.log('❌ Segment desactivado y script eliminado.');
    }

    if (window.analytics) {
      window.analytics = undefined;
      segmentLoaded = false;
    }

    if (nuxtApp.$segment) {
      delete nuxtApp.$segment;
    }
  };

  // Exponer funciones en nuxtApp para su uso en cookieconsent.client.ts
  // nuxtApp.provide("segment", segment);
  nuxtApp.provide("loadSegment", loadSegment);
  nuxtApp.provide("disableSegment", disableSegment);
});
