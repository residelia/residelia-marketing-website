<template>
  <div id="page" class="page font--dmsans">
      <HeaderNav2 />
      <slot />
  </div>
</template>

<script setup lang="ts">
import { useCanonical } from '~/composables/useCanonical'
import { useHtmlLang } from '~/composables/useHtmlLang'

useCanonical()
// call without pageLocales -> sets html lang and dir from current i18n locale
useHtmlLang()
</script>

<style src="~/assets/css/color-scheme/residelia.scss" lang="scss"></style>