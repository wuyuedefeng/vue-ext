export default {
  data () {
    return {
      mixData: {
        items: [],
        refreshLoading: false,
        loadMoreLoading: false,
        pagination: {
          current_page: 1,
          prev_page: '',
          next_page: '',
          total_page: '',
          page_count: 25,
          total_count: ''
        },
        searches: [],
        q: {}
      }
    }
  },
  watch: {
    searches: {
      handler (nv) {
        let q = {page: this.mixData.pagination.current_page, per_page: this.mixData.pagination.page_count}
        nv.forEach(search => {
          q[search['key']] = search['default'] || ''
        })
        this.q = q
      },
      immediate: true
    },
    $route () {
      this.searches.forEach(search => {
        switch (search.type) {
          case Date:
            this.q[search.key] = new Date(this.$route.query[search.key])
            break
          case Boolean:
            this.q[search.key] = this.$route.query[search.key] === 'true' || this.$route.query[search.key] === true
            break
          case Number:
            this.q[search.key] = +this.$route.query[search.key]
            break
          default:
            this.q[search.key] = this.$route.query[search.key]
        }
      })
    }
  },
  methods: {
    mixRefreshData (promise) {
      this.mixData.refreshLoading = true
      return new Promise((resolve, reject) => {
        promise.then(res => {
          this.mixData.refreshLoading = false
          this.mixData.items = res.data.items
          this.mixData.pagination = res.data.pagination
          resolve(res)
        }).catch(err => {
          this.mixData.refreshLoading = false
          reject(err)
        })
      })
    },
    mixLoadMoreData (promise) {
      this.mixData.loadMoreLoading = true
      return new Promise((resolve, reject) => {
        promise.then(res => {
          this.mixData.loadMoreLoading = false
          this.mixData.items = this.mixData.items.concat(res.data.items)
          this.mixData.pagination = res.data.pagination
          resolve(res)
        }).catch(err => {
          this.mixData.loadMoreLoading = false
          reject(err)
        })
      })
    }
  }
}
