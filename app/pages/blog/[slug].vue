<template>
    <div>
        <SectionsBlogPostContent :post="data" />
        <SectionsBlogPostKeepReading :content="keepReadingData"/>
    </div>
</template>

<script setup lang="js">
import { reactive, defineComponent, onUnmounted } from "vue";
import { useBlogStore } from "../../../stores/blogStore";
import { singlePostQuery, keepReadingQuery } from "../../../queries/contentQueries"

defineI18nRoute({
    paths: {
      en: '/blog/[slug]',
      es: '/blog/[slug]'
    }
})

const blogStore = useBlogStore();
const route = useRoute();
const { locale } = useI18n()


console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)

const data = await useSanityData({
  query: singlePostQuery,
  params: { 
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  },
})

const keepReadingData = await useSanityData({
  query: keepReadingQuery,
  params: { type: 'latests' }
})

// SEO
console.log(data)
const dateModified = new Date(data[0].updatedAt).toISOString();
const datePublished = new Date(data[0].publishedDate).toISOString();
useHead({
  title: `${data[0].title}`,
  description: `${data[0].metaDescription}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})

useServerSeoMeta({
  title: `${data[0].title}`,
  ogTitle: `${data[0].title}`,
  description: `${data[0].metaDescription}`,
  ogDescription: `${data[0].metaDescription}`,
  ogImage: `${data[0]?.image.url}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  '@type': 'Article',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title}`,
  description: `${data[0].description}`,
  image: `${data[0].image}`,
  datePublished,
  dateModified,
});

const author = data[0].author ? {
  '@type': 'Person',
  name: `${data[0].author.name}`,
} : null;
defineArticle({
  '@type': 'Article',
  headline: `${data[0].title}`,
  description: `${data[0].description}`,
  image: `${data[0].image}`,
  author,
  datePublished,
  dateModified,
});

</script>