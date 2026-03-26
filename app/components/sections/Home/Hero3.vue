<template>
    <section id="hero-17" class="bg--fixed hero-section pb-100 mb-100">
        <div class="container">
            <!-- HERO TEXT -->
            <div class="row justify-content-center">
                <div class="col-md-11 col-lg-10 col-xl-9">
                    <div class="hero-17-txt">
                        <!-- Title -->
                        <h1 class="s-60 w-700" :class="textColor" >{{ hero.heading.find(t => t._key === locale).value }}</h1>
                        <!-- <h1 class="s-60 w-700" :class="textColor" v-html="balanceString(hero.heading.find(t => t._key === locale).value,100)"></h1> -->
                        <!-- Text -->
                        <p class="p-xl pt-4" :class="textColor">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
                        
                        <!-- HERO QUICK FORM -->
                        <!-- Buttons -->
                        <div v-if="hero.buttons" class="d-grid gap-2 d-md-block mx-auto">
                            <template v-for="(button,index) in hero?.buttons" >
                                <NuxtLink type="button" v-if="button.button.linkType === 'anchor'" :to="button.button.anchor" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')" v-follow >{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <a type="button"  v-else-if="button.button.linkType === 'external'" :href="button.button.externalUrl" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')" >{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</a>
                                <NuxtLink type="button"  v-else-if="button.button.linkType === 'internal'" :to="$localePath(button.button.link.slug.find(l => l._key === locale).value.current+(button.button.queryString ? button.button.queryString : ''))" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}" @click="handleClick(button.button.id,'home-hero-button')" v-follow >{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
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
                <!-- End row -->
            </div>
            <!-- END HERO TEXT -->
            <!-- BRANDS CAROUSEL -->
            <div id="brands-1" class="mt-50">
                <div class="row">
                    <div class="col text-center">
                        <SlidersBrandLogos :customers="customers.customersGroup" />
                    </div>
                </div>
                <!-- End row -->
            </div>
            <!-- END BRANDS CAROUSEL -->
        </div>
        <!-- End container -->
    </section>
</template>
<script setup lang="ts">
import { useMainStore } from '../../../../stores/mainStore';

const { locale } = useI18n()
const mainStore = useMainStore()

const props = defineProps<{
    hero: Object
    textColor: String
    customers: Object
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