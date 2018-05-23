<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>用户组管理</h2>
    </bread-crumb>

    <el-table class="table mt20 tal"
      v-if="list" :data="list" style="width: 92%; margin-left:2%">
      <el-table-column
        prop="roleName"
        label="用户组名称">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateItem(scope.row)">编辑</el-button>
          <el-button @click="$router.push('/system/role-perm/' + scope.row.roleId)" type="text" size="small">权限管理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹框 -->
    <el-dialog class="left" title="编辑用户组" :visible.sync="dialogVisible" :close-on-click-modal="false" width="480px">
      <el-form class="demo-ruleForm" :model="params" :rules="rules" :inline="true" ref="updateForm">
        <el-form-item label="用户组名称：" prop="roleName">
          <el-input v-model="params.roleName" style="width: 310px;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="beforeSubmit('updateForm')">确 定</el-button>
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
      params: {
        roleName: ""
      },
      list: null,
      rules: {
        roleName: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
    handleClick() {
      //this.$router.push("power")
      this.$message({
        type: 'error',
        message: '正在紧张开发中...'
      })
    },
    getList() {
      this.API.qryRole().then(res => {
        console.log(res)
        this.list = res.result
      }).catch(err => {
        console.log(err.message)
      });
    },
    //编辑
    updateItem(item) {
      this.dialogVisible = true
      this.params = {
        roleId: item.roleId,
        roleName: item.roleName
      }
      //this.tabelIndex = index.$index; //取到索引值
      //essionStorage.setItem("newList",JSON.stringify(row));
    },
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
    submit() {
      this.dialogVisible = false
      console.log(this.params)
      this.API.mdfRole(this.params).then(res => {
        this.getList()
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
      })
    }
    // 确认修改
    /*editEnter(){
      if (!this.newList.name) {
        alert("输入不能为空");
        return;
      }
      sessionStorage.clear("newList");
      this.dialogFormVisibleEdit = false;
      //console.log(this.newList.label)
    },
    // 取消修改
    editEase(){
      this.newList = JSON.parse(sessionStorage.getItem('newList'));
      let index = this.tabelIndex;
      this.$set(this.tableData,index,this.newList);
      sessionStorage.clear("newList");
      this.dialogFormVisibleEdit = false;
    }*/
  },
}
</script>

<style lang="scss" scoped>
  .table-wrap{
    width: 98.5%;
    margin:auto;
    background: #fff;
    padding:0px 10px;
    //text-align: center;
    .el-dialog .el-dialog__headerbtn{
      display: none;
    }
    .table{
      //text-align: center;
      .el-table th>.cell{
        text-align: center;
      }
    }
    .el-table th>.cell{
      text-align: center;
    }
  }
</style>
