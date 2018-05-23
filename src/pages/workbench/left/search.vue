<template lang="html">
  <div class="work-search">
    <!-- 搜索组件 -->
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" size="mini" :inline="true" class="demo-ruleForm">
        <el-form-item class="item" label="分配时间：">
          <el-date-picker v-model="ruleForm2.allotTime" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="item" label="最后跟进：">
          <el-date-picker v-model="ruleForm2.endTime" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="item" label="回访计划：">
          <el-date-picker v-model="ruleForm2.backPlan" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="item" label="意向项目：" >
          <el-select v-model="ruleForm2.orderProject" placeholder="请选择" style="width:248px;">
            <el-option label="学历1980" v-for='(item,index) in intentSubject' :label="item.proName" :value="item.proId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="意 向 度：">
          <el-radio-group v-model="ruleForm2.orderD">
            <el-radio-button label="强" value="1"></el-radio-button>
            <el-radio-button label="中"></el-radio-button>
            <el-radio-button label="弱"></el-radio-button>
            <el-radio-button label="无"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="item" label="预约记录：">
          <el-radio-group v-model="ruleForm2.bespoke">
            <el-radio-button label="有"></el-radio-button>
            <el-radio-button label="无"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="item" label="订单记录：">
          <el-radio-group v-model="ruleForm2.goods">
            <el-radio-button label="有"></el-radio-button>
            <el-radio-button label="无"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item class="item" label="二次进线：">
          <el-radio-group v-model="ruleForm2.two">
            <el-radio-button label="有"></el-radio-button>
            <el-radio-button label="无"></el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item class="item" style="margin-top:20px;">
          <el-button v-on:click="esc">取消</el-button>
          <el-button type="success" @click="resetForm('ruleForm2')">重置</el-button>
          <el-button v-on:click="find" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
export default {
  props : ['intentSubject','tabIndex'],
  data(){
    return {
      screenShow:false,
      SearchTabIndex:0,
      ruleForm2: {
				allotTime: '', // 分配时间
        endTime: '', // 最后跟进
        backPlan: '', // 回访计划
        orderProject: '', // 意向项目
        orderD: '', // 意 向 度
        bespoke: '', // 预约记录
        goods: '', // 订单记录
        two: '', // 二次进线
			},
      rules: {

      }
    }
  },
  //实现 组件之间数据的双向绑定
  watch:{
    //在子组件中 监控一个数据  有变化就 this.$emit("",data); 把数据传给父亲，让父的数据等于 传回来的数据
    tabIndex(val){
      this.SearchTabIndex = val;
    }
  },
  mounted (){
    //this.qryAllProject();
  },
  methods:{
    // 重置
    resetForm(formName) {
      // 不知道为毛，框架的重置用不了
      //this.$refs[formName].resetFields();
      for(let k in this.ruleForm2){
        this.ruleForm2[k] = "";
      }
    },
    vSearch(){

    },
    // 查询
    find(){
      let orderD = "";
      let bespoke = "";
      let goods = "";
      if(this.ruleForm2.orderD == "强"){ orderD = 1 }
      else if (this.ruleForm2.orderD == "中"){ orderD = 2 }
      else if (this.ruleForm2.orderD == "弱"){ orderD = 3 }
      else if (this.ruleForm2.orderD == "无"){ orderD = 4 }

      if(this.ruleForm2.bespoke == "有"){ bespoke = 0 }
      else if(this.ruleForm2.bespoke == "无"){ bespoke = 1 }

      if(this.ruleForm2.goods == "有"){ goods = 0 }
      else if(this.ruleForm2.goods == "无"){ goods = 1 }


      var obj = {
        //分配时间
       beginAllocTime : this.ruleForm2.allotTime[0],
       endAllocTime : this.ruleForm2.allotTime[1],
      //跟进时间
       beginFollowTime : this.ruleForm2.endTime[0],
       endFollowTime : this.ruleForm2.endTime[1],
      //回访时间
       beginBackTime : this.ruleForm2.backPlan[0],
       endBackTime : this.ruleForm2.backPlan[1],
      //意向项目
        intentSubject : this.ruleForm2.orderProject,
      //意向度
        degree : orderD,
      //是否预约过 0是 1否
        existsAdvance : bespoke,
      //是否有过订单 0是 1否
        existsOrder : goods
      }
      obj.type = this.SearchTabIndex;
      console.log(obj.type);
      // 获取 用户ID
      obj.userId = this.$store.state.user.userInfo.userId

      this.qryMyStuInfo(obj);
    },
    // 取消
    esc(){
      this.screenShow = false;
      this.$emit('esc',this.screenShow);
    },
    //获取学员列表
    qryMyStuInfo (obj){
      this.API.qryMyStuInfo(obj)
      .then(res=>{
        if(res){
          // 学员列表
          this.stuCardList = res;
          console.log(res);
          this.$emit("find",{stuCardList:this.stuCardList , screenShow: false});
        }
      })
    },

  }
}
</script>

<style scope lang="scss">
  .work-search{
    position: absolute;
    left: 8px;
    top: 72px;
    background: #fff;
    box-shadow:
      -4px 0px 10px #d5d8d9,   /*左边阴影*/
      0px -4px 10px #d5d8d9,  /*上边阴影*/
      4px 0px 10px #d5d8d9,  /*右边阴影*/
      0px 4px 10px #d5d8d9; /*下边阴影*/
    z-index: 500;
    padding: 10px 15px 20px 15px;
    .el-date-editor--daterange.el-input__inner{
      width: 248px;
    }
    .el-form--inline .el-form-item{
      margin: 0px 0px 13px 0px;
    }
    .el-date-editor .el-range-separator{
      padding: 0px 15px;
    }


  }


</style>
