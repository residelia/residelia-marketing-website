import { resolve } from "path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { useMainStore } from "./stores/mainStore";

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
    *[_type == "page"] {
      slug
    }
  `);

  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      slug,
      language
    }
  `);
  
  const pillars = await sanityClient.fetch(`
    *[_type == "pillar"] {
      slug,
      language,
      clusters[]->{
        slug,
        language
      }
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

  // Procesar los posts
  posts.forEach((post) => {
    if (post.slug?.current && post.language) {
      // Excluir el prefijo del idioma por defecto y evitar el doble '/'
      const route =
        post.language === defaultLocale
          ? `${post.slug.current}` // Sin prefijo para el idioma por defecto
          : `/${post.language}${post.slug.current}`; // Con prefijo para otros idiomas
      routes.push(route);
    } else {
      console.warn("Post sin slug válido o idioma:", post);
    }
  });

  // Procesar los pilares y clusters
  pillars.forEach((pillar) => {
    if (pillar.slug && pillar.language) {
      // URL del pilar
      const pillarRoute =
        pillar.language === defaultLocale
          ? `${pillar.slug.current}` // Sin prefijo para el idioma por defecto
          : `/${pillar.language}${pillar.slug.current}`; // Con prefijo para otros idiomas
      routes.push(pillarRoute);

      // URLs de los clusters asociados
      if (pillar.clusters) {
        pillar.clusters.forEach((cluster) => {
          if (cluster.slug && cluster.language === pillar.language) {
            const clusterRoute =
              cluster.language === defaultLocale
                ? `${cluster.slug.current}` // Sin prefijo para el idioma por defecto
                : `/${cluster.language}${cluster.slug.current}`; // Con prefijo para otros idiomas
            routes.push(clusterRoute);
          }
        });
      }
    }
  });

  return routes;
};


// Función para obtener las rutas para el sitemap
const fetchSitemapUrlsWithLocales = async () => {
  const sanityClient = createClient({
    projectId: "asqz10j2",
    dataset: "production",
    token: "skHqzduJvPr2TrtA3ugj1NEBAWvZkqY1jJgQWdZewbnyaJKuy5KGFECZLFNcVat0JD4xeWOpXDnzPzC0GDGgCb0JiKWJ2cIt0FplMbZJxLYicS3FNRwGwXEWlmWs4z1WRBrG6UinrlVgx9ehOJH8pVfkhIc3o90zcQQgpJ1c4DUzM61mmxWh", // Necesario para acceder a los slugs
    apiVersion: "2022-04-26",
    useCdn: false,
  });

  // Consulta para obtener las páginas y los posts
  const pages = await sanityClient.fetch(`
    *[_type == "page"] {
      slug,
      _updatedAt
    }
  `);

  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      slug,
      language,
      _updatedAt
    }
  `);

  const pillars = await sanityClient.fetch(`
    *[_type == "pillar"] {
      slug,
      language,
      _updatedAt,
      clusters[]->{
        slug,
        language,
        _updatedAt
      }
    }
  `);

  const urls = [];

  // Procesar las páginas
  pages.forEach((page) => {
    if (page.slug && Array.isArray(page.slug)) {
      page.slug.forEach((slug) => {
        if (slug && locales.includes(slug._key) && slug.value?.current) {
          // Excluir el prefijo del locale por defecto y evitar el doble '/'
          const url =
            slug._key === defaultLocale
              ? `${slug.value.current}` // Sin prefijo para el idioma por defecto
              : `/${slug._key}${slug.value.current}`; // Con prefijo para otros idiomas
          urls.push({
            url,
            lastmod: page._updatedAt,
          });
        }
      });
    } else {
      console.warn("Página sin slugs válidos:", page);
    }
  });

  // Procesar los posts
  posts.forEach((post) => {
    if (post.slug?.current && post.language) {
      // Excluir el prefijo del idioma por defecto y evitar el doble '/'
      const url =
        post.language === defaultLocale
          ? `${post.slug.current}` // Sin prefijo para el idioma por defecto
          : `/${post.language}${post.slug.current}`; // Con prefijo para otros idiomas
      urls.push({
        url,
        lastmod: post._updatedAt,
      });
    } else {
      console.warn("Post sin slug válido o idioma:", post);
    }
  });

  // Procesar los pilares y clusters
  pillars.forEach((pillar) => {
    if (pillar.slug && pillar.language) {
      // URL del pilar
      const pillarUrl =
        pillar.language === defaultLocale
          ? `${pillar.slug.current}` // Sin prefijo para el idioma por defecto
          : `/${pillar.language}${pillar.slug.current}`; // Con prefijo para otros idiomas
      urls.push({
        url: pillarUrl,
        lastmod: pillar._updatedAt,
      });

      // URLs de los clusters asociados
      if (pillar.clusters) {
        pillar.clusters.forEach((cluster) => {
          if (cluster.slug && cluster.language === pillar.language) {
            const clusterUrl =
              cluster.language === defaultLocale
                ? `${cluster.slug.current}` // Sin prefijo para el idioma por defecto
                : `/${cluster.language}${cluster.slug.current}`; // Con prefijo para otros idiomas
            urls.push({
              url: clusterUrl,
              lastmod: cluster._updatedAt,
            });
          }
        });
      }
    }
  });

  return urls;
};

// Ejecutar las funciones para obtener las rutas y URLs antes de exportar la configuración
const nitroRoutes = await fetchRoutesWithLocales();
const sitemapUrls = await fetchSitemapUrlsWithLocales();

export default defineNuxtConfig({
  target: "static",
  ssr: true,

  alias: {
    "@": resolve(__dirname, "/"),
  },

  routeRules: {
    '/**': { prerender: true }
  },

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
  ],

  // build: {
  //   transpile: ['@vuelidate/core']
  // },

  buildModules: ["@nuxtjs/sanity/module", "@nuxtjs/dotenv"],

  modules: [
  "@nuxtjs/sanity", [
    "@nuxtjs/google-fonts",
    {
      families: {
        "DM+Sans": {
          wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        Roboto: {
          wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        "Plus+Jakarta+Sans": {
          wght: [400, 500, 600, 700],
        },
        Inter: {
          wght: [400, 500, 600, 700, 800],
        },
        download: true,
        inject: true,
      },
    },
  ], "nuxt-swiper", [
    "vuetify-nuxt-module",
    {
      moduleOptions: {
        /* module specific options */
      },
      vuetifyOptions: {
        /* vuetify options */
      },
    },
  ], "@pinia/nuxt", "dayjs-nuxt", "@nuxtjs/i18n", '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'/*"@portabletext/vue"*/],

  site: {
    url: process.env.BASE_URL,
    name: "RESIDELIA - La plataforma de gestión de propiedades para profesionales",
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    name: "RESIDELIA - La plataforma de gestión de propiedades para profesionales",
    lastmod: new Date("YYYY-MM-DD"),
    path: "/sitemap.xml",
    i18n: true,
    gzip: true,
    urls: sitemapUrls,
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
    // optimizeDeps: {
    //   include: ['@vuelidate/core']
    // }
  },

  nitro: {
    // baseURL: process.env.BASE_URL,
    static: true,
    preset: 'aws-amplify',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: nitroRoutes,
      generateFallback: true,
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
      formWebhook: process.env.FORM_WEBHOOK,
      signUpWebhook: process.env.SIGNUP_WEBHOOK,
      baseUrl: process.env.BASE_URL,
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

  devtools: {
    timeline: {
      enabled: true,
    },
  },

  compatibilityDate: '2025-05-09'
});