<template>
  <li :key="binder">
    <!-- <NuxtLink to="#" :key="key" class="h-link"> -->
    <NuxtLink
      :to="slug ? (isExternal ? routeObject : $localePath(routeObject)) : ''"
      :target="isExternal ? '_blank' : undefined"
      :external="isExternal || undefined"
      class="h-link"
      v-follow
    >        
      <div class="col">
        <div class="fbox-11 fb-1 align-items-start">
          <!-- Icon -->
          <div v-if="icon != null" class="fbox-ico-wrap">
            <div class="fbox-ico ico-30">
              <div class="shape-ico color--darkgrey">
                <!-- Vector Icon -->
                <v-icon v-if="icon.startsWith('ri-') || icon.startsWith('mdi-')" size="32" :icon="icon" class="w-100"></v-icon>
                <span v-else :class="`flaticon-${icon}`"></span>

                <!-- <NuxtSvgIcon class="svg" :name="icon" font-size="5" fill="black" /> -->
                <!-- Shape -->
                <!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="lightgrey"
                    d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z"
                    transform="translate(100 100)"
                  />
                </svg> -->
              </div>
            </div>
          </div>
          <!-- End Icon -->
          <!-- Text -->
          <div class="fbox-txt">
            <div class="d-flex flex-row justify-content-start align-items-center">
              <h6 class="s-14 w-600">{{ getLocalizedString(title) }}</h6>
              <!-- <span v-if="soon" class="soon-info">{{ $t('soon') }}</span> -->
              <v-chip v-if="soon" class="ml-2" color="primary" size="x-small" label>{{ $t('soon') }}</v-chip>
              <v-chip v-if="next" class="ml-2" color="primary" size="x-small" label>{{ $t('next') }}</v-chip>
            </div>
            <p class="s-13 w-400 color--grey">{{ getLocalizedString(description) }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const { locale } = useI18n()
const props = defineProps<{
  name?: String
  slug?: Array
  binder?: String
  title: Array
  description: Array
  icon?: String,
  soon?: boolean
  next?: boolean
}>();

const { getLocalizedString } = useLocalizedString()

const isExternal = computed(() => typeof props.slug === 'string')

const routeObject = computed(() => {
  if (isExternal.value) return props.slug as string
  const fullPath = (props.slug as Array<any>)
    .find(l => l._key === locale.value)?.value?.current ?? ''
  const lastSegment = fullPath.split('/').filter(Boolean).pop() ?? ''
  switch (props.name) {
    case 'solutions-segment':
      return { name: 'solutions-segment', params: { segment: lastSegment } }
    case 'product':
      return { name: 'product', params: { product: lastSegment } }
    case 'terms-item':
      return { name: 'terms-item', params: { item: lastSegment } }
    case 'resources-type':
      return { name: 'resources-type', params: { type: lastSegment } }
    default:
      return fullPath
  }
})
</script>

<style></style>
