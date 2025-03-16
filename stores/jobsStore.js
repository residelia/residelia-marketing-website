import { defineStore } from 'pinia'
import { jobsQuery } from "../queries/contentQueries"


export const useJobsStore = defineStore('jobs', {
  state: () => ({
    loading: ref(false),
    error: ref(false),
    total: ref(0),
    limit: ref(3),
    current: ref(1),
    jobs: [],
    shownJobs: ref([]),
  }),
  actions: {
    updateJobs() {
      this.loading = true
      while (this.jobs.length > 0) this.jobs.pop(); // clearing the array
      this.fetchJobs()

      const start = (this.current - 1) * this.limit
      const end = start + this.limit

      this.shownJobs = this.jobs.slice(start, end)

      this.loading = false
    },
    async fetchJobs() {
      const data = await useSanityData({
        query: jobsQuery,
      })
      this.jobs = data?.value
    },
    async fetchJob(route) {

      return this.jobs.filter(p => p.slug === route)[0]
    }
  }
})
