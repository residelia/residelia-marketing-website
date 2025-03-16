<template>
  <section id="contacts-1" class="inner-page-hero contacts-section division">
    <div class="container">
      <!-- SECTION TITLE -->
      <div v-if="hero" class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title text-center mb-80">
            <!-- Title -->
            <h2 class="s-52 w-700">{{ hero.heading.find(t => t._key === locale).value }}</h2>
            <!-- Text -->
            <p class="p-lg">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End container -->
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    hero: Object
}>();
</script>

<style lang="css">
.border-error {
  border-color: #e74c3c !important;
}

.border-valid {
  border-color: #42d392 !important;
}

.v-selection-control {
  align-items: start !important;
}
.v-btn__content {
  margin: 0 !important;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500 !important;
  font-size: 1rem !important;
}
</style>
