webpackJsonp([18],{VZj7:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={components:{},data:function(){return{dialogVisible:!1,params:{roleName:""},list:null,rules:{roleName:[{required:!0,message:"输入不能为空",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 20 个字符",trigger:"blur"}]}}},created:function(){this.getList()},methods:{handleClick:function(){this.$message({type:"error",message:"正在紧张开发中..."})},getList:function(){var e=this;this.API.qryRole().then(function(t){console.log(t),e.list=t.result}).catch(function(e){console.log(e.message)})},updateItem:function(e){this.dialogVisible=!0,this.params={roleId:e.roleId,roleName:e.roleName}},beforeSubmit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.dialogVisible=!1,t.submit()})},submit:function(){var e=this;this.dialogVisible=!1,console.log(this.params),this.API.mdfRole(this.params).then(function(t){e.getList(),e.$message({type:"success",message:"保存成功！"})})}}},i={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"main-inner"},[l("bread-crumb",[l("h2",[e._v("用户组管理")])]),e._v(" "),e.list?l("el-table",{staticClass:"table mt20 tal",staticStyle:{width:"92%","margin-left":"2%"},attrs:{data:e.list}},[l("el-table-column",{attrs:{prop:"roleName",label:"用户组名称"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"text",size:"small"},on:{click:function(l){e.updateItem(t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{type:"text",size:"small"},on:{click:function(l){e.$router.push("/system/role-perm/"+t.row.roleId)}}},[e._v("权限管理")])]}}])})],1):e._e(),e._v(" "),l("el-dialog",{staticClass:"left",attrs:{title:"编辑用户组",visible:e.dialogVisible,"close-on-click-modal":!1,width:"480px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{ref:"updateForm",staticClass:"demo-ruleForm",attrs:{model:e.params,rules:e.rules,inline:!0}},[l("el-form-item",{attrs:{label:"用户组名称：",prop:"roleName"}},[l("el-input",{staticStyle:{width:"310px"},model:{value:e.params.roleName,callback:function(t){e.$set(e.params,"roleName",t)},expression:"params.roleName"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.beforeSubmit("updateForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=l("Z0/y")(s,i,!1,function(e){l("qQ+J")},"data-v-de76beea",null);t.default=a.exports},"qQ+J":function(e,t){}});
//# sourceMappingURL=18.1a5b82e71b86a45d2389.js.map