<template>
  <section class="pm">
    <div class="container">
      <!-- Animated lifecycle circuit -->
      <div class="pm__circuit-wrap">
        <ElementsLifecycleCircuit :wf-steps="wfSteps" />
      </div>

      <!-- Text -->
      <p class="pm__text">
        Descubre todos nuestros productos y gestiona el ciclo de vida completo del activo con RESIDELIA
      </p>

      <!-- Product logos row -->
      <div class="pm__logos">
        <a
          v-for="product in PRODUCTS"
          :key="product.slug"
          :href="product.href"
          class="pm__logo-item"
          target="_blank"
          rel="noopener"
        >
          <span class="pm__logo-name">{{ product.name }}</span>
          <span class="pm__logo-brand">·RESIDELIA</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  wfSteps?: Record<string, any>[]
}>()

const PRODUCTS = [
  { name: 'explorer',    slug: 'explorer',    href: '/explorer' },
  { name: 'valuation',   slug: 'valuation',   href: '/valuation' },
  { name: 'legal',       slug: 'legal',       href: '/legal' },
  { name: 'management',  slug: 'management',  href: '/management' },
  { name: 'maintenance', slug: 'maintenance', href: '/maintenance' },
  { name: 'broker',      slug: 'broker',      href: '/broker' },
]
</script>

<style scoped>
.pm {
  padding: 72px 0 64px;
  background: #F7F9FD;
  overflow: hidden;
}

/* Circuit wrapper: horizontal scroll on small screens */
.pm__circuit-wrap {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: 48px;
}
.pm__circuit-wrap::-webkit-scrollbar { display: none; }

/* Hide circuit on mobile (same breakpoint as original) */
@media (max-width: 575px) {
  .pm__circuit-wrap { display: none; }
}

/* Descriptive text */
.pm__text {
  font-size: 16px;
  line-height: 1.6;
  color: #4F575E;
  text-align: center;
  max-width: 640px;
  margin: 0 auto 40px;
}

/* Product logos */
.pm__logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px 32px;
  flex-wrap: wrap;
}

.pm__logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 10px;
  transition: background 180ms;
}
.pm__logo-item:hover {
  background: rgba(23,120,251,0.06);
}

.pm__logo-name {
  font-size: 20px;
  font-weight: 800;
  color: #20252A;
  letter-spacing: -0.02em;
  line-height: 1;
  font-style: italic;
}

.pm__logo-brand {
  font-size: 10px;
  font-weight: 600;
  color: #1778FB;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 2px;
}
</style>
