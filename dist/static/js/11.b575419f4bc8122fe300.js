webpackJsonp([11],{Q4Dq:function(e,t){},QWn4:function(e,t){},Ypsb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("aA9S"),i=a.n(s),l=a("4YfN"),n=a.n(l),r=a("9rMa"),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"work-search"},[a("el-form",{ref:"searchForm",staticClass:"demo-ruleForm",attrs:{model:e.params,rules:e.rules,size:"mini",inline:!0}},[a("el-form-item",{attrs:{label:"分配时间：",prop:"allotTime"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至",size:"small","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.params.allotTime,callback:function(t){e.$set(e.params,"allotTime",t)},expression:"params.allotTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最后跟进：",prop:"followTime"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至",size:"small","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.params.followTime,callback:function(t){e.$set(e.params,"followTime",t)},expression:"params.followTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"回访计划：",prop:"backTime"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至",size:"small","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.params.backTime,callback:function(t){e.$set(e.params,"backTime",t)},expression:"params.backTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"意向项目：",prop:"intentSubject"}},[a("el-select",{staticStyle:{width:"248px"},attrs:{placeholder:"请选择"},model:{value:e.params.intentSubject,callback:function(t){e.$set(e.params,"intentSubject",t)},expression:"params.intentSubject"}},e._l(e.projectOptions,function(e,t){return a("el-option",{key:t,attrs:{label:"学历1980",label:e.proName,value:e.proId}})}))],1),e._v(" "),a("el-form-item",{staticClass:"mt10",attrs:{label:"意 向 度：",prop:"degree"}},[a("el-radio-group",{model:{value:e.params.degree,callback:function(t){e.$set(e.params,"degree",t)},expression:"params.degree"}},e._l(e.degreeOptions,function(e,t){return a("el-radio-button",{key:t,attrs:{label:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"预约记录：",prop:"existsAdvance"}},[a("el-radio-group",{model:{value:e.params.existsAdvance,callback:function(t){e.$set(e.params,"existsAdvance",t)},expression:"params.existsAdvance"}},e._l(e.statusOptions,function(e,t){return a("el-radio-button",{key:t,attrs:{label:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"订单记录：",prop:"existsOrder"}},[a("el-radio-group",{model:{value:e.params.existsOrder,callback:function(t){e.$set(e.params,"existsOrder",t)},expression:"params.existsOrder"}},e._l(e.statusOptions,function(e,t){return a("el-radio-button",{key:t,attrs:{label:e}})}))],1),e._v(" "),a("div",{staticClass:"item mt20 tac"},[a("el-button",{on:{click:function(t){e.$emit("change")}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(t){e.$refs.searchForm.resetFields()}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleSearch("searchForm")}}},[e._v("查询")])],1)],1)],1)},staticRenderFns:[]};var c={components:{SearchDialog:a("Z0/y")({props:["projectOptions"],data:function(){return{params:{allotTime:"",followTime:"",backTime:""},rules:{},degreeOptions:["强","中","弱","无"],statusOptions:["有","无"]}},watch:{},methods:{handleSearch:function(){var e=this.params,t=this.degreeOptions.indexOf(e.degree)+1;this.$emit("change",{beginAllocTime:e.allotTime[0],endAllocTime:e.allotTime[1],beginFollowTime:e.followTime[0],endFollowTime:e.followTime[1],beginBackTime:e.backTime[0],endBackTime:e.backTime[1],intentSubject:e.intentSubject,degree:t,existsAdvance:"有"==e.existsAdvance?0:1,existsOrder:"有"==e.existsOrder?0:1})}}},o,!1,function(e){a("Q4Dq")},null,null).exports},props:["tabIndex","projectOptions"],data:function(){return{loading:!1,wrapHeight:500,params:{selectType:""},pageIndex:1,list:[],page:{},activeItem:{},searchVisible:!1,iconOptions:["tel","zj","weixin","qq","nc"],newOptions:[{id:0,label:"今天"},{id:1,label:"更早"}],returnOptions:[{id:0,label:"今天"},{id:1,label:"本周"},{id:2,label:"跨期"},{id:3,label:"即将过期"}],searchOptions:[{id:0,label:"手机"},{id:1,label:"座机"},{id:2,label:"微信"},{id:3,label:"QQ"},{id:4,label:"ID"},{id:5,label:"昵称"}]}},computed:n()({},Object(r.d)({userInfo:function(e){return e.user.userInfo}})),watch:{},created:function(){},mounted:function(){var e=this;this.wrapHeight=window.innerHeight-140;var t=this.$refs.scrollWrap,a=this.$refs.scrollBody;t.onscroll=function(){var s=a.clientHeight,i=t.scrollTop;if(e.pageIndex>=e.page.totalPage)return console.log("加载完毕"),void(e.loading=!0);s-i-e.wrapHeight<=10&&(console.log("到底了~"),e.qryMyStuInfo({pageIndex:++e.pageIndex}))}},methods:{qryMyStuInfo:function(e){var t=this;if(!this.loading){this.loading=!0;var a=i()(e,{type:[0,3,2,1][this.tabIndex],userId:this.userInfo.userId});this.API.qryMyStuInfo(a).then(function(e){t.loading=!1,e.result&&e.result.length&&(t.list=t.list.concat(e.result),t.page=e.page)}).catch(function(e){console.log(e.message),t.list=[]})}},resetStatus:function(){this.list=[],this.page={}},simpleSearch:function(){this.resetStatus(),this.qryMyStuInfo({pageIndex:1,selectType:this.params.selectType,selectValue:this.params.selectValue})},newChanceSearch:function(e){this.resetStatus(),this.params.newChanceType=e.id,this.qryMyStuInfo({pageIndex:1,selectType:this.params.selectType,selectValue:this.params.selectValue,newChanceType:e.id})},returnSearch:function(e){this.resetStatus(),this.params.returnType=e.id,this.qryMyStuInfo({pageIndex:1,selectType:this.params.selectType,selectValue:this.params.selectValue,returnType:e.id})},handleSearchChange:function(e){this.resetStatus(),console.log(e),this.searchVisible=!1,this.qryMyStuInfo(n()({pageIndex:1},e))},clickItem:function(e){this.activeItem=e,this.$router.push("/work-center/student-detail/"+e.stuId)}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"scrollWrap",staticClass:"scroll-wrap",style:{height:e.wrapHeight+"px"}},[a("div",{ref:"scrollBody",staticClass:"scroll-body"},[a("el-input",{attrs:{size:"small",placeholder:"请输入内容"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.simpleSearch(t):null}},model:{value:e.params.selectValue,callback:function(t){e.$set(e.params,"selectValue",t)},expression:"params.selectValue"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.params.selectType,callback:function(t){e.$set(e.params,"selectType",t)},expression:"params.selectType"}},e._l(e.searchOptions,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.id}})}))],1),e._v(" "),a("div",{staticClass:"toggle mt10"},[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.searchVisible=!e.searchVisible}}},[e._v(e._s(e.searchVisible?"隐藏":"")+"更多筛选条件")]),e._v(" "),a("i",{staticClass:"el-icon-download",staticStyle:{color:"#409EFF","margin-left":"-5px"},attrs:{slot:"prefix"},slot:"prefix"})],1),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.searchVisible?a("search-dialog",{ref:"searchDialog",attrs:{"project-options":e.projectOptions},on:{change:e.handleSearchChange}}):e._e()],1),e._v(" "),0==e.tabIndex?a("ul",{staticClass:"radio-group radio-group-2 mt10"},e._l(e.newOptions,function(t,s){return a("li",{key:s,class:{active:t.id==e.params.newChanceType},on:{click:function(a){e.newChanceSearch(t)}}},[e._v(e._s(t.label))])})):2==e.tabIndex?a("ul",{staticClass:"radio-group radio-group-4 mt10"},e._l(e.returnOptions,function(t,s){return a("li",{key:s,class:{active:t.id==e.params.returnType},on:{click:function(a){e.returnSearch(t)}}},[e._v(e._s(t.label))])})):e._e(),e._v(" "),a("div",{staticClass:"student-number"},[a("span",[e._v("共有"+e._s(e.page.totalItem||0)+"个名片")])]),e._v(" "),e.list&&e.list.length?a("ul",{staticClass:"student-list"},e._l(e.list,function(t,s){return a("li",{key:t.stuId,staticClass:"item",class:{active:t.stuId==e.activeItem.stuId},on:{click:function(a){e.clickItem(t)}}},[a("div",{staticClass:"row"},[a("span",{staticClass:"name"},[a("i",{staticClass:"icon",class:e.iconOptions[t.type]}),e._v(" "),a("span",[e._v(e._s(t.contact))])]),e._v(" "),a("span",{staticClass:"gray fr"},[e._v("\n            "+e._s(t.allotDate+" "+t.allotTime)+"\n          ")])]),e._v(" "),a("div",{staticClass:"row"},[a("strong",{directives:[{name:"show",rawName:"v-show",value:!t.follow,expression:"!item.follow"}]},[e._v("未跟进")]),e._v(" "),a("strong",{directives:[{name:"show",rawName:"v-show",value:t.follow,expression:"item.follow"}]},[e._v(e._s(t.follow)+"次\n            "),a("span",{staticClass:"text"},[e._v(e._s(t.endDate+" "+t.endTime))])]),e._v(" "),"0"==t.friend?a("i",{staticClass:"icon icon-ok fr",attrs:{title:"已加好友"}}):a("i",{staticClass:"icon icon-no fr",attrs:{title:"未加好友"}})])])})):e._e(),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loading"},[e._v("\n      "+e._s(this.pageIndex>=this.page.totalPage?"到底了～":"加载中...")+"\n    ")])],1)])},staticRenderFns:[]};var d={components:{StudentList:a("Z0/y")(c,p,!1,function(e){a("ZYxj")},"data-v-2e95d640",null).exports},created:function(){},mounted:function(){var e=this;this.mainHeight=window.innerHeight-100,document.onscroll=function(){var t=document.body.scrollTop||document.documentElement.scrollTop;e.fixed=t>=60}},data:function(){return{tabIndex:0,mainHeight:500,fixed:!1,tabOptions:["新机会","预约单","回访","领取"],projectOptions:null,timer:null}},methods:{qryAllProject:function(){var e=this;this.API.qryAllProject().then(function(t){e.projectOptions=t.list}).catch(function(e){console.log(e.message)})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"work-center clearfix"},[a("div",{ref:"workLeft",staticClass:"work-sidebar",class:{fixed:e.fixed},style:{height:e.mainHeight+"px"}},[a("el-tabs",{style:{height:e.mainHeight+"px"},attrs:{type:"border-card"},on:{"tab-click":function(t){e.tabIndex=Number(t.index)}}},e._l(e.tabOptions,function(t,s){return a("el-tab-pane",{key:s,attrs:{label:t}},[e.tabIndex==s?a("student-list",{attrs:{"tab-index":e.tabIndex,"project-options":e.projectOptions}}):e._e()],1)}))],1),e._v(" "),a("div",{staticClass:"work-main",style:{height:e.mainHeight+"px"}},["/work-center"==e.$route.path?a("div",{staticClass:"empty-wp"}):a("transition",[a("router-view")],1)],1)])},staticRenderFns:[]};var m=a("Z0/y")(d,u,!1,function(e){a("hS/U"),a("QWn4")},"data-v-56f9e44a",null);t.default=m.exports},ZYxj:function(e,t){},"hS/U":function(e,t){}});
//# sourceMappingURL=11.b575419f4bc8122fe300.js.map