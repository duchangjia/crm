<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>班型管理</h2>
      <el-button v-if="" slot="right" type="primary" @click="updateItem()">新增班型</el-button>
    </bread-crumb>

    <data-pagination :page-data="page" @change="handlePageChange">
      <el-table slot="table" class="table" v-if="list" :data="list"
       style="width: 92%; margin-left:2%">
        <el-table-column
          prop="cname"
          label="班型名称">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? '显示' : '隐藏' }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateItem(scope.row)">编辑</el-button>
              <el-button @click="toggleItem(scope.row)"  type="text" size="small" >
                {{scope.row.status ? '隐藏' : '显示'}}
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </data-pagination>

    <!-- 新增/编辑 -->
    <el-dialog class="left remove" :title="updateParams.ctId ? '编辑班型' : '新增班型'"
     :visible.sync="dialogVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="updateParams" :rules="rules" ref="updateForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="班型名称" prop="cname">
          <el-input v-model="updateParams.cname" style="width: 310px;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="beforeSubmit('updateForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="es6">
export default {
  components:{
  },
  data(){
    return {
      proId: this.$route.params.id,
      dialogVisible: false,
      list: null,
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      params: {
        proIdFk: this.$route.params.id,
      },
      updateParams: {

      },
      ruleForm_add:{
        add_name: ''
      },
      rules: {
        cname: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.search()
    //console.log(this.$route.query);
    //let index = this.$route.query.index
    //this.classList=this.tableData_project[index].classList;
  },
  methods:{
    search() {
      console.log(this.params)
      this.API.qryClassType(this.params).then(res => {
        console.log(res)
        this.list = res.result || []
        this.page = res.page
      }).catch(err => {
        console.log(err.message)
      });
    },
    handlePageChange(pageIndex) {
      this.params.pageIndex = pageIndex
      this.search()
    },
    updateItem(item) {
      this.dialogVisible = true
      if (item) {
        this.updateParams = {
          ctId: item.ctId,
          cname: item.cname
        }
      } else {
        this.updateParams = {
          proIdFk: this.proId
        }
      }
    },
    toggleItem(item) {
      let message
      if (item.status) {
        message = `确定隐藏班型(${item.cname})吗?`
      } else {
        message = `确定显示班型(${item.cname})吗?`
      }
      this.$confirm(message, '操作提示').then(action => {
        console.log(action)
        if (action === 'confirm') {
          this.submit({
            ctId: item.ctId,
            //cname: item.cname,
            //cname: item.cname,
            status: item.status ? 0 : 1
          })
        }
      })
    },
    //新增  保存
    beforeSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.submit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submit(params) {
      const apiName = params ? 'mdfClassType' : this.updateParams.ctId ? 'mdfClassType' : 'addClassType'
      //this.params.proIdFk = this.proId
      this.API[apiName](params || this.updateParams).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.search()
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-wrap{
    .el-dialog .el-dialog__headerbtn{
      display: none;
    }
    width: 98.5%;
    margin:auto;
    background: #fff;
    padding:0px 10px;
    .table{
      .el-table th>.cell{
        text-align: center;
      }
    }
    .el-table th>.cell{
      text-align: center;
    }
  }
</style>
