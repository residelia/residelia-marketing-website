<template>
  <section v-if="problem" class="pm py-100">
    <div class="container">
      <!-- HEADER -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 text-center">
          <span v-if="upperHeading" class="section-id mb-20 d-block">{{ upperHeading }}</span>
          <h2 class="s-40 w-700 mb-20" v-html="headingHtml" />
          <p v-if="subHeading" class="s-18 color--grey" style="max-width: 720px; margin: 0 auto;">
            {{ subHeading }}
          </p>
        </div>
      </div>

      <!-- COMPARISON CARDS -->
      <div class="row justify-content-center mt-60">
        <div class="col-md-10">
          <div class="problem-cards-grid">
            <!-- FRAGMENTED ASSET -->
            <div class="problem-card problem-card--fragmented">
              <div class="problem-card__badge problem-card__badge--grey">
                {{ fragmentedTitle }}
              </div>
              <div class="problem-card__grid" v-if="dataCategories.length">
                <div
                  v-for="cat in dataCategories"
                  :key="cat._key ?? cat.label?.[0]?.value"
                  class="problem-cat"
                  :class="cat.missingInFragmented ? 'problem-cat--missing' : 'problem-cat--ok'"
                >
                  {{ loc(cat.label) }}
                </div>
              </div>
              <p class="problem-card__desc">{{ fragmentedDesc }}</p>
            </div>

            <!-- STRUCTURED ASSET -->
            <div class="problem-card problem-card--structured">
              <div class="problem-card__badge problem-card__badge--blue">
                {{ structuredTitle }}
              </div>
              <div class="problem-card__grid" v-if="dataCategories.length">
                <div
                  v-for="cat in dataCategories"
                  :key="cat._key ?? cat.label?.[0]?.value"
                  class="problem-cat problem-cat--complete"
                >
                  <i class="bi bi-check" style="font-size: 10px;"></i>
                  {{ loc(cat.label) }}
                </div>
              </div>
              <p class="problem-card__desc problem-card__desc--dark">{{ structuredDesc }}</p>
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
  problem: Record<string, any>
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const upperHeading = computed(() =>
  loc(props.problem?.upperHeading)
)

const headingHtml = computed(() => {
  const full = loc(props.problem?.heading)
  const accent = loc(props.problem?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})

const subHeading = computed(() => loc(props.problem?.subHeading))

const fragmentedTitle = computed(() => loc(props.problem?.fragmentedTitle))
const fragmentedDesc = computed(() => loc(props.problem?.fragmentedDesc))
const structuredTitle = computed(() => loc(props.problem?.structuredTitle))
const structuredDesc = computed(() => loc(props.problem?.structuredDesc))
const dataCategories = computed(() => props.problem?.dataCategories ?? [])
</script>

<style scoped>
.pm {
  background: #F7F9FD;
  overflow: hidden;
}
.problem-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 767px) {
  .problem-cards-grid { grid-template-columns: 1fr; }
}

.problem-card {
  border-radius: 16px;
  padding: 28px;
}
.problem-card--fragmented {
  background: #F7F9FD;
  border: 1px solid #EEF2F7;
}
.problem-card--structured {
  background: #fff;
  border: 2px solid #1778FB;
  box-shadow: 0 18px 48px rgba(23,120,251,0.10);
}

.problem-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.problem-card__badge--grey {
  background: #fff;
  border: 1px solid #D7DDE7;
  color: #6C7A86;
}
.problem-card__badge--blue {
  background: #1778FB;
  color: #fff;
}

.problem-card__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 16px;
}
@media (max-width: 480px) {
  .problem-card__grid { grid-template-columns: repeat(2, 1fr); }
}

.problem-cat {
  height: 44px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  gap: 4px;
}
.problem-cat--ok {
  background: #fff;
  border: 1px dashed #D7DDE7;
  color: #6C7A86;
}
.problem-cat--missing {
  background: rgba(255,170,122,0.2);
  border: 1px dashed #FFAA7A;
  color: #D44C00;
  text-decoration: line-through;
}
.problem-cat--complete {
  background: #E4F3FF;
  border: none;
  color: #1055B3;
  font-weight: 600;
}

.problem-card__desc {
  font-size: 14px;
  line-height: 1.5;
  color: #6C7A86;
  margin: 0;
}
.problem-card__desc--dark { color: #4F575E; }
</style>
