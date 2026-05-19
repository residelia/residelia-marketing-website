<template>
  <section class="hero-search">
    <div class="container">
      <div class="hero-search__inner">

        <!-- LEFT BLOCK: search content -->
        <div class="hero-search__left">

          <!-- Cycling heading -->
          <h1 v-if="isCycling" class="hero-search__h1">
            {{ headingParts[0] }}<span ref="cycleWrapRef" class="hero-search__cycle-wrap" :style="cycleWrapWidth ? { width: cycleWrapWidth } : {}"><span class="hero-search__cycle-col" :style="{ transform: `translateY(-${currentWordIndex * wordHeight}px)` }"><span v-for="word in cycleWords" :key="word" class="hero-search__cycle-word">{{ word }}</span></span></span>{{ headingParts[1] }}
          </h1>
          <h1 v-else class="hero-search__h1" v-html="headingHtml" />

          <p class="hero-search__sub">{{ subHeading }}</p>

          <!-- Stats row -->
          <div v-if="stats?.statGroup?.length" class="hero-search__stats">
            <template v-for="(stat, i) in stats.statGroup.slice(0, 4)" :key="i">
              <div v-if="i > 0" class="hero-search__stat-sep" />
              <div class="hero-search__stat">
                <span class="hero-search__stat-num">{{ stat.value }}{{ stat.unit }}</span>
                <span class="hero-search__stat-lbl">{{ loc(stat.metric) }}</span>
              </div>
            </template>
          </div>

          <!-- Comprar / Alquilar / Vender tabs (solo UTM, no afecta filtros) -->
          <div class="hero-search__tabs">
            <button
              type="button"
              class="hero-search__tab"
              :class="{ 'is-active': opType === 'sale' }"
              @click="opType = 'sale'"
            >{{ $t('heroSearch.tabBuy') }}</button>
            <button
              type="button"
              class="hero-search__tab"
              :class="{ 'is-active': opType === 'rent' }"
              @click="opType = 'rent'"
            >{{ $t('heroSearch.tabRent') }}</button>
            <button
              type="button"
              class="hero-search__tab"
              @click="navigateTo('/broker')"
            >{{ $t('heroSearch.tabSell') }}</button>
          </div>

          <!-- Search bar -->
          <form class="hero-search__bar" @submit.prevent="doSearch">

            <!-- Address input + autocomplete -->
            <div class="hero-search__bar-input">
              <i class="ri-search hero-search__bar-icon" aria-hidden="true"></i>
              <input
                v-model="addressQuery"
                type="text"
                :placeholder="$t('heroSearch.searchPlaceholder')"
                class="hero-search__bar-text"
                autocomplete="off"
                @input="onAddressInput"
                @keydown.down.prevent="moveHighlight(1)"
                @keydown.up.prevent="moveHighlight(-1)"
                @keydown.enter.prevent="onEnterKey"
                @keydown.esc="showPredictions = false"
                @focus="showPredictions = true"
                @blur="onAddressBlur"
              />
              <ul
                v-if="showPredictions && predictions.length"
                class="hero-search__predictions"
              >
                <li
                  v-for="(p, i) in predictions"
                  :key="p.placeId"
                  class="hero-search__prediction"
                  :class="{ 'is-highlighted': i === highlightIndex }"
                  @mousedown.prevent="selectPrediction(p)"
                  @mouseenter="highlightIndex = i"
                >
                  <i class="ri-location hero-search__prediction-icon" aria-hidden="true"></i>
                  <span class="hero-search__prediction-text">
                    <template v-for="(seg, idx) in segments(p.mainText)" :key="`m-${idx}`">
                      <strong v-if="seg.matched" class="hero-search__prediction-match">{{ seg.text }}</strong>
                      <template v-else>{{ seg.text }}</template>
                    </template>
                    <span v-if="p.secondaryText.text" class="hero-search__prediction-sub">&nbsp;{{ p.secondaryText.text }}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div class="hero-search__bar-sep" />

            <!-- Property type -->
            <label class="hero-search__bar-select-wrap">
              <i class="ri-home hero-search__bar-icon" aria-hidden="true"></i>
              <select v-model="propertyType" class="hero-search__bar-select">
                <option v-for="t in PROPERTY_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
              <i class="ri-chevron-simple-down hero-search__bar-chevron" aria-hidden="true"></i>
            </label>

            <div class="hero-search__bar-sep" />

            <!-- Legal situation -->
            <label class="hero-search__bar-select-wrap">
              <i class="ri-briefcase hero-search__bar-icon" aria-hidden="true"></i>
              <select v-model="legalSituation" class="hero-search__bar-select">
                <option v-for="l in LEGAL_SITUATIONS" :key="l.value" :value="l.value">{{ l.label }}</option>
              </select>
              <i class="ri-chevron-simple-down hero-search__bar-chevron" aria-hidden="true"></i>
            </label>

            <button
              type="submit"
              class="hero-search__bar-btn"
              :disabled="!selectedPlace"
            >
              <i class="ri-search hero-search__bar-btn-icon" aria-hidden="true"></i>
              <!-- <span class="hero-search__bar-btn-text">{{ $t('heroSearch.searchBtn') }}</span> -->
            </button>
          </form>
        </div>

        <!-- RIGHT BLOCK: hero image -->
        <div class="hero-search__right">
          <img
            v-if="heroImage"
            :src="heroImage"
            alt="RESIDELIA"
            class="hero-search__img"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useGooglePlaces, { type PlacePrediction, type PlaceText } from '~/composables/useGooglePlaces'

const { locale, t } = useI18n()

const props = defineProps<{
  hero: Record<string, any>
  stats: Record<string, any>
}>()

const loc = (arr: any[]) =>
  arr?.find((t: any) => t._key === locale.value)?.value
  ?? arr?.find((t: any) => t._key === locale.value.slice(0, 2))?.value
  ?? ''

// ── Static heading fallback (highlight via headingHighlight) ────
const headingHtml = computed(() => {
  const full = loc(props.hero?.heading)
  const accent = loc(props.hero?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

// ── Cycling heading ─────────────────────────────────────────────
const cycleWords = computed<string[]>(() => {
  const raw = loc(props.hero?.headingWords)
  if (!raw) return []
  return raw.split(',').map((w: string) => w.trim()).filter(Boolean)
})

const heading = computed(() => loc(props.hero?.heading))

const headingParts = computed<[string, string]>(() => {
  const parts = heading.value.split('{{cycling}}')
  return [parts[0] ?? '', parts[1] ?? '']
})

const isCycling = computed(
  () => cycleWords.value.length > 0 && heading.value.includes('{{cycling}}')
)

const currentWordIndex = ref(0)
const cycleWrapRef = ref<HTMLElement | null>(null)
const cycleWrapWidth = ref('')
const wordHeight = ref(0)

function measure() {
  const wordEls = cycleWrapRef.value?.querySelectorAll<HTMLElement>('.hero-search__cycle-word')
  if (!wordEls?.length) return
  const el = wordEls[currentWordIndex.value]
  if (el?.offsetWidth) cycleWrapWidth.value = `${el.offsetWidth}px`
  if (!wordHeight.value) wordHeight.value = wordEls[0]?.offsetHeight ?? 0
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  if (!isCycling.value) return
  nextTick(measure)
  if (cycleWords.value.length > 1) {
    timer = setInterval(() => {
      currentWordIndex.value = (currentWordIndex.value + 1) % cycleWords.value.length
      nextTick(measure)
    }, 2500)
  }
})
onUnmounted(() => clearInterval(timer))

// ────────────────────────────────────────────────────────────────
const subHeading = computed(() => loc(props.hero?.subHeading))
const heroImage = computed(() => props.hero?.image?.url)

// ── Tipologías (spec del explorer) ─────────────────────────────
// El orden y los copies coinciden con el diseño del dropdown.
// `residentialAll` es la selección por defecto = "Todas las viviendas".
const PROPERTY_TYPES = computed(() => [
  { value: 'residentialAll',   label: t('heroSearch.type_residentialAll') },
  { value: 'multiFamily',      label: t('heroSearch.type_multiFamily') },
  { value: 'singleFamily',     label: t('heroSearch.type_singleFamily') },
  { value: 'parking',          label: t('heroSearch.type_parking') },
  { value: 'storage',          label: t('heroSearch.type_storage') },
  { value: 'rural',            label: t('heroSearch.type_rural') },
  { value: 'retail',           label: t('heroSearch.type_retail') },
  { value: 'office',           label: t('heroSearch.type_office') },
  { value: 'warehouse',        label: t('heroSearch.type_warehouse') },
  { value: 'urban',            label: t('heroSearch.type_urban') },
  { value: 'rustic',           label: t('heroSearch.type_rustic') },
  { value: 'developable',      label: t('heroSearch.type_developable') },
  { value: 'singularBuilding', label: t('heroSearch.type_singularBuilding') },
])

// ── Situaciones jurídicas (spec del explorer) ───────────────────
const LEGAL_SITUATIONS = computed(() => [
  { value: '',                    label: t('heroSearch.allSituations') },
  { value: 'NPL',                 label: t('heroSearch.legal_NPL') },
  { value: 'REO',                 label: t('heroSearch.legal_REO') },
  { value: 'AUCTION_TRANSFER',    label: t('heroSearch.legal_AUCTION_TRANSFER') },
  { value: 'AUCTION',             label: t('heroSearch.legal_AUCTION') },
  { value: 'FULL_OWNERSHIP',      label: t('heroSearch.legal_FULL_OWNERSHIP') },
  { value: 'BARE_OWNERSHIP',      label: t('heroSearch.legal_BARE_OWNERSHIP') },
  { value: 'LONG_TERM_USE_RIGHT', label: t('heroSearch.legal_LONG_TERM_USE_RIGHT') },
  { value: 'OTHER',               label: t('heroSearch.legal_OTHER') },
])

// ── Estado del buscador ─────────────────────────────────────────
const opType = ref<'sale' | 'rent'>('sale')
const propertyType = ref<string>('residentialAll')
const legalSituation = ref('')

const addressQuery = ref('')
const selectedPlace = ref<{ address: string; lat: number; lng: number; zoom: number } | null>(null)

const { predictions, queryPredictions, fetchPlaceDetails, clear: clearPredictions } = useGooglePlaces()
const showPredictions = ref(false)
const highlightIndex = ref(-1)

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function onAddressInput() {
  selectedPlace.value = null
  highlightIndex.value = -1
  showPredictions.value = true
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => queryPredictions(addressQuery.value), 250)
}

function onAddressBlur() {
  setTimeout(() => { showPredictions.value = false }, 120)
}

function moveHighlight(delta: number) {
  if (!predictions.value.length) return
  showPredictions.value = true
  const n = predictions.value.length
  highlightIndex.value = (highlightIndex.value + delta + n) % n
}

function onEnterKey() {
  const candidate = showPredictions.value && highlightIndex.value >= 0
    ? predictions.value[highlightIndex.value]
    : undefined
  if (candidate) {
    selectPrediction(candidate)
  } else {
    doSearch()
  }
}

async function selectPrediction(p: PlacePrediction) {
  const details = await fetchPlaceDetails(p.placeId)
  if (!details) return
  selectedPlace.value = {
    address: details.formattedAddress || `${p.primary}${p.secondary ? `, ${p.secondary}` : ''}`,
    lat: details.location.lat,
    lng: details.location.lng,
    zoom: zoomForTypes(details.types),
  }
  addressQuery.value = selectedPlace.value.address
  showPredictions.value = false
  highlightIndex.value = -1
  clearPredictions()
}

// Divide el texto en segmentos resaltados / no resaltados según los `matches`
// devueltos por Places (offsets en utf-16 code units).
function segments(t: PlaceText): Array<{ text: string; matched: boolean }> {
  const text = t?.text ?? ''
  const matches = (t?.matches ?? []).slice().sort((a, b) => a.startOffset - b.startOffset)
  if (!text) return []
  if (!matches.length) return [{ text, matched: false }]
  const out: Array<{ text: string; matched: boolean }> = []
  let cursor = 0
  for (const m of matches) {
    if (m.startOffset > cursor) out.push({ text: text.slice(cursor, m.startOffset), matched: false })
    out.push({ text: text.slice(m.startOffset, m.endOffset), matched: true })
    cursor = m.endOffset
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor), matched: false })
  return out
}

function zoomForTypes(types: string[]): number {
  if (types.includes('street_address') || types.includes('premise')) return 17
  if (types.includes('route')) return 16
  if (types.includes('postal_code') || types.includes('sublocality')) return 14
  if (types.includes('locality') || types.includes('administrative_area_level_2')) return 12
  if (types.includes('administrative_area_level_1') || types.includes('country')) return 8
  return 13
}

function doSearch() {
  if (!selectedPlace.value) return
  const params = new URLSearchParams()
  if (propertyType.value) params.set('type', propertyType.value)
  if (legalSituation.value) {
    params.set('source', 'residelia')
    params.set('legalSituation', legalSituation.value)
  }
  params.set('section', 'search')
  params.set('source', 'residelia')
  params.set('lat', String(selectedPlace.value.lat))
  params.set('lng', String(selectedPlace.value.lng))
  params.set('zoom', String(selectedPlace.value.zoom))
  params.set('address', selectedPlace.value.address)
  params.set('utm_source', 'website')
  params.set('utm_content', 'searchbar')
  params.set('operation, opType.value)
  window.location.href = `https://app.residelia.com/explorer?${params}`
}
</script>
