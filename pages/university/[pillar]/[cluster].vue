<template>
  <div class="university-layout">
    <!-- Índice general -->
    <aside class="sidebar">
      <nav>
        <ul>
          <li v-for="p in pillars" :key="p.slug">
            <button @click="toggleCollapse(p.slug)">
              {{ p.title }}
            </button>
            <ul v-if="!collapsedPillars.includes(p.slug)">
              <li v-for="cluster in p.clusters" :key="cluster.slug">
                <nuxt-link :to="`/university/${p.slug}/${cluster.slug}`">
                  {{ cluster.title }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <main>
      <SectionsBlogPostContent :post="clusterContent" />
    </main>

    <!-- Table of Contents -->
    <aside class="table-of-contents">
      <nav>
        <ul>
          <li v-for="h2 in toc.h2" :key="h2.id">
            <a :href="`#${h2.id}`">{{ h2.text }}</a>
            <ul>
              <li v-for="h3 in h2.children" :key="h3.id">
                <a :href="`#${h3.id}`">{{ h3.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from '../../../stores/mainStore';
import { resourceQuery } from '../../../queries/contentQueries'
import { clusterQuery } from "../../../queries/universityQueries";

const route = useRoute();
const pillarSlug = route.params.pillar;
const clusterSlug = route.params.cluster;

// Datos del cluster
const clusterContent = ref(null);

// Índice general
const pillars = ref([]);
const collapsedPillars = ref([]);

// Table of Contents
const toc = ref({ h2: [] });

const toggleCollapse = (slug) => {
  if (collapsedPillars.value.includes(slug)) {
    collapsedPillars.value = collapsedPillars.value.filter((s) => s !== slug);
  } else {
    collapsedPillars.value.push(slug);
  }
};

useHead({
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})
defineI18nRoute({
    paths: {
      en: '/university/[pillar]/[cluster]',
      es: '/university/[pillar]/[cluster]'
    }
})

const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
    query: resourceQuery,
    params: {
      pillar: route.params.pillar,
      slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
      language: locale.value
    }
})

// FIXME: para que se realice el cambio entre idiomas correctamente
// const setI18nParams = useSetI18nParams()
// setI18nParams({
//     en: { type: data.value[0].slug.find(t => t._key === 'en').value.current, resource:  },
//     es: { slug: data.value[0].slug.find(t => t._key === 'es').value.current, resource: },
// })

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale)
console.log(data)

useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'ItemPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
//   name: `${data.value[0].title.find(l => l._key === locale.value).value}`,
//   image: `${data.value[0]?.hero?.image}`,
//   datePublished: new Date(2024, 10, 1)
// })

// tracking
const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data.value[0].title.find(l => l._key === locale._value).value}`,
    path: route.fullPath,
  })
};

// Detecta cambios en la ruta y envía evento `page`
onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);

onMounted(async () => {
  // Cargar contenido del cluster
  clusterContent.value = await useSanityData({
    query: clusterQuery,
    params: { pillarSlug, clusterSlug },
  });

  // Cargar índice general
  pillars.value = await useSanityData({
    query: `*[_type == "pillar"] {
      title,
      slug,
      clusters[]->{
        title,
        slug
      }
    }`,
  });

  // Generar Table of Contents
  const headings = document.querySelectorAll("h2, h3");
  const tocData = { h2: [] };
  headings.forEach((heading) => {
    if (heading.tagName === "H2") {
      tocData.h2.push({ id: heading.id, text: heading.innerText, children: [] });
    } else if (heading.tagName === "H3") {
      const parent = tocData.h2[tocData.h2.length - 1];
      if (parent) {
        parent.children.push({ id: heading.id, text: heading.innerText });
      }
    }
  });
  toc.value = tocData;
});
</script>


<style scoped>
.university-layout {
  display: flex;
}
.sidebar {
  width: 20%;
}
.main {
  width: 60%;
}
.table-of-contents {
  width: 20%;
}
</style>