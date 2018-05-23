<template lang="html">
    <div class="studenList" >
      <p style="background:#F4F4F4; height:2px; width:400px; margin-left:-50px;"></p>
      <div
       v-for="(item,index) in newStuCardList"
       :class="{item : true, cur : index == curIndex ? true : false}"
       @click="openInfo(index,item)">
        <div class="left">
          <p class="one">
            <i class="icon" :class="contactClass[item.type]"></i>
            <span>{{item.contact}}</span>
          </p>
          <strong v-show="!item.follow">未跟进</strong>
          <strong v-show="item.follow" >{{item.follow}}次
            <span class="text">{{item.endDate}}</span>
            <span class="text">{{item.endTime}}</span>
          </strong>
        </div>

        <div class="right">
          <p class="one">
            <span>{{item.allotDate}}</span>
            <span>{{item.allotTime}}</span>
          </p>
          <i class="icon" :class="followClass[item.friend]" :title="item.friend == 0 ? '已加好友' : '未加好友'" style="float:right; margin-top:10px;"></i>
        </div>
      </div>
      <p v-show="stuCardList.length == 0" class="msg">查无学员信息</p>
    </div>
</template>

<script>
export default {
  props:['stuCardList'],
  data(){
    return {
      // 图标 是微信 还是手机
      contactClass: ['tel','zj','weixin','qq','nc'],
      newStuCardList:[],
      // 跟进状态的 图标
      followClass: ['statusOK','statusNO'],
      studenList: [
        {
          contactClass: 1,
          followClass: 0 ,
          mobile:18802691725,
          date:"8/23",
          time: "21:00"
        }
      ],
      curIndex:-1,
    }
  },
  methods: {
    openInfo (index,item) {
      this.curIndex = index;
      // 学员Id
      this.$router.push({
        path:'workbench-info',
        query:{friend:item.friend,stuId:item.stuId}
      });
    }
  },
  created () {
  },
  watch: {
    stuCardList: {
      // 这行代码只是为了实现 当前项
      handler: function (val, oldVal) {
        this.curIndex = this.$store.state.workbench.curIndex;
        if(val.result){
          this.newStuCardList = val.result;
        }
        else{
          this.newStuCardList = val;
        }

      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .studenList{
    margin-left: -15px;
    margin-right: -15px;
    .msg{
      color: #999;
      font-size: 14px;
      text-align: center;
      padding:20px 0;
    }
    .item{
      overflow: hidden;
      padding:20px 10px;
      border-left: 3px solid #fff;
      +.item{
        border-top: 1px solid #e8edf0;
      }
      &:hover{
        background: #e5f5ff;
        border-left:3px solid #3aa5fa;
      }
      &.cur{
        background: #e5f5ff;
        border-left:3px solid #3aa5fa;
      }
      .left{
        float: left;
        color: #3aa5fa;
        font-size: 16px;
        strong{
          color: #4b4b4b;
          display: block;
          margin-top: 10px;
          .text{
            color: #afbdcc;
            font-size: 13px;
            &:first-child{
              margin-left: 10px;
            }
          }
        }
      }
      .right{
        float: right;
        color: #afbdcc;
        font-size: 13px;
        span{
          +span{
            margin-left: 5px;
          }
        }
      }

      .one{
        overflow: hidden;

        span{
          margin-top: 3px;
          display: block;
          float: left;
          margin-left: 6px;
        }

      }

    }
    .icon{
      display: block;
      width: 16px;
      height: 16px;
      float: left;
      background-size: 100% !important;
      background-repeat: no-repeat !important;
      // 跟进状态度
      &.statusOK{
        background: url(/static/img/workbench/statusOK.png);
        width: 20px;
        height: 20px;
      }
      &.statusNO{
        background: url(/static/img/workbench/statusNO.png);
        width: 20px;
        height: 20px;
      }
      // 联系方式
      &.tel{
        background: url(/static/img/workbench/tel.png);
        margin-top: 1px;
      }
      &.weixin{
        background: url(/static/img/workbench/weixin.png);
        margin-top: 3px;
      }
      &.qq{
        background: url(/static/img/workbench/qq.png);
        margin-top: 1px;
      }
      &.nc{
        background: url(/static/img/workbench/nc.png);
        margin-top: 1px;
      }
      &.zj{
        background: url(/static/img/workbench/zj.png);
        margin-top: 3px;
      }
    }

  }
</style>
