<template>
  <section v-if="message" id="banner-7" class="banner-section bg--primary-300">
    <div class="banner-overlay py-100">
      <div class="container">
        <div class="banner-7-wrapper">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="banner-7-txt text-center">

                <span class="section-id color--white">{{ loc(message?.upperHeading) }}</span>

                <h2 class="s-36 w-700 color--white" v-html="headingHtml" />

                <div class="btns-group">
                  <NuxtLink
                    v-if="message.button?.linkType === 'internal'"
                    :to="$localePath(buttonSlug + (message.button.queryString ?? ''))"
                    class="btn r-04 btn--theme-secondary hover--theme"
                    @click="handleClick('CTA clicked', message.button.id)"
                  >
                    {{ loc(message.button.linkText) }}
                  </NuxtLink>
                  <a
                    v-else-if="message.button?.linkType === 'external'"
                    :href="message.button.externalUrl + (message.button.queryString ?? '')"
                    class="btn r-04 btn--theme-secondary hover--theme"
                    target="_blank"
                    rel="noopener"
                    @click="handleClick('CTA clicked', message.button.id)"
                  >
                    {{ loc(message.button.linkText) }}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <hr class="divider" />
</template>

<script setup lang="ts">
import balanceString from '~/utils/balanceString'

const { locale } = useI18n()

const props = defineProps<{
  message: Record<string, any>
}>()

const loc = (arr: any[]) => arr?.find((t: any) => t._key === locale.value)?.value ?? ''

const headingHtml = computed(() => balanceString(loc(props.message?.heading), 5))
const buttonSlug = computed(() => props.message?.button?.slug?.find((t: any) => t._key === locale.value)?.value?.current ?? '/')

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName: string, buttonId: string) {
  trackEvent(eventName, { clickedOnPage: route.path, buttonId })
}
</script>
