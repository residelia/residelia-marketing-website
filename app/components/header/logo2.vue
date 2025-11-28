<template>
    <div id="mobile-menu" class="wsmobileheader clearfix">

      <!-- HEADER BLACK LOGO -->
      <div class="smllogo">
        <NuxtLink :to="$localePath('/')" class="logo-black" v-follow ><img src="/assets/images/residelia-logo-black.svg" alt="residelia-logo" /></NuxtLink>
      </div>
      <!-- HEADER WHITE LOGO -->
      <div class="smllogo">
        <NuxtLink :to="$localePath('/')" class="logo-white" v-follow ><img src="/assets/images/residelia-logo-white.svg" alt="residelia-logo" /></NuxtLink>
      </div>
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';

const mainStore = useMainStore()
const { locale } = useI18n()

function toggleMobileMenu() {
  // toggle body class "dark-mode"
  document.body.classList.toggle("wsactive");
}

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>
