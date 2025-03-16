<template>
  <div v-if="formData" class="form-holder">
    <v-form name="signupform" class="row sign-up-form" @submit.prevent="onSubmit">
      <!-- Contact Form Input -->
      <div class="s-14 w-500">{{ formData.inputs.find(x => x.name === 'email').label.find(t => t._key === locale).value }}</div>
      <v-text-field
        v-model="suspectData.email"
        :error-messages="v$.email?.$errors.map(e => e.$message)"
        :valid="!v$.email.$invalid"
        variant="outlined"
        density="compact"
        outlined
        ripple="false"
        class="name mb-0"
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
        :placeholder="formData.inputs.find(x => x.name === 'email').placeholder.find(t => t._key === locale).value"
      >
      </v-text-field>
      <div class="s-14 w-500">{{ formData.inputs.find(x => x.name === 'firstName').label.find(t => t._key === locale).value }}</div>
      <v-text-field
        v-model="suspectData.firstName"
        :error-messages="v$.firstName?.$errors.map(e => e.$message)"
        :valid="!v$.firstName.$invalid"
        variant="outlined"
        density="compact"
        outlined
        class="name mb-0"
        @input="v$.firstName.$touch"
        @blur="v$.firstName.$touch"
        :placeholder="formData.inputs.find(x => x.name === 'firstName').placeholder.find(t => t._key === locale).value"
      >
      </v-text-field>
      <div class="s-14 w-500">{{ formData.inputs.find(x => x.name === 'lastName').label.find(t => t._key === locale).value }}</div>
      <v-text-field
        v-model="suspectData.lastName"
        :error-messages="v$.lastName?.$errors.map(e => e.$message)"
        :valid="!v$.lastName.$invalid"
        variant="outlined"
        density="compact"
        outlined
        class="name mb-0"
        @input="v$.lastName.$touch"
        @blur="v$.lastName.$touch"
        :placeholder="formData.inputs.find(x => x.name === 'lastName').placeholder.find(t => t._key === locale).value"
      >
      </v-text-field>

      <div v-if="formData.inputs.find(x => x.name === 'adviceRGPD')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'adviceRGPD').cols}`">
        <div class="contact-form-notice mb-3">
          <span class="s-12 w-500" v-html="formData.inputs.find(x => x.name === 'adviceRGPD').description.find(t => t._key === locale).value"></span>
          <span><NuxtLink class="s-12 color--blue-500" :to="localePath('/terminos/terminos-de-uso')">{{ $t('legalTerms') }}</NuxtLink></span>
        </div>
      </div>
      <!-- Contact Form Button -->
      <div class="col-md-12 mt-1 form-btn text-right input-group-btn">
        <v-btn
          v-if="!formResult.submitting"
          block
          elevation=0
          size="x-large"
          type="submit"
          class="btn btn--theme hover--theme submit"
        >{{ formData.action.find(t => t._key === locale).value }}
        </v-btn>
      </div>

      <!-- Login Separator -->
      <!-- <div class="col-md-12 text-center">
          <div class="separator-line"></div>
      </div> -->

      <!-- Google Button -->
      <!-- <v-btn
        class="btn btn--theme-secondary hover--theme ico-left"
        size="x-large"
        elevation=0
        variant="outlined"
        border="black"
      >
        <img height="30px" src="/assets/images/png_icons/google.png" alt="google-icon" /> Sign up with Google
      </v-btn> -->
    </v-form>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, minLength, helpers } from "@vuelidate/validators";
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha";
import { formBlockQuery } from '../queries/helperQueries';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const  localePath  = useLocalePath()
const { locale } = useI18n()
const mainStore = useMainStore()
const props = defineProps<{
    formData?: Object
    query?: Object
}>();
// const formData = await useSanityData({
//     query: formBlockQuery,
//     params: { formType: 'contact' },
// })

console.log(props.formData)
console.log(locale)

const { executeRecaptcha } = useGoogleRecaptcha();
const suspectData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  plan: props.query?.plan,
  origin: "signupForm",
  acceptRGPD: true,
  acceptMarketing: true,
});
  console.log(suspectData)

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
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'email').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      email: helpers.withMessage(props.formData.inputs.find(x => x.name === 'email').validation.find(x => x.type === 'email').message.find(t => t._key === locale.value).value, email),
      $autoDirty: true,
    },
    firstName: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'firstName').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      minLength: minLength(3),
      $autoDirty: true,
    },
    lastName: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'lastName').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      minLength: minLength(4),
      $autoDirty: true,
    },
  };
});

const v$ = useVuelidate(rules, suspectData);

function clearForm() {
  suspectData.firstName = "";
  suspectData.lastName = "";
  suspectData.email = "";
  suspectData.plan = props.query?.plan;
  suspectData.origin = "signupForm";
  suspectData.acceptRGPD = true;
  suspectData.acceptMarketing = true;
  formResult.sent = false;
  formResult.submitting = false;
  formResult.success = false;
  formResult.message = "";
}

async function onSubmit() {
  v$.value.$validate();

  if (formResult.sent) return;

  if (!v$.value.$error) {
    formResult.submitting = true;

    // TODO: send form data to endpoint and process response
    // await new Promise((r) => setTimeout(r, 5000));
    formResult.sent = true;
    formResult.submitting = false;

    localStorage.setItem('signupData', JSON.stringify(suspectData))
    router.push(localePath('/registro/wizard'))

    // formResult.success = true;
    // if (formResult.success) {
    //   formResult.message = props.formData.success.find(t => t._key === locale.value).value;
    // } else {
    //   formResult.message = props.formData.error.find(t => t._key === locale.value).value;
    // }
  } else {
    formResult.success = false;
  }
}

async function doSubmit() {
  console.log("ha clicado en submit");
  v$.value.$validate();

  if (formResult.sent) return;

  console.log(v$.value.$errors);
  if (!v$.value.$error) {
    formResult.submitting = true;

    const { token } = await executeRecaptcha(RecaptchaAction.login);
    const res = await $fetch(runtimeConfig.public.formWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "google-recaptcha-token": token ?? "",
      },
      body: {
        ...suspectData,
        gtoken: token,
      },
    });

    console.log("printing res ===========>");
    console.log(res);

    formResult.success = res.success;
    if (formResult.success) {
      formResult.message = props.formData.success.find(t => t._key === locale.value).value;
    } else {
      formResult.message = props.formData.error.find(t => t._key === locale.value).value;
    }
    formResult.sent = true;
    formResult.submitting = false;
  } else {
    formResult.success = false;
  }
}

onMounted(() => {
  clearForm();
});
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
