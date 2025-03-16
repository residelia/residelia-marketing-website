<template>
  <div id="main-menu" class="wsmainfull menu">
    <div class="wsmainwp d-flex align-items-stretch justify-content-between">
      <div class="d-flex align-items-stretch">
        <!-- HEADER BLACK LOGO -->
        <div class="desktoplogo align-self-center">
          <NuxtLink :to="localePath('/')" class="logo-black"><img src="/assets/images/residelia-logo-black.svg" alt="residelia-logo" /></NuxtLink>
        </div>
        <!-- HEADER WHITE LOGO -->
        <div class="desktoplogo">
          <NuxtLink :to="localePath('/')" class="logo-white"><img src="/assets/images/residelia-logo-white.svg" alt="residelia-logo" /></NuxtLink>
        </div>
      </div>
      <!-- MAIN MENU -->
      <!-- END MAIN MENU -->
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '../../stores/mainStore'

const mainStore = useMainStore()
const localePath = useLocalePath()
const route = useRoute()
const { locale } = useI18n()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}

</script>