<template>
    <div v-if="customers" id="brands-1" class="pt-80 pb-100 brands-section">
        <div class="container">
            <!-- BRANDS TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="brands-title mb-50">
                        <h5 class="s-18">{{ customers?.heading?.find(t => t._key === locale).value }}</h5>
                    </div>
                </div>
            </div>
            <!-- BRANDS CAROUSEL -->
            <div class="row">
                <div class="col text-center">
                    <SlidersBrandLogos :customers="customers.customersGroup"/>
                </div>
            </div>
            <!-- END BRANDS CAROUSEL -->
        </div>
        <!-- End container -->
    </div>
    <hr class="divider" />
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    customers: Object
}>();
</script>