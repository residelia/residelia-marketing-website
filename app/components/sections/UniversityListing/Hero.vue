<template>
    <section v-if="hero" id="university-1" class="pb-40 inner-page-hero pricing-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title mb-30">
                        <!-- Title -->
                        <h1 class="s-42 w-700">{{ hero.heading?.find(t => t._key === locale).value}}</h1>
                        <!-- Text -->
                        <p class="p-xl mt-0" :class="textColor">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- END SECTION TITLE -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { locale } = useI18n()
const route = useRoute()

const props = defineProps<{
    hero?: Object
    textColor?: String
}>();
</script>

