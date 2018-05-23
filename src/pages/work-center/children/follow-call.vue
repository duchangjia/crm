<template>
  <el-row v-if="callList && callList.length" :gutter="20" style="padding:0px 15px;">
    <el-col :span="12" v-for="(item, key) in (callList && callList.length ? callList : [1])" :key="key">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>咨询师：{{ item.userName || none }}</h3>
          <p>{{item.followTime}}</p>
        </div>
        <ul class="follow-bd">
          <li>
            <strong>拨打结果：</strong>
            <p>{{ '接通' || none }}</p>
          </li>
          <li >
            <strong>通话时长：</strong>
            <p>{{ item.duration || none }}</p>
          </li>
          <li>
            <strong>电话录音：</strong>
            <p v-if="item.url">
              <el-button class="mr10" type="text" @click="playAudio">播放</el-button>
              <audio :src="item.url" ref="player" controls="controls" preload hidden />
              <a class="btn-download" :href="item.url" target="_blank">下载</a>
            </p>
            <p v-else>无</p>
          </li>
          <li>
            <strong>沟通备注：</strong>
            <p>{{item.remark || none }}</p>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
export default {
  props : ['callList'],
  data(){
    return {
      none: '无'
    }
  },
  watch:{ },
  methods:{
    playAudio(evt) {
      //播放音频
      let targetElement = evt.target;
      if(targetElement.tagName!=='SPAN') return;
      let audio = targetElement.parentElement.parentElement.children[1];
      let handle=function () {
        //播放完成后重新load
        audio.load();
        targetElement.innerText = '播放';
      };
      audio.removeEventListener("ended", handle, false);
      audio.addEventListener('ended', handle, false);
      if (audio.paused) {
        audio.play();// 播放
        targetElement.innerText = '暂停'
      } else {
        audio.pause();// 暂停
        targetElement.innerText = '播放'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .btn-download {
    color: #409EFF;
  }
</style>
