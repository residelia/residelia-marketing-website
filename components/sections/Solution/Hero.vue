<template>
    <section v-if="hero" id="hero-solution" class="bg--scroll hero-section gr--primary-50">
        <div class="container">
            <div class="row d-flex align-items-center">
                <!-- HERO TEXT -->
                <div class="col-md-6">
                    <div class="hero-solution-txt wow fadeInRight">
                        <!-- Solution ID -->
                        <span class="section-id hero" :class="textColor, {'mt-10': $vuetify.display.xs}">{{hero?.overline?.find(t => t._key === locale).value}}</span>
                        <!-- Title -->
                        <h1 class="s-44 w-700" :class="textColor">{{ hero.heading.find(t => t._key === locale).value }}</h1>
                        <!-- Text -->
                        <p class="w-400 mt-3 color--grey" style="line-height: 1.5rem;" :class="textColor, {'s-16': $vuetify.display.xs, 's-18': !$vuetify.display.xs}">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
                        <!-- Buttons -->
                        <div v-if="hero.buttons" class="btns-group d-flex justify-content-start">
                            <div v-for="(button,index) in hero?.buttons" @click="handleClick(button.button.id,'hero-solution-button')">
                                <NuxtLink v-if="button.button.linkType === 'anchor'" :to="button.button.anchor" class="btn r-04  hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <a v-else-if="button.button.linkType === 'external'" :href="button.button.externalUrl" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</a>
                                <NuxtLink v-else-if="button.button.linkType === 'internal'" :to="localePath(button.button.link.slug.find(l => l._key === locale).value.current+(button.button.queryString ? button.button.queryString : ''))" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <ElementsVideoModal v-else-if="button.button.linkType === 'video'" :link="button.button.externalUrl">
                                    <template v-slot:button>
                                        <span class="video-popup2 btn r-04 hover--theme ico-20 ico-right" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</span>
                                    </template>
                                </ElementsVideoModal>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END HERO TEXT -->
                <!-- HERO IMAGE -->
                <div class="col-md-6">
                    <div class="hero-solution-img wow fadeInLeft">
                        <!-- <img class="img-fluid" src="/assets/images/dashboard-04.png" alt="hero-image" /> -->
                        <img class="img-fluid rounded-xl" width="1024" :src="hero.image.url+'?fm=webp'" :alt="hero.imageAlt" />
                    </div>
                </div>

            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
        <!-- WAVE SHAPE BOTTOM -->
        <div class="wave-shape-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170">
                <path fill-opacity="1" d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
        </div>
    </section>
    <hr class="divider" />
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
    hero: Object
    color: String
    textColor: String
}>();

const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>
