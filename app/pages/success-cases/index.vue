<template>
    <div>
        <SectionsProjectsSection1 :data="data ?? []" :resources="[]" />
        <SectionsProjectsSection2 />
        <SectionsProjectsSection3 />
        <SectionsProjectsSection4 />
        <SectionsProjectsSection5 />
    </div>
</template>

<script setup>
defineI18nRoute({
    paths: {
        en: '/success-cases',
        es: '/casos-de-exito'
    }
})

import { pageQuery } from '../../../queries/contentQueries';
import { useMainStore } from "../../../stores/mainStore";


const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()


const data = await useSanityData({
    query: pageQuery,
    params: {
        slug: route.fullPath.startsWith(`/${locale.value}`) ? route.fullPath.slice(`/${locale.value}`.length) || '/' : route.fullPath,
        language: locale.value
    }
})

const pageTitle = data[0]?.title?.find(l => l._key === locale.value)?.value ?? 'Casos de Éxito - RESIDELIA'
const pageDesc = data[0]?.description?.find(l => l._key === locale.value)?.value ?? ''

useHead({
    title: pageTitle,
    description: pageDesc,
    bodyAttrs: {
        class: "navbar-dark"
    },
})
useServerSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDesc,
  ogDescription: pageDesc,
  ogImage: `${data[0]?.hero?.image ?? ''}`,
  twitterCard: 'summary_large_image',
})

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: pageTitle,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

</script>
