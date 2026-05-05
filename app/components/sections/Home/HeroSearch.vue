<template>
  <section class="hs">
    <div class="container">
      <div class="hs__inner">

        <!-- LEFT COLUMN -->
        <div class="hs__left">
          <span class="hs__overline">LA SOLUCIÓN TODO EN UNO</span>

          <h1 class="hs__h1" v-html="headingHtml" />

          <p class="hs__sub">{{ subHeading }}</p>

          <!-- Stats row -->
          <div v-if="stats?.statGroup?.length" class="hs__stats">
            <template v-for="(stat, i) in stats.statGroup.slice(0, 3)" :key="i">
              <div v-if="i > 0" class="hs__stat-sep" />
              <div class="hs__stat">
                <span class="hs__stat-num">{{ stat.value }}{{ stat.unit }}</span>
                <span class="hs__stat-lbl">{{ loc(stat.metric) }}</span>
              </div>
            </template>
          </div>

          <!-- Venta / Alquiler tabs -->
          <div class="hs__tabs">
            <button
              class="hs__tab"
              :class="{ 'hs__tab--active': opType === 'sale' }"
              @click="opType = 'sale'"
            >Venta</button>
            <button
              class="hs__tab"
              :class="{ 'hs__tab--active': opType === 'rent' }"
              @click="opType = 'rent'"
            >Alquiler</button>
          </div>

          <!-- Search bar -->
          <form class="hs__bar" @submit.prevent="doSearch">
            <div class="hs__bar-input">
              <svg class="hs__bar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#9CA3AF" stroke-width="1.5"/>
                <path d="M10 10L14 14" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <input
                v-model="address"
                type="text"
                placeholder="Dirección del inmueble"
                class="hs__bar-text"
                autocomplete="off"
              />
            </div>

            <div class="hs__bar-sep" />

            <div class="hs__bar-select-wrap">
              <svg class="hs__bar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 6v8h4v-4h4v4h4V6L8 1z" stroke="#9CA3AF" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <select v-model="propType" class="hs__bar-select">
                <option v-for="pt in PROP_TYPES" :key="pt.value" :value="pt.value">{{ pt.label }}</option>
              </select>
              <svg class="hs__bar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            <button type="submit" class="hs__bar-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#fff" stroke-width="1.5"/>
                <path d="M10 10L14 14" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Buscar inmuebles
            </button>
          </form>
        </div>

        <!-- RIGHT COLUMN: image -->
        <div class="hs__right">
          <img
            v-if="heroImage"
            :src="heroImage"
            alt="RESIDELIA"
            class="hs__img"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  hero: Record<string, any>
  stats: Record<string, any>
}>()

const loc = (arr: any[]) =>
  arr?.find((t: any) => t._key === locale.value)?.value
  ?? arr?.find((t: any) => t._key === locale.value.slice(0, 2))?.value
  ?? ''

const headingHtml = computed(() => {
  const full = loc(props.hero?.heading)
  const accent = loc(props.hero?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const subHeading = computed(() => loc(props.hero?.subHeading))
const heroImage = computed(() => props.hero?.image?.url)

const PROP_TYPES = [
  { label: 'Todas las viviendas', value: '' },
  { label: 'Solo pisos',          value: 'flat' },
  { label: 'Solo chalets',        value: 'house' },
  { label: 'Edificio singular',   value: 'building' },
  { label: 'Garaje',              value: 'garage' },
  { label: 'Local',               value: 'retail' },
  { label: 'Nave',                value: 'warehouse' },
  { label: 'Oficina',             value: 'office' },
  { label: 'Rural',               value: 'rural' },
  { label: 'Suelo rústico',       value: 'rustic_land' },
  { label: 'Suelo urbanizable',   value: 'developable_land' },
  { label: 'Suelo urbano',        value: 'urban_land' },
  { label: 'Trastero',            value: 'storage' },
]

const address = ref('')
const opType = ref<'sale' | 'rent'>('sale')
const propType = ref('')

function doSearch() {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_content: 'searchbar',
    address: address.value,
    type: opType.value,
  })
  if (propType.value) params.set('propertyType', propType.value)
  window.location.href = `https://app.residelia.com/explorer?${params}`
}
</script>

<style scoped>
/* ─── Section ──────────────────────────────────────────────────── */
.hs {
  background: #F5F7FA;
  padding: 48px 0 0;
}

.hs__inner {
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 48px;
  align-items: flex-end;
}

/* ─── Left column ──────────────────────────────────────────────── */
.hs__left {
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hs__overline {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9297A2;
  margin-bottom: 12px;
}

.hs__h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(36px, 4.5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #343E48;
  margin: 0 0 14px;
  text-wrap: balance;
}

.hs__sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.55;
  color: #9297A2;
  margin: 0 0 28px;
  max-width: 520px;
}

/* ─── Stats ────────────────────────────────────────────────────── */
.hs__stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.hs__stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hs__stat-num {
  font-family: 'DM Sans', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #343E48;
  letter-spacing: -0.01em;
  line-height: 1;
}

.hs__stat-lbl {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  line-height: 1.35;
  color: #9297A2;
  max-width: 100px;
}

.hs__stat-sep {
  width: 1px;
  height: 36px;
  background: #D1D5DB;
  flex-shrink: 0;
}

/* ─── Tabs ─────────────────────────────────────────────────────── */
.hs__tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.hs__tab {
  padding: 8px 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #9297A2;
  transition: background 150ms, color 150ms;
  line-height: 18px;
}

.hs__tab--active {
  background: #F97316;
  color: #fff;
}

.hs__tab:not(.hs__tab--active):hover {
  background: rgba(0,0,0,0.04);
}

/* ─── Search bar ───────────────────────────────────────────────── */
.hs__bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  max-width: 580px;
}

.hs__bar-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  min-width: 0;
}

.hs__bar-text {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #343E48;
  background: transparent;
  padding: 14px 0;
  min-width: 0;
}
.hs__bar-text::placeholder { color: #9297A2; }

.hs__bar-sep {
  width: 1px;
  height: 28px;
  background: #E5E7EB;
  flex-shrink: 0;
}

.hs__bar-select-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  position: relative;
  flex-shrink: 0;
}

.hs__bar-select {
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #343E48;
  cursor: pointer;
  padding: 14px 0;
  padding-right: 4px;
  white-space: nowrap;
}

.hs__bar-chevron {
  flex-shrink: 0;
}

.hs__bar-icon {
  flex-shrink: 0;
}

.hs__bar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px;
  padding: 10px 18px;
  background: #1778FB;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 150ms;
}
.hs__bar-btn:hover { background: #0f63d4; }

/* ─── Right column ─────────────────────────────────────────────── */
.hs__right {
  align-self: stretch;
  display: flex;
  align-items: flex-end;
}

.hs__img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

/* ─── Responsive ───────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .hs__inner { grid-template-columns: 1fr; }
  .hs__right { display: none; }
  .hs__left { padding-bottom: 40px; }
}

@media (max-width: 575px) {
  .hs { padding-top: 32px; }
  .hs__bar {
    flex-direction: column;
    align-items: stretch;
    border-radius: 10px;
  }
  .hs__bar-input { padding: 0 14px; }
  .hs__bar-sep { width: 100%; height: 1px; margin: 0; }
  .hs__bar-select-wrap { padding: 0 14px; }
  .hs__bar-btn { margin: 8px; }
}
</style>
