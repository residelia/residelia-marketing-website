<template>
    <section v-if="hero" id="about-2" class="rel inner-page-hero about-section division">
        <!-- ABOUT-2 TITLE -->
        <div class="container">
            <div class="row">
                <div class="col-md-11 col-lg-10 col-xl-9">
                    <div class="about-2-title mb-60">
                        <!-- Title -->
                        <h2 class="s-52 w-700 mb-30">{{ hero.heading.find(t => t._key === locale).value }}</h2>
                        <!-- Text -->
                        <p class="mb-0">{{ hero.subHeading.find(t => t._key === locale).value }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- END ABOUT-2 TITLE -->
        <!-- ABOUT-2 IMAGES -->
        <div class="container-fluid">
            <div class="row">
                <!-- IMAGES-1 -->
                <div class="col-md-5">
                    <div class="text-end">
                        <!-- IMAGE-1 -->
                        <div class="about-2-img a-2-1 r-12">
                            <img class="img-fluid" src="/assets/images/about-image-5.jpg" alt="about-image" />
                        </div>
                        <!-- IMAGE-2 -->
                        <div class="about-2-img a-2-2 r-12">
                            <img class="img-fluid" src="/assets/images/about-image-6.jpg" alt="about-image" />
                        </div>
                    </div>
                </div>
                <!-- END IMAGES-1 -->
                <!-- IMAGES-2 -->
                <div class="col-md-7">
                    <!-- IMAGE-3 -->
                    <div class="about-2-img a-2-3 r-12">
                        <img class="img-fluid" src="/assets/images/about-image-1.jpg" alt="about-image" />
                    </div>
                    <div class="row">
                        <!-- TEXT -->
                        <div class="col-md-7 col-lg-6">
                            <div class="a2-txt bg--black-400 pattern-01 bg--fixed color--white r-12">
                                <!-- Icon -->
                                <div class="a2-txt-quote ico-40 o-20">
                                    <span class="flaticon-quote"></span>
                                </div>
                                <!-- Text -->
                                <PortableText :value="hero.quote.quote.find(t => t._key === locale).value.content" :components="serializers"/>

                                <!-- <p>{{ hero.quote.quote.find(t => t._key === locale).value }}</p> -->
                                <!-- Author -->
                                <p class="a2-txt-author">{{ hero.quote.author }} <span>{{ hero.quote.role.find(t => t._key === locale).value }}</span></p>
                            </div>
                        </div>
                        <!-- IMAGE-4 -->
                        <div class="col-md-5 col-lg-6">
                            <div class="about-2-img a-2-4 r-12">
                                <img class="img-fluid" src="/assets/images/about-image-3.jpg" alt="about-image" />
                            </div>
                        </div>
                    </div>
                    <!-- End row -->
                </div>
                <!-- END IMAGES-2 -->
            </div>
            <!-- End row -->
        </div>
        <!-- END ABOUT-2 IMAGES -->
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

const route = useRoute();
const { locale } = useI18n()
const props = defineProps<{
    hero: Object
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
