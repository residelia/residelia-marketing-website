<template>
    <section v-if="whatWillYouFind?.bullets?.length" class="pt-80 pb-60 ct-04 content-section division">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-12 mb-30">
                    <h2 class="s-32 w-700 mb-10">
                        {{ whatWillYouFind.heading ? t(whatWillYouFind.heading) : $t('whatWillYouFind') }}
                    </h2>
                </div>

                <!-- BULLETS (izquierda) -->
                <div class="col-md-6 order-last order-md-1">
                    <div class="txt-block left-column">
                        <div
                            v-for="(item, index) in whatWillYouFind.bullets"
                            :key="index"
                            class="cbox-2 process-step"
                        >
                            <div class="ico-wrap">
                                <div class="cbox-2-ico bg--theme color--white">{{ index + 1 }}</div>
                                <span v-if="index + 1 < whatWillYouFind.bullets.length" class="cbox-2-line"></span>
                            </div>
                            <div class="cbox-2-txt">
                                <p class="s-17 w-600 mb-0">{{ t(item.text) }}</p>
                            </div>
                        </div>
                        <NuxtLink
                            v-if="whatWillYouFind.showCta && t(whatWillYouFind.ctaText)"
                            to="#resource-download-form"
                            class="btn btn--theme hover--theme mt-25"
                        >
                            {{ t(whatWillYouFind.ctaText) }}
                        </NuxtLink>
                    </div>
                </div>
                <!-- END BULLETS -->

                <!-- SLIDER (derecha) -->
                <div class="col-md-6 order-first order-md-2">
                    <SlidersResourcePreview v-if="whatWillYouFind.previewImages?.length" :images="whatWillYouFind.previewImages" />
                </div>
                <!-- END SLIDER -->

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

defineProps<{
    whatWillYouFind: {
        heading?: Array<{ _key: string; value: string }>
        showCta?: boolean
        ctaText?: Array<{ _key: string; value: string }>
        bullets?: Array<{ text: Array<{ _key: string; value: string }> }>
        previewImages?: Array<{ url: string; alt?: string }>
    }
}>()

const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''
</script>
