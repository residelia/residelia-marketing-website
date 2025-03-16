<template>
  <template v-if="workflow" v-for="(step, index) in workflow.wfSteps">
    <section
      v-if="(index+1) % 2 !== 0"
      class="pt-100 ct-02 content-section division"
      :class="{ 'pb-100': index+1 >= workflow.wfSteps.length }"
    >
      <div class="container">
        <div class="row d-flex align-items-center">
          <!-- IMAGE BLOCK -->
          <div class="col-md-6">
            <div class="img-block left-column wow fadeInRight">
              <img
                class="img-fluid"
                :src="step.pic.url"
                :alt="step.image.alt"
              />
            </div>
          </div>
          <!-- TEXT BLOCK -->
          <div class="col-md-6">
            <div class="txt-block right-column wow fadeInLeft">
              <!-- Section ID -->
              <span class="section-id">{{step?.upperHeading?.find(t => t._key === locale).value}} <v-chip v-if="step.soon" class="ma-2 text-capitalize" color="primary" size="x-small" label>{{ $t('soon') }}</v-chip><v-chip v-if="step.next" class="ma-2 text-capitalize" color="primary" size="x-small" label>{{ $t('next') }}</v-chip></span>
              <!-- Title -->
              <h2 class="s-32 w-700">{{step.heading.find(t => t._key === locale).value}}</h2>
              <!-- Text -->
              <p class="s-20 color--grey">{{step?.subHeading?.find(t => t._key === locale).value}}</p>
              <PortableText :value="step.content.find(t => t._key === locale).value.content" :components="serializers"/>
              <!-- Call to Action -->
              <div v-for="action in step.cta" class="txt-block-tra-link mt-25">
                <NuxtLink
                  :to="localePath(`${action.link.slug.find(t => t._key === locale).value.current}${action.queryString ? action.queryString : ''}`)"
                  class="tra-link ico-20 color--theme"
                  @click="handleClick(action.button.id,`workflow-cta-step-${index+1}`)"
                  >{{ action.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }} <span class="flaticon-next"></span></NuxtLink>
              </div>
            </div>
          </div>
          <!-- END TEXT BLOCK -->
        </div>
        <!-- End row -->
      </div>
      <!-- End container -->
    </section>

    <section v-else id="lnk-3" class="pt-100 ct-01 content-section division" :class="{ 'pb-100': index+1 >= workflow.wfSteps.length }">
      <div class="container">
        <!-- SECTION CONTENT (ROW) -->
        <div class="row d-flex align-items-center">
          <!-- TEXT BLOCK -->
          <div class="col-md-6 order-last order-md-2">
            <div class="txt-block left-column wow fadeInRight">
              <!-- Section ID -->
              <span class="section-id">{{step?.upperHeading?.find(t => t._key === locale).value}} <v-chip v-if="step.soon" class="ma-2 text-capitalize" color="primary" size="x-small" label>{{ $t('soon') }}</v-chip><v-chip v-if="step.next" class="ma-2 text-capitalize" color="primary" size="x-small" label>{{ $t('next') }}</v-chip></span>
              <!-- Title -->
              <h2 class="s-32 w-700">{{step.heading.find(t => t._key === locale).value}}</h2>
              <!-- List -->
              <p class="s-20 color--grey">{{step?.subHeading?.find(t => t._key === locale).value}}</p>
              <PortableText :value="step.content.find(t => t._key === locale).value.content" :components="serializers"/>
              <!-- Call to Action -->
              <div v-for="action in step.cta" class="txt-block-tra-link mt-25">
                <NuxtLink
                  :to="localePath(`${action.link.slug.find(t => t._key === locale).value.current}${action.queryString ? action.queryString : ''}`)"
                  class="tra-link ico-20 color--theme"
                  @click="handleClick(action.button.id,`workflow-cta-step-${index+1}`)"
                  >{{ action.button.linkText.filter(l => l._key === locale.slice(0,2))[0]?.value }} <span class="flaticon-next"></span></NuxtLink>
              </div>
            </div>
          </div>
          <!-- END TEXT BLOCK -->
          <!-- IMAGE BLOCK -->
          <div class="col-md-6 order-first order-md-2">
            <div class="img-block right-column wow fadeInLeft">
              <img
                class="img-fluid"
                :src="step.pic.url"
                :alt="step.image.alt"
              />
            </div>
          </div>
        </div>
        <!-- END SECTION CONTENT (ROW) -->
      </div>
      <!-- End container -->
    </section>
  </template>
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
  workflow: Object;
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
