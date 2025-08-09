<template>
  <div>
    <div class="sanity-table-wrapper my-10">
        <table class="sanity-table">
        <thead v-if="rows.length">
            <tr>
            <th v-for="(cell, i) in rows[0].cells" :key="'th-' + i" v-html="renderMarkdown(cell)" />
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rIdx) in rows.slice(1)" :key="row._key || rIdx">
            <td v-for="(cell, cIdx) in row.cells" :key="'td-' + cIdx" v-html="renderMarkdown(cell)" />
            </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from './Link.vue'
import InternalLink from './InternalLink.vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  value: {
    rows: Array<{ cells: string[] }>
  }
}>();

const md = new MarkdownIt({ breaks: true, html: false })
const rows = props.value.rows || []

function renderMarkdown(text: string) {
  return md.renderInline(text || '')
}

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

<style scoped>
.sanity-table-wrapper {
  overflow-x: auto;
}
.sanity-table {
  width: 100%;
  border-collapse: collapse;
}
.sanity-table th,
.sanity-table td {
  border: 1px solid #e0e0e0;
  padding: 0.5em 1em;
  text-align: left;
  vertical-align: top;
}
</style>