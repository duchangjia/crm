webpackJsonp([20],{B9xa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("3cXf"),o=a.n(s),i={components:{},data:function(){return{dialogVisible:!1,list:null,page:{},params:{pageIndex:1,pageSize:10},ruleForm_add:{add_name:""},rules:{proName:[{required:!0,message:"输入不能为空",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 20 个字符",trigger:"blur"}]}}},created:function(){this.search()},methods:{search:function(){var t=this;this.API.qryProject(this.params).then(function(e){console.log(e),t.list=e.list,t.page=e.page}).catch(function(t){console.log(t.message)})},handlePageChange:function(t){this.params.pageIndex=t,this.search()},updateItem:function(t){this.dialogVisible=!0,this.params=t?{proId:t.proId,proName:t.proName}:{}},toggleItem:function(t){var e=this,a=void 0;a=t.status?"确定隐藏项目("+t.proName+")吗?":"确定显示项目("+t.proName+")吗?",this.$confirm(a,"操作提示").then(function(a){if(console.log(a),"confirm"===a){var s={proId:t.proId,status:t.status?0:1};e.submit(s)}})},eidt:function(t,e){this.dialogFormVisibleEdit=!0,this.newList=t,this.tabelIndex=e.$index,sessionStorage.setItem("newList",o()(t))},openClass:function(t){this.$router.push({path:"system_project_class",query:{index:t}})},addevent:function(){this.dialogVisible=!0},beforeSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.dialogVisible=!1,e.submit()})},submit:function(t){var e=this,a=t?"mdfProjectBlock":this.params.proId?"mdfProject":"addProject";this.API[a](t||this.params).then(function(t){e.$message({type:"success",message:"保存成功！"}),e.search()})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-inner"},[a("bread-crumb",[a("h2",[t._v("项目管理")]),t._v(" "),t.$root.perm.XMGL_XZXM?a("el-button",{attrs:{slot:"right",type:"primary"},on:{click:function(e){t.updateItem()}},slot:"right"},[t._v("新增项目")]):t._e()],1),t._v(" "),a("data-pagination",{attrs:{"page-data":t.page},on:{change:t.handlePageChange}},[t.list?a("el-table",{staticClass:"table",staticStyle:{width:"92%","margin-left":"2%"},attrs:{slot:"table",data:t.list},slot:"table"},[a("el-table-column",{attrs:{label:"项目名称",prop:"proName"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.status?"显示":"隐藏")+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.$root.perm.XMGL_BXGL?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.$router.push("/system/project-class/"+e.row.proId)}}},[t._v("班型管理")]):t._e(),t._v(" "),t.$root.perm.XMGL_BJXM?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.updateItem(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),t.$root.perm.XMGL_XSYCXM?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.toggleItem(e.row)}}},[t._v("\n            "+t._s(e.row.status?"隐藏":"显示")+"\n          ")]):t._e()]}}])})],1):t._e()],1),t._v(" "),a("el-dialog",{staticClass:"left remove",attrs:{title:t.params.proId?"编辑项目":"新增项目",visible:t.dialogVisible,"close-on-click-modal":!1,width:"480px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"projectForm",staticClass:"demo-ruleForm",attrs:{model:t.params,rules:t.rules,"label-width":"100px",inline:!0}},[a("el-form-item",{attrs:{label:"项目名称",prop:"proName"}},[a("el-input",{staticStyle:{width:"310px"},model:{value:t.params.proName,callback:function(e){t.$set(t.params,"proName",e)},expression:"params.proName"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.beforeSubmit("projectForm")}}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var n=a("Z0/y")(i,r,!1,function(t){a("CANp")},"data-v-64e992f3",null);e.default=n.exports},CANp:function(t,e){}});
//# sourceMappingURL=20.9b3071342efea155f797.js.map