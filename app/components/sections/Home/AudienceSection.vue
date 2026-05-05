<template>
  <section v-if="audiences?.profiles?.length" class="py-100 as" style="background: #fff;">
    <div class="container">
      <!-- HEADER -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8 text-center">
          <span v-if="upperHeading" class="section-id mb-20 d-block">{{ upperHeading }}</span>
          <h2 class="s-40 w-700" v-html="headingHtml" />
        </div>
      </div>

      <!-- TABS -->
      <div class="as__tabs">
        <button
          v-for="(profile, i) in audiences.profiles"
          :key="i"
          class="as__tab"
          :class="{ 'as__tab--active': activeTab === i }"
          @click="activeTab = i"
        >{{ loc(profile.title) }}</button>
      </div>

      <!-- ACTIVE PROFILE PANEL -->
      <div v-if="activeProfile" class="as__panel">
        <!-- Headline -->
        <h3 class="as__headline">{{ loc(activeProfile.headline) }}</h3>

        <!-- Body -->
        <p class="as__body">{{ loc(activeProfile.body) }}</p>

        <!-- Use cases -->
        <ul v-if="activeProfile.useCases?.length" class="as__cases">
          <li v-for="(uc, i) in activeProfile.useCases" :key="i">
            <span class="as__check"><i class="bi bi-check"></i></span>
            {{ loc(uc.text) }}
          </li>
        </ul>

        <!-- CTA -->
        <div v-if="activeProfile.cta" class="as__cta">
          <NuxtLink
            v-if="activeProfile.cta.linkType === 'internal' && activeProfile.cta.slug"
            :to="$localePath(activeProfile.cta.slug.find((s: any) => s._key === locale)?.value?.current + (activeProfile.cta.queryString ?? ''))"
            class="tra-link ico-20 color--theme"
          >
            {{ loc(activeProfile.cta.linkText) }} <span class="flaticon-next"></span>
          </NuxtLink>
          <a
            v-else-if="activeProfile.cta.linkType === 'external' && activeProfile.cta.slug"
            :href="activeProfile.cta.slug"
            class="tra-link ico-20 color--theme"
            target="_blank"
            rel="noopener"
          >
            {{ loc(activeProfile.cta.linkText) }} <span class="flaticon-next"></span>
          </a>
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

const activeTab = ref(0)
const activeProfile = computed(() => props.audiences?.profiles?.[activeTab.value])
</script>

<style scoped>
/* Tabs navigation */
.as__tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 48px 0 40px;
}

.as__tab {
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border: 1.5px solid #DDE3EC;
  border-radius: 8px;
  background: #fff;
  color: #4F575E;
  cursor: pointer;
  transition: border-color 180ms, background 180ms, color 180ms, box-shadow 180ms;
  line-height: 1;
}

.as__tab:hover {
  border-color: #1778FB;
  color: #1778FB;
}

.as__tab--active {
  background: #1778FB;
  border-color: #1778FB;
  color: #fff;
  box-shadow: 0 4px 16px rgba(23,120,251,0.25);
}

/* Panel */
.as__panel {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: as-fade-in 240ms ease-out;
}

@keyframes as-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.as__headline {
  font-size: 24px;
  font-weight: 700;
  color: #20252A;
  line-height: 1.3;
  margin: 0;
}

.as__body {
  font-size: 16px;
  line-height: 1.65;
  color: #4F575E;
  margin: 0;
}

.as__cases {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.as__cases li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  line-height: 1.5;
  color: #4F575E;
}

.as__check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E4F3FF;
  color: #1778FB;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  font-size: 12px;
}

.as__cta {
  margin-top: 8px;
}
</style>
