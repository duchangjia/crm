<template lang="html">
  <div class="contacts">
    <div class="item"
         v-for="(item,index) in contactsList"
         :class="[cardClass[index], {period: item.more.length ? false : true}]"
         :key="index"
         @mouseover="_hovmouseover(index,item)"
         @mouseout="_hovmouseout(index,item)"
         @click="_add(item)">
      <template>
        <div class="warp">
          <div class="left">
            <h1>{{contactsName[item.type]}}</h1>
            <div class="next" @click="_next(item)" v-show="item.more.length > 1 ">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
              :class="item.more.length ? 'playcall' : ''"
               v-show="item.playCallToogl"
               v-if="deptInfo.type == 2 && !item.islogin"
               @click='playcall(item.more[item.urIndex],item)'>
            <el-button class="button" size="small" icon="el-icon-service">呼叫</el-button>
          </div>
        </div>
        <transition name="fade">
          <strong>{{item.more[item.urIndex]}}</strong>
        </transition>
      </template>
      <template>
        <!-- 没登录，去登录中心 -->
        <div class="login" v-show="deptInfo.type == 2 && item.islogin == true">
          <p>请登录呼叫中心</p>
          <el-button @click="reLogin()" type="primary" size='mini'>去登录</el-button>
        </div>
      </template>
    </div>

    <!-- 新增联系方式 弹框 -->
    <el-dialog class="addAlert" title="添加联系方式" :visible.sync="dialogFormVisible" width="38%">
      <el-form :model="addAlert" :rules="rules" ref="addAlert" label-width="100px" class="demo-ruleForm">
        <el-form-item style="margin-left:-100px">
          <el-radio-group v-model="addAlert.text">
            <el-radio-button label="手机"></el-radio-button>
            <el-radio-button label="座机"></el-radio-button>
            <el-radio-button label="微信"></el-radio-button>
            <el-radio-button label="QQ"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel" v-if="addAlert.text == '手机'">
          <el-input v-model="addAlert.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="座机号码" prop="camear" v-if="addAlert.text == '座机'">
          <el-input v-model="addAlert.camear" placeholder="请输入座机号码"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="weixin" v-if="addAlert.text == '微信'">
          <el-input v-model="addAlert.weixin" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="QQ" v-if="addAlert.text == 'QQ'">
          <el-input v-model="addAlert.QQ" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:-100px">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="success" @click="_addEnter('addAlert')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--外呼拨打成功提示-->
    <el-dialog center :visible.sync="showTip" width="500px" :show-close="false">
      <span slot="title" class="title-header left">呼叫成功</span>
      <span>请在通话结束后，点击“已结束通话”添加跟进信息。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="overCall" :disabled="btnDisabled">{{callMessage}}</el-button>
      </span>
    </el-dialog>

    <!--新增跟进信息-->
    <el-dialog
      center
      :visible.sync="showCallDetail"
      width="700px">
      <span slot="title" class="title-header left">新增学员跟进记录-基本信息</span>
      <el-form ref="addCallForm" :model="CallFormData" label-suffix="：" label-width="110px" :rules="callRule">
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nick">
              <el-input v-model="CallFormData.nick" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="CallFormData.sex">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地域" prop="chanceArea">
              <el-cascader :options="areaoptions"
                           v-model="CallFormData.chanceArea" style="width: 100%" clearable class="full-width" clearable
                           :props="areaProps" @change="handleItemChange" :change-on-select="true">
              </el-cascader>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item label="联系方式" prop="followMode">
              <el-select v-model="CallFormData.followMode" placeholder="请选择"  class="full-width" clearable>
                <el-option
                  v-for="item in contactType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <h3 class="title-header margin-bottom-10">沟通情况</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="沟通时间" prop="followTimeMinute">
              <el-date-picker
                v-model="CallFormData.followTimeMinute"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item label="联系方式" prop="followMode">
              <el-select v-model="CallFormData.followMode" placeholder="请选择"  class="full-width" clearable>
                <el-option
                  v-for="item in contactType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-form-item label="沟通备注" prop="remark">
          <el-input type="textarea" v-model="CallFormData.remark"></el-input>
        </el-form-item>
        <h3 class="title-header margin-bottom-10">回访计划</h3>
        <el-form-item label="回访时间" prop="backPlan">
          <el-col :span="11">
            <el-select v-model="CallFormData.backPlan" placeholder="回访时间"  class="full-width" clearable>
              <el-option
                v-for="item in EditReturnLis"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="11" v-show="CallFormData.backPlan!=4" class="margin-left-10">
            <el-date-picker
              v-model="CallFormData.backTimeMinute"
              type="datetime" style="width: 100%"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="CallFormData.backRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveCallDetail">保存</el-button>
    </span>
    </el-dialog>

    <!--无效通话-->
    <el-dialog
      center
      :visible.sync="showInvalid"
      width="500px">
      <span slot="title" class="title-header left">无效通话</span>
      <el-form ref="invalidForm" :model="invalidData" label-suffix="：" label-width="110px" :rules="invalidRule">
        <el-form-item label="无效原因" prop="isConnect">
          <el-select v-model="invalidData.isConnect" placeholder="请选择"  class="full-width" clearable>
            <el-option
              v-for="item in invalidType"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="invalidData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInvalid">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import {isPhone, isMobile, isQQ, isWeixin, formatDate} from "@/common/util.js";
  import { followOptions, isItConnected } from './data.js';
  export default {
    props: ['stuId'],
    data() {
      // 验证 手机号
      var validateTel = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('请输入正确的手机号'));
        }
        else {
          callback()
        }
      }
      // 验证 座机
      var validateCamear = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的座机'));
        }
        else {
          callback()
        }
      }
      // 验证 QQ
      var validateQQ = (rule, value, callback) => {
        if (!isQQ(value)) {
          callback(new Error('请输入正确的QQ'));
        }
        else {
          callback()
        }
      }
      // 验证 微信
      var validateWeixin = (rule, value, callback) => {
        if (!isWeixin(value)) {
          callback(new Error('请输入正确的微信号'));
        }
        else {
          callback()
        }
      }
      return {
        areaoptions:[],
        areaProps: {
          value: 'id',
          label: 'city',
          children: 'cities'
        },
        showInvalid:false,
        invalidData:{
          isConnect:'',
          remark:'',
          isValid:0,
          followMode:''
        },
        invalidType:[
          {id:0,label:"挂断"},
          {id:1,label:"无人接听"},
          {id:2,label:"空号"},
          {id:3,label:"停机/错号"}
        ],
        EditReturnLis: followOptions,
        showCallDetail:false,//新增跟进信息modal;
        callRule:{
          followTimeMinute:[{required: true, message: '请选择沟通时间'}],
          backPlan:[{required: true, message: '请选择回访时间'}],
          nick:[{required: true, message: '请填写昵称'}],
          sex:[{required: true, message: '请选择性别'}],
          chanceArea:[{required: true, message: '请选择地域'}],
        },
        invalidRule:{
          reason:[{required: true, message: '请选择无效原因'}],
        },
        CallFormData:{
          followTimeMinute:formatDate((new Date().getTime())/1000),
          followMode:'',
          remark:'',
          backPlan:'',
          backTimeMinute:'',
          backRemark:'',
          isValid:1,//有效跟进
          isConnect:1,
          chanceArea:[],
          nick:'',
          sex:''
        },
        contactType:[{
          label:'手机',
          value:0
        },{
          label:'座机',
          value:1
        }],
        islogin: false, // 是否有登录呼叫中心   0 || 12 的时候ih可以呼叫
        cardClass: ["back_tel", "back_tel2", "back_wexin", "back_qq", "back_add"], // 卡片的背景图片
        addAlert: {
          text: "手机", // 默认选择
          tel: "",
          camear: "",
          weixin: "",
          QQ: ""
        },
        dialogFormVisible: false,
        // 卡片更表
        contactsName: ['手机号码', '座机', '微信', 'QQ',],
        contactsList: [],
        rules: {
          tel: [
            {validator: validateTel, trigger: 'blur'}
          ],
          camear: [
            {validator: validateCamear, trigger: 'blur'}
          ],
          weixin: [
            {validator: validateWeixin, trigger: 'blur'}
          ],
          QQ: [
            {validator: validateQQ, trigger: 'blur'}
          ]
        },
        callId: '',//拨打呼叫中心后返回的id
        showTip: false,
        callMessage: '通话中',
        btnDisabled: true
      }
    },
    created() {
      this.qryStuContact()
      this.isloginEvent()
    },
    watch:{
      '$route': 'qryStuContact',
      studentInfo(){
        const {studentInfo}=this;
        this.CallFormData.nick=studentInfo.nick;
        this.CallFormData.sex=studentInfo.sex;
        this.CallFormData.chanceArea=[studentInfo.provinceIdFk,studentInfo.cityIdFk];
        this.qryArea();
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        deptInfo: state => state.user.deptInfo,
        // 外呼中心的code值，为0或12时才能拨打电话
        code: state => state.user.code,
        studentInfo:state => state.workbench.studentInfo,
      })
    },
    methods: {
      ...mapActions(['USER_CLEAR']),
      reLogin() {
        this.USER_CLEAR().then(res => {
          this.$router.replace('/login')
        })
      },
      qryArea(val){
        this.API.qryArea({areaId: 1}).then((res) => {
          let data = res.result.map((item) => {
            return {
              id: item.id,
              city: item.province || item.city,
              cities: []
            }
          });
          this.areaoptions = data;
          if(this.studentInfo['cityIdFk']){
            this.handleItemChange([this.studentInfo.provinceIdFk]);
          }
        })
      },
      // 请求省市
      handleItemChange(val) {
        if (val.length > 1 || !val.length) return;
        const {areaoptions} = this;
        this.API.qryArea({areaId: val[0]}).then((res) => {
          areaoptions.forEach((item) => {
            if (item.id == val[0]) {
              if (res.result[0].city) {
                item.cities = res.result;
              } else {
                item.cities = '';
              }
              return false;
            }
          })
        })
      },
      //保存无效跟进记录
      saveInvalid(){
        this.$refs['invalidForm'].validate((valid) => {
          if(valid){
            const data=Object.assign({},this.invalidData,{id:this.callId,stuIdFk:this.studentInfo.stuId});
            this.API.mdfStudentFollowDetail(data).then((res)=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.showInvalid=false;
            });
          }
        })
      },
      //保存学员新增跟进记录
      saveCallDetail(){
        this.$refs['addCallForm'].validate((valid) => {
          if(valid){
            const {chanceArea}=this.CallFormData;
            const data=Object.assign({},this.CallFormData,{id:this.callId,stuIdFk:this.studentInfo.stuId,provinceIdFk:chanceArea[0],cityIdFk:chanceArea[1]||''})
            this.API.mdfStudentFollowDetail(data).then((res)=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.showCallDetail=false;
            });
          }
        })
      },
      // 查询学员联系方式
      qryStuContact() {
        // 获取到学员ID
        //this.stuId = this.$router.currentRoute.query.stuId
        this.API.qryStuContact({
          stuId: this.stuId
        }).then(res => {
            this.contactsList = res.result;
            // 这个主要是主了显示 添加卡片
            let obj = {name: "添加", urIndex: 0, more: []}
            this.contactsList.push(obj)
          }).catch(err => {
            console.log(err.message)
        });
      },
      // 是否登录外呼中心
      isloginEvent(){
        const code = localStorage.getItem('code');
        console.log(code);
        if(code == 12 || code == 0){
          this.islogin = true;
        }
        else{
          this.islogin = false;
        }
      },
      // 下一个联系方式
      _next(item) {
        item.urIndex += 1;
        item.urIndex >= item.more.length ? item.urIndex = 0 : item.urIndex;
      },
      // 新增
      _add(item) {
        if (!item.name) return;
        //console.log('新增联系方式');
        this.dialogFormVisible = true;
      },
      playcall(tel,item) {
        //先登录呼叫中心才能拨打电话
        const code = localStorage.getItem('code');
        const that=this;
        if (code == 0 || code == 12) {
          this.$confirm('确定要拨打电话：' + tel + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //保存通话方式
            this.CallFormData.followMode=item.type;
            this.invalidData.followMode=item.type;
            this.CallFormData.followTimeMinute=formatDate((new Date().getTime())/1000);//沟通时间
            this.API.hangup({
              userName: this.userInfo.userName,
              mobile: tel,
              studentId: this.stuId
            }).then((res) => {
              this.callId = res.id;
              this.showTip = true;
              let countNum=20;
              let t=setInterval(()=>{
                countNum--;
                that.callMessage='通话中'+countNum+'s'
                if(countNum===0){
                  clearInterval(t);
                  that.btnDisabled=false;
                  that.callMessage='结束通话';
                }
              }, 1000)
            });
          });
        } else {
          this.$message({
            type: 'warning',
            message: '请先登录呼叫中心!'
          });
        }
      },
      overCall() {
        this.$confirm('确定要结束通话？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.API.effective({id:this.callId}).then((res)=>{
            if(res.code==1){
              //有效通话
              console.log('有效通话');
              this.showCallDetail=true;
              this.showTip=false;
            }else{
              //无效通话
              console.log('无效通话');
              this.showInvalid=true;
              this.showTip=false;
            }
          })
        });
      },
      //鼠标 移入、显示登录呼叫中心
      _hovmouseover(index, item) {
        if(index == 0 || index == 1){
          if (!this.islogin) { // 没有登录呼叫中心
            //item.islogin = true;
            this.$set(this.contactsList[index], 'islogin', true)
          }
        }

      },
      //鼠标 移出
      _hovmouseout(index, item) {
        if(index == 0 || index == 1){
          if (!this.islogin) { // 有登录呼叫中心
            //item.islogin = true;
            this.$set(this.contactsList[index], 'islogin', false)
          }
        }
      },
      // 新增联系方式
      _addEnter(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return;
          // 提交
          let val = this.addAlert.text;
          if (val == "手机") {
            this._addEnterMethods(0, this.addAlert.tel);
          }
          else if (val == "座机") {
            this._addEnterMethods(1, this.addAlert.camear);
          }
          else if (val == "微信") {
            this._addEnterMethods(2, this.addAlert.weixin);
          }
          else if (val == "QQ") {
            this._addEnterMethods(3, this.addAlert.QQ);
          }

        });
      },
      // 封装 新增联系方式 及卡片
      _addEnterMethods(index, value) {

        var obj = this.contactsList[index];
        if (obj.more.length >= 3) {
          this.$message({
            message: '一种联系方式，最多添加三条',
            type: 'warning'
          });
          return;
        }

        for (var i = 0; i < obj.more.length; i++) {
          // 如果联系方式相同了
          if (value == obj.more[i]) {
            this.$message({
              message: '这个联系号码已经有了',
              type: 'warning'
            });
            return;
          }
        }
        obj.more.unshift(value);

        // 添加联系方式
        this.API.addStuContact({
          stuId: this.stuId,
          type: index,
          contact: value
        })
          .then(res => {

          }).catch(err => {
          console.log(err.message)
        });
        //隐藏弹框
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contacts {
    width: 100%;
    overflow: hidden;
    .item {
      float: left;
      height: 95px;
      border-radius: 8px;
      background-size: 100% 100% !important;
      width: calc(20% - 20px);
      margin-left: 20px;
      padding: 25px 0px 0px 20px;
      cursor: pointer;
      position: relative;
      &.back_tel, &.back_tel2 {
        &:hover {
          .playcall {
            display: block !important;
          }
        }
      }
      strong {
        color: #fff;
      }
      .warp {
        margin-bottom: 10px;
        height: 25px;
        .left {
          float: left;
          h1 {
            font-size: 18px;
            font-weight: 500;
            opacity: .8;
            color: #fff;
            float: left;
          }
          .next {
            float: left;
            width: 18px;
            height: 18px;
            background: rgba(0, 0, 0, .4);
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            box-shadow: 0px 0px 1px rgba(255, 255, 255, 0.2);
            margin-left: 10px;
            text-indent: 1px;
            font-weight: bold;
            cursor: pointer;
            &:hover {
              background: rgba(0, 0, 0, .25);
            }
          }
        }
        .playcall {
          float: right;
          margin-right: 10px;
          margin-top: -5px;
          .button {
            background: rgba(0, 0, 0, .4);
            color: #fff;
            border: none;
            &:hover {
              background: rgba(0, 0, 0, .25);
            }
            &.el-button--small {
              padding: 9px 7px;
            }
          }
        }
      }
      .login {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;
        p {
          margin: 25px 0px 10px 0;
        }
      }
      &.back_tel {
        background: url(/static/img/workbench/back_tel.png);
        &.period {
          background: url(/static/img/workbench/back_tel_hui.png);
        }
      }
      &.back_tel2 {
        background: url(/static/img/workbench/back_tel2.png);
        &.period {
          background: url(/static/img/workbench/back_tel2_hui.png);
        }
      }
      &.back_wexin {
        background: url(/static/img/workbench/back_wexin.png);
        &.period {
          background: url(/static/img/workbench/back_wexin_hui.png);
        }
      }
      &.back_qq {
        background: url(/static/img/workbench/back_qq.png);
        &.period {
          background: url(/static/img/workbench/back_qq_hui.png);
        }
      }
      &.back_add {
        background: url(/static/img/workbench/back_add.png);
      }
      &.back_add_hover {
        background: url(/static/img/workbench/back_add_hover.png);
      }
    }
    .addAlert {
      text-align: center;
    }
  }

  @media (min-width: 1400px) {
    .contacts {
      .item {
        height: 130px;
        .login {
          p {
            margin: 40px 0px 10px 0;
          }
        }
      }
    }
  }
</style>
