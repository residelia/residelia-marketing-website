<template>
  <div>
    <!-- BLOG POSTS CATEGORY -->
    <div class="row">
      <div class="col">
        <div class="posts-category ico-20 wow fadeInUp">
          <h4 class="s-34 w-700">{{ $t('latestNews') }}<span class="flaticon-next"></span>
          </h4>
        </div>
      </div>
    </div>
    <!-- POSTS WRAPPER -->
    <div class="posts-wrapper">
      <div class="row">
        <!-- BLOG POST -->
        <div v-for="post in posts" class="col-md-6 col-lg-4">
          <BlogPostCard :key="post._id" :slug="post.slug" :title="post.title" :excerpt="post.excerpt" :image="post.image" :imageAlt="post.imageAlt" :author="post.author" :publishedDate="post.publishedDate" :category="post.category" />
        </div>
        <!-- END BLOG POST -->
      </div>
      <!-- End row -->
    </div>
    <!-- END POSTS WRAPPER -->
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  posts: Array,
}>();

</script>

<style></style>
