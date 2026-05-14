<template>
  <div
    class="hlc-container pt-5"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Step cards row -->
    <div class="hlc-grid">
      <component
        :is="step.url ? NuxtLink : 'div'"
        v-for="(step, i) in displaySteps"
        :key="i"
        :to="step.url || undefined"
        class="hlc-card"
        :class="{ 'hlc-card--active': i === activeTop, 'hlc-card--link': !!step.url }"
      >
        <div class="hlc-card__icon" :class="{ 'hlc-card__icon--active': i === activeTop }">
          <i class="bi" :class="step.iconClass"></i>
        </div>
        <div class="hlc-card__num">{{ step.num }}</div>
        <div class="hlc-card__label">{{ step.label }}</div>
      </component>
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
        :x1="c0" :y1="topY"
        :x2="c4" :y2="topY"
        stroke="#1778FB" stroke-width="2"
        stroke-dasharray="2 6" opacity="0.45"
      />

      <!-- Right descending line -->
      <line
        :x1="c4" :y1="topY"
        :x2="c4" :y2="returnY"
        stroke="#48AAF1" stroke-width="1.5"
        stroke-dasharray="4 5" opacity="0.7"
      />
      <!-- Bottom return line -->
      <line
        :x1="c4" :y1="returnY"
        :x2="c0" :y2="returnY"
        stroke="#48AAF1" stroke-width="1.5"
        stroke-dasharray="4 5" opacity="0.7"
      />
      <!-- Left ascending line -->
      <line
        :x1="c0" :y1="returnY"
        :x2="c0" :y2="topY"
        stroke="#48AAF1" stroke-width="1.5"
        stroke-dasharray="4 5" opacity="0.7"
      />

      <!-- Forward arrowheads between cards -->
      <g :transform="`translate(${(c0+c1)/2}, ${topY})`" opacity="0.8"><path d="M -5 -4 L 3 0 L -5 4 Z" fill="#1778FB"/></g>
      <g :transform="`translate(${(c1+c2)/2}, ${topY})`" opacity="0.8"><path d="M -5 -4 L 3 0 L -5 4 Z" fill="#1778FB"/></g>
      <g :transform="`translate(${(c2+c3)/2}, ${topY})`" opacity="0.8"><path d="M -5 -4 L 3 0 L -5 4 Z" fill="#1778FB"/></g>
      <g :transform="`translate(${(c3+c4)/2}, ${topY})`" opacity="0.8"><path d="M -5 -4 L 3 0 L -5 4 Z" fill="#1778FB"/></g>

      <!-- Return arrowhead -->
      <g :transform="`translate(${(c0+c4)/2}, ${returnY})`">
        <path d="M 5 -4 L -3 0 L 5 4 Z" fill="#48AAF1"/>
      </g>

      <!-- Moving asset dot -->
      <circle :cx="ax" :cy="ay" r="13" fill="#1778FB" opacity="0.08"/>
      <circle :cx="ax" :cy="ay" r="8"  fill="#1778FB" opacity="0.20"/>
      <circle :cx="ax" :cy="ay" r="5"  fill="#1778FB" filter="url(#heroAssetGlow)"/>
      <circle :cx="ax" :cy="ay" r="2.5" fill="#fff"/>
    </svg>

    <!-- Mobile-only moving dot (positioned along the vertical timeline) -->
    <div
      v-if="mounted"
      class="hlc-dot-mobile"
      :style="{ top: `${mobileDotTop}%` }"
    />
  </div>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
const { locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  wfSteps?: Record<string, any>[]
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value
  ?? arr?.find((t: any) => t._key === locale.value.slice(0, 2))?.value
  ?? ''

interface Step { num: string; label: string; iconClass: string; url: string }

const DEFAULT_STEPS: Step[] = [
  { num: '01', label: 'Estructurar',   iconClass: 'bi-file-earmark',    url: '' },
  { num: '02', label: 'Valorar',       iconClass: 'bi-bar-chart-line',  url: '' },
  { num: '03', label: 'Sanear',        iconClass: 'bi-check-circle',    url: '' },
  { num: '04', label: 'Gestionar',     iconClass: 'bi-building',        url: '' },
  { num: '05', label: 'Transaccionar', iconClass: 'bi-graph-up-arrow',  url: '' },
]

const displaySteps = computed<Step[]>(() => {
  const raw = props.wfSteps
  if (!raw?.length) return DEFAULT_STEPS
  return raw.slice(0, 5).map((s, i) => {
    const def = DEFAULT_STEPS[i]!
    const slug = s.cta?.[0]?.link?.slug?.find((t: any) => t._key === locale.value)?.value?.current
      ?? s.cta?.[0]?.link?.slug?.find((t: any) => t._key === locale.value.slice(0, 2))?.value?.current
    const qs = s.cta?.[0]?.queryString ?? ''
    return {
      num: String(s.step ?? (i + 1)).padStart(2, '0'),
      label: loc(s.heading) || def.label,
      iconClass: s.icon ?? def.iconClass,
      url: slug ? localePath(slug + qs) : '',
    }
  })
})

const CARD_W = 152
const GAP = 20
const N = 5
const totalW = CARD_W * N + GAP * (N - 1)
const ROW_H = 104
const LOOP_Y_OFFSET = 52
const SVG_H = ROW_H + LOOP_Y_OFFSET + 14

const c0 = CARD_W / 2
const c1 = CARD_W / 2 + (CARD_W + GAP)
const c2 = CARD_W / 2 + 2 * (CARD_W + GAP)
const c3 = CARD_W / 2 + 3 * (CARD_W + GAP)
const c4 = CARD_W / 2 + 4 * (CARD_W + GAP)
const topY = ROW_H / 2
const returnY = ROW_H + LOOP_Y_OFFSET

const PATH: { x: number; y: number }[] = [
  { x: c0, y: topY },
  { x: c1, y: topY },
  { x: c2, y: topY },
  { x: c3, y: topY },
  { x: c4, y: topY },
  { x: c4, y: returnY },
  { x: c0, y: returnY },
  { x: c0, y: topY },
]
const WEIGHTS = [0.65 / 4, 0.65 / 4, 0.65 / 4, 0.65 / 4, 0.07, 0.21, 0.07] as const

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

const activeTop = computed(() => {
  const tv = t.value
  if (tv < 0.65) return Math.min(4, Math.floor((tv / 0.65) * 5))
  if (tv >= 0.93) return 0
  return -1
})

const dotPos = computed(() => {
  let remaining = t.value
  let idx = 0
  while (idx < WEIGHTS.length && remaining > WEIGHTS[idx]!) {
    remaining -= WEIGHTS[idx]!
    idx++
  }
  const w = WEIGHTS[idx] ?? 1
  const frac = w ? remaining / w : 0
  const a = PATH[idx] ?? PATH[0]!
  const b = PATH[idx + 1] ?? PATH[PATH.length - 1]!
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac }
})

const ax = computed(() => dotPos.value.x)
const ay = computed(() => dotPos.value.y)

const mobileDotTop = computed(() => t.value * 100)
</script>

<style scoped>
.hlc-container {
  position: relative;
  width: min(876px, 100%);
  margin: 0 auto;
  padding-bottom: 80px;
  cursor: default;
}

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
  text-decoration: none;
}
.hlc-card--active {
  border: 2px solid #1778FB;
  padding: 15px 14px;
  box-shadow: 0 18px 40px rgba(23,120,251,0.20);
  transform: translateY(-3px);
}
.hlc-card--link {
  cursor: pointer;
}
.hlc-card--link:hover:not(.hlc-card--active) {
  border-color: #1778FB;
  box-shadow: 0 6px 20px rgba(23,120,251,0.12);
  transform: translateY(-2px);
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

.hlc-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.hlc-dot-mobile {
  display: none;
}

/* ── Mobile: vertical layout ──────────────────────────────────── */
@media (max-width: 639px) {
  .hlc-container {
    padding-bottom: 0;
    padding-left: 28px;
  }

  /* Vertical dashed timeline */
  .hlc-container::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      #1778FB 0, #1778FB 4px,
      transparent 4px, transparent 10px
    );
  }

  .hlc-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .hlc-card {
    position: relative;
    height: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
  }

  .hlc-card--active {
    padding: 11px 15px;
  }

  /* Downward arrow between cards, aligned with the vertical timeline */
  .hlc-card:not(:last-child)::after {
    content: '';
    position: absolute;
    left: -19px;
    bottom: -12px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #1778FB;
    z-index: 2;
  }

  .hlc-card__icon {
    flex-shrink: 0;
    margin-bottom: 0;
    position: relative;
    z-index: 1;
  }

  .hlc-card__num {
    margin-bottom: 2px;
  }

  .hlc-svg {
    display: none;
  }

  .hlc-dot-mobile {
    display: block;
    position: absolute;
    left: 13px;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #1778FB;
    box-shadow:
      0 0 0 4px rgba(23,120,251,0.15),
      0 0 0 8px rgba(23,120,251,0.06);
    z-index: 3;
    transition: top 0.2s linear;
    pointer-events: none;
  }
}
</style>
