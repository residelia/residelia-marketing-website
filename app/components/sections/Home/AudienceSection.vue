<template>
  <section v-if="audiences?.profiles?.length" class="py-100" style="background: #fff;">
    <div class="container">
      <!-- HEADER -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 text-center">
          <span v-if="upperHeading" class="section-id mb-20 d-block">{{ upperHeading }}</span>
          <h2 class="s-40 w-700" v-html="headingHtml" />
        </div>
      </div>

      <!-- PROFILE CARDS -->
      <div class="row mt-60">
        <div
          v-for="profile in audiences.profiles"
          :key="profile.title?.[0]?.value"
          class="col-md-6 mb-4"
        >
          <div class="audience-card">
            <!-- Profile type label -->
            <div class="audience-card__header">
              <span class="audience-card__glyph">◈</span>
              <span class="audience-card__type">{{ loc(profile.title) }}</span>
            </div>

            <!-- Headline -->
            <h4 class="audience-card__headline">{{ loc(profile.headline) }}</h4>

            <!-- Body -->
            <p class="audience-card__body">{{ loc(profile.body) }}</p>

            <!-- Use cases -->
            <ul v-if="profile.useCases?.length" class="audience-card__cases">
              <li v-for="(uc, i) in profile.useCases" :key="i">
                <span class="audience-card__check"><i class="bi bi-check"></i></span>
                {{ loc(uc.text) }}
              </li>
            </ul>

            <!-- CTA -->
            <div v-if="profile.cta" class="audience-card__cta">
              <NuxtLink
                v-if="profile.cta.linkType === 'internal' && profile.cta.slug"
                :to="$localePath(profile.cta.slug.find((s: any) => s._key === locale)?.value?.current + (profile.cta.queryString ?? ''))"
                class="tra-link ico-20 color--theme"
              >
                {{ loc(profile.cta.linkText) }} <span class="flaticon-next"></span>
              </NuxtLink>
              <a
                v-else-if="profile.cta.linkType === 'external' && profile.cta.slug"
                :href="profile.cta.slug"
                class="tra-link ico-20 color--theme"
                target="_blank"
                rel="noopener"
              >
                {{ loc(profile.cta.linkText) }} <span class="flaticon-next"></span>
              </a>
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
  audiences: Record<string, any>
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const upperHeading = computed(() => loc(props.audiences?.upperHeading))

const headingHtml = computed(() => {
  const full = loc(props.audiences?.heading)
  const accent = loc(props.audiences?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span class="color--theme">${accent}</span>`)
})
</script>

<style scoped>
.audience-card {
  background: #fff;
  border: 1px solid #EEF2F7;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  transition: transform 240ms, box-shadow 240ms;
}
.audience-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 48px rgba(32,37,42,0.08);
}

.audience-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1778FB;
}
.audience-card__glyph {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}
.audience-card__type {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.audience-card__headline {
  font-size: 20px;
  font-weight: 700;
  color: #20252A;
  line-height: 1.3;
  margin: 0;
}

.audience-card__body {
  font-size: 15px;
  line-height: 1.55;
  color: #4F575E;
  margin: 0;
}

.audience-card__cases {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.audience-card__cases li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #4F575E;
}
.audience-card__check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #E4F3FF;
  color: #1778FB;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  font-size: 11px;
}

.audience-card__cta {
  margin-top: auto;
  padding-top: 8px;
}
</style>
