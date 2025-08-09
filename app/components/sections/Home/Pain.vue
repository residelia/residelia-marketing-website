<template>
    <section v-if="painAndSolution" id="features-2" class="py-100 features-section division bg--surface-200">
        <div class="container">
            <!-- 1x2 WRAPPER -->
            <div class="fbox-wrapper text-center">
                <div class="row d-flex align-items-start">
                    <!-- PAIN BOX -->
                    <div class="col-md-6">
                        <div class="fbox-5 r-16 d-flex flex-column">
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h3 class="s-26 w-700" >{{ painAndSolution.pain.heading.find(t => t._key === locale).value }}</h3>
                                <p class="mt-2">{{ painAndSolution.pain.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                            <!-- Image -->
                            <div class="fbox-5-img mt-90">
                                <img class="img-fluid" width="400" :src="painAndSolution.pain.pic.url+'?fm=webp'" :alt="painAndSolution.pain.image.alt" />
                            </div>
                        </div>
                    </div>
                    <!-- END PAIN BOX -->
                    <!-- SOLUTION BOX -->
                    <div class="col-md-6">
                        <div class="fbox-5 r-16 d-flex flex-column">
                            <!-- Text -->
                            <div class="fbox-txt">
                                <h3 class="s-26 w-700" v-html="balanceString(painAndSolution.solution.heading.find(t => t._key === locale).value,5)"></h3>
                                <p class="mt-2">{{ painAndSolution.solution.subHeading.find(t => t._key === locale).value }}</p>
                            </div>
                            <!-- Image -->
                            <div class="fbox-5-img mt-5">
                                <img class="img-fluid" width="450px" :src="painAndSolution.solution.pic.url+'?fm=webp'" :alt="painAndSolution.solution.image.alt" />
                            </div>
                        </div>
                    </div>
                    <!-- END SOLUTION BOX -->
                </div>
                <!-- End row -->
            </div>
            <!-- END 1x2 WRAPPER -->
            <!-- <div v-if="painAndSolution.buttons" class="txt-block-tra-link mt-25">
                <NuxtLink :to="$localePath(`${painAndSolution.buttons.link.slug.find(t => t._key === locale).value.current}${painAndSolution.buttons.queryString ? painAndSolution.buttons.queryString : ''}`)" class="btn r-04 btn--theme hover--theme">{{ painAndSolution.buttons.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }} <span class="flaticon-next"></span></NuxtLink>
            </div> -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const props = defineProps<{
    painAndSolution: Object;
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