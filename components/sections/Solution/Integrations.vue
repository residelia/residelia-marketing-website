<template>
    <section v-if="integrations" class="pt-100 pb-100 ct-01 content-section division">
        <div class="container">
            <!-- SECTION CONTENT (ROW) -->
            <div class="row d-flex align-items-center">
                <!-- TEXT BLOCK -->
                <div class="col-md-6 order-last order-md-2">
                    <div class="txt-block left-column wow fadeInRight">
                        <!-- Section ID -->
                        <span class="section-id">{{ integrations?.upperHeading?.find(t => t._key === locale).value }}</span>
                        <!-- Title -->
                        <h2 class="s-36 w-700">{{ integrations?.heading.find(t => t._key === locale).value }}</h2>

                        <!-- List -->
                        <PortableText :value="integrations.content.find(t => t._key === locale).value.content" :components="serializers"/>
                    </div>
                </div>
                <!-- END TEXT BLOCK -->
                <!-- IMAGE BLOCK -->
                <div class="col-md-6 order-first order-md-2">
                    <div class="img-block right-column wow fadeInLeft">
                        <img class="img-fluid" :src="integrations.pic.url" :alt="integrations.image.alt" />
                    </div>
                </div>
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

const { locale } = useI18n()
const props = defineProps<{
    integrations: Object
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
    },
    marks: {
        'externalLink': Link,
        'internalLink': InternalLink,
        'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
        'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
        'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
    }
}
</script>