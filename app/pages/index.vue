<template>
  <div>
    <SectionsHomeHero3 :hero="data[0].hero" :textColor="textColor" :customers="data[0].customers"/>
    <!-- <SectionsHomeCustomers :customers="data[0].customers" /> -->
    <!-- <SectionsHomeRatings /> -->
    <SectionsHomeHighlights :features="data[0].features"/>
    <SectionsHomePain :painAndSolution="data[0].painAndSolution"/>
    <!-- <SectionsHomeAllInOne /> -->
    <SectionsHomeProblem :problem="data[0].problem"/>
    <SectionsHomeWorkflow :workflow="data[0].workflow" />
    <SectionsHomeSuite :suite="data[0].fullSuite"/>
    <SectionsHomeTestimonials :testimonials="data[0].testimonials" />
    <SectionsHomeCallToAction :message="data[0].callToAction" />
  </div>
</template>

<script setup>
import { useMainStore } from '../../stores/mainStore';
import { homeQuery, pageQuery } from '../../queries/contentQueries'

const route = useRoute()
const { locale } = useI18n()
const mainStore = useMainStore()
const headerColor = !["legal", "broker","explorer","valuation","management","maintenance"].includes(route.params.product) ? 'navbar-dark' : 'navbar-light'
const textColor = ["legal", "broker","explorer","valuation","management","maintenance"].includes(route.params.product) ? 'color--white' : 'color--dark'

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

definePageMeta({ bodyClass: 'navbar-dark scheme-residelia theme--light' })
useHead({
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  description: `${data[0].description.find(l => l._key === locale._value).value}`,
});
useServerSeoMeta({
  title: `RESIDELIA - ${data[0].title.find(l => l._key === locale.value).value}`,
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
  name: `${data[0].title.find(l => l._key === locale._value).value}`,
  image: `${data[0]?.hero?.image}`,
  datePublished: new Date()
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