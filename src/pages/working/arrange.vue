<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>排班管理</h2>
    </bread-crumb>

    <el-form class="demo-form-inline" :model="params" :rules="rules" :inline="true" ref="searchForm">
      <el-form-item label="小组" prop="deptId">
        <el-cascader class="mr20"
          v-model="deptId"
          :options="departmentTree"
          :props="departmentProps"
          :show-all-levels="false"
          :change-on-select="false"
          expand-trigger="hover">
        </el-cascader>
      </el-form-item>
      <!-- <el-form-item label="小组">
        <el-select v-model="params.deptId" placeholder="请选择">
          <el-option :label="item.label" :value="item.id" :key="key" v-for="(item, key) in groupOptions"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="排班日期" prop="beginDate">
        <el-date-picker v-model="beginDate"
          type="week" format="yyyy-MM-dd"
          :clearable="false" :editable="false"
          placeholder="开始日期" style="width: 150px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="至">
        <el-input :value="endDate" disabled="" placeholder="结束日期" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="beforeSearch('searchForm')">查询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary">导出</el-button>
      </el-form-item> -->

      <!-- <el-date-picker
      v-model="params.daterange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
      </el-date-picker> -->


      <!-- <span>上一周</span>
      <span>下一周</span>
      <span>本周</span> -->

      <div class="fr" v-if="!isEditing && !disableEditing">
        <el-button v-if="$root.perm.PBGL_BJPB && list && list.length" type="primary" @click="updateTable">编辑排班表</el-button>
        <!-- <el-button type="primary">导入排班表</el-button> -->
      </div>
    </el-form>

    <template v-if="!isEditing">
      <el-table
        class="table tac"
        v-if="list"
        stripe
        border
        :data="list"
        :row-class-name="tableRowClassName"
        header-row-class-name="tb-hd">
       <el-table-column label="优先级" type="index" width="80">
       </el-table-column>

       <el-table-column prop="userName" label="坐席" width="100">
       </el-table-column>

       <el-table-column prop="allotPlanNum" label="计划分配数" width="130">
       </el-table-column>

       <el-table-column prop="alreadyPlanNum" label="已分配数">
       </el-table-column>

       <el-table-column :label="weekDays[key]" v-for="(item, key) in weekName" :key="key">
        <el-table-column :label="'星期' + item">
          <template slot-scope="scope">
            {{ scope.row.schedu[key] ? getItemName(scope.row.schedu[key]) : '休息' }}
          </template>
        </el-table-column>
       </el-table-column>
      </el-table>
    </template>

    <update-table v-else :list-data="list" :schedule-options="scheduleOptions" :params="params" :week-name="weekName" :week-days="weekDays" @change="handleChange"></update-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UpdateTable from './children/update-table';
import { extend, formatDate } from '@/common/util'
export default {
  components: {
    UpdateTable
  },
  data(){
    return {
      deptId: [],
      beginDate: null,
      params: {
        deptId: '',
        beginDate: '',
      },
      departmentTree: [],
      departmentProps: {
        label: 'label',
        value: 'id',
        //disabled: 'xxx'
      },
      list: null,
      isEditing: false,
      scheduleOptions: [],
      groupOptions: [
        {id: 5, label: '成考网销1组'},
        {id: 6, label: '成考网销2组'},
        {id: 7, label: '成考网销3组'},
      ],
      weekName: '一二三四五六日'.split(''),
      rules: {
        deptId: [
          { required: true, message: '请选择小组', trigger: 'change' },
        ],
        beginDate: [
          { required: true, message: '请选择开始日期', trigger: 'change' },
        ]
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    disableEditing() {
      if (!this.endDate) return false
      const today = new Date().getTime()
      const endDate = new Date(this.endDate).getTime()
      console.log(today > endDate)
      return today > endDate
    },
    endDate() {
      if (!this.beginDate) return ''

      const begin = this.beginDate.getTime()
      let end = begin + (24 * 60 * 60 * 1000) * 6
      return formatDate(end / 1000, 'yyyy-MM-dd')
    },
    weekDays() {
      let days = []
      if (!this.beginDate) return days

      const begin = this.beginDate.getTime()
      for (let i = 0; i < 7; i++) {
        let item = begin + (24 * 60 * 60 * 1000) * i
        days.push(formatDate(item / 1000, 'yyyy-MM-dd'))
      }
      return days;
    }
  },
  watch: {
    deptId(val) {
      if (val && val.length) {
        this.params.deptId = val[val.length - 1]
      }
    },
    beginDate(val) {
      this.params.beginDate = formatDate(new Date(val) / 1000, 'yyyy-MM-dd')
    }
  },
  created() {
    this.API.qryDept({ deptId: this.userInfo.deptIdFk }).then(res => {
      console.log(res)
      this.departmentTree = res.result
    })
  },
  methods:{
    beforeSearch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.API.qryRgeList({deptId: this.params.deptId}).then(res => {
            console.log(res)
            this.scheduleOptions = res.result

            if (this.scheduleOptions && this.scheduleOptions.length) {
              this.scheduleOptions.push({
                rangeId: 0,
                rangeName: '休息'
              })
            }
          })

          this.search()
        } else {
          console.log('submit error!')
        }
      })
    },
    /*search() {
      //this.params.beginDate = formatDate(new Date(this.beginDate) / 1000, 'yyyy-MM-dd')
      //console.log(this.beginDate)
      if (this.deptId.length) {
        if (!this.beginDate) {
          this.$message({
            type: 'error',
            message: '请选择开始日期!'
          })
          return
        }

        this.params.deptId = this.deptId[this.deptId.length - 1]

        // 获取班次

        this.search()  // 获取排班表
      } else {
        this.$message({
          type: 'error',
          message: '请选择小组!'
        })
      }
    },*/
    search() {
      // 获取排班表
      this.API.qrySchList(this.params).then(res => {
        console.log(res)
        this.list = res.result
        if (this.list.length > 1) {
          this.list.sort((a, b) => {
            return a.sort > b.sort
          })
        }
      }).catch(err => {
        this.list = []
      })
    },
    getItemName(id) {
      let list = this.scheduleOptions
      for (let i = 0; i < list.length; i++) {
        if (list[i].rangeId == id) {
          return list[i].rangeName
        }
      }
    },
    disabledDate(date) {
      console.log(date)
    },
    updateTable() {
      this.isEditing = true
      //this.tableParams = JSON.parse(JSON.stringify(this.list))
    },
    save() {
      console.log(this.list);
    },
    copy() {
      console.log(this.tableData);
    },
    handleChange(data) {
      console.log(data)
      this.isEditing = false
      //if (data) {
        this.search()
      //}
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
    //width: 1280px;
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

</style>
