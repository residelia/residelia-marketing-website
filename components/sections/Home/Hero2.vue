<template>
    <section id="hero-5" class="bg--fixed hero-section pt-100">
        <div class="container">
            <div class="row d-flex align-items-center">
                <!-- HERO TEXT -->
                <div class="col-md-6">
                    <div class="hero-3-txt color--white">
                        <!-- Title -->
                        <h2 class="s-60 w-300">{{ data?.hero?.heading }}</h2>
                        <!-- Text -->
                        <p class="p-lg">{{ data?.hero?.subHeading }}</p>
                        <!-- Buttons -->
                        <div class="btns-group d-flex justify-content-start">
                            <div v-for="button in data?.hero?.buttons">
                                <a v-if="button.button.linkType == 'anchor'" :href="button.button.anchor" class="btn r-04 btn--theme hover--theme">{{ button.button.linkText }}</a>
                                <a v-else-if="button.button.linkType == 'externalLink'" :href="button.button.externalUrl" class="btn r-04 btn--theme hover--theme">{{ button.button.linkText }}</a>
                                <a v-else-if="button.button.linkType == 'internalLink'" :href="button.button.anchor" class="btn r-04 btn--theme hover--theme">{{ button.button.linkText }}</a>
                                <ElementsVideoModal v-else-if="button.button.linkType == 'video'" :link="button.button.externalUrl">
                                    <template v-slot:button>
                                        <span class="video-popup2 btn r-04 btn--theme hover--tra-black ico-20 ico-right">{{ button.button.linkText }}</span>
                                    </template>
                                </ElementsVideoModal>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END HERO TEXT -->
                <!-- HERO IMAGE -->
                <div class="col-md-6">
                    <div class="hero-3-img">
                        <img class="img-fluid rounded" :src="data?.hero?.image.url" :alt="data?.hero?.heroImage.alt" />
                    </div>
                </div>
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup>
    defineProps({
        data: {
            type: Object,
            required: false
        }
    })
</script>