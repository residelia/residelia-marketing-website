<template>
    <div>
        <!-- Hero section según layoutType -->
        <SectionsResourceHeroDownloadable v-if="layoutType === 'downloadable'" :data="data" />
        <SectionsResourceHeroHalfInteractive v-else-if="layoutType === 'halfInteractive'" :data="data" />
        <SectionsResourceHeroFullInteractive v-else-if="layoutType === 'fullInteractive'" :data="data" />

        <!-- Cómo usarlo (pasos HowTo) -->
        <SectionsProjectDetailsHowToSteps
            v-if="data[0].howToSteps?.length"
            :how-to-steps="data[0].howToSteps"
            :hero-image="data[0].heroImage"
            :hero-image-alt="data[0].heroImageAlt"
        />

        <!-- Why it matters (visible en todos los tipos de recurso) -->
        <SectionsProjectDetailsWhyItMatters
            v-if="data[0].whyItMatters?.heading?.length"
            :why-it-matters="data[0].whyItMatters"
        />

        <!-- Key points / beneficios (visible en todos los tipos de recurso) -->
        <SectionsProjectDetailsKeyPoints
            v-if="data[0].keyPoints?.points?.length"
            :key-points="data[0].keyPoints"
        />

        <!-- Secciones de contenido (sólo para descargables) -->
        <template v-if="layoutType === 'downloadable'">
            <SectionsProjectDetailsKeyTakeaways
                v-if="data[0].whatWillYouFind"
                :what-will-you-find="data[0].whatWillYouFind"
            />
            <SectionsProjectDetailsMainText
                v-if="data[0].mainText?.find((l: any) => l._key === locale)?.value.content"
                :data="data[0].mainText.find((l: any) => l._key === locale)?.value.content"
                :components="serializers"
            />
        </template>

        <!-- FAQ (SEO/GEO: FAQPage schema) -->
        <SectionsProjectDetailsFaq
            v-if="data[0].faq?.length"
            :faq="data[0].faq"
        />

        <SectionsProjectsTestimonials v-if="data[0].testimonials?.testimonials?.length" :testimonials="data[0].testimonials" />
        <SectionsProjectsCallToAction v-if="data[0].callToAction" :message="data[0].callToAction" />
        <SectionsProjectDetailsSection2 v-if="!data[0].callToAction" />
    </div>
</template>

<script setup>
import { useMainStore } from '../../../../stores/mainStore';
import { resourceQuery } from '../../../../queries/contentQueries'

definePageMeta({
    bodyClass: 'navbar-dark scheme-residelia',
    key: (route) => route.path,
})
defineI18nRoute({
    paths: {
      en: '/resources/[type]/[resource]',
      es: '/recursos/[type]/[resource]'
    }
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
    query: resourceQuery,
    params: {
        slug: route.path.startsWith(`/${locale.value}`) ? route.path.slice(`/${locale.value}`.length) || '/' : route.path,
        language: locale.value
    }
})

const serializers = useRichTextSerializers()

// Determina el layout del hero con fallback para recursos sin layoutType
const layoutType = computed(() => {
    const r = data[0]
    if (r.layoutType) return r.layoutType
    if (r.isFunctional && r.widgetLayout === 'fullScreen') return 'fullInteractive'
    if (r.isFunctional) return 'halfInteractive'
    return 'downloadable'
})

const resourceTitle = data[0].title.find(l => l._key === locale.value).value
const resourceDescription = data[0].description.find(l => l._key === locale.value).value

useServerSeoMeta({
  title: `${resourceTitle} | RESIDELIA`,
  ogTitle: `${resourceTitle} | RESIDELIA`,
  description: resourceDescription,
  ogDescription: resourceDescription,
  ogImage: `${data[0]?.heroImage?.url}`,
  twitterCard: 'summary_large_image',
})

defineWebPage({
  '@type': layoutType.value !== 'downloadable' ? 'WebPage' : 'ItemPage',
  url: `${process.env.BASE_URL}${route.fullPath}`,
  name: resourceTitle,
  image: `${data[0]?.heroImage?.url}`,
  datePublished: data[0].publishedAt,
  dateModified: data[0].updatedAt,
})

// WebApplication schema for interactive resources (calculators, widgets)
if (layoutType.value !== 'downloadable') {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: resourceTitle,
        description: resourceDescription,
        url: `${process.env.BASE_URL}${route.fullPath}`,
        applicationCategory: data[0].applicationCategory ?? 'WebApplication',
        inLanguage: locale.value,
        image: data[0]?.heroImage?.url,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        provider: { '@type': 'Organization', name: 'RESIDELIA' },
      })
    }]
  })
}

// FAQPage schema
if (data[0].faq?.length) {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data[0].faq.map(item => ({
          '@type': 'Question',
          name: item.question?.find(l => l._key === locale.value)?.value,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer?.find(l => l._key === locale.value)?.value,
          }
        }))
      })
    }]
  })
}

// HowTo schema
if (data[0].howToSteps?.length) {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: resourceTitle,
        step: data[0].howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name?.find(l => l._key === locale.value)?.value,
          text: s.text?.find(l => l._key === locale.value)?.value,
          ...(s.imageUrl ? { image: s.imageUrl } : {}),
        }))
      })
    }]
  })
}

// BreadcrumbList schema
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: data[0].type, item: `${process.env.BASE_URL}/${locale.value === 'es' ? 'recursos' : 'resources'}/${route.params.type}` },
        { '@type': 'ListItem', position: 3, name: resourceTitle },
      ]
    })
  }]
})

const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: resourceTitle,
    path: route.fullPath,
  })
};

onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>
