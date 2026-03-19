export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('follow', (el: Element) => {
    // Si el elemento no tiene atributo rel, le añadimos rel="follow"
    if (!el.getAttribute('rel')) {
      el.setAttribute('rel', 'follow')
    }
  })
})
