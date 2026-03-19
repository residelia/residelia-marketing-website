import { defineStore } from 'pinia'
import { postsQuery, singlePostQuery } from "../queries/contentQueries"

export const useBlogStore = defineStore('blog', {
  state: () => ({
    loading: ref(false),
    error: ref(false),
    total: ref(0),
    limit: ref(3),
    current: ref(1),
    posts: [],
    shownPosts: ref([]),
  }),
  getters: {
    allPostsSortedByDate: (state) => {
      return state.posts.sort((a, b) => {
        const dayjs = useDayjs()
        return dayjs(a.publishedDate).isBefore(dayjs(b.publishedDate)) ? 1 : -1
      })
    },
  },
  actions: {
    updatePosts() {
      this.loading = true
      // while (this.posts.length > 0) this.posts.pop(); // clearing the array
      // this.fetchPosts()

      const start = (this.current - 1) * this.limit
      const end = start + this.limit

      this.shownPosts = this.posts.slice(start, end)

      this.loading = false
    },
    async fetchPosts() {
      const data = await useSanityData({
        query: postsQuery,
        params: { language: useNuxtApp().$i18n.locale.value.slice(0, 2) },
      })
      this.posts = data
    },
    async fetchPost(route) {

      return this.posts.filter(p => p.slug === route)[0]

      // const { data, refresh } = await useSanityQuery(singlePostQuery, { slug: route })
      // return data.value[0]
    }
  }
})
