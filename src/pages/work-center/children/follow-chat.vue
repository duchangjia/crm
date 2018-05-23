<template>
  <el-row v-if="chatList && chatList.length" :gutter="20" style="padding:0px 15px;">
    <el-col :span="12" v-for="(item, key) in chatList" :key="key">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>接待客服：{{ item.userName || none }}</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd">
          <li >
            <strong style="width: 5em!important">聊天记录：</strong>
            <div style="margin-left: 5em!important">
              <textarea>
              {{ $trim(item.remark) || none }}
              </textarea>
            </div>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
export default {
  props: ['chatList'],
  data(){
    return {
      none: '无',
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
