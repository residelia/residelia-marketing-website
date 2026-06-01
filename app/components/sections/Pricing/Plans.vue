<template>
    <section v-if="plans" id="pricing-1" class="pb-40 inner-page-hero pricing-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-8">
                    <div class="section-title mb-30">
                        <!-- Title -->
                        <h1 class="s-52 w-700">{{ plans.heading?.find(t => t._key === locale).value}}</h1>
                        <p  class="p-xl color--gray mt-0">{{ plans.generalDiscount.generalDiscountText?.find(t => t._key === locale).value}}</p>
                        <!-- TOGGLE BUTTON -->
                        <div class="toggle-btn ext-toggle-btn toggle-btn-md mt-30">
                            <span class="toggler-txt"> {{ plans.monthlyBilling?.find(t => t._key === locale).value}}</span>
                            <label class="switch-wrap">
                                <input type="checkbox" id="checbox" v-model="yearly" @change="togglePrices" />
                                <span class="switcher bg--grey switcher--theme">
                                    <span class="show-annual"></span>
                                    <span class="show-monthly"></span>
                                </span>
                            </label>
                            <span class="toggler-txt">{{ plans.yearlyBilling?.find(t => t._key === locale).value}}</span>
                                <ClientOnly>
                                    <v-tooltip :text="$t('onePayment')">
                                        <template v-slot:activator="{ props }">
                                            <span class="ri-circle-info" v-bind="props"></span>
                                        </template>
                                    </v-tooltip>
                                </ClientOnly>
                            <p v-if="!showMonthly" class="mt-1 color--theme">{{ plans.discount?.find(t => t._key === locale).value}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END SECTION TITLE -->

            <!-- ASSETS SLIDER -->
            <!-- <div id="assets-slider" class="mb-3">
                <div class="text-caption">
                    Selecciona el número de activos
                </div>
                <v-slider color="#1055B3" v-model="assets" :max="maxAssets" :min="minAssets" :step="step"  :thumb-label="assets <= maxAssets" show-ticks="always" :ticks="ticksToShow"></v-slider>
            </div> -->
            <!-- END ASSETS SLIDER -->

            <!-- PRICING TABLES -->
            <div class="pricing-1-wrapper">
                <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2">
                    <!-- PRICING PLAN -->

                    <div v-for="(plan,index) in plans.pricingPlans" class="col">
                        <div :id="`pt-1-${index+1}`" class="p-table pricing-1-table bg--white-100 block-shadow r-12">
                            <!-- TABLE HEADER -->
                            <div class="pricing-table-header">
                                <!-- Title -->
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="s-24 mb-0">{{ plan.title?.find(t => t._key === locale).value }}</h5>
                                    <div v-if="!showMonthly && plan.noPrice" class="px-2 pt-1 bg--secondary-200 color--white r-04">
                                        <h6 class="s-8 pb-1">{{ $t('save') }} {{ plan.yearlyDiscount }}%</h6>
                                    </div>
                                </div>
                                <!-- Text -->
                                <p class="s-13 w-400 subline">{{ plan.description.find(t => t._key === locale).value }}</p>
                                <!-- Price -->
                                <div class="price">
                                    <!-- Monthly/Yearly Price -->
                                    <div v-if="plan.noPrice" class="price">
                                        <span v-if="plans.generalDiscount.generalDiscountApplied" class="discount color--grey">{{ Math.round(totalPrice(plan, index, showMonthly) / (plans.generalDiscount.generalDiscount / 100)) }}</span>
                                        <span class="color--black">{{ totalPrice(plan, index, showMonthly) }}</span>
                                        <sup class="s-9 validity color--grey">&nbsp;{{ plan.currency?.find(t => t._key === locale).value }}&nbsp;/&nbsp;{{ $t('monthlyPeriod') }}</sup>
                                        <p class="s-12 w-700 btn-txt text-center color--grey">{{ $t('pricePeriodDescription', (showMonthly ? 2 : 1)).toUpperCase() }}</p>
                                    </div>
                                    <div v-else>
                                        <p class="s-12 w-600 color--black pt-1">{{ $t('contactus') }}</p>
                                        <p class="s-12 w-700 btn-txt text-center color--grey mb-3"></p>
                                    </div>
                                </div>
                                <!-- End Price -->
                                <!-- Button -->
                                <NuxtLink v-if="plan.callToAction.linkType === 'internal'" :to="$localePath(plan.callToAction.link.slug.find(l => l._key === locale).value.current+(plan.callToAction.queryString ? plan.callToAction.queryString : ''))" class="pt-btn btn--theme btn r-04 hover--theme" v-follow >{{ plan.callToAction.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                                <NuxtLink v-if="plan.callToAction.linkType === 'external'" :to="plan.callToAction.externalUrl" class="pt-btn btn--theme btn r-04 hover--theme" external>{{ plan.callToAction.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }}</NuxtLink>
                            </div>
                            <!-- END TABLE HEADER -->
                            <!-- CLOSINGS ADD-ON -->
                            <div v-if="plan.closingsPrice && plan.noPrice" class="closings-addon-section">
                                <div class="closings-addon-row">
                                    <p class="s-11 w-500 color--grey text-uppercase ls-1 mb-2">{{ $t('addonLabel') }}</p>
                                    <label :for="`closings-${index}`" class="closings-addon-label">
                                        <input
                                            :id="`closings-${index}`"
                                            type="checkbox"
                                            v-model="closingsSelected[index]"
                                            class="closings-check"
                                        />
                                        <div>
                                            <p class="s-12 w-600 mb-0 color--black">{{ $t('closingsAddonLabel') }}</p>
                                            <!-- <p class="s-11 mb-0 color--grey">+{{ showMonthly ? plan.closingsPrice : plan.closingsYearlyPrice }} {{ plan.currency?.find(t => t._key === locale)?.value }}/{{ $t('monthlyPeriod') }}</p> -->
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <!-- PRICING FEATURES -->
                            <div class="pricing-features color--black ico-10 mt-25 s-12">
                                <PortableText :value="plan.includes.find(t => t._key === locale).value.content" :components="serializers"/>
                            </div>
                        </div>
                    </div>
                    <!-- END PRICING PLAN -->
                </div>
            </div>
            <!-- PRICING TABLES -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Code from '../../elements/Code.vue'
import Callout from '../../elements/Callout.vue'
import BlockQuote from '../../elements/BlockQuote.vue'
import Link from '../../elements/Link.vue'
import InternalLink from '../../elements/InternalLink.vue'
import SeoImage from '../../elements/SeoImage.vue'
import VideoImage from '../../elements/VideoImage.vue'
import List from '../../elements/List.vue'
import NumberedList from '../../elements/NumberedList.vue'
import ListItemPricing from '../../elements/ListItemPricing.vue'
import { PortableText } from '@portabletext/vue';

const showMonthly = ref(false);
const assets = ref(5);
const yearly = ref(true);

const starterInitialPrice = 0
const minAssets = 5
const maxAssets = 500
const step = 1
let ticks = []

const ticksToShow = computed(() => {
    for (let i = minAssets; i < maxAssets; i++) {
        if (i % 50 === 0) {
            ticks[i] = i
        }
    }
    // ticks[maxAssets] = maxAssets
    ticks[maxAssets+10] = `+${maxAssets}`
    return ticks
});
const starterPricing = computed(() => {
    if (assets.value <= minAssets) {
        return 0;
    } else {
        return assets.value * 50;
    }
});

function togglePrices() {
    showMonthly.value = !showMonthly.value;
}


const { locale } = useI18n()

const props = defineProps<{
    plans?: Object
}>();

const closingsSelected = ref<boolean[]>([]);

watch(() => (props.plans as any)?.pricingPlans, (plans) => {
    if (plans) closingsSelected.value = (plans as any[]).map(() => true)
}, { immediate: true })

function totalPrice(plan: any, index: number, monthly: boolean): number {
    const base = monthly
        ? plan.monthlyPrice
        : Math.round(plan.monthlyPrice * (1 - plan.yearlyDiscount / 100))
    const closingsAddon = closingsSelected.value[index]
        ? (monthly ? (plan.closingsPrice ?? 0) : (plan.closingsYearlyPrice ?? 0))
        : 0
    return base + closingsAddon
}
const serializers = {
    types: {
        code: Code,
        callout: Callout,
        seoImage: SeoImage,
        video: VideoImage
    },
    list: {
        bullet: List,
        number: NumberedList,
    },
    listItem: {
        bullet: ListItemPricing,
        number: ListItemPricing
    },
    block: {
        'blockquote': (_, { slots }) => h('blockquote', { class: 'blockquote w-300' }, slots.default?.()),
    },
    marks: {
        'externalLink': Link,
        'internalLink': InternalLink,
        'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
        'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
        'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
    }
}

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>


<style>
.v-input.v-input--switch--inset .v-input--switch__track:after {
    content: "No";
    color: #333333;
    font-size: 10px;
}

.v-input.v-input--switch--inset.v-input--is-label-active.v-input--is-dirty .v-input--switch__track:after{
   content: "Yes";
   color: #28A745;
}
.subline {
    margin-top: 0.1rem;
    line-height: 1rem;
    letter-spacing: -1px;
    color: #000;
}
.closings-addon-row {
    margin-top: 15px;
    padding: 10px 12px;
    background: #f0f5ff;
    border: 1px solid #d0e0ff;
    border-radius: 8px;
}
.closings-addon-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 0;
    width: 100%;
}
.closings-check {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    cursor: pointer;
    margin-top: 3px;
    accent-color: #1055B3;
}
</style>
