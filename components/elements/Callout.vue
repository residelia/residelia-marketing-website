<template>
  <div>
    <br>
    <v-alert
      v-if="value.calloutType === 'tip'"
      icon="mdi-pill"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'info'"
      icon="mdi-information-outline"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'warning'"
      icon="mdi-alert-outline"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'error'"
      icon="mdi-alert-octagon-outline"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'normal'"
      :title="value.title"
      color="'light-blue-accent-4"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'hands-on'"
      icon="mdi-hand-pointing-right"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else-if="value.calloutType === 'euro'"
      icon="mdi-currency-eur"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <v-alert
      v-else="value.calloutType === 'tip'"
      icon="mdi-pill"
      :title="value.title"
      color="'light-blue-accent-4"
      type="info"
      variant="tonal"
      rounded
      class="pt-10"
    >
      <SanityContent :blocks="value.content" :serializers="serializers" />
    </v-alert>
    <br>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: object;
}>();

const serializers = {
    marks: {
        'strike-through': 's',
        'keyboard': 'kbd',
        'highlight': 'mark'
    }
}
</script>
