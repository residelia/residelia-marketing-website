import { useMainStore } from "../stores/mainStore"

// usamos este route middleaware para comprobar si debemos mostrar la ReadingBar en la página (sólo en posts)
export default defineNuxtRouteMiddleware((to, from) => {
    const mainStore = useMainStore()
    mainStore.closeMobileMenu()
})