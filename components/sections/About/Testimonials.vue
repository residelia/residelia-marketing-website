<template>
    <section v-if="testimonials" id="reviews-2" class="pt-100 reviews-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-36 w-700">{{ testimonials?.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <!-- <p class="s-21 color--grey">{{ testimonials?.subHeading.find(t => t._key === locale).value }}</p> -->
                    </div>
                </div>
            </div>
            <!-- TESTIMONIALS-2 WRAPPER -->
            <div class="reviews-2-wrapper rel shape--02 shape--whitesmoke">
                <div class="row align-items-center row-cols-1 row-cols-md-2">
                    <!-- TESTIMONIAL -->
                    <div v-for="(testimonial,index) in testimonials.testimonials" class="col" :key="testimonial._id">
                        <div v-if="index <= 3" id="rw-2-1" class="review-2 bg--white-100 block-shadow r-08">
                            <!-- Quote Icon -->
                            <div class="review-ico ico-65"><span class="flaticon-quote"></span></div>
                            <!-- Text -->
                            <div class="review-txt">
                                <!-- Text -->
                                <p>{{ testimonial.testimonial.find(t => t._key === locale).value }}</p>
                                <!-- Author -->
                                <div class="author-data clearfix">
                                    <!-- Avatar -->
                                    <div v-if="testimonial.pic" class="review-avatar">
                                        <img :src="testimonial.pic.url" :alt="testimonial.image.alt" />
                                    </div>
                                    <!-- Data -->
                                    <div class="review-author">
                                        <h6 class="s-18 w-700">{{ testimonial.name }}</h6>
                                        <p class="p-sm">{{ testimonial.company }}</p>
                                    </div>
                                </div>
                                <!-- End Author -->
                            </div>
                            <!-- End Text -->
                        </div>
                    </div>
                    <!-- END TESTIMONIAL -->
                </div>
                <!-- End row -->
            </div>
            <!-- END TESTIMONIALS-2 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    testimonials: Object
}>();
</script>