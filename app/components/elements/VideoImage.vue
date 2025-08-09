<template>
  <div class="post-inner-img">
      <div class="video-preview">
          <!-- Play Icon -->
          <ElementsVideoModal :link="value.videoUrl">
              <template v-slot:button>
                  <div class="video-btn video-btn-xl bg--black-400 ico-90">
                      <div class="video-block-wrapper"><span class="flaticon-play-button"></span></div>
                  </div>
              </template>
          </ElementsVideoModal>
          <!-- Preview Image -->
          <SanityImage class="img-fluid r-16" :asset-id="value.image.asset._ref" auto="format" :alt="value.image.alt" />
      </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
    value: object
}>();
</script>

<style>

</style>