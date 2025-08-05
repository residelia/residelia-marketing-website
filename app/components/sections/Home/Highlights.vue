<template>
    <!-- DIVIDER LINE -->
    <hr class="divider" />
    <section v-if="features" id="features-6" class="py-100 features-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-36 w-700" v-html="balanceString(features.heading.find(t => t._key === locale).value,5)"></h2>
                        <!-- Text -->
                        <p class="s-20 color--grey">{{ features.subHeading?.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- FEATURES-6 WRAPPER -->
            <div class="fbox-wrapper text-center">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    <!-- FEATURE BOX -->
                    <div v-for="(feature, index) in features.features" class="col my-4">
                        <div class="fbox-6" :class="`fb-${index+1}`">
                            <!-- Icon -->
                            <div class="fbox-ico ico-40">
                                <div class="shape-ico color--theme-primary">
                                    <!-- Vector Icon -->
                                    <!-- <span class="flaticon-rocket-launch" class="color--secondary-200"></span> -->
                                    <span v-if="!feature.isMDI" :class="`flaticon-${feature.icon}`" class="color--primary"></span>
                                    <span v-else :class="feature.icon" class="color--primary"></span>
                                    <!-- Shape -->
                                    <!-- <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="16" rx="64" fill="#EAF6FF" transform="translate(0 0)"/>
                                    </svg> -->
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z" transform="translate(100 100)" />
                                    </svg>
                                </div>
                            </div>
                            <!-- End Icon -->
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h6 class="s-20 w-700">{{ feature.heading.find(t => t._key === locale).value }}</h6>
                                <p>{{ feature.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- END FEATURE BOX -->
                </div>
                <!-- End row -->
            </div>
            <!-- END FEATURES-6 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    features: Object
}>();
</script>