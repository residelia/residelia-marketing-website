<template>
  <div class="blog-post wide-post" :class="{'wow fadeInUp': mounted}">
    <div class="row d-flex align-items-center">
      <!-- BLOG POST IMAGE -->
      <div class="col-md-6">
        <div class="blog-post-img">
          <img
            class="img-fluid r-16"
            :src="image.url ? image.url+'?fm=webp' : image"
            :alt="imageAlt"
          />
        </div>
      </div>
      <!-- BLOG POST TEXT -->
      <div class="col-md-6">
        <div class="blog-post-txt">
          <!-- Post Tag -->
          <span v-if="category" class="post-tag color--blue-400">{{ category.name ? category.name.find(l => l._key === locale).value : category.find(l => l._key === locale).value }}</span>
          <!-- Post Link -->
          <h3 class="s-38 w-700">
            <NuxtLink :to="slug">{{ title }}</NuxtLink>
          </h3>
          <!-- Text -->
          <p>{{ excerpt }}</p>
          <!-- Post Meta -->
          <div class="blog-post-meta mt-30">
            <ul class="post-meta-list ico-10">
              <li v-if="author"><p class="w-500">{{ author?.name ? author.name : author }}</p></li>
              <li v-if="author" class="meta-list-divider">
                <p><span class="flaticon-minus"></span></p>
              </li>
              <li><p>{{ $dayjs(publishedDate).format("MMMM D, YYYY") }}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- END BLOG POST TEXT -->
    </div>
    <!-- End row -->
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

defineProps<{
  slug: string,
  title: string,
  excerpt: string,
  image: Object,
  imageAlt: string,
  publishedDate: string,
  author?: Object,
  category: Object
}>();

const mounted = ref(false)
onMounted(() => { mounted.value = true })

</script>

<style></style>
