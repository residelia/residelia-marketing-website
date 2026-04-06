<template>
    <div>
        <SectionsAboutHero :hero="data[0].hero" />
        <SectionsAboutMission :mission="data[0].mission" />
        <SectionsAboutStats :statistics="data[0].stats" />
        <!-- <SectionsAboutSection4 /> -->
        <SectionsAboutBenefits :benefits="data[0].benefits"/>
        <SectionsAboutPeople :people="data[0].people"/>
        <SectionsAboutSimpleFramed :whyUs="data[0].whyUs" />
        <SectionsAboutCustomers :customers="data[0].customers" />
        <SectionsAboutTestimonials :testimonials="data[0].testimonials"/>
        <!-- <SectionsAboutSection11 /> -->
        <BlogNewsletter />
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';
import { pageQuery } from '../../../queries/contentQueries'

defineI18nRoute({
    paths: {
        en: '/about-us',
      es: '/quienes-somos'
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
//     "%cStop!",
//     "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data)

definePageMeta({ bodyClass: 'navbar-dark scheme-residelia' })
useHead({
    title: `${data[0].title.find(l => l._key === locale._value).value}`,
    description: `${data[0].description.find(l => l._key === locale._value).value}`,
})

useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value}`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  // will resolve to ISO 8601 format
  '@type': 'AboutPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale.value).value}`,
  image: `${data[0]?.hero?.image}`,
})

defineOrganization({
  '@type': 'Organization',
  name: 'RESIDELIA',
  url: `${process.env.BASE_URL}`,
  logo: '/img/logos/logo_casa_negro.svg',
  sameAs: [
    'https://www.facebook.com/resideliacom',
    'https://x.com/resideliacom',
    'https://www.linkedin.com/company/residelia',
  ],
});

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