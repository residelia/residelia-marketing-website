<template>
    <div>
    <SectionsProjectDetailsSection1 :data="data" />
    <SectionsProjectDetailsSection2 />
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';
import { resourceQuery } from '../../../queries/contentQueries'

useHead({
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})
defineI18nRoute({
    paths: {
      en: '/resources/[type]/[resource]',
      es: '/recursos/[type]/[resource]'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
    query: resourceQuery,
    params: {
        type: route.params.type,
        slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
        language: locale.value
    }
})

// FIXME: para que se realice el cambio entre idiomas correctamente
// const setI18nParams = useSetI18nParams()
// setI18nParams({
//     en: { type: data.value[0].slug.find(t => t._key === 'en').value.current, resource:  },
//     es: { slug: data.value[0].slug.find(t => t._key === 'es').value.current, resource: },
// })

// console.log(
//         "%cStop!",
//         "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
//       );
// console.log(route)
// console.log(locale)
// console.log(data)

useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
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