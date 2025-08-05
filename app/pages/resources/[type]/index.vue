<template>
    <div>
      <SectionsProjectsSection1 :data="data"/>
      <SectionsProjectsSection2 />
      <SectionsProjectsSection3 />
      <SectionsProjectsSection4 />
      <SectionsProjectsSection5 />
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
import { pageQuery } from '../../../../queries/contentQueries'

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
// console.log(route.path)
// console.log(data)
// console.log(data)
const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { type: data.value[0].slug.find(t => t._key === 'en').value.current.split('/').filter(Boolean).pop() },
  es: { type: data.value[0].slug.find(t => t._key === 'es').value.current.split('/').filter(Boolean).pop() }
})

// console.log(
//   "%cStop!",
//   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data)

// SEO
const datePublished = new Date(data.value[0].createdAt).toISOString()
useHead({
  title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data?.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data?.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data?.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  // will resolve to ISO 8601 format
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  image: `${data.value[0]?.hero?.image}`,
  datePublished,
})

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

</script>