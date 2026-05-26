<template>
  <section class="ps">
    <div class="container ps__inner">
      <!-- Left: dashboard screenshot -->
      <div class="ps__left">
        <div class="ps__img-wrap">
          <img
            src="/assets/images/dashboard-09.png"
            alt="RESIDELIA platform dashboard"
            class="ps__img"
          />
        </div>
      </div>

      <!-- Right: text + CTAs -->
      <div class="ps__right">
        <span class="ps__overline">RESIDELIA</span>
        <h2 class="ps__h2">Tu centro de control inmobiliario, en un único lugar</h2>
        <p class="ps__body">
          Combina la potencia IA, datos de mercado y gestión integrada para maximizar rentabilidad, reducir costos y controlar cada etapa de tus activos inmobiliarios
        </p>
        <div class="ps__actions">
          <a
            href="https://app.residelia.com"
            target="_blank"
            rel="noopener"
            class="btn btn--theme r-04"
          >Inicia sesión</a>
          <a
            href="https://app.residelia.com/register"
            target="_blank"
            rel="noopener"
            class="btn btn--theme-secondary r-04"
          >Regístrate gratis</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ps {
  padding: 80px 0;
  background: #fff;
}

.ps__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* Left */
.ps__img-wrap {
  background: #F0F6FF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(23,120,251,0.12);
}

.ps__img {
  width: 100%;
  display: block;
  border-radius: 16px;
}

/* Right */
.ps__right {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ps__overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1778FB;
  margin-bottom: 16px;
}

.ps__h2 {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #20252A;
  margin: 0 0 20px;
  text-wrap: balance;
}

.ps__body {
  font-size: 16px;
  line-height: 1.65;
  color: #4F575E;
  margin: 0 0 32px;
}

.ps__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 991px) {
  .ps__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
