<template>
  <div class="full-page">
    <common-header></common-header>
    <div :class='{"main-container": true,"sidebarHide": hideSidebarFlag}'>
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <!--小能客服-->
    <div class="chatContainer" @click="showChatModal" v-if="showModal">
      <div class="chatmain">
        系统接入学员信息填写
      </div>
    </div>

    <!--小能客服弹框-->
    <el-dialog
      center
      :visible.sync="showChat"
      width="800px">
      <span slot="title" class="title-header left">学员信息</span>
      <el-form ref="chatForm" :model="chatData" label-suffix="：" label-width="100px" :rules="chatRule">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nick">
              <el-input v-model="chatData.nick" placeholder="学员姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="chatData.mobile" placeholder="手机" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="座机" prop="machine">
              <el-input v-model="chatData.machine" placeholder="座机" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="qq" prop="tencent">
              <el-input v-model="chatData.tencent" placeholder="qq" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="chatData.wechat" placeholder="微信" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="意向项目" prop="intentSubject">
              <el-select v-model="chatData.intentSubject" placeholder="请选择" class="full-width" clearable>
                <el-option v-for="(item,index) in projectoptions"
                           :key="index"
                           :label="item.proName"
                           :value="item.proId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="聊天内容" prop="remark">
              <el-input type="textarea" v-model="chatData.remark" placeholder="请复制聊天内容"
                        :autosize="{ minRows: 4}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="margin-left-10 text-center" :class="{red:error}">注：四种联系方式至少填写一种</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="showChat=false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CommonHeader from '@/components/common/header';
  import {mapState} from'vuex'
  export default {
    data() {
      let validateContact = (rule, value, callback) => {
        const {mobile, machine, wechat, tencent} = this.chatData;
        if (!mobile && !machine && !wechat && !tencent) {
          this.error = true;
          callback();
        } else {
          this.error = false;
          callback();
        }
      };
      return {
        error: false,
        hideSidebarFlag: false,
        showChat: false,
        projectoptions: [],
        chatData: {
          nick: '',
          mobile: '',
          machine: '',
          tencent: '',
          wechat: '',
          intentSubject: '',
          remark:''
        },
        chatRule: {
          mobile: [
            {pattern: '^1[23456789]\\d{9}$', message: '请填写正确手机号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          wechat: [
            {pattern: '^[a-zA-Z\\d_]{5,}$', message: '请填写正确微信号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          tencent: [
            {pattern: '^\\d{5,10}$', message: '请填写正确qq号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          machine: [
            {pattern: '^(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}$', message: '请填写正确座机号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          nick: [
            {required: true, message: '请填写学员姓名'},
          ],
          intentSubject: [
            {required: true, message: '请选择意向项目'}
          ],
        }
      }
    },
    created() {
      //获取项目
      /*this.API.qryAllProject().then((res) => {
        this.projectoptions = res.list;
      });*/
    },
    computed:{
      ...mapState({
        userData: state => state.user.userInfo,
      }),
      showModal(){
        //暂时只能是客服、客服组长、客服经理才能录入
        const roleName=this.userData.roleName;
        if(roleName==='在线客服'||roleName==='客服组长'||roleName==='客服经理'){
          return true
        }else {
          return false;
        }
      }
    },
    components: {
      CommonHeader
    },
    methods: {
      showChatModal(){
        this.$refs['chatForm']&&this.$refs['chatForm'].resetFields();
        this.showChat=true;
      },
      hideSidebar(value) {
        this.hideSidebarFlag = value;
      },
      save() {
        this.$refs['chatForm'].validate((valid) => {
          if (valid) {
            this.API.from(this.chatData).then(()=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.showChat=false
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .chatContainer {
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    right: 20px;
    bottom: 30px;
    background-color: orange;
    cursor: pointer;
    .chatmain {
      text-align: center;
      font-size: 14px;
      color: white;
      width: 80px;
      margin: auto;
      position: relative;
      top: 25px;
    }
  }

  .home-header {
    height: 60px;
  }

  .red {
    color: red;
  }

  @media screen and (max-width: 680px) { /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
    .home-header {
      min-width: 1280px;
    }
    .wrapper {
      min-width: 1280px;
    }
  }

  .container-wrapper {
    min-height: 100%;
    /*min-height: 600px;*/
    margin-left: 180px;
    background: #f4f4f4;
    transition: margin-left 0.28s ease-out;
  }

  .wrapper.sidebarHide .container-wrapper {
    margin-left: 60px;
  }

</style>
