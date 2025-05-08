<template>
    <div>
        <SectionsBlogPostContent :post="data" />
        <SectionsBlogPostKeepReading :content="keepReadingData"/>
    </div>
</template>

<script setup>
import { useBlogStore } from "../../stores/blogStore";
import { pillarQuery } from '../../queries/contentQueries'

defineI18nRoute({
    paths: {
      en: '/university',
      es: '/university'
    }
})

const route = useRoute();
const { locale } = useI18n()
const blogStore = useBlogStore()

const data = await useSanityData({
  query: pillarPageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})

useHead({
  title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data?.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data?.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data?.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data?.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
</script>