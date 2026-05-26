<template>
    <template v-if="testimonials">
    <section id="reviews-1" class="py-100 shape--06 shape--gr-surface-100 reviews-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-36 w-700">{{ testimonials?.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="s-18 pt-2 color--grey">{{ testimonials?.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- TESTIMONIALS CONTENT -->
            <div class="row">
                <div class="col">
                    <SlidersTestimonials :testimonials="testimonials.testimonials"/>
                </div>
            </div>
            <!-- END TESTIMONIALS CONTENT -->
        </div>
        <!-- End container -->
    </section>
    <!-- END TESTIMONIALS-1 -->
    <!-- DIVIDER LINE -->
    <hr class="divider" />
    </template>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    testimonials: Object
}>();
</script>