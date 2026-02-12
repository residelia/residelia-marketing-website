<template>
    <div v-if="customers" class="brands-carousel-5">
        <ClientOnly>
            <swiper
                :modules="[Autoplay, Grid, Mousewheel, Scrollbar, Thumbs]"
                :slides-per-view="2"
                :loop="true"
                :grid="{ rows: 2, fill: 'row' }"
                :space-between="60"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                :breakpoints="{
                    400:{ slidesPerView:2, grid:{ rows:2, fill:'row' } },
                    600:{ slidesPerView:3, grid:{ rows:2, fill:'row' } },
                    900:{ slidesPerView:4, grid:{ rows:2, fill:'row' } },
                    1024:{ slidesPerView:5, grid:{ rows:2, fill:'row' } }
                }"
            >
                <swiper-slide v-for="slide in customers" :key="slide._id">
                    <div class="brand-logo">
                        <img class="img-fluid theme-light align-self-center" :src="slide.logoBlack.url+'?fm=webp'" :alt="slide.alt" style="max-height: 50px; min-height: 15px; object-fit: contain; -o-object-fit: contain;"/>
                    </div>
                </swiper-slide>
            </swiper>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Grid, Mousewheel, Scrollbar, Thumbs } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import { ClientOnly } from '#components';

const props = defineProps<{
    customers: Array<any>
}>();

</script>