<template>
  <div class="wrap">
    <bread-crumb>
      <h2>坐席管理</h2>
      <el-button slot="right" type="primary" v-if="$root.perm.ZXGL_XZZX" @click="handleUpdate()">新增坐席</el-button>
    </bread-crumb>

    <el-form :inline="true" :model="params" class="demo-form-inline" label-width="80px" size="small">
      <label class="el-form-item__label boldFont" style="font-weight: normal;">精确查找:</label>
      <el-input class="input-with-select" v-model="params[searchField[searchFieldName]]" :clearable="true" placeholder="请输入内容" :style="`width:240px`" size="small">
        <el-select v-model="searchFieldName"  slot="prepend" placeholder="请选择" :style="`width:100px`">
          <el-option v-for='(item,index) in ["姓名","ID","手机号"]' :key="index"  :label="item" :value="index"></el-option>
        </el-select>
      </el-input>

      <el-form-item label="是否在职">
        <el-select v-model="params.status" :clearable="true" placeholder="请选择" style="width: 140px;">
          <el-option :label="item.label" :value="item.id" v-for="(item, key) in statusOptions" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="用户组">
        <el-select v-model="params.roleIdFk" :clearable="true" placeholder="请选择" style="width: 140px;">
          <el-option :label="item.roleName" :value="item.roleId" v-for="(item, key) in roleOptions" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="beforeSearch(1)">查询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true"> 新增</el-button>
      </el-form-item> -->
    </el-form>

    <data-pagination :page-data="page" @change="beforeSearch">
      <el-table slot="table" class="table"
        :data="list">
        <el-table-column prop="userId" label="ID" width="80">
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>

        <el-table-column prop="roleName" label="用户组" width="130">
        </el-table-column>

        <el-table-column prop="userName" label="账号">
        </el-table-column>

        <el-table-column prop="callSeat" label="呼叫座席">
        </el-table-column>

        <el-table-column prop="bu" label="事业部">
        </el-table-column>

        <el-table-column prop="deptChild" label="子部门">
        </el-table-column>

        <el-table-column prop="group" label="小组">
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? '在职' : scope.row.status == 0 ? '离职' : '禁用' }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status == 0" type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button v-else type="text" size="small" disabled title="状态为离职的员工才可以删除">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </data-pagination>

    <!-- 编辑弹框 -->
    <el-dialog class="left" :title="updateParams.userId ? '编辑坐席' : '新增坐席'" :visible.sync="updateVisible" :rules="updateRules" :close-on-click-modal="false" width="720px">
      <el-form class="demo-ruleForm" :model="updateParams" :rules="updateRules" :inline="true" ref="updateForm" :resetField="true" label-width="100px">

        <div>
          <el-form-item label="部门" prop="deptIdFk">
            <el-cascader class="mr20" style="width: 180px"
              v-model="updateDeptId"
              :options="updateParams.userId && deptInfo.deptLevel < 5 ? departmentNew : departmentTree"
              :props="departmentProps"
              @blur="getDeptRole(true)"
              :clearable="true"
              :show-all-levels="false"
              :change-on-select="true"
              expand-trigger="hover">
            </el-cascader>
          </el-form-item>

          <el-form-item  label="用户组" prop="roleIdFk">
            <el-select v-model="updateParams.roleIdFk" placeholder="请选择" style="width: 140px;">
              <el-option :label="item.roleName" :value="item.roleId" v-for="(item, key) in updateRoleOptions" :key="key"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="updateParams.name"></el-input>
          </el-form-item>

          <el-form-item v-if="updateParams.userId" label="角色状态" prop="status">
            <el-select v-model="updateParams.status" placeholder="请选择" style="width: 140px;">
              <el-option :label="item.label" :value="item.id" v-for="(item, key) in statusOptions" :key="key"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="updateParams.mobile"></el-input>
        </el-form-item>
        <el-form-item label="呼叫坐席" prop="callSeat">
          <el-input v-model="updateParams.callSeat"></el-input>
        </el-form-item>

        <div>
          <el-form-item label="登录账号" prop="userName">
            <el-input v-model="updateParams.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="transformPassword">
            <el-input v-model="updateParams.transformPassword" type="password"></el-input>
          </el-form-item>

        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="beforeSubmit('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { mapState } from 'vuex'
import EmployeeUpdate from './employee-update'

export default{
  props:['selectedDept'],
  components: {
    EmployeeUpdate
  },
  data() {
    return {
      loading: false,
      list: [],
      page: { },
      params: {
        deptIdFk: '',
        status: '',
        roleIdFk: '',
        pageIndex: 1,
        pageSize: 10
      },
      searchFieldName: '',
      searchField: {
        '0': 'name',
        '1': 'userId',
        '2': 'mobile'
      },
      statusOptions: [
        { id: 1, label: '在职' },
        { id: 0, label: '离职' },
        { id: 3, label: '禁用' },
      ],
      roleOptions: [],

      updateDeptId: [],
      updateVisible: false,
      updateParams:{
        deptName: '',
        type: '' // 部门类型
      },
      departmentTree: [],
      departmentProps: {
        label: 'label',
        value: 'id',
        //disabled: 'xxx'
      },
      updateDepartment: [],
      updateRoleOptions: [],
      updateTypeLevel: {},   // 新增/编辑坐席时
      updateRules: {
        deptIdFk: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        roleIdFk: [
          { required: true, message: '请选择用户组', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择在职状态', trigger: 'change' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        /*transformPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],*/
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      deptInfo: state => state.user.deptInfo
    }),
    departmentNew() {
      const deptInfo = this.deptInfo

      let item = {
          id: deptInfo.deptId,
          label: deptInfo.deptName || '未知',
          level: deptInfo.deptLevel,
          type: deptInfo.type,
          //children: this.departmentTree
        }
      if (this.departmentTree && this.departmentTree.length) {
        item.children = this.departmentTree
      }
      console.log(item)
      return [item]
    }
  },
  watch:{
    selectedDept(val, oldVal) {
      // console.log(val, oldVal)
      if ( val &&  val.hasPerm) {
        this.params = {
          deptIdFk: val.id
        }
        this.search()
      } else {
        this.params = {
          pageIndex: 1,
          pageSize: 10
        }
        this.list = []
        this.page = {}
      }
    },
    updateDeptId(val) {
      if (val && val.length) {
        this.updateParams.deptIdFk = val[val.length - 1]

        console.log(this.updateParams.deptIdFk)
        //this.getDeptRole()
      }
    }
	},
  created(){
    this.API.qryRole().then(res => {
      // console.log(res)
      this.roleOptions = res.result
    })

    this.API.qryDept({ deptId: this.userInfo.deptIdFk }).then(res => {
      // console.log(res)
      this.departmentTree = res.result
    })
  },
  methods:{
    search() {
      this.API.qryUser(this.params).then(res => {
        console.log(res)
        this.list = res.result
        this.page = res.page
      })
    },
    getDeptRole(isClear) {
      if (isClear) {
        this.updateParams.roleIdFk = ''
      }
      if (this.updateParams.deptIdFk) {

        this.getTypeLevel(this.departmentNew)
        console.log(this.updateTypeLevel)
        this.API.getDeptRole(this.updateTypeLevel).then(res => {
          //this.updateParams.roleIdFk = ''
          this.updateRoleOptions = res.deptRole && res.deptRole.length ? res.deptRole : []
        })

      }
    },
    getTypeLevel(list) {
      let vm = this
      if (list && list.length) {
        list.forEach(listItem => {
          console.log(listItem.id, this.updateParams.deptIdFk)
          if (listItem.id == this.updateParams.deptIdFk) {
            vm.updateTypeLevel = {
              type: listItem.type,
              level: listItem.level
            }
            return
          }

          if (listItem.children && listItem.children.length) {
            vm.getTypeLevel(listItem.children)
          }
        })
      }
    },
    beforeSearch(pageIndex) {
      if (this.deptId) {
        this.$message({
          type: 'error',
          message: '请先选择部门'
        })
      } else {
        this.params.pageIndex = pageIndex
        this.search()
      }
    },
    /*getDeptRole() {
      const params = {
        type: this.userInfo.deptType,
        level: this.userInfo.deptLevel
      }
      this.API.getDeptRole(params).then(res => {
        console.log(res)
      })
    },*/
    handleDelete(item) {
      this.$confirm('确定删除坐席(' + item.name + ')吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log({userId: item.userId})
        this.API.delUser({userId: item.userId}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.search();
        })
      }).catch(() => {

      });
    },
    handleUpdate(item) {
      this.updateVisible = true

      //this.getDeptRole()

      console.log(item)
      if (item) {
        //this.updateParams = item
        //delete this.updateParams.createTime
        this.updateDeptId = [item.deptIdFk]
        this.updateParams = {
          deptIdFk: item.deptIdFk,
          roleIdFk: item.roleIdFk,
          userId: item.userId,
          name: item.name,
          mobile: item.mobile,
          callSeat: item.callSeat,
          userName: item.userName,
          //transformPassword: '******',
          status: item.status,
          password: item.password,
        }
        console.log(this.updateParams, item)
        this.updateParams.transformPassword = item.password //'123456'
        this.getDeptRole()
      } else {
        this.updateParams = {
          status: 1
        }
      }
    },
    // 保存
    beforeSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateVisible = false
          this.updateParams.deptIdFk = this.updateDeptId[this.updateDeptId.length - 1]
          this.handleSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleSubmit() {
      const apiName = this.updateParams.userId ? 'mdfUser' : 'addUser'
      let params = Object.assign({ }, this.updateParams)
      //params.transformPassword = md5(params.transformPassword)
      params.transformPassword = params.transformPassword ? this.$trim(params.transformPassword) : ''
      if (apiName == 'addUser') {
        params.transformPassword = params.transformPassword ? md5(params.transformPassword) : ''
      } else {
        params.transformPassword = params.transformPassword == params.password ? params.transformPassword : md5(params.transformPassword)
      }
      if (this.loading) {
        return;
      } else {
        this.loading = true
      }
      this.API[apiName](params).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.search()
      }).catch(err => {
        this.loading = false
      });
    },
      // 查询座席列表
      _find(){
        var obj={};
        this.formInline.select == 0 ? obj.name= this.formInline.default : "";
        this.formInline.select == 1 ? obj.ID= this.formInline.default : "";
        this.formInline.select == 2 ? obj.mobile= this.formInline.default : "";
        this.findFormInline[0].default == "在职" ? obj.status = 1 : "";
        this.findFormInline[0].default == "离职" ? obj.status = 0 : "";
        obj.roleIdFk = this.findFormInline[1].default; // 部门ID
        this.API.tissueGetSeat(obj)
        .then(res => {
          let list = res.result;

          for(var i=0; i<list.length; i++){
            if (list[i].status == 1) {
                list[i].status = "在职"
            }
            else {
              list[i].status = "离职"
            }
          }
          this.seatDataWatch = list;
        }).catch(err => {
           console.log('error:' + err.message)
        })
      },
      // 选中后显示不同的 选框-------------------------------------------
      tabEdit (callback,key){
        // 如果选 择了 "事业群"  把 "事业部" 的数据全部加载出来
        if (key == 'groupName'){
            this.tabEditWarp(callback, key, 'legionName')
            // 这是为了获取部门ID
            this.requiredOBJ.deptIdFk = callback;
        }
        // 如果选 择了 "事业部"
        else if(key == 'legionName'){
          //  如果是 客服经理  客服组长   在线客服
          if(this.isLabel == 7 || this.isLabel == 8 || this.isLabel == 9) { // 选 择客服经理  把客服部的数据加载出来
            this.tabEditWarp(callback, key, 'customName');
            // 这是为了获取部门ID
            this.requiredOBJ.deptIdFk = callback;
          }
          // 如果选 择了 "事业部"  把 "推广部" 的数据全部加载出来
          else if (this.isLabel == 6){ // 是项目经理
            this.tabEditWarp(callback, key, 'spreadName')
            // 这是为了获取部门ID
            this.requiredOBJ.deptIdFk = callback;
          }
          else{
            // 把 "咨询部" 的数据全部加载出来
            this.tabEditWarp(callback, key, 'saleName')
            // 这是为了获取部门ID
            this.requiredOBJ.deptIdFk = callback;
          }
        }
        // 如果选 择了 "咨询部"  把 "咨询组" 的数据全部加载出来
        else if(key == 'saleName'){
          this.tabEditWarp(callback, key, 'saleGroupName')
          // 这是为了获取部门ID
          this.requiredOBJ.deptIdFk = callback;
        }
        // 这里只是为了获取 部门 ID
        else if(key == 'saleGroupName'){
          // 这是为了获取部门ID
          this.requiredOBJ.deptIdFk = callback;
        }

        // 如果选 择了 "客服部"  把 "客服组" 的数据全部加载出来
        else if (key == 'customName'){
          this.tabEditWarp(callback, key, 'customGroupName')
        }
        // 只选择用户组的时候  动态加载表单
        else if(key == 'userGroupName'){
          this.isLabel = callback; // 记住 你要新增什么
          this.requiredOBJ.roleIdFk = callback; //  新增坐席  需要 用户组id
          this.isAlertList(callback);
          return;
        };
      },
      // 因为每次下拉都要请求，大概要请求9次，这个是封装起来的
      tabEditWarp(callback,key,obj){
        this.API.seatAddChild({
          deptId: callback
        })
        .then(res => {
          let list = res.result;
          // let spreadResult = [];
          // for(let i=0; i<list.length; i++){
          //   if (list[i].type == 4) { // 是推广部
          //     spreadResult.push(list[i]);
          //   }
          // }
          // if(this.isLabel == 6 && obj == "spreadName") // 是项目经理 只显示推广部
          // {
          //   this.newsFormInline[obj].list= spreadResult;
          // }
          // else{
          //   this.newsFormInline[obj].list= list;
          // }
          this.newsFormInline[obj].list= list;
        }).catch(err => {
           console.log('error:' + err.message)
        })
      },
      // 新增
      newsEnter(formName){

        for(let key in this.newsFormInline){
          this.requiredOBJ[key] = this.newsFormInline[key].default
        }

        this.$refs[formName].validate((valid) => {
          if(!valid) return;

          // ------------------------新增坐席-----------------------------------------------
          //console.log(this.newsFormInline);disabledValDeptId
          // this.requiredOBJ.deptIdFk = this.disabledValDeptId;

          this.API.seatgetUserAddUser(this.requiredOBJ)
          .then(res => {
              console.log(res);
          }).catch(err => {
             console.log('error:' + err.message)
          })

          sessionStorage.setItem("newsFormInline",JSON.stringify(this.newsFormInline));
          let newsFormInline = JSON.parse(sessionStorage.getItem('newsFormInline'));
          this.tableData.push(newsFormInline);
          sessionStorage.clear("newsFormInline");
          this.dialogFormVisible = false;
          // console.log(this.tableData)
        })

      },
      // 取消 编辑
      editEase (){

        this.EditList = JSON.parse(sessionStorage.getItem('indexedit'));
        this.dialogFormVisibleEdit = false;
        sessionStorage.clear("indexedit");
      },
      // 确认编辑
      editEnter(){
        // 修改完成后 发送ajax
        console.log(this.tableData)
        this.dialogFormVisibleEdit = false;
        sessionStorage.clear("indexedit");
      },
      // 点击编辑
      edit(e,index){
        console.log(e);
        //let callback = e.userGroupName.default;

        // for(let k in e){
        //   console.log(k);
        //   //this.newsFormInline[k].default = e[k]
        // }

        //存到本地
        sessionStorage.clear("indexedit");
        sessionStorage.setItem("indexedit",JSON.stringify(e));
        this.dialogFormVisibleEdit = true;
        this.EditId= index.$index
      },
      // 删除
      RmovehandleClick(scope){
        // let off= confirm("你确定要删除么");
  			// if(!off) return;
        // 接口
        console.log(scope.row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
         }).then(() => {
           this.API.seatRemoveUser({
             userId:scope.row.userId
           })
           .then(res => {
             if (res.data.status == 200 ) {
               this.$message({
                 message: '恭喜你，删除成功', type: 'success'
               });
             }
             else if(res.data.status == 1){
               this.$message({
                 message: '只有离职的用户可以被删', type: 'warning'
               });
             }
           }).catch(err => {
              console.log('error:' + err.message)
           })
         })


      },
      // 动态显示弹框
      isAlertList(callback){
        console.log(callback);
        switch (callback) {
          case 1: // 事业群总经理
            this.indexedit = ["userGroupName"];
            break;
          case 2: // 事业部经理
            this.indexedit = ["userGroupName","groupName","legionName"];
            break;
          case 3: // 咨询部经理
            this.indexedit = ["userGroupName","groupName","legionName","saleName"];
            break;
          case 4: //咨询组长
            this.indexedit = ["userGroupName","groupName","legionName","saleName","saleGroupName"];
            break;
          case 5: //咨询师
            this.indexedit = ["userGroupName","groupName","legionName","saleName","saleGroupName"];
            break;
          case 6: // 项目经理
            //this.indexedit = [true,true,true,false,false,true];
            this.indexedit = ["userGroupName","groupName","legionName","","","spreadName"];
            break;
          case 7: // 客服经理
            //this.indexedit = [true,true,true,false,false,false,true];
            this.indexedit = ["userGroupName","groupName","legionName","","","","customName"];
            break;
          case 8: //客服组长
            this.indexedit = ["userGroupName","groupName","legionName","","","","customName","customGroupName"];
            // this.trendsList(index);
            break;
          case 9: // 在线客服
            //this.indexedit = [true,true,true,false,false,false,true,true];
            this.indexedit = ["userGroupName","groupName","legionName","","","","customName","customGroupName"];
            //this.trendsList(index);
            break;

        }
      }
  },
  /*data(){
    return {
        dialogFormVisible:false,
        dialogFormVisibleEdit: false,
        indexedit:[true,true],
        seatDataWatch: this.seatData, // 为实现父子组件双向绑定而生
        hideList:[],
        EditList:{},
        currentPage:3,
        formInline: {
          default:"",
          select:""
        },
        // 主要是为了做验证
        requiredOBJ:{
          userGroupName: "",
          groupName: "",
          legionName: "",
          saleName: "",
          saleGroupName : "",
          spreadName: "",
          customName: "",
          customGroupName: "",
          name: "",
          mobile:"",
          callSeat:"",
          userName:"",
          transformPassword: ""
        },
        findFormInline: [
          {default:"", label:"条件搜索", list:["在职","离职"]},
          {default:"", list:["事业群总经理","事业部经理","咨询部经理","咨询组长","咨询师","项目经理","客服组长","在线客服"]},
        ],
        // 新增的弹框
        newsFormInline: {
          userGroupName: {default:"",defaultbb:"", label:"用户组", list:["事业群总经理","事业部经理","咨询部经理","咨询组长","咨询师","项目经理","客服经理","客服组长","在线客服"]},
          groupName: {default:"", label:"事业群", list:["一","二"]},
          legionName : {default:"", label:"事业部", list:["1部","2部"]},
          saleName: {default:"", label:"咨询部", list:["1部","2部"]},
          saleGroupName : {default:"", label:"咨询组", list:["1组","2组"]},
          spreadName:{default:"",label:"推广部",list:["一部","二部"]},
          customName: {default:"", label:"客服部", list:["一部","2部","3部","4部"]},
          customGroupName: {default:"", label:"客服组", list:["一组","二组","三组","四组"]},
          name: {default:"", label:"姓名"},
          mobile: {default:"", label:"手机号码"},
          callSeat: {default:"", label:"呼叫坐席"},
          userName: {default:"", label:"账号"},
          transformPassword: {default:"", label:"密码"}
        },
        // 编辑的弹框
        newsFormInlineEidt: {
          userGroupName: {default:"",defaultbb:"", label:"用户组", list:["事业群总经理","事业部经理","咨询部经理","咨询组长","咨询师","项目经理","客服经理","客服组长","在线客服"]},
          groupName: {default:"", label:"事业群", list:["一","二"]},
          legionName : {default:"", label:"事业部", list:["1部","2部"]},
          saleName: {default:"", label:"咨询部", list:["1部","2部"]},
          saleGroupName : {default:"", label:"咨询组", list:["1组","2组"]},
          spreadName:{default:"",label:"推广部",list:["一部","二部"]},
          customName: {default:"", label:"客服部", list:["一部","2部","3部","4部"]},
          customGroupName: {default:"", label:"客服组", list:["一组","二组","三组","四组"]},
          name: {default:"", label:"姓名"},
          mobile: {default:"", label:"手机号码"},
          callSeat: {default:"", label:"呼叫坐席"},
          userName: {default:"", label:"账号"},
          transformPassword: {default:"", label:"密码"},
          status: {default:"在职"}
        }
    }
  }*/
  }
</script>

<style lang="scss" scoped>

  .wrap {
    margin-left: 280px;
    padding: 20px;
    .demo-form-inline{
      text-align: left;
      margin:15px 0;
    }
    .left{
      text-align: left;
    }

    .el-table th>.cell{
      text-align: center;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
    .left .el-dialog .el-form--inline .el-form-item{
      width: 47%;
    }
  }
</style>

<style lang="scss">

</style>
