<template>
    <section id="blog-1" class="bg--white-300 py-100 blog-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-50 w-700">{{ content[0]?.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="s-21 color--grey">{{ content[0]?.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- BLOG POST -->
                <div v-for="post in posts" class="col-md-6 col-lg-4">
                    <BlogPostCard :key="post._id" :slug="post.slug" :title="post.title" :excerpt="post.excerpt" :image="post.image" :imageAlt="post.imageAlt" :author="post.author" :publishedDate="post.publishedDate" :category="post.category" />
                </div>
                <!-- END BLOG POST -->
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </section>
</template>

<script lang="ts" setup>
import { useBlogStore } from "../../../stores/blogStore";

defineProps<{
    content?: Object
}>()

const { locale } = useI18n();
const blogStore = useBlogStore()
const posts = blogStore.allPostsSortedByDate.slice(0,3)
</script>