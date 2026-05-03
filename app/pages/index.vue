<template>
  <div>
    <SectionsHomeHeroV2
      :hero="data[0].hero"
      :wf-steps="data[0].workflow?.wfSteps"
    />
    <SectionsHomeHighlights :features="data[0].features"/>
    <SectionsHomeProblemSectionV2 :problem="data[0].problem"/>
    <SectionsHomeCompetitivePosition :cp="data[0].competitivePositioning"/>
    <SectionsHomeAudienceSection :audiences="data[0].audiences"/>
    <!-- <SectionsHomeTractionSection
      :stats="data[0].stats"
      :customers="data[0].customers"
    /> -->
    <SectionsHomeStats :stats="data[0].stats" />
    <SectionsHomeCustomers :customers="data[0].customers" />
    <SectionsHomeLifecycleSectionV2 :workflow="data[0].workflow"/>
    <SectionsHomeTestimonials :testimonials="data[0].testimonials" />
    <SectionsHomeFinalCTADark :message="data[0].callToAction" />
  </div>
</template>

<script setup>
import { pageQuery } from '../../queries/contentQueries'

const route = useRoute()
const { locale } = useI18n()

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})

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
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale._value).value}`,
  image: `${data[0]?.hero?.image}`,
  datePublished: new Date()
})

const { trackPage } = useTracking()
const trackPageView = () => trackPage('Page View', {
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  path: route.fullPath,
})

onMounted(trackPageView)
watch(() => route.fullPath, trackPageView)
</script>
