<template>
    <section id="features-2" class="py-100 features-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-44 w-700">The only solution you need to run a world-class investment organization</h2>
                    </div>
                </div>
            </div>
            <!-- TABS -->
            <ElementsTabsComp />
            <!-- end TABS -->

        </div>
        <!-- End container -->
    </section>
    <!-- DIVIDER LINE -->
    <hr class="divider" />
</template>

<script setup lang="ts">
const { locale } = useI18n();
const props = defineProps<{
  suite?: Object;
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