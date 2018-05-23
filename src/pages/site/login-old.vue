<template>
  <div id="wrap">
    <div class="login-wrap">
      <div class="header"></div>
      <div class="main">
        <div class="img-wrapper"><img src="../../static/img/login/omc_logo1.png" alt=""></div>
        <div class="form-wrapper">
          <img src="/static/img/login/fly.png" alt="" width="86" height="77" class="fly">
          <el-form :model="ruleForm" :rules="rules" ref="loginForm" class="form-content">
            <span class="title">用户登录</span>
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-button class="tijiao" @click="submitForm">登录</el-button>
          </el-form>
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </div>
      <div class="bottom">
                <span class="text">
                    潭州教育广州分公司版权所有 © CopyReserved. | 粤ICP备520886886号
                </span>
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
    components: {},
    methods: {
      submitForm() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('Login', this.ruleForm).then((res) => {
              this.$router.push({path: '/home'})
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-loading-mask {
    background-color: rgba(0, 0, 0, .5);
  }

  #wrap .login-wrap {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 800px;
  }

  #wrap .login-wrap .header {
    height: 480px;
    width: 100%;
    background: #363D47 url("../../static/img/login/bg_Bitmap.png") no-repeat left bottom;
    background-size: 100%;
  }

  #wrap .login-wrap .main {
    position: absolute;
    top: 136px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  #wrap .login-wrap .bottom {
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 320px;
    background: #F7F7F7 url("../../static/img/login/Rectangle_17.png") no-repeat top center;
  }

  #wrap .login-wrap .bottom .text {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    letter-spacing: -0.29px;
    line-height: 12px;
    display: block;
    width: 540px;
    height: 12px;
    margin: 268px auto 40px auto;
    text-align: center;
  }

  #wrap .img-wrapper {
    text-align: center;
  }

  #wrap .img-wrapper > img {
    width: 260px;
    height: 64px;
  }

  #wrap .form-wrapper {
    position: relative;
    margin-top: 40px;
  }

  #wrap .form-wrapper .fly {
    position: absolute;
    right: -86px;
    top: -77px;
  }

  #wrap .form-wrapper .line1 {
    width: 328px;
    height: 4px;
    background: #F1F1F1;
    margin: 0 auto;
  }

  #wrap .form-wrapper .line2 {
    width: 308px;
    height: 4px;
    margin: 5px auto 5.5px auto;
    background: #F2F2F2;
  }

  #wrap .form-wrapper .line3 {
    width: 288px;
    height: 4px;
    background: #F3F3F3;
    margin: 0 auto;
  }

  #wrap .el-form {
    width: 330px;
    height: 370px;
    background: #FFFFFF;
    overflow: hidden;
  }

  #wrap .form-content .title {
    display: block;
    margin: 30px auto;
    width: 64px;
    height: 16px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #282828;
    letter-spacing: -0.39px;
    line-height: 16px;
  }

  #wrap .form-content .el-form-item {
    display: block;
    box-sizing: border-box;
    width: 260px;
    height: 40px;
    background: #FFFFFF;
    margin: 0 auto 20px auto;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
  }

  #wrap .el-form-item .el-input .el-input__inner {
    width: 260px;
    height: 40px;
  }

  #wrap .form-content .code-wrapper {
    margin-bottom: 23px;
    box-sizing: border-box;
  }

  #wrap .form-content .last-input {
    width: 160px;
    height: 40px;
    margin: 0 10px 0px 0px;
  }

  #wrap .form-content .last-input .el-input__inner {
    width: 160px;
    height: 40px;
    color: #333333;
  }

  #wrap .form-content .check-code {
    background: #F9F9F9;
    width: 90px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }

  #wrap .form-content .error {
    margin: -23px auto 10px 35px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FF6666;
    letter-spacing: -0.29px;
    height: 14px;
    line-height: 14px;
  }

  #wrap .form-content .tijiao {
    display: block;
    margin: 0 auto 20px auto;
    width: 260px;
    height: 40px;
    background: #FF9900;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: -0.39px;
    line-height: 16px;
    border: none;
  }

  #wrap .form-content .text {
    display: block;
    width: 56px;
    height: 14px;
    margin: auto 35px 20px auto;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #282828;
    letter-spacing: -0.34px;
    line-height: 14px;
    text-align: center;
  }

  @keyframes slidedown {
    from {
      height: 0;
    }
    to {
      height: 14px;
    }
  }
</style>
