<template>
  <div class="university-outline">
    <div v-for="(pillar, idx) in pillars" :key="pillar._id" class="mb-1">
      <!-- Pillar row: link navega al pillar, chevron hace toggle -->
      <div
        class="outline-pillar r-08 block-border d-flex align-items-center"
        :class="{ 'outline-pillar--active': isActivePillar(pillar) }"
      >
        <NuxtLink
          :to="pillar.slug"
          class="d-flex align-items-center gap-2 flex-grow-1 px-3 py-2 outline-pillar-link"
          :class="{ 'outline-pillar-link--active': currentSlug === pillar.slug }"
        >
          <span class="outline-num s-11 w-700">{{ idx + 1 }}</span>
          <span class="s-13 w-600">{{ pillar.shortTitle || pillar.title }}</span>
        </NuxtLink>
        <button class="outline-toggle px-2 py-2" @click.prevent="toggle(pillar._id)">
          <v-icon size="14">{{ open.includes(pillar._id) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </button>
      </div>
      <!-- Clusters list -->
      <ul v-show="open.includes(pillar._id)" class="outline-clusters ps-2 pt-1 pb-1">
        <li v-for="cluster in pillar.clusters" :key="cluster._id">
          <NuxtLink
            :to="cluster.slug.current"
            class="outline-cluster-link s-12 w-500 d-flex align-items-start gap-1 py-1 px-2 r-06"
            :class="{ 'outline-cluster-link--active': currentSlug === cluster.slug.current }"
          >
            <v-icon size="13" class="outline-cluster-icon flex-shrink-0">mdi-file-document-outline</v-icon>
            <span>{{ cluster.shortTitle || cluster.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  pillars: Array<any>
  currentSlug?: string
}>()

const open = ref<string[]>([])

// Auto-expand: el pillar activo (o cuyo cluster es el activo) arranca abierto
const activePillar = props.pillars?.find(p =>
  p.slug === props.currentSlug ||
  p.clusters?.some((c: any) => c.slug?.current === props.currentSlug)
)
if (activePillar) {
  open.value = [activePillar._id]
}

function toggle(id: string) {
  const idx = open.value.indexOf(id)
  if (idx >= 0) open.value.splice(idx, 1)
  else open.value.push(id)
}

function isActivePillar(pillar: any) {
  return (
    pillar.slug === props.currentSlug ||
    pillar.clusters?.some((c: any) => c.slug?.current === props.currentSlug)
  )
}
</script>

<style scoped>
.outline-pillar {
  transition: background 0.15s;
  overflow: hidden;
}
.outline-pillar:hover {
  background: #F7F9FD;
}
.outline-pillar--active {
  background: #E4F3FF;
  border-color: #48AAF1;
}
.outline-pillar-link {
  color: #4F575E;
  text-decoration: none;
  min-width: 0;
}
.outline-pillar-link:hover {
  color: #1778FB;
  text-decoration: none;
}
.outline-pillar-link--active {
  color: #1778FB;
}
.outline-num {
  background: #EEF2F7;
  color: #4F575E;
  border-radius: 4px;
  min-width: 20px;
  text-align: center;
  padding: 1px 5px;
  flex-shrink: 0;
}
.outline-pillar--active .outline-num {
  background: #48AAF1;
  color: #fff;
}
.outline-toggle {
  background: transparent;
  border: none;
  color: #6C7A86;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.outline-toggle:hover {
  color: #1778FB;
}
.outline-clusters {
  list-style: none;
  margin: 0;
}
.outline-cluster-link {
  color: #4F575E;
  text-decoration: none;
  line-height: 1.4;
}
.outline-cluster-link:hover {
  background: #F7F9FD;
  color: #1778FB;
  text-decoration: none;
}
.outline-cluster-link--active {
  background: #E4F3FF;
  color: #1778FB;
  font-weight: 600;
}
.outline-cluster-icon {
  color: #6C7A86;
}
.outline-cluster-link:hover .outline-cluster-icon,
.outline-cluster-link--active .outline-cluster-icon {
  color: #1778FB;
}
</style>
