<template>
  <section v-if="cp" class="py-100" style="background: #F7F9FD;">
    <div class="container">
      <!-- HEADER -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 text-center">
          <p v-if="subtitle" class="cp-subtitle">{{ subtitle }}</p>
          <h2 class="s-40 w-700" v-html="headingHtml" />
        </div>
      </div>

      <!-- QUADRANT MAP -->
      <div class="row justify-content-center mt-60">
        <div class="col-md-10">
          <div class="cp-map">
            <!-- Quadrants (positioned absolutely) -->
            <div
              v-for="(q, i) in quadrants"
              :key="i"
              class="cp-quadrant"
              :class="`cp-quadrant--${i}`"
            >
              <div class="cp-quadrant__label">{{ loc(q.label) }}</div>
              <div class="cp-quadrant__sub">{{ loc(q.sub) }}</div>
            </div>

            <!-- SVG connector lines -->
            <svg class="cp-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="22" y1="22" x2="50" y2="50" stroke="#D7DDE7" stroke-dasharray="1.2 1.2" stroke-width="0.5"/>
              <line x1="78" y1="22" x2="50" y2="50" stroke="#D7DDE7" stroke-dasharray="1.2 1.2" stroke-width="0.5"/>
              <line x1="22" y1="78" x2="50" y2="50" stroke="#D7DDE7" stroke-dasharray="1.2 1.2" stroke-width="0.5"/>
              <line x1="78" y1="78" x2="50" y2="50" stroke="#D7DDE7" stroke-dasharray="1.2 1.2" stroke-width="0.5"/>
            </svg>

            <!-- Center badge -->
            <div class="cp-badge">
              <div class="cp-badge__name">RESIDELIA</div>
              <div v-if="badge" class="cp-badge__sub">{{ badge }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  cp: Record<string, any>
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const subtitle = computed(() => loc(props.cp?.subtitle))

const headingHtml = computed(() => {
  const full = loc(props.cp?.heading)
  const accent = loc(props.cp?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const badge = computed(() => loc(props.cp?.badge))
const quadrants = computed(() => props.cp?.quadrants ?? [])
</script>

<style scoped>
.cp-subtitle {
  font-size: 14px;
  color: #6C7A86;
  font-style: italic;
  margin-bottom: 10px;
}

.cp-map {
  position: relative;
  background: #fff;
  border: 1px solid #EEF2F7;
  border-radius: 20px;
  padding: 24px;
  aspect-ratio: 16/10;
  max-width: 900px;
  margin: 0 auto;
}

.cp-connectors {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cp-quadrant {
  position: absolute;
  width: 38%;
  padding: 14px 18px;
  background: #F7F9FD;
  border-radius: 12px;
  border: 1px solid #EEF2F7;
}
.cp-quadrant--0 { top: 24px; left: 24px; }
.cp-quadrant--1 { top: 24px; right: 24px; }
.cp-quadrant--2 { bottom: 24px; left: 24px; }
.cp-quadrant--3 { bottom: 24px; right: 24px; }

.cp-quadrant__label {
  font-size: 14px;
  font-weight: 600;
  color: #4F575E;
  margin-bottom: 4px;
  line-height: 1.2;
}
.cp-quadrant__sub {
  font-size: 12px;
  color: #6C7A86;
  line-height: 1.3;
}

.cp-badge {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.cp-badge > div {
  background: #1778FB;
  color: #fff;
  border-radius: 16px;
  padding: 18px 28px;
  text-align: center;
  box-shadow: 0 18px 48px rgba(23,120,251,0.30);
  pointer-events: auto;
}
.cp-badge__name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}
.cp-badge__sub {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
  max-width: 220px;
  line-height: 1.35;
}

@media (max-width: 767px) {
  .cp-map {
    aspect-ratio: unset;
    min-height: 380px;
  }
  .cp-quadrant {
    width: 42%;
    padding: 10px 12px;
  }
  .cp-quadrant__label { font-size: 11px; }
  .cp-quadrant__sub { font-size: 10px; }
  .cp-badge__name { font-size: 15px; }
  .cp-badge__sub { font-size: 10px; }
}
</style>
