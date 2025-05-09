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


console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)

useHead({
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})

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
</script>