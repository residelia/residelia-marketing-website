<template>
  <div>
    <SectionsUniversityPostContent :post="data" :otherReadings="pillar[0]?.clusters" :pillar="pillar[0]"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { singleClusterQuery, singlePillarQuery } from '../../../../queries/contentQueries'


const route = useRoute();
const { locale } = useI18n()

const data = await useSanityData({
  query: singleClusterQuery,
  params: {
    pillar: route.params.pillar,
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})
const pillar = await useSanityData({
  query: singlePillarQuery,
  params: {
    pillar: route.params.pillar,
    slug: `/university/${route.params.pillar}`,
    language: locale.value
  }
})

defineI18nRoute({
    paths: {
      en: '/university/[pillar]/[cluster]',
      es: '/university/[pillar]/[cluster]'
    }
})

// FIXME: para que se realice el cambio entre idiomas correctamente
// const setI18nParams = useSetI18nParams()
// setI18nParams({
//     en: { type: data.value[0].slug.find(t => t._key === 'en').value.current, resource:  },
//     es: { slug: data.value[0].slug.find(t => t._key === 'es').value.current, resource: },
// })

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale)
console.log(data)


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
    // title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>


<style scoped>
.university-layout {
  display: flex;
}
.sidebar {
  width: 20%;
}
.main {
  width: 60%;
}
.table-of-contents {
  width: 20%;
}
</style>