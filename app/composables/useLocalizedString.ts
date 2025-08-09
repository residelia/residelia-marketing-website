// composables/useLocalizedString.ts

export function useLocalizedString() {
    const { locale, fallbackLocale } = useI18n()
  
    function getLocalizedString(internationalizedArray: Array<{ _key: string; value: string }>): string {
      const found = internationalizedArray.find(item => item._key === locale.value)
      if (found && found.value) return found.value
  
      // Fallback a fallbackLocale, o al primer valor si no hay fallback definido
      const fallback = internationalizedArray.find(item => item._key === fallbackLocale.value)
      return fallback ? fallback.value : (internationalizedArray[0] && internationalizedArray[0].value) || ''
    }
  
    return { getLocalizedString }
  }