<template>
  <div class="work-center clearfix">
    <div class="work-sidebar" :class="{fixed}" ref="workLeft" :style="{height: mainHeight + 'px'}">
      <el-tabs class="" type="border-card" @tab-click="(tab) => { tabIndex = Number(tab.index) }" :style="{height: mainHeight + 'px'}">
        <el-tab-pane :label="item" v-for="(item, key) in tabOptions" :key="key" >
          <student-list v-if="tabIndex == key" :tab-index="tabIndex" :project-options="projectOptions"></student-list>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="work-main" :style="{height: mainHeight + 'px'}">
      <div class="empty-wp" v-if="$route.path == '/work-center'"></div>
      <transition v-else>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import StudentList from './children/student-list'  // 学员列表组件

export default {
  components:{
    StudentList,
  },
  created(){
    //this.qryAllProject()
  },
  mounted() {
    this.mainHeight = window.innerHeight - 100

    document.onscroll = ()=>{
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop >= 60) {
        this.fixed = true
        //this.mainHeight = window.innerHeight - 40
      } else{
        this.fixed = false;
        //this.mainHeight = window.innerHeight - 100
      }
    }
  },
  data() {
    return {
      tabIndex: 0,
      mainHeight: 500,
      fixed: false,
      tabOptions: ['新机会', '预约单', '回访', '领取'],
      projectOptions: null,
      timer: null,
    }
  },
  methods: {
    qryAllProject() {
      this.API.qryAllProject().then(res => {
        this.projectOptions = res.list
      }).catch(err => {
        console.log(err.message)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.work-center{
  background: #f3f3f3;
  .work-sidebar{
    width: 360px;
    float: left;
    height: 500px;
    position: absolute;
    top: 0px;
    //left: 10px;
    z-index: 20;
    //overflow-y: auto;
    overflow: hidden;
    &.fixed{
      position: fixed;
      top: 20px;
    }
  }
  .work-main{
    float: left;
    width: calc(100% - 350px);
    margin-left: 360px;
  }
}
.empty-wp {
  background:url(/static/img/workbench/tip.png) no-repeat center;
  width: 100%;
  height: 600px;
}
</style>

<style lang="scss">
.work-sidebar{
  .el-tabs__content {
    padding: 0 !important;
  }
  .el-tabs__item {
    margin: 0 -1px 0 -1!important;
    padding: 0!important;
    text-align: center;
    width: 90px;
    border-width: 0 1px!important;
    box-sizing: border-box;
  }
}
</style>
