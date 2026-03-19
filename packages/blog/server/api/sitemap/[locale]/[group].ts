import { createClient } from '@sanity/client'

const LOCALE_KEY_MAP: Record<string, string> = {
  'es-ES': 'es',
  'en-US': 'en',
}
const LOCALES = Object.values(LOCALE_KEY_MAP)
const DEFAULT_LOCALE = 'es'

const client = createClient({
  projectId: process.env.SANITY_PROJECTID || 'asqz10j2',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2022-04-26',
  useCdn: false,
})

export default defineEventHandler(async (event) => {
  const locale    = getRouterParam(event, 'locale')   // e.g. 'es-ES'
  const group     = getRouterParam(event, 'group')    // only 'blog' expected
  const localeKey = LOCALE_KEY_MAP[locale!] ?? DEFAULT_LOCALE

  if (group !== 'blog') return []

  try {
    // Fetch all posts (both languages) to build hreflang alternatives
    const docs: any[] = await client.fetch(
      `*[_type == "post" && !(_id in path('drafts.**'))] { slug, language, _updatedAt }`
    )

    // Group posts by slug "base" — posts share the same content across locales
    // but have separate documents with their own slug per language.
    // We match them by slug path (stripping the locale-specific part to find pairs).
    // Strategy: filter to the requested locale, then find the counterpart in the other locale.
    const localeDocs = docs.filter((d) => d.slug?.current && d.language === localeKey)

    return localeDocs.map((doc) => {
      const loc = localeKey === DEFAULT_LOCALE
        ? doc.slug.current
        : `/${localeKey}${doc.slug.current}`

      // Build hreflang alternatives: find counterpart docs for other locales
      // We match counterparts by finding docs whose slug ends with the same path segment
      const slugPath = doc.slug.current // e.g. /blog/mi-post
      const alternatives: { href: string; hreflang: string }[] = []

      LOCALES.forEach((lang) => {
        // Find the counterpart doc in this language
        // Posts store their slug with /blog/ prefix in slug.current
        const counterpart = docs.find((d) => d.language === lang && d.slug?.current)
        if (lang === localeKey) {
          // Self-reference
          const href = lang === DEFAULT_LOCALE ? doc.slug.current : `/${lang}${doc.slug.current}`
          alternatives.push({
            href,
            hreflang: lang === 'es' ? 'es-ES' : 'en-US',
          })
          if (lang === DEFAULT_LOCALE) {
            alternatives.unshift({ href, hreflang: 'x-default' })
          }
        }
      })

      // Better approach: find ALL docs that share the same base slug (without /blog/ prefix)
      // and build a proper hreflang map
      const baseSlug = doc.slug.current.replace(/^\/blog\//, '')
      const allLangDocs = docs.filter(
        (d) => d.slug?.current && d.slug.current.replace(/^\/blog\//, '') === baseSlug
      )

      const hrefMap: Record<string, string> = {}
      allLangDocs.forEach((d) => {
        hrefMap[d.language] =
          d.language === DEFAULT_LOCALE ? d.slug.current : `/${d.language}${d.slug.current}`
      })

      const defaultHref = hrefMap[DEFAULT_LOCALE] ?? loc
      const properAlternatives = [
        { href: defaultHref, hreflang: 'x-default' },
        ...allLangDocs.map((d) => ({
          href: hrefMap[d.language],
          hreflang: d.language === 'es' ? 'es-ES' : 'en-US',
        })),
      ]

      return {
        loc,
        lastmod: doc._updatedAt as string,
        alternatives: properAlternatives,
      }
    })
  } catch (e) {
    console.error('[sitemap] blog fetch error:', e)
    return []
  }
})
