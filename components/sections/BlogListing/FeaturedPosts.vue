<template>
  <div v-if="posts">
    <!-- WIDE BLOG POST -->
    <BlogWidePostCard
      :key="posts[0]._id"
      :slug="posts[0].slug"
      :title="posts[0].title"
      :excerpt="posts[0].excerpt"
      :image="posts[0].image"
      :imageAlt="posts[0].imageAlt"
      :author="posts[0].author"
      :publishedDate="posts[0].publishedDate"
      :category="posts[0].category"
    />
    <!-- END WIDE BLOG POST -->
    <!-- POSTS WRAPPER -->
    <div class="posts-wrapper">
      <div class="row">
        <!-- BLOG POST -->
        <div v-for="post in posts.slice(1)" class="col-md-6 col-lg-4">
          <BlogPostCard :key="post._id" :slug="post.slug" :title="post.title" :excerpt="post.excerpt" :image="post.image" :imageAlt="post.imageAlt" :author="post?.author" :publishedDate="post.publishedDate" :category="post.category" />
        </div>
        <!-- END BLOG POST -->
      </div>
    </div>
    <!-- END POSTS WRAPPER -->
  </div>
</template>

<script lang="ts" setup>
import { useBlogStore } from '../../../stores/blogStore';

const route = useRoute();
const { locale } = useI18n()

const props = defineProps<{
  posts: Array,
}>();

// console.log(props.posts)
</script>

<style></style>
