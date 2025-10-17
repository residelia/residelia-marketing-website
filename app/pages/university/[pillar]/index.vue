<template>
  <div>
    <SectionsUniversityPostContent :post="data" />
  </div>
</template>

<script setup>
import { useMainStore } from '../../../../stores/mainStore';
import { singlePillarQuery } from '../../../../queries/contentQueries'
// [pillar]
// -- [pillar-page]
// -- ...
//

defineI18nRoute({
    paths: {
      en: '/university/[pillar]',
      es: '/university/[pillar]'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
  query: singlePillarQuery,
  params: {
    pillar: route.params.pillar,
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})

console.log(
  "%cStop!",
  "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(route)
console.log(locale)
console.log(data)

const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { pillar: data.value[0].slug.split('/').filter(Boolean).pop()},
  es: { pillar: data.value[0].slug.split('/').filter(Boolean).pop() }
})


// SEO
const dateModified = new Date(data.value[0].updatedAt).toISOString()
const datePublished = new Date(data.value[0].createdAt).toISOString()
useHead({
  title: `${data.value[0].title} | RESIDELIA`,
  description: `${data.value[0].description}`,
  bodyAttrs: {
    class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data.value[0].title} | RESIDELIA`,
  ogTitle: `${data.value[0].title} | RESIDELIA`,
  description: `${data.value[0].description}`,
  ogDescription: `${data.value[0].description}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data.value[0].title}`,
  description: `${data.value[0].description}`,
  image: `${data.value[0].image}`,
  datePublished,
  dateModified,
});

defineArticle({
  '@type': 'Article',
  headline: `${data.value[0].title}`,
  description: `${data.value[0].description}`,
  image: `${data.value[0].image}`,
  author: {
    '@type': 'Organization',
    name: 'RESIDELIA',
  },
  datePublished,
  dateModified,
});

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data.value[0].title}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

</script>