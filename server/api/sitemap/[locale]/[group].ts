import { createClient } from '@sanity/client'

const LOCALE_KEY_MAP: Record<string, string> = {
  'es-ES': 'es',
  'en-US': 'en',
}
const LOCALES = Object.values(LOCALE_KEY_MAP)
const DEFAULT_LOCALE = 'es'

// Cliente Sanity creado a nivel de módulo (una vez, no por request)
const client = createClient({
  projectId: 'asqz10j2',
  dataset: 'production',
  token: process.env.SANITY_TOKEN || 'skHqzduJvPr2TrtA3ugj1NEBAWvZkqY1jJgQWdZewbnyaJKuy5KGFECZLFNcVat0JD4xeWOpXDnzPzC0GDGgCb0JiKWJ2cIt0FplMbZJxLYicS3FNRwGwXEWlmWs4z1WRBrG6UinrlVgx9ehOJH8pVfkhIc3o90zcQQgpJ1c4DUzM61mmxWh',
  apiVersion: '2022-04-26',
  useCdn: false,
})

export default defineEventHandler(async (event) => {
  const locale    = getRouterParam(event, 'locale')   // e.g. 'es-ES'
  const group     = getRouterParam(event, 'group')    // e.g. 'pages'
  const localeKey = LOCALE_KEY_MAP[locale!] ?? DEFAULT_LOCALE  // e.g. 'es'

  // fromMulti: array de slugs multilingüe → devuelve UNA URL por el locale solicitado
  // con el array completo de alternatives para cross-linking entre locales
  const fromMulti = (docs: any[]) =>
    docs.flatMap((doc) => {
      const validSlugs = ((doc.slug as any[]) ?? []).filter(
        (s) => LOCALES.includes(s._key) && s.value?.current
      )
      const targetSlug = validSlugs.find((s) => s._key === localeKey)
      if (!targetSlug) return [] // Este documento no tiene slug para este locale

      const hrefMap: Record<string, string> = {}
      validSlugs.forEach((s) => {
        hrefMap[s._key] = s._key === DEFAULT_LOCALE ? s.value.current : `/${s._key}${s.value.current}`
      })

      const defaultHref = hrefMap[DEFAULT_LOCALE] ?? Object.values(hrefMap)[0]
      const alternatives = [
        { href: defaultHref, hreflang: 'x-default' },
        ...validSlugs.map((s) => ({
          href: hrefMap[s._key],
          hreflang: s._key === 'es' ? 'es-ES' : 'en-US',
        })),
      ]

      return [{
        loc: hrefMap[localeKey],
        lastmod: doc._updatedAt as string,
        alternatives,
      }]
    })

  switch (group) {
    case 'pages': {
      const docs = await client.fetch(
        `*[_type == "page" && !(_id in path('drafts.**')) && !(pageType in ["product", "solution", "legal"])] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    case 'products': {
      const docs = await client.fetch(
        `*[_type == "page" && !(_id in path('drafts.**')) && pageType == "product"] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    case 'solutions': {
      const docs = await client.fetch(
        `*[_type == "page" && !(_id in path('drafts.**')) && pageType == "solution"] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    case 'terms': {
      const docs = await client.fetch(
        `*[_type == "page" && !(_id in path('drafts.**')) && pageType == "legal"] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    case 'blog': {
      try {
        const docs: any[] = await client.fetch(`*[_type == "post" && !(_id in path('drafts.**'))] { slug, language, _updatedAt }`)
        return docs
          .filter((d) => d.slug?.current && d.language === localeKey)
          .map((d) => ({
            loc: localeKey === DEFAULT_LOCALE ? d.slug.current : `/${localeKey}${d.slug.current}`,
            lastmod: d._updatedAt as string,
          }))
      } catch (e) {
        console.error('[sitemap] blog fetch error:', e)
        return []
      }
    }
    case 'university': {
      try {
        const pillars: any[] = await client.fetch(`
          *[_type == "pillar" && !(_id in path('drafts.**'))] {
            slug, language, _updatedAt,
            clusters[]->{ slug, language, _updatedAt }
          }
        `)
        return pillars
          .filter((p) => p.slug?.current && p.language === localeKey)
          .flatMap((pillar) => {
            const loc = localeKey === DEFAULT_LOCALE
              ? pillar.slug.current
              : `/${localeKey}${pillar.slug.current}`
            const urls: Array<{ loc: string; lastmod: string }> = [{ loc, lastmod: pillar._updatedAt }]
            ;((pillar.clusters as any[]) ?? []).forEach((cluster) => {
              if (cluster.slug?.current && cluster.language === localeKey) {
                const clusterLoc = localeKey === DEFAULT_LOCALE
                  ? cluster.slug.current
                  : `/${localeKey}${cluster.slug.current}`
                urls.push({ loc: clusterLoc, lastmod: cluster._updatedAt })
              }
            })
            return urls
          })
      } catch (e) {
        console.error('[sitemap] university fetch error:', e)
        return []
      }
    }
    case 'resources': {
      const docs = await client.fetch(
        `*[_type == "resource" && !(_id in path('drafts.**'))] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    case 'jobs': {
      const docs = await client.fetch(
        `*[_type == "position" && !(_id in path('drafts.**')) && active == true] { slug, _updatedAt }`
      )
      return fromMulti(docs)
    }
    default:
      return []
  }
})
