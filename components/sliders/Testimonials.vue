<template>
    <div v-if="testimonials" class="reviews-1-wrapper">
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperMousewheel, SwiperScrollbar, SwiperThumbs]"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false
            }"
            :breakpoints="{
                600:{ slidesPerView:2, loopedSlides:4 },
                920:{ slidesPerView:3, loopedSlides:5 },
            }"
        >
            <SwiperSlide v-for="testimonial in testimonials" :key="testimonial._id">
                <div class="review-1 bg--white-100 block-shadow r-08">
                    <!-- Quote Icon -->
                    <div class="review-ico ico-65"><span class="flaticon-quote"></span></div>
                    <!-- Text -->
                    <div class="review-txt">
                        <!-- Text -->
                        <p>{{ testimonial.testimonial.find(t => t._key === locale).value }}</p>
                        <!-- Author -->
                        <div class="author-data clearfix">
                            <!-- Avatar -->
                            <div v-if="testimonial.pic" class="review-avatar">
                                <img :src="testimonial.pic.url+'?fm=webp'" :alt="testimonial.image.alt" />
                            </div>
                            <!-- Data -->
                            <div class="review-author">
                                <h6 class="s-18 w-700">{{ testimonial.name }}</h6>
                                <p class="p-sm">{{ testimonial.company }}</p>
                            </div>
                        </div>
                        <!-- End Author -->
                    </div>
                    <!-- End Text -->
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    testimonials: Array
}>();
</script>