<template>
    <hr class="divider" />
    <section v-if="suite" id="features-2" class="pt-100 features-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Section ID -->
                        <span class="section-id">{{ suite.upperHeading.find(t => t._key === locale)?.value}}</span>
                        <!-- Title -->
                        <h2 class="s-36 w-700" v-html="balanceString(suite.heading.find(t => t._key === locale).value,5)"></h2>
                        <!-- Text -->
                        <p class="s-18 mt-3 color--grey">{{ suite.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- 1x3 WRAPPER -->
            <div v-if="suite.suite.length > 2" class="fbox-wrapper text-center">
                <div class="row row-cols-1 row-cols-md-3">
                    <!-- FEATURE BOX -->
                    <div v-for="product,index in suite.suite" class="col">
                        <div class="fbox-2 wow fadeInUp" :class="`fb-${index+1}`">
                            <!-- Image -->
                            <div class="fbox-img gr--whitesmoke h-175">
                                <img class="img-fluid" :src="product.pic.url" :alt="product.image.alt" />
                            </div>
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h5 class="s-22 w-700" v-html="balanceString(product.heading.find(t => t._key === locale).value,5)"></h5>
                                <p>{{ product.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- END FEATURE BOX -->
                </div>
                <!-- End row -->
            </div>
            <!-- END 1x3 WRAPPER -->
            <!-- 1x2 WRAPPER -->
            <div v-else class="fbox-wrapper text-center mb-100">
                <div class="row d-flex align-items-center">
                    <!-- FEATURE BOX -->
                    <div v-for="product,index in suite.suite" class="col-md-6">
                        <div class="fbox-5 r-16 wow fadeInUp d-flex flex-column" :class="{'gr--primary-50': index % 2 === 0, 'gr--primary-50-reverse': index % 2 !== 0}">
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h5 class="s-22 w-700" v-html="balanceString(product.heading.find(t => t._key === locale).value,5)"></h5>
                                <p>{{ product.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                            <!-- Image -->
                            <div class="fbox-5-img pt-10">
                                <img class="img-fluid" :src="product.pic.url" :alt="product.image.alt" />
                            </div>
                        </div>
                    </div>
                    <!-- END FEATURE BOX -->
                </div>
                <!-- End row -->
            </div>
            <!-- END 1x2 WRAPPER -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const props = defineProps<{
  suite: Object;
}>();
</script>

<style lang="css" scoped>
.first {
    order: 1
}
.last {
    order: 2
}
</style>