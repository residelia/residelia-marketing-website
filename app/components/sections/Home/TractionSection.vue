<template>
  <section v-if="stats || customers" class="py-100" style="background: #F7F9FD;">
    <div class="container">
      <!-- EYEBROW (from stats.upperHeading) -->
      <div v-if="eyebrow" class="row justify-content-center">
        <div class="col text-center">
          <span class="section-id mb-48 d-block">{{ eyebrow }}</span>
        </div>
      </div>

      <!-- METRIC CARDS -->
      <div v-if="stats?.statGroup?.length" class="traction-metrics">
        <div
          v-for="stat in stats.statGroup"
          :key="stat._id"
          class="traction-metric"
        >
          <div class="traction-metric__value">
            {{ stat.value }}{{ stat.unit }}
          </div>
          <div class="traction-metric__label">
            {{ stat.metric?.find((t: any) => t._key === locale)?.value }}
          </div>
        </div>
      </div>

      <!-- CUSTOMER LOGOS -->
      <div v-if="customers?.customersGroup?.length" class="traction-logos" :class="{ 'mt-60': stats?.statGroup?.length }">
        <div v-if="customersHeading" class="traction-logos__heading">
          {{ customersHeading }}
        </div>
        <SlidersBrandLogos :customers="customers.customersGroup" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  stats: Record<string, any> | null
  customers: Record<string, any> | null
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

// Reads eyebrow from stats.upperHeading in Sanity
const eyebrow = computed(() => loc(props.stats?.upperHeading))

// Reads "Confían en RESIDELIA" from customers.heading or customers.upperHeading
const customersHeading = computed(() =>
  loc(props.customers?.heading) || loc(props.customers?.upperHeading)
)
</script>

<style scoped>
.traction-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 980px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .traction-metrics { grid-template-columns: 1fr; max-width: 360px; }
}

.traction-metric {
  background: #fff;
  border: 1px solid #EEF2F7;
  border-radius: 16px;
  padding: 36px 24px;
  text-align: center;
}
.traction-metric__value {
  font-size: 54px;
  font-weight: 700;
  color: #1778FB;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 10px;
}
.traction-metric__label {
  font-size: 15px;
  font-weight: 500;
  color: #4F575E;
  line-height: 1.3;
}

.traction-logos { text-align: center; }
.traction-logos__heading {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6C7A86;
  margin-bottom: 24px;
}
</style>
