<template>
  <section v-if="profiles.length" class="as">
    <!-- Outer wrapper: provides scroll budget on desktop; flow on mobile -->
    <div ref="wrapperRef" class="as-wrapper">
      <!-- Sticky pinned content -->
      <div ref="pinRef" class="as-pin">
        <div class="as-container">
          <header class="as-head">
            <span v-if="upperHeading" class="as-eyebrow">{{ upperHeading }}</span>
            <h2 class="as-h2" v-html="headingHtml" />
          </header>

          <div class="as-tabs" role="tablist" aria-label="Audiences">
            <button
              v-for="(profile, i) in profiles"
              :key="`tab-${i}`"
              class="as-tab"
              role="tab"
              :aria-selected="activeTab === i"
              :aria-controls="`as-panel-${i}`"
              :id="`as-tab-${i}`"
              type="button"
              @click="onTabClick(i)"
            >
              <span>{{ loc(profile.title) }}</span>
            </button>
          </div>

          <div class="as-progress" aria-hidden="true">
            <div ref="progressFillRef" class="as-progress__fill" />
          </div>

          <div ref="panelsRef" class="as-panels" :class="{ 'as-panels--flow': isMobile }">
            <article
              v-for="(profile, i) in profiles"
              :key="`panel-${i}`"
              class="as-panel"
              role="tabpanel"
              :id="`as-panel-${i}`"
              :aria-labelledby="`as-tab-${i}`"
              :aria-hidden="activeTab !== i"
            >
              <div class="as-panel__copy">
                <h3 class="as-panel__h3">{{ loc(profile.headline) }}</h3>
                <p class="as-panel__lead">{{ loc(profile.body) }}</p>

                <NuxtLink
                  v-if="profile.cta?.linkType === 'internal' && profile.cta?.slug"
                  :to="$localePath(profile.cta.slug.find((s: any) => s._key === locale)?.value?.current + (profile.cta.queryString ?? ''))"
                  class="as-cta"
                >
                  {{ loc(profile.cta.linkText) }} <span class="as-cta__arrow">→</span>
                </NuxtLink>
                <a
                  v-else-if="profile.cta?.linkType === 'external' && profile.cta?.slug"
                  :href="profile.cta.slug"
                  class="as-cta"
                  target="_blank"
                  rel="noopener"
                >
                  {{ loc(profile.cta.linkText) }} <span class="as-cta__arrow">→</span>
                </a>
              </div>

              <aside v-if="profile.useCases?.length" class="as-detail">
                <span v-if="loc(profile.detailLabel)" class="as-detail__label">{{ loc(profile.detailLabel) }}</span>
                <ul class="as-bullets">
                  <li v-for="(uc, j) in profile.useCases" :key="j">{{ loc(uc.text) }}</li>
                </ul>
              </aside>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Equipos section (outside the scroll-hijack wrapper) -->
    <div v-if="teams.length" class="as-after">
      <div v-if="teamSectionLabel" class="as-divider">
        <span class="as-divider__label">{{ teamSectionLabel }}</span>
      </div>
      <div class="as-container">
        <div class="as-cards">
          <article v-for="(team, i) in teams" :key="`team-${i}`" class="as-card">
            <h4 class="as-card__h4">{{ loc(team.title) }}</h4>
            <p class="as-card__body">{{ loc(team.body) }}</p>
            <NuxtLink
              v-if="team.cta?.linkType === 'internal' && team.cta?.slug"
              :to="$localePath(team.cta.slug.find((s: any) => s._key === locale)?.value?.current + (team.cta.queryString ?? ''))"
              class="as-card__link"
            >
              {{ loc(team.cta.linkText) }} <span class="as-cta__arrow">→</span>
            </NuxtLink>
            <a
              v-else-if="team.cta?.linkType === 'external' && team.cta?.slug"
              :href="team.cta.slug"
              class="as-card__link"
              target="_blank"
              rel="noopener"
            >
              {{ loc(team.cta.linkText) }} <span class="as-cta__arrow">→</span>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  audiences: Record<string, any>
}>()

const loc = (arr: any) => Array.isArray(arr) ? (arr.find((t: any) => t._key === locale.value)?.value ?? '') : ''

const profiles = computed<any[]>(() => props.audiences?.profiles ?? [])
const teams = computed<any[]>(() => props.audiences?.teams ?? [])

const upperHeading = computed(() => loc(props.audiences?.upperHeading))
const teamSectionLabel = computed(() => loc(props.audiences?.teamSectionLabel))

const headingHtml = computed(() => {
  const full = loc(props.audiences?.heading)
  const accent = loc(props.audiences?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const wrapperRef = ref<HTMLElement | null>(null)
const pinRef = ref<HTMLElement | null>(null)
const panelsRef = ref<HTMLElement | null>(null)
const progressFillRef = ref<HTMLElement | null>(null)
const activeTab = ref(0)
const isMobile = ref(false)

const STEP_PX = 500

let mediaQuery: MediaQueryList | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null

const equalize = () => {
  const host = panelsRef.value
  if (!host) return
  if (isMobile.value) {
    host.style.minHeight = ''
    return
  }
  const panels = Array.from(host.querySelectorAll<HTMLElement>('.as-panel'))
  host.style.minHeight = '0px'
  let maxH = 0
  panels.forEach((p) => {
    const wasHidden = p.getAttribute('aria-hidden') === 'true'
    if (wasHidden) {
      p.style.transition = 'none'
      p.style.visibility = 'hidden'
      p.style.position = 'relative'
    }
    maxH = Math.max(maxH, p.offsetHeight)
    if (wasHidden) {
      p.style.position = ''
      p.style.visibility = ''
      requestAnimationFrame(() => { p.style.transition = '' })
    }
  })
  host.style.minHeight = (maxH + 8) + 'px'
}

const sizeWrapper = () => {
  const wrap = wrapperRef.value
  const pin = pinRef.value
  if (!wrap || !pin) return
  if (isMobile.value) {
    wrap.style.height = ''
    return
  }
  wrap.style.height = (pin.offsetHeight + STEP_PX * profiles.value.length) + 'px'
}

const updateProgress = (pct: number) => {
  if (progressFillRef.value) progressFillRef.value.style.width = pct + '%'
}

const onScroll = () => {
  const wrap = wrapperRef.value
  if (!wrap) return
  if (isMobile.value) {
    updateProgress(((activeTab.value + 1) / profiles.value.length) * 100)
    return
  }
  const rect = wrap.getBoundingClientRect()
  const past = -rect.top
  const N = profiles.value.length
  const totalBudget = STEP_PX * N

  let idx: number
  let pct: number
  if (past < 0) {
    idx = 0
    pct = 0
  } else if (past >= totalBudget) {
    idx = N - 1
    pct = 100
  } else {
    idx = Math.min(N - 1, Math.floor(past / STEP_PX))
    pct = (past / totalBudget) * 100
  }
  if (activeTab.value !== idx) activeTab.value = idx
  updateProgress(pct)

  // eslint-disable-next-line no-console
  // console.log('[AudienceSection]', { past: past.toFixed(0), wrapperH: wrap.style.height, idx, activeTab: activeTab.value })
}

const onTabClick = (idx: number) => {
  if (isMobile.value) {
    activeTab.value = idx
    updateProgress(((idx + 1) / profiles.value.length) * 100)
    return
  }
  const wrap = wrapperRef.value
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  const wTop = window.scrollY + rect.top
  window.scrollTo({ top: wTop + idx * STEP_PX, behavior: 'smooth' })
}

const onResize = () => {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    equalize()
    sizeWrapper()
    onScroll()
  }, 120)
}

const onMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = e.matches
  equalize()
  sizeWrapper()
  onScroll()
}

const init = () => {
  equalize()
  sizeWrapper()
  onScroll()
}

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(max-width: 640px)')
  isMobile.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)

  nextTick(init)
  // Re-init after full page load (fonts/images can change pin height)
  if (document.readyState === 'complete') {
    setTimeout(init, 50)
  } else {
    window.addEventListener('load', init, { once: true })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (mediaQuery) mediaQuery.removeEventListener('change', onMediaChange)
  if (resizeTimer) clearTimeout(resizeTimer)
})
</script>

<style scoped>
.as {
  background: #fff;
}

.as-wrapper {
  position: relative;
}

.as-pin {
  position: sticky;
  top: 0;
  background: #fff;
  padding: 96px 0 64px;
}

.as-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.as-head {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 40px;
}

.as-eyebrow {
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #1778FB;
  margin: 0 0 18px;
  display: inline-block;
}

.as-h2 {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #20252A;
  margin: 0;
  text-wrap: balance;
}

.as-h2 :deep(.color--theme) {
  color: #1778FB;
}

/* Tabs */
.as-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 0 0 28px;
}

.as .as-tab {
  appearance: none;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #D7DDE7;
  border-radius: 05px;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  color: #20252A;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
}

.as .as-tab:hover {
  border-color: #B4B9C4;
}

.as .as-tab[aria-selected="true"] {
  /* background: #1778FB; */
  background: #F97316;
  color: #fff;
  border-color: #F97316;
  /* border-color: #1778FB; */
}

.as .as-tab:focus-visible {
  outline: 2px solid #1778FB;
  outline-offset: 2px;
}

/* Progress */
.as-progress {
  height: 2px;
  background: #EEF2F7;
  border-radius: 2px;
  margin: 0 0 36px;
  overflow: hidden;
}

.as-progress__fill {
  height: 100%;
  background: #F97316;
  width: 0%;
  transition: width 120ms linear;
}

/* Panels */
.as-panels {
  position: relative;
  min-height: 360px;
}

.as-panel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 320ms ease, transform 320ms ease, visibility 0s linear 320ms;
}

.as-panel[aria-hidden="false"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 320ms ease, transform 320ms ease, visibility 0s linear 0s;
}

/* Mobile flow mode: panels stack normally */
.as-panels--flow {
  position: relative;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.as-panels--flow .as-panel {
  position: relative;
  inset: auto;
  transform: none;
  display: none;
}

.as-panels--flow .as-panel[aria-hidden="false"] {
  display: grid;
}

.as-panel__copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.as-panel__h3 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #20252A;
  margin: 0;
  text-wrap: balance;
}

.as-panel__lead {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #4F575E;
  margin: 0;
}

.as-cta {
  align-self: flex-start;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #1778FB;
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 1.5px solid transparent;
  transition: border-color 200ms ease, color 200ms ease;
}

.as-cta:hover {
  border-color: #1778FB;
}

.as-cta__arrow {
  display: inline-block;
  transition: transform 200ms ease;
}

.as-cta:hover .as-cta__arrow,
.as-card__link:hover .as-cta__arrow {
  transform: translateX(3px);
}

.as-detail {
  background: #F7F9FD;
  border-radius: 12px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.as-detail__label {
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6C7A86;
}

.as-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.as-bullets li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  color: #4F575E;
}

.as-bullets li::before {
  content: '';
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-top: 8px;
  border-radius: 50%;
  background: #FF8039;
}

/* Equipos (after) section */
.as-after {
  background: #fff;
  padding: 100px 0 120px;
}

.as-divider {
  margin: 0 auto 64px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  max-width: 1200px;
  padding: 0 24px;
}

.as-divider::before,
.as-divider::after {
  content: '';
  height: 1px;
  background: #D7DDE7;
}

.as-divider__label {
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6C7A86;
}

.as-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.as-card {
  background: #F7F9FD;
  border-radius: 8px;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: background 200ms ease, transform 200ms ease;
}

.as-card:hover {
  background: #EEF2F7;
  transform: translateY(-2px);
}

.as-card__h4 {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: #20252A;
  margin: 0;
  text-wrap: balance;
}

.as-card__body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  color: #6C7A86;
  margin: 0;
  flex: 1;
}

.as-card__link {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: #1778FB;
  text-decoration: none;
  transition: color 200ms ease;
}

/* Responsive */
@media (max-width: 960px) {
  .as-h2 { font-size: 32px; }
  .as-panel__h3 { font-size: 24px; }
  .as-panel { grid-template-columns: 1fr; gap: 24px; }
  .as-cards { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .as-container { padding: 0 20px; }
  .as-pin { padding: 64px 0 40px; }
  .as-h2 { font-size: 26px; }
  .as-tabs { grid-template-columns: 1fr; gap: 10px; }
  .as-tab { padding: 14px 20px; font-size: 14px; }
  .as-panel__h3 { font-size: 22px; }
  .as-cards { grid-template-columns: 1fr; gap: 12px; }
  .as-after { padding: 64px 0 80px; }
}
</style>
