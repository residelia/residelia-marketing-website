import { computed } from 'vue'

/**
 * useHtmlLang
 * - Sets <html lang="..."> based on current i18n locale
 * - Optionally injects <link rel="alternate" hreflang="..."> entries when you pass pageLocales
 *
 * pageLocales: array of locale-slug objects from Sanity, e.g.:
 * [ { _key: 'es', value: { current: '/blog/mi-post' } }, { _key: 'en', value: { current: '/blog/my-post' } } ]
 * or simplified: [{ code: 'es', slug: '/blog/mi-post' }, { code: 'en', slug: '/blog/my-post' }]
 */
export function useHtmlLang(pageLocales?: any) {
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const base = (config.public?.baseUrl || '').replace(/\/$/, '')

  // Map local codes (as used in your project) to ISO lang tags
  // Keep this in sync with `nuxt.config.ts` i18n.locales entries (code -> iso)
  const isoMap: Record<string, string> = {
    es: 'es-ES',
    en: 'en-US'
    // add more if needed
  }

  // Some locales might require RTL direction
  const rtlLocales = new Set<string>(['ar', 'he', 'fa'])

  const htmlLang = computed(() => isoMap[locale.value] || locale.value || 'es')
  const htmlDir = computed(() => (rtlLocales.has(locale.value) ? 'rtl' : 'ltr'))

  // Inject htmlAttrs (lang + dir)
  useHead({
    htmlAttrs: {
      lang: htmlLang.value,
      dir: htmlDir.value
    }
  })

  // If pageLocales provided, build hreflang alternate links
  if (pageLocales && Array.isArray(pageLocales) && pageLocales.length > 0) {
    const links: Array<Record<string, string>> = []

    // Accept two formats: Sanity-like [{_key, value:{current}}] or simplified [{code, slug}]
    pageLocales.forEach((pl: any) => {
      let code: string | undefined
      let slug: string | undefined

      if (pl._key) {
        code = pl._key
      } else if (pl.code) {
        code = pl.code
      }

      if (pl.value?.current) {
        slug = pl.value.current
      } else if (pl.slug) {
        slug = pl.slug
      }

      if (code && slug) {
        const href = slug.startsWith('http') ? slug : `${base}${slug.startsWith('/') ? slug : '/' + slug}`
        const hreflang = isoMap[code] ? isoMap[code].toLowerCase() : code
        links.push({ rel: 'alternate', hreflang, href })
      }
    })

    // Add x-default fallback to base URL or to the default locale page if present
    if (links.length > 0) {
      // x-default can point to home or to default-language version of the same page
      const defaultLocaleCode = 'es' // keep in sync with your nuxt.config defaultLocale if needed
      const fallback = pageLocales.find((p: any) => (p._key || p.code) === defaultLocaleCode)
      let xdefaultHref = base
      if (fallback) {
        const s = fallback.value?.current || fallback.slug
        if (s) xdefaultHref = `${base}${s.startsWith('/') ? s : '/' + s}`
      }
      links.push({ rel: 'alternate', hreflang: 'x-default', href: xdefaultHref })

      useHead({
        link: links
      })
    }
  }

  return {
    lang: htmlLang,
    dir: htmlDir
  }
}
