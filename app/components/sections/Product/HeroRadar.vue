<template>
    <section id="hero-8" class="bg--fixed hero-section">
        <div class="container">
            <div class="row d-flex align-items-center">

                <!-- HERO TEXT -->
                <div class="col-md-6 col-lg-7">
                    <div class="hero-8-txt color--white" v-if="hero">
                        <h2 class="s-54 w-700">{{ hero.heading?.find(t => t._key === locale)?.value }}</h2>
                        <p class="p-lg">{{ hero.subHeading?.find(t => t._key === locale)?.value }}</p>
                        <!-- HERO DIGITS -->
                        <div v-if="stats" class="hero-digits clearfix mt-3">
                            <div v-for="digit in stats.statGroup" :key="digit._key" class="hero-digits-block  col-md-6">
                                <div class="block-digit">
                                    <h2 class="s-46 statistic-number">
                                        {{ digit.value }}<span v-if="digit.unit">{{ digit.unit }}</span>
                                    </h2>
                                </div>
                                <div class="block-txt">
                                    <p class="p-sm">{{ digit.metric?.find(t => t._key === locale)?.value }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- END HERO DIGITS -->
                    </div>
                </div>
                <!-- END HERO TEXT -->

                <!-- HERO FORM -->
                <div class="col-md-6 col-lg-5">
                    <div id="hero-8-form" class="r-10" v-if="formData?.[0]">
                        <v-form @submit.prevent="doSubmit" class="row request-form">

                            <!-- EMAIL -->
                            <div class="col-md-12">
                                <div class="s-14 w-500 mb-1">{{ label('email') }}</div>
                                <v-text-field
                                    v-model="suspectData.email"
                                    @blur="checkResideliaUser"
                                    :error-messages="v$.email.$errors.map(e => e.$message)"
                                    :valid="!v$.email.$invalid"
                                    :placeholder="placeholder('email')"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-0"
                                    @input="v$.email.$touch"
                                />
                            </div>

                            <!-- NOMBRE -->
                            <div class="col-md-6">
                                <div class="s-14 w-500 mb-1">{{ label('firstName') }}</div>
                                <v-text-field
                                    v-model="suspectData.firstName"
                                    :error-messages="v$.firstName.$errors.map(e => e.$message)"
                                    :valid="!v$.firstName.$invalid"
                                    :placeholder="placeholder('firstName')"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-0"
                                    @input="v$.firstName.$touch"
                                    @blur="v$.firstName.$touch"
                                />
                            </div>

                            <!-- APELLIDOS -->
                            <div class="col-md-6">
                                <div class="s-14 w-500 mb-1">{{ label('lastName') }}</div>
                                <v-text-field
                                    v-model="suspectData.lastName"
                                    :error-messages="v$.lastName.$errors.map(e => e.$message)"
                                    :valid="!v$.lastName.$invalid"
                                    :placeholder="placeholder('lastName')"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-0"
                                    @input="v$.lastName.$touch"
                                    @blur="v$.lastName.$touch"
                                />
                            </div>

                            <!-- FRECUENCIA -->
                            <!-- <div class="col-md-12 mt-1">
                                <div class="s-14 w-500 mb-1">{{ label('frequency') }}</div>
                                <v-radio-group v-model="suspectData.frequency" inline hide-details>
                                    <v-radio :label="locale === 'es' ? 'Semanal' : 'Weekly'" value="weekly" /> -->
                                    <!-- El tooltip se activa solo cuando isResideliaUser=false (SKIP_USER_CHECK=false) -->
                                    <!-- <v-tooltip :disabled="isResideliaUser" location="top">
                                        <template #activator="{ props: tooltipProps }">
                                            <div v-bind="tooltipProps" style="display:inline-flex">
                                                <v-radio
                                                    :label="locale === 'es' ? 'Diaria' : 'Daily'"
                                                    value="daily"
                                                    :disabled="!isResideliaUser"
                                                />
                                            </div>
                                        </template>
                                        <span v-html="placeholder('frequency')" />
                                    </v-tooltip>
                                </v-radio-group>
                            </div> -->

                            <!-- RGPD (obligatorio) -->
                            <div v-if="formData[0].inputs.find(x => x.name === 'acceptRGPD')" class="col-md-12 pt-1">
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
                                            <p class="pt-2 mt-0 ml-1 text-left">
                                                {{ formData[0].inputs.find(x => x.name === 'acceptRGPD').description.find(t => t._key === locale).value }}
                                            </p>
                                        </div>
                                    </template>
                                </v-checkbox>
                            </div>

                            <!-- MARKETING (opt-in) -->
                            <div v-if="formData[0].inputs.find(x => x.name === 'acceptMarketing')" class="col-md-12 pt-1">
                                <v-checkbox
                                    v-model="suspectData.acceptMarketing"
                                    class="d-flex align-start"
                                >
                                    <template v-slot:label>
                                        <div class="contact-form-notice">
                                            <p class="pt-2 mt-0 ml-1 text-left">
                                                {{ formData[0].inputs.find(x => x.name === 'acceptMarketing').description.find(t => t._key === locale).value }}
                                            </p>
                                        </div>
                                    </template>
                                </v-checkbox>
                            </div>

                            <!-- SUBMIT -->
                            <div class="col-md-12 mt-2 form-btn">
                                <v-btn
                                    type="submit"
                                    block
                                    elevation=0
                                    size="x-large"
                                    :loading="formResult.submitting"
                                    :disabled="formResult.sent"
                                    class="btn btn--theme hover--theme submit"
                                >
                                    {{ formData[0].action.find(t => t._key === locale).value }}
                                </v-btn>
                            </div>

                            <!-- RESULTADO -->
                            <div class="col-md-12 mt-2" v-if="formResult.message">
                                <v-alert
                                    :type="formResult.success ? 'success' : 'error'"
                                    variant="tonal"
                                    density="compact"
                                >
                                    {{ formResult.message }}
                                </v-alert>
                            </div>

                        </v-form>
                    </div>
                </div>
                <!-- END HERO FORM -->

            </div>
        </div>

        <!-- WAVE SHAPE BOTTOM -->
        <div class="wave-shape-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 165"><path fill-opacity="1" d="M0,160L120,154.7C240,149,480,139,720,128C960,117,1200,107,1320,101.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
        </div>
    </section>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { required, email, minLength, sameAs, helpers } from "@vuelidate/validators"
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha"
import { formBlockQuery } from '../../../../queries/helperQueries'

// SHORTCUT: cambiar a false cuando la Supabase Edge Function esté disponible
const SKIP_USER_CHECK = true

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const { locale } = useI18n()
const { trackEvent, identifyUser } = useTracking()
const { executeRecaptcha } = useGoogleRecaptcha()

const props = defineProps<{
    product: String
    hero: Object
    textColor: String
    stats: Object
}>()

// Cargar formBlock tipo 'radar' desde Sanity (mismo patrón que Simple.vue y Signup.vue)
const formData = await useSanityData({
    query: formBlockQuery,
    params: { formType: 'radar' },
})

// Helpers localizados para acceder a campos del formBlock de Sanity
const label = (name: string) =>
    formData[0]?.inputs?.find(x => x.name === name)?.label?.find(t => t._key === locale.value)?.value ?? ''
const placeholder = (name: string) =>
    formData[0]?.inputs?.find(x => x.name === name)?.placeholder?.find(t => t._key === locale.value)?.value ?? ''
const validationMsg = (field: string, type: string) =>
    formData[0]?.inputs?.find(x => x.name === field)?.validation?.find(x => x.type === type)?.message?.find(t => t._key === locale.value)?.value ?? ''

// Estado del formulario
const suspectData = reactive({
    email: '',
    firstName: '',
    lastName: '',
    frequency: 'weekly',
    origin: 'radarNewsletter@' + route.fullPath,
    acceptRGPD: false,
    acceptMarketing: false,
    // Futuro: radarTypes: []  // ['flipping', 'rentabilidad', ...]
})

const formResult = reactive({
    sent: false,
    submitting: false,
    success: false,
    error: false,
    message: '',
})

// SKIP_USER_CHECK=true → todos pueden elegir "Diaria" (ambas opciones disponibles)
// SKIP_USER_CHECK=false → se verifica vía Supabase Edge Function al introducir el email
const isResideliaUser = ref(SKIP_USER_CHECK)
const checkingUser = ref(false)

// Validación Vuelidate (mismo patrón que Signup.vue)
const rules = computed(() => ({
    email: {
        required: helpers.withMessage(validationMsg('email', 'required'), required),
        email: helpers.withMessage(validationMsg('email', 'email'), email),
        $autoDirty: true,
    },
    firstName: {
        required: helpers.withMessage(validationMsg('firstName', 'required'), required),
        minLength: minLength(2),
        $autoDirty: true,
    },
    lastName: {
        required: helpers.withMessage(validationMsg('lastName', 'required'), required),
        minLength: minLength(2),
        $autoDirty: true,
    },
    acceptRGPD: {
        required: helpers.withMessage(validationMsg('acceptRGPD', 'required'), required),
        checked: helpers.withMessage(validationMsg('acceptRGPD', 'required'), sameAs(true)),
        $autoDirty: true,
    },
}))
const v$ = useVuelidate(rules, suspectData)

// Verificación de usuario via Supabase Edge Function (triggered @blur en el campo email)
// Con SKIP_USER_CHECK=true retorna inmediatamente sin hacer ninguna llamada API
async function checkResideliaUser() {
    if (SKIP_USER_CHECK) return
    await v$.value.email.$validate()
    if (v$.value.email.$invalid) return
    checkingUser.value = true
    try {
        const res = await $fetch<{ isActive: boolean }>(runtimeConfig.public.supabaseCheckUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${runtimeConfig.public.supabaseAnonKey}`
            },
            body: { email: suspectData.email }
        })
        isResideliaUser.value = res?.isActive ?? false
        if (!isResideliaUser.value && suspectData.frequency === 'daily') {
            suspectData.frequency = 'weekly'
        }
    } catch {
        isResideliaUser.value = false
    } finally {
        checkingUser.value = false
    }
}

// Envío del formulario (mismo patrón que doSubmit en Simple.vue)
async function doSubmit() {
    v$.value.$validate()
    if (formResult.sent) return
    if (!v$.value.$error) {
        formResult.submitting = true
        formResult.message = formData[0].submitting.find(t => t._key === locale.value).value

        const { token } = await executeRecaptcha(RecaptchaAction.login)
        const res = await $fetch<{ success: boolean }>(runtimeConfig.public.newsletterWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'google-recaptcha-token': token ?? '',
            },
            body: {
                ...suspectData,
                gtoken: token,
            },
        })

        formResult.success = res.success
        formResult.message = res.success
            ? formData[0].success.find(t => t._key === locale.value).value
            : formData[0].error.find(t => t._key === locale.value).value
        formResult.sent = true
        formResult.submitting = false

        trackEvent('Radar Newsletter Subscribed', { ...suspectData, ...formResult, clickedOnPage: route.path })
        identifyUser(suspectData.email, { ...suspectData })
    } else {
        formResult.success = false
    }
}
</script>

<style lang="css">
#hero-8-form {
    background: #fff;
    padding: 2rem;
}
</style>
