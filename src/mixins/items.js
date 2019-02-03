module.exports = {
  data () {
    return {
      mixTableData: {
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
        let q = {page: this.mixTableData.pagination.current_page, per_page: this.mixTableData.pagination.page_count}
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
      this.mixTableData.refreshLoading = true
      return new Promise((resolve, reject) => {
        promise.then(res => {
          this.mixTableData.refreshLoading = false
          this.mixTableData.items = res.data.items
          this.mixTableData.pagination = res.data.pagination
          resolve(res)
        }).catch(err => {
          this.mixTableData.refreshLoading = false
          reject(err)
        })
      })
    },
    mixLoadMoreData (promise) {
      this.mixTableData.loadMoreLoading = true
      return new Promise((resolve, reject) => {
        promise.then(res => {
          this.mixTableData.loadMoreLoading = false
          this.mixTableData.items = this.mixTableData.items.concat(res.data.items)
          this.mixTableData.pagination = res.data.pagination
          resolve(res)
        }).catch(err => {
          this.mixTableData.loadMoreLoading = false
          reject(err)
        })
      })
    }
  }
}
