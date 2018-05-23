<template>
  <div class="">
    <div class="table-wp">
      <slot name="table"></slot>
    </div>
    <div class="page-wp mt20" v-if="page && parseInt(page.totalItem) > page.pageSize">
      <el-pagination @current-change="handleChange"
       :current-page="page.pageIndex"
       :page-size="page.pageSize"
       :total="parseInt(page.totalItem)"
       layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataPagination',
  data () {
    return {
      page: this.pageData
    }
  },
  created () {

  },
  props: {
    pageData: {
      type: Object,
      default() {
        return {
          pageIndex: 1,
          pageSize: 20,
          //totalPage: 0,
          totalItem: 0,
        }
      }
    }
  },
  watch: {
    pageData (val) {
      this.page.pageIndex = val.pageIndex || 1
      this.page.pageSize = parseInt(val.pageSize || 10, 10)
      this.page.totalItem = parseInt(val.totalItem || 0, 10)
    }
  },
  methods: {
    handleChange (page) {
      this.$emit('change', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-wp {
    min-height: 600px;
  }
</style>
