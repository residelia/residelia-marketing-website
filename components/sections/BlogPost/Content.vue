<template>
    <section v-if="post" id="single-post" class="pb-90 inner-page-hero blog-page-section">
        <div class="container">
            <div class="row justify-content-center">
                <!-- SINGLE POST CONTENT -->
                <div class="col-xl-10">
                    <div class="post-content">
                        <!--  SINGLE POST TITLE -->
                        <div class="single-post-title">
                            <NuxtLink :to="localePath('/blog')" class="s-12"><span><v-icon>mdi-chevron-left</v-icon>{{ $t('backToBlog') }}</span></NuxtLink>  
                            <!-- Post Tag -->
                            <span class="post-tag color--green-400 mt-4 mb-2">{{ post[0].category?.name.find(l => l._key === locale).value }}</span>
                            <!-- Title -->
                            <h2 class="s-46 w-700 p-0">{{ post[0].title }}</h2>
                            <!-- Post Meta -->
                            <div class="blog-post-meta mt-3 color--grey-400">
                                <ul class="post-meta-list ico-10">
                                    <li><p class="p-xs s-14 w-500">{{ post[0].author?.name }}</p></li>
                                    <li class="meta-list-divider">
                                        <p><span class="flaticon-minus"></span></p>
                                    </li>
                                    <li><p class="p-md">{{ $dayjs(post[0].publishedDate).format("MMMM D, YYYY") }}</p></li>
                                </ul>
                            </div>
                        </div>
                        <!-- END SINGLE POST TITLE -->
                        <!-- SINGLE POST IMAGE -->
                        <div class="blog-post-img py-50 text-center">
                            <img class="img-fluid r-16" :src="post[0].image?.url" alt="post.image.alt" />
                        </div>
                        <!-- SINGLE POST TEXT -->
                        <div class="single-post-txt">
                            <PortableText :value="post[0].body" :components="serializers"/>
                        </div>
                        <!-- END SINGLE POST TEXT -->
                        <!-- SINGLE POST SHARE LINKS -->
                        <div class="row">
                            <div class="col post-share-list">
                                <ul class="share-social-icons ico-20 text-center clearfix">
                                    <li>
                                        <a href="#" class="share-ico"><span class="flaticon-twitter"></span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="share-ico"><span class="flaticon-facebook"></span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="share-ico"><span class="flaticon-bookmark"></span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- END SINGLE POST SHARE -->
                        <!-- POST AUTHOR -->
                        <div class="post-author py-100 x-border">
                            <!-- Avatar -->
                            <div class="post-author-avatar">
                                <img :src="post[0].author?.picture.url" alt="author-avatar" />
                            </div>
                            <!-- Text -->
                            <div class="post-author-txt">
                                <!-- Title -->
                                <h5 class="s-24 w-700">{{ post[0].author?.name }}</h5>
                                <!-- Text -->
                                <p><PortableText :value="post[0].author?.bio" :serializers="serializers" /></p>
                                <!-- Follow Button -->
                                <!-- <div class="author-follow-btn r-04"><a href="#">Follow</a></div> -->
                            </div>
                        </div>
                        <!-- END ABOUT POST AUTHOR -->
                    </div>
                </div>
                <!-- END  SINGLE POST CONTENT -->
            </div>
            <!-- End row -->
        </div>
        <!-- End container -->
    </section>
</template>

<script lang="ts" setup>
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

const { locale } = useI18n()
const localePath = useLocalePath();

defineProps<{
  post?: Object
}>()

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