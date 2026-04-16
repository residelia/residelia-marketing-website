<template>
    <section class="widget-embed-section py-50">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div ref="widgetRoot" v-html="htmlWithoutScripts" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{ snippetCode: string }>()

const widgetRoot = ref<HTMLElement | null>(null)

// Strip <script> tags from the HTML rendered via v-html (they don't execute via v-html anyway)
const htmlWithoutScripts = computed(() =>
    props.snippetCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
)

onMounted(() => {
    const tmp = document.createElement('div')
    tmp.innerHTML = props.snippetCode
    tmp.querySelectorAll('script').forEach(orig => {
        const s = document.createElement('script')
        Array.from(orig.attributes).forEach(attr => s.setAttribute(attr.name, attr.value))
        if (!orig.src) s.textContent = orig.textContent ?? ''
        document.head.appendChild(s)
    })
})
</script>
