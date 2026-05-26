<template>
    <div>
        <SectionsTeamSection1 />
        <SectionsTeamSection2 />
        <SectionsTeamSection3 />
        <SectionsTeamSection4 />
    </div>
</template>

<script setup>
defineI18nRoute({
    paths: {
        en: '/team',
        es: '/equipo'
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

const pageTitle = data[0]?.title?.find(l => l._key === locale.value)?.value ?? 'Equipo - RESIDELIA'
const pageDesc = data[0]?.description?.find(l => l._key === locale.value)?.value ?? ''

definePageMeta({ bodyClass: 'navbar-dark' })
useHead({
    title: pageTitle,
    description: pageDesc,
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
