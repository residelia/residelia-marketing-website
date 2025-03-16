<template>
    <section v-if="customers" class="py-100 ct-03 content-section division">
        <div class="container text-center">
            <!-- BRANDS TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="brands-title mb-50">
                        <h5 class="s-18">{{ customers?.heading?.find(t => t._key === locale).value }}</h5>
                    </div>
                </div>
            </div>
            <!-- BRANDS CAROUSEL -->
            <div id="brands-1">
                <div class="row">
                    <div class="col text-center">
                        <SlidersBrandLogos :customers="customers.customersGroup" />
                    </div>
                </div>
                <!-- End row -->
            </div>
            <!-- END BRANDS CAROUSEL -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    customers: Object
}>();
</script>