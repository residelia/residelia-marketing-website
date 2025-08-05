<template>
    <section v-if="customers" class="ct-03 content-section division" :class="`py-${height}`">
        <div class="container text-center">
            <!-- BRANDS CAROUSEL -->
            <div v-if="customers" id="brands-1" class="py-90">
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
    height: Number
}>();
</script>