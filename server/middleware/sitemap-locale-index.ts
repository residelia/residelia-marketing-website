// Middleware que intercepta ANTES que cualquier route handler (incluido @nuxtjs/sitemap).
// Sobreescribe sitemap_index.xml para mostrar solo 2 entradas (una por locale).
// Sirve los sub-índices /__sitemap__/es-ES.xml y /__sitemap__/en-US.xml con las 8 hojas de cada locale.

import { setHeader } from 'h3'

const LOCALES = ['es-ES', 'en-US']
const GROUPS = ['pages', 'products', 'solutions', 'blog', 'university', 'resources', 'jobs', 'terms']

export default defineEventHandler((event) => {
  const path = event.path
  const base = process.env.BASE_URL || 'https://residelia.com'

  // 1. Override sitemap_index.xml → solo 2 entradas locale
  if (path === '/sitemap_index.xml') {
    setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    // Informa a Nitro de las rutas extra a prerenderizar en generate mode
    setHeader(event, 'x-nitro-prerender', LOCALES.map(l => `/__sitemap__/${l}.xml`).join(', '))
    return [
      '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/__sitemap__/style.xsl"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...LOCALES.map(locale => `  <sitemap>\n    <loc>${base}/__sitemap__/${locale}.xml</loc>\n  </sitemap>`),
      '</sitemapindex>',
    ].join('\n')
  }

  // 2. Sub-índice por locale: /__sitemap__/es-ES.xml, /__sitemap__/en-US.xml
  const localeMatch = path.match(/^\/__sitemap__\/([\w-]+)\.xml$/)
  if (localeMatch) {
    const locale = localeMatch[1]
    if (!LOCALES.includes(locale)) return // pass through para otros archivos .xml del módulo

    setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    // Informa a Nitro de las 8 rutas hoja a prerenderizar
    setHeader(event, 'x-nitro-prerender', GROUPS.map(g => `/__sitemap__/${locale}/${g}.xml`).join(', '))
    return [
      '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/__sitemap__/style.xsl"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...GROUPS.map(g => `  <sitemap>\n    <loc>${base}/__sitemap__/${locale}/${g}.xml</loc>\n  </sitemap>`),
      '</sitemapindex>',
    ].join('\n')
  }
})
