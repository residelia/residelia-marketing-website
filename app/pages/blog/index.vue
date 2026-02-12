<template>
  <section id="blog-page" class="pb-60 inner-page-hero blog-page-section">
    <div class="container">
      <SectionsBlogListingFeaturedPosts :posts="blogStore.posts?.filter(p => p.featured).slice(0,4)" />
      <SectionsBlogListingLatestPosts :posts="blogStore.allPostsSortedByDate.filter(t => !t.featured).slice(0,4)"/>
      <!-- <BlogSquarePostCard
        slug="/blog/single-post"
        title="Lipsum sodales sapien Martex aliquet blandit augue gravida posuere"
        excerpt="Aliqum mullam blandit vitae and tempor sapien and donec lipsum gravida porta undo velna dolor libero risus aliquet tempus posuere vitae tempor"
        video="'https://www.youtube.com/embed/GcMiYI1gWD4'"
        image="/assets/images/blog/post-10-img.jpg"
        imageAlt="video-preview"
        category="Video Tutorials"
        author="Martex Team"
        publishedDate="Feb 12, 2023"
        /> -->
      <SectionsBlogListingAllPosts />

      <hr class="divider" />
      <BlogNewsletter />
    </div>
  </section>
</template>

<script setup>
import { reactive, defineComponent } from "vue";
import { useBlogStore } from "../../../stores/blogStore";
import { pageQuery } from "../../../queries/contentQueries";

const route = useRoute();
const { locale } = useI18n()
const blogStore = useBlogStore()
const headerColor = 'navbar-light'
const textColor = 'color--dark'

defineI18nRoute({
    paths: {
      en: '/blog',
      es: '/blog'
    }
})

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})

// console.log(
//   "%cAllPosts!",
//   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(blogStore.posts?.filter(p => p.featured))
// console.log(data)
// console.log(blogStore)

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

// useServerSeoMeta({
//   title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
//   ogTitle: `${data.value[0].title.find(l => l._key === locale._value).value}`,
//   description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
//   ogDescription: `${data.value[0].description.find(l => l._key === locale._value).value}`,
//   ogImage: `${data.value[0]?.hero?.image}`,
//   twitterCard: 'summary_large_image',
// })

// // Schema.org
// defineWebPage({
//   '@type': 'WebPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
//   name: `${data.value[0].title.find(l => l._key === locale._value).value}`,
//   description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
// });

</script>
