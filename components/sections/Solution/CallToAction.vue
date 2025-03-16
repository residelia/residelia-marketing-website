<template>
    <section v-if="message" id="banner-7" class="banner-section bg--primary-300">
        <div class="banner-overlay py-100">
            <div class="container">
                <!-- BANNER-7 WRAPPER -->
                <div class="banner-7-wrapper">
                    <div class="row justify-content-center">
                        <!-- BANNER-7 TEXT -->
                        <div class="col-md-8">
                            <div class="banner-7-txt text-center">
                                <!-- Section ID -->
                                <span class="section-id color--white">{{ message?.upperHeading?.find(t => t._key === locale).value }}</span>
                                <!-- Title -->
                                <h2 class="s-36 w-700 color--white" v-html="balanceString(message?.heading?.find(t => t._key === locale).value,5)"></h2>
                                <!-- Buttons -->
                                <div class="btns-group">
                                    <NuxtLink
                                        :to="localePath(message.link.slug.find(t => t._key === locale).value.current+message.button.queryString )"
                                        class="btn r-04 btn--theme-secondary hover--theme" data-bs-toggle="modal" data-bs-target="#modal-3"
                                        @click="handleClick(message.button.id,'solution-cta-button')"
                                    >{{ message.button.linkText.find(t => t._key === locale).value }}</NuxtLink>
                                </div>
                                <!-- Button Text -->
                                <!-- <p class="btn-txt ico-15">Free for 14 days - no credit card required.</p> -->
                            </div>
                        </div>
                    </div>
                    <!-- End row -->
                </div>
                <!-- END BANNER-7 WRAPPER -->
            </div>
            <!-- End container -->
        </div>
        <!-- End banner overlay -->
    </section>
    <!-- END BANNER-7 -->
    <!-- DIVIDER LINE -->
    <hr class="divider" />
</template>
<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    message: Object
}>();

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>