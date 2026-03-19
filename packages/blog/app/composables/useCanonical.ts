import { computed } from 'vue'

// Composable para generar/inyectar canonical URL
export function useCanonical(override?: string | null) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const base = (config.public?.baseUrl || '').replace(/\/$/, '')

  const canonical = computed(() => {
    if (override) {
      // override absoluto o relativo
      if (/^https?:\/\//.test(override)) return override
      return `${base}${override.startsWith('/') ? override : '/' + override}`
    }

    // Construimos canonical desde la ruta actual, sin query ni hash
    const path = (route.fullPath || route.path || '/').split('?')[0].split('#')[0]
    // Si path está vacío, usar '/'
    const cleanPath = path === '' ? '/' : path
    return `${base}${cleanPath}`
  })

  // Inyectamos en el head (server + client). Si ya hay un link canonical declarado a nivel de página,
  // useHead lo sobrescribirá si se invoca después.
  useHead({
    link: [
      { rel: 'canonical', href: canonical.value }
    ]
  })

  return {
    canonical
  }
}
