<template>
  <el-row v-if="advanceList && advanceList.length" :gutter="20" style="padding: 0px 15px;">
    <el-col :span="12" v-for="(item, key) in advanceList" :key="key">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>{{ item.schoolName }}</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd">
          <li>
            <strong>推荐项目：</strong>
            <p>{{ item.proName || none }}</p>
          </li>
          <li >
            <strong>推荐班型：</strong>
            <p>{{ item.cname || none }}</p>
          </li>
          <li>
            <strong>推荐价格：</strong>
            <p>{{ item.price || none }}</p>
          </li>
          <li>
            <strong>推荐原因：</strong>
            <p>{{ item.remark || none }}</p>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
export default {
  props : ['advanceList'],
  data(){
    return {
      none: '无',
      /*fieldOptions: [
        { id: 'proName', label: '推荐项目' },
        { id: 'cname', label: '推荐班型' },
        { id: 'price', label: '推荐价格', suffix: '元' },
        { id: 'remark', label: '推荐原因' },
      ]*/
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>
