<template>
    <div id="mobile-menu" class="wsmobileheader clearfix">

      <!-- HEADER BLACK LOGO -->
      <div class="smllogo">
        <NuxtLink :to="localePath('/')" class="logo-black" v-follow ><img src="/assets/images/residelia-logo-black.svg" alt="residelia-logo" /></NuxtLink>
      </div>
      <!-- HEADER WHITE LOGO -->
      <div class="smllogo">
        <NuxtLink :to="localePath('/')" class="logo-white" v-follow ><img src="/assets/images/residelia-logo-white.svg" alt="residelia-logo" /></NuxtLink>
      </div>

      <div class="color--theme">
        <NuxtLink
          v-if="mainStore.menu.showDemoAction && mainStore.menu.demoAction?.slug"
          :to="Array.isArray(mainStore.menu.demoAction.slug)
            ? localePath((mainStore.menu.demoAction.slug.find(l => l._key === locale)?.value?.current ?? '') + (mainStore.menu.demoAction?.queryString ?? ''))
            : mainStore.menu.demoAction.slug"
          class="s-14 w-600 wsanimated-arrow color--primary"
          style="padding: 0px 50px 0 0"
          @click="handleClick('Demo Request Started','header-mobile-demo-button')"
          v-follow
        >
          {{ mainStore.menu.demoAction?.linkText?.find(l => l._key === locale)?.value }}
        </NuxtLink>
        <!-- <a :href="localePath('/contactar')" class="s-14 w-600 wsanimated-arrow color--secondary-200" style="padding: 6px 50px 0 0">Pide tu Demo</a> -->
        <a id="wsnavtoggle" class="wsanimated-arrow" @click="mainStore.toggleMobileMenu">
            <span></span>
        </a>
      </div>
    </div>
</template>

<script setup>
import { useMainStore } from '../../../stores/mainStore';

const mainStore = useMainStore()
const { locale } = useI18n()
const localePath = useLocalePath()

function toggleMobileMenu() {
  // toggle body class "dark-mode"
  // mainStore.toggleMobileMenu();
  // console.log("watching mobile menu toggling.............")
  document.body.classList.toggle("wsactive");
}

watch(() => mainStore.menu.mobile.open, toggleMobileMenu);


function handleScroll() {
  const wsmenu = document.getElementById("mobile-menu");
  if (window.pageYOffset > 80 || document.body.scrollTop > 80) {
      wsmenu.classList.add("scroll");
  } else {
      wsmenu.classList.remove("scroll");
  }
};

onMounted(() => {
  window.addEventListener("touchmove", handleScroll);
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("touchmove", handleScroll);
    window.removeEventListener("scroll", handleScroll);
  }
});

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
