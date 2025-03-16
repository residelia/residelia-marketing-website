import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import { useMainStore } from "../stores/mainStore";


export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) return;

  const mainStore = useMainStore()
  const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'DE', 'FR', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI',  'ES', 'SE'];
  const userCountry = navigator.language;
  const dynamicMode = euCountries.includes(userCountry.toUpperCase()) ? 'opt-in' : 'opt-out';

  const config: CookieConsentConfig = {
    mode: dynamicMode,
    autoShow: true,
    hideFromBots: true,
    cookieName: 'cc_cookie', // 🔹 Nombre de la cookie que guarda el consentimiento
    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom left',
      },
      preferencesModal: {
        layout: 'box',
      },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^(_ga|_gid|_gat|ajs_|amplitude)/,
            },
          ],
          reloadPage: true
        },
      },
      marketing: {
        autoClear: {
          cookies: [
            {
              name: /^(_fbp|_fbc|_li_sugr|li_|_twitter_sess|guest_id)/,
            }
          ],
          reloadPage: true
        },
      },
    },

    language: {
      default: "es",
      translations: {
        es: {
          consentModal: {
            title: "🍪 ¡Tu privacidad es importante!",
            description:
              "Usamos cookies para mejorar tu experiencia en la web. Puedes personalizar tus preferencias.",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: "Aceptar sólo necesarias",
            showPreferencesBtn: "Personalizar",
          },
          preferencesModal: {
            title: "Preferencias de cookies",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: 'Rechazar todas',
            savePreferencesBtn: "Guardar preferencias",
            closeIconLabel: "Cerrar",
            sections: [
              {
                title: 'Cookie usage',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. For more details, refer to our <a href="#" class="cc__link">privacy policy</a>.',
              },
              {
                title: "Cookies estrictamente necesarias",
                description:
                  "Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.",
                linkedCategory: "necessary",
              },
              {
                title: "Cookies de analítica y rendimiento",
                description:
                  "Nos ayudan a entender cómo usas nuestra web y mejorarla (Google Analytics, Amplitude, Segment).",
                linkedCategory: "analytics",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    domain: "Dominio",
                    desc: "Descripción",
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: "google.com",
                      desc: "Google Analytics - Identifica a los usuarios únicos.",
                    },
                    {
                      name: "_ga_<container-id>",
                      domain: "google.com",
                      desc: "Google Analytics - Mantiene el estado de la sesión.",
                    },
                    {
                      name: "_gid",
                      domain: "google.com",
                      desc: "Google Analytics - Diferencia entre usuarios.",
                    },
                    {
                      name: "_gat",
                      domain: "google.com",
                      desc: "Google Analytics - Limita la tasa de solicitudes.",
                    },
                    {
                      name: "ajs_anonymous_id",
                      domain: "segment.com",
                      desc: "Segment - Identifica usuarios anónimos.",
                    },
                    {
                      name: "ajs_user_id",
                      domain: "segment.com",
                      desc: "Segment - Identifica usuarios autenticados.",
                    },
                    {
                      name: "amplitude_id_<project-id>",
                      domain: "amplitude.com",
                      desc: "Amplitude - Seguimiento de usuarios y sesiones.",
                    },
                  ],
                },
              },
              {
                title: "Cookies de marketing y publicidad",
                description:
                  "Se usan para publicidad personalizada (Meta, LinkedIn, X, TikTok).",
                linkedCategory: "marketing",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    domain: "Dominio",
                    desc: "Descripción",
                  },
                  body: [
                    {
                      name: "_fbp",
                      domain: "facebook.com",
                      desc: "Meta Pixel - Identifica usuarios para anuncios.",
                    },
                    {
                      name: "_fbc",
                      domain: "facebook.com",
                      desc: "Meta Pixel - Registra clics en anuncios.",
                    },
                    {
                      name: "_li_sugr",
                      domain: "linkedin.com",
                      desc: "LinkedIn - Identifica usuarios en LinkedIn.",
                    },
                    {
                      name: "li_gc",
                      domain: "linkedin.com",
                      desc: "LinkedIn - Guarda preferencias de cookies.",
                    },
                    {
                      name: "_twitter_sess",
                      domain: "twitter.com",
                      desc: "X Pixel - Autenticación de usuario.",
                    },
                    {
                      name: "guest_id",
                      domain: "twitter.com",
                      desc: "X Pixel - Seguimiento de visitantes.",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },

    onFirstConsent: () => {
      mainStore.showCookieLauncher();
      console.log('✅ Primer consentimiento:', CookieConsent.getUserPreferences().acceptedCategories);
      // handleConsent(CookieConsent.getUserPreferences());
    },

    onModalShow: () => {
      mainStore.hideCookieLauncher();
    },

    onModalHide: () => {
        mainStore.showCookieLauncher();
    },

    onConsent: ({ acceptedCategories }) => {
      if (acceptedCategories) {
        console.log('✅ Nuevo consentimiento aceptado:', CookieConsent.getUserPreferences().acceptedCategories)
        if (acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        // if (acceptedCategories.includes('marketing')) nuxtApp.$loadMarketing?.();
      } else {
        console.log('✅ Contamos con los consentimientos:', CookieConsent.getUserPreferences().acceptedCategories);
        if(CookieConsent.getUserPreferences().acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        // if(CookieConsent.getUserPreferences().acceptedCategories.includes('marketing')) nuxtApp.$loadMarketing?.();
      }
    },

    onChange: ({ changedCategories }) => {
      console.log('🔄 Cambio en categorías:', changedCategories);
      console.log('🔄 Accepted en categorías:', CookieConsent.getUserPreferences().acceptedCategories);
      console.log('🔄 Rejected en categorías:', CookieConsent.getUserPreferences().rejectedCategories);
      if (changedCategories.includes('analytics')) {
        if (CookieConsent.getUserPreferences().acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        else nuxtApp.$disableSegment?.();
      }

      if (changedCategories.includes('marketing')) {
        // if (CookieConsent.getUserPreferences().acceptedCategories.includes('marketing')) nuxtApp.$loadMarketing?.();
        // else nuxtApp.$disableMarketing?.();
      }
      reloadNuxtApp({force: true, persistState: true});
    },
  };

  mainStore.cookies.show = CookieConsent.getCookie() != null ? false : true
  await CookieConsent.run(config);

  return {
    provide: {
      CC: CookieConsent,
    },
  };
});