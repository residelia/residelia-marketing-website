<template>
    <section class="single-project">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="project-description">

                        <!-- MAIN TEXT (PortableText — para tips es el contenido principal) -->
                        <div v-if="data" class="project-txt txt-block mt-30 pb-60">
                            <PortableText :value="data" :components="serializers"/>
                        </div>
                        <!-- END MAIN TEXT -->

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Code from '~/components/elements/Code.vue'
import Callout from '~/components/elements/Callout.vue'
import SeoImage from '~/components/elements/SeoImage.vue'
import VideoImage from '~/components/elements/VideoImage.vue'
import Link from '~/components/elements/Link.vue'
import InternalLink from '~/components/elements/InternalLink.vue'
import List from '~/components/elements/List.vue'
import NumberedList from '~/components/elements/NumberedList.vue'
import ListItem from '~/components/elements/ListItem.vue'
import Table from '~/components/elements/Table.vue'
import { PortableText } from '@portabletext/vue'

const props = defineProps<{ data: Array<any> }>()

const { locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

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
</script>
