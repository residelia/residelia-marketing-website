<template>
  <section id="hero-v2" class="hero-v2">
    <!-- Decorative background blob -->
    <!-- <svg class="hero-v2__blob" viewBox="0 0 600 600" aria-hidden="true">
      <path
        d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z"
        transform="translate(300 300) scale(3)"
        fill="#E4F3FF"
      />
    </svg> -->

    <div class="container hero-v2__inner">
      <!-- Main heading -->
      <h1 class="hero-v2__h1" v-html="headingHtml" />

      <!-- Primary subheading -->
      <p v-if="subHeading" class="hero-v2__sub">{{ subHeading }}</p>

      <!-- Buttons (same pattern as Hero3) -->
      <div v-if="hero.buttons" class="hero-v2__buttons">
        <template v-for="(button, index) in hero.buttons" :key="index">
          <NuxtLink
            v-if="button.button.linkType === 'anchor'"
            type="button"
            :to="button.button.anchor"
            class="btn r-04 mr-5 hover--theme"
            :class="{ 'btn--theme': index === 0, 'btn--theme-secondary': index !== 0 }"
            @click="handleClick(button.button.id, 'home-hero-button')"
          >{{ loc(button.button.linkText) }}</NuxtLink>

          <a
            v-else-if="button.button.linkType === 'external'"
            type="button"
            :href="button.button.externalUrl"
            class="btn r-04 mr-5 hover--theme"
            :class="{ 'btn--theme': index === 0, 'btn--theme-secondary': index !== 0 }"
            target="_blank"
            rel="noopener"
            @click="handleClick(button.button.id, 'home-hero-button')"
          >{{ loc(button.button.linkText) }}</a>

          <NuxtLink
            v-else-if="button.button.linkType === 'internal'"
            type="button"
            :to="$localePath(button.button.link.slug.find((l: any) => l._key === locale)?.value?.current + (button.button.queryString ?? ''))"
            class="btn r-04 mr-5 hover--theme"
            :class="{ 'btn--theme': index === 0, 'btn--theme-secondary': index !== 0 }"
            @click="handleClick(button.button.id, 'home-hero-button')"
          >{{ loc(button.button.linkText) }}</NuxtLink>

          <ElementsVideoModal
            v-else-if="button.button.linkType === 'video'"
            :link="button.button.externalUrl"
          >
            <template #button>
              <span
                class="btn r-04 hover--theme"
                :class="{ 'btn--theme': index === 0, 'btn--theme-secondary': index !== 0 }"
                @click="handleClick(button.button.id, 'home-hero-button')"
              >{{ loc(button.button.linkText) }}</span>
            </template>
          </ElementsVideoModal>
        </template>
      </div>

      <!-- ─── Animated lifecycle circuit ─── -->
      <div class="hlc-wrap pt-5">
        <div
          class="hlc-container"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
        >
          <!-- Step cards row -->
          <div class="hlc-grid">
            <div
              v-for="(step, i) in displaySteps"
              :key="i"
              class="hlc-card"
              :class="{ 'hlc-card--active': i === activeTop }"
            >
              <div class="hlc-card__icon" :class="{ 'hlc-card__icon--active': i === activeTop }">
                <i class="bi" :class="step.iconClass"></i>
              </div>
              <div class="hlc-card__num">{{ step.num }}</div>
              <div class="hlc-card__label">{{ step.label }}</div>
            </div>
          </div>

          <!-- SVG circuit overlay (only rendered client-side) -->
          <svg
            v-if="mounted"
            class="hlc-svg"
            :viewBox="`0 0 ${totalW} ${SVG_H}`"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="heroAssetGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- Forward dashed line (steps 0→4) -->
            <line
              :x1="centers[0]" :y1="topY"
              :x2="centers[4]" :y2="topY"
              stroke="#1778FB" stroke-width="2"
              stroke-dasharray="2 6" opacity="0.45"
            />

            <!-- Right descending curve -->
            <path
              :d="`M ${centers[4]} ${topY} Q ${centers[4]+28} ${(topY+returnY)/2} ${centers[4]} ${returnY}`"
              stroke="#48AAF1" stroke-width="1.5" fill="none"
              stroke-dasharray="4 5" opacity="0.7"
            />
            <!-- Bottom return line -->
            <line
              :x1="centers[4]" :y1="returnY"
              :x2="centers[0]" :y2="returnY"
              stroke="#48AAF1" stroke-width="1.5"
              stroke-dasharray="4 5" opacity="0.7"
            />
            <!-- Left ascending curve -->
            <path
              :d="`M ${centers[0]} ${returnY} Q ${centers[0]-28} ${(topY+returnY)/2} ${centers[0]} ${topY}`"
              stroke="#48AAF1" stroke-width="1.5" fill="none"
              stroke-dasharray="4 5" opacity="0.7"
            />

            <!-- Forward arrowheads between cards -->
            <g
              v-for="(cx, i) in centers.slice(0, 4)"
              :key="`arr-${i}`"
              :transform="`translate(${(cx + centers[i+1]) / 2}, ${topY})`"
              opacity="0.8"
            >
              <path d="M -5 -4 L 3 0 L -5 4 Z" fill="#1778FB"/>
            </g>

            <!-- Return arrowhead -->
            <g :transform="`translate(${(centers[0]+centers[4])/2}, ${returnY})`">
              <path d="M 5 -4 L -3 0 L 5 4 Z" fill="#48AAF1"/>
            </g>

            <!-- Moving asset dot -->
            <circle :cx="ax" :cy="ay" r="13" fill="#1778FB" opacity="0.08"/>
            <circle :cx="ax" :cy="ay" r="8"  fill="#1778FB" opacity="0.20"/>
            <circle :cx="ax" :cy="ay" r="5"  fill="#1778FB" filter="url(#heroAssetGlow)"/>
            <circle :cx="ax" :cy="ay" r="2.5" fill="#fff"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const { trackEvent } = useTracking()

const props = defineProps<{
  hero: Record<string, any>
  wfSteps?: Record<string, any>[]
}>()

// ─── Localization helper ───────────────────────────────────────────────────
const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value
  ?? arr?.find((t: any) => t._key === locale.value.slice(0, 2))?.value
  ?? ''

// ─── Hero text ─────────────────────────────────────────────────────────────
const headingHtml = computed(() => {
  const full = loc(props.hero?.heading)
  const accent = loc(props.hero?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const subHeading = computed(() => loc(props.hero?.subHeading))

function handleClick(eventName: string, buttonId: string) {
  trackEvent(eventName, { clickedOnPage: route.path, buttonId })
}

// ─── Step data for the circuit ─────────────────────────────────────────────
const DEFAULT_STEPS = [
  { num: '01', label: 'Estructurar',    iconClass: 'bi-file-earmark' },
  { num: '02', label: 'Valorar',        iconClass: 'bi-bar-chart-line' },
  { num: '03', label: 'Sanear',         iconClass: 'bi-check-circle' },
  { num: '04', label: 'Gestionar',      iconClass: 'bi-building' },
  { num: '05', label: 'Transaccionar',  iconClass: 'bi-graph-up-arrow' },
]

const displaySteps = computed(() => {
  const raw = props.wfSteps
  if (!raw?.length) return DEFAULT_STEPS
  return raw.slice(0, 5).map((s, i) => ({
    num: String(s.step ?? (i + 1)).padStart(2, '0'),
    label: loc(s.heading) || DEFAULT_STEPS[i].label,
    iconClass: s.icon ?? DEFAULT_STEPS[i].iconClass,
  }))
})

// ─── Animation geometry (static constants) ────────────────────────────────
const CARD_W = 152
const GAP = 20
const N = 5
const totalW = CARD_W * N + GAP * (N - 1)   // 876
const ROW_H = 104
const LOOP_Y_OFFSET = 52
const SVG_H = ROW_H + LOOP_Y_OFFSET + 14

const centers = Array.from({ length: N }, (_, i) => CARD_W / 2 + i * (CARD_W + GAP))
const topY = ROW_H / 2
const returnY = ROW_H + LOOP_Y_OFFSET

// Waypoints the dot travels through
const PATH = [
  { x: centers[0], y: topY },
  { x: centers[1], y: topY },
  { x: centers[2], y: topY },
  { x: centers[3], y: topY },
  { x: centers[4], y: topY },
  { x: centers[4], y: returnY },
  { x: centers[0], y: returnY },
  { x: centers[0], y: topY },
]
// Time weight of each segment (sums to 1.0)
const WEIGHTS = [0.65 / 4, 0.65 / 4, 0.65 / 4, 0.65 / 4, 0.07, 0.21, 0.07]

// ─── Animation state ───────────────────────────────────────────────────────
const mounted = ref(false)
const t = ref(0)
const paused = ref(false)
let rafId: number | null = null
let startTs: number | null = null

function tick(ts: number) {
  if (startTs == null) startTs = ts
  t.value = ((ts - startTs) / 12000) % 1
  rafId = requestAnimationFrame(tick)
}

watch(paused, (isPaused) => {
  if (isPaused) {
    if (rafId != null) cancelAnimationFrame(rafId)
    rafId = null
  } else {
    startTs = null
    rafId = requestAnimationFrame(tick)
  }
})

onMounted(() => {
  mounted.value = true
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId)
})

// ─── Derived animation values ──────────────────────────────────────────────
const activeTop = computed(() => {
  const tv = t.value
  if (tv < 0.65) return Math.min(4, Math.floor((tv / 0.65) * 5))
  if (tv >= 0.93) return 0
  return -1
})

const dotPos = computed(() => {
  let remaining = t.value
  let idx = 0
  while (idx < WEIGHTS.length && remaining > WEIGHTS[idx]) {
    remaining -= WEIGHTS[idx]
    idx++
  }
  const frac = WEIGHTS[idx] ? remaining / WEIGHTS[idx] : 0
  const a = PATH[idx] ?? PATH[0]
  const b = PATH[idx + 1] ?? PATH[PATH.length - 1]
  return {
    x: a.x + (b.x - a.x) * frac,
    y: a.y + (b.y - a.y) * frac,
  }
})

const ax = computed(() => dotPos.value.x)
const ay = computed(() => dotPos.value.y)
</script>

<style scoped>
/* ── Hero wrapper ─────────────────────────────────────────────────── */
.hero-v2 {
  padding: 96px 0 80px;
  background: linear-gradient(180deg, #F7F9FD 0%, #ffffff 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-v2__blob {
  position: absolute;
  top: -120px;
  right: -140px;
  width: 460px;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.hero-v2__inner {
  position: relative;
  z-index: 1;
}

/* ── Typography ───────────────────────────────────────────────────── */
.hero-v2__h1 {
  font-size: clamp(36px, 5vw, 62px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: #20252A;
  max-width: 960px;
  margin: 0 auto 24px;
  text-wrap: balance;
}

.hero-v2__sub {
  font-size: 20px;
  line-height: 1.55;
  color: #4F575E;
  max-width: 720px;
  margin: 0 auto 36px;
}

/* ── Buttons ──────────────────────────────────────────────────────── */
.hero-v2__buttons {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

/* ── Circuit wrapper ──────────────────────────────────────────────── */
.hlc-wrap {
  width: 100%;
  overflow-x: auto;
  /* hide scrollbar while keeping scroll */
  scrollbar-width: none;
}
.hlc-wrap::-webkit-scrollbar { display: none; }

.hlc-container {
  position: relative;
  width: 876px; /* CARD_W*5 + GAP*4 */
  margin: 0 auto;
  padding-bottom: 80px; /* space for return path */
  cursor: default;
}

/* ── Step cards ───────────────────────────────────────────────────── */
.hlc-grid {
  display: grid;
  grid-template-columns: repeat(5, 152px);
  gap: 26px;
  position: relative;
  z-index: 2;
}

.hlc-card {
  background: #fff;
  border: 1px solid #EEF2F7;
  border-radius: 14px;
  padding: 16px 15px;
  height: 114px;
  box-shadow: 0 2px 6px rgba(32,37,42,0.05);
  transition: box-shadow 260ms ease-out, border-color 260ms ease-out, transform 260ms ease-out;
  text-align: left;
  will-change: transform;
}
.hlc-card--active {
  border: 2px solid #1778FB;
  padding: 15px 14px;
  box-shadow: 0 18px 40px rgba(23,120,251,0.20);
  transform: translateY(-3px);
}

.hlc-card__icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #E4F3FF;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #1778FB;
  transition: background 260ms ease-out;
}
.hlc-card__icon--active {
  background: #1778FB;
  color: #fff;
}

.hlc-card__num {
  font-size: 10px;
  font-weight: 700;
  color: #1778FB;
  margin-bottom: 4px;
  letter-spacing: 0.04em;
}

.hlc-card__label {
  font-size: 14px;
  font-weight: 700;
  color: #20252A;
  line-height: 1.2;
}

/* ── SVG overlay ──────────────────────────────────────────────────── */
.hlc-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

/* ── Responsive: hide circuit on mobile ──────────────────────────── */
@media (max-width: 575px) {
  .hlc-wrap { display: none; }
  .hero-v2__buttons { margin-bottom: 0; }
}
</style>
