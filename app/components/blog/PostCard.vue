<template>
  <div class="blog-post mb-40 clearfix" :class="{'wow fadeInUp': mounted}">
    <!-- BLOG POST IMAGE -->
    <div class="blog-post-img mb-35">
      <img
        class="img-fluid r-16"
        :src="image?.url ? image.url+'?fm=webp' : image"
        :alt="imageAlt"
      />
    </div>
    <!-- BLOG POST TEXT -->
    <div class="blog-post-txt">
      <!-- Post Tag -->
      <span v-if="category" class="post-tag color--pink-400">{{ category.name ? category.name.find(l => l._key === locale).value : category.find(l => l._key === locale).value }}</span>
      <!-- Post Link -->
      <h6 class="s-20 w-700">
        <NuxtLink :to="slug" v-follow >{{ title }}</NuxtLink>
      </h6>
      <!-- Excerpt -->
      <p>{{ excerpt}}</p>
      <!-- Post Meta -->
      <div class="blog-post-meta mt-20">
        <ul class="post-meta-list ico-10">
          <li v-if="author"><p class="p-sm w-500">{{ author?.name ? author.name : author }}</p></li>
          <li v-if="author" class="meta-list-divider">
            <p><span class="flaticon-minus"></span></p>
          </li>
          <li><p class="p-sm">{{ $dayjs(publishedDate).format("MMMM D, YYYY") }}</p></li>
        </ul>
      </div>
    </div>
    <!-- END BLOG POST TEXT -->
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

defineProps<{
  slug: string,
  title: string,
  excerpt: string,
  image: Object,
  imageAlt?: string,
  publishedDate: string,
  author?: Object,
  category?: Object
}>();

const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<style></style>
