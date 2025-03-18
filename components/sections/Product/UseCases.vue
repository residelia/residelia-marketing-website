<template>
    <section v-if="useCases" class="pt-100 ct-04 content-section division">
        <div class="container">
            <!-- SECTION CONTENT (ROW) -->
            <div class="row d-flex align-items-center">
                <!-- TEXT BLOCK -->
                <div class="col-md-6 order-last order-md-2">
                    <div class="txt-block left-column">
                        <!-- CONTENT BOX -->
                        <div v-for="(useCase, index) in useCases.useCaseGroup" class="cbox-2 process-step">
                            <!-- Icon -->
                            <div class="ico-wrap">
                                <div class="cbox-2-ico bg--theme color--white">{{ index + 1 }}</div>
                                <span v-if="index+1 < useCases.useCaseGroup.length" class="cbox-2-line"></span>
                            </div>
                            <!-- Text -->
                            <div class="cbox-2-txt">
                                <h5 class="s-22 w-700">{{ useCase.heading.find(t => t._key === locale).value }}</h5>
                                <p>{{ useCase.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                        <!-- END CONTENT BOX -->
                    </div>
                </div>
                <!-- END TEXT BLOCK -->
                <!-- IMAGE BLOCK -->
                <div class="col-md-6 order-first order-md-2">
                    <div class="img-block">
                        <img class="img-fluid" :src="useCases.pic.url" :alt="useCases.image.alt" />
                    </div>
                </div>
            </div>
            <!-- END SECTION CONTENT (ROW) -->
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