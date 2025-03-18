<template>
    <section v-if="problem" id="lnk-1" class="py-80 ws-wrapper content-section">
        <div class="container">
            <div class="bc-1-wrapper gr--primary-50 bg--fixed r-16">
                <div class="section-overlay">
                    <div class="row d-flex align-items-center">
                        <!-- TEXT BLOCK -->
                        <div class="col-md-6 order-last order-md-2">
                            <div class="txt-block left-column">
                                <!-- Title -->
                                <h2 class="s-36 w-700">{{ problem.heading.find(t => t._key === locale).value }}</h2>
                                <div class="txt-block right-column">
                                    <!-- TEXT BOX -->
                                    <div class="txt-box">
                                        <p>{{ problem?.subHeading?.find(t => t._key === locale).value}}</p>
                                        <PortableText :value="problem.content.find(t => t._key === locale).value.content" :components="serializers" />
                                    </div>
                                    <!-- END TEXT BOX -->
                                </div>
                            </div>
                        </div>
                        <!-- END TEXT BLOCK -->
                        <!-- IMAGE BLOCK -->
                        <div class="col-md-6 order-first order-md-2">
                            <div class="img-block right-column">
                                <img class="img-fluid" :src="problem.pic.url" :alt="problem.image.alt" />
                            </div>
                        </div>
                    </div>
                    <!-- End row -->
                </div>
                <!-- End section overlay -->
            </div>
            <!-- End content wrapper -->
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

const route = useRoute();
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