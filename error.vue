<template>
  <section id="page-404" class="bg--white-300 division full--screen">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <!-- 404 PAGE TEXT -->
        <div class="col-md-9 col-lg-8">
          <div class="page-404-txt text-center">
            <!-- Image -->
            <div class="rel page-404-img">
              <img
                class="img-fluid"
                src="/assets/images/judges-404.webp"
                alt="error-404-img"
              />
              <!-- <img
                class="img-fluid"
                src="/assets/images/error-404.png"
                alt="error-404-img"
              /> -->
            </div>

            <!-- Text -->
            <h2 class="s-56 w-700 color--dark">{{ $t("pageNotFound") }}</h2>
            <h6 class="s-22 color--grey">{{ $t("notFoundMessage") }}</h6>

            <!-- Button -->
            <a :href="localePath('/')" class="btn btn--theme hover--theme"
            @click="handleError" >{{ $t('backHome') }}</a
            >
          </div>
        </div>
        <!-- END 404 PAGE TEXT -->
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
  <hr class="divider divider-light" />

</template>


<script setup lang="ts">
const props = defineProps({
  error: Object
})
const route = useRoute();
const { t, locale } = useI18n()
const localePath = useLocalePath()
const handleError = () => clearError({ redirect: localePath('/') })

useHead({
  bodyAttrs: {
    class: "navbar-dark scheme-residelia intensity-50 theme--light",
  },
});
</script>

<style>
.full--screen {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
