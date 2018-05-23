<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>项目管理</h2>
      <el-button slot="right" type="primary" v-if="$root.perm.XMGL_XZXM" @click="updateItem()">新增项目</el-button>
    </bread-crumb>

    <data-pagination :page-data="page" @change="handlePageChange">
      <el-table slot="table" class="table" v-if="list" :data="list" style="width: 92%; margin-left:2%">
        <el-table-column label="项目名称" prop="proName">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? '显示' : '隐藏' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="$root.perm.XMGL_BXGL" type="text" size="small" @click="$router.push('/system/project-class/' + scope.row.proId)">班型管理</el-button>
            <el-button v-if="$root.perm.XMGL_BJXM" type="text" size="small" @click="updateItem(scope.row)">编辑</el-button>
            <el-button v-if="$root.perm.XMGL_XSYCXM" type="text" size="small" @click="toggleItem(scope.row)" >
              {{scope.row.status ? '隐藏' : '显示'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </data-pagination>

    <!-- 新增/编辑 -->
    <el-dialog class="left remove" :title="params.proId ? '编辑项目' : '新增项目'" :visible.sync="dialogVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="params" :rules="rules" ref="projectForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="params.proName" style="width: 310px;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="beforeSubmit('projectForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components:{
  },
  data(){
    return {
      dialogVisible: false,
      list: null,
      page: { },
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      ruleForm_add:{
        add_name: ''
      },
      rules: {
        proName: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.search()
  },
  methods:{
    search() {
      this.API.qryProject(this.params).then(res => {
        console.log(res)
        this.list = res.list
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
        this.params = {
          proId: item.proId,
          proName: item.proName
        }
      } else {
        this.params = { }
      }
    },
    toggleItem(item) {
      let message
      if (item.status) {
        message = `确定隐藏项目(${item.proName})吗?`
      } else {
        message = `确定显示项目(${item.proName})吗?`
      }
      this.$confirm(message, '操作提示').then(action => {
        console.log(action)
        if (action === 'confirm') {
          const params = {
            proId: item.proId,
            //proName: item.proName,
            status: item.status ? 0 : 1
          }
          this.submit(params)
        }
      })
    },
    eidt(val,index){
      this.dialogFormVisibleEdit = true;
      this.newList = val;
      this.tabelIndex = index.$index; //取到索引值
      sessionStorage.setItem("newList",JSON.stringify(val));
    },
    // 打开班型管理 页面
    openClass(index){
      //console.log(index);
      this.$router.push({path:"system_project_class",query:{index:index}})
    },
    // 新增
    addevent(){
      this.dialogVisible = true;
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
      const apiName = params ? 'mdfProjectBlock' : this.params.proId ? 'mdfProject' : 'addProject'
      this.API[apiName](params || this.params).then(res => {
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
    width: 98.5%;
    margin:auto;
    background: #fff;
    padding:0px 10px;
    .el-dialog .el-dialog__headerbtn{
      display: none;
    }
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
