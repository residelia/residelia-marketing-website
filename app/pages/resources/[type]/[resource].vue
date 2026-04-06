<template>
    <div>
        <SectionsProjectDetailsSection1 :data="data" />
        <SectionsProjectDetailsWhyItMatters
            v-if="data[0].whyItMatters"
            :why-it-matters="data[0].whyItMatters"
        />
        <SectionsProjectDetailsKeyTakeaways
            v-if="data[0].whatWillYouFind"
            :what-will-you-find="data[0].whatWillYouFind"
        />
        <SectionsProjectDetailsKeyPoints
            v-if="data[0].keyPoints"
            :key-points="data[0].keyPoints"
        />
        <SectionsProjectDetailsMainText
            :data="data[0].mainText.find((l: any) => l._key === locale)?.value.content"
            :components="serializers"
        />
        <!-- <PortableText :value="data[0].mainText.find((l: any) => l._key === locale)?.value.content" :components="serializers"/> -->


        <SectionsProjectsTestimonials v-if="data[0].testimonials" :testimonials="data[0].testimonials" />
        <SectionsProjectsCallToAction v-if="data[0].callToAction" :message="data[0].callToAction" />
        <SectionsProjectDetailsSection2 v-if="!data[0].callToAction" />
    </div>
</template>

<script setup>
import { useMainStore } from '../../../../stores/mainStore';
import { resourceQuery } from '../../../../queries/contentQueries'

import Code from '~/components/elements/Code.vue';
import Table from '~/components/elements/Table.vue'
import Callout from '~/components/elements/Callout.vue'
import BlockQuote from '~/components/elements/BlockQuote.vue'
import Link from '~/components/elements/Link.vue'
import InternalLink from '~/components/elements/InternalLink.vue'
import SeoImage from '~/components/elements/SeoImage.vue'
import VideoImage from '~/components/elements/VideoImage.vue'
import List from '~/components/elements/List.vue'
import NumberedList from '~/components/elements/NumberedList.vue'
import ListItem from '~/components/elements/ListItem.vue'
import { PortableText } from '@portabletext/vue';

definePageMeta({
    bodyClass: 'navbar-dark scheme-residelia',
    key: (route) => route.fullPath,
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

const serializers = {
    types: {
        code: Code,
        callout: Callout,
        seoImage: SeoImage,
        video: VideoImage,
        table: Table,
    },
    list: {
        bullet: List,
        number: NumberedList,
    },
    listItem: {
        bullet: ListItem,
        number: ListItem
    },
    block: {
        'blockquote': (_, { slots }) => h('blockquote', { class: 'blockquote w-300' }, slots.default?.()),
    },
    marks: {
        'externalLink': Link,
        'internalLink': InternalLink,
        'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
        'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
        'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
    }
}

useServerSeoMeta({
  title: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  ogTitle: `${data[0].title.find(l => l._key === locale.value).value} | RESIDELIA`,
  description: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data[0]?.heroImage?.url}`,
  twitterCard: 'summary_large_image',
})
defineWebPage({
  '@type': 'ItemPage',
  url: `${process.env.BASE_URL}/${route.fullPath}`,
  name: `${data[0].title.find(l => l._key === locale.value).value}`,
  image: `${data[0]?.heroImage?.url}`,
  datePublished: new Date(2024, 10, 1)
})

const { trackPage } = useTracking();
const trackPageView = () => {
  trackPage('Page View', {
    title: `${data[0].title.find(l => l._key === locale.value).value}`,
    path: route.fullPath,
  })
};

onMounted(trackPageView);
watch(() => route.fullPath, trackPageView);
</script>
