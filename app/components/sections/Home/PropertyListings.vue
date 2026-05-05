<template>
  <section class="pl">
    <div class="container">

      <!-- Header -->
      <div class="pl__header">
        <p class="pl__title">Últimos anuncios publicados por RESIDELIA</p>
        <a
          href="https://app.residelia.com/explorer?utm_source=website&utm_content=listings_link"
          target="_blank"
          rel="noopener"
          class="pl__see-all"
        >Ver toda la oferta RESIDELIA <i class="bi bi-arrow-right"></i></a>
      </div>

      <!-- Rows -->
      <div class="pl__rows">

        <!-- Row 1: 4 property cards -->
        <div class="pl__row">
          <div
            v-for="card in ROW1"
            :key="card.id"
            class="pl__card"
            @click="open(card.url)"
          >
            <img :src="card.image" :alt="card.address" class="pl__card-bg" />
            <div class="pl__card-head">
              <div class="pl__chips">
                <span class="pl__chip pl__chip--gray">Listado por {{ card.source }}</span>
                <span class="pl__chip pl__chip--gray">{{ card.date }}</span>
                <span v-if="card.status" class="pl__chip pl__chip--gray">{{ card.status }}</span>
                <span v-if="card.fastTrack" class="pl__chip pl__chip--blue">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 1L3 7h4l-2 4 6-6H7L9 1z" fill="#003986"/></svg>
                  Fast track
                </span>
              </div>
              <button class="pl__fav" @click.stop>
                <i class="bi bi-star"></i>
              </button>
            </div>
            <div class="pl__card-info">
              <div class="pl__price-row">
                <span class="pl__price">{{ card.price }}</span>
                <button class="pl__kebab" @click.stop><i class="bi bi-three-dots-vertical"></i></button>
              </div>
              <p class="pl__address">{{ card.address }}</p>
              <div class="pl__specs">
                <span class="pl__spec">{{ card.rooms }} <i class="bi bi-door-open"></i></span>
                <span class="pl__spec">{{ card.baths }} <i class="bi bi-droplet"></i></span>
                <span class="pl__spec">{{ card.sqm }}m<sup>2</sup></span>
                <span class="pl__spec">{{ card.ppm }}€/m<sup>2</sup></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: 3 property cards + broker card -->
        <div class="pl__row">
          <div
            v-for="card in ROW2"
            :key="card.id"
            class="pl__card"
            @click="open(card.url)"
          >
            <img :src="card.image" :alt="card.address" class="pl__card-bg" />
            <div class="pl__card-head">
              <div class="pl__chips">
                <span class="pl__chip pl__chip--gray">Listado por {{ card.source }}</span>
                <span class="pl__chip pl__chip--gray">{{ card.date }}</span>
                <span v-if="card.status" class="pl__chip pl__chip--gray">{{ card.status }}</span>
                <span v-if="card.fastTrack" class="pl__chip pl__chip--blue">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 1L3 7h4l-2 4 6-6H7L9 1z" fill="#003986"/></svg>
                  Fast track
                </span>
              </div>
              <button class="pl__fav" @click.stop>
                <i class="bi bi-star"></i>
              </button>
            </div>
            <div class="pl__card-info">
              <div class="pl__price-row">
                <span class="pl__price">{{ card.price }}</span>
                <button class="pl__kebab" @click.stop><i class="bi bi-three-dots-vertical"></i></button>
              </div>
              <p class="pl__address">{{ card.address }}</p>
              <div class="pl__specs">
                <span class="pl__spec">{{ card.rooms }} <i class="bi bi-door-open"></i></span>
                <span class="pl__spec">{{ card.baths }} <i class="bi bi-droplet"></i></span>
                <span class="pl__spec">{{ card.sqm }}m<sup>2</sup></span>
                <span class="pl__spec">{{ card.ppm }}€/m<sup>2</sup></span>
              </div>
            </div>
          </div>

          <!-- Broker promo card -->
          <a href="/broker" class="pl__broker" target="_blank" rel="noopener">
            <div class="pl__broker-logo">broker<span class="pl__broker-sub">·RESIDELIA</span></div>
            <p class="pl__broker-q">¿Quieres publicar tus propios activos?</p>
            <p class="pl__broker-desc">Accede a la sección Comercial de RESIDELIA y crea anuncios de tus activos para publicarlos en Explorer</p>
            <span class="pl__broker-cta">Más información <i class="bi bi-arrow-right"></i></span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Card {
  id: string; image: string; source: string; date: string
  status?: string; fastTrack?: boolean
  price: string; address: string; rooms: number; baths: number
  sqm: number; ppm: string; url: string
}

const ROW1: Card[] = [
  {
    id: '1', source: 'FOTOCASA', date: '12/08/2024', status: 'NPL', fastTrack: true,
    price: '298.000 €', address: 'Avenida de bruselas, 78,28028, Madrid.',
    rooms: 4, baths: 2, sqm: 123, ppm: '2.276',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
  {
    id: '2', source: 'FOTOCASA', date: '12/08/2024', status: 'Cesión de remate',
    price: '650.000 €', address: 'Calle del sol, 45, 28015, Madrid.',
    rooms: 3, baths: 1, sqm: 90, ppm: '2.777',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
  {
    id: '3', source: 'FOTOCASA', date: '11/08/2024', status: 'NPL', fastTrack: true,
    price: '980.000 €', address: 'Paseo de la reforma, 20, 28001, Madrid.',
    rooms: 5, baths: 3, sqm: 150, ppm: '6.533',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
  {
    id: '4', source: 'FOTOCASA', date: '13/08/2024', status: 'NPL',
    price: '500.000 €', address: 'Calle de la luna, 10, 28004, Madrid.',
    rooms: 6, baths: 4, sqm: 200, ppm: '12.500',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
]

const ROW2: Card[] = [
  {
    id: '5', source: 'FOTOCASA', date: '12/08/2024', status: 'NPL', fastTrack: true,
    price: '750.000 €', address: 'Calle de la esperanza, 15, 28020, Madrid.',
    rooms: 3, baths: 2, sqm: 70, ppm: '10.714',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
  {
    id: '6', source: 'FOTOCASA', date: '12/08/2024', status: 'Derecho de uso de larga duración',
    price: '450.000 €', address: 'Avenida de la paz, 12, 28019, Madrid.',
    rooms: 4, baths: 3, sqm: 120, ppm: '12.083',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
  {
    id: '7', source: 'FOTOCASA', date: '13/08/2024', status: 'Nuda propiedad', fastTrack: true,
    price: '850.000 €', address: 'Calle de las flores, 27, 28008, Madrid.',
    rooms: 5, baths: 3, sqm: 180, ppm: '10.277',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    url: 'https://app.residelia.com/explorer',
  },
]

function open(url: string) {
  window.open(url, '_blank', 'noopener')
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
  display: flex;
  gap: 16px;
  align-items: stretch;
}

/* ── Property card ────────────────────────────────────────────── */
.pl__card {
  flex: 1 0 0;
  min-width: 0;
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
  flex: 1 0 0;
  min-width: 0;
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
  width: 263px;
  max-width: 100%;
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

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .pl__row { flex-wrap: wrap; }
  .pl__card, .pl__broker { flex: 1 1 calc(50% - 8px); }
}

@media (max-width: 575px) {
  .pl__card, .pl__broker { flex: 1 1 100%; }
  .pl__header { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
