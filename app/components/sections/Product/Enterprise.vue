<template>
    <hr class="divider" />
    <section v-if="enterprise" id="features-12" class="shape--bg shape--white-500 pt-100 features-section division mb-100">
        <div class="container">
            <div class="row d-flex align-items-center">
                <!-- TEXT BLOCK -->
                <div class="col-md-5 px-0">
                    <div class="txt-block left-column">
                        <!-- Section ID -->
                        <span class="section-id">{{ enterprise.upperHeading.find(t => t._key === locale).value }}</span>
                        <!-- Title -->
                        <h2 class="s-36 w-700" v-html="balanceString(enterprise.heading.find(t => t._key === locale).value,5)"></h2>
                        <!-- Text -->
                        <p >{{ enterprise.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
                <!-- END TEXT BLOCK -->
                <!-- FEATURES-12 WRAPPER -->
                <div class="col-md-7">
                    <div class="fbox-12-wrapper">
                        <div class="row">
                            <div v-for="(benefit,index) in enterprise.benefits" class="col-6">
                                <!-- FEATURE BOX -->
                                <div :id="`fb-12-${index+1}`" class="fbox-12 bg--white-100 block-shadow r-12 mb-30" :class="{'mb-3': index % 2 === 0}">
                                    <!-- Icon -->
                                    <div class="fbox-ico ico-50">
                                        <div class="shape-ico color--theme-primary">
                                            <!-- Vector Icon -->
                                            <span v-if="!benefit.isMDI" :class="`flaticon-${benefit.icon}`"></span>
                                            <span v-else :class="benefit.icon" class="color--primary"></span>
                                            <!-- Shape -->
                                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z" transform="translate(100 100)" />
                                            </svg>
                                        </div>
                                    </div>
                                    <!-- End Icon -->
                                    <!-- Text -->
                                    <div class="fbox-txt">
                                        <h6 class="s-22 w-700">{{ benefit.heading.find(t => t._key === locale).value }}</h6>
                                        <p class="mt-3">{{ benefit.subHeading.find(t => t._key === locale).value }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End row -->
                </div>
                <!-- END FEATURES-12 WRAPPER -->
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const props = defineProps<{
  enterprise: Object;
}>();
</script>