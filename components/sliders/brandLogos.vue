<template>
    <div v-if="customers" class="brands-carousel-5">
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperMousewheel, SwiperScrollbar, SwiperThumbs]"
            :slides-per-view="2"
            :loop="true"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false
            }"
            :breakpoints="{
                400:{ slidesPerView:2 },
                600:{ slidesPerView:3 },
                900:{ slidesPerView:4, },
                1024:{ slidesPerView:5, },
            }"
        >

            <SwiperSlide v-for="customer in customers">
                <div class="brand-logo">
                    <img class="img-fluid theme-light align-self-center" :src="customer.logoBlack.url" :alt="customer.alt" style="max-height: 50px; min-height: 20px; object-fit: contain; -o-object-fit: contain;"/>
                    <!-- <img v-if="customer.logoWhite != null" class="img-fluid theme-dark" :src="customer.logoWhite.url" :alt="customer.alt" style="max-height: 100px; min-height: 80px; object-fit: contain; -o-object-fit: contain;" /> -->
                </div>
            </SwiperSlide>

        </Swiper>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    customers: Array
}>();
</script>