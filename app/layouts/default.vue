<template>
    <div id="page" class="page font--dmsans">
        <HeaderNav />
        <slot />
        <LazyFooter />
    </div>
</template>

<script setup lang="ts">
import { useCanonical } from '~/composables/useCanonical'

useCanonical()
</script>

<style src="~/assets/css/color-scheme/residelia.scss" lang="scss"></style>
