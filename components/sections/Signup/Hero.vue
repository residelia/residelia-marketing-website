<template>
    <v-container fluid class="p-0 fill-height">
        <v-row no-gutters class="fill-height">
            <!-- SIGN UP PAGE TEXT -->
            <v-col cols="12" md="5" v-if="hero" class="left-column d-none d-sm-flex d-flex flex-column justify-center align-center">
                    <div class="text-container">
                        <div class="color--white text-center">
                            <img src="/assets/images/residelia-logo-white.svg" width="150" />
                            <!-- Section ID -->
                            <!-- <span class="section-id">{{ hero?.overline?.find(t => t._key === locale).value }}</span> -->
                            <!-- Title -->
                            <h2 class="s-34 w-700 mt-3">{{ hero?.heading?.find(t => t._key === locale).value }}</h2>
                            <!-- Text -->
                            <!-- <p class="p-md mt-25">{{ hero?.subHeading?.find(t => t._key === locale).value }}</p> -->
                            <img class="img-fluid mt-3"  :src="hero.image.url+'?fm=webp'" :alt="hero.imageAlt" />
                        </div>
                    </div>
            </v-col>
            <!-- END SIGN UP PAGE TEXT -->
            <!-- SIGN UP FORM -->
            <v-col cols="12" md="5" offset-md="1" class="d-flex flex-column justify-center align-center">
                <div class="mt-5 mb-3 d-lg-none d-flex">
                    <NuxtLink :to="localePath('/')"> <img src="/assets/images/residelia-logo-black.svg" width="150" /></NuxtLink>
                </div>

                <v-container v-if="formData">
                    <div class="s-32 w-500 text-center color--black mb-4">{{ hero?.overline?.find(t => t._key === locale).value }}</div>
                    <FormsSignup :formData="formData.formu" :plan="query"/>
                </v-container>
            </v-col>
            <!-- END SIGN UP FORM -->

        </v-row>
        <!-- End row -->
    </v-container>
    <!-- End register-page-wrapper -->

</template>
<script setup lang="ts">
import { formBlockQuery } from '../queries/helperQueries';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()
const props = defineProps<{
    hero?: Object
    formData?: Object
    query?: Object
}>();
</script>

<style scoped>
/* Estilo para la columna izquierda */
.left-column {
  background-image: url('/assets/images/signup-background.svg');
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