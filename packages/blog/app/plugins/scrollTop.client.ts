export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:loading:end', () => {
        if (process.client) {
            const router = useRouter();
            router.afterEach((to, from) => {
                console.log('Cambio de ruta detectado:', from.fullPath, '->', to.fullPath);
                if (from.fullPath === to.fullPath) return
                // Aquí puedes ejecutar la lógica que necesites al cambiar de ruta.
                document.getElementById("mobile-menu")?.classList.remove("scroll");
                window.scrollTo({
                    top: -100,
                    behavior: "smooth"
                });
                document.body.scrollTo({
                    top: -100,
                    behavior: "smooth"
                });
            });
        }
    })
})
