<template>
    <section class="resource-hero resource-hero--full">
        <div class="container" style="position: relative; z-index: 1;">

            <!-- Hero text — centrado, ancho limitado -->
            <div class="resource-hero__text-block">
                <p v-if="resource.heroOverline" class="resource-hero__eyebrow post-tag color--theme">
                    {{ t(resource.heroOverline) }}
                </p>
                <h1 class="resource-hero__title">{{ t(resource.title) }}</h1>
                <p v-if="resource.description" class="resource-hero__subtitle">
                    {{ t(resource.description) }}
                </p>
            </div>

            <!-- Widget — ancho completo, sin wrapper -->
            <div v-if="resource.snippetCode" ref="widgetRoot" v-html="htmlWithoutScripts" />

        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Array<any> }>()

const { locale } = useI18n()

const resource = computed(() => props.data?.[0] ?? {})
const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''

const widgetRoot = ref<HTMLElement | null>(null)

const htmlWithoutScripts = computed(() =>
    (resource.value.snippetCode ?? '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
)

onMounted(() => {
    if (!resource.value.snippetCode) return
    const tmp = document.createElement('div')
    tmp.innerHTML = resource.value.snippetCode
    tmp.querySelectorAll('script').forEach(orig => {
        const s = document.createElement('script')
        Array.from(orig.attributes).forEach(attr => s.setAttribute(attr.name, attr.value))
        if (!orig.src) s.textContent = orig.textContent ?? ''
        document.head.appendChild(s)
    })
})
</script>

<style scoped>
.resource-hero--full {
    padding: 180px 0 80px;
    background: linear-gradient(180deg, #f8f9fe 0%, #ffffff 60%);
    overflow: hidden;
}

/* Texto centrado con ancho máximo */
.resource-hero__text-block {
    text-align: center;
    max-width: 760px;
    margin: 0 auto 36px;
}

.resource-hero__eyebrow {
    margin-bottom: 16px !important;
}

.resource-hero__title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: #20252A;
    margin: 0 0 14px;
}

.resource-hero__subtitle {
    font-size: 1.125rem;
    line-height: 1.55;
    color: #4F575E;
    margin: 0;
}

</style>
