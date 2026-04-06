export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        const route = useRoute()
        const bodyClass = useBodyClass()
        const meta = route.meta.bodyClass as string | undefined
        if (meta !== undefined) {
            bodyClass.value = meta
        }
    })
})
