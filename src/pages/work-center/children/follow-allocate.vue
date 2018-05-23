<template>
  <el-row v-if="allocateList && allocateList.length" :gutter="20" style="padding:0px 15px;">
    <el-col :span="12" v-for="(item, key) in allocateList" :key="key">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>{{ modeOptions[item.mode] }}</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd">
          <li>
            <strong>接待客服：</strong>
            <p>{{ item.inputUserName || none }}</p>
          </li>
          <li >
            <strong>原归属咨询师：</strong>
            <p>{{ item.beforeUserName || none }}</p>
          </li>
          <li>
            <strong>分配归属咨询师：</strong>
            <p>{{ item.userName || none }}</p>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
export default {
  props: ['allocateList'],
  data(){
    return {
      none: '无',
      modeOptions: ['系统分配', '领取', '手动分配']
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
