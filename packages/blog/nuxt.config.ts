import { resolve } from "path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config();

const locales = ["es", "en"];
const defaultLocale = "es";

// Solo fetchamos posts para el blog
const fetchPostRoutes = async () => {
  const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECTID || "asqz10j2",
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.SANITY_TOKEN,
    apiVersion: "2022-04-26",
    useCdn: false,
  });

  const posts = await sanityClient.fetch(`
    *[_type == "post" && !(_id in path('drafts.**'))] {
      slug,
      language
    }
  `);

  const routes: string[] = [];

  posts.forEach((post: any) => {
    if (post.slug?.current && post.language) {
      const route =
        post.language === defaultLocale
          ? post.slug.current
          : `/${post.language}${post.slug.current}`;
      routes.push(route);
    }
  });

  return routes;
};

const nitroRoutes = await fetchPostRoutes();

export default defineNuxtConfig({
  target: "static",
  ssr: true,

  alias: {
    "@": resolve(__dirname, "/"),
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
      title: "Blog de RESIDELIA - Gestión inmobiliaria",
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

  buildModules: [/*"@nuxtjs/sanity/module"*/ "@nuxtjs/dotenv"],

  modules: [
    [
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
  ], "@pinia/nuxt", "dayjs-nuxt", "@nuxtjs/i18n", '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],

  site: {
    url: process.env.BASE_URL || 'https://blog.residelia.com',
    name: "Blog de RESIDELIA - La plataforma de gestión de propiedades para profesionales",
  },

  // Sitemap solo con el grupo "blog"
  sitemap: {
    sitemaps: Object.fromEntries(
      [
        { locale: 'es-ES' },
        { locale: 'en-US' },
      ].flatMap(({ locale }) =>
        ([
          { name: 'blog', changefreq: 'weekly', priority: 0.7 },
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
    token: process.env.SANITY_TOKEN,
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
    }
  },

  nitro: {
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
    baseUrl: process.env.BASE_URL || "https://blog.residelia.com",
    strategy: "prefix_except_default",
    locales: [
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    defaultLocale: "es",
    fallbackLocale: "en",
    dynamicRouteParams: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
    },
  },

  runtimeConfig: {
    public: {
      googleRecaptchaKey: process.env.RECAPTCHA_SITE_KEY,
      formWebhook: process.env.FORM_WEBHOOK,
      signUpWebhook: process.env.SIGNUP_WEBHOOK,
      newsletterWebhook: process.env.NEWSLETTER_WEBHOOK,
      baseUrl: process.env.BASE_URL || 'https://blog.residelia.com',
      consent: {
        cookieName: 'cc_cookie',
        // IMPORTANTE: dominio compartido para que el consentimiento funcione
        // cross-subdomain con residelia.com
        cookieDomain: '.residelia.com',
      },
      segmentWriteKey: process.env.SEGMENT_TRACKING_CODE,
      sanityProjectId: process.env.SANITY_PROJECTID,
      sanityDataset: process.env.SANITY_DATASET,
      apiVersion: "2022-04-26",
      sanityToken: process.env.SANITY_TOKEN,
      linkedinPixelId: process.env.LINKEDIN_ID,
    },
  },

  compatibilityDate: '2025-05-09'
});
