import { useMainStore } from "../../stores/mainStore";
import { useBlogStore } from "../../stores/blogStore";

export default defineNuxtPlugin(async (nuxtApp) => {
	const mainStore = useMainStore()
	const blogStore = useBlogStore()
	const route = useRoute()

	// fetch global page data on start
	await mainStore.fetchLocales()
	await mainStore.fetchNavigationContent()
	await mainStore.fetchFooterContent()
	await blogStore.fetchPosts()

	// check if preview mode is active and set previewIsActive
	const preview = route.query.preview && route.query.preview === 'true'
	if (preview) {
		mainStore.previewIsActive = true
	}
});