<template>
  <v-form class="newsletter-form" @submit.prevent="onSubmit">
      <div class="row mt-1 align-items-center">
      <!-- <div class="input-group"> -->
        <div class="col-12" :class="{'offset-md-2 col-md-5': location === 'hero', 'col-md-8': location === 'callToAction'}">
          <input
            v-if="formData[0].inputs[0].type === 'text'"
            id="s-email"
            :type="formData[0].inputs[0].subtype"
            name="email"
            v-model="suspectData.email"
            class="form-control email py-2"
            :class="{
              'border-error focus:border-error': v$.email.$error,
              'border-valid': !v$.email.$invalid,
            }"
            @change="v$.email.$touch"
            :placeholder="formData[0].inputs[0].placeholder.find(t => t._key === locale).value"
          />
        </div>
        <div class="col-12 mt-md-0 mt-2 text-left" :class="{'col-md-4': location === 'hero' || location === 'callToAction'}">
            <button @click="onSubmit" type="submit" class="btn hover--theme" :class="{'btn--theme': textColor !== 'white', 'btn--theme-secondary': textColor === 'white' }" :disabled="formResult.submitting" >{{ formData[0].action.find(t => t._key === locale).value }}</button>
        </div>

          <!-- <input v-if="formData[0].inputs[0].type === 'text'" :type="formData[0].inputs[0].subtype" autocomplete="off" class="form-control" :placeholder="formData[0].inputs[0].placeholder.find(t => t._key === locale).value" required id="s-email" />
          <span class="input-group-btn">
              <button @click="onSubmit" type="submit" class="btn btn--theme hover--theme">{{ formData[0].action.find(t => t._key === locale).value }}</button>
          </span> -->
      </div>
      <!-- WAITLIST Form Notification -->
      <div v-for="error of v$.email?.$errors" :key="error.$uid">
        <span class="error" :class="color">{{ error.$message }}</span>
      </div>
      <label for="s-email" class="form-notification" :class="color" :color="formResult.success ? '#16A175' : '#E73D3D'">{{ formResult.message }}</label>
  </v-form>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, minLength, helpers } from "@vuelidate/validators";
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha";
import { formBlockQuery } from '../queries/helperQueries';

const route = useRoute();
const { trackEvent, identifyUser } = useTracking()
const runtimeConfig = useRuntimeConfig()
const { executeRecaptcha } = useGoogleRecaptcha();
const {locale} = useI18n()
const props = defineProps<{
    textColor: String
    color: String
    form: String
    location: String
}>();
const formData = await useSanityData({
    query: formBlockQuery,
    params: { formType: props.form },
})

// console.log(formData)
// console.log(locale)
// console.log(formData.value[0].error.find(t => t._key === locale.value).value)

const suspectData = reactive({
  email: "",
  origin: "waitlistForm@" + route.fullPath,
  acceptRGPD: true,
});
const formResult = reactive({
  sent: false,
  submitting: false,
  success: true,
  error: false,
  message: "",
});
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(formData.value[0].inputs.find(x => x.name === 'email').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      email: helpers.withMessage(formData.value[0].inputs.find(x => x.name === 'email').validation.find(x => x.type === 'email').message.find(t => t._key === locale.value).value, email),
      $autoDirty: true,
    },
  };
});

const v$ = useVuelidate(rules, suspectData);

function clearForm() {
    suspectData.email = ""
    suspectData.acceptRGPD = false
    formResult.sent = false
    formResult.submitting = false
    formResult.success = false
}

// onSubmit helps in testing the form
async function onSubmit(e) {
    v$.value.$validate();

    if (!v$.value.$error) {
      formResult.submitting = true;

      // TODO. Meter la lógica de gestión de la suscripción a la WAITLIST
      formResult.message = formData.value[0].submitting.find(t => t._key === locale.value).value

      await new Promise(r => setTimeout(r, 3000));

      formResult.success = true;
      if (formResult.success) {
        formResult.message = formData.value[0].success.find(t => t._key === locale.value).value
      } else {
        formResult.message = formData.value[0].error.find(t => t._key === locale.value).value
      }
      clearForm()
      v$.value.$reset()
    } else {
      formResult.success = false;
      console.log(v$.value.$errors);
    }

    // tracking event
    trackEvent(`${props.form} Completed`,{ ...suspectData, ...formResult, clickedOnPage: route.path})
    identifyUser(suspectData.email, { ...suspectData, ...formResult, clickedOnPage: route.path })
}

// doSubmit is the form logic
async function doSubmit() {
  // processing form
  v$.value.$validate();

  if (!v$.value.$error) {
    formResult.submitting = true;
    formResult.message = formData.value[0].submitting.find(t => t._key === locale.value).value

    const { token } = await executeRecaptcha(RecaptchaAction.login);
    const res = await $fetch(runtimeConfig.public.formWebhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "google-recaptcha-token": token ?? "",
        },
        body: {
            ...suspectData,
            gtoken: token
        }
    });

    console.log("printing res ===========>")
    console.log(res)

    formResult.success = res.success;
    if (res.success) {
      formResult.message = formData.value[0].success.find(t => t._key === locale.value).value
    } else {
      formResult.message = formData.value[0].error.find(t => t._key === locale.value).value
    }
    formResult.submitting = false;
    clearForm()
    v$.value.$reset()
  } else {
    formResult.success = false;
  }

  // tracking event
  trackEvent(`${props.form} Completed`,{ ...suspectData, ...formResult, clickedOnPage: route.path})
  identifyUser(suspectData.email, { ...suspectData, ...formResult, clickedOnPage: route.path })
}

onMounted(() => {
    clearForm()
})
</script>

<style lang="css">
.border-error {
  border-color: #e74c3c !important;
}

.border-valid {
  border-color: #42d392 !important;
}

.v-selection-control {
  align-items: start !important;
}
.v-btn__content {
  margin: 0 !important;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500 !important;
  font-size: 1rem !important;
}
</style>