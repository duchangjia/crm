<template>
  <el-row v-if="(followList && followList.length) || (addFriendList && addFriendList.length) || (updateList && updateList.length)" :gutter="20" style="padding:0px 15px;">
    <el-col :span="12" v-for="(item, key) in followList" :key="key">
      <!-- 呼叫记录 -->
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header" v-if="item.followMode || item.followMode==0">
          <h3>
            {{ followMode[item.followMode].label || '其他' }}
            <strong v-show="item.source == 1">(去电生成)</strong>
          </h3>
          <p>{{ item.followTime }}</p>
        </div>
        <ul class="follow-bd">
          <li v-show="item.isConnect == 0 || item.isConnect == 1">
            <strong>拨打结果：</strong>
            <p v-if="item.isConnect || item.isConnect == 0">{{ isConnect[item.isConnect].label}}</p>
          </li>
          <li >
            <strong>沟通结果：</strong>
            <p  v-if="item.isValid || item.isValid == 0">{{ item.isValid == 0 ? '无效跟进' : '有效跟进' }}</p>
          </li>
          <li v-if="item.isValid != 0">
            <strong>下次回访时间：</strong>
            <p>{{ item.backTime || none }}</p>
          </li>
          <li>
            <strong>备注：</strong>
            <p>{{ item.remark || none }}</p>
          </li>
        </ul>
      </el-card>
    </el-col>

    <!-- 加好友记录 -->
    <el-col :span="12" v-for="(item, key) in addFriendList"
      :key="key + 1000">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>我已加好友</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd">
          <li>
            <strong>操作人：</strong>
            <p>{{ item.operateName }}</p>
          </li>
          <li>
            <strong>添加方式：</strong>
            <p v-if="item.type || item.type == 0">{{ followMode[item.type].label }}</p>
          </li>
          <li>
            <strong>添加账号：</strong>
            <p>{{ item.remark || none }}</p>
          </li>
        </ul>
      </el-card>
    </el-col>

    <!-- 编辑学员记录 -->
    <el-col :span="12" v-for="(item, key) in updateList" :key="key + 2000">
      <el-card class="follow-item">
        <div class="follow-hd clearfix" slot="header">
          <h3>编辑学员信息</h3>
          <p>{{ item.createTime }}</p>
        </div>
        <ul class="follow-bd">
          <li>
            <strong>操作人：</strong>
            <p>{{ item.operateName || none }}</p>
          </li>
          <li v-if="item.newMobile || item.mobile">
            <strong >修改手机号：</strong>
            <p>{{ item.mobile }} <i class="el-icon-d-arrow-right" v-if="item.mobile && item.newMobile"></i> {{ item.newMobile }} </p>
          </li>
          <li v-if="item.newWechat || item.wechat">
            <strong>修改微信号：</strong>
            <p>{{ item.wechat }} <i class="el-icon-d-arrow-right" v-if="item.wechat && item.newWechat"></i> {{ item.newWechat }} </p>
          </li>
          <li v-if="item.newQq || item.qq">
            <strong>修改QQ：</strong>
            <p>{{ item.qq }} <i class="el-icon-d-arrow-right" v-if="item.qq && item.newQq"></i> {{ item.newQq }} </p>
          </li>
          <li v-if="item.newPhone || item.phone">
            <strong>修改座机号：</strong>
            <p>{{ item.phone }} <i class="el-icon-d-arrow-right" v-if="item.phone && item.newPhone"></i> {{ item.newPhone }} </p>
          </li>
          <li v-if="item.proName || item.newProName">
            <strong>修改意向项目：</strong>
            <p>{{ item.proName }} <i class="el-icon-d-arrow-right" v-if="item.proName && item.newProName"></i> {{ item.newProName }} </p>
          </li>
          <li v-if="item.newRegionName || item.regionName">
            <strong>修改机会地域：</strong>
            <p>{{ item.regionName }} <i class="el-icon-d-arrow-right" v-if="item.regionName && item.newRegionName"></i> {{ item.newRegionName }} </p>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
  <div class="follow-empty" v-else>暂无数据</div>
</template>

<script>
import { isItConnected } from './data'
export default {
  props : ['followList', 'addFriendList', 'updateList'],
  data(){
    return {
      none: '无',
      followMode: [
        {id: 0, label: "手机"},
        {id: 1, label: "座机"},
        {id: 2, label: "微信"},
        {id: 3, label: "QQ"}
      ],
      isConnect: isItConnected,
      isValid: [
        {id: 0, label: "无效沟通"},
        {id: 1, label: "有效沟通"}
      ],
    }
  },
  methods:{

  }
}
</script>

<style scope lang="scss">

</style>
