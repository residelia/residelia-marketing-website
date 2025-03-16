<template>
    <v-row class="mt-5">
      <v-col cols="12" md="6" offset-md="3">
        <v-stepper v-model="currentStep" flat alt-labels  :mobile="$vuetify.display.xs">
          <!-- Headers -->
          <v-stepper-header>
            <template v-for="step in steps" :key="step.value">
              <v-stepper-item
              :value="step.value"
              :complete="currentStep >= step.value"
              :color="currentStep === step.value ? 'primary' : (currentStep > step.value ? 'green' : 'grey')"
              >
                {{ step.text }}
              </v-stepper-item>
              <v-divider v-if="step.value !== steps.length"></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>

      <v-row>

        <v-col cols="12" md="6" offset-md="3" class="mx-auto px-4">
          <h3 v-if="currentStep < 4" class="s-20 w-600 text-left mt-2">{{ $t(`onboardingWizard.step${currentStep}.title`) }}</h3>
          <!-- Paso 1 -->
          <div v-if="currentStep === 1" class="d-flex flex-column justify-content-start mt-3">
            <v-row>
              <v-col cols="12">
                <div class="s-14 w-500 text-left">{{ $t('onboardingWizard.step1.company.label') }}</div>
                <v-text-field
                  v-model="form.company"
                  :error-messages="v$.company?.$errors.map((e) => e.$message)"
                  :valid="!v$.company.$invalid"
                  variant="outlined"
                  density="compact"
                  outlined
                  class="name text-left"
                  @input="v$.company.$touch"
                  @blur="v$.company.$touch"
                  :placeholder="$t('onboardingWizard.step1.company.placeholder')"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="s-14 w-500 text-left">{{ $t('onboardingWizard.step1.companyDomain.label') }}</div>
                <v-text-field
                  v-model="form.companyDomain"
                  :error-messages="v$.companyDomain?.$errors.map((e) => e.$message)"
                  :valid="!v$.companyDomain.$invalid"
                  variant="outlined"
                  density="compact"
                  outlined
                  class="name mb-0 text-left"
                  @input="v$.companyDomain.$touch"
                  @blur="v$.companyDomain.$touch"
                  :placeholder="$t('onboardingWizard.step1.companyDomain.placeholder')"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="s-14 w-500 text-left">{{ $t('onboardingWizard.step1.assetsAnalyzed.label') }}</div>
                <v-text-field
                  v-model="form.assetsAnalyzed"
                  :error-messages="v$.assetsAnalyzed?.$errors.map((e) => e.$message)"
                  :valid="!v$.assetsAnalyzed.$invalid"
                  variant="outlined"
                  density="compact"
                  outlined
                  class="name mb-0 text-left"
                  @input="v$.assetsAnalyzed.$touch"
                  @blur="v$.assetsAnalyzed.$touch"
                  :placeholder="$t('onboardingWizard.step1.assetsAnalyzed.placeholder')"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <div class="s-14 w-500 text-left">{{ $t('onboardingWizard.step1.assetsManaged.label') }}</div>
                <v-text-field
                  v-model="form.assetsManaged"
                  :error-messages="v$.assetsManaged?.$errors.map((e) => e.$message)"
                  :valid="!v$.assetsManaged.$invalid"
                  variant="outlined"
                  density="compact"
                  outlined
                  class="name mb-0 text-left"
                  @input="v$.assetsManaged.$touch"
                  @blur="v$.assetsManaged.$touch"
                  :placeholder="$t('onboardingWizard.step1.assetsManaged.placeholder')"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- Paso 2 -->
          <div v-if="currentStep === 2" class="mt-5">
            <v-item-group v-model="form.platformUsage" multiple>
              <v-row>
                <v-col cols="12" md="6" v-for="(option, index) in usageOptions" :key="option.value">
                  <v-item v-slot="{ selectedClass, toggle }" :value="option.value">
                    <v-btn
                      :class="selectedClass"
                      :ripple="false"
                      :elevation="0"
                      variant="outlined"
                      size="x-large"
                      block
                      @click="toggle"
                    >
                      {{ option.text }}
                    </v-btn>
                  </v-item>
                </v-col>
                <v-col cols="12">
                  <div v-if="form.platformUsage.includes('other')" class="s-14 w-500 text-left">{{ $t('onboardingWizard.step2.usageOptions.otherUsage.label') }}</div>
                  <v-text-field
                    v-if="form.platformUsage.includes('other')"
                    v-model="form.otherUsage"
                    :error-messages="v$.otherUsage?.$errors.map((e) => e.$message)"
                    :valid="!v$.otherUsage.$invalid"
                    variant="outlined"
                    density="compact"
                    outlined
                    @input="v$.otherUsage.$touch"
                    @blur="v$.otherUsage.$touch"
                    :placeholder="$t('onboardingWizard.step2.usageOptions.otherUsage.placeholder')"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-item-group>
          </div>

          <!-- Paso 3 -->
          <div v-if="currentStep === 3" class="mt-5">
            <v-item-group v-model="form.referrals" multiple>
              <v-row>
                <v-col cols="12" md="6" v-for="(option, index) in referralOptions" :key="option.value">
                  <v-item v-slot="{ selectedClass, toggle }" :value="option.value">
                    <v-btn
                      :class="selectedClass"
                      :ripple="false"
                      :elevation="0"
                      variant="outlined"
                      size="x-large"
                      block
                      @click="toggle"
                    >
                      {{ option.text }}
                    </v-btn>
                  </v-item>
                </v-col>
                <v-col cols="12">
                  <div v-if="form.referrals.includes('other')" class="s-14 w-500 text-left">{{ $t('onboardingWizard.step3.referralOptions.otherReferral.label') }}</div>
                  <v-text-field
                    v-if="form.referrals.includes('other')"
                    v-model="form.otherReferrals"
                    :error-messages="v$.otherReferrals?.$errors.map((e) => e.$message)"
                    :valid="!v$.otherReferrals.$invalid"
                    variant="outlined"
                    density="compact"
                    outlined
                    @input="v$.otherReferrals.$touch"
                    @blur="v$.otherReferrals.$touch"
                    :placeholder="$t('onboardingWizard.step3.referralOptions.otherReferral.placeholder')"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-item-group>
          </div>

          <!-- Paso 4 -->
          <div v-if="currentStep === 4" class="mt-5">
            <template v-if="signUpResult.sent || !signUpResult.success">
              <v-container class="d-flex flex-column justify-content-center align-items-center">
                  <div class="rounded-shape-error">
                    <span class="ri-alert s-44 color--white"></span>
                  </div>
                  <div class="s-22 w-500 text-center color--black my-4">{{ $t('onboardingWizard.completed.error.title') }}</div>
                  <div class="s-14 w-400 text-center">{{ $t('onboardingWizard.completed.error.description') }}</div>
                  <NuxtLink type="button" :to="localePath('/')" class="btn r-04 btn--theme hover--theme mt-4" @click="handleClick('Sign Up Completed','wizard-completed-button')">{{ $t('backHome') }}</NuxtLink>
              </v-container>
            </template>
            <template v-else>
              <div v-if="$vuetify.display.xs" class="mt-5 mb-3">
                  <NuxtLink :to="localePath('/')"><img src="/assets/images/residelia-logo-black.svg" width="150" /></NuxtLink>
              </div>

              <v-container class="d-flex flex-column justify-content-center align-items-center">
                  <div class="rounded-shape">
                    <span class="ri-mail s-44 color--white"></span>
                  </div>
                  <div class="s-22 w-500 text-center color--black mb-4">{{ $t('onboardingWizard.completed.success.title') }}</div>
                  <div class="s-14 w-400 text-center">{{ $t('onboardingWizard.completed.success.description') }}</div>
                  <NuxtLink type="button" :to="localePath('/')" class="btn r-04 btn--theme hover--theme mt-4" @click="handleClick('Sign Up Completed','wizard-completed-button')">{{ $t('backHome') }}</NuxtLink>
              </v-container>
            </template>
          </div>



          <div class="d-flex justify-content-between mt-100">
            <v-btn
              v-if="!signUpResult.sent && signUpResult.success && currentStep !== 4"
              variant="outlined"
              elevation="0"
              size="x-large"
              :disabled="currentStep === 1"
              class="btn btn--theme-secondary hover--theme "
              @click="prevStep"
            >
            {{ $t('onboardingWizard.buttons.back') }}
            </v-btn>

            <v-btn
              v-if="currentStep === 1"
              variant="outlined"
              elevation="0"
              size="x-large"
              type="submit"
              :ripple="false"
              class="btn btn--theme hover--theme "
              @click="nextStep"
            >
            {{ $t('onboardingWizard.buttons.next') }}
            </v-btn>
            <v-btn
              v-if="currentStep === 2"
              :disabled="form.platformUsage.length === 0 || (form.platformUsage.includes('other') && (!v$.otherUsage.$dirty || (v$.otherUsage.$dirty && (v$.otherUsage?.$errors.length > 0 || v$.otherUsage?.$invalid))))"
              variant="outlined"
              elevation="0"
              size="x-large"
              type="submit"
              :ripple="false"
              class="btn btn--theme hover--theme "
              @click="nextStep"
            >
            {{ $t('onboardingWizard.buttons.next') }}
            </v-btn>
            <v-btn
              v-if="currentStep === 3"
              class="btn btn--theme hover--theme "
              size="x-large"
              type="submit"
              @click="submit"
              :disabled="form.referrals.length === 0 || (form.referrals.includes('other') && (!v$.otherReferrals.$dirty || (v$.otherReferrals.$dirty && (v$.otherReferrals?.$errors.length > 0 || v$.otherReferrals?.$invalid))))"
              :loading="loading"
            >
              {{ $t('onboardingWizard.buttons.end') }}
              <template v-slot:loader>
                <v-progress-circular indeterminate></v-progress-circular>
              </template>
            </v-btn>
          </div>
        </v-col>
      </v-row>
</template>

<script setup>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  url,
  minValue,
  requiredIf,
} from "@vuelidate/validators";
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha";


definePageMeta({
  layout: "no-header-no-footer",
});

defineI18nRoute({
  paths: {
    en: "/sign-up/wizard",
    es: "/registro/wizard",
  },
});

useHead({
  // title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
  // description: `${data.value[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: 'navbar-dark scheme-residelia'
  },
})

// Router para redirigir después del registro
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const { t, locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const currentStep = ref(1);
const steps = [
  { value: 1, text: t('onboardingWizard.stepper.step1')},
  { value: 2, text: t('onboardingWizard.stepper.step2')},
  { value: 3, text: t('onboardingWizard.stepper.step3')},
  { value: 4, text: t('onboardingWizard.stepper.step4')},
];
const loading = ref(false)
const { executeRecaptcha } = useGoogleRecaptcha();

// Datos del formulario
const form = reactive({
  company: "",
  companyDomain: "",
  assetsManaged: "",
  assetsAnalyzed: "",
  platformUsage: [],
  referrals: [],
  otherUsage: "",
  otherReferrals: ""
});
// console.log(form)
const signUpResult = reactive({
  success: true,
  error: false,
  message: "",
});
const usageOptions = [
  { text: t('onboardingWizard.step2.usageOptions.opportunitiesSearch'), value: "opportunities_search" },
  { text: t('onboardingWizard.step2.usageOptions.opportunitiesAnalysis'), value: "opportunities_analysis" },
  { text: t('onboardingWizard.step2.usageOptions.marketAnalysis'), value: "market_analysis" },
  { text: t('onboardingWizard.step2.usageOptions.propertyManagement'), value: "property_management" },
  { text: t('onboardingWizard.step2.usageOptions.rentalManagement'), value: "rental_management" },
  { text: t('onboardingWizard.step2.usageOptions.facilityManagement'), value: "facility_management" },
  { text: t('onboardingWizard.step2.usageOptions.repossessionManagement'), value: "repossession_management" },
  { text: t('onboardingWizard.step2.usageOptions.otherUsage.label'), value: "other" },
];
const referralOptions = [
  { text: t('onboardingWizard.step3.referralOptions.googleSearch'), value: "google_search" },
  { text: t('onboardingWizard.step3.referralOptions.wordOfMouth'), value: "word_of_mouth" },
  { text: t('onboardingWizard.step3.referralOptions.alreadyKnown'), value: "already_known" },
  { text: t('onboardingWizard.step3.referralOptions.linkedin'), value: "linkedin" },
  { text: t('onboardingWizard.step3.referralOptions.otherSocial') , value: "other_social" },
  { text: t('onboardingWizard.step3.referralOptions.otherReferral.label'), value: "other" },
];

const signupCompleted = useCookie('signup_completed', {
  maxAge: 60 * 60 * 24 * 90, // 3 meses en segundos
  secure: true,
  sameSite: 'strict',
  path: '/',
})

// console.log("internationalization======>",t('onboardingWizard.step1.companyName.required'))
const rules = computed(() => {
  return {
    company: {
      required: helpers.withMessage(
        t('onboardingWizard.step1.company.required'),
        required
      ),
      minLength: helpers.withMessage(
        t('onboardingWizard.step1.company.length'),
        minLength(3)
      ),
      $autoDirty: true,
    },
    companyDomain: {
      required: helpers.withMessage(
        t('onboardingWizard.step1.companyDomain.required'),
        required
      ),
      url: helpers.withMessage(
        t('onboardingWizard.step1.companyDomain.error'),
        url
      ),
      $autoDirty: true,
    },
    assetsManaged: {
      required: helpers.withMessage(
        t('onboardingWizard.step1.assetsManaged.required'),
        required
      ),
      minValue: helpers.withMessage(
        t('onboardingWizard.step1.assetsManaged.value'),
        minValue(1)
      ),
      $autoDirty: true,
    },
    assetsAnalyzed: {
      required: helpers.withMessage(
        t('onboardingWizard.step1.assetsAnalyzed.required'),
        required
      ),
      minValue: helpers.withMessage(
        t('onboardingWizard.step1.assetsAnalyzed.value'),
        minValue(1)
      ),
      $autoDirty: true,
    },
    platformUsage: {
      required: helpers.withMessage(
        t('onboardingWizard.step2.platformUsage.required'),
        required
      ),
      minLength: helpers.withMessage(
        t('onboardingWizard.step2.platformUsage.length'),
        minLength(1)
      ),
      $autoDirty: true,
    },
    otherUsage: {
      minLength: helpers.withMessage(
        t('onboardingWizard.step2.otherUsage.length'),
        minLength(5)
      ),
      $autoDirty: true,
    },
    referrals: {
      required: helpers.withMessage(
        t('onboardingWizard.step3.referrals.required'),
        required
      ),
      minLength: helpers.withMessage(
        t('onboardingWizard.step3.referrals.length'),
        minLength(1)
      ),
      $autoDirty: true,
    },
    otherReferrals: {
      minLength: helpers.withMessage(
        t('onboardingWizard.step3.otherReferral.length'),
        minLength(5)
      ),
      $autoDirty: true,
    },
  };
});

const v$ = useVuelidate(rules, form);

// Avanzar y retroceder pasos
const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++;
};
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

// Enviar datos al webhook y redirigir
const submit = async () => {
  v$.value.$validate();
  const storedData = JSON.parse(localStorage.getItem("signupData"));

  try {
    loading.value = true; // Activa el loader
    // console.log("gathered form=======>", form, storedData)

    if (!v$.value.$error) {
      const { token } = await executeRecaptcha(RecaptchaAction.login);
      const res = await $fetch(runtimeConfig.public.signUpWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "google-recaptcha-token": token ?? "",
        },
        body: {
          ...storedData,
          ...form,
          gtoken: token,
        },
      });

      // console.log("printing res ===========>");
      // console.log(res);

      signUpResult.success = res.success;
      // signUpResult.success = false;
      currentStep.value++
      if (signUpResult.success) {
        signUpResult.message = "Todo OK";

        // tracking event and identifying
        trackEvent("Sign Up Completed", form)
        // storing wizard finish and navigating to end
        // localStorage.setItem('finishedSignupWizard', true)
        signupCompleted.value = JSON.stringify(storedData)
        localStorage.removeItem('signupData')
        sent.value = true;
        loading.value = false;
        // router.push(localePath('/registro/completado'))
      } else {
        signUpResult.message = "Hemos tenido un problema para procesar tu alta. Por favor, inténtalo más tarde";
        trackEvent("Sign Up Failed",form)
      }
    } else {
      signUpResult.message = "Resuelve los errores primero";
      signUpResult.success = false;
    }
  } catch (error) {
    console.error("Error enviando datos:", error);
  }
  loading.value = false; // Oculta el loader
};


onMounted(() => {
  if (signUpResult.sent) {
    // enviamos a la app
    navigateTo('https://app.residelia.com', { external: true })
    return
  }

  const storedData = JSON.parse(localStorage.getItem("signupData"));
  if (!storedData) {
    // console.log("redirigiendo a error porque no hay storedData y queremos ir al wizard")
    router.push(localePath("/registro"));
  }
});

// tracking
const { trackPage, trackEvent, identifyUser } = useTracking();
function handleClick(eventName, buttonId) {
  const storedData = JSON.parse(localStorage.getItem("signupData"));
  const params = {
    clickedOnPage: route.path,
    buttonId
  }
  identifyUser(storedData.email, { ...storedData, ...form })
  trackEvent(eventName, params)
};
const trackPageView = () => {
  trackPage('Page View', {
    title: t('onboardingWizard.title'),
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>

<style scoped>
.v-item--hover {
  background-color: transparent !important;;
  color: #FF8039 !important;
  border-color: #FF8039 !important;
}
.v-item--selected {
  background-color: #FF8039 !important;;
  color: white !important;
  border-color: #FF8039 !important;
}

/* Estilos para los chips seleccionados */
.v-item--selected .v-chip {
  background-color: #673ab7 !important; /* Color para los chips */
  color: white !important;
}

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
.rounded-shape-error {
  background-color: red;
  border-radius: 100px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

/* Botones fijos en la parte inferior */
.nav-button {
  position: fixed;
  bottom: 20px;
  padding: 12px 24px;
  z-index: 1000;
}

/* Posición de los botones */
.prev-button {
  left: 20px;
}

.next-button {
  right: 20px;
}


/* Estilos Responsivos */
@media (max-width: 768px) {
  .nav-button {
    width: 40%;
  }
}
</style>
