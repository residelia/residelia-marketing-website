import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
    console.log('Redirection middleware triggered for path:', to.path);
    
    // Redirección temporal de /contactar a /estate-leads
    if (to.path === '/contactar' || to.path === '/es/contactar') {
      console.log('Redirecting to /estate-leads');
      return navigateTo('/estate-leads', { 
        redirectCode: 302 // Código 302 indica redirección temporal
      })
    }
})