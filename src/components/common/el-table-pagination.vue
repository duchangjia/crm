<template>
  <div class="table-paginatioon-container">
    <slot name="form" :search="searchHandler"/>
    <slot/>
    <el-table ref="table"
              :data="tableData"
              :border="border"
              :stripe="stripe"
              :height="height"
              :max-height="maxHeightL"
              :fit="fit"
              :size="size"
              :show-header="showHeader"
              :highlight-current-row="highlightCurrentRow"
              :current-row-key="currentRowKey"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :row-ket="rowKey"
              :empty-text="emptyText"
              :default-expand-all="defaultExpandAll"
              :expand-row-keys="expandRowKeys"
              :default-sort="defaultSort"
              :tooltip-effect="tooltipEffect"
              :show-summary="showSummary"
              :sum-text="sumText"
              :summary-method="summaryMethod"
              header-cell-class-name="header-row-class"
              style="width: 100%;"
              @select="(selection, row) => emitEventHandler('select', selection, row)"
              @select-all="selection => emitEventHandler('select-all', selection)"
              @selection-change="selection => emitEventHandler('selection-change', selection)"
              @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
              @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
              @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
              @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
              @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
              @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
              @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
              @header-click="(column, event) => emitEventHandler('header-click', column, event)"
              @sort-change="args => emitEventHandler('sort-change', args)"
              @filter-change="filters => emitEventHandler('filter-change', filters)"
              @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
              @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
              @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)">

      <slot name="prepend"/>

      <el-table-column
        v-for="(column, columnIndex) in columns" :key="columnIndex"
        :column-key="column.columnKey"
        :prop="column.prop"
        :label="column.label"
        :width="column.minWidth ? '-' : (column.width||'-' )"
        :minWidth="column.minWidth || column.width || '-'"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.method"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        align="center"
        :header-align="column.headerAlign || column.align"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue">
        <template slot-scope="scope" :scope="scope">
          <span v-if="column.filter">
            {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index"/>
          </span>
          <span v-else>
            {{ column.render ? column.render(scope.row) : scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <slot name="append"/>

    </el-table>
    <div v-if="showPagination"
         style="margin-top: 10px;text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        :layout="paginationLayout"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import request from '../../common/fetch';

  export default {
    name: 'ElTablePagination',
    props: {
      height: [String, Number],
      maxHeight: [String, Number],
      stripe: {
        default: true,
        type: Boolean
      },
      border: Boolean,
      size: String,
      fit: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      highlightCurrentRow: Boolean,
      currentRowKey: [String, Number],
      rowClassName: [String, Function],
      rowStyle: [String, Function],
      rowKey: [String, Function],
      emptyText: String,
      defaultExpandAll: Boolean,
      expandRowKeys: Array,
      defaultSort: Object,
      tooltipEffect: String,
      showSummary: Boolean,
      sumText: String,
      summaryMethod: Function,
      fetch: {
        type: Function
      },
      url: {
        type: String
      },
      method: {
        type: String,
        default: 'get',
        validator: value => {
          const methodTypes = ['get', 'post', 'put', 'delete'];
          return methodTypes.indexOf(value.toLowerCase()) !== -1;
        }
      },
      headers: {
        type: Object,
        default: () => {
          return {}
        }
      },
      listField: {
        type: String,
        default: 'rows'
      },
      totalField: {
        type: String,
        default: 'totalNum'
      },
      params: {
        type: Object,
        default: () => {
          return {}
        }
      },
      autoLoad: {
        type: Boolean,
        default: true
      },
      dataHandler: {
        type: Function
      },
      columns: {
        type: Array,
        required: true
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      pageSizes: {
        type: Array,
        default: () => {
          return [20, 50, 100]
        }
      },
      paginationLayout: {
        type: String,
        //default: 'total, prev, pager, next, jumper, sizes'
        default: 'total, prev, pager, next, jumper'
      },
      pageIndexKey: {
        type: String,
        default: 'pageIndex'
      },
      pageSizeKey: {
        type: String,
        default: 'pageSize'
      },
      dataField: {
        type: String,
        default:''
      }
    },
    data() {
      const _this = this
      return {
        Vue,
        pagination: {
          pageIndex: 1,
          pageSize: (() => {
            const {pageSizes} = _this
            if (pageSizes.length > 0) {
              return pageSizes[0]
            }
            return 20
          })()
        },
        total: 0,
        tableData: [],
        maxHeightL: this.maxHeight || window.innerHeight - 300
      }
    },
    watch: {
      url(newV) {
        console.log(newV);
      }
    },
    methods: {
      handleSizeChange(size) {
        this.pagination.pageSize = size
        this.dataChangeHandler()
      },
      handleCurrentChange(pageIndex) {
        this.pagination.pageIndex = pageIndex
        this.dataChangeHandler()
      },
      searchHandler() {
        this.pagination.pageIndex = 1
        this.dataChangeHandler(arguments[0])
      },
      dataChangeHandler() {
        this.fetchHandler(arguments[0])
      },
      fetchHandler(formParams = {}) {
        let {
          fetch, method, url,
          listField, pageIndexKey, pageSizeKey,
          totalField, params, showPagination,
          pagination,dataField
        } = this;
        let paramsObj = JSON.parse(JSON.stringify(Object.assign({},params, formParams)));

        if (showPagination) {
          paramsObj = Object.assign(paramsObj, {
            [pageIndexKey]: pagination.pageIndex,
            [pageSizeKey]: pagination.pageSize
          })
        }

        let requestObject = null

        if (fetch) {
          requestObject = fetch(paramsObj)
        } else {
          method = method.toLowerCase();
          if (method === 'get') {
            requestObject = request[method](url, {params:paramsObj})
          } else {
            requestObject = request[method](url, paramsObj)
          }
        }

        requestObject.then(response => {
          let result = response
          if (response && !(response instanceof Array)) {
            if (listField && listField.indexOf('.') !== -1) {
              listField.split('.').forEach(vv => {
                result = result[vv]
              })
            } else {
              result = response[listField]
            }
          }
          //获取列表中返回的一下额外数据
          if (dataField) {
            const fieldData = response[dataField];
            this.$emit('getData', fieldData);
          }

          if (!result || !(result instanceof Array)) {
            this.tableData = [];
            totalValue = 0;
            return false
          }

          if (this.dataHandler) {
            this.tableData = result.map(this.dataHandler)
          } else {
            this.tableData = result
          }

          let totalValue = response
          if (Object.prototype.toString.call(response) === '[object Array]') {
            totalValue = response.length
          } else if (typeof response === 'object') {
            if (totalField && totalField.indexOf('.') !== -1) {
              totalField.split('.').forEach(vv => {
                totalValue = totalValue[vv]
              })
            } else {
              totalValue = response[totalField]
            }
          } else {
            totalValue = 0
          }
          this.total = totalValue
        })
      },
      emitEventHandler(event) {
        this.$emit(event, ...Array.from(arguments).slice(1))
      },
    },
    mounted() {
      const {autoLoad, params} = this;
      if (autoLoad) {
        this.fetchHandler(params)
      }
    }
  }
</script>

<style lang="scss">
  .table-paginatioon-container {
    .header-row-class {
      background-color: rgba(0, 154, 255, 0.1);
      font-size: 14px;
      color: #2c2f33;
      font-family: MicrosoftYaHei;
    }
  }
</style>
