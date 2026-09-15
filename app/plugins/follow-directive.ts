export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('follow', (el: Element) => {
    // Vue puede invocar el hook de la directiva con un `el` inválido
    // (no Element) durante la reconciliación de un hydration mismatch.
    // Sin esta guarda, eso lanza una excepción sin capturar que tira
    // toda la app y hace que Nuxt muestre la página de error 404.
    if (!(el instanceof Element)) return

    // Si el elemento no tiene atributo rel, le añadimos rel="follow"
    if (!el.getAttribute('rel')) {
      el.setAttribute('rel', 'follow')
    }
  })
})
