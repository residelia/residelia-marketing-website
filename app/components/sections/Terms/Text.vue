<template>
    <section v-if="content" id="terms-page" class="pb-80 inner-page-hero division">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <!-- INNER PAGE TITLE -->
                    <div class="inner-page-title">
                        <h1 class="s-52 w-700" v-html="balanceString(content.hero.heading.find(t => t._key === locale).value,5)"></h1>
                        <p class="p-lg">{{ content.hero.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                    <!-- TEXT BLOCK -->
                    <div class="txt-block legal-info">
                        <PortableText :value="content.content" :components="serializers"/>
                    </div>
                    <!-- END TEXT BLOCK -->
                </div>
            </div>
            <!-- End row -->
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
import Table from '../../elements/Table.vue'
import { PortableText } from '@portabletext/vue';

const { locale } = useI18n()
const props = defineProps<{
    content: Object
}>();
const serializers = {
    types: {
        code: Code,
        callout: Callout,
        seoImage: SeoImage,
        video: VideoImage,
        table: Table
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