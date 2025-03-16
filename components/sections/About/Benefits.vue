<template>
    <section id="features-11" class="py-100 features-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-50 w-700">{{ benefits.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="s-21 color--grey">{{ benefits.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- FEATURES-11 WRAPPER -->
            <div class="fbox-wrapper">
                <div class="row row-cols-1 row-cols-md-2 rows-3">
                    <!-- FEATURE BOX -->
                    <div v-for="benefit in benefits.benefits" class="col">
                        <div class="fbox-11 fb-1 wow fadeInUp">
                            <!-- Icon -->
                            <div class="fbox-ico-wrap">
                                <div class="fbox-ico ico-50">
                                    <div class="shape-ico color--theme-primary">
                                        <!-- Vector Icon -->
                                        <span v-if="!benefit.isMDI" :class="`flaticon-${benefit.icon}`" class="color--primary"></span>
                                        <span v-else :class="benefit.icon" class="color--primary"></span>
                                        <!-- <span class="flaticon-graphics color--theme"></span> -->
                                        <!-- Shape -->
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <!-- End Icon -->
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h6 class="s-22 w-700">{{ benefit.heading.find(t => t._key === locale).value }}</h6>
                                <p>{{ benefit.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- END FEATURE BOX -->
                </div>
                <!-- End row -->
            </div>
            <!-- END FEATURES-11 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
    <!-- END FEATURES-11 -->
    <!-- DIVIDER LINE -->
    <hr class="divider" />
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    benefits: Object
}>();
</script>