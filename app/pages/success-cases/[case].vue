<template>
    <div>
        <SectionsProjectDetailsSection1 />
        <SectionsProjectDetailsSection2 />
    </div>
</template>

<script setup>
defineI18nRoute({
    paths: {
        en: '/success-cases/[case]',
        es: '/casos-de-exito/[case]'
    }
})

import { pageQuery } from '../../../queries/contentQueries';
import { useMainStore } from '../../../stores/mainStore';

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
    query: pageQuery,
    params: {
        slug: route.fullPath,
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

useHead({
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
    bodyAttrs: {
        class: "navbar-dark"
    }
});
useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
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
