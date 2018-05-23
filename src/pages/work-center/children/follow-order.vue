<template>
  <el-row v-if="orderList && orderList.length" :gutter="20" style="padding:0px 15px;">
    <el-col :span="12" v-for="(item, key) in orderList" :key="key">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>订单ID: {{ item.sn }}</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd order-ist">
          <li>
            <strong>姓名：</strong>
            <p>{{ item.name || none }}</p>
          </li>
          <li>
            <strong>{{ item.cardType == '2' ? '港澳台证件' : '身份证' }}：</strong>
            <p>{{ item.cardNo || none }}</p>
          </li>
          <li>
            <strong>省市：</strong>
            <p>{{ item.regionName || none }}</p>
          </li>
          <li>
            <strong>项目：</strong>
            <p>{{ item.proName || none }}</p>
          </li>
          <li>
            <strong>班型：</strong>
            <p>{{ item.cname || none }}</p>
          </li>
          <li>
            <strong>价格：</strong>
            <p>{{ item.price || 0 }}元</p>
          </li>
          <li>
            <strong>优惠金额：</strong>
            <p>{{ item.offsetAmount || 0 }}元</p>
          </li>
          <li>
            <strong>实付金额：</strong>
            <p>{{ item.amount || 0 }}元</p>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
export default {
  props : ['orderList'],
  data(){
    return {
      none: '无',
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>
