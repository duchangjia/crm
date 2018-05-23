<template>
  <div class="wrap">
    <div class="g-title">
      <h2>组织架构</h2>
    </div>

    <el-tree class="tree-wrap" v-if="departmentTree.length" accordion
      :data="departmentTree" :render-content="renderContent" :highlight-current="true">
    </el-tree>

    <!-- 新增/编辑部门 -->
    <el-dialog class="left remove" :title="updateParams.deptId ? '编辑部门' : '新增部门'"
     :visible.sync="updateVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="updateParams" :rules="updateRules" ref="updateForm" label-width="130px" class="demo-ruleForm">
        <!-- 事业部添加/编辑子部门的时候，多传一个子部门类型 -->
        <el-form-item label="部门类型" prop="type" v-if="(updateLevel == 3 && isAdd) || (updateLevel == 4 && !isAdd)">
          <el-select v-model="updateParams.type" :disabled="!!updateParams.deptId" placeholder="请选择部门类型" style="width: 280px">
            <el-option v-for="item in departmentOptions" :label="item.label" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门名称" prop="deptName" placeholder="请输入部门名称">
           <el-input v-model="updateParams.deptName" style="width: 280px"></el-input>
        </el-form-item>

        <!-- 客服部添加客服组/编辑客服组的时候，多传绑定咨询组，支持多选 -->
        <el-form-item label="选择关联咨询组" prop="relevIds" v-if="updateType == 1 && ((updateLevel == 4 && isAdd) || updateLevel == 5)">
          <el-select multiple v-model="updateRelevIds" placeholder="请选择咨询组" style="width: 280px">
            <el-option v-for="item in saleOptions" :label="item.deptName" :value="item.deptId" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="beforeSubmit('updateForm')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框 -->
    <!-- <el-dialog class="left" title="编辑坐席" :visible="dialogFormVisibleEdit" width="30%">
      <el-form class="demo-ruleForm" >
             <el-form-item  label="">
               <el-input v-model="newList.label"></el-input>
             </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="eidt">取 消</el-button>
        <el-button type="primary" @click="editEnter">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      /*value3: '',
      position: "",
      dialogFormVisibleEdit:false,
      seatData:[],
      newList:{label:""},
      newButton: false, // 是否显示新增按钮
      isType:false, // 部门类型
      newsMsg:"",*/

      departmentTree: [],
      departmentOptions: [
        { id: 1, label: '客服部门' },
        { id: 2, label: '电销部门' },
        { id: 4, label: '网销部门' },
        { id: 8, label: '推广部门' },
      ],
      saleOptions: [
        { id: 81, label: '电销一组' },
        { id: 82, label: '电销二组' },
      ],
      isAdd: false,
      updateVisible: false,
      updateParams:{
        deptName: '',
        type: '' // 部门类型
      },
      updateLevel: 0,
      updateType: 0,
      updateRelevIds: [],
      updateRules: {
        deptName: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择子部门', trigger: 'change' },
        ],
        relevIds: [
          { required: true, message: '选择关联咨询组', trigger: 'change' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  watch: {
    updateRelevIds(val) {
      this.updateParams.relevIds = val.join(',')
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取列表
      this.API.qryDept().then(res => {
        // console.log(res.result)
        if (res.result && res.result.length) {
          this.departmentTree = res.result
          // 在每一个节点加一个字段hasPerm，判断是否有权限查询该部门员工
          this.handleDept(this.departmentTree, this.userInfo.deptLevel == 1)
        }
        this.$emit('change', {})
      }).catch(err => {
         console.log('error:' + err.message)
      })
    },
    handleDept(list, hasPerm) {
      let vm = this
      if (list && list.length) {
        list.forEach(listItem => {
          const nodePerm = hasPerm ? hasPerm : vm.userInfo.deptIdFk == listItem.id
          listItem.hasPerm = nodePerm

          if (listItem.children && listItem.children.length) {
            vm.handleDept(listItem.children, nodePerm)
          }
        })
      }
    },
    qryDeptSaleById(data, isAdd) {
      if (((data.level == 4 && isAdd) || data.level == 5) && data.type == 1) {
        this.updateRelevIds = []
        if (data.level == 5) {
          //this.updateRelevIds = data.relevIds && data.relevIds.length ? data.relevIds.split(',') : []
          if (data.relevIds && data.relevIds.length) {
            const arr = data.relevIds.split(',')
            arr.forEach(item => {
              this.updateRelevIds.push(parseInt(item))
            })
          }
        }

        this.API.qryDeptSaleById({ deptId: data.id }).then(res => {
          console.log(res)
          this.saleOptions = res.result
        })

      }
    },
    handleSelect(e, data) {
      this.$emit('change', data)
    },
    handleStop(e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
    },
    handleUpdate(e, data, isAdd) {
      this.handleStop(e);
      console.log(data)

      this.qryDeptSaleById(data, isAdd)

      if (isAdd) {
        this.isAdd = true
        // 最多添加五级
        if (data.level >= 5) {
          this.$message({
            message: '最多添加五级',
            type: 'warning'
          });
          return;
        }

        this.updateParams = {
          parentDeptId: data.id,
        }

        if (data.level == 4) {
          this.updateParams.type = data.type
        }
      } else {
        this.isAdd = false
        this.updateParams = {
          deptId: data.id,
          deptName: data.label,
          type: data.type
        }
      }

      // 如果是事业部需要多传一个参数：type
      this.updateLevel = data.level
      this.updateType = data.type
      this.updateVisible = true
    },
    handleDelete(e, data) {
      this.handleStop(e);

      //const parent = node.parent;
      //const children = parent.data.children || parent.data;
      //const index = children.findIndex(d => d.id === data.id);
      //children.splice(index, 1);
      /*if (this.seatData.length) {
          this.$message({
            type: 'success',
            message: '请先删除子部门!'
          })
          return;
      }*/
      this.$confirm(`确定删除部门(${data.label})吗？`, '操作提示').then(action => {
        if (action === 'confirm') {
          this.API.delDept({ deptId: data.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        }
      })
    },
    // 保存
    beforeSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateVisible = false
          this.handleSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleSubmit() {
      const apiName = this.isAdd ? 'addDept' : 'mdfDept'
      this.API[apiName](this.updateParams).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.getList()
      });
    },
    renderContent(h, { node, data, store }) {
      if (data.hasPerm) {
        if (data.level == 5 || data.type == 8) {
          return (
            <span class="custom-node">
              <span class="title" on-click={ (e) => { this.handleSelect(e, data)} }>{node.label}</span>

              <p class="icon">
                <img src="/static/img/system/edit.png" on-click={ (e) => { this.handleUpdate(e, data) }} title="编辑" />
                <img src="/static/img/system/delete.png" on-click={ (e) => {  this.handleDelete(e, data) }} title="删除" />
              </p>
            </span>)
        } else {
          return (
            <span class="custom-node">
              <span class="title" on-click={ (e) => { this.handleSelect(e, data)} }>{node.label}</span>

              <p class="icon">
                <img src="/static/img/system/add.png" on-click={ (e) => { this.handleUpdate(e, data, 1) }} title="新增" />
                <img src="/static/img/system/edit.png" on-click={ (e) => { this.handleUpdate(e, data) }} title="编辑" />
                <img src="/static/img/system/delete.png" on-click={ (e) => {  this.handleDelete(e, data) }} title="删除" />
              </p>
            </span>)
        }
      } else {
        return (
          <span class="custom-node">
            <span class="title" on-click={ (e) => { this.handleSelect(e, data)} }>{node.label}</span>
          </span>)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 280px;
    //height: 100%;
    font-size: 15px;
    background: #2f3941;
    .g-title {
      height: 60px;
      line-height: 60px;
      color: #fff;
      background: #333d46;
      h2 {
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">
  .tree-wrap{
    background: #2f3941;
    color: #a8b0b9;
    .custom-node{
      line-height: 32px;
      .icon{
        float: left;
        img{
          width: 13px;
          margin-left:10px;
          float: left;
          display: none;
          margin-top: 10px;
        }
      }
      .title{
        float: left;
      }
    }
    .el-tree-node__content{
      height: 32px;
    }
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover, .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: #1e2630;
    }
    .el-tree-node__content>.el-tree-node__expand-icon{
      float: left;
    }
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover .custom-node .icon img {
      display: block;
    }
    .el-dialog .el-dialog__headerbtn{
      display: none;
    }
  }
</style>
