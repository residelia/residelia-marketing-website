<template>
    <section id="project-1" class="gr--whitesmoke inner-page-hero single-project">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="project-description">

                        <!-- BACK LINK -->
                        <NuxtLink 
                            :to="$localePath({ name: 'resources-type', params: { type: route.params.type } })"
                            class="s-12 project-title px-0" v-follow
                        >
                            <span class="mb-20"><v-icon>mdi-chevron-left</v-icon>{{ $t('backToResources') }}</span>
                        </NuxtLink>  

                        <!-- HERO TEXT -->
                        <div class="project-title mb-20">
                            <!-- Overline (categoría) -->
                            <p v-if="resource.heroOverline" class="post-tag color--theme color--primary-400 mt-5 mb-1" style="letter-spacing:0.08em;">
                                {{ resource.heroOverline?.find((l: any) => l._key === locale)?.value }}
                            </p>
                            <!-- Title -->
                            <h2 class="s-52 w-700">{{ resource.title?.find((l: any) => l._key === locale)?.value }}</h2>
                            <!-- Subtitle -->
                            <p class="p-xl color--grey">{{ resource.description?.find((l: any) => l._key === locale)?.value }}</p>
                        </div>
                        <!-- END HERO TEXT -->

                        <!-- COVER IMAGE + FORM -->
                        <div class="row align-items-start mb-50">
                            <!-- Cover image -->
                            <div :class="resource.hasForm ? 'col-lg-7' : 'col-lg-12'">
                                <div v-if="resource.heroImage?.url" class="project-priview-img">
                                    <img
                                        class="img-fluid r-16"
                                        :src="resource.heroImage.url"
                                        :alt="resource.heroImageAlt ?? ''"
                                    />
                                </div>
                            </div>

                            <!-- Download form (conditional) -->
                            <div v-if="resource.hasForm && formData?.[0]" class="col-lg-5">
                                <div id="resource-download-form" class="r-10">
                                    <v-form @submit.prevent="doSubmit" class="row request-form">

                                        <div class="col-md-12">
                                            <div class="s-14 w-500 mb-1">{{ label('email') }}</div>
                                            <v-text-field
                                                v-model="suspectData.email"
                                                :error-messages="v$.email.$errors.map(e => e.$message)"
                                                :placeholder="placeholder('email')"
                                                variant="outlined" density="compact" class="mb-0"
                                                @input="v$.email.$touch" @blur="v$.email.$touch"
                                            />
                                        </div>

                                        <div class="col-md-6">
                                            <div class="s-14 w-500 mb-1">{{ label('firstName') }}</div>
                                            <v-text-field
                                                v-model="suspectData.firstName"
                                                :error-messages="v$.firstName.$errors.map(e => e.$message)"
                                                :placeholder="placeholder('firstName')"
                                                variant="outlined" density="compact" class="mb-0"
                                                @input="v$.firstName.$touch" @blur="v$.firstName.$touch"
                                            />
                                        </div>

                                        <div class="col-md-6">
                                            <div class="s-14 w-500 mb-1">{{ label('lastName') }}</div>
                                            <v-text-field
                                                v-model="suspectData.lastName"
                                                :error-messages="v$.lastName.$errors.map(e => e.$message)"
                                                :placeholder="placeholder('lastName')"
                                                variant="outlined" density="compact" class="mb-0"
                                                @input="v$.lastName.$touch" @blur="v$.lastName.$touch"
                                            />
                                        </div>

                                        <div class="col-md-12">
                                            <div class="s-14 w-500 mb-1">{{ label('company') }}</div>
                                            <v-text-field
                                                v-model="suspectData.company"
                                                :error-messages="v$.company.$errors.map(e => e.$message)"
                                                :placeholder="placeholder('company')"
                                                variant="outlined" density="compact" class="mb-0"
                                                @input="v$.company.$touch" @blur="v$.company.$touch"
                                            />
                                        </div>

                                        <div class="col-md-12">
                                            <div class="s-14 w-500 mb-1">{{ label('phone') }}</div>
                                            <v-text-field
                                                v-model="suspectData.phone"
                                                :error-messages="v$.phone.$errors.map(e => e.$message)"
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
                            <!-- END FORM -->
                        </div>
                        <!-- END COVER IMAGE + FORM -->

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
import Code from '../../elements/Code.vue'
import Callout from '../../elements/Callout.vue'
import SeoImage from '../../elements/SeoImage.vue'
import VideoImage from '../../elements/VideoImage.vue'
import Link from '../../elements/Link.vue'
import InternalLink from '../../elements/InternalLink.vue'
import List from '../../elements/List.vue'
import NumberedList from '../../elements/NumberedList.vue'
import ListItem from '../../elements/ListItem.vue'
import { PortableText } from '@portabletext/vue'

const props = defineProps<{ data: Array<any> }>()

const { locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { trackEvent, identifyUser } = useTracking()
const { executeRecaptcha } = useGoogleRecaptcha()

const resource = computed(() => props.data?.[0] ?? {})

// Form data (only loaded if resource has form)
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
#resource-download-form {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    position: sticky;
    top: 100px;
}
</style>
