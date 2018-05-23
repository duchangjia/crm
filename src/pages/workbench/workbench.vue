<template lang="html">
  <div class="work-wrap clearfix">
    <div class="work-left" :class="{'addFixd' : addFixd}" ref="workLeft" :style="`height:${heightH}px; overflow-y: scroll;`">
      <el-tabs type="border-card" class="" @tab-click="tabToogle">
        <el-tab-pane class="tab" label="新机会" name="0">

          <el-input placeholder="请输入内容" v-model="searchVal"  class="input-with-select"  size="small" @keyup.enter.native="findstutentList">
            <el-select slot="prepend" placeholder="请选择" :style="`width:100px;`" v-model="searchID">
              <el-option v-for='(item,index) in searchList' :key="index"  :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-input>
          <!-- 显示隐藏筛选 -->

          <div class="toggle" @click="screenShow = !screenShow">
            <el-button type="text">{{screenShow ? '隐藏更多筛选条件': '更多筛选条件'}}</el-button>
            <i slot="prefix" style="color:#409EFF;margin-left:-5px;" class="el-icon-download"></i>
          </div>
          <!-- 筛选弹框 -->
          <transition name="fade">
            <v-search v-on:find="find" v-on:esc="esc" v-show="screenShow" ref="vSearch" @click="vSearch" :intentSubject="intentSubject" :tabIndex="tabIndex"></v-search>
          </transition>
          <!-- tab筛选 -->
          <ul class="radio-group">
            <li style="width:50%;"
              label="item.label"
              :class="index == screentab.tabCurrent ? 'cur' : ''"
              v-for="(item,index) in screentab.list"
              @click="screentabEvent(item.id)"
            >{{item.label}}</li>
          </ul>
          <!-- 分割线 -->
          <v-line v-if="stuCardList.length" :num="page.totalItem"></v-line>
          <v-line v-else num="0"></v-line>
          <!-- 学员列表 -->
          <v-studentlist  :stuCardList="stuCardList" ></v-studentlist>
        </el-tab-pane>

        <el-tab-pane class="tab" label="预约单" name="3">
          <!-- 搜索 -->
          <el-input placeholder="请输入内容" v-model="searchVal"  class="input-with-select"  size="small" @keyup.enter.native="findstutentList">
            <el-select slot="prepend" placeholder="请选择" :style="`width:100px;`" v-model="searchID">
              <el-option v-for='(item,index) in searchList' :key="index"  :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-input>
          <!-- 显示隐藏筛选 -->

          <div class="toggle" @click="screenShow = !screenShow">
            <el-button type="text">{{screenShow ? '隐藏更多筛选条件': '更多筛选条件'}}</el-button>
            <i slot="prefix" style="color:#409EFF;margin-left:-5px;" class="el-icon-download"></i>
          </div>
          <!-- 筛选弹框 -->
          <transition name="fade">
            <v-search v-on:find="find" v-on:esc="esc" v-show="screenShow" ref="vSearch" @click="vSearch" :intentSubject="intentSubject" :tabIndex="tabIndex"></v-search>
          </transition>

          <!-- 分割线 -->
          <v-line v-if="stuCardList.length" :num="page.totalItem"></v-line>
          <v-line v-else num="0"></v-line>
          <!-- 学员列表 -->
          <v-studentlist  :stuCardList="stuCardList" ></v-studentlist>
        </el-tab-pane>

        <el-tab-pane class="tab" label="回访" name="2">
          <!-- 搜索 -->
          <!-- 搜索 -->
          <el-input placeholder="请输入内容" v-model="searchVal"  class="input-with-select"  size="small" @keyup.enter.native="findstutentList">
            <el-select slot="prepend" placeholder="请选择" :style="`width:100px;`" v-model="searchID">
              <el-option v-for='(item,index) in searchList' :key="index"  :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-input>
          <!-- 显示隐藏筛选 -->

          <div class="toggle" @click="screenShow = !screenShow">
            <el-button type="text">{{screenShow ? '隐藏更多筛选条件': '更多筛选条件'}}</el-button>
            <i slot="prefix" style="color:#409EFF;margin-left:-5px;" class="el-icon-download"></i>
          </div>
          <!-- 筛选弹框 -->
          <transition name="fade">
            <v-search v-on:find="find" v-on:esc="esc" v-show="screenShow" ref="vSearch" @click="vSearch" :intentSubject="intentSubject" :tabIndex="tabIndex"></v-search>
          </transition>

          <ul class="radio-group">
            <li style="width:25%;"
              label="item.label"
              :class="index == screentabReturn.tabCurrent ? 'cur' : ''"
              v-for="(item,index) in screentabReturn.list"
              @click="screentabReturnEvent(item.id)"
            >{{item.label}}</li>
          </ul>

          <!-- 分割线 -->
          <v-line v-if="stuCardList.length" :num="page.totalItem"></v-line>
          <v-line v-else num="0"></v-line>
          <!-- 学员列表 -->
          <v-studentlist  :stuCardList="stuCardList" ></v-studentlist>

        </el-tab-pane>
        <el-tab-pane class="tab" label="领取" name="1">
          <!-- 搜索 -->
          <el-input placeholder="请输入内容" v-model="searchVal"  class="input-with-select"  size="small" @keyup.enter.native="findstutentList">
            <el-select slot="prepend" placeholder="请选择" :style="`width:100px;`" v-model="searchID">
              <el-option v-for='(item,index) in searchList' :key="index"  :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-input>
          <!-- 显示隐藏筛选 -->

          <div class="toggle" @click="screenShow = !screenShow">
            <el-button type="text">{{screenShow ? '隐藏更多筛选条件': '更多筛选条件'}}</el-button>
            <i slot="prefix" style="color:#409EFF;margin-left:-5px;" class="el-icon-download"></i>
          </div>
          <!-- 筛选弹框 -->
          <transition name="fade">
            <v-search v-on:find="find" v-on:esc="esc" v-show="screenShow" ref="vSearch" @click="vSearch" :intentSubject="intentSubject" :tabIndex="tabIndex"></v-search>
          </transition>

          <!-- 分割线 -->
          <v-line v-if="stuCardList.length" :num="page.totalItem"></v-line>
          <v-line v-else num="0"></v-line>
          <!-- 学员列表 -->
          <v-studentlist  :stuCardList="stuCardList" ></v-studentlist>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="work-right" :style="`height:${heightH}px`">
      <div v-if="$route.path == '/workbench' " style="background:url(/static/img/workbench/tip.png) no-repeat center; width:100%; height:329px; margin-top:200px;"></div>
      <transition v-else>
        <router-view v-if="intentSubject.length" :intentSubject="intentSubject"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Vsearch from './left/search.vue'; // 搜索组件
import Vstudentlist from './left/student-list.vue'; // 学员列表组件
import Vline from './left/line.vue'; // 分割组件
import { Loading } from 'element-ui';

export default {
  components:{
    'v-search': Vsearch,
    'v-studentlist': Vstudentlist,
    'v-line': Vline
  },
  created(){
    //这里主要是为了 获取dom
    setTimeout(()=>{
      this.leftscroll();
      this.heightH = window.innerHeight - 80
    })
    console.log(this.$store.state);
    //this.qryMyStuInfo();
    //this.qryAllProject();
  },
  data(){
    return {
      workList : 1,
      // 页码
      page:{
        pageIndex: 0, // 当前页
      	pageSize: 0, // 每页的条数
      	totalItem: 0, // 总条数
      	totalPage: 0   // 总页数
      },
      pageSize: 10, // 每页显示几条
      screenShow : false,
      // 滚动节流
      timer : null,
      heightH : 0,
      // tab的index
      tabIndex : 0,
      addFixd : false,
      searchVal: "",
      searchID: "",
      stuCardList : [],
      // 意向项目
      intentSubject:[],
      screentab : {
        list : [
          {id:0, label:"今天"},
          {id:1, label:"更早"}
        ],
        tabCurrent : -1
      },
      screentabReturn  : {
        list : [
          {id:0, label:"今天"},
          {id:1, label:"本周"},
          {id:2, label:"跨期"},
          {id:3, label:"即将过期"}
        ],
        tabCurrent : -1
      },
      backscreentab : {
        list : ['今天','本周','跨期','即将过期'],
        tabCurrent : '今天'
      },
      searchList: [
        { id: 0, label: "手机" },
        { id: 1, label: "座机" },
        { id: 2, label: "微信" },
        { id: 3, label: "QQ" },
        { id: 4, label: "ID" },
        { id: 5, label: "昵称" },
      ]
    }
  },
  methods : {
    //获取学员列表
    qryMyStuInfo (selectType, selectValue, newChanceType, returnType){
      // 获取 用户ID
      this.userId = this.$store.state.user.userInfo.userId

      /*this.API.qryMyStuInfo({
        type: this.tabIndex,
        userId: this.userId,
        pageSize: this.pageSize ,
        // 精确查找
        selectType,
        selectValue,
        // 今天更早
        newChanceType,
        // 回访时间筛选 0今天 1本周 2跨期 3即将过期
        returnType
      })
      .then(res=>{
        // 学员列表
        this.stuCardList = res.result || [];
        this.page = res.page
      }).catch(err => {
        this.stuCardList=[];
        console.log(err.message)
      });*/
    },
    // 查找数据
    find (data){
      //console.log(data);
      this.stuCardList = data.stuCardList;
      this.screenShow = data.screenShow;
    },
    // 取消查找
    esc (data){
      console.log(data);
      this.screenShow=data;
    },
    // tab筛选 查找
    tabcurEv (){
      console.log(this.screentab.tabCurrent);

    },
    tabToogle(tab, event){
      this.tabIndex = tab.name;
      //this.qryMyStuInfo();
      // 左侧列表的当前项
      this.$store.state.workbench.curIndex = -1;
      this.vSearch(this.tabIndex);
    },
    vSearch(index){
      // 让子组件的方法执行
      this.$refs.vSearch.vSearch(index);
    },
    // 回车精确查找
    findstutentList(){
      // 搜索的值
      let selectType = this.searchID;
      let selectValue = this.searchVal;
     // this.qryMyStuInfo(selectType,selectValue);
    },
    // 今天更早
    screentabEvent(id){
      let newChanceType = id;
      this.screentab.tabCurrent = id;
      let selectType = null;
      let selectValue = null;
      //this.qryMyStuInfo(selectType, selectValue, newChanceType);
    },
    // 今天 1本周 2跨期 3即将过期
    screentabReturnEvent(id){
      let returnType = id;
      this.screentabReturn.tabCurrent = id;
      let newChanceType = null;
      let selectType = null;
      let selectValue = null;
      //this.qryMyStuInfo(selectType, selectValue, newChanceType, returnType);
    },
    // 左侧下拉加载
    leftscroll(){
      let obj = this.$refs.workLeft;
      var tabsHeight = obj.querySelectorAll(".tab");

      obj.onscroll=()=>{
        // 文档的高度 - 左边盒子的高度 + 80
        let leftBoxHeight = tabsHeight[this.tabIndex].clientHeight - obj.offsetHeight + 80;
        // 滚动条的滚动的距离
        let scrollTop = obj.scrollTop;
        if (leftBoxHeight - scrollTop <= 10) {
          // 滚动节流
          clearTimeout(this.timer)
          this.timer=setTimeout( ()=>{
            console.log('到底了');
            // 如果只有一页 return;
            if(this.page.totalPage == 1) return;

            // 等于总页数
            if(this.page.pageIndex === this.page.totalPage){
              this.$message({
                message: '别滑了,我是有底线的',
                type: 'warning'
              })
              return;
            }
            // 如果 有2页以上  到底了就加加
            this.page.pageIndex++;
            let loadingInstance = Loading.service({ fullscreen: true });
            /*this.API.qryMyStuInfo({
              type: this.tabIndex,
              userId: this.userId,
              pageSize: this.pageSize,
              pageIndex: this.page.pageIndex
            })
            .then(res=>{
              // 拼接数组
              this.stuCardList = [...this.stuCardList,...res.result]
              loadingInstance.close();
              obj.scrollTo(0,a-5);//拉到底就把滚动条往上少拉5px
            }).catch(err => {
              console.log(err.message)
            });*/
          },300)

        }
      }
      // 文档滚动到底部后 把左侧固定
      document.onscroll=()=>{
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= 100) {
          this.addFixd=true
          this.heightH = window.innerHeight
        }
        else{
          this.addFixd=false;
          this.heightH = window.innerHeight
        }
      }
    },
    // 获取所有项目列表
    /*qryAllProject(){
      this.API.qryAllProject()
      .then(res=>{
        //console.log(res);
        this.intentSubject = res.list;
      }).catch(err => {
        console.log(err.message)
      });
    }*/
  },
  // 离开页面后执行
  destroyed(){
    this.$store.state.workbench.status = true;
  }
}
</script>

<style lang="scss" scoped>
  .work-wrap{
    // overflow: hidden;
    background: #f3f3f3;
    .work-left{
      width:366px;
      float: left;
      height: 500px;
      position: fixed;
      top: 75px;
      left: 10px;
      z-index: 20;
      &.addFixd{
        top: 0px;
      }
      .screentab{
        width: 100%;
        .item{
          display: block;
          float: left;
          width: 50%;
          span{
            display: block;
            width: 100%;
            text-align: center;
          }
          .el-radio-button__inner{
            width: 100%;
            display: block;
            width: 100%;
            padding: 0;
            height: 35px;
            line-height: 35px;
          }
        }
      }
      .radio-group{
        overflow: hidden;
        li{
          padding: 6px 15px;
          font-size: 12px;
          border: 1px solid #dcdfe6;
          float: left;
          text-align: center;
          &+li{
            border-left: none;
            cursor: pointer;
          }
          &:first-child{
            border-radius: 4px 0 0 4px;
          }
          &:last-child{
            border-radius: 0px 4px 4px 0px;
          }
          &.cur{
            background: #409EFF;
            color: #fff;
          }
        }
      }
    }
    .work-right{
      float: left;
      width: calc(100% - 350px);
      margin-left: 350px;
    }
  }
</style>

<style lang="scss">
.work-wrap {
   .work-left{

     .el-tabs--border-card{
       box-shadow: none;
     }

     .el-tabs--border-card>.el-tabs__header{
       border: none;
     }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
       border-top: 4px solid #409EFF;
     }
     .el-tabs--border-card>.el-tabs__header .el-tabs__item{
       border-top: 4px solid #f5f7fa;
     }
     .el-tabs__item{
       padding: 0px 30px;
     }
      .el-tabs__content{
       overflow: inherit;
     }
      .fade-enter-active, .fade-leave-active {
       transition: opacity .5s;
     }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
       opacity: 0;
     }
     .el-tabs__content{
       margin-top: 40px;
     }
     .screentab .item{
       width: 50%;
       span{
         width: 100%;
       }
     }
     .toggle{
       margin-top: 10px;
     }
   }
   .el-tabs--border-card>.el-tabs__header{
    position: fixed;
    top: 75px;
    z-index: 555555555;
  }
  .addFixd .el-tabs--border-card>.el-tabs__header{
    top: 0px;
  }
  .el-input-group__prepend{
    background: transparent;
  }

}


</style>
