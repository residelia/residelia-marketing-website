import { h } from 'vue'
import type { PortableTextVueComponents } from '@portabletext/vue'
import Code from '~/components/elements/Code.vue'
import Table from '~/components/elements/Table.vue'
import Callout from '~/components/elements/Callout.vue'
import Link from '~/components/elements/Link.vue'
import InternalLink from '~/components/elements/InternalLink.vue'
import SeoImage from '~/components/elements/SeoImage.vue'
import VideoImage from '~/components/elements/VideoImage.vue'
import List from '~/components/elements/List.vue'
import NumberedList from '~/components/elements/NumberedList.vue'
import ListItem from '~/components/elements/ListItem.vue'

// Serializers de Portable Text compartidos por todo el rich-text de recursos
// (MainText, WhyItMatters, …). Fuente única para evitar que se rendericen
// <ul>/<li> sin clase (que el reset global de main.css deja sin viñeta).
export default () => ({
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
        number: ListItem,
    },
    block: {
        blockquote: (_: any, { slots }: any) => h('blockquote', { class: 'blockquote w-300' }, slots.default?.()),
    },
    marks: {
        externalLink: Link,
        internalLink: InternalLink,
        'strike-through': (_: any, { slots }: any) => h('s', {}, slots.default?.()),
        keyboard: (_: any, { slots }: any) => h('kbd', {}, slots.default?.()),
        highlight: (_: any, { slots }: any) => h('mark', {}, slots.default?.()),
    },
}) as unknown as Partial<PortableTextVueComponents>
