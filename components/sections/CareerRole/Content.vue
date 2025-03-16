<template>
    <section id="role-page" class="pb-80 inner-page-hero division">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <!-- INNER PAGE TITLE -->
                    <div class="inner-page-title">
                        <span>{{ job?.department.name}}</span>
                        <h2 class="s-52 w-700">{{ job.name.find(t => t._key === locale).value }}</h2>
                        <p class="p-lg">{{ job.location }} / {{ job.mode }}</p>
                    </div>
                    <!-- TEXT BLOCK -->
                    <div class="txt-block role-info">
                        <!-- JOB DESCRIPTION -->
                        <PortableText :value="job.jobDescription" :components="serializers"/>

                        <!-- Line -->
                        <hr />
                        <!-- Title -->
                        <div v-for="benefit in data">
                            <!-- WORK BENEFITS (BENEFIT SECTION) -->
                            <h5 class="s-24 w-700">{{ benefit.heading.find(t => t._key === locale).value }}</h5>

                            <PortableText :value="benefit.content" :components="serializers"/>
                            <div v-if="benefit.benefitsGroup" class="cbox-6-wrapper bg--white-400 r-16">
                                <div class="row align-items-center row-cols-1 row-cols-md-2">
                                    <!-- CONTENT BOX #1 -->
                                    <div v-for="bnf in benefit.benefitsGroup" class="col">
                                        <div id="cb-6-1" class="cbox-6">
                                            <!-- Title -->
                                            <h6 class="s-20 w-700">{{ bnf.heading.find(t => t._key === locale).value }}</h6>
                                            <!-- Text -->
                                            <PortableText :value="bnf.content.find(t => t._key === locale)?.value.content" :components="serializers"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                        </div>
                        <!-- Button -->
                        <NuxtLink :to="localePath('contact')" class="btn r-04 btn--theme hover--theme">Apply to this job!</NuxtLink>
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
import { PortableText } from '@portabletext/vue';
import { jobBenefitsQuery } from '../../../queries/helperQueries'


const route = useRoute();
const {locale} = useI18n()
const props = defineProps<{
    job: Object
}>();

const data = await useSanityData({
    query: jobBenefitsQuery,
})

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale)
console.log(data)

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
