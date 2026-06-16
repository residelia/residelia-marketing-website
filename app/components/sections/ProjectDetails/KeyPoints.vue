<template>
    <template v-if="keyPoints">
    <hr class="divider" />
    <section id="features-12" class="shape--bg shape--gr-surface-100 bg--fixed pt-100 features-section division mb-100">
        <div class="container">
            <div class="row d-flex align-items-center">
                <!-- TEXT BLOCK -->
                <div class="col-md-5 px-0">
                    <div class="txt-block left-column">
                        <span v-if="keyPoints.overline" class="section-id">{{ t(keyPoints.overline) }}</span>
                        <h2 class="s-36 w-700" v-html="balanceString(t(keyPoints.heading), 5)"></h2>
                        <p v-if="keyPoints.subHeading">{{ t(keyPoints.subHeading) }}</p>
                        <NuxtLink
                            v-if="keyPoints.showCta && t(keyPoints.ctaText)"
                            to="#resource-download-form"
                            class="btn btn--theme hover--theme mt-20"
                        >
                            {{ t(keyPoints.ctaText) }}
                        </NuxtLink>
                    </div>
                </div>
                <!-- END TEXT BLOCK -->

                <!-- POINTS WRAPPER -->
                <div class="col-md-7">
                    <div class="fbox-12-wrapper">
                        <div class="row">
                            <div v-for="(point, index) in keyPoints.points" :key="index" class="col-6">
                                <div
                                    :id="`fb-kp-${index + 1}`"
                                    class="fbox-12 bg--white-100 block-shadow r-12 mb-30"
                                    :class="{ 'mb-3': index % 2 === 0 }"
                                >
                                    <!-- Icon (optional) -->
                                    <div v-if="point.icon" class="fbox-ico ico-50">
                                        <div class="shape-ico color--theme-primary">
                                            <span v-if="!point.isMDI" :class="`flaticon-${point.icon}`"></span>
                                            <span v-else :class="point.icon" class="color--primary"></span>
                                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z" transform="translate(100 100)" />
                                            </svg>
                                        </div>
                                    </div>
                                    <!-- Text -->
                                    <div class="fbox-txt">
                                        <h6 class="s-22 w-700">{{ t(point.heading) }}</h6>
                                        <p v-if="point.subHeading" class="mt-3">{{ t(point.subHeading) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END POINTS WRAPPER -->
            </div>
        </div>
    </section>
    </template>
</template>

<script setup lang="ts">
const { locale } = useI18n()

withDefaults(defineProps<{
    keyPoints?: {
        overline?: Array<{ _key: string; value: string }>
        heading?: Array<{ _key: string; value: string }>
        subHeading?: Array<{ _key: string; value: string }>
        showCta?: boolean
        ctaText?: Array<{ _key: string; value: string }>
        points?: Array<{
            icon?: string
            isMDI?: boolean
            heading: Array<{ _key: string; value: string }>
            subHeading?: Array<{ _key: string; value: string }>
        }>
    } | null
}>(), { keyPoints: null })

const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''
</script>
