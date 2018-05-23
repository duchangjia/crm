<template>
  <div class="work-search">
    <el-form :model="params" :rules="rules" ref="searchForm" size="mini" :inline="true" class="demo-ruleForm">
      <el-form-item label="分配时间：" prop="allotTime">
        <el-date-picker v-model="params.allotTime" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="最后跟进：" prop="followTime">
        <el-date-picker v-model="params.followTime" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="回访计划：" prop="backTime">
        <el-date-picker v-model="params.backTime" type="daterange" range-separator="至" size="small" start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="意向项目：" prop="intentSubject">
        <el-select v-model="params.intentSubject" placeholder="请选择" style="width:248px;">
          <el-option label="学历1980" v-for="(item, key) in projectOptions" :label="item.proName" :value="item.proId" :key="key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="mt10" label="意 向 度：" prop="degree">
        <el-radio-group v-model="params.degree">
          <el-radio-button v-for="(item, key) in degreeOptions" :label="item" :key="key"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预约记录：" prop="existsAdvance">
        <el-radio-group v-model="params.existsAdvance">
          <el-radio-button v-for="(item, key) in statusOptions" :label="item" :key="key"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="订单记录：" prop="existsOrder">
        <el-radio-group v-model="params.existsOrder">
          <el-radio-button v-for="(item, key) in statusOptions" :label="item" :key="key"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="item mt20 tac">
        <el-button @click="$emit('change')">取消</el-button>
        <el-button type="success" @click="$refs['searchForm'].resetFields()">重置</el-button>
        <el-button type="primary" @click="handleSearch('searchForm')">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props : ['projectOptions'],
  data(){
    return {
      params: {allotTime: '', followTime: '', backTime: ''},
      rules: { },
      degreeOptions: ['强', '中', '弱', '无'],
      statusOptions: ['有', '无']
    }
  },
  watch:{ },
  methods:{
    handleSearch() {
      const params = this.params
      let degree = this.degreeOptions.indexOf(params.degree) + 1

      this.$emit('change', {
        //分配时间
        beginAllocTime: params.allotTime[0],
        endAllocTime: params.allotTime[1],
        //跟进时间
        beginFollowTime: params.followTime[0],
        endFollowTime: params.followTime[1],
        //回访时间
        beginBackTime: params.backTime[0],
        endBackTime: params.backTime[1],
        intentSubject: params.intentSubject, //意向项目
        degree, //意向度
        existsAdvance: params.existsAdvance == '有' ? 0 : 1,  //是否预约过 0是 1否
        existsOrder: params.existsOrder == '有' ? 0 : 1,   //是否有过订单 0是 1否
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
