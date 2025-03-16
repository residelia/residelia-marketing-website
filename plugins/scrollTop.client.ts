export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:loading:end', () => {
        document.getElementById("mobile-menu")?.classList.remove("scroll");
        window.scrollTo({
            top: -100,
            behavior: "smooth"
        });
        document.body.scrollTo({
            top: -100,
            behavior: "smooth"
        });
    })

})
