<template>
  <section class="pl">
    <div class="container">

      <!-- Header -->
      <div class="pl__header">
        <p class="pl__title">{{ $t('propertyListings.title') }}</p>
        <a
          href="https://app.residelia.com/explorer?utm_source=website&utm_content=listings_link"
          target="_blank"
          rel="noopener"
          class="pl__see-all"
        >{{ $t('propertyListings.seeAll') }} <i class="ri-arrow-right"></i></a>
      </div>

      <!-- Rows -->
      <div class="pl__rows">

        <!-- Row 1 -->
        <div class="pl__row">
          <template v-if="pending || error">
            <div v-for="n in 4" :key="n" class="pl__card pl__card--skeleton" />
          </template>
          <template v-else>
            <div
              v-for="card in ROW1"
              :key="card.id"
              class="pl__card"
              @click="onCardClick(card)"
            >
              <img :src="card.image" :alt="card.address" class="pl__card-bg" />
              <div class="pl__card-head">
                <div class="pl__chips">
                  <span class="pl__chip pl__chip--gray">{{ $t('propertyListings.listedBy', { source: card.source }) }}</span>
                  <span class="pl__chip pl__chip--gray">{{ card.date }}</span>
                  <span v-if="card.status" class="pl__chip pl__chip--gray">{{ card.status }}</span>
                </div>
                <button class="pl__fav" @click.stop>
                  <i class="ri-favorite-off"></i>
                </button>
              </div>
              <div class="pl__card-info">
                <div class="pl__price-row">
                  <span class="pl__price">{{ card.price }}</span>
                  <button class="pl__kebab" @click.stop><i class="ri-kebab-menu-vertical"></i></button>
                </div>
                <p class="pl__address">{{ card.address }}</p>
                <div class="pl__specs">
                  <span class="pl__spec">{{ card.rooms }} <i class="ri-bedroom"></i></span>
                  <span class="pl__spec">{{ card.baths }} <i class="ri-bath"></i></span>
                  <span class="pl__spec">{{ card.sqm }}m<sup>2</sup></span>
                  <span class="pl__spec">{{ card.ppm }}€/m<sup>2</sup></span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Row 2: 3 property cards + broker card -->
        <div class="pl__row">
          <template v-if="pending || error">
            <div v-for="n in 3" :key="n" class="pl__card pl__card--skeleton" />
          </template>
          <template v-else>
            <div
              v-for="card in ROW2"
              :key="card.id"
              class="pl__card"
              @click="onCardClick(card)"
            >
              <img :src="card.image" :alt="card.address" class="pl__card-bg" />
              <div class="pl__card-head">
                <div class="pl__chips">
                  <span class="pl__chip pl__chip--gray">{{ $t('propertyListings.listedBy', { source: card.source }) }}</span>
                  <span class="pl__chip pl__chip--gray">{{ card.date }}</span>
                  <span v-if="card.status" class="pl__chip pl__chip--gray">{{ card.status }}</span>
                </div>
                <button class="pl__fav" @click.stop>
                  <i class="ri-favorite-off"></i>
                </button>
              </div>
              <div class="pl__card-info">
                <div class="pl__price-row">
                  <span class="pl__price">{{ card.price }}</span>
                  <button class="pl__kebab" @click.stop><i class="ri-kebab-menu-vertical"></i></button>
                </div>
                <p class="pl__address">{{ card.address }}</p>
                <div class="pl__specs">
                  <span class="pl__spec">{{ card.rooms }} <i class="ri-bedroom"></i></span>
                  <span class="pl__spec">{{ card.baths }} <i class="ri-bath"></i></span>
                  <span class="pl__spec">{{ card.sqm }}m<sup>2</sup></span>
                  <span class="pl__spec">{{ card.ppm }}€/m<sup>2</sup></span>
                </div>
              </div>
            </div>
          </template>

          <!-- Broker promo card -->
          <a href="/broker" class="pl__broker" target="_blank" rel="noopener">
            <div class="pl__broker-logo">broker<span class="pl__broker-sub">·RESIDELIA</span></div>
            <p class="pl__broker-q">{{ $t('propertyListings.brokerQuestion') }}</p>
            <p class="pl__broker-desc">{{ $t('propertyListings.brokerDesc') }}</p>
            <span class="pl__broker-cta">{{ $t('propertyListings.brokerCta') }} <i class="ri-arrow-right"></i></span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Advertisement {
  uuid: string
  address: string
  price: number | null
  size: number
  sqmPrice: number | null
  rooms: number | null
  bathrooms: number | null
  legalSituation: string | null
  images: { url: string }[]
  publishedOn: string
  url: string
}

interface Card {
  id: string; image: string; source: string; date: string
  status?: string
  price: string; address: string; rooms: number; baths: number
  sqm: number; ppm: string; url: string
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

function formatPrice(price: number | null): string {
  if (!price) return 'Precio a consultar'
  return price.toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €'
}

function formatSqmPrice(sqm: number | null): string {
  if (!sqm) return '-'
  return sqm.toLocaleString('es-ES', { maximumFractionDigits: 0 })
}

function mapAd(ad: Advertisement): Card {
  return {
    id: ad.uuid,
    image: ad.images[0]?.url ?? '',
    source: 'RESIDELIA',
    date: formatDate(ad.publishedOn),
    status: ad.legalSituation && ad.legalSituation !== 'OTHER' ? ad.legalSituation : undefined,
    price: formatPrice(ad.price),
    address: ad.address,
    rooms: ad.rooms ?? 0,
    baths: ad.bathrooms ?? 0,
    sqm: ad.size,
    ppm: formatSqmPrice(ad.sqmPrice),
    url: ad.url,
  }
}

const { data, pending, error } = useFetch<{ advertisements: Advertisement[] }>(
  'https://public-api.residelia.com/dev/advertisements',
  { server: false }
)

const listings = computed(() => (data.value?.advertisements ?? []).map(mapAd))
const ROW1 = computed(() => listings.value.slice(0, 4))
const ROW2 = computed(() => listings.value.slice(4, 7))

const route = useRoute()
const { trackEvent } = useTracking()

function onCardClick(card: Card) {
  trackEvent('Property Card Clicked', {
    id: card.id,
    address: card.address,
    price: card.price,
    rooms: card.rooms,
    baths: card.baths,
    sqm: card.sqm,
    ppm: card.ppm,
    status: card.status ?? null,
    source: card.source,
    url: card.url,
    clickedOnPage: route.path,
  })
  window.open(card.url, '_blank', 'noopener')
}
</script>

<style scoped>
/* ── Section ──────────────────────────────────────────────────── */
.pl {
  padding: 48px 0 64px;
  background: #fff;
}

/* ── Header ───────────────────────────────────────────────────── */
.pl__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.pl__title {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #343E48;
  margin: 0;
}

.pl__see-all {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #1778FB;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.pl__see-all:hover { text-decoration: underline; }

/* ── Grid rows ────────────────────────────────────────────────── */
.pl__rows {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pl__row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

/* ── Property card ────────────────────────────────────────────── */
.pl__card {
  height: 215px;
  border: 1px solid #D7DDE7;
  border-radius: 8px;
  overflow: clip;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.pl__card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  pointer-events: none;
}

/* ── Card header (top overlay) ───────────────────────────────── */
.pl__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 8px 0;
  position: relative;
  z-index: 1;
}

.pl__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  width: 235px;
}

.pl__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  white-space: nowrap;
}

.pl__chip--gray {
  background: #9297A2;
  color: #fff;
}

.pl__chip--blue {
  background: #EAF6FF;
  color: #003986;
}

.pl__fav {
  width: 24px;
  height: 24px;
  border-radius: 200px;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-shrink: 0;
  font-size: 13px;
  color: #343E48;
  line-height: 1;
}

/* ── Card info panel (bottom overlay) ───────────────────────── */
.pl__card-info {
  background: rgba(52, 62, 72, 0.5);
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 8px;
  position: relative;
  z-index: 1;
}

.pl__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.pl__price {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #fff;
  flex: 1 0 0;
}

.pl__kebab {
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.pl__address {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pl__specs {
  display: flex;
  gap: 6px;
  align-items: flex-end;
}

.pl__spec {
  display: inline-flex;
  align-items: flex-end;
  gap: 4px;
  background: #343E48;
  padding: 2px 4px;
  border-radius: 5px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  white-space: nowrap;
}

.pl__spec i {
  font-size: 14px;
  line-height: 1;
}

.pl__spec sup {
  font-size: 7.74px;
  line-height: 16px;
}

/* ── Broker card ──────────────────────────────────────────────── */
.pl__broker {
  height: 215px;
  background: #1778FB;
  border-radius: 8px;
  overflow: clip;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 29px 23px 0;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 150ms;
}
.pl__broker:hover { opacity: 0.92; }

.pl__broker-logo {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 1;
  color: #fff;
  font-style: italic;
  margin-bottom: 0;
}

.pl__broker-sub {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 8px;
  line-height: 1;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.04em;
  font-style: normal;
  margin-top: 2px;
}

.pl__broker-q {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  margin: 18px 0 0;
}

.pl__broker-desc {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 10px;
  line-height: 13px;
  color: #fff;
  margin: 8px 0 0;
}

.pl__broker-cta {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: absolute;
  bottom: 16px;
  left: 23px;
}

/* ── Skeleton ─────────────────────────────────────────────────── */
@keyframes pl-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.pl__card--skeleton {
  background: #E5E9EE;
  animation: pl-pulse 1.4s ease-in-out infinite;
  cursor: default;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .pl__row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 575px) {
  .pl__row { grid-template-columns: 1fr; }
  .pl__header { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
