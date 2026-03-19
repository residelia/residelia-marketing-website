import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import { useMainStore } from '../../stores/mainStore';
import { cookieBannerQuery, cookieSettingsModalQuery } from '../../queries/helperQueries';
export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) return;

  const mainStore = useMainStore()
  const runtimeConfig = useRuntimeConfig();

  // Configuración del cliente de Sanity usando runtimeConfig (sin tokens hardcodeados)
  const { createClient } = await import('@sanity/client');
  const sanityClient = createClient({
    projectId: runtimeConfig.public.sanityProjectId,
    dataset: runtimeConfig.public.sanityDataset,
    token: runtimeConfig.public.sanityToken,
    useCdn: true,
  })

  const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'DE', 'FR', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI',  'ES', 'SE'];
  // navigator.language devuelve 'es-ES', 'de-DE', etc. — extraer solo el código de país
  const langTag = navigator.language;
  const countryCode = (langTag.split('-')[1] ?? langTag).toUpperCase();
  const dynamicMode = euCountries.includes(countryCode) ? 'opt-in' : 'opt-out';

  const cookieBannerData = await sanityClient.fetch(cookieBannerQuery);
  const cookieSettingsData = await sanityClient.fetch(cookieSettingsModalQuery);

  if (!cookieBannerData || !cookieSettingsData) {
    console.error('❌ No se pudo obtener la configuración de cookies desde Sanity');
    return;
  }

 
  const translations = {}
  const tableKeys = ['name', 'domain', 'desc']

  // console.log(cookieSettingsData[0].categories[2].cookiesTable.find(t => t._key === 'es').value.rows.slice(1).map(r => (r.cells.map((c, index) => ({ [tableKeys[index]]: c })).reduce((acc, current) => ({ ...acc, ...current }), {}))))
  mainStore.locales.forEach(locale => {
    translations[locale.localeCode] = {
      consentModal: {
        title: cookieBannerData[0].title.find(t => t._key === locale.localeCode).value,
        description: cookieBannerData[0].description.find(t => t._key === locale.localeCode).value,
        acceptAllBtn: cookieBannerData[0].acceptButton.find(t => t._key === locale.localeCode).value,
        acceptNecessaryBtn: cookieBannerData[0].rejectButton.find(t => t._key === locale.localeCode).value,
        showPreferencesBtn: cookieBannerData[0].settingsButton.find(t => t._key === locale.localeCode).value,
      },
      preferencesModal: {
        title: cookieSettingsData[0].title.find(t => t._key === locale.localeCode).value,
        acceptAllBtn: cookieSettingsData[0].acceptButton.find(t => t._key === locale.localeCode).value,
        acceptNecessaryBtn: cookieSettingsData[0].rejectButton.find(t => t._key === locale.localeCode).value,
        savePreferencesBtn: cookieSettingsData[0].saveButton.find(t => t._key === locale.localeCode).value,
        sections: cookieSettingsData[0].categories.map(s => ({
          title: s.title.find(t => t._key === locale.localeCode)?.value,
          description: s?.description?.find(t => t._key === locale.localeCode)?.value,
          linkedCategory: s?.code,
          cookieTable: {
            headers: s?.cookiesTable?.find(t => t._key === locale.localeCode)?.value.rows[0].cells.map((r, index) => ({ [tableKeys[index]]: r })).reduce((acc, current) => ({ ...acc, ...current }), {}),
            body: s?.cookiesTable?.find(t => t._key === locale.localeCode)?.value.rows.slice(1).map(r => (r.cells.map((c, index) => ({ [tableKeys[index]]: c })).reduce((acc, current) => ({ ...acc, ...current }), {})))
          }
        })),
      },
    }
  });

  // console.log(translations)

  const config: CookieConsentConfig = {
    mode: dynamicMode,
    autoShow: true,
    hideFromBots: true,
    cookieName: 'cc_cookie',   // 🔹 Nombre de la cookie que guarda el consentimiento
    cookieDomain: '.residelia.com', // 🔹 Dominio compartido con residelia.com
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
      autoDetect: 'browser',
      translations
    },

    onFirstConsent: () => {
      mainStore.showCookieLauncher();
      // console.log('✅ Primer consentimiento:', CookieConsent.getUserPreferences().acceptedCategories);
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
        // console.log('✅ Nuevo consentimiento aceptado:', CookieConsent.getUserPreferences().acceptedCategories)
        if (acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        if (acceptedCategories.includes('marketing')) nuxtApp.$loadMarketingPixels?.();
      } else {
        // console.log('✅ Contamos con los consentimientos:', CookieConsent.getUserPreferences().acceptedCategories);
        if(CookieConsent.getUserPreferences().acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        if(CookieConsent.getUserPreferences().acceptedCategories.includes('marketing')) nuxtApp.$loadMarketingPixels?.();
      }
    },

    onChange: ({ changedCategories }) => {
      // console.log('🔄 Cambio en categorías:', changedCategories);
      // console.log('🔄 Accepted en categorías:', CookieConsent.getUserPreferences().acceptedCategories);
      // console.log('🔄 Rejected en categorías:', CookieConsent.getUserPreferences().rejectedCategories);
      if (changedCategories.includes('analytics')) {
        if (CookieConsent.getUserPreferences().acceptedCategories.includes('analytics')) nuxtApp.$loadSegment?.();
        else nuxtApp.$disableSegment?.();
      }

      if (changedCategories.includes('marketing')) {
        if (CookieConsent.getUserPreferences().acceptedCategories.includes('marketing')) nuxtApp.$loadMarketingPixels?.();
        else nuxtApp.$disableMarketingPixels?.();
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