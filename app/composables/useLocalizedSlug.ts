// composables/useLocalizedSlug.ts

export function useLocalizedSlug() {
    const { locale, fallbackLocale } = useI18n()
  
    // Obtiene la URL completa para el locale actual, usando fallback si es necesario
    function getLocalizedSlug(lang: string, localizedArraySlug: Array<{ _type: string; _key: string; value: { current: string; _type: string } }>): string {
      const loc: string = lang ? lang : locale.value
      if (!localizedArraySlug) return ''
  
      const found = localizedArraySlug?.find(item => item._key === loc)
      if (found && found.value.current) return found.value.current
  
      const fallback = localizedArraySlug.find(item => item._key === fallbackLocale.value)
      return fallback ? fallback.value.current : localizedArraySlug[0]?.value.current || ''
    }
  
    // Extrae automáticamente el fixed parent y el dynamic segment
    // Por ejemplo, de '/solutions/real-estate-investors-and-asset-managers'
    // retorna { fixedParent: '/solutions', dynamicSegment: 'real-estate-investors-and-asset-managers' }
    function splitLocalizedSlug(lang:string, localizedArraySlug: Array<{ _type: string; _key: string; value: { current: string; _type: string } }>): { fixedParent: string; dynamicSegment: string } {
      const fullSlug = getLocalizedSlug(lang, localizedArraySlug)
      const segments = fullSlug.split('/').filter(Boolean)
  
      if (segments.length >= 2) {
        return { fixedParent: `/${segments[0]}`, dynamicSegment: segments.slice(1).join('/') }
      } else {
        return { fixedParent: '', dynamicSegment: segments.join('/') }
      }
    }
  
    return { getLocalizedSlug, splitLocalizedSlug }
}