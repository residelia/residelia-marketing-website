<template>
    <section class="resource-hero resource-hero--half">
        <!-- SVG blob decorativo (top-right) -->
        <svg class="resource-hero__blob" viewBox="0 0 600 600" aria-hidden="true">
            <path d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z"
                transform="translate(300 300) scale(3)" fill="#E4F3FF"/>
        </svg>

        <div class="container" style="position: relative; z-index: 1;">

            <!-- Grid: texto izquierda TOP-aligned + widget derecha -->
            <div class="resource-hero__grid">

                <!-- COLUMNA IZQUIERDA — siempre anclada al top -->
                <div class="resource-hero__copy">
                    <p v-if="resource.heroOverline" class="resource-hero__eyebrow post-tag color--theme">
                        {{ t(resource.heroOverline) }}
                    </p>
                    <h1 class="resource-hero__title">{{ t(resource.title) }}</h1>
                    <p v-if="resource.description" class="resource-hero__subtitle">
                        {{ t(resource.description) }}
                    </p>

                    <!-- Bullets -->
                    <ul v-if="bullets.length" class="resource-hero__bullets">
                        <li v-for="(bullet, i) in bullets" :key="i">
                            <span class="resource-hero__bullet-icon">
                                <v-icon size="11" color="#1680fb">mdi-check</v-icon>
                            </span>
                            <span>{{ t(bullet.text) }}</span>
                        </li>
                    </ul>
                </div>

                <!-- COLUMNA DERECHA — widget sin wrapper -->
                <div v-if="resource.snippetCode" ref="widgetRoot" v-html="htmlWithoutScripts" />

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Array<any> }>()

const { locale } = useI18n()

const resource = computed(() => props.data?.[0] ?? {})
const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''

const bullets = computed(() => resource.value.whatWillYouFind?.bullets ?? [])

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
.resource-hero--half {
    padding: 180px 0 80px;
    background: linear-gradient(180deg, #f8f9fe 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
}

.resource-hero__blob {
    position: absolute;
    top: -120px;
    right: -160px;
    width: 460px;
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
}

/* Grid TOP-aligned: el texto nunca se desplaza cuando el widget crece */
.resource-hero__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: start; /* NUNCA center */
}

.resource-hero__eyebrow {
    margin-bottom: 16px !important;
}

.resource-hero__title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #20252A;
    margin: 0 0 18px;
}

.resource-hero__subtitle {
    font-size: 1.125rem;
    line-height: 1.55;
    color: #4F575E;
    margin: 0 0 24px;
    max-width: 480px;
}

.resource-hero__bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.resource-hero__bullets li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: #4F575E;
}

.resource-hero__bullet-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #E4F3FF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
}

/* Responsive */
@media (max-width: 991px) {
    .resource-hero__grid {
        grid-template-columns: 1fr;
    }
    .resource-hero__blob {
        display: none;
    }
}
</style>
