<template>
  <!-- SQUARE BLOG POST -->
  <div class="blog-post square-post">
    <div class="row">
      <div class="col">
        <!-- SQUARE BLOG POST WRAPPER -->
        <div class="square-post-wrapper bg--black-400 block-shadow r-16 wow fadeInUp">
          <div class="row d-flex align-items-center">
            <!-- BLOG POST TEXT -->
            <div class="col-md-6 order-last order-md-2">
              <div class="blog-post-txt color--white">
                <!-- Post Tag -->
                <span class="post-tag color--pink-400">{{ category }}</span>
                <!-- Post Link -->
                <h4 class="s-34 w-700 mb-20">
                  <NuxtLink :to="slug">{{ title }}</NuxtLink>
                </h4>
                <!-- Text -->
                <p>{{ excerpt }}</p>
                <!-- Post Meta -->
                <div class="blog-post-meta mt-30">
                  <ul class="post-meta-list ico-10">
                    <li><p class="w-500">{{ author }}</p></li>
                    <li class="meta-list-divider">
                      <p><span class="flaticon-minus"></span></p>
                    </li>
                    <li><p>{{ $dayjs(publishedDate).format("MMMM D, YYYY") }}</p></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- BLOG POST IMAGE -->
            <div class="col-md-6 order-first order-md-2">
              <div class="blog-post-img video-preview">
                <!-- Play Icon -->
                <ElementsVideoModal :link="video">
                  <template v-slot:button>
                    <div class="video-btn video-btn-xl bg--pink-400 ico-90">
                      <div class="video-block-wrapper">
                        <span class="flaticon-play-button"></span>
                      </div>
                    </div>
                  </template>
                </ElementsVideoModal>
                <!-- Preview Image -->
                <img
                  class="img-fluid"
                  :src="image"
                  :alt="imageAlt"
                />
              </div>
            </div>
          </div>
          <!-- End row -->
        </div>
        <!-- END SQUARE BLOG POST WRAPPER -->
      </div>
    </div>
    <!-- End row -->
  </div>
  <!-- END SQUARE BLOG POST -->
</template>

<script lang="ts" setup>
defineProps<{
  slug: string,
  title: string,
  excerpt: string,
  image: string,
  imageAlt: string,
  video: string,
  publishedDate: string,
  author: string,
  category: string
}>();
</script>

<style></style>
