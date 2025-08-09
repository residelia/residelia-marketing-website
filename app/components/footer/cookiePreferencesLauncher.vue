<template>
  <span class="cookie-fab show" @click="openCookiePreferences">
    <!-- <span class="cookie-fab" :class="{show: (mainStore.cookies.show && !$vuetify.display.xs)}" @click="openCookiePreferences"> -->
    <v-icon>mdi-cookie</v-icon>
  </span>
</template>

<script setup>
import { useMainStore } from "../../../stores/mainStore";

const mainStore = useMainStore()
const nuxtApp = useNuxtApp()

const openCookiePreferences = () => {
  if (nuxtApp.$CC) {
    nuxtApp.$CC.showPreferences();
  }
};
</script>

<style lang="scss">
.cookie-fab {
    display: block;
    position: fixed;
    bottom: -10px;
    left: 20px;
    width: 48px;
    height: 48px;
    line-height: 45px;
    background-color: #1778FB;
    color: #fff;
    border-radius: 100px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05);
    z-index: 999;
    text-align: center;
    opacity: 0;
    transition-duration: 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #1055B3;
    }
    &.show {
        opacity: 1;
        bottom: 20px;
        transition-duration: 0.2s;
    }
}
</style>