<template>
  <section class="pm pt-100 pb-100">
    <div class="container">

      <!-- Section header -->
      <div class="section-title text-center mb-50">
        <span v-if="overline" class="section-id">{{ overline }}</span>
        <h2 v-if="heading" class="s-36 w-700" v-html="headingHtml" />
        <p v-if="subHeading" class="p-lg color--grey">{{ subHeading }}</p>
      </div>

      <!-- Animated lifecycle circuit -->
      <div class="pm__circuit-wrap">
        <ElementsLifecycleCircuit :wf-steps="workflow?.wfSteps" />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const props = defineProps<{
  workflow?: Record<string, any>
}>()

const loc = (arr: any[]) =>
  arr?.find((t: any) => t._key === locale.value)?.value
  ?? arr?.find((t: any) => t._key === locale.value.slice(0, 2))?.value
  ?? ''

const overline = computed(() => loc(props.workflow?.upperHeading))
const heading = computed(() => loc(props.workflow?.heading))
const subHeading = computed(() => loc(props.workflow?.subHeading))

const headingHtml = computed(() => {
  const accent = loc(props.workflow?.headingHighlight)
  if (!accent || !heading.value) return heading.value
  return heading.value.replace(accent, `<span class="color--theme">${accent}</span>`)
})
</script>

<style scoped>
.pm {
  background: #F7F9FD;
  overflow: hidden;
}

.pm__circuit-wrap {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}
.pm__circuit-wrap::-webkit-scrollbar { display: none; }
</style>

