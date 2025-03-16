<template>
    <section v-if="message" id="banner-1" class="pt-100 banner-section">
        <div class="container">
            <!-- BANNER-1 WRAPPER -->
            <div class="banner-1-wrapper r-16">
                <div class="banner-overlay bg--scroll" :class="color">
                    <div class="row">
                        <!-- BANNER-1 TEXT -->
                        <div class="col">
                            <div class="banner-1-txt color" :class="textColor">
                                <!-- Title -->
                                <h2 class="s-45 w-700">{{ message.heading.find(t => t._key === locale).value }}</h2>
                                <!-- Text -->
                                <p class="p-xl">{{ message.subHeading?.find(t => t._key === locale).value }}</p>
                                <!-- Button -->
                                <a :href="message.link.slug.find(t => t._key === locale).value.current" class="btn r-04 btn--theme hover--tra-white" data-bs-toggle="modal" data-bs-target="#modal-3">{{ message.button.linkText.find(t => t._key === locale).value }}</a>
                                <!-- Button Text -->
                                <!-- <p class="p-sm btn-txt ico-15 o-85"><span class="flaticon-check"></span> Free for 14 days, no credit card required.</p> -->
                            </div>
                        </div>
                        <!-- END BANNER-1 TEXT -->
                    </div>
                    <!-- End row -->
                </div>
                <!-- End banner overlay -->
            </div>
            <!-- END BANNER-1 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    color: String
    textColor: String
    message: Object
}>();
</script>
