import { defineStore } from 'pinia'
import { postsQuery, singlePostQuery } from "../queries/contentQueries"

export const useBlogStore = defineStore('blog', {
  state: () => ({
    // posts: [
    //   {
    //     _id: 0,
    //     title: "Congue magna tempor and ipsum Martex sapien turpis laoreet augue",
    //     excerpt: "Aliqum mullam blandit vitae and tempor sapien and donec lipsum gravida porta undo velna dolor libero a risus aliquet tempus posuere a tempor velna tempus posuere dolor",
    //     image: "/assets/images/blog/post-12-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Martex Team",
    //     publishedDate: new Date("Apr 28, 2023"),
    //     category: "Social Media Marketing"
    //   },
    //   {
    //     _id: 1,
    //     title: "Aliqum mullam porta blandit: lacus and sapien gravida",
    //     excerpt: "Egestas luctus vitae augue and ipsum ultrice quisque in cursus lacus feugiat congue diam ultrice laoreet sagittis",
    //     image: "/assets/images/blog/post-1-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Martex Team",
    //     publishedDate: new Date("Apr 23, 2023"),
    //     category: "Product News"
    //   },
    //   {
    //     _id: 2,
    //     title: "Porttitor cursus fusce neque CEO egestas cursus magna sapien and suscipit ipsum",
    //     excerpt: "Aliqum mullam ipsum vitae and blandit vitae tempor sapien and donec lipsum",
    //     image: "/assets/images/blog/post-2-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Miranda Green",
    //     publishedDate: new Date("Apr 09, 2023"),
    //     category: "Community",
    //   },
    //   {
    //     _id: 3,
    //     slug: "/blog/single-post",
    //     title: "Cubilia laoreet ipsum augue eget egestas Martex magna",
    //     excerpt: "Luctus vitae egestas augue and ipsum ultrice quisque in cursus lacus feugiat egets congue ultrice sagittis laoreet",
    //     image: "/assets/images/blog/post-3-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Helen J.",
    //     publishedDate: new Date("Apr 01, 2023"),
    //     category: "Freelancer Tips",
    //   },
    // ],
    loading: ref(false),
    error: ref(false),
    total: ref(0),
    limit: ref(3),
    current: ref(1),
    posts: [],
    // posts: [
    //   {
    //     _id: 0,
    //     slug: "/blog/single-post",
    //     title: "Phasellus blandit justo undo aliquam diam vitae molestie",
    //     excerpt: "Egestas luctus vitae augue and ipsum ultrice quisque in cursus lacus feugiat congue diam ultrice laoreet sagittis",
    //     image: "/assets/images/blog/post-7-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Miranda Green",
    //     publishedDate: new Date("Feb 02, 2023"),
    //     category: "Product News",
    //   },
    //   {
    //     _id: 1,
    //     slug: "/blog/single-post",
    //     title: "Porttitor cursus fusce neque CEO egestas cursus magna sapien and suscipit ipsum",
    //     excerpt: "Luctus vitae egestas augue and ipsum ultrice quisque in cursus lacus feugiat egets congue ultrice sagittis laoreet",
    //     image: "/assets/images/blog/post-8-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Martex Team",
    //     publishedDate: new Date("Mar 13, 2023"),
    //     category: "Freelancer Tips",
    //   },
    //   {
    //     _id: 2,
    //     slug: "/blog/single-post",
    //     title: "Cursus porttitor fusce neque CEO egestas cursus magna sapien and ipsum suscipit",
    //     excerpt: "Mullam ipsum aliqum vitae and blandit vitae tempor sapien and lipsum donec",
    //     image: "/assets/images/blog/post-9-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Martex Team",
    //     publishedDate: new Date("Feb 3, 2023"),
    //     category: "Community",
    //   },
    //   {
    //     _id: 3,
    //     slug: "/blog/single-post",
    //     title: "Cursus porttitor fusce neque CEO egestas cursus magna sapien and ipsum suscipit",
    //     excerpt: "Mullam ipsum aliqum vitae and blandit vitae tempor sapien and lipsum donec",
    //     image: "/assets/images/blog/post-9-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Martex Team",
    //     publishedDate: new Date("Feb 13, 2023"),
    //     category: "Community",
    //   },
    //   {
    //     _id: 4,
    //     slug: "/blog/single-post",
    //     title: "Porttitor cursus fusce neque CEO egestas cursus magna sapien and suscipit ipsum",
    //     excerpt: "Luctus vitae egestas augue and ipsum ultrice quisque in cursus lacus feugiat egets congue ultrice sagittis laoreet",
    //     image: "/assets/images/blog/post-8-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Martex Team",
    //     publishedDate: new Date("Mar 13, 2023"),
    //     category: "Freelancer Tips",
    //   },
    //   {
    //     _id: 5,
    //     slug: "/blog/single-post",
    //     title: "Phasellus blandit justo undo aliquam diam vitae molestie",
    //     excerpt: "Egestas luctus vitae augue and ipsum ultrice quisque in cursus lacus feugiat congue diam ultrice laoreet sagittis",
    //     image: "/assets/images/blog/post-7-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Miranda Green",
    //     publishedDate: new Date("Feb 02, 2023"),
    //     category: "Product News",
    //   },
    //   {
    //     _id: 6,
    //     title: "Congue magna tempor and ipsum Martex sapien turpis laoreet augue",
    //     excerpt: "Aliqum mullam blandit vitae and tempor sapien and donec lipsum gravida porta undo velna dolor libero a risus aliquet tempus posuere a tempor velna tempus posuere dolor",
    //     image: "/assets/images/blog/post-12-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Martex Team",
    //     publishedDate: new Date("Apr 28, 2023"),
    //     category: "Social Media Marketing"
    //   },
    //   {
    //     _id: 7,
    //     title: "Aliqum mullam porta blandit: lacus and sapien gravida",
    //     excerpt: "Egestas luctus vitae augue and ipsum ultrice quisque in cursus lacus feugiat congue diam ultrice laoreet sagittis",
    //     image: "/assets/images/blog/post-1-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Martex Team",
    //     publishedDate: new Date("Apr 23, 2023"),
    //     category: "Product News"
    //   },
    //   {
    //     _id: 8,
    //     title: "Porttitor cursus fusce neque CEO egestas cursus magna sapien and suscipit ipsum",
    //     excerpt: "Aliqum mullam ipsum vitae and blandit vitae tempor sapien and donec lipsum",
    //     image: "/assets/images/blog/post-2-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Miranda Green",
    //     publishedDate: new Date("Apr 09, 2023"),
    //     category: "Community",
    //   },
    //   {
    //     _id: 9,
    //     slug: "/blog/single-post",
    //     title: "Cubilia laoreet ipsum augue eget egestas Martex magna",
    //     excerpt: "Luctus vitae egestas augue and ipsum ultrice quisque in cursus lacus feugiat egets congue ultrice sagittis laoreet",
    //     image: "/assets/images/blog/post-3-img.jpg",
    //     imageAlt: "blog-post-image",
    //     author: "Helen J.",
    //     publishedDate: new Date("Apr 01, 2023"),
    //     category: "Freelancer Tips",
    //   },
    //   {
    //     _id: 10,
    //     title: "Porttitor cursus fusce neque CEO egestas cursus magna sapien and suscipit ipsum",
    //     excerpt: "Aliqum mullam ipsum vitae and blandit vitae tempor sapien and donec lipsum",
    //     image: "/assets/images/blog/post-2-img.jpg",
    //     imageAlt: "blog-post-image",
    //     slug: "/blog/single-post",
    //     author: "Miranda Green",
    //     publishedDate: new Date("Apr 19, 2023"),
    //     category: "Community",
    //   },
    // ],
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
      this.posts = data?.value
    },
    async fetchPost(route) {

      return this.posts.filter(p => p.slug === route)[0]

      // const { data, refresh } = await useSanityQuery(singlePostQuery, { slug: route })
      // return data.value[0]
    }
  }
})
