<template>
    <div v-if="mission" id="about-3" class="pt-100 about-section division">
        <div class="container">
            <div class="row">
                <!-- ABOUT-3 TEXT -->
                <div v-for="card,index in mission" class="col-md-6">
                    <div :id="`a3-${index}`" class="txt-block">
                        <!-- Title -->
                        <h5 class="s-24 w-700 mb-20">{{ card.heading.find(t => t._key === locale).value }}</h5>
                        <!-- Text -->
                        <PortableText :value="card.content.find(t => t._key === locale).value.content" :components="serializers"/>
                    </div>
                </div>
                <!-- END ABOUT-3 TEXT -->
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </div>
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
import { PortableText } from '@portabletext/vue';

const route = useRoute();
const { locale } = useI18n()
const props = defineProps<{
    mission: Array
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

</script>