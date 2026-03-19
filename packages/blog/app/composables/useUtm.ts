const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const UTM_KEY = 'residelia_utm'

export const useUtm = () => {
  const captureFromQuery = (query: Record<string, string | string[]>) => {
    const utms: Record<string, string> = {}
    UTM_PARAMS.forEach(p => { if (query[p]) utms[p] = String(query[p]) })
    if (Object.keys(utms).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utms))
  }

  const getStoredUtms = (): Record<string, string> => {
    try { return JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}') } catch { return {} }
  }

  const appendUtmToUrl = (url: string): string => {
    const utms = getStoredUtms()
    if (!Object.keys(utms).length) return url
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}${new URLSearchParams(utms).toString()}`
  }

  return { captureFromQuery, getStoredUtms, appendUtmToUrl }
}
