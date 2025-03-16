<template>
  <component
    :is="isExternal ? 'a' : 'NuxtLink'"
    :href="isExternal ? url : undefined"
    :to="isExternal ? undefined : localePath(url)"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    @click.native.stop="handleClick"
    :class="customClass"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  url: { type: String, required: true },
  eventName: { type: String, default: 'Link Clicked' },
  eventCategory: { type: String, default: 'Navigation' },
  customClass: { type: String, default: 'trackable-link' } // 🔹 Permite personalizar la clase CSS
});

const { trackEvent } = useTracking();
const { trackMarketingEvent } = useMarketingTracking();

const isExternal = computed(() => {
  return /^(https?:)?\/\//.test(props.url) && !props.url.includes(window.location.hostname);
});

const isVideo = computed(() => {
  return props.url.includes('youtube.com') || props.url.includes('vimeo.com');
});


const handleClick = (event) => {
  event.preventDefault(); // 🔹 Evita la navegación inmediata para rastrear primero el evento

  let trackingData = { url: props.url, category: props.eventCategory };

  if (isVideo.value) {
    trackMarketingEvent('Video Clicked', trackingData);
  } else {
    trackMarketingEvent(props.eventName, trackingData);
  }

  console.log(`🎯 Tracking: ${props.eventName} - ${props.url}`);

  // 🔹 Aseguramos la navegación después de registrar el evento
  setTimeout(() => {
    if (isExternal.value) {
      window.open(props.url, '_blank');
    } else {
      window.location.href = props.url;
    }
  }, 300);
};
</script>

<style scoped>
.trackable-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.trackable-link:hover {
  text-decoration: underline;
}

/* 🔹 Ejemplo de botón */
.trackable-btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.trackable-btn:hover {
  background-color: #0056b3;
}
</style>