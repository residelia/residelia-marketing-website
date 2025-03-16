<template>
    <div>
        <SectionsSolutionHeroSignup v-if="data[0].pageType === 'signUp'" :hero="data[0].hero" :textColor="textColor" :color="data[0].headerColor"/>
        <SectionsSolutionHero v-else :hero="data[0].hero" :textColor="textColor" :color="headerColor"/>
        <SectionsSolutionCustomers :customers="data[0].customers" height="0"/>
        <SectionsSolutionBenefits :benefits="data[0].benefits" />
        <SectionsSolutionProblem :problem="data[0].problem"/>
        <SectionsSolutionWorkflow :workflow="data[0].workflow" />
        <SectionsSolutionDashboard :dashboard="data[0].dashboard"/>
        <SectionsSolutionSuite :suite="data[0].fullSuite"/> <!-- la suite completa -->
        <SectionsSolutionEnterprise :enterprise="data[0].enterprise"/>
        <SectionsSolutionTestimonials :testimonials="data[0].testimonials"/>
        <SectionsSolutionWaitlist v-if="data[0]?.hero?.soon"/>
        <SectionsSolutionCallToAction v-else :message="data[0].callToAction"/>
    </div>
</template>

<script setup>
import { pageQuery } from '../../queries/contentQueries';
import { useMainStore } from "../../stores/mainStore";

const route = useRoute();
const { locale } = useI18n();
const mainStore = useMainStore();
const runtimeConfig = useRuntimeConfig();

const data = await useSanityData({
    query: pageQuery,
    params: {
      // slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
      slug: route.params.segment,
      language: locale.value
    }
})

// console.log(
//     "%cStop!",
//     "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(runtimeConfig.public.baseUrl)
// console.log(route)
// console.log(locale)
// console.log(data)

// setting header and hero colors
const headerColor = data.value[0].headerColor === 'dark' ? 'navbar-light' : 'navbar-dark'
const textColor = data.value[0].headerColor === 'dark' ? 'color--white' : 'color--dark'

defineI18nRoute({
    paths: {
      en: '/solutions/[segment]',
      es: '/soluciones/[segment]'
    }
})

const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { segment: data.value[0].slug.find(t => t._key === 'en').value.current },
  es: { segment: data.value[0].slug.find(t => t._key === 'es').value.current }
})

useHead({
    title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
    description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
    bodyAttrs: {
        class: `${headerColor} scheme-residelia`
    },
})
useServerSeoMeta({
  title: `${data?.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data?.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data?.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// Schema.org
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'WebPage',
//   url: `${runtimeConfig.public.baseUrl}/${route.fullPath}`,
//   name: `${data.value[0].title.find(l => l._key === locale.value).value}`,
//   image: `${data.value[0]?.hero?.image}`,
//   datePublished: new Date(2024, 10, 1)
// })

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