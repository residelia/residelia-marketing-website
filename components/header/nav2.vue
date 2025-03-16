<template>
    <header id="header" class="tra-menu white-scroll">
        <div class="header-wrapper">
            <HeaderLogo2 />
            <HeaderMenu2 />
            <!-- <HeaderDarkLightToggle /> -->

            <!-- READING PROGRESS BAR FOR POSTS -->
            <!-- <v-progress-linear v-if="mainStore.readingBar" :active="scrollPosition > 0" color="red-darken-2"  :model-value="scrollPosition" rounded></v-progress-linear> -->
            <!-- END READING PROGRESS BAR FOR POSTS -->
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMainStore } from '../../stores/mainStore'

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
  const menu = document.getElementById("main-menu");
  const wsmenu = document.getElementById("mobile-menu");
  const header = document.getElementById("header");

  if (window.pageYOffset > 100 || document.body.scrollTop > 100) {
    wsmenu.classList.add("scroll");
    menu.classList.add("scroll");
    header.classList.add("scroll");
  } else {
    wsmenu.classList.remove("scroll");
    menu.classList.remove("scroll");
    header.classList.remove("scroll");
  }

  this.scrollPosition =  Math.round((window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100);
}
</script>