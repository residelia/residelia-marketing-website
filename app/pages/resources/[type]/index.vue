<template>
    <div>
      <SectionsProjectsSection1 :data="data" :resources="resources" />
      <BlogNewsletter />
      <!-- <SectionsProjectsSection3 /> -->
      <SectionsProjectsTestimonials :testimonials="data[0].testimonials" />
      <SectionsProjectsCallToAction :message="data[0].callToAction" />
  </div>
</template>

<script setup>
// [type]
// -- ebooks
// -- investment-pills
// -- templates
// -- trends
// -- videos-and-webinars
//
defineI18nRoute({
    paths: {
      en: '/resources/[type]',
      es: '/recursos/[type]'
    }
})

import { useMainStore } from '../../../../stores/mainStore';
import { pageQuery, resourcesListQuery } from '../../../../queries/contentQueries'

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})

// Mapping URL [type] slug → Sanity resource type field value
// El segmento [type] es el mismo en EN y ES (solo cambia el prefijo resources/recursos)
const TYPE_MAP = {
  'reports-whitepapers': 'reports',
  'infomes-whitepapers':  'reports',   // typo en slug ES de Sanity (informes → infomes)
  'investment-tips':     'tips',
  'tips-inversion':     'tips',
  'templates':           'template',
  'plantillas':           'template',
  'market-trends':              'trends',
  'tendencias-mercado':              'trends',
  'videos-webinars':     'video',    // EN y ES usan el mismo slug en Sanity
  'use-cases':           'useCase',
  'casos-de-uso':           'useCase',
}

const resources = await useSanityData({
  query: resourcesListQuery,
  params: {
    resourceType: TYPE_MAP[route.params.type] ?? null
  }
})


const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { type: data[0].slug.find(t => t._key === 'en').value.current.split('/').filter(Boolean).pop() },
  es: { type: data[0].slug.find(t => t._key === 'es').value.current.split('/').filter(Boolean).pop() }
})

// SEO
const datePublished = new Date(data[0].createdAt).toISOString()
useHead({
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  description: `${data[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// // Schema.org
// defineWebPage({
//   '@type': 'WebPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
//   name: `${data[0].title.find(l => l._key === locale.value).value}`,
//   image: `${data[0]?.hero?.image}`,
//   datePublished,
// })

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

</script>
