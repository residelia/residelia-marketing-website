<template>
    <div>
        <SectionsBlogPostContent :post="data" />
        <SectionsBlogPostKeepReading :content="keepReadingData"/>
    </div>
</template>

<script setup lang="js">
import { reactive, defineComponent, onUnmounted } from "vue";
import { useBlogStore } from "../../stores/blogStore";
import { singlePostQuery, keepReadingQuery } from "../../queries/contentQueries"


const blogStore = useBlogStore();
const route = useRoute();


// console.log(
//         "%cStop!",
//         "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
//       );
// console.log(route)

const data = await useSanityData({
  query: singlePostQuery,
  params: { slug: route.path },
})
const keepReadingData = await useSanityData({
  query: keepReadingQuery,
  params: { type: 'latests' }
})

onMounted( () =>{
  window.addEventListener("scroll", handleScroll);
})
onUnmounted( () => {
  window.removeEventListener("scroll", handleScroll);
})

function handleScroll() {
  const menu = document.getElementById("main-menu");
  const header = document.getElementById("header");
  if (window.pageYOffset > 100) {
    menu.classList.add("scroll");
    header.classList.add("scroll");
  } else {
    menu.classList.remove("scroll");
    header.classList.remove("scroll");
  }
}

// SEO
useHead({
    title: `${data.value[0].title}`,
    description: `${data.value[0].description}`,
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})

useServerSeoMeta({
  title: `${data.value[0].title}`,
  ogTitle: `${data.value[0].title}`,
  description: `${data.value[0].description}`,
  ogDescription: `${data.value[0].description}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
const dateModified = new Date(data.value[0].updatedAt).toISOString()
const datePublished = new Date(data.value[0].publishedDate).toISOString()

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
    '@type': 'Person',
    name: `${data.value[0].author.name}`,
  },
  datePublished,
  dateModified,
});

</script>