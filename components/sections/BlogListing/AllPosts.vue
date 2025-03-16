<template>
  <div>
    <!-- BLOG POSTS CATEGORY -->
    <div class="row">
      <div class="col">
        <div class="posts-category ico-20 wow fadeInUp">
          <h4 class="s-34 w-700">{{ $t('allPosts') }}<span class="flaticon-next"></span>
          </h4>
        </div>
      </div>
    </div>
    <!-- POSTS WRAPPER -->
    <div v-if="blogStore.loading" class="row justify-content-center mt-10 mb-40">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else-if="blogStore.error"></div>
    <div v-else class="posts-wrapper">
      <div class="row">
        <!-- BLOG POST -->
        <div v-for="post in blogStore.shownPosts" class="col-md-6 col-lg-4">
          <BlogPostCard :key="post._id" :slug="post.slug" :title="post.title" :excerpt="post.excerpt" :image="post.image" :imageAlt="post.imageAlt" :author="post.author" :publishedDate="post.publishedDate" :category="post.category" />
        </div>
        <!-- END BLOG POST -->
      </div>
      <!-- End row -->
      <div v-if="blogStore.posts.length > 0 && numPages > 0" class="row text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="blogStore.current"
                  :length="numPages"
                  class="my-4"
                  @next="handlePagination"
                  @prev="handlePagination"
                  @update:modelValue="handlePagination"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <!-- END POSTS WRAPPER -->
  </div>
</template>

<script lang="ts" setup>
import { useBlogStore } from '../../../stores/blogStore';

const blogStore = useBlogStore()
const numPages = Math.ceil(blogStore.posts.length / blogStore.limit)

console.log("posts length => "+blogStore.posts.length)
console.log("posts numPages => "+numPages)

blogStore.updatePosts()

function handlePagination(page: number) {
  blogStore.updatePosts()
}

</script>

<style></style>
