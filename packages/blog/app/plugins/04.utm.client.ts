import { defineNuxtPlugin, useRoute } from '#app'

// Matches *.residelia.com subdomains (e.g. app.residelia.com, estateleads.residelia.com)
// but NOT residelia.com itself
const SUBDOMAIN_PATTERN = /^https?:\/\/[a-z0-9-]+\.residelia\.com/i

export default defineNuxtPlugin(() => {
  const { captureFromQuery, appendUtmToUrl } = useUtm()
  const route = useRoute()

  // Initial capture in case the global middleware hasn't run yet during SSR hydration
  captureFromQuery(route.query as Record<string, string>)

  // Global click interceptor (capture phase): enriches subdomain links with UTM params
  // right before the browser follows the link — no preventDefault needed, works with _blank too
  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
    if (!anchor) return

    const href = anchor.href // fully resolved URL
    if (SUBDOMAIN_PATTERN.test(href) && !href.startsWith(window.location.origin)) {
      anchor.href = appendUtmToUrl(href)
    }
  }, true) // capture phase: runs before browser processes the link
})
