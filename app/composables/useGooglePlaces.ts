import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

/**
 * Composable de autocomplete de direcciones via Google Places (New API).
 * - Lazy-loads el SDK la primera vez que se necesita.
 * - Reutiliza session tokens (autocomplete + details = una sola sesión facturada).
 * - La API key DEBE estar restringida en GCP (HTTP referrer + Places API New + cuota).
 */

let placesLibPromise: Promise<any> | null = null
let optionsSet = false

async function loadPlacesLib(): Promise<any> {
  if (placesLibPromise) return placesLibPromise
  if (typeof window === 'undefined') {
    throw new Error('[useGooglePlaces] loadPlacesLib invoked server-side')
  }
  const config = useRuntimeConfig()
  const apiKey = (config.public.googleMapsPublicKey as string | undefined)?.trim()
  if (!apiKey) {
    throw new Error('[useGooglePlaces] Missing GOOGLE_MAPS_PUBLIC_KEY')
  }
  if (!optionsSet) {
    setOptions({
      key: apiKey,
      v: 'weekly',
      language: 'es',
      region: 'ES',
    })
    optionsSet = true
  }
  placesLibPromise = importLibrary('places' as any) as Promise<any>
  try {
    await placesLibPromise
  } catch (err) {
    placesLibPromise = null
    throw err
  }
  return placesLibPromise
}

export interface PlaceTextMatch {
  startOffset: number
  endOffset: number
}

export interface PlaceText {
  text: string
  matches: PlaceTextMatch[]
}

export interface PlacePrediction {
  placeId: string
  mainText: PlaceText
  secondaryText: PlaceText
}

export interface PlaceDetails {
  formattedAddress: string
  location: { lat: number; lng: number }
  types: string[]
}

export default function useGooglePlaces() {
  const predictions = ref<PlacePrediction[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  let sessionToken: any = null
  let lastRequestId = 0

  async function queryPredictions(input: string): Promise<void> {
    const trimmed = input?.trim() ?? ''
    if (trimmed.length < 2) {
      predictions.value = []
      loading.value = false
      return
    }
    loading.value = true
    error.value = null
    const requestId = ++lastRequestId
    try {
      const lib: any = await loadPlacesLib()
      if (!sessionToken) {
        sessionToken = new lib.AutocompleteSessionToken()
      }
      const response = await lib.AutocompleteSuggestion
        .fetchAutocompleteSuggestions({
          input: trimmed,
          sessionToken,
          includedRegionCodes: ['ES'],
          // Geocode = países, provincias, códigos postales, municipios, calles,
          // direcciones. Excluye `establishment` (aeropuertos, hoteles, negocios).
          includedPrimaryTypes: ['geocode'],
          language: 'es',
          region: 'ES',
        })
      if (requestId !== lastRequestId) return
      const list: any[] = response?.suggestions ?? []
      predictions.value = list
        .filter((s: any) => s?.placePrediction)
        .map((s: any) => {
          const pp = s.placePrediction
          return {
            placeId: pp.placeId,
            mainText: {
              text: pp.mainText?.text ?? '',
              matches: (pp.mainText?.matches ?? []).map((m: any) => ({
                startOffset: m.startOffset ?? 0,
                endOffset: m.endOffset ?? 0,
              })),
            },
            secondaryText: {
              text: pp.secondaryText?.text ?? '',
              matches: (pp.secondaryText?.matches ?? []).map((m: any) => ({
                startOffset: m.startOffset ?? 0,
                endOffset: m.endOffset ?? 0,
              })),
            },
          }
        })
    } catch (err: any) {
      if (requestId === lastRequestId) {
        predictions.value = []
        error.value = err?.message ?? String(err)
      }
    } finally {
      if (requestId === lastRequestId) loading.value = false
    }
  }

  async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    try {
      const lib: any = await loadPlacesLib()
      const place: any = new lib.Place({ id: placeId })
      await place.fetchFields({ fields: ['formattedAddress', 'location', 'types'] })
      sessionToken = null
      return {
        formattedAddress: place.formattedAddress ?? '',
        location: {
          lat: place.location?.lat() ?? 0,
          lng: place.location?.lng() ?? 0,
        },
        types: place.types ?? [],
      }
    } catch {
      return null
    }
  }

  function clear() {
    predictions.value = []
    loading.value = false
    error.value = null
  }

  return { predictions, loading, error, queryPredictions, fetchPlaceDetails, clear }
}
