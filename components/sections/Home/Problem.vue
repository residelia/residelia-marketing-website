<template>
    <section v-if="problem" class="bg--surface-100 py-100 ct-02 content-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-36 w-700" v-html="balanceString(problem.heading.find(t => t._key === locale).value,5)"></h2>
                        <!-- Text -->
                        <p class="s-20 color--grey">{{ problem?.subHeading?.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
            <!-- SECTION CONTENT (ROW) -->
            <div class="row d-flex align-items-center">
                <!-- IMAGE BLOCK -->
                <div class="col-md-6">
                    <div class="img-block left-column">
                        <img class="img-fluid" :src="problem.pic.url" :alt="problem.image.alt" />

                    </div>
                </div>
                <!-- TEXT BLOCK -->
                <div class="col-md-6">
                    <div class="txt-block right-column">
                        <!-- TEXT BOX -->
                        <div class="txt-box">
                            <PortableText :value="problem.content.find(t => t._key === locale).value.content" :components="serializers" />
                        </div>
                        <!-- END TEXT BOX -->
                        <!-- Link -->
                        <div v-for="button in problem.buttons" class="txt-block-tra-link mt-25">
                            <NuxtLink
                                :to="localePath(`${button.button.link.slug.find(t => t._key === locale).value.current}${button.button.queryString ? button.button.queryString : ''}`)"
                                class="tra-link ico-20 color--theme"
                                @click="handleClick(button.button.id,'Problem CTA')"
                                >{{ button.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }} <span class="flaticon-next"></span></NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- END TEXT BLOCK -->
            </div>
            <!-- END SECTION CONTENT (ROW) -->
        </div>
        <!-- End container -->
    </section>
</template>

<script setup lang="ts">
import Code from '../../elements/Code.vue'
import Callout from '../../elements/Callout.vue'
import BlockQuote from '../../elements/BlockQuote.vue'
import Link from '../../elements/Link.vue'
import InternalLink from '../../elements/InternalLink.vue'
import SeoImage from '../../elements/SeoImage.vue'
import VideoImage from '../../elements/VideoImage.vue'
import List from '../../elements/List.vue'
import NumberedList from '../../elements/NumberedList.vue'
import ListItem from '../../elements/ListItem.vue'
import ListItemPage from '../../elements/ListItemPage.vue'
import { PortableText } from '@portabletext/vue';

const { locale } = useI18n();
const props = defineProps<{
  problem: Object;
}>();
const serializers = {
    types: {
        code: Code,
        callout: Callout,
        seoImage: SeoImage,
        video: VideoImage
    },
    list: {
        bullet: List,
        number: NumberedList,
    },
    listItem: {
        bullet: ListItemPage,
        number: ListItem
    },
    block: {
        'blockquote': (_, { slots }) => h('blockquote', { class: 'blockquote w-300' }, slots.default?.()),
        'h5': (_, { slots }) => h('h5', { class: 's-24 w-700' }, slots.default?.()),

    },
    marks: {
        'externalLink': Link,
        'internalLink': InternalLink,
        'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
        'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
        'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
    }
}

const route = useRoute()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
}
</script>