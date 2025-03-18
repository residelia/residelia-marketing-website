<template>
    <section v-if="problem" id="lnk-1" class="py-100 ct-02 content-section division">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-36 w-700" v-html="balanceString(problem.heading.find(t => t._key === locale).value,6)"></h2>
                        <!-- Text -->
                        <p class="s-20 color--grey" v-html="balanceString(problem.subHeading.find(t => t._key === locale).value, 10)"></p>
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
import ListItemPage from '../../elements/ListItemPage.vue'
import ListItem from '../../elements/ListItem.vue'
import { PortableText } from '@portabletext/vue';

const { locale } = useI18n()
const props = defineProps<{
    problem: Object
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
</script>