<template>
    <section v-if="post" id="single-post" class="inner-page-hero blog-page-section">
        <div class="container">
            <div class="row">
                <!-- SINGLE POST CONTENT -->
                <div class="col-md-9 col-12">
                    <div class="post-content">
                        <!--  SINGLE POST TITLE -->
                        <div class="single-post-title">
                            <NuxtLink :to="$localePath('/university')"><v-icon>mdi-school-outline</v-icon></NuxtLink>
                            <NuxtLink v-if="pillar" :to="$localePath(`${pillar.slug}`)" class="s-12"><span><v-icon>mdi-chevron-right</v-icon>{{ pillar.shortTitle }}</span></NuxtLink>  
                            <NuxtLink v-else :to="$localePath(`#`)" class="s-12"><span><v-icon>mdi-chevron-right</v-icon>{{ post[0].shortTitle }}</span></NuxtLink>  
                            <!-- Title -->
                            <h1 class="s-26 w-700 mt-2 p-0">{{ post[0].title }}</h1>
                            <!-- Post Meta -->
                            <div class="blog-post-meta color--grey-400">
                                <span class="s-12">{{ $t('updated')}} {{ $dayjs(post[0].updatedAt).locale(locale).fromNow() }}</span>
                            </div>
                            <div class="blog-post-meta color--grey-800 mt-10">
                                <span class="s-15 w-500">{{ post[0].subTitle }}</span>
                            </div>
                        </div>
                        <hr class="mt-2 mb-3"></hr>
                        <!-- END SINGLE POST TITLE -->
                        <!-- SINGLE POST IMAGE -->
                        <!-- <div class="blog-post-img py-50 text-center">
                            <img class="img-fluid r-16" :src="post[0].image?.url" alt="post.image.alt" />
                        </div> -->
                        <!-- SINGLE POST TEXT -->
                        <div class="single-post-txt">
                            <PortableText :value="post[0].body" :components="serializers"/>
                        </div>
                        <!-- END SINGLE POST TEXT -->
                    </div>
                </div>
                <div class="col-md-3 col-12 pl-md-10">
                    <div class="sidebar mt-50">
                        <div v-if="tocItems.length > 0 && !$vuetify.display.xs" class="sidebar-widget table-of-contents">
                            <h5 class="s-14 w-700 mb-2">{{ $t('tableOfContents') }}</h5>
                            <ul class="toc">
                                <li v-for="item in tocItems.filter(i => i.title && i.title.trim())" :key="item.id">
                                    <NuxtLink :to="'#' + item.id" class="s-13 w-500">{{ item.title }}</NuxtLink>
                                    <ul v-if="item.children.length">
                                        <li v-for="child in item.children" :key="child.id">
                                        <NuxtLink :to="'#' + child.id" class="s-13 w-500">{{ child.title }}</NuxtLink>
                                        <!-- <ul v-if="child.children.length">
                                            <li v-for="subChild in child.children" :key="subChild.id">
                                            <NuxtLink :to="'#' + subChild.id" class="s-13 w-500">{{ subChild.title }}</NuxtLink>
                                            </li>
                                        </ul> -->
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div v-if="pillar || post[0].clusters?.length > 0" class="sidebar-widget other-readings mt-10">
                            <h5 class="s-14 w-700 mt-5 mb-2">{{ $t('otherReadings') }}</h5>
                            <ul v-if="pillar" >
                                <!-- Mostrar el pilar asociado si está disponible -->
                                <li v-if="pillar">
                                <NuxtLink :to="pillar.slug" class="s-13 w-500">
                                    {{ pillar.shortTitle }}
                                </NuxtLink>
                                </li>
                                <!-- Mostrar los clusters asociados -->
                                <li v-for="(item, index) in otherReadings" :key="index">
                                <NuxtLink :to="item.slug.current" class="s-13 w-500">
                                    {{ item.shortTitle }}
                                </NuxtLink>
                                </li>
                            </ul>
                            <ul v-else>
                                <!-- Mostrar los clusters asociados -->
                                <li v-for="(item, index) in post[0].clusters" :key="index">
                                <NuxtLink :to="item.slug.current" class="s-13 w-500">
                                    {{ item.shortTitle }}
                                </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- END  SINGLE POST CONTENT -->
            </div>
            <!-- End row -->
        </div>
            <hr class="mt-100"></hr>
        <!-- End container -->
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Code from '../../elements/Code.vue'
import Formula from '../../elements/Formula.vue'
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
import Table from '~/components/elements/Table.vue';

const { locale } = useI18n()

const props = defineProps<{
  post?: Object
  otherReadings?: Object[]
  pillar?: Object
}>()

const serializers = {
    types: {
        code: Code,
        callout: Callout,
        seoImage: SeoImage,
        video: VideoImage,
        latex: Formula,
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
        'hidden': (_, { slots }) => h('blockquote', { style:"display: none;" }, slots.default?.()),
        h2: (props) => {
            const id = props.node._key; // Usa `_key` como id único
            const text = props.node.children.map((child) => child.text).join(""); // Combina el texto de los hijos
            return h(
                'h2',
                { id },
                text
            );
        },
        h3: (props) => {
            const id = props.node._key; // Usa `_key` como id único
            const text = props.node.children.map((child) => child.text).join(""); // Combina el texto de los hijos
            return h(
                'h3',
                { id },
                text
            );
        },
        h4: (props) => {
            const id = props.node._key; // Usa `_key` como id único
            const text = props.node.children.map((child) => child.text).join(""); // Combina el texto de los hijos
            return h(
                'h4',
                { id },
                text
            );
        },
    },
    marks: {
        'externalLink': Link,
        'internalLink': InternalLink,
        'strike-through': (_, { slots }) => h('s', { }, slots.default?.()),
        'keyboard': (_, { slots }) => h('kbd', { }, slots.default?.()),
        'highlight': (_, { slots }) => h('mark', { }, slots.default?.()),
    }
}

const tocItems = ref([]);

if (props.post[0]?.body) {
  const headers = props.post[0].body.filter((block) => block.style && block.style.startsWith('h'));

  const buildTree = (headers) => {
    const tree = [];
    const stack = [];

    headers.forEach((header) => {
      const node = {
        id: header._key, // Identificador único
        title: header.children.map((child) => child.text).join(''), // Texto del encabezado
        children: [], // Inicialmente vacío
      };

      const level = parseInt(header.style.replace('h', ''), 10); // Extrae el nivel (2, 3, 4, etc.)

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop(); // Saca del stack los niveles superiores
      }

      if (stack.length === 0) {
        tree.push(node); // Nodo raíz
      } else {
        stack[stack.length - 1].node.children.push(node); // Añade como hijo
      }

      stack.push({ level, node });
    });

    return tree;
  };

  tocItems.value = buildTree(headers);
}
console.log(tocItems.value)

// Manejar clics en el ToC
const handleTocClick = (active) => {
  const selected = tocItems.value.find((item) => item.id === active[0]);
  if (selected) {
    const element = document.getElementById(selected.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

</script>

<style>
.single-post-txt h2 {
    margin-top: 3rem !important;
    font-size: 1.5rem !important;
    font-weight: 500 !important;
    letter-spacing: 0.001rem !important;
    margin-bottom: 2rem;
}
.single-post-txt h3 {
    margin-top: 1.75rem !important;
    font-size: 1.2rem !important;
    font-weight: 400 !important;
    margin-bottom: 2rem;
}
.single-post-txt h4 {
    margin-top: 1.75rem !important;
    font-size: 1.075rem !important;
    font-weight: 300 !important;
    margin-bottom: 2rem;
}
.single-post-txt p {
    font-size: .8rem !important;
}

/* Estilos para la sección otherReadings */
.sidebar-widget.other-readings ul {
  list-style: none; /* Elimina los bullets */
  padding-top: 0.5rem;
  margin: 0;
}

.sidebar-widget.other-readings ul li {
  margin-bottom: 1rem; /* Espaciado entre elementos */
  line-height: 1rem !important; /* Ajusta el line-height */
  display: flex;
  align-items: center; /* Alinea el texto y la flecha */
}

.sidebar-widget.other-readings ul li a {
  color: #333; /* Color del texto */
  line-height: 1rem; /* Ajusta el line-height */

  text-decoration: none;
  flex-grow: 1; /* Ocupa todo el espacio disponible */
}

.sidebar-widget.other-readings ul li a:hover {
  text-decoration: underline; /* Subrayado al pasar el cursor */
}

.sidebar-widget.other-readings ul li::after {
  content: '→'; /* Flecha al final */
  margin-left: 0.5rem; /* Espaciado entre el texto y la flecha */
  color: #333; /* Color de la flecha */
}

.sidebar-widget.table-of-contents ul li {
    list-style: square;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
}
.sidebar-widget.table-of-contents ul li ul li{
    list-style: circle;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;
}
.sidebar-widget.table-of-contents ul li a {
  text-decoration: none;
}
.sidebar-widget.table-of-contents ul li a:hover {
  color: black;
}
</style>