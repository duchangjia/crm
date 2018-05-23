<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>班次管理</h2>
      <template slot="right">
        <el-button type="default" @click="$router.push('/working/arrange')">返回排班管理</el-button>
        <el-button type="primary" v-if="$root.perm.BCGL_XZBC" @click="updateItem()">新增班次</el-button>
      </template>
    </bread-crumb>

    <el-form class="demo-form-inline" :model="params" :rules="rules" :inline="true" ref="searchForm">
      <el-form-item label="小组" prop="deptIdFk">
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
        <el-select v-model="params.deptIdFk" placeholder="请选择">
          <el-option :label="item.label" :value="item.id" :key="key" v-for="(item, key) in groupOptions"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="mr20">
        <el-button type="success" @click="beforeSearch('searchForm')">查询</el-button>
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary" @click="updateItem(testItem)">编辑班次</el-button>
      </el-form-item> -->
    </el-form>

    <data-pagination :page-data="page" @change="handlePageChange">
      <el-table slot="table" class="table"
        v-if="list" :data="list" :row-class-name="tableRowClassName"
        stripe border header-row-class-name="tb-hd">
       <el-table-column prop="rangeId" label="ID" width="80">
       </el-table-column>

       <el-table-column prop="deptName" label="组别" width="100">
       </el-table-column>

       <el-table-column prop="rangeName" label="班次名称" width="130">
       </el-table-column>

       <el-table-column prop="beginTime" label="开始时间">
       </el-table-column>

       <el-table-column prop="endTime" label="结束时间">
       </el-table-column>

       <el-table-column prop="lastModifyTime" label="最后修改时间">
        <!-- <template slot-scope="scope">
          {{ scope.row.lastModifyTime/1000 | formatDate }}
        </template> -->
       </el-table-column>

       <el-table-column prop="userName" label="添加人">
       </el-table-column>

       <el-table-column
         label="操作">
         <template slot-scope="scope">
           <a class="btn-link" v-if="$root.perm.BCGL_BJBC" @click="updateItem(scope.row)" href="javascript:void(0)">编辑</a>
           <a class="red ml10" v-if="$root.perm.BCGL_SCBC" @click="deleteItem(scope.row)" href="javascript:void(0)">删除</a>
         </template>
       </el-table-column>
      </el-table>
    </data-pagination>

    <!-- 新增/编辑 班次 -->
    <el-dialog class="addAlert" :title="updateParams.rangeId ? '编辑班次' : '新增班次'" :visible.sync="updateVisible" :close-on-click-modal="false" width="38%">
      <el-form :model="updateParams" :rules="updateRules" ref="updateForm" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="事业群" prop="group">
          <el-select v-model="item.text" :placeholder="item.label">
            <el-option :label="item" :key="key" :value="key" v-for="(item, key) in popOptions[0].list"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事业部" prop="group">
          <el-select v-model="item.text" :placeholder="item.label">
            <el-option :label="item" :key="key" :value="key" v-for="(item, key) in popOptions[1].list"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="group">
          <el-select v-model="item.text" :placeholder="item.label">
            <el-option :label="item" :key="key" :value="key" v-for="(item, key) in popOptions[2].list"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="小组" prop="deptIdFk">
          <!-- <el-select v-model="updateParams.deptIdFk" placeholder="请选择">
            <el-option :label="item.label" :value="item.id" :key="key" v-for="(item, key) in groupOptions"></el-option>
          </el-select> -->
          <el-cascader class="mr20"
            v-model="updateDeptId"
            @change="updateChange"
            :options="departmentTree"
            :props="departmentProps"
            :show-all-levels="false"
            :change-on-select="false"
            expand-trigger="hover">
          </el-cascader>
        </el-form-item>

        <el-form-item label="班次名称" prop="rangeName">
          <el-input v-model="updateParams.rangeName" placeholder="请输入班次名称" style="width: 194px;"></el-input>
        </el-form-item>

        <el-form-item label="开始时间" prop="beginTime">
          <el-time-select
            v-model="updateParams.beginTime"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '23:45'
            }"
            placeholder="开始时间"
            style="width: 194px;">
          </el-time-select>
        </el-form-item>

        <el-form-item label="结束时间" prop="endTime">
          <el-time-select
            v-model="updateParams.endTime"
            :picker-options="endOptions"
            placeholder="结束时间"
            style="width: 194px;">
          </el-time-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取消</el-button>
        <el-button type="primary" @click="submit('updateForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data() {
    var checkTime = (rule, value, cb) => {
      const params = this.updateParams
      if (params.beginTime && params.endTime) {
        const begin = new Date('2018-01-01 ' + params.beginTime).getTime()
        const end = new Date('2018-01-01 ' + params.endTime).getTime()
        if ( begin >= end) {
          cb(new Error('开始时间必须小于结束时间'));
          return
        }
      }
      cb();
    }
    return {
      deptId: [],
      params: {
        deptIdFk: '',
      },
      list: null,
      departmentTree: [],
      departmentProps: {
        label: 'label',
        value: 'id',
        //disabled: 'xxx'
      },
      rules: {
        deptId: [
          { required: true, message: '请选择小组', trigger: 'change' },
        ]
      },
      updateVisible: false,
      updateParams: {

      },
      updateDeptId: [],
      updateRules:{
        deptIdFk: [
          { required: true, message: '请选择小组', trigger: 'change' }
        ],
        rangeName: [
          { required: true, message: '请填写班次名称', trigger: 'change' }
        ],
        beginTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' },
          { validator: checkTime, trigger: 'blur' }
        ],
      },
      groupOptions: [
        {id: 5, label: '成考网销1组'},
        {id: 6, label: '成考网销2组'},
        {id: 7, label: '成考网销3组'},
      ],
      testItem: {
        userIdFk: 43,
        rangeId: 2,
        deptIdFk: 5,
        rangeName: "中班",
        beginTime: "09:15",
        endTime: "17:15"
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    endOptions() {
      let options = {
        start: '08:15',
        step: '00:15',
        end: '24:00'
      }
      const beginTime = this.updateParams.beginTime
      if (beginTime) {
        let [ hour, minute ] = beginTime.split(':')
        minute = parseInt(minute) + 15
        if (minute >= 60) {
          hour = parseInt(hour) + 1

          hour = hour < 10 ? '0' + hour : hour
          minute = '00'
        }
        options.start = [hour, minute].join(':')
      }
      return options
    }
  },
  watch: {
    deptId(val) {
      if (val && val.length) {
        this.params.deptIdFk = val[val.length - 1]
      }
    }
  },
  created() {
    this.API.qryDept({ deptId: this.userInfo.deptIdFk }).then(res => {
      this.departmentTree = res.result
    })
  },
  methods:{
    tableRowClassName({row, rowIndex}) {
      if (!rowIndex) {
        return 'tb-hd'
      }
    },
    search() {
      if (!this.params.deptIdFk) return
      this.API.qryClsRge(this.params).then(res => {
        this.list = res.result || []
        this.page = res.page
      })
    },
    beforeSearch(formName) {
      this.params.pageIndex = 1
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.search()
        } else {
          console.log('submit error!')
        }
      })
    },
    handlePageChange(pageIndex) {
      this.params.pageIndex = pageIndex
      this.search()
    },
    deleteItem(item) {
      this.$confirm('确定删除班次(' + item.rangeName + ')吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.API.delClsRge({rangeId: item.rangeId}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.search();
        })
      }).catch(() => {

      });
    },
    updateItem(item) {
      this.updateVisible = true
      if (item) {
        this.updateParams = {
          userIdFk: 43,
          deptIdFk: item.deptIdFk || this.params.deptIdFk,
          rangeId: item.rangeId,
          rangeName: item.rangeName,
          beginTime: item.beginTime,
          endTime: item.endTime
        }
      } else {
        this.updateParams = {
          userIdFk: 43,
          deptIdFk: this.params.deptIdFk
        }
      }
    },
    updateChange(item) {
      console.log(item)
      if (this.updateDeptId.length) {
        this.updateParams.deptIdFk = this.updateDeptId[this.updateDeptId.length - 1]
      }/* else {
        this.$message({
          type: 'error',
          message: '请选择小组!'
        })
      }*/

    },
    submit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateVisible = false
          //this.submit()
          const apiName = this.updateParams.rangeId ? 'mdfClsRge' : 'addClsRge'
          this.API[apiName](this.updateParams).then(res => {
            this.search()
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}

</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";

  .fr {
    float: right;
  }

  .ml10 {
    margin-left: 10px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .tar {
    text-align: right;
  }

  .red {
    color: #e91d27 !important;
    .el-input__inner {
      color: #e91d27 !important;
    }
  }

  .table {
    a {
      color: $color-blue;
    }
    .tb-hd {
      th {
        background: #e4f5fe;
      }
    }

  }

  .wrap {
    width: 1280px;
    margin: 0 auto;
  }

  .el-date-editor .el-range-separator {
    box-sizing: content-box;
  }
  .el-table {
    margin: 20px 0 0 !important;
    width: 100% !important;
    text-align: center;
  }

</style>
