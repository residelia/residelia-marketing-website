<template>
    <div v-if="images?.length" class="resource-preview-slider">
        <ClientOnly>
            <swiper
                :modules="[Navigation]"
                :slides-per-view="1"
                :loop="images.length > 1"
                :navigation="true"
                class="r-10"
            >
                <swiper-slide v-for="(img, i) in images" :key="i">
                    <img
                        :src="img.url"
                        :alt="img.alt ?? ''"
                        class="img-fluid w-100 r-10"
                        style="object-fit: contain; max-height: 520px;"
                    />
                </swiper-slide>
            </swiper>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ClientOnly } from '#components'

defineProps<{
    images: Array<{ url: string; alt?: string }>
}>()
</script>

<style>
.resource-preview-slider .swiper-button-next,
.resource-preview-slider .swiper-button-prev {
    color: var(--bs-primary, #0D6EFD);
    background: rgba(255,255,255,0.85);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.resource-preview-slider .swiper-button-next::after,
.resource-preview-slider .swiper-button-prev::after {
    font-size: 14px;
    font-weight: 700;
}
</style>
