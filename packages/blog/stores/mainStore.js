import { defineStore } from "pinia";
import { siteQuery, homeQuery, navQuery, footQuery, postsQuery, localesQuery } from "../queries/contentQueries"

export const useMainStore = defineStore('main', {
	state: () => ({
		// return {
		locale: {
			supported: [],
			current: '',
		},
		previewIsActive: false,
		counter: 0,
		siteOptions: {},
		siteNav: {},
		readingBar: false,
		footer: {},
		home: {},
		slugs: {},
		pages: [],
		posts: [],
		window: {
			width: 0,
			height: 0,
			desktopWidth: 1440,
		},
		menu: {
			products: {
			},
			solutions: {
			},
			pricing: {
			},
			resources: {
			},
			company: {
			},
			demoAction: {
			},
			accessAction: {
			},
			callToAction: {
			},
			mobile: {
				open: false,
			}
		},
		messages: {
			notFound: 'Page not found.',
		},
		cookies: {
			show: true
		}
		// }
	}),
	getters: {
		double: (state) => state.counter * 2,
		defaultLocale: (state) => state.locale.supported.filter(lang => lang.default)[0],
		fallbackLocale: (state) => state.locale.supported.filter(lang => lang.fallback)[0],
		locales: (state) => state.locale.supported,
		currentLocale: (state) => state.locale.supported.filter(lang => lang.localeCode === state.locale.current)[0]
	},
	actions: {
		increment() {
			this.counter++
		},
		async fetchLocales() {
			const nuxtApp = useNuxtApp()
			const data = await useSanityData({query: localesQuery})
			this.locale.supported = data
			this.locale.current = nuxtApp.$i18n.locale.value.slice(0, 2)
		},
		async fetchNavigationContent() {
			const data = await useSanityData({query: navQuery})
			// console.log("Site Navigation Data", data[0])
			this.siteNav = data[0]
			// console.log("Site Navigation", this.siteNav)
			// this.menu.products['info'] = this.siteNav.menuesGroup[0]
			// this.menu.solutions['info'] = this.siteNav.menuesGroup[1]
			// this.menu.pricing['info'] = this.siteNav.menuesGroup[2]
			// this.menu.resources['info'] = this.siteNav.menuesGroup[3]

			this.menu.products = { open: false, ...this.siteNav.menuesGroup[0] }
			this.menu.solutions = { open: false, ...this.siteNav.menuesGroup[1] }
			this.menu.pricing = { open: false, ...this.siteNav.menuesGroup[2] }
			this.menu.blog = { open: false, ...this.siteNav.menuesGroup[3] }
			this.menu.resources = { open: false, ...this.siteNav.menuesGroup[4] }
			this.menu.demoAction = { open: false, ...this.siteNav.demoAction }
			this.menu.accessAction = { open: false, ...this.siteNav.accessAction }
			this.menu.callToAction = { open: false, ...this.siteNav.callToAction }
		},
		async fetchFooterContent() {
			const data = await useSanityData({ query: footQuery })
			this.footer = data[0]
		},
		async fetchSiteContent() {
			const data = await useSanityData({ query: siteQuery })
			console.log("Site Data", data)
			this.home = data[0]
		},
		async fetchSitePosts() {
			const data = await useSanityQuery({ query: allPostsQuery })
			console.log("Site Posts Data", data)
			this.posts.push(data?.value[0])
		},
		setLocale(locale) {
			const nuxtApp = useNuxtApp()
			this.locale.current = locale
			nuxtApp.$i18n.setLocale(locale)
		},
		showReadingBar() {
			this.readingBar = true
		},
		hideReadingBar() {
			this.readingBar = false
		},
		closeMenu(menu) {
			this.menu[menu].open = false;
		},
		openMenu(menu) {
			this.menu[menu].open = true;
		},
		toggleMenu(menu) {
			this.menu[menu].open = !this.menu[menu].open;
		},
		toggleMobileMenu() {
			this.menu.mobile.open = !this.menu.mobile.open;
			// document.body.classList.toggle("wsactive");
		},
		closeMobileMenu() {
			this.menu.mobile.open = false;
		},
		showCookieLauncher() {
			this.cookies.show = true;
		},
		hideCookieLauncher() {
			this.cookies.show = false;
		},
	},
})
