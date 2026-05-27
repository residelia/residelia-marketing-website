<template>
  <div class="row justify-content-center">
    <div class="col-md-11 col-lg-10 col-xl-8">
      <template v-if="formResult.sent">
        <v-alert
          :text="formResult.message"
          :type="formResult.success ? 'success' : 'error'"
          :color="formResult.success ? '#16A175' : '#E73D3D'"
        ></v-alert>
      </template>
      <div v-else class="form-holder">
        <v-form name="contactform" class="row contact-form mx-1" @submit.prevent="doSubmit">
          <!-- Form Select -->
          <div v-if="formData.inputs.find(x => x.name === 'type')"
            class="col-md-12 input-subject"
          >
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'type').label.find(t => t._key === locale).value}}</p>
            <span>{{ formData.inputs.find(x => x.name === 'type').description.find(t => t._key === locale).value}} </span>
            <div v-for="error of v$.reason?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <select
              v-model="suspectData.reason"
              class="form-select subject"
              aria-label="Default select example"
            >
              <option
                v-for="option in formData.inputs.find(x => x.name === 'type').options"
                :key="option.value"
                :value="option.value === 'default' ? '' : option.value"
                :selected="option.value === 'default'"
                :disabled="option.value === 'default'"
              >
                {{ option.label.find(t => t._key === locale).value }}
              </option>
            </select>
          </div>
          <!-- Contact Form Input -->
          <div v-if="formData.inputs.find(x => x.name === 'firstName')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'firstName').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'firstName').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'firstName').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.firstName?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <input
              type="text"
              name="firstName"
              v-model="suspectData.firstName"
              class="form-control name"
              :class="{
                'border-error focus:border-error': v$.firstName.$error,
                'border-valid': !v$.firstName.$invalid,
              }"
              @change="v$.firstName.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'firstName').placeholder.find(t => t._key === locale).value"
            />
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'lastName')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'lastName').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'lastName').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'lastName').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.lastName?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <input
              type="text"
              name="lastName"
              v-model="suspectData.lastName"
              class="form-control name"
              :class="{
                'border-error focus:border-error': v$.lastName.$error,
                'border-valid': !v$.lastName.$invalid,
              }"
              @change="v$.lastName.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'lastName').placeholder.find(t => t._key === locale).value"
            />
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'email')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'email').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'email').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'email').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.email?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <input
              type="text"
              name="email"
              v-model="suspectData.email"
              class="form-control email"
              :class="{
                'border-error focus:border-error': v$.email.$error,
                'border-valid': !v$.email.$invalid,
              }"
              @change="v$.email.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'email').placeholder.find(t => t._key === locale).value"
            />
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'phone')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'phone').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'phone').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'phone').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.phone?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <input
              type="text"
              name="phone"
              v-model="suspectData.phone"
              class="form-control phone"
              :class="{
                'border-error focus:border-error': v$.phone.$error,
                'border-valid': !v$.phone.$invalid,
              }"
              @change="v$.phone.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'phone').placeholder.find(t => t._key === locale).value"
            />
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'company')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'company').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'company').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'company').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.company?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <input
              type="text"
              name="company"
              v-model="suspectData.company"
              class="form-control company"
              :class="{
                'border-error focus:border-error': v$.company.$error,
                'border-valid': !v$.company.$invalid,
              }"
              @change="v$.company.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'company').placeholder.find(t => t._key === locale).value"
            />
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'message')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'message').cols}`">
            <p class="p-lg">{{ formData.inputs.find(x => x.name === 'message').label.find(t => t._key === locale).value }}</p>
            <span>{{ formData.inputs.find(x => x.name === 'message').description.find(t => t._key === locale).value }} </span>
            <div v-for="error of v$.message?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <textarea
              v-model="suspectData.message"
              class="form-control message"
              :class="{
                'border-error focus:border-error': v$.message.$error,
                'border-valid': !v$.message.$invalid,
              }"
              name="message"
              rows="6"
              @change="v$.message.$touch"
              :placeholder="formData.inputs.find(x => x.name === 'message').placeholder.find(t => t._key === locale).value"
            ></textarea>
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'acceptRGPD')" class="col-sm-12" :class="`col-md-${formData.inputs.find(x => x.name === 'acceptRGPD').cols}`">
            <div v-for="error of v$.acceptRGPD?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <v-checkbox
              v-model="suspectData.acceptRGPD"
              class="d-flex align-start"
              @change="v$.acceptRGPD.$touch"
            >
              <template v-slot:label>
                <div class="contact-form-notice">
                  <p class="p-sm mt-0 ml-2">
                    {{ formData.inputs.find(x => x.name === 'acceptRGPD').description.find(t => t._key === locale).value }}
                  </p>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div v-if="formData.inputs.find(x => x.name === 'acceptMarketing')" class="col-sm-12 pt-2" :class="`col-md-${formData.inputs.find(x => x.name === 'acceptMarketing').cols}`">
            <div v-for="error of v$.acceptMarketing?.$errors" :key="error.$uid">
              <span class="error">{{ error.$message }}</span>
            </div>
            <v-checkbox
              v-model="suspectData.acceptMarketing"
              class="d-flex align-start"
            >
              <template v-slot:label>
                <div class="contact-form-notice">
                  <p class="p-sm mt-0 ml-2">
                    {{ formData.inputs.find(x => x.name === 'acceptMarketing').description.find(t => t._key === locale).value }}
                  </p>
                </div>
              </template>
            </v-checkbox>
          </div>
          <!-- Contact Form Button -->
          <div class="col-md-12 mt-15 form-btn text-right input-group-btn">
            <button
              v-if="!formResult.submitting"
              type="submit"
              class="btn btn--theme hover--theme submit"
            >{{ formData.action.find(t => t._key === locale).value }}
            </button>
          </div>
          <!-- Contact Form Message -->
          <div class="col-lg-12 contact-form-msg">
            <v-alert
              v-if="formResult.submitting"
              :text="formData.submitting.find(t => t._key === locale).value"
              type="info"
              color="#1778FB"
            ></v-alert>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, minLength, helpers } from "@vuelidate/validators";
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha";
import { useMainStore } from '../../../stores/mainStore';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()
const { trackEvent, identifyUser } = useTracking()
const props = defineProps<{
    reason?: String
    formData?: Object
}>();
// const formData = await useSanityData({
//     query: formBlockQuery,
//     params: { formType: 'contact' },
// })

// console.log(props.formData)
// console.log(locale)
// console.log(runtimeConfig.public.formWebhook);

const { executeRecaptcha } = useGoogleRecaptcha();

// ── CAMPAÑA CHALLENGE (temporal) ── Eliminar tras la campaña ──────────────
const CHALLENGE_MESSAGES: Record<string, string> = {
  es: 'Me pongo en contacto para solicitar el challenge de valoraciones de mi cartera inmobiliaria con los datos del CG de Notariado. Me gustaría que el equipo de RESIDELIA evaluara el potencial de mejora en la precisión de los AVMs con datos de cierre. Quedo a disposición para cualquier detalle adicional que necesiten.',
  en: 'I am reaching out to request the valuation challenge for my real estate portfolio using data from the General Council of Notaries. I would like the RESIDELIA team to evaluate the potential improvement in AVM accuracy using closing data. I am available to provide any additional details you may need.',
};
function getChallengeMessage() {
  if (props.reason === 'challenge') {
    return CHALLENGE_MESSAGES[locale.value] ?? CHALLENGE_MESSAGES['es'];
  }
  return '';
}
// ── FIN CAMPAÑA CHALLENGE ─────────────────────────────────────────────────

const suspectData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  origin: "contactForm",
  reason: props.reason,
  message: getChallengeMessage(), // ── CAMPAÑA CHALLENGE (temporal) ── Cambiar a "" al eliminar
  acceptRGPD: false,
  acceptMarketing: false,
});

// ── CAMPAÑA CHALLENGE (temporal) ── watch de seguridad para hidratación SSR
watch(() => props.reason, (reason) => {
  if (reason) suspectData.reason = reason;
  if (!suspectData.message) suspectData.message = getChallengeMessage();
}, { immediate: true });
// ── FIN CAMPAÑA CHALLENGE ─────────────────────────────────────────────────

const formResult = reactive({
  sent: false,
  submitting: false,
  success: true,
  error: false,
  message: "",
});

const rules = computed(() => {
  return {
    reason: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'type').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      $autoDirty: true,
    },
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
    phone: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'phone').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      numeric: helpers.withMessage(props.formData.inputs.find(x => x.name === 'phone').validation.find(x => x.type === 'minLength').message.find(t => t._key === locale.value).value, required),
      minLength: helpers.withMessage(props.formData.inputs.find(x => x.name === 'phone').validation.find(x => x.type === 'minLength').message.find(t => t._key === locale.value).value, minLength(props.formData.inputs.find(x => x.name === 'phone').size)),
      $autoDirty: true,
    },
    company: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'company').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      minLength: minLength(3),
      $autoDirty: true,
    },
    message: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'message').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      minLength: helpers.withMessage(props.formData.inputs.find(x => x.name === 'message').validation.find(x => x.type === 'minLength').message.find(t => t._key === locale.value).value, minLength(props.formData.inputs.find(x => x.name === 'message').size)),
      $autoDirty: true,
    },
    acceptRGPD: {
      required: helpers.withMessage(props.formData.inputs.find(x => x.name === 'acceptRGPD').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, required),
      checked: helpers.withMessage(props.formData.inputs.find(x => x.name === 'acceptRGPD').validation.find(x => x.type === 'required').message.find(t => t._key === locale.value).value, sameAs(true)),
      $autoDirty: true,
    },
  };
});

const v$ = useVuelidate(rules, suspectData);

function clearForm() {
  suspectData.firstName = "";
  suspectData.lastName = "";
  suspectData.email = "";
  suspectData.company = "";
  suspectData.phone = "";
  suspectData.origin = "contactForm";
  suspectData.reason = props.reason;
  suspectData.message = getChallengeMessage(); // ── CAMPAÑA CHALLENGE (temporal) ── Cambiar a "" al eliminar
  suspectData.acceptRGPD = false;
  suspectData.acceptMarketing = false;
  formResult.sent = false;
  formResult.submitting = false;
  formResult.success = false;
  formResult.message = "";
}

async function onSubmit() {
  v$.value.$validate();

  if (formResult.sent) return;

  console.log(suspectData);
  if (!v$.value.$error) {
    formResult.submitting = true;

    // TODO: send form data to endpoint and process response
    await new Promise((r) => setTimeout(r, 5000));

    formResult.success = true;
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

    // console.log("printing res ===========>");
    // console.log(res);

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

  // tracking event
  trackEvent(`${props.formData.title.find(l => l._key === 'es').value} Completed`,{ ...suspectData, ...formResult, clickedOnPage: route.path})
  identifyUser(suspectData.email, { ...suspectData, ...formResult, clickedOnPage: route.path })
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
.grecaptcha-badge { visibility: hidden; }

</style>
