<template>
  <section v-if="workflow?.wfSteps?.length" class="py-100" style="background: #fff;">
    <div class="container">
      <!-- HEADER -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 text-center">
          <span v-if="upperHeading" class="section-id mb-20 d-block">{{ upperHeading }}</span>
          <h2 class="s-40 w-700 mb-20" v-html="headingHtml" style="max-width: 820px; margin-left: auto; margin-right: auto;" />
          <p v-if="subHeading" class="s-18 color--grey" style="max-width: 720px; margin: 0 auto;">
            {{ subHeading }}
          </p>
        </div>
      </div>

      <!-- STEP CARDS -->
      <div class="lc-grid mt-60">
        <div
          v-for="(step, index) in workflow.wfSteps"
          :key="step._id ?? index"
          class="lc-card"
        >
          <!-- Icon -->
          <div class="lc-card__icon">
            <i
              v-if="step.isMDI && step.icon"
              class="mdi"
              :class="step.icon"
            ></i>
            <i
              v-else-if="step.icon"
              :class="step.icon"
            ></i>
            <i
              v-else
              class="bi"
              :class="defaultIcons[index] ?? 'bi-circle'"
            ></i>
          </div>

          <!-- Step number -->
          <div class="lc-card__num">
            {{ String(step.step ?? (index + 1)).padStart(2, '0') }}
          </div>

          <!-- Label -->
          <h6 class="lc-card__label">
            {{ loc(step.heading) }}
          </h6>

          <!-- Description -->
          <p class="lc-card__desc">
            {{ loc(step.subHeading) }}
          </p>

          <!-- Arrow connector -->
          <svg
            v-if="index < workflow.wfSteps.length - 1"
            class="lc-card__arrow"
            width="18"
            height="10"
            viewBox="0 0 18 10"
          >
            <path
              d="M1 5 H14 M10 1 L14 5 L10 9"
              stroke="#1778FB"
              stroke-width="1.4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  workflow: Record<string, any>
}>()

const defaultIcons = [
  'bi-file-earmark',
  'bi-bar-chart-line',
  'bi-check-circle',
  'bi-building',
  'bi-graph-up-arrow',
]

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const upperHeading = computed(() => loc(props.workflow?.upperHeading))

const headingHtml = computed(() => {
  const full = loc(props.workflow?.heading)
  const accent = loc(props.workflow?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const subHeading = computed(() => loc(props.workflow?.subHeading))
</script>

<style scoped>
.lc-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
@media (max-width: 991px) {
  .lc-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 575px) {
  .lc-grid { grid-template-columns: repeat(2, 1fr); }
}

.lc-card {
  background: #fff;
  border: 1px solid #EEF2F7;
  border-radius: 14px;
  padding: 24px 20px;
  position: relative;
  box-shadow: 0 2px 6px rgba(32,37,42,0.04);
}

.lc-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #E4F3FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 20px;
  color: #1778FB;
}

.lc-card__num {
  font-size: 11px;
  font-weight: 700;
  color: #1778FB;
  margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.lc-card__label {
  font-size: 18px;
  font-weight: 700;
  color: #20252A;
  margin: 0 0 8px;
  line-height: 1.25;
}

.lc-card__desc {
  font-size: 13.5px;
  line-height: 1.5;
  color: #6C7A86;
  margin: 0;
}

.lc-card__arrow {
  position: absolute;
  top: 44px;
  right: -12px;
  opacity: 0.5;
  z-index: 1;
}
@media (max-width: 991px) {
  .lc-card__arrow { display: none; }
}
</style>
