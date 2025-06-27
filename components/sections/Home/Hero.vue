<template>
    <section v-if="hero" id="hero-product" class="bg--scroll hero-section gr--primary-50">
        <div class="container text-center mt-15">
            <!-- HERO TEXT -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9 col-xl-10">
                    <div class="hero-product-txt" :class="{'wow fadeInUp': mounted}">
                        <!-- Title -->
                        <h1 class="s-44 w-700" :class="textColor" v-html="balanceString(hero.heading.find(t => t._key === locale).value,5)"></h1>
                        <!-- Text -->
                        <p class="p-xl pt-4" :class="textColor">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
                        <!-- Buttons -->
                        <div v-if="hero.buttons" class="d-grid gap-2 d-md-block mx-auto">
                            <template v-for="(button,index) in hero?.buttons" >
                                <NuxtLink type="button" v-if="button.button.linkType === 'anchor'" :to="button.button.anchor" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <a type="button"  v-else-if="button.button.linkType === 'external'" :href="button.button.externalUrl" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')" >{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</a>
                                <NuxtLink type="button"  v-else-if="button.button.linkType === 'internal'" :to="$localePath(button.button.link.slug.find(l => l._key === locale).value.current+(button.button.queryString ? button.button.queryString : ''))" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <ElementsVideoModal v-else-if="button.button.linkType === 'video'" :link="button.button.externalUrl">
                                    <template v-slot:button>
                                        <!-- <span class="video-popup2 btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</span> -->
                                        <span class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</span>
                                    </template>
                                </ElementsVideoModal>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!--END HERO TEXT -->
            <!-- HERO IMAGE -->
            <div class="row">
                <div class="col">
                    <div class="hero-product-img video-preview" :class="{'wow fadeInUp': mounted}">
                        <!-- Play Icon -->
                        <!-- <ElementsVideoModal :link="'https://www.youtube.com/embed/GcMiYI1gWD4'">
                            <template v-slot:button>
                                <div class="video-btn video-btn-xl btn--theme hover--theme ico-90" @click="handleClick('Hero Video Launched','hero-video-button')">
                                    <div class="video-block-wrapper"><span class="flaticon-play-button"></span></div>
                                </div>
                            </template>
                        </ElementsVideoModal> -->
                        <!-- Preview Image -->
                        <img class="img-fluid"  :src="hero.image.url+'?fm=webp'" :alt="hero.imageAlt" />
                    </div>
                </div>
            </div>
            <!-- END HERO IMAGE -->
        </div>
        <!-- End container -->
        <!-- WAVE SHAPE BOTTOM -->
        <div class="wave-shape-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,240C640,267,800,277,960,277.3C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useMainStore } from '../../../stores/mainStore';


const { locale } = useI18n()
const mainStore = useMainStore()

const props = defineProps<{
    hero: Object
    textColor: String
}>();

const route = useRoute()

const mounted = ref(false)
onMounted(() => { mounted.value = true })


const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}


const open = ref(false)

function toggler() {
    open.value = !open.value;
};
function videoClose() {
    if (document.getElementById("video-popup-iframe")) {
        document.getElementById("video-popup-iframe").removeAttribute("src");
    }
    open.value = !open.value;
};
</script>

<style scoped>
#hero-img {
    height: 30vw;
    width: 100%;
    object-fit: cover;
    object-position: 0% 0%;
}
.full-width {
    width: 100% !important;
}
</style>