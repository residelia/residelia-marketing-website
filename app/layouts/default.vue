<template>
    <div id="page" class="page font--dmsans">
        <HeaderNav />
        <div style="min-height: 100vh"><slot /></div>
        <LazyFooter />
    </div>
</template>

<script setup lang="ts">
import { useCanonical } from '~/composables/useCanonical'
import { useHtmlLang } from '~/composables/useHtmlLang'

useCanonical()
useHtmlLang()

const bodyClass = useBodyClass()
useHead({
    bodyAttrs: {
        class: computed(() => bodyClass.value)
    }
})
</script>

<style src="~/assets/css/color-scheme/residelia.scss" lang="scss"></style>
