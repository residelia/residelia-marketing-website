<template>
    <section v-if="dashboard" id="lnk-2" class="bg--secondary-400 bg--scroll ct-10 content-section division">
        <div class="section-overlay pt-100">
            <div class="container">
                <!-- SECTION TITLE -->
                <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-9">
                        <div class="section-title color--white mb-70">
                            <!-- Title -->
                            <h2 class="s-44 w-700">{{ dashboard?.heading.find(t => t._key === locale).value }}</h2>
                            <!-- Text -->
                            <p class="s-20">{{ dashboard?.subHeading.find(t => t._key === locale).value }}</p>
                        </div>
                    </div>
                </div>
                <!-- IMAGE BLOCK -->
                <div class="row">
                    <div class="col">
                        <div class="img-block video-preview">
                            <!-- Play Icon -->
                            <!-- <ElementsVideoModal :link="'https://www.youtube.com/embed/GcMiYI1gWD4'">
                                <template v-slot:button>
                                    <div class="video-btn video-btn-xl bg--pink-400 ico-90">
                                        <div class="video-block-wrapper"><span class="flaticon-play-button"></span></div>
                                    </div>
                                </template>
                            </ElementsVideoModal> -->
                            <!-- Preview Image -->
                            <img class="img-fluid" width="1024" :src="dashboard.pic.url+'?fm=webp'" :alt="dashboard.image.alt" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- End container -->
        </div>
        <!-- End section overlay -->
    </section>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n()
const props = defineProps<{
    dashboard?: Object
}>();
</script>
