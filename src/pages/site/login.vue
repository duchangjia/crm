<template>
  <div class="login-wrapper full-page">
    <div class="container">
      <h3 class="title">
        <img src="../../../static/img/login/logo.png"/>
        <span class="margin-left-20">潭州教育</span>
      </h3>
      <div class="content clear">
        <img src="../../../static/img/login/loginImage.png"/>
        <div class="from-cotainer">
          <h3>欢迎登录阿波罗系统</h3>
          <el-form :model="ruleForm" :rules="rules" ref="loginForm" class="form-content">
            <el-form-item prop="username" style="margin-bottom: 30px">
              <el-input v-model="ruleForm.username" @keyup.enter.native="submitForm" placeholder="请输入用户名"
                        class="input-box" style="width: 280px" clearable>
                <span slot="prefix" class="prefix"><img src="../../../static/img/login/account.svg"/>账号</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" style="width: 280px" clearable
                        @keyup.enter.native="submitForm">
                <span slot="prefix" class="prefix"><img src="../../../static/img/login/password.svg"/>密码</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="callCenter" class="text-left">
              <el-checkbox v-model="ruleForm.online" @keyup.enter.native="submitForm" true-label="1"
                           false-label="0">登录呼叫中心
              </el-checkbox>
            </el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: '',
          online: '1'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('USER_LOGIN', this.ruleForm).then((res) => {
              this.$router.push({path: '/home'})
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-wrapper {
    min-height: 600px;
    min-width: 1100px;
    background: url("../../../static/img/login/loginBg.png") no-repeat center center;
    background-size: cover;
    .container {
      width: 1100px;
      height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background: url("../../../static/img/login/loginContainer.png") no-repeat center center;
      .title {
        margin-top: 50px;
        margin-left: 120px;
        img {
          display: inline-block;
          width: 185px;
          height: 52px;
        }
        span {
          font-size: 20px;
          color: rgb(44, 47, 51);
          padding: 2px 12px;
          border-left: 2px solid rgb(44, 47, 51);
          position: relative;
          bottom: 17px;
        }
      }
      .content {
        margin-top: 70px;
        margin-left: 190px;
        img {
          display: inline-block;
          width: 360px;
          height: 285px;
          float: left;
        }
        .from-cotainer {
          margin-left: 75px;
          float: left;
          text-align: center;
          h3 {
            font-size: 17px;
            color: rgb(0, 154, 255);
            margin-bottom: 60px;
            font-weight: 600;
          }
          .prefix {
            img {
              width: 16px;
              height: 16px;
              position: relative;
              top: 11px;
              margin-right: 10px;
            }
            color: rgb(132, 142, 153);
          }
        }
      }
    }
  }
</style>
