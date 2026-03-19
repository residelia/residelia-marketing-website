<template>
  <section id="blog-page" class="pb-60 inner-page-hero blog-page-section">
    <div class="container">
      <SectionsBlogListingFeaturedPosts :posts="blogStore.posts?.filter(p => p.featured).slice(0,4)" />
      <SectionsBlogListingLatestPosts :posts="blogStore.allPostsSortedByDate.filter(t => !t.featured).slice(0,4)"/>
      <SectionsBlogListingAllPosts />

      <hr class="divider" />
      <BlogNewsletter />
    </div>
  </section>
</template>

<script setup>
import { reactive, defineComponent } from "vue";
import { useBlogStore } from "../../stores/blogStore";
import { pageQuery } from "../../queries/contentQueries";

const route = useRoute();
const { locale } = useI18n()
const blogStore = useBlogStore()

defineI18nRoute({
    paths: {
      en: '/',
      es: '/'
    }
})

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: '/blog',
    language: locale.value
  }
})

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

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

</script>
