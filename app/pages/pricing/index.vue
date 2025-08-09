<template>
  <div>
    <SectionsPricingPlans :plans="data[0].plans"/>
    <SectionsPricingFeatureMatrix
      :matrixGeneral="data[0].priceTableGeneral"
      :matrixExplorer="data[0].priceTableExplorer"
      :matrixValuation="data[0].priceTableValuation"
      :matrixLegal="data[0].priceTableLegal"
      :matrixManagement="data[0].priceTableManagement"
      :matrixMaintenance="data[0].priceTableMaintenance"
      :matrixBroker="data[0].priceTableBroker"/>
    <SectionsPricingCustomers :customers="data[0].customers"/>
    <SectionsPricingTestimonials :testimonials="data[0].testimonials"/>
    <SectionsPricingCallToAction v-if="data[0].callToAction" :message="data[0].callToAction"/>
  </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';
import { pageQuery } from '../../../queries/contentQueries'


defineI18nRoute({
  paths: {
    en: '/pricing',
    es: '/precios'
  }
})

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

// console.log(
//   "%cStop!",
//   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data)

// SEO
const datePublished = new Date(data[0].createdAt).toISOString()
useHead({
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  description: `${data[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
    class: "navbar-dark scheme-residelia",
  },
});
useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value}`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
defineWebPage({
  // will resolve to ISO 8601 format
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale.value).value}`,
  image: `${data[0]?.hero?.image}`,
  datePublished,
})

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>
