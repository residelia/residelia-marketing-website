<template>
  <div>
    <!-- Main Content -->
    <SectionsUniversityListingHero :hero="data[0].hero"/>
    <SectionsUniversityListingPillars :pillars="pillars"/>
    <SectionsUniversityListingReadingList :readings="clusters" />
    <hr class="container"/>

  </div>
</template>

<script setup>
import { useBlogStore } from "../../../stores/blogStore";
import { pillarsQuery, pageQuery } from '../../../queries/contentQueries';

const route = useRoute();
const { locale } = useI18n()
const blogStore = useBlogStore()
const textColor = 'color--dark'

defineI18nRoute({
    paths: {
      en: '/university',
      es: '/university'
    }
})

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})


const pillars = await useSanityData({
  query: pillarsQuery,
  params: {
    language: locale.value
  }
});

const clusters = pillars.flatMap(pillar => 
  (pillar.clusters || []).map(cluster => ({
    id: cluster._id,
    title: cluster.title,
    subTitle: cluster.subTitle,
    shortTitle: cluster.shortTitle,
    slug: cluster.slug.current,
    pillar: pillar.shortTitle, // Incluye el título del pilar al que pertenece el cluster
    updatedAt: cluster.updatedAt,
  }))
);

// console.log(
//   "%cStop!",
//   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data)
// console.log(pillars)
// console.log(clusters);

// SEO
const dateModified = new Date(data[0].updatedAt).toISOString();
const datePublished = new Date(data[0].createdAt).toISOString();
useHead({
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  description: `${data[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  image: `${data[0]?.hero?.image}`,
  hasPart: pillars.map((pillar) => ({
    '@type': 'Article',
    headline: pillar.title,
    description: pillar.description,
    url: `${process.env.BASE_URL}/university/${pillar.slug}`,
    image: pillar.image,
  })),
  datePublished,
  dateModified,
});

// tracking events
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>