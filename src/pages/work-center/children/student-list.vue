<template>
  <div class="scroll-wrap" ref="scrollWrap" :style="{height: wrapHeight + 'px'}">
    <div class="scroll-body" ref="scrollBody">
      <el-input class="" v-model="params.selectValue" size="small" @keyup.enter.native="simpleSearch" placeholder="请输入内容">
        <el-select slot="prepend" v-model="params.selectType" placeholder="请选择" style="width:100px;">
          <el-option v-for="(item, key) in searchOptions" :key="key" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-input>

      <!-- 显示/隐藏筛选弹框 -->
      <div class="toggle mt10">
        <el-button type="text" @click="searchVisible = !searchVisible">{{ searchVisible ? '隐藏': '' }}更多筛选条件</el-button>
        <i class="el-icon-download" slot="prefix" style="color:#409EFF;margin-left:-5px;"></i>
      </div>

      <!-- 弹框筛选 -->
      <transition name="fade">
        <search-dialog v-if="searchVisible" ref="searchDialog" :project-options="projectOptions" @change="handleSearchChange"></search-dialog>
      </transition>

      <!-- 条件筛选 -->
      <ul class="radio-group radio-group-2 mt10" v-if="tabIndex == 0">
        <li :class="{active: item.id == params.newChanceType}" v-for="(item, key) in newOptions" :key="key"
          @click="newChanceSearch(item)">{{ item.label }}</li>
      </ul>
      <ul class="radio-group radio-group-4 mt10" v-else-if="tabIndex == 2">
        <li :class="{active: item.id == params.returnType}" v-for="(item, key) in returnOptions" :key="key" @click="returnSearch(item)">{{ item.label }}</li>
      </ul>

      <!-- 学员数 -->
      <div class="student-number">
        <span>共有{{ page.totalItem || 0 }}个名片</span>
      </div>

      <!-- 学员列表 -->
      <ul class="student-list" v-if="list && list.length">
        <li class="item" :class="{active : item.stuId == activeItem.stuId}" @click="clickItem(item)" v-for="(item, key) in list" :key="item.stuId">
          <div class="row">
            <span class="name">
              <i class="icon" :class="iconOptions[item.type]"></i>
              <span>{{ item.contact }}</span>
            </span>
            <span class="gray fr">
              {{ item.allotDate + ' ' + item.allotTime }}
            </span>
          </div>

          <div class="row">
            <strong v-show="!item.follow">未跟进</strong>
            <strong v-show="item.follow" >{{ item.follow }}次
              <span class="text">{{ item.endDate + ' ' + item.endTime }}</span>
            </strong>
            <i class="icon icon-ok fr" v-if="item.friend == '0'" title="已加好友"></i>
            <i class="icon icon-no fr" v-else title="未加好友"></i>
          </div>
        </li>
      </ul>
      <div class="loading" v-show="loading">
        {{ this.pageIndex >= this.page.totalPage ? '到底了～' : '加载中...' }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchDialog from './search-dialog'  // 搜索组件

export default {
  components: {
    SearchDialog,
  },
  props:['tabIndex', 'projectOptions'],
  data() {
    return {
      loading: false,
      wrapHeight: 500,
      params: {
        selectType: '' // 0
      },
      pageIndex: 1,
      list: [],
      page: { },
      activeItem: { },  // 当前选中的学员
      searchVisible: false,
      iconOptions: ['tel','zj','weixin','qq','nc'],  // 图标 是微信 还是手机
      newOptions: [
        {id: 0, label: '今天'},
        {id: 1, label: '更早'}
      ],
      returnOptions: [
        {id: 0, label: '今天'},
        {id: 1, label: '本周'},
        {id: 2, label: '跨期'},
        {id: 3, label: '即将过期'}
      ],
      searchOptions: [
        {id: 0, label: "手机"},
        {id: 1, label: "座机"},
        {id: 2, label: "微信"},
        {id: 3, label: "QQ"},
        {id: 4, label: "ID"},
        {id: 5, label: "昵称"},
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  watch: {
    /*tabIndex(val) {
      this.qryMyStuInfo({ })
    }*/
  },
  created() {
    //this.qryMyStuInfo(this.params);
  },
  mounted() {
    this.wrapHeight = window.innerHeight - 140

    // 下拉加载
    const $scrollWrap = this.$refs.scrollWrap
    const $scrollBody = this.$refs.scrollBody

    $scrollWrap.onscroll = () => {
      const bodyHeight = $scrollBody.clientHeight
      const scrollTop = $scrollWrap.scrollTop

      if (this.pageIndex >= this.page.totalPage) {
        console.log('加载完毕')
        this.loading = true
        return
      }
      if (bodyHeight - scrollTop - this.wrapHeight <= 10) {
        console.log('到底了~')
        this.qryMyStuInfo({ pageIndex: ++this.pageIndex })
      }
    }
  },
  methods: {
    //获取学员列表
    qryMyStuInfo (param) {
      if (this.loading) {
        return
      } else {
        this.loading = true
      }

      const newParam = Object.assign(param, {
        type: [0, 3, 2, 1][this.tabIndex],
        userId: this.userInfo.userId,
      })
      // console.log(newParam)

      this.API.qryMyStuInfo(newParam).then(res => {
        // console.log(res);
        this.loading = false
        if (res.result && res.result.length) {
          this.list = this.list.concat(res.result)  //res.result || [];
          this.page = res.page
        }
      }).catch(err => {
        console.log(err.message)
        this.list = [];
      });
    },
    resetStatus() {
      this.list = []
      this.page = { }
    },
    // 按某个条件条件精确查找
    simpleSearch(){
      this.resetStatus()

      this.qryMyStuInfo({
        pageIndex: 1,
        selectType: this.params.selectType,
        selectValue: this.params.selectValue
      })
    },
    // 新机会 2个TAB搜索
    newChanceSearch(item) {
      this.resetStatus()

      this.params.newChanceType = item.id
      this.qryMyStuInfo({
        pageIndex: 1,
        selectType: this.params.selectType,
        selectValue: this.params.selectValue,
        newChanceType: item.id
       })
    },
    // 回访 4个TAB搜索
    returnSearch(item) {
      this.resetStatus()

      this.params.returnType = item.id
      this.qryMyStuInfo({
        pageIndex: 1,
        selectType: this.params.selectType,
        selectValue: this.params.selectValue,
        returnType: item.id
       })
    },
    // 更多筛选条件条件搜索
    handleSearchChange (data) {
      this.resetStatus()

      console.log(data)
      this.searchVisible = false
      this.qryMyStuInfo({
        pageIndex: 1,
        ...data
      })
    },
    clickItem(item) {
      this.activeItem = item
      this.$router.push('/work-center/student-detail/' + item.stuId)
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-wrap {
  padding: 15px;
  overflow-y: auto;
}
.loading {
  margin: 0px -15px 0;
  padding-top: 20px;
  line-height: 30px;
  text-align: center;
  color: #b2b2b2;
}
.student-number{
  text-align: center;
  width: 100%;
  padding: 0;
  text-indent: 0;
  margin: 20px 0px;
  &:before, &:after {
    content: "";
    position: relative;
    top: -4px;
    display: inline-block;
    width: 90px;
    height: 1px;
    background: #a8b0b9;
   }
   span {
    margin: 0 3px;
    font-size: 14px;
    line-height: 0px;
    text-align: center;
    color: #a8b0b9;
  }
}

.radio-group{
  &.radio-group-2 {
    li {
      width: 50%;
    }
  }
  &.radio-group-4 {
    li {
      width: 25%;
    }
  }
  overflow: hidden;
  li{
    padding: 6px 15px;
    font-size: 12px;
    border: 1px solid #dcdfe6;
    float: left;
    text-align: center;
    &+li{
      border-left: none;
      cursor: pointer;
    }
    &:first-child{
      border-radius: 4px 0 0 4px;
    }
    &:last-child{
      border-radius: 0px 4px 4px 0px;
    }
    &.active{
      background: #409EFF;
      color: #fff;
    }
  }
}

.student-list{
  margin-left: -15px;
  margin-right: -15px;
  border-bottom: 1px solid #e8edf0;
  .msg{
    color: #999;
    font-size: 14px;
    text-align: center;
    padding:20px 0;
  }
  .item{
    overflow: hidden;
    padding:20px 12px;
    border-left: 3px solid #fff;
    border-top: 1px solid #e8edf0;
    &:hover{
      background: #e5f5ff;
      border-left-color: #3aa5fa;
    }
    &.active{
      background: #e5f5ff;
      border-left-color: #3aa5fa;
    }
    .row {
      margin-bottom: 10px;

    }
    .name {
      i {
        margin-right: 8px;
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
    &.icon-ok{
      background: url(/static/img/workbench/statusOK.png);
      width: 20px;
      height: 20px;
    }
    &.icon-no{
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
