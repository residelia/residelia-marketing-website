<template>
    <section v-if="readings" class="division mb-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-11 col-xl-10">
                    <!-- VERSION RELEASE -->
                    <h5 v-if="readings.length > 0" class="s-18 w-700 mb-5">{{ $t('otherReadings') }}</h5>
                    <div class="row">
                        <div v-for="topic in readings" :key="topic._id" class="col-md-6 col-12 version-release mb-0">
                            <!-- Release Data -->
                            <NuxtLink :to="topic.slug" v-follow >
                                <div class="release-data pb-2">
                                    <!-- Version Data -->
                                    <span>
                                    <span><v-icon>mdi-post-outline</v-icon></span>
                                        <div class="s-16 w-700">{{ topic.shortTitle }}</div>
                                        <span class="s-11 mt-0">{{ topic.pillar }} <v-icon>mdi-circle-small</v-icon> <span>{{ $t('updated')}} {{ $dayjs(topic?.updatedAt).locale(locale).fromNow() }}</span></span>
                                    </span>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- END VERSION RELEASE -->
                </div>
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { locale } = useI18n()
const route = useRoute()

const props = defineProps<{
    readings?: Array<Object>
}>();
</script>