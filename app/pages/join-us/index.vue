<template>
    <div>
        <SectionsCareersSection1 />
        <SectionsCareersSection2 />
        <SectionsCareersSection3 />
        <SectionsCareersSection4 />
        <SectionsCareersSection5 />
        <SectionsCareersSection6 :jobs="jobsStore.jobs"/>
        <SectionsCareersSection7 />
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';
import { pageQuery, jobsQuery } from '../../../queries/contentQueries'
import { useJobsStore } from '../../../stores/jobsStore';

defineI18nRoute({
    paths: {
        en: '/join-us',
        es: '/unete-a-residelia'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()
const jobsStore = useJobsStore()

const data = await useSanityData({
    query: pageQuery,
    params: {
        slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
        language: locale.value
    }
})

definePageMeta({ bodyClass: 'navbar-light scheme-residelia' })
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
