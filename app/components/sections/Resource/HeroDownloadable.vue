<template>
    <section class="resource-hero  resource-hero--downloadable">
        <div class="container">

            <div class="resource-hero__grid">

                <!-- LEFT: eyebrow + title + subtitle + cover mockup + bullets -->
                <div class="resource-hero__copy">
                    <p v-if="resource.heroOverline" class="resource-hero__eyebrow post-tag color--theme">
                        {{ t(resource.heroOverline) }}
                    </p>
                    <h1 class="resource-hero__title">{{ t(resource.title) }}</h1>
                    <p class="resource-hero__subtitle">{{ t(resource.description) }}</p>

                    <!-- Cover mockup -->
                    <div class="resource-cover-row">
                        <div class="resource-cover-card" :style="{ background: coverColor }">
                            <span class="resource-cover-card__label">{{ coverLabel }}</span>
                            <span class="resource-cover-card__title">{{ t(resource.title) }}</span>
                            <span class="resource-cover-card__bar" />
                        </div>
                        <div class="resource-cover-meta">
                            <div class="resource-cover-meta__type color--theme">{{ coverTypeText }}</div>
                            <div class="resource-cover-meta__desc">Descarga inmediata · Compatible con todos los dispositivos</div>
                        </div>
                    </div>

                    <!-- Bullets (whatWillYouFind) -->
                    <ul v-if="bullets.length" class="resource-hero__bullets">
                        <li v-for="(bullet, i) in bullets" :key="i">
                            <span class="resource-hero__bullet-icon">
                                <v-icon size="13" color="#1680fb">mdi-check</v-icon>
                            </span>
                            <span>{{ t(bullet.text) }}</span>
                        </li>
                    </ul>
                </div>

                <!-- RIGHT: contenedor para el embed script de terceros -->
                <div v-if="formType === 'snippet' && resource.snippetCode"
                     class="resource-hero__form-col resource-form-card"
                     v-html="snippetHtmlWithoutScripts" />

                <!-- RIGHT: formulario nativo -->
                <div v-else-if="formType === 'native' && formData?.[0]" class="resource-hero__form-col">
                    <div class="resource-form-card">
                        <v-form @submit.prevent="doSubmit" class="resource-form-card__inner">

                            <div class="col-md-12">
                                <div class="s-14 w-500 mb-1">{{ label('email') }}</div>
                                <v-text-field
                                    v-model="suspectData.email"
                                    :error-messages="v$.email.$errors.map(e => String(e.$message))"
                                    :placeholder="placeholder('email')"
                                    variant="outlined" density="compact" class="mb-0"
                                    @input="v$.email.$touch" @blur="v$.email.$touch"
                                />
                            </div>

                            <div class="col-md-6">
                                <div class="s-14 w-500 mb-1">{{ label('firstName') }}</div>
                                <v-text-field
                                    v-model="suspectData.firstName"
                                    :error-messages="v$.firstName.$errors.map(e => String(e.$message))"
                                    :placeholder="placeholder('firstName')"
                                    variant="outlined" density="compact" class="mb-0"
                                    @input="v$.firstName.$touch" @blur="v$.firstName.$touch"
                                />
                            </div>

                            <div class="col-md-6">
                                <div class="s-14 w-500 mb-1">{{ label('lastName') }}</div>
                                <v-text-field
                                    v-model="suspectData.lastName"
                                    :error-messages="v$.lastName.$errors.map(e => String(e.$message))"
                                    :placeholder="placeholder('lastName')"
                                    variant="outlined" density="compact" class="mb-0"
                                    @input="v$.lastName.$touch" @blur="v$.lastName.$touch"
                                />
                            </div>

                            <div class="col-md-12">
                                <div class="s-14 w-500 mb-1">{{ label('company') }}</div>
                                <v-text-field
                                    v-model="suspectData.company"
                                    :error-messages="v$.company.$errors.map(e => String(e.$message))"
                                    :placeholder="placeholder('company')"
                                    variant="outlined" density="compact" class="mb-0"
                                    @input="v$.company.$touch" @blur="v$.company.$touch"
                                />
                            </div>

                            <div class="col-md-12">
                                <div class="s-14 w-500 mb-1">{{ label('phone') }}</div>
                                <v-text-field
                                    v-model="suspectData.phone"
                                    :error-messages="v$.phone.$errors.map(e => String(e.$message))"
                                    :placeholder="placeholder('phone')"
                                    variant="outlined" density="compact" class="mb-0"
                                    @input="v$.phone.$touch" @blur="v$.phone.$touch"
                                />
                            </div>

                            <!-- RGPD -->
                            <div v-if="formData[0].inputs.find((x: any) => x.name === 'acceptRGPD')" class="col-md-12 pt-1">
                                <div v-for="error of v$.acceptRGPD?.$errors" :key="error.$uid">
                                    <span class="error">{{ error.$message }}</span>
                                </div>
                                <v-checkbox v-model="suspectData.acceptRGPD" class="d-flex align-start" @change="v$.acceptRGPD.$touch">
                                    <template v-slot:label>
                                        <p class="pt-2 mt-0 ml-1 text-left s-13">
                                            {{ formData[0].inputs.find((x: any) => x.name === 'acceptRGPD')?.label?.find((t: any) => t._key === locale)?.value }}
                                        </p>
                                    </template>
                                </v-checkbox>
                            </div>

                            <!-- Submit -->
                            <div class="col-md-12 mt-2 form-btn">
                                <v-btn type="submit" block elevation=0 size="x-large"
                                    :loading="formResult.submitting" :disabled="formResult.sent"
                                    class="btn btn--theme hover--theme submit">
                                    {{ formData[0].action?.find((t: any) => t._key === locale)?.value }}
                                </v-btn>
                            </div>

                            <!-- Result -->
                            <div class="col-md-12 mt-2" v-if="formResult.message">
                                <v-alert :type="formResult.success ? 'success' : 'error'" variant="tonal" density="compact">
                                    {{ formResult.message }}
                                </v-alert>
                            </div>

                        </v-form>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { required, email, minLength, helpers } from "@vuelidate/validators"
import useGoogleRecaptcha, { RecaptchaAction } from "~/composables/useGoogleRecaptcha"
import { formBlockQuery } from '../../../../queries/helperQueries'

const props = defineProps<{ data: Array<any> }>()

const { locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { trackEvent, identifyUser } = useTracking()
const { executeRecaptcha } = useGoogleRecaptcha()

const resource = computed(() => props.data?.[0] ?? {})

// formType explícito tiene prioridad; fallback a hasForm para recursos legacy sin formType
const formType = computed(() => {
    if (resource.value.formType) return resource.value.formType
    if (resource.value.hasForm) return 'native'
    return 'none'
})

const snippetHtmlWithoutScripts = computed(() =>
    (resource.value.snippetCode ?? '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
)

onMounted(() => {
    if (formType.value !== 'snippet' || !resource.value.snippetCode) return

    if ((window as any).ResideliaForms) {
        (window as any).ResideliaForms.mount()
        return
    }

    const tmp = document.createElement('div')
    tmp.innerHTML = resource.value.snippetCode
    tmp.querySelectorAll('script').forEach(orig => {
        const s = document.createElement('script')
        Array.from(orig.attributes).forEach(attr => s.setAttribute(attr.name, attr.value))
        if (!orig.src) s.textContent = orig.textContent ?? ''
        document.head.appendChild(s)
    })
})
const t = (arr?: Array<{ _key: string; value: string }>) =>
    arr?.find(l => l._key === locale.value)?.value ?? ''

const typeLabel = computed(() => {
    const slug = String(route.params.type ?? '')
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
})

const coverColor = computed(() => resource.value.coverColor || '#1680fb')

const coverLabelMap: Record<string, string> = {
    reports: 'INFORME',
    trends: 'TENDENCIAS',
    tips: 'GUÍA',
    useCase: 'CASO DE USO',
    template: 'PLANTILLA',
    video: 'VÍDEO',
}
const coverTypeTextMap: Record<string, string> = {
    reports: 'PDF · Informe',
    trends: 'PDF · Análisis',
    tips: 'PDF · Guía',
    useCase: 'PDF · Caso de uso',
    template: 'Plantilla descargable',
    video: 'Vídeo gratuito',
}
const coverLabel = computed(() => coverLabelMap[resource.value.type] ?? 'RECURSO')
const coverTypeText = computed(() => coverTypeTextMap[resource.value.type] ?? 'Descarga gratuita')

const bullets = computed(() => resource.value.whatWillYouFind?.bullets ?? [])

const { data: _fd } = await useAsyncData('resource-download-form', () =>
    resource.value.hasForm
        ? useSanityData({ query: formBlockQuery, params: { formType: 'resource' } })
        : Promise.resolve([])
)
const formData = _fd.value ?? []

const label = (name: string) =>
    formData[0]?.inputs?.find((x: any) => x.name === name)?.label?.find((t: any) => t._key === locale.value)?.value ?? ''
const placeholder = (name: string) =>
    formData[0]?.inputs?.find((x: any) => x.name === name)?.placeholder?.find((t: any) => t._key === locale.value)?.value ?? ''
const validationMsg = (field: string, type: string) =>
    formData[0]?.inputs?.find((x: any) => x.name === field)?.validation?.find((x: any) => x.type === type)?.message?.find((t: any) => t._key === locale.value)?.value ?? ''

const suspectData = reactive({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    origin: 'resourceDownload@' + route.fullPath,
    acceptRGPD: false,
})

const formResult = reactive({
    sent: false,
    submitting: false,
    success: false,
    error: false,
    message: '',
})

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
    company: {
        required: helpers.withMessage(validationMsg('company', 'required'), required),
        $autoDirty: true,
    },
    phone: {
        required: helpers.withMessage(validationMsg('phone', 'required'), required),
        $autoDirty: true,
    },
    acceptRGPD: {
        checked: helpers.withMessage(validationMsg('acceptRGPD', 'required'), (val: boolean) => val === true),
        $autoDirty: true,
    },
}))
const v$ = useVuelidate(rules, suspectData)

async function doSubmit() {
    v$.value.$validate()
    if (formResult.sent) return
    if (!v$.value.$error) {
        formResult.submitting = true
        formResult.message = formData[0].submitting?.find((t: any) => t._key === locale.value)?.value ?? ''

        const { token } = await executeRecaptcha(RecaptchaAction.login)
        const res = await $fetch<{ success: boolean }>(runtimeConfig.public.formWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'google-recaptcha-token': token ?? '' },
            body: { ...suspectData, gtoken: token },
        })

        formResult.success = res.success
        formResult.message = res.success
            ? formData[0].success?.find((t: any) => t._key === locale.value)?.value ?? ''
            : formData[0].error?.find((t: any) => t._key === locale.value)?.value ?? ''
        formResult.sent = true
        formResult.submitting = false

        trackEvent('Resource Downloaded', { ...suspectData, clickedOnPage: route.path })
        identifyUser(suspectData.email, { ...suspectData })
    }
}
</script>

<style scoped>
.resource-hero--downloadable {
    padding: 180px 0 88px;
    background: #f8f9fe;
    overflow: hidden;
}

.resource-hero__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 64px;
    align-items: flex-start;
}

.resource-hero__eyebrow {
    margin-bottom: 16px !important;
}

.resource-hero__title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #20252A;
    margin: 0 0 18px;
}

.resource-hero__subtitle {
    font-size: 1.125rem;
    line-height: 1.55;
    color: #4F575E;
    margin: 0 0 28px;
    max-width: 540px;
}

/* Cover mockup */
.resource-cover-row {
    display: flex;
    gap: 24px;
    align-items: center;
    margin: 0 0 32px;
    padding: 20px 24px;
    background: #fff;
    border-radius: 14px;
    border: 1px solid #EEF2F7;
}

.resource-cover-card {
    width: 90px;
    height: 116px;
    flex-shrink: 0;
    border-radius: 6px;
    position: relative;
    box-shadow: 0 14px 28px rgba(32, 37, 42, 0.18);
    transform: rotate(-3deg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
}

.resource-cover-card__label {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
}

.resource-cover-card__title {
    font-size: 11px;
    font-weight: 700;
    line-height: 1.2;
    color: #fff;
}

.resource-cover-card__bar {
    display: block;
    width: 24px;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
}

.resource-cover-meta__type {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.resource-cover-meta__desc {
    font-size: 0.8rem;
    line-height: 1.5;
    color: #6C7A86;
}

/* Bullets */
.resource-hero__bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.resource-hero__bullets li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 1rem;
    line-height: 1.5;
    color: #20252A;
}

.resource-hero__bullet-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #1680fb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
}

/* Form column */
.resource-hero__form-col {
    position: sticky;
    top: 90px;
}

.resource-form-card {
    background: #fff;
    border: 1px solid #EEF2F7;
    border-radius: 16px;
    padding: 32px 28px;
    box-shadow: 0 18px 48px rgba(32, 37, 42, 0.06);
}

.resource-form-card__inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

/* Estilos para el formulario inyectado por el snippet de terceros */
.resource-form-card :deep(.lead-input) {
    width: 100%;
    height: auto;
    padding: 10px 14px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 4px;
    font-size: 0.875rem;
    color: #20252a;
    margin-bottom: 12px;
    transition: border-color 0.15s;
    display: block;
    box-sizing: border-box;
}
.resource-form-card :deep(.lead-input:focus) {
    outline: none;
    border-color: #1680fb;
    border-width: 2px;
}
.resource-form-card :deep(.lead-form-msg) {
    font-size: 0.875rem;
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 6px;
}
.resource-form-card :deep(.lead-form-msg.success) {
    color: #16a175;
    background: #f0fdf8;
}
.resource-form-card :deep(.lead-form-msg.error) {
    color: #e73d3d;
    background: #fff5f5;
}

/* Responsive */
@media (max-width: 991px) {
    .resource-hero__grid {
        grid-template-columns: 1fr;
    }
    .resource-hero__form-col {
        position: static;
    }
}
</style>
