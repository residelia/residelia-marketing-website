import { resolve } from "path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config();

// Idiomas configurados en el proyecto
const locales = ["es", "en"]; // Asegúrate de que coincidan con los idiomas en tu configuración de i18n
const defaultLocale = "es"; // Define el locale por defecto

// Función para obtener las rutas internacionalizadas desde Sanity
const fetchRoutesWithLocales = async () => {
  const sanityClient = createClient({
    projectId: "asqz10j2",
    dataset: "production",
    token: "skHqzduJvPr2TrtA3ugj1NEBAWvZkqY1jJgQWdZewbnyaJKuy5KGFECZLFNcVat0JD4xeWOpXDnzPzC0GDGgCb0JiKWJ2cIt0FplMbZJxLYicS3FNRwGwXEWlmWs4z1WRBrG6UinrlVgx9ehOJH8pVfkhIc3o90zcQQgpJ1c4DUzM61mmxWh", // Necesario para acceder a los slugs
    apiVersion: "2022-04-26",
    useCdn: false,
  });

  // Consulta para obtener las páginas y los posts
  const pages = await sanityClient.fetch(`
    *[_type == "page" && !(_id in path('drafts.**'))] {
      slug
    }
  `);

  const resources = await sanityClient.fetch(`
    *[_type == "resource" && !(_id in path('drafts.**'))] {
      slug
    }
  `);

  const jobs = await sanityClient.fetch(`
    *[_type == "position" && !(_id in path('drafts.**')) && active == true] {
      slug
    }
  `);

  const routes = [];

  // Procesar las páginas
  pages.forEach((page) => {
    if (page.slug && Array.isArray(page.slug)) {
      page.slug.forEach((slug) => {
        if (slug && locales.includes(slug._key) && slug.value?.current) {
          // Excluir el prefijo del locale por defecto y evitar el doble '/'
          const route =
            slug._key === defaultLocale
              ? `${slug.value.current}` // Sin prefijo para el idioma por defecto
              : `/${slug._key}${slug.value.current}`; // Con prefijo para otros idiomas
          routes.push(route);
        }
      });
    } else {
      console.warn("Página sin slugs válidos:", page);
    }
  });

  // Procesar los resources (slug multilingüe como array)
  resources.forEach((resource) => {
    if (resource.slug && Array.isArray(resource.slug)) {
      resource.slug.forEach((slug) => {
        if (slug && locales.includes(slug._key) && slug.value?.current) {
          const route =
            slug._key === defaultLocale
              ? `${slug.value.current}`
              : `/${slug._key}${slug.value.current}`;
          routes.push(route);
        }
      });
    }
  });

  // Procesar los jobs (slug multilingüe como array)
  jobs.forEach((job) => {
    if (job.slug && Array.isArray(job.slug)) {
      job.slug.forEach((slug) => {
        if (slug && locales.includes(slug._key) && slug.value?.current) {
          const route =
            slug._key === defaultLocale
              ? `${slug.value.current}`
              : `/${slug._key}${slug.value.current}`;
          routes.push(route);
        }
      });
    }
  });

  return routes;
};


// Ejecutar las funciones para obtener las rutas y URLs antes de exportar la configuración
const nitroRoutes = await fetchRoutesWithLocales();

export default defineNuxtConfig({
  target: "static",
  ssr: true,

  devtools: { enabled: false },

  alias: {
    "@": resolve(__dirname, "/"),
  },

  // routeRules: {
  //   '/**': { prerender: true }
  // },

  app: {
    head: {
      pageTransition: { name: "page", mode: "out-in" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "og:type",
          content: "website",
        },
      ],
      title: "RESIDELIA - El software de gestión inmobiliaria todo en uno",
      script: [],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          type: "image/png",
          href: "/assets/images/favicons/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/assets/images/favicons/favicon.svg",
        },
        {
          rel: "manifest",
          href: "/assets/images/favicon.svg",
        },
        {
          rel: "mask-icon",
          href: "/assets/images/favicons/favicon.svg",
          color: "#000000",
        },
        {
          rel: "shortcut icon",
          href: "/assets/images/favicons/favicon.svg",
        },
      ],
    },
  },

  css: [
    "~/assets/css/vendors/bootstrap.min.css",
    "~/assets/css/vendors/flaticon.css",
    "~/assets/css/vendors/residelia-icons.css",
    "~/assets/css/vendors/menu.css",
    "~/assets/css/vendors/fade-down.css",
    "~/assets/css/vendors/magnific-popup.css",
    "~/assets/css/vendors/animate.css",
    "~/assets/css/main.scss",
    "~/assets/css/responsive.scss",
    "~/assets/css/color-scheme/blue.scss",
    "~/assets/css/color-scheme/residelia.scss",
    "~/assets/css/color-scheme/crocus.scss",
    "~/assets/css/color-scheme/green.scss",
    "~/assets/css/color-scheme/magenta.scss",
    "~/assets/css/color-scheme/pink.scss",
    "~/assets/css/color-scheme/skyblue.scss",
    "~/assets/css/color-scheme/violet.scss", 
    "vuetify/styles"
  ],

  // build: {
  //   transpile: ['@vuelidate/core']
  // },

  buildModules: [/*"@nuxtjs/sanity/module"*/ "@nuxtjs/dotenv"],

  modules: [
    [
    "@nuxtjs/google-fonts",
    {
      families: {
        "DM+Sans": {
          wght: [400, 500, 600, 700],
        },
        Roboto: {
          wght: [400, 500, 700],
        },
        "Plus+Jakarta+Sans": {
          wght: [400, 500, 600, 700],
        },
        Inter: {
          wght: [400, 500, 600, 700],
        },
        Montserrat: {
          wght: [400, 500, 600, 700],
        },
        Rubik: {
          wght: [400, 500, 600, 700],
        },
      },
      download: true,
      inject: true,
      preload: true,
      display: 'optional',
    },
  ], "@pinia/nuxt", "dayjs-nuxt", "@nuxtjs/i18n", '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],

  site: {
    url: process.env.BASE_URL || 'https://residelia.com',
    name: "RESIDELIA - La plataforma de gestión de propiedades para profesionales",
  },
  sitemap: {
    sitemaps: Object.fromEntries(
      [
        { locale: 'es-ES' },
        { locale: 'en-US' },
      ].flatMap(({ locale }) =>
        ([
          { name: 'pages',      changefreq: 'monthly', priority: 0.8 },
          { name: 'products',   changefreq: 'monthly', priority: 0.9 },
          { name: 'solutions',  changefreq: 'monthly', priority: 0.9 },
          { name: 'resources',  changefreq: 'monthly', priority: 0.6 },
          { name: 'jobs',       changefreq: 'weekly',  priority: 0.5 },
          { name: 'terms',      changefreq: 'yearly',  priority: 0.3 },
        ] as const).map(({ name, changefreq, priority }) => [
          `${locale}/${name}`,
          {
            sources: [`/api/sitemap/${locale}/${name}`],
            defaults: { changefreq, priority },
          },
        ])
      )
    ),
  },

  sanity: {
    projectId: process.env.SANITY_PROJECTID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2022-04-26",
    token: process.env.SANITY_TOKEN, // esto tiene que ir aquí porque si no falla el renderizado de las páginas y la navegación
    additionalClients: {
      preview: {
        useCdn: false,
        withCredentials: true,
      },
    },
  },

  dayjs: {
    locales: ["es", "en"],
    plugins: ["relativeTime", "utc", "timezone", "isSameOrBefore"],
    defaultLocale: "es",
    defaultTimezone: "Europe/Madrid",
  },

  segment: {
    writeKey: process.env.SEGMENT_WRITE_KEY,
    disabled: false,
    useRouter: true,
  },

  vite: {
    define: {
      "process.env.DEBUG": true,
    },
    ssr: {
      noExternal: ["@vuelidate/core", "vuetify"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // main.scss usa @import (legacy). Silenciamos el warning hasta que se
          // migre el archivo entero a @use (10k líneas, fuera de scope ahora).
          silenceDeprecations: ['import', 'legacy-js-api'],
        },
      },
    },
  },

  nitro: {
    // baseURL: process.env.BASE_URL,
    static: true,
    preset: 'aws-amplify',
    prerender: {
      routes: nitroRoutes,
      crawlLinks: true,
      failOnError: false,
    },
  },

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  i18n: {
    // vueI18n: "@/i18n/config.ts", // if you are using custom path, default
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    strategy: "prefix_except_default",
    locales: [
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],// when adding new languages, add locale here and create the new language in the Sanity Studio    defaultLocale: mainStore.defaultLocale?.localeCode,
    defaultLocale: "es",
    fallbackLocale: "en",
    dynamicRouteParams: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      // redirectOn: 'root', // recommended
      // redirectOnRoot: true // recommended
    },
  },

  runtimeConfig: {
    public: {
      googleRecaptchaKey: process.env.RECAPTCHA_SITE_KEY, // for example
      googleMapsPublicKey: process.env.GOOGLE_MAPS_PUBLIC_KEY,
      formWebhook: process.env.FORM_WEBHOOK,
      signUpWebhook: process.env.SIGNUP_WEBHOOK,
      newsletterWebhook: process.env.NEWSLETTER_WEBHOOK,
      // Futuro: supabaseCheckUrl y supabaseAnonKey cuando la Edge Function esté disponible
      // supabaseCheckUrl: process.env.SUPABASE_CHECK_USER_URL,
      // supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      baseUrl: process.env.BASE_URL || 'https://residelia.com',
      consent: {
        cookieName: 'cc_cookie', // 🔹 Especificamos la cookie de consentimiento
      },
      segmentWriteKey: process.env.SEGMENT_TRACKING_CODE,
      sanityProjectId: process.env.SANITY_PROJECTID,
      sanityDataset: process.env.SANITY_DATASET,
      apiVersion: "2022-04-26",
      sanityToken: process.env.SANITY_TOKEN, // esto tiene que ir aquí porque si no falla el renderizado de las páginas y la navegación
      linkedinPixelId: process.env.LINKEDIN_ID,
    },
  },

  // schemaOrg: {
  //   identity: 'Organization', // or 'Person'
  //   name: 'RESIDELIA',
  //   url: 'https://residelia.com',
  //   logo: 'https://s3.eu-west-1.amazonaws.com/residelia.resources/logos/residelia_logo_full.png'
  // },

  compatibilityDate: '2025-05-09'
});