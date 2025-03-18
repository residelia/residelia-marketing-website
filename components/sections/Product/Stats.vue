<template>
    <div v-if="stats" id="statistic-1" class="py-100 statistic-section division">
        <div class="container">
            <!-- STATISTIC-1 WRAPPER -->
            <div class="statistic-1-wrapper">
                <div class="row justify-content-md-center row-cols-1 row-cols-md-3">
                    <!-- STATISTIC BLOCK-->
                    <div v-for="(stat, index) in stats.statGroup" class="col">
                        <div :id="`sb-1-${index+1}`">
                            <div class="statistic-block">
                                <!-- Digit -->
                                <div class="statistic-block-digit">
                                    <h2 class="s-46 statistic-number">
                                        <span class="count-element d-flex"><ElementsCounterUp :start="0" :end="parseInt(stat.value)" :duration="2000" /></span>{{ stat.unit }}
                                    </h2>
                                </div>
                                <!-- Text -->
                                <div class="statistic-block-txt color--grey">
                                    <p class="p-md">{{ stat.metric.find(t => t._key === locale).value }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END STATISTIC BLOCK -->
                </div>
                <!-- End row -->
            </div>
            <!-- END STATISTIC-1 WRAPPER -->
        </div>
        <!-- End container -->
    </div>
    <!-- END STATISTIC-1 -->
    <!-- DIVIDER LINE -->
    <hr class="divider" />
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{
    stats: Object
}>();
</script>