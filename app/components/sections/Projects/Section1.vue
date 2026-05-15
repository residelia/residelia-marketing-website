<template>
    <section id="projects-1" class="inner-page-hero projects-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-80">
                        <!-- Title -->
                        <h2 class="s-52 w-700">{{ data[0]?.title?.find(l => l._key === locale)?.value }}</h2>
                        <!-- Text -->
                        <p class="s-21 color--grey">{{ data[0]?.description?.find(l => l._key === locale)?.value }}</p>
                    </div>
                </div>
            </div>

            <!-- RESOURCES GRID -->
            <div v-if="resources && resources.length > 0" class="projects-wrapper">
                <div class="row align-items-center row-cols-1 row-cols-md-2">
                    <div v-for="(resource, i) in paginatedResources" :key="i" class="col">
                        <div :id="`pt-1-${i + 1}`" class="project-details">
                            <!-- Title -->
                            <h5 class="s-24">{{ resource.title.find(l => l._key === locale)?.value }}</h5>
                            <!-- Image -->
                            <div class="project-preview r-10">
                                <div class="hover-overlay">
                                    <img
                                        v-if="resource.image?.url"
                                        class="img-fluid"
                                        :src="resource.image.url"
                                        :alt="resource.imageAlt || ''"
                                    />
                                    <div class="item-overlay"></div>
                                </div>
                                <div class="project-link ico-35 color--white">
                                    <NuxtLink :to="resourceLink(resource)" title=""><span class="flaticon-visibility"></span></NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PAGINATION -->
                <div v-if="totalPages > 1" class="row mt-60 justify-content-center">
                    <div class="col-auto">
                        <v-pagination
                            v-model="currentPage"
                            :length="totalPages"
                            :total-visible="5"
                            rounded="circle"
                        />
                    </div>
                </div>
            </div>
            <!-- END RESOURCES GRID -->

            <!-- COMING SOON: skeleton grid + overlay -->
            <div v-else class="projects-wrapper projects-wrapper--skeleton mb-100">
                <!-- Skeleton grid: misma estructura 2 columnas que el grid real -->
                <div class="row align-items-center row-cols-1 row-cols-md-2">
                    <div v-for="n in ($vuetify.display.xs ? 1: 2)" :key="n" class="col">
                        <div class="project-details">
                            <div class="skeleton-title skeleton-shimmer"></div>
                            <div class="project-preview r-10">
                                <div class="skeleton-image skeleton-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Coming soon overlay centrado sobre el skeleton -->
                <div class="coming-soon-overlay">
                    <div class="text-center">
                        <h4 class="s-30 w-700 mb-20">{{ $t('comingSoon') }}</h4>
                        <p class="s-18 color--grey">{{ $t('comingSoonDescription') }}</p>
                    </div>
                </div>
            </div>
            <!-- END COMING SOON -->

        </div>
        <!-- End container -->
    </section>
</template>

<script lang="js" setup>
import { ref, computed } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    resources: {
        type: Array,
        required: true
    }
})

const { locale } = useI18n()

const ITEMS_PER_PAGE = 6
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.resources.length / ITEMS_PER_PAGE))
const paginatedResources = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    return props.resources.slice(start, start + ITEMS_PER_PAGE)
})

function resourceLink(resource) {
    const slugEntry = resource.slug.find(s => s._key === locale.value)
    return slugEntry?.value?.current || '#'
}
</script>

<style scoped>
.projects-wrapper--skeleton {
    position: relative;
    user-select: none;
    pointer-events: none;
}

.skeleton-title {
    height: 22px;
    width: 55%;
    border-radius: 4px;
    margin-bottom: 14px;
}

.skeleton-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 10px;
}

.hover-overlay {
  aspect-ratio: 16 / 10;
}

.hover-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

@keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
}

.skeleton-shimmer {
    background: linear-gradient(90deg, #ececec 25%, #d8d8d8 50%, #ececec 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s ease-in-out infinite;
}

.coming-soon-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.93) 25%, rgba(255,255,255,0.55) 65%, rgba(255,255,255,0) 100%);
    z-index: 10;
}

@media (max-width: 767px) {
    .coming-soon-overlay {
        align-items: flex-start;
        padding-top: 100px;
    }
}
</style>
