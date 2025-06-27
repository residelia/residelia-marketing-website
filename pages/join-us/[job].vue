<template>
    <div>
        <SectionsCareerRoleContent :job="data[0]"/>
    </div>
</template>

<script setup>
import { useMainStore } from '../../stores/mainStore';
import { singleJobQuery } from '../../queries/contentQueries'
import { useJobsStore } from '../../stores/jobsStore';

defineI18nRoute({
    paths: {
        en: '/join-us/[job]',
        es: '/unete-a-residelia/[job]'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()
const jobsStore = useJobsStore()

const data = await useSanityData({
    query: singleJobQuery,
    params: {
        slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
        language: locale.value
    }
})
const setI18nParams = useSetI18nParams()
setI18nParams({
    en: { job: data.value[0].slug.find(t => t._key === 'en').value.current.split('/').filter(Boolean).pop() },
    es: { job: data.value[0].slug.find(t => t._key === 'es').value.current.split('/').filter(Boolean).pop()}
})

// console.log(
//     "%cStop!",
//     "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data.value[0])

useHead({
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})
useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].excerpt.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].excerpt.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'ItemPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
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