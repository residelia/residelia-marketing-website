<template>
  <div>
  {{ value }}
          <PortableText :value="value" :components="serializers"/>
    <figure>
      <blockquote class="blockquote w-300">
        <p>
          {{ value.children.text }}
        </p>
      </blockquote>
      <figcaption v-if="value.caption" class="blockquote-footer">
        <cite>{{ value.caption }}</cite>
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import Link from './Link.vue'
import InternalLink from './InternalLink.vue'

defineProps<{
  value: object
  quote: string;
  caption?: string;
}>();

const serializers = {
  marks: {
    'externalLink': Link,
    'internalLink': InternalLink,
    'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
    'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
    'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
  },
};
</script>
