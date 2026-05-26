<template>
  <section v-if="message" class="fcd-section">
    <!-- Decorative blob -->
    <svg viewBox="0 0 600 600" class="fcd-blob" aria-hidden="true">
      <path
        d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z"
        transform="translate(300 300) scale(3)"
        fill="#1778FB"
      />
    </svg>

    <div class="container fcd-inner">
      <h2 class="fcd-heading" v-html="headingHtml" />

      <div class="fcd-actions">
        <!-- Primary CTA -->
        <template v-if="message.button">
          <NuxtLink
            v-if="message.button.linkType === 'internal' && message.link"
            :to="$localePath(message.link.slug?.find((s: any) => s._key === locale)?.value?.current + (message.button.queryString ?? ''))"
            class="btn btn--theme btn--lg r-04"
          >
            {{ loc(message.button.linkText) }}
          </NuxtLink>
          <a
            v-else-if="message.button.linkType === 'external'"
            :href="message.button.externalUrl"
            class="btn btn--theme btn--lg r-04"
            target="_blank"
            rel="noopener"
          >
            {{ loc(message.button.linkText) }}
          </a>
        </template>

        <!-- Secondary link -->
        <NuxtLink
          v-if="secondaryButton"
          :to="secondaryHref"
          class="fcd-secondary"
        >
          {{ loc(secondaryButton.linkText) }}
          <span class="flaticon-next" style="font-size: 14px;"></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  message: Record<string, any>
  secondaryButton?: Record<string, any> | null
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const headingHtml = computed(() => {
  const full = loc(props.message?.heading)
  const accent = loc(props.message?.headingHighlight)
  if (!accent || !full) return full
  return full.replace(accent, `<span style="color: #48AAF1;">${accent}</span>`)
})

const secondaryButton = computed(() => props.secondaryButton ?? null)
const secondaryHref = computed(() => {
  if (!secondaryButton.value) return '/'
  if (secondaryButton.value.linkType === 'internal') {
    return secondaryButton.value.link?.slug?.find((s: any) => s._key === locale.value)?.value?.current ?? '/'
  }
  return secondaryButton.value.externalUrl ?? '/'
})
</script>

<style scoped>
.fcd-section {
  padding: 96px 0;
  background: #20252A;
  position: relative;
  overflow: hidden;
}

.fcd-blob {
  position: absolute;
  top: -140px;
  right: -140px;
  width: 460px;
  opacity: 0.18;
  pointer-events: none;
}

.fcd-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.fcd-heading {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin: 0 auto 36px;
  max-width: 820px;
  text-wrap: balance;
}

.fcd-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.fcd-secondary {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 16px 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
  transition: opacity 180ms;
}
.fcd-secondary:hover { opacity: 1; color: #fff; }
</style>
