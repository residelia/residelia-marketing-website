<template>
    <section id="how-to-steps" class="pt-100 pb-60 ct-04 content-section division">
        <div class="container">
            <div class="row d-flex align-items-center">
                <!-- PASOS -->
                <div :class="heroImage?.url ? 'col-md-6 order-last order-md-1' : 'col-lg-10 col-xl-9 mx-auto'">
                    <div class="txt-block left-column">
                        <h2 class="s-40 w-700 mb-40">{{ $t('howToHeading') }}</h2>
                        <div
                            v-for="(step, i) in localizedSteps"
                            :key="i"
                            class="cbox-2 process-step"
                        >
                            <!-- Número -->
                            <div class="ico-wrap">
                                <div class="cbox-2-ico bg--theme color--white">{{ i + 1 }}</div>
                                <span v-if="i < localizedSteps.length - 1" class="cbox-2-line"></span>
                            </div>
                            <!-- Texto -->
                            <div class="cbox-2-txt">
                                <h5 class="s-22 w-700">{{ step.name }}</h5>
                                <p :class="{ 'mb-0': i === localizedSteps.length - 1 }">{{ step.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- IMAGEN HERO (derecha) -->
                <div v-if="heroImage?.url" class="col-md-6 order-first order-md-2">
                    <div class="img-block right-column">
                        <img
                            class="img-fluid r-10"
                            style="max-height: 620px; "
                            :src="heroImage.url"
                            :alt="heroImageAlt ?? ''"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    howToSteps: Array<{
        name: Array<{ _key: string; value: string }>
        text: Array<{ _key: string; value: string }>
        imageUrl?: string
    }>
    heroImage?: { url: string } | null
    heroImageAlt?: string | null
}>()

const { locale } = useI18n()

const localizedSteps = computed(() =>
    props.howToSteps.map(step => ({
        name: step.name?.find((l: any) => l._key === locale.value)?.value ?? '',
        text: step.text?.find((l: any) => l._key === locale.value)?.value ?? '',
    }))
)
</script>
