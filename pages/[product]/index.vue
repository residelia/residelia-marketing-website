<template>
    <div>
      <SectionsProductHero :product="route.params.product" :hero="data[0].hero" :textColor="textColor"/>
      <SectionsProductStats v-if="data[0].stats" :stats="data[0].stats" />
      <SectionsProductProblem :problem="data[0].problem"/>
      <SectionsProductBenefits :benefits="data[0].benefits"/>
      <SectionsProductUseCases v-if="data[0].useCases" :useCases="data[0].useCases"/>
      <SectionsProductWorkflow :workflow="data[0].workflow"/>
      <SectionsProductSuite :suite="data[0].fullSuite"/> <!-- la suite completa -->
      <SectionsProductEnterprise :enterprise="data[0].enterprise"/>
      <SectionsProductCustomers :customers="data[0].customers"/>
      <SectionsProductTestimonials :testimonials="data[0].testimonials"/>
      <SectionsProductWaitlist v-if="data[0].hero.soon"/>
      <SectionsProductCallToAction v-else :message="data[0].callToAction"/>
    </div>
</template>

<script setup>
import { useMainStore } from '../../stores/mainStore';
import { pageQuery } from '../../queries/contentQueries'

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()
const headerColor = !["legal", "broker","explorer","valuation","management","maintenance"].includes(route.params.product) ? 'navbar-dark' : 'navbar-light'
const textColor = ["legal", "broker","explorer","valuation","management","maintenance"].includes(route.params.product) ? 'color--white' : 'color--dark'


const data = await useSanityData({
  query: pageQuery,
  params: {
      // slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
      slug: route.params.product,
      language: locale._value
  }
})
const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { product: data.value[0].slug.find(t => t._key === 'en').value.current },
  es: { product: data.value[0].slug.find(t => t._key === 'es').value.current }
})

// console.log(
//     "%cStop!",
//     "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale.value)
// console.log(data)

definePageMeta({
  layout: 'default'
})
useHead({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  bodyAttrs: {
      class: `${headerColor} scheme-residelia`
  },
})
useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'WebPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
//   name: `${data._value[0].title.find(l => l._key === locale._value).value}`,
//   image: `${data._value[0]?.hero?.image}`,
//   datePublished: new Date(2024, 10, 1)
// })

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
    path: route.fullPath,
    referralURL: document.referrer
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>