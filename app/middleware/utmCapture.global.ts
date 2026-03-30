export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const { captureFromQuery } = useUtm()
    captureFromQuery(to.query as Record<string, string>)
  }
})
