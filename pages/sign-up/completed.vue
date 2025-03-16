<template>
  <v-container fluid class="p-0 fill-height">
      <v-row no-gutters class="fill-height">
          <!-- SIGN UP PAGE TEXT -->
          <v-col cols="12" md="5" v-if="!$vuetify.display.xs" class="left-column d-flex flex-column justify-center align-center">
            <div class="text-container">
                <div class="color--black text-center">
                    <img src="/assets/images/residelia-logo-black.svg" width="150" alt="residelia-logo"/>
                    <!-- Section ID -->
                    <!-- <span class="section-id">{{ hero?.overline?.find(t => t._key === locale).value }}</span> -->
                    <!-- Title -->
                    <h2 class="s-34 w-700 mt-3">{{ $t('onboardingWizard.completed.heading') }}</h2>
                    <!-- Text -->
                    <!-- <p class="p-md mt-25">{{ hero?.subHeading?.find(t => t._key === locale).value }}</p> -->
                    <img class=" over" src="/assets/images/residelia-laptop.png" alt="residelia-on-devices" />
                </div>
            </div>
          </v-col>
          <!-- END SIGN UP PAGE TEXT -->
          <!-- SIGN UP FORM -->
          <v-col cols="12" md="5" offset-md="1" class="d-flex flex-column justify-center align-center">
              <div v-if="$vuetify.display.xs" class="mt-5 mb-3">
                  <NuxtLink :to="localePath('/')"><img src="/assets/images/residelia-logo-black.svg" width="150" /></NuxtLink>
              </div>

              <v-container class="d-flex flex-column justify-content-center align-items-center">
                  <div class="rounded-shape">
                    <span class="ri-mail s-44 color--white"></span>
                  </div>
                  <div class="s-22 w-500 text-center color--black mb-4">{{ $t('onboardingWizard.completed.title') }}</div>
                  <div class="s-14 w-400 text-center">{{ $t('onboardingWizard.completed.description') }}</div>
                  <NuxtLink type="button" :to="localePath('/')" class="btn r-04 btn--theme hover--theme mt-4" @click="handleClick('Sign Up Completed','wizard-completed-button')">{{ $t('backHome') }}</NuxtLink>
              </v-container>
          </v-col>
          <!-- END SIGN UP FORM -->

      </v-row>
      <!-- End row -->
  </v-container>
  <!-- End register-page-wrapper -->

</template>

<script setup lang="ts">
import { useMainStore } from "../../stores/mainStore";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { locale, tm } = useI18n()
const mainStore = useMainStore()


defineI18nRoute({
    paths: {
      en: '/sign-up/completed',
      es: '/registro/completado'
    }
})

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale)


definePageMeta({
  layout: 'no-header-footer'
})
useHead({
  // title: $t('onboardingWizard.completed.title'),
  // description: $t('onboardingWizard.completed.descriptoin'),
  bodyAttrs: {
      class: 'navbar-dark scheme-residelia'
  },
})
// tracking
const { trackPage } = useTracking();
function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
};
const trackPageView = () => {
  trackPage('Page View', {
    title: tm('onboardingWizard.title'),
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>

<style scoped>
.over {
  /* bottom: -30px; */
  transform: translate(-50%,20%);
  height: auto;
  overflow: hidden;
}
.rounded-shape {
  background-color: lightblue;
  border-radius: 100px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
/* Estilo para la columna izquierda */
.left-column {
  background-image: url('/assets/images/completed-bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 95vh; /* Ocupa toda la pantalla visible */
  border-radius: 20px;
  margin: 20px 0px 20px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
}

/* Contenedor del Texto y la Imagen */
.text-container {
  max-width: 80%;
}

/* Texto dentro de la imagen */
.hero-text {
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

/* Imagen Hero */
.hero-image {
  width: 80px;
  height: auto;
}

/* Estilo del Formulario */
.form-card {
  max-width: 100%;
  width: 100%;
}

@media (max-width: 960px) {
  .left-column {
    height: 40vh;
    border-radius: 10px;
  }
  .hero-text {
    font-size: 1.5rem;
  }
  .hero-image {
    max-width: 80px;
  }
}
</style>