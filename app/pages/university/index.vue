<template>
  <div>
    <SectionsUniversityHero :hero="data[0].hero" :textColor="textColor" :color="headerColor"/>
    <!-- UNIVERSITY HERO -->
    <!-- <section id="university-hero" class="university-hero-section inner-page-hero">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-md-9 col-lg-7">
            <v-icon size="52" class="university-hero-icon mb-3">mdi-school-outline</v-icon>
            <h1 class="s-44 w-700 color--white">
              {{ data[0].title.find(l => l._key === locale.value)?.value }}
            </h1>
            <p class="p-xl mt-3 university-hero-sub">
              {{ data[0].hero?.subHeading?.find(t => t._key === locale.value)?.value }}
            </p>
          </div>
        </div>
      </div> -->
      <!-- Wave bottom -->
      <!-- <div class="wave-shape-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="#f8f9fa" fill-opacity="1"
            d="M0,48L80,56C160,64,320,80,480,80C640,80,800,64,960,56C1120,48,1280,56,1360,60L1440,64L1440,100L0,100Z"/>
        </svg>
      </div>
    </section> -->
    <!-- LMS LAYOUT -->
    <section class="pt-60 pb-60 blog-page-section">
      <div class="container">
        <div class="row">
          <!-- Outline sidebar — izquierda en desktop, abajo en mobile -->
          <div class="col-12 col-md-3 order-2 order-md-1 pr-md-4">
            <SectionsUniversityOutline :pillars="pillars" :currentSlug="''" />
          </div>
          <!-- Intro del curso — primero en DOM (mobile), derecha en desktop -->
          <div class="col-12 col-md-9 order-1 order-md-2">
            <div class="post-content">
              <!-- Pillar cards grid -->
              <div class="row g-3">
                <div v-for="(pillar, idx) in pillars" :key="pillar._id" class="col-12 col-md-6">
                  <NuxtLink
                    :to="pillar.slug"
                    class="university-pillar-card d-flex flex-column h-100 r-08 block-border p-3"
                  >
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <span class="pillar-card-num s-11 w-700">{{ idx + 1 }}</span>
                      <span class="s-14 w-600 color--dark">{{ pillar.shortTitle || pillar.title }}</span>
                    </div>
                    <p v-if="pillar.subTitle" class="s-13 color--grey-600 mb-2 flex-grow-1">{{ pillar.subTitle }}</p>
                    <div class="d-flex align-items-center gap-1 s-12 color--grey-400 mt-auto">
                      <v-icon size="13">mdi-file-document-outline</v-icon>
                      <span>{{ pillar.clusters?.length || 0 }} {{ $t('lessons') }}</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-100"/>
    </section>
  </div>
</template>

<script setup>
import { useBlogStore } from "../../../stores/blogStore";
import { pillarsQuery, pageQuery } from '../../../queries/contentQueries';

const route = useRoute();
const { locale } = useI18n()
const blogStore = useBlogStore()
const textColor = 'color--dark'

defineI18nRoute({
    paths: {
      en: '/university',
      es: '/university'
    }
})

const data = await useSanityData({
  query: pageQuery,
  params: {
    slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
    language: locale.value
  }
})
console.log(data)

const pillars = await useSanityData({
  query: pillarsQuery,
  params: {
    language: locale.value
  }
});

const clusters = pillars.flatMap(pillar => 
  (pillar.clusters || []).map(cluster => ({
    id: cluster._id,
    title: cluster.title,
    subTitle: cluster.subTitle,
    shortTitle: cluster.shortTitle,
    slug: cluster.slug.current,
    pillar: pillar.shortTitle, // Incluye el título del pilar al que pertenece el cluster
    updatedAt: cluster.updatedAt,
  }))
);

// console.log(
//   "%cStop!",
//   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
// );
// console.log(route)
// console.log(locale)
// console.log(data)
// console.log(pillars)
// console.log(clusters);

// SEO
const dateModified = new Date(data[0].updatedAt).toISOString();
const datePublished = new Date(data[0].createdAt).toISOString();
useHead({
  title: `${data[0].title.find(l => l._key === locale._value).value}`,
  description: `${data[0].description.find(l => l._key === locale._value).value}`,
  bodyAttrs: {
      class: "navbar-dark scheme-residelia"
  },
})
useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})

// Schema.org
defineWebPage({
  '@type': 'WebPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  image: `${data[0]?.hero?.image}`,
  hasPart: pillars.map((pillar) => ({
    '@type': 'Article',
    headline: pillar.title,
    description: pillar.description,
    url: `${process.env.BASE_URL}/university/${pillar.slug}`,
    image: pillar.image,
  })),
  datePublished,
  dateModified,
});

// tracking events
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>

<style scoped>
/* Hero */
.university-hero-section {
  position: relative;
  padding-bottom: 80px;
  background: linear-gradient(135deg, #1254c0 0%, #1680fb 55%, #3eb1ff 100%);
  overflow: hidden;
}
.university-hero-icon {
  color: rgba(255, 255, 255, 0.75);
}
.university-hero-sub {
  color: rgba(255, 255, 255, 0.88);
}
.university-hero-section .wave-shape-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
}
.university-hero-section .wave-shape-bottom svg {
  display: block;
  width: 100%;
}

/* Cards */
.university-pillar-card {
  color: inherit;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.university-pillar-card:hover {
  border-color: #48AAF1;
  box-shadow: 0 2px 8px rgba(23, 120, 251, 0.08);
  text-decoration: none;
}
.pillar-card-num {
  background: #EEF2F7;
  color: #4F575E;
  border-radius: 4px;
  min-width: 20px;
  text-align: center;
  padding: 1px 6px;
  flex-shrink: 0;
}
</style>