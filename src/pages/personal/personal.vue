<template>
  <div class="white-bg personal-container">
    <h3 class="name-title">
      <span class="name margin-right-10">{{userData.userName}}</span>———<span class="role margin-left-10">{{userData.roleName}}</span>
    </h3>
    <el-form label-width="120px" label-suffix="：" ref="personForm" :model="form" :rules="rules">
      <section class="basic-info border-bottom">
        <h3><span class="title-header">基本信息</span>
          <el-button type="text" class="margin-left-10" @click="showEdit=!showEdit">{{showEdit?'取消':'编辑'}}</el-button>
        </h3>
        <div class="detail-info margin-top-20 margin-left-20">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <span class="font">{{form.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex" required>
                <span class="font" v-show="!showEdit">{{form.sex?'男':'女'}}</span>
                <el-select v-model="form.sex" placeholder="请选择性别" clearable v-show="showEdit" required>
                  <el-option label="女" :value='0'></el-option>
                  <el-option label="男" :value='1'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属部门">
                <span class="font">{{deptInfo.deptName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位">
                <span class="font">{{form.roleName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" required prop="mobile">
                <el-input v-model="form.mobile" v-show="showEdit"></el-input>
                <span class="font" v-show="!showEdit">{{form.mobile}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </section>
      <section class="basic-info">
        <h3 class="title-header">账号信息</h3>
        <div class="detail-info margin-top-20 margin-left-20">
          <el-row>
            <el-col :span="12">
              <el-form-item label="我的账号">
                <span class="font">{{form.userName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" required prop="password">
                <span class="font">******</span>
                <el-button type="text" class="margin-left-10" @click="showMdf=!showMdf">编辑</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="呼叫坐席">
                <span class="font">{{form.callSeat}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </section>
    </el-form>
    <footer class="text-center">
      <el-button type="primary" v-show="showEdit" @click="save">保存</el-button>
    </footer>

    <!--修改密码-->
    <mdf-password :show.sync="showMdf" :showPass="showPass"></mdf-password>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import mdfPassword from './modal/mdf-password';
  import md5 from 'js-md5';
  export default {
    components: {mdfPassword},
    name: 'personal',
    data() {
      return {
        showEdit: false,
        showMdf:false,
        showPass:'',
        form: {
          name: '',
          sex: 0,
          roleName: '',
          mobile: '',
          userName: '',
          password: '',
          callSeat: ''
        },
        rules:{
          mobile: [
            { required: true, message: '请填写电话',},
            {pattern: '^1[23456789]\\d{9}$', message: '请填写正确手机号码', trigger: 'blur'},
          ],
          sex: [
            { required: true, message: '请选择性别',}
          ],
          password: [
            { required: true, message: '请填写密码',}
          ],
        }
      }
    },
    compoments:{
      mdfPassword
    },
    computed: {
      ...mapState({
        userData: state => state.user.userInfo,
        deptInfo: state => state.user.deptInfo
      }),
    },
    mounted() {
      this.form = this.userData;
      let pass='tzedu'+this.userData.mobile.substr(-4);
      if(md5(pass)==this.userData.password){
        this.showPass=false
      }else {
        this.showPass=true
      }
    },
    methods: {
      save() {
        this.$refs['personForm'].validate((valid) => {
          if (valid) {
            const {password,sex,mobile}=this.form;
            delete this.userData.createTime;
            let data=Object.assign({},this.userData,{
              transformPassword:password,
              sex,
              mobile
            });
            this.API.mdfUser(data).then(()=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.showEdit=false;
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .personal-container {
    .name-title {
      .name {
        font-size: 24px;
        font-weight: 600;
      }
      .role {
        font-size: 18px;
      }
      padding: 0 50px;
      line-height: 120px;
      color: #ffffff;
      background: url("../../../static/img/home/personal.png") no-repeat center center;
      background-size: cover;
    }
    .basic-info {
      padding: 35px 0px 0;
    }
    .detail-info {
      width: 900px;
      .font {
        color: #2c2f33;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
</style>
