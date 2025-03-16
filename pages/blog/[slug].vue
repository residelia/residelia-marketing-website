<template>
    <div>
        <SectionsBlogPostContent :post="data" />
        <SectionsBlogPostKeepReading :content="keepReadingData"/>
    </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { useBlogStore } from "../../stores/blogStore";
import { singlePostQuery, keepReadingQuery } from "../../queries/contentQueries"


export default defineComponent({
  async setup() {
    // console.log("entering in blog post......")
    const blogStore = useBlogStore()
    const route = useRoute()

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

    return {
      blogStore,
      route,
      data,
      keepReadingData
      // menues: data._rawValue,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const menu = document.getElementById("main-menu");
      const header = document.getElementById("header");
      if (window.pageYOffset > 100) {
        menu.classList.add("scroll");
        header.classList.add("scroll");
      } else {
        menu.classList.remove("scroll");
        header.classList.remove("scroll");
      }
    },
  },
});
</script>