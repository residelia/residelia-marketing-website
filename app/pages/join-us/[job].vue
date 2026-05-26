<template>
    <div>
        <SectionsCareerRoleContent :job="data[0]"/>
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';
import { singleJobQuery } from '../../../queries/contentQueries'
import { useJobsStore } from '../../../stores/jobsStore';

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
if (data[0]) {
    setI18nParams({
        en: { job: data[0].slug.find(t => t._key === 'en').value.current.split('/').filter(Boolean).pop() },
        es: { job: data[0].slug.find(t => t._key === 'es').value.current.split('/').filter(Boolean).pop()}
    })
}

const jobName = data[0]?.name?.find(l => l._key === locale.value)?.value ?? ''

definePageMeta({ bodyClass: 'navbar-dark scheme-residelia' })
useHead({
    title: jobName,
})
useServerSeoMeta({
  title: jobName,
  ogTitle: jobName,
  description: jobName,
  ogDescription: jobName,
  ogImage: '',
  twitterCard: 'summary_large_image',
})

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  if (!data[0]) return
  trackPage('Page View', {
    title: jobName,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>
