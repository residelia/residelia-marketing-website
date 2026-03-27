import { useMainStore } from "../../stores/mainStore";
import { useJobsStore } from "../../stores/jobsStore";

export default defineNuxtPlugin(async (nuxtApp) => {
	const mainStore = useMainStore()
	const jobsStore = useJobsStore()
	const route = useRoute()

	// fetch global page data on start
	await mainStore.fetchLocales()
	await mainStore.fetchNavigationContent()
	await mainStore.fetchFooterContent()
	await jobsStore.fetchJobs()

	// await mainStore.fetchSiteContent()

	// check if preview mode is active and set previewIsActive
	const preview = route.query.preview && route.query.preview === 'true'
	if (preview) {
		mainStore.previewIsActive = true
	}
});