<template>
    <div>
        <SectionsContactsHero :hero="data[0].hero"/>
        <!-- CONTACT FORM -->
        <FormsContact :reason="route?.query?.reason" :formData="formData[0]"/>
        <hr class="divider" />
        <!-- END CONTACT FORM -->
        <BlogNewsletter />
    </div>
</template>

<script setup lant="ts">
import { nextTick } from 'vue';
import { useMainStore } from '../../stores/mainStore';
import { pageQuery } from '../../queries/contentQueries';
import { formBlockQuery } from '../queries/helperQueries';


defineI18nRoute({
    paths: {
        en: '/contact',
        es: '/contactar'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const formData = await useSanityData({
    query: formBlockQuery,
    params: { formType: 'contact' },
});
const data = await useSanityData({
    query: pageQuery,
    params: {
        slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
        language: locale.value
    }
});

console.log(
    "%cStop!",
    "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(route)
console.log(locale)
console.log(data)

useHead({
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
    bodyAttrs: {
        class: "navbar-dark scheme-residelia theme--light",
    },
})


useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'ContactPage',
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