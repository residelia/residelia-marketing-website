<template>
    <section v-if="whyItMatters" id="lnk-why-it-matters" class="pt-100 ws-wrapper content-section">
        <div class="container">
            <div class="bc-1-wrapper bg--surface-100 bg--fixed r-16" >
                <div class="section-overlay">
                    <div class="row d-flex align-items-center">
                        <!-- TEXT BLOCK -->
                        <div class="col-md-6 order-last order-md-2">
                            <div class="txt-block left-column">
                                <span v-if="whyItMatters.overline" class="section-id">
                                    {{ t(whyItMatters.overline) }}
                                </span>
                                <h2 class="s-36 w-700">{{ t(whyItMatters.heading) }}</h2>
                                <div v-if="whyItMatters.body?.length" class="why-it-matters-body">
                                    <PortableText :value="whyItMatters.body" :components="serializers" />
                                </div>
                                <NuxtLink
                                    v-if="whyItMatters.showCta && t(whyItMatters.ctaText)"
                                    to="#resource-download-form"
                                    class="btn btn--theme hover--theme mt-25"
                                >
                                    {{ t(whyItMatters.ctaText) }}
                                </NuxtLink>
                            </div>
                        </div>
                        <!-- END TEXT BLOCK -->

                        <!-- IMAGE BLOCK -->
                        <div v-if="whyItMatters.image?.url" class="col-md-6 order-first order-md-1">
                            <div class="img-block right-column">
                                <img
                                    class="img-fluid r-10"
                                    :src="whyItMatters.image.url"
                                    :alt="whyItMatters.imageAlt ?? ''"
                                />
                            </div>
                        </div>
                        <!-- END IMAGE BLOCK -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import Link from '~/components/elements/Link.vue'
import InternalLink from '~/components/elements/InternalLink.vue'

const { locale } = useI18n()

defineProps<{
    whyItMatters: {
        overline?: Array<{ _key: string; value: string }>
        heading?: Array<{ _key: string; value: string }>
        showCta?: boolean
        ctaText?: Array<{ _key: string; value: string }>
        body?: Array<any>
        image?: { url: string }
        imageAlt?: string
    } | null
}>()

const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''

const serializers = {
    marks: {
        externalLink: Link,
        internalLink: InternalLink,
        'strike-through': (_: any, { slots }: any) => h('s', {}, slots.default?.()),
        highlight: (_: any, { slots }: any) => h('mark', {}, slots.default?.()),
    },
}
</script>
