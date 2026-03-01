<template>
    <div id="main-menu" class="wsmainfull menu clearfix">
        <div class="wsmainwp d-flex align-items-stretch justify-content-between">
            <div class="d-flex align-items-stretch">
                <!-- HEADER BLACK LOGO -->
                <div class="desktoplogo align-self-center">
                    <NuxtLink :to="$localePath('/')" class="logo-black" v-follow ><img src="/assets/images/residelia-logo-black.svg" alt="residelia-logo" /></NuxtLink>
                </div>
                <!-- HEADER WHITE LOGO -->
                <div class="desktoplogo">
                    <NuxtLink :to="$localePath('/')" class="logo-white" v-follow ><img src="/assets/images/residelia-logo-white.svg" alt="residelia-logo" /></NuxtLink>
                </div>
            </div>
            <!-- MAIN MENU -->
            <nav class="wsmenu clearfix">
                <ul class="wsmenu-list nav-theme">
                    <!-- PRODUCTOS -->
                    <li class="mg_link" aria-haspopup="true" :class="{ open: state.isOpen[0] }">
                        <span class="wsmenu-click" @click="toggle(0)"><i class="wsmenu-arrow"></i></span>
                        <NuxtLink to="#" class="h-link" v-follow >{{ mainStore.menu.products.title.find(l => l._key === locale).value }} <span class="wsarrow"></span></NuxtLink>
                        <div class="wsmegamenu w-75 clearfix">
                            <div class="container">
                                <div class="row">
                                <!-- MEGAMENU LINKS -->
                                <ul class="col-md-12 col-lg-6 link-list">
                                    <HeaderComplexMenuItem v-for="item in mainStore.menu.products?.menu?.slice(0,(mainStore.menu.products.menu.length/2))" name="product" :slug="item.link?.slug" :icon="item.libIcon" icon-color="black" :title="item.title" :description="item.description" :binder="item._id" :soon="item?.soon" :next="item.next"/>
                                </ul>
                                <ul class="col-md-12 col-lg-6 link-list">
                                    <HeaderComplexMenuItem v-for="item in mainStore.menu.products?.menu?.slice((mainStore.menu.products.menu.length/2),mainStore.menu.products.menu.length)" name="product" :slug="item.link?.slug" :icon="item.libIcon" icon-color="black" :title="item.title" :description="item.description" :binder="item._id" :soon="item?.soon" :next="item.next"/>
                                </ul>
                                </div>
                                <hr v-if="!$vuetify.display.xs" class="divider" />
                                <div v-if="!$vuetify.display.xs" class="row my-2">
                                    <div v-if="!$vuetify.display.xs" class="d-flex flex-row justify-content-between align-items-center">
                                        <h6 class="s-16 w-600 align-self-center pt-3">{{ mainStore.menu.products?.action.link.linkText.find(l => l._key === locale).value }}</h6>
                                        <NuxtLink class="btn r-04 btn--theme hover--theme last-link"  :to="$localePath(mainStore.menu.products?.action.link.slug.find(l => l._key === locale).value.current+(mainStore.menu.callToAction.queryString ? mainStore.menu.callToAction.queryString : '' ))" v-follow >{{ mainStore.menu.products?.action.link.actionText.find(l => l._key === locale).value }}</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- END PRODUCTOS -->

                    <!-- SOLUCIONES -->
                    <li aria-haspopup="true" class="mg_link" :class="{ open: state.isOpen[1] }">
                        <span class="wsmenu-click" @click="toggle(1)"><i class="wsmenu-arrow"></i></span>
                        <NuxtLink to="#" class="h-link" v-follow >{{ mainStore.menu.solutions.title.find(l => l._key === locale).value }} <span class="wsarrow"></span></NuxtLink>
                        <div class="wsmegamenu w-75 clearfix">
                        <div class="container">
                            <div class="row">
                            <!-- MEGAMENU LINKS -->
                            <ul class="col-md-12 col-lg-6 link-list">
                                <HeaderComplexMenuItem v-for="item in  mainStore.menu.solutions.menu?.slice(0,(mainStore.menu.solutions.menu.length/2))" name="solutions-segment" :slug="item.link?.slug" :icon="item.libIcon" icon-color="black" :title="item.title" :description="item.description" :binder="item._id" :soon="item?.soon" :next="item.next"/>
                            </ul>
                            <ul class="col-md-12 col-lg-6 link-list">
                                <HeaderComplexMenuItem v-for="item in mainStore.menu.solutions.menu?.slice((mainStore.menu.solutions.menu.length/2),mainStore.menu.solutions.menu.length)" name="solutions-segment" :slug="item.link?.slug" :icon="item.libIcon" icon-color="black" :title="item.title" :description="item.description" :binder="item._id" :soon="item?.soon" :next="item.next"/>
                             </ul>
                            </div>
                            <hr v-if="false" class="divider" />

                            <div v-if="false" class="row pt-4">
                            <ul class="col-md-12 col-lg-12 link-list">
                                <HeaderComplexMenuItem :slug="mainStore.menu.solutions.menuLink.link.slug" :icon="mainStore.menu.solutions.menuLink.libIcon" icon-color="black" :title="mainStore.menu.solutions.menuLink.title" :description="mainStore.menu.solutions.menuLink.description" />
                            </ul>
                            </div>
                        </div>
                        <!-- End container -->
                        </div>
                        <!-- End wsmegamenu -->
                    </li>
                    <!-- END SOLUCIONES -->

                    <!-- PRECIOS -->
                    <li class="nl-simple" aria-haspopup="true">
                        <template v-if="route.path.includes('/estate-leads')">
                            <NuxtLink to="https://estateleads.residelia.com/precios" class="h-link" target='_blank'  v-follow external>{{ mainStore.menu.pricing.title.find(l => l._key === locale).value }}</NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink :to="$localePath(mainStore.menu.pricing.menuLink.link.slug.find(l => l._key === locale).value.current)" class="h-link" v-follow >{{ mainStore.menu.pricing.title.find(l => l._key === locale).value }}</NuxtLink>
                        </template>
                    </li>

                    <!-- RECURSOS -->
                    <li v-if="mainStore.menu.resources.menu" aria-haspopup="true" class="mg_link" :class="{ open: state.isOpen[2] }" @mouseenter="mainStore.toggleMenu('resources')" @mouseleave="mainStore.toggleMenu('resources')">
                        <span class="wsmenu-click" @click="toggle(2)"><i class="wsmenu-arrow"></i></span>
                        <NuxtLink to="#" class="h-link" v-follow >{{ mainStore.menu.resources.title.find(l => l._key === locale).value }} <span class="wsarrow"></span></NuxtLink>
                        <div class="wsmegamenu w-75 clearfix">
                        <div class="container">
                            <div class="row">
                            <!-- Columna Aprende -->
                            <ul class="col-md-12 col-lg-6 link-list">
                                <li class="px-3 pt-2 pb-1">
                                    <span class="s-10 w-700 text-uppercase" style="color:#6C7A86;letter-spacing:0.06em;">{{ $t('learn') }}</span>
                                </li>
                                <HeaderComplexMenuItem
                                    v-for="item in [...(mainStore.menu.resources.menu ?? [])].filter(i => i.category === 'learn').sort((a, b) => (a.order ?? 0) - (b.order ?? 0))"
                                    :key="item._id"
                                    :slug="item.link.slug"
                                    :icon="item.libIcon"
                                    icon-color="black"
                                    :title="item.title"
                                    :description="item.description"
                                    :binder="item._id"
                                    :soon="item?.soon"
                                    :next="item.next"
                                />
                            </ul>
                            <!-- Columna Descubre -->
                            <ul class="col-md-12 col-lg-6 link-list">
                                <li class="px-3 pt-2 pb-1">
                                    <span class="s-10 w-700 text-uppercase" style="color:#6C7A86;letter-spacing:0.06em;">{{ $t('discover') }}</span>
                                </li>
                                <HeaderComplexMenuItem
                                    v-for="item in [...(mainStore.menu.resources.menu ?? [])].filter(i => i.category === 'discover').sort((a, b) => (a.order ?? 0) - (b.order ?? 0))"
                                    :key="item._id"
                                    :slug="item.link.slug"
                                    :icon="item.libIcon"
                                    icon-color="black"
                                    :title="item.title"
                                    :description="item.description"
                                    :binder="item._id"
                                    :soon="item?.soon"
                                    :next="item.next"
                                />
                            </ul>
                            </div>
                        </div>
                        <!-- End container -->
                        </div>
                        <!-- End wsmegamenu -->
                    </li>
                    <!-- END RECURSOS -->

                    <!-- DEMO BUTTON -->
                    <li class="nl-simple" aria-haspopup="true" @click="handleClick('Demo Request Started','header-demo-button')">
                        <NuxtLink
                        id="header-demo-button"
                        :to="$localePath(mainStore.menu.demoAction.slug.find(l => l._key === locale).value.current+mainStore.menu.demoAction.queryString)"
                        class="btn w-100 r-04 btn--theme-tertiary last-link"
                        v-follow 
                        >{{ mainStore.menu.demoAction.linkText.find(l => l._key === locale).value }}</NuxtLink
                        >
                    </li>
                    <!-- SIGN IN LINK -->
                    <li
                        class="nl-simple reg-fst-link mobile-last-link"
                        aria-haspopup="true"
                        @click="handleClick('Log-in Started', 'header-login-button')"
                    >
                        <template v-if="route.path.includes('/estate-leads')">
                            <NuxtLink to="https://estateleads.residelia.com/login" class="btn btn--theme-secondary hover--theme" target='_blank' external v-follow >{{ mainStore.menu.accessAction.linkText.find(l => l._key === locale).value }}</NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink :to="mainStore.menu.accessAction.slug" class="btn btn--theme-secondary hover--theme" v-if="mainStore.menu.accessAction.linkType === 'external' || mainStore.menu.accessAction.linkType === 'video' || mainStore.menu.accessAction.linkType === 'anchor'" :target="mainStore.menu.accessAction.newWindow ? '_blank' : '_self'" external v-follow >{{ mainStore.menu.accessAction.linkText.find(l => l._key === locale).value }}</NuxtLink>
                            <NuxtLink :to="$localePath(mainStore.menu.accessAction.slug)" class="h-link" v-else v-follow >{{ mainStore.menu.accessAction.linkText }}</NuxtLink>
                        </template>
                    </li>
                    <!-- SIGN UP LINK -->
                    <li class="nl-simple" aria-haspopup="true" @click="handleClick('Sign Up Started','header-signup-button')">
                        <template v-if="route.path.includes('/estate-leads')">
                            <NuxtLink to="https://estateleads.residelia.com/register" class="btn w-100 r-04 btn--theme hover--theme last-link" target='_blank' external v-follow >{{ mainStore.menu.callToAction.linkText.find(l => l._key === locale).value }}</NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink id="header-sign_up-button" :to="mainStore.menu.callToAction.slug" class="btn w-100 r-04 btn--theme hover--theme last-link" v-follow >{{ mainStore.menu.callToAction.linkText.find(l => l._key === locale).value }}</NuxtLink>
                        </template>
                    </li>
                </ul>
            </nav>
            <!-- END MAIN MENU -->
        </div>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue';
import { useMainStore } from '../../../stores/mainStore';


const state = reactive({isOpen: [false, false, false]});
const toggle = (index) => {
    state.isOpen[index] = !state.isOpen[index];
};

const mainStore = useMainStore()
const route = useRoute()
const { locale } = useI18n()
const { trackEvent } = useTracking()

function handleClick(eventName, buttonId) {
  const params = {
    clickedOnPage: route.path,
    buttonId
  }

  trackEvent(eventName, params)
};

function handleScroll() {
    const menu = document.getElementById("main-menu");
    const wsmenu = document.getElementById("mobile-menu");
    const header = document.getElementById("header");
    if (window.pageYOffset > 20) {
        menu.classList.add("scroll");
        wsmenu.classList.add("scroll");
        header.classList.add("scroll");
    } else {
        menu.classList.remove("scroll");
        wsmenu.classList.remove("scroll");
        header.classList.remove("scroll");
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

</script>
