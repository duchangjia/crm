<template>
  <el-dialog
    center
    :visible.sync="visible"
    width="500px"
    @close="$emit('update:show', false)"
    :show="show">
    <span slot="title" class="title-header left">修改密码</span>
    <el-form ref="changeForm" :model="formOption" label-suffix="：" label-width="110px" :rules="rules">
      <el-form-item label="原密码" prop="oldPassWord">
        <el-input :type="showPass?'password':'text'" v-model="formOption.oldPassWord"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="transformPassword">
        <el-input type="password" v-model="formOption.transformPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="formOption.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$emit('update:show', false)">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import md5 from 'js-md5';
  import {mapState} from 'vuex'
  export default {
    name: "mdf-password",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formOption.checkPass !== '') {
            this.$refs['changeForm'].validateField('checkPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formOption.transformPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        visible: this.show,
        formOption: {
          oldPassWord: '',
          transformPassword: '',
          checkPass: ''
        },
        rules: {
          transformPassword: [
            {required: true, message: '请输入新密码'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ],
          oldPassWord: [
            {required: true, message: '请输入旧密码'}
          ]
        }
      }
    },
    watch: {
      show() {
        if(this.show) {
          this.$refs['changeForm'] && this.$refs['changeForm'].resetFields();
        }
        this.visible = this.show;
      },
      showPass(){
        if(!this.showPass){
          let pass='tzedu'+this.userData.mobile.substr(-4);
          this.formOption.oldPassWord=pass;
        }
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      showPass:{
        default:true
      }
    },
    computed: {
      ...mapState({
        userData: state => state.user.userInfo,
      })
    },
    methods: {
      save() {
        this.$refs['changeForm'].validate((valid) => {
          if (valid) {
            const {oldPassWord,transformPassword}=this.formOption;
            delete this.userData.createTime;
            delete this.userData.password;
            const data=Object.assign({},this.userData,{
              oldPassWord:md5(oldPassWord),
              transformPassword:md5(transformPassword),
            });
            this.API.mdfUser(data).then(()=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('update:show', false);
            })
          }
        });
      }
    }
  }
</script>
