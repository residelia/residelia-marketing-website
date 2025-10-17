<template>
  <div id="residelia-widget"></div>
</template>

<script setup>
import { onMounted } from 'vue'

const loadWidget = () => {
  // Load Leaflet CSS if map is enabled
  const leafletLink = document.createElement('link')
  leafletLink.rel = 'stylesheet'
  leafletLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  if (!document.getElementById('leaflet-css')) {
    leafletLink.id = 'leaflet-css'
    document.head.appendChild(leafletLink)
  }

  // Load Widget CSS
  const widgetLink = document.createElement('link')
  widgetLink.rel = 'stylesheet'
  widgetLink.href = 'https://estateleads.residelia.com/widget/widget.css'
  if (!document.getElementById('widget-css')) {
    widgetLink.id = 'widget-css'
    document.head.appendChild(widgetLink)
  }
  
  const script = document.createElement('script')
  script.src = 'https://estateleads.residelia.com/widget/widget.iife.js'
  script.async = true
  
  script.onload = () => {
    if (window.ResideliaWidget) {
      window.ResideliaWidget.init({
        containerId: 'residelia-widget',
        entityId: 'D6EEDB9D',
        apiKey: 'ecUehDT1x2uX/EkniHD5W3RQtVKSzlLa',
        showMap: true
      })
    }
  }
  
  document.head.appendChild(script)
}

onMounted(() => {
  loadWidget()
})
</script>