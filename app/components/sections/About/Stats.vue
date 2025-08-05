<template>
    <div v-if="statistics" id="statistic-5" class="py-100 statistic-section division">
        <div class="container">
            <!-- STATISTIC-1 WRAPPER -->
            <div class="statistic-5-wrapper">
                <div class="row row-cols-1 row-cols-md-3">
                    <!-- STATISTIC BLOCK -->
                    <div v-for="(stat, index) in statistics.statGroup" class="col">
                        <div id="sb-5-1">
                            <div class="statistic-block">
                                <!-- Digit -->
                                <div class="statistic-digit">
                                    <h2 class="s-44 w-700">
                                        <span class="count-element d-flex"> <ElementsCounterUp :start="0" :end="parseInt(stat.value)" :duration="2000" /> </span>
                                    </h2>
                                </div>
                                <!-- Text -->
                                <div class="statistic-txt">
                                    <h5 class="s-19 w-700">{{ stat.unit }}</h5>
                                    <p>{{ stat.metric.find(t => t._key === locale).value }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END STATISTIC BLOCK -->
                </div>
                <!-- End row -->
            </div>
            <!-- END STATISTIC-5 WRAPPER -->
        </div>
        <!-- End container -->
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    statistics: Object
}>();
</script>