<template>
    <section v-if="hero" id="hero-product" class="bg--scroll hero-section" :class="product">
        <div class="container text-center mt-15">
            <!-- HERO TEXT -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9 col-xl-10">
                    <!-- <div class="hero-product-txt" :class="{'wow fadeInUp': mounted}"> -->
                    <div class="hero-product-txt">
                        <!-- Title -->
                        <h1 class="s-56 w-700" :class="textColor" v-html="balanceString(hero.heading.find(t => t._key === locale).value,5)"></h1>
                        <!-- Text -->
                        <p class="p-xl pt-4" :class="textColor" v-html="balanceString(hero.subHeading.find(t => t._key === locale).value, 12)"></p>
                        <!-- HERO QUICK FORM -->
                        <FormsSimple v-if="hero?.soon" :color="textColor" :textColor="textColor" form="waitlist" location="hero"/>
                        <!-- Buttons -->
                        <div v-if="hero.buttons" class="btns-group d-flex justify-content-center pt-3">
                            <div v-for="(button,index) in hero?.buttons" @click="handleClick(button.button.id,'product-hero-button')">
                                <NuxtLink v-if="button.button.linkType === 'anchor'" :to="button.button.anchor" class="btn r-04  hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <a v-else-if="button.button.linkType === 'external'" :href="button.button.externalUrl" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</a>
                                <NuxtLink v-else-if="button.button.linkType === 'internal'" :to="$localePath(button.button.link.slug.find(l => l._key === locale).value.current+(button.button.queryString ? button.button.queryString : ''))" class="btn r-04 hover--theme" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <!-- <ElementsVideoModal v-else-if="button.button.linkType === 'video'" :link="button.button.externalUrl">
                                    <template v-slot:button>
                                        <span class="video-popup2 btn r-04 hover--theme ico-20 ico-right" :class="{'btn--theme': index === 0, 'btn--theme-secondary': index !== 0}">{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</span>
                                    </template>
                                </ElementsVideoModal> -->
                            </div>
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
                        <ElementsVideoModal v-if="false">
                        <!-- <ElementsVideoModal v-if="hero.buttons.find(b => b.button.linkType === 'video')" :link="hero.buttons.find(b => b.button.linkType === 'video').button.videoUrl"> -->
                            <template v-slot:button>
                                <div class="video-btn video-btn-xl btn--theme hover--theme ico-90" @click="handleClick('Hero Video Launched','hero-video-button')">
                                    <div class="video-block-wrapper"><span class="flaticon-play-button"></span></div>
                                </div>
                            </template>
                        </ElementsVideoModal>
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
import { formSectionQuery } from '../../../../queries/helperQueries';

const route = useRoute();
const { locale } = useI18n()

const props = defineProps<{
    product: String
    hero: Object
    textColor: String
}>();

const suspectData = reactive({
  email: "",
  origin: "waitlistForm" + route.fullPath,
  acceptRGPD: false,
});
const onSubmitResultMessage = ref('')
const form = await useSanityData({
    query: formSectionQuery,
    params: { formType: 'waitlist' },
})

async function onSubmit(e) {
    console.log(e)
    // TODO. Meter la lógica de gestión de la suscripción a la WAITLIST
    onSubmitResultMessage.value = 'En proceso de suscripción....'
    const params = {
        type: 'waitlist',
        email: document.getElementById('s-email').value
    }

    await new Promise(r => setTimeout(r, 3000));

    onSubmitResultMessage.value = '¡Enhorabuena! ¡Ya estás suscrito!'
}

function clearForm() {
    suspectData.email = ""
    suspectData.acceptRGPD = false
    formResult.sent = false
    formResult.submitting = false
    formResult.success = false
    formResult.message = ""
}

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
</script>