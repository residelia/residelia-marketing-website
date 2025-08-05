<template>
    <header id="header" class="tra-menu white-scroll">
        <div class="header-wrapper">
            <HeaderLogo />
            <HeaderMenu />
            <!-- <HeaderDarkLightToggle /> -->

            <!-- READING PROGRESS BAR FOR POSTS -->
            <v-progress-linear v-if="mainStore.readingBar" :active="scrollPosition > 0" color="red-darken-2"  :model-value="scrollPosition" rounded></v-progress-linear>
            <!-- END READING PROGRESS BAR FOR POSTS -->
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMainStore } from '../../../stores/mainStore';

const mainStore = useMainStore()
let scrollPosition = ref(0)

onMounted(() => {
  document.addEventListener('touchmove', handleScroll, false); // for mobile
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("touchmove", handleScroll);
});

function handleScroll(event) {
  scrollPosition.value =  Math.round((window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100);
}
</script>