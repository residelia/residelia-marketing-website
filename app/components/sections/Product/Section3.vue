<template>
    <section v-if="useCases" id="features-2" class="py-100 features-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-80">
                        <!-- Title -->
                        <h2 class="s-50 w-700">{{ useCases?.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="s-21 color--grey">{{ useCases?.subHeading?.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- FEATURES-2 WRAPPER -->
            <div class="fbox-wrapper text-center">
                <div class="row row-cols-1 row-cols-md-3">
                    <!-- FEATURE BOX #1 -->
                    <div v-for="(useCase, index) in useCases?.useCaseGroup" class="col">
                        <div class="fbox-2 fb-1 wow fadeInUp">
                            <!-- Image -->
                            <div class="fbox-img gr--whitesmoke h-175">
                                <img class="img-fluid" src="/assets/images/f_04.png" alt="feature-image" />
                            </div>
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h6 class="s-22 w-700">{{ useCase?.heading.find(t => t._key === locale).value }}</h6>
                                <p>{{ useCase?.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- END FEATURE BOX #1 -->
                </div>
                <!-- End row -->
            </div>
            <!-- END FEATURES-2 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    useCases: Array
}>();
</script>