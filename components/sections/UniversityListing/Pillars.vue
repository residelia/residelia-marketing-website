<template>
    <section v-if="pillars" class="mb-100">
      <div class="container">
        <div class="row justify-content-center">
          <div 
            class="col-4"
            v-for="pillar in pillars"
            :key="pillar._id"
          >
            <v-card
              class="mx-auto"
              rounded="16"
              border="1"
              elevation="0"
              height=350
            >
              <template v-slot:prepend>
                <v-icon v-if="pillar.isMDI" size="52" :icon="pillar.icon" class="pt-2 w-100" color="blue"></v-icon>
                <v-icon v-else size="52" :icon="`flaticon-${pillar.icon}`" class="p-0 color--primary-200"></v-icon>
              </template>
              <v-card-title class="text-wrap">
                <h2 class="s-17 w-600">{{ pillar.shortTitle || pillar.title }}</h2>
              </v-card-title>
              <v-card-text class="text-wrap">
                <span class="s-12 color--grey-400 pt-4">{{ pillar.subTitle }}</span>
              </v-card-text >
              <template v-slot:actions>
                <NuxtLink :to="pillar.slug" class="s-14 w-600 ml-2">{{ $t('viewContent') }}<v-icon size="18" class="ml-2">ri-go-to</v-icon></NuxtLink>
              </template>
            </v-card>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { locale } = useI18n()
const route = useRoute()

const props = defineProps<{
    pillars?: Array<Object>
}>();
</script>

