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
import { useBlogStore } from "../../stores/blogStore";

useHead({
  bodyAttrs: {
    class: "navbar-dark scheme-residelia",
  },
});

const blogStore = useBlogStore();
console.log(
  "%cAllPosts!",
  "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(blogStore.posts?.filter(p => p.featured))

</script>
