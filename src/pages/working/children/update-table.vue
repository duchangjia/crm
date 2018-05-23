<template>
  <div class="" v-if="list">
    <el-table
      class="table tac"
      stripe
      border
      :data="list"
      current-row-key="index"
      :row-class-name="tableRowClassName"
      header-row-class-name="tb-hd">
     <el-table-column label="优先级" type="index" width="80">
      <template slot-scope="scope">
        <div class="sort-wrap">
          <span class="sort-num">
          {{ scope.$index + 1 }}
          </span>
          <span class="icon-move">
            <i class="el-input__icon el-icon-caret-top" @click="moveItem2('up', scope.$index)" title="上移"></i>
            <i class="el-input__icon el-icon-caret-bottom" @click="moveItem2('down', scope.$index)" title="下移"></i>
          </span>

        </div>
        <!-- <span>上</span>
        <span>下</span> -->
      </template>
     </el-table-column>

     <el-table-column prop="userName" label="坐席" width="100">
     </el-table-column>

     <el-table-column label="计划分配数" width="130">
       <template slot-scope="scope">
        <el-input class="tac" v-model="scope.row.allotPlanNum" style="width: 70px;" />
       </template>
     </el-table-column>

     <el-table-column prop="alreadyPlanNum" label="已分配数">
     </el-table-column>

     <el-table-column :label="weekDays[key]" v-for="(item, key) in weekName" :key="key">
      <el-table-column :label="'星期' + item">
        <template slot-scope="scope">
          <el-select :class="{red: item.rangeName === '休息'}" v-model="scope.row.schedu[key]" placeholder="请选择">
            <el-option :label="item.rangeName" :value="item.rangeId" :key="key" v-for="(item, key) in scheduleOptions"></el-option>
          </el-select>
        </template>
      </el-table-column>
     </el-table-column>
   </el-table>

    <div>
      <div class="mt20 tar">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="success" @click="copyLastWeek">复制上周</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { extend, formatDate } from '@/common/util'
export default {
  components: {
  },
  props: {
    listData: {
      type: Array
    },
    scheduleOptions: {
      type: Array
    },
    params: {
      type: Object
    },
    weekName: {
      type: Array
    },
    weekDays: {
      type:Array
    }
  },
  data(){
    return {
      list: this.listData
    }
  },
  computed:{

  },
  created() {

  },
  methods:{
    getList() {
      // 获取排班表
      this.API.qrySchList(this.params).then(res => {
        console.log(res)
        this.list = res.result
        if (this.list.length > 1) {
          this.list.sort((a, b) => {
            return a.sort > b.sort
          })
        }
        console.log(this.list)
        //this.tableParams = res.result

        //this.tableParams[0].userName = '123'
        console.log(this.list)
      })
    },
    disabledDate(date) {
      console.log(date)
    },
    updateTable() {
      this.isEdit = true
      this.tableParams = JSON.parse(JSON.stringify(this.list))
      //extend(this.tableParams, this.list)
      console.log(this.tableParams);
    },
    moveItem2(direction, index) {
      let list = this.list

      if (direction === 'up') {
        if (index) {
          const arr = list.splice(index, 1)
          list.splice(index - 1, 0, arr[0])
          console.log(list, index, arr)
        }
      } else {
        if (index < list.length - 1) {
          const arr = list.splice(index, 1)
          list.splice(index + 1, 0, arr[0])
          console.log(list, index, arr)
        }
      }
    },
    save() {
      console.log(this.list);
      this.list.forEach((item, index) => {
        item.sort = index + 1
      })
      console.log(this.list)
      let params = this.params
      params.schList = this.list
      this.API.mdfSchList(params).then(res => {
        console.log(res)
        this.$emit('change', true)
      })
    },
    cancel() {
      this.$emit('change')
    },
    copyLastWeek() {
      const beginTs = new Date(this.params.beginDate).getTime()
      const newTs = beginTs - (24 * 60 * 60 * 1000) * 7

      console.log(beginTs)

      const params = {
        deptId: this.params.deptId,
        beginDate: formatDate(newTs / 1000, 'yyyy-MM-dd')
      }

      this.API.qrySchList(params).then(res => {
        console.log(res)
        this.list = res.result
        console.log(this.list)
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (!rowIndex) {
        return 'tb-hd'
      }
    },
  },
}

</script>

<style lang="scss" scoped>
  .fr {
    float: right !important;
  }

  .mt20 {
    margin-top: 20px !important;
  }
  .mr20 {
    margin-right: 20px !important;
  }

  .tar {
    text-align: right;
  }

  .red {
    .el-input__inner {
      color: #e91d27 !important;
    }
  }

  .tb-hd {

    th {
      background: #e4f5fe;
    }
  }

  .wrap {
    width: 1280px;
    margin: 0 auto;
  }

  .el-date-editor .el-range-separator {
    box-sizing: content-box;
  }
  .wrap .el-table {
    margin: 20px 0 0 !important;
    width: 100% !important;
    text-align: center;
  }

  .sort-wrap {
    position: relative;
    height: 40px;
  }
  .sort-num {
    position: absolute;
    right: 50%;
    display: inline-block;
    margin-right: 10px;
    line-height: 40px;
  }
  .icon-move {
    position: absolute;
    left: 50%;
    top: 10px;
    display: inline-block;
    //margin-top: 4px;
    width: 10px;
    height: 20px;
    i {
      float: left;
      width: 10px;
      height: 10px;
      line-height: 10px;
      cursor: pointer;
    }
  }

</style>
