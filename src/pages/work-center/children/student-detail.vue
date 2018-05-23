<template>
  <div class="" v-if="student">
    <student-contact :stu-id="stuId"></student-contact>

    <!-- 学员信息 Start -->
    <div class="student-info">
      <div class="item">
        <div class="student-hd">
          <h4 class="student-tit">
            <span></span>
            <h3>学员概要</h3>
          </h4>
          <div class="progress">
            <span>学员意向度：</span>
            <el-rate class="xinxin"
              v-model="studentDegree.value" :score-template="studentDegree.label"
              disabled show-score text-color="#40b3ff">
            </el-rate>
          </div>
          <div class="btn-right">
            <el-button type="text" size="small" class="btn" @click="giveUpDialog = true">放弃归属</el-button>
            <el-button type="text" size="small" class="btn" @click="addFriend">我已加为好友</el-button>
            <el-button type="text" size="small" class="btn" @click="$router.push('/work-center/student-update/' + stuId)">编辑学员信息</el-button>
          </div>
        </div>

        <ul class="list">
          <li v-for="(item, key) in summaryFields">
            <strong>{{ item.label }}：</strong>
            <span>{{ student[item.id] || studentNew[item.id] || none }}</span>
          </li>
        </ul>
      </div>

      <div class="item">
        <div class="student-hd">
          <h4 class="student-tit">
            <span></span>
            <h3>基本信息</h3>
          </h4>
        </div>

        <ul class="list">
          <li v-for="(item, key) in baseFields">
            <strong>{{ item.label }}：</strong>
            <span>{{ student[item.id] || studentNew[item.id] || none }}</span>
          </li>
          <li>
            <strong>{{!student.cardType || student.cardType == 1 ? '身份证：' : '港澳台证件：'}}</strong>
            <span>{{ student.cardNo  || '无' }}</span>
          </li>
        </ul>
      </div>

      <div class="item"  >
        <div class="student-hd">
          <h4 class="student-tit">
            <span></span>
            <h3>详细信息</h3>
          </h4>
        </div>

        <ul class="list">
          <li v-for="(item, key) in detailFields" :class="{'col-2': item.id == 'purpose'}">
            <strong>{{ item.label }}：</strong>
            <span>{{ student[item.id] || studentNew[item.id] || none }}</span>
          </li>
        </ul>
      </div>

      <div class="item">
        <div class="student-hd">
          <h4 class="student-tit">
            <span></span>
            <h3>回访计划</h3>
          </h4>
          <el-button class="btn-plan fr mr20" v-if="followData.id" type="primary" size="small" @click="handleUpdateFollow">修改计划</el-button>
        </div>

        <div class="plan" v-if="followData">
          <ul class="list">
            <li class="col-3">
              <strong>下次回访时间：</strong>
              <span v-if="parseInt(followData.backPlan) > -1">
                {{ followOptions[followData.backPlan].label }} {{ followData.backTime || '' }}
              </span>
              <span v-else>{{ none }}</span>
            </li>

            <li class="col-3">
              <strong>回访备注：</strong>
              <span style="width:calc(100% - 150px)">{{ followData.backRemark || none }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 放弃归属 弹框 -->
      <el-dialog class="giveup-dialog" title="放弃归属" :visible.sync="giveUpDialog"  width="600px">
        <el-form class="demo-ruleForm" :model="giveUpForm" :rules="rules" ref="giveUpForm" label-width="100px">
          <p style="margin: 0 0 20px 34px;">放弃归属后，其他咨询师可在公海库中领取该学员，确认进行此操作？</p>
          <el-form-item label="退回原因" prop="reason">
            <el-select v-model="giveUpForm.reason" placeholder="请选择退回原因" style="width:360px">
              <el-option v-for="item in values" :key="item.id"
                :value="item.id" :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="tac">
            <el-button @click="giveUpDialog = false ">取消</el-button>
            <el-button type="success" @click="giveUpSubmit('giveUpForm')">确定</el-button>
          </div>
        </el-form>
      </el-dialog>

      <!-- 我已加好友 弹框 -->
      <el-dialog class="giveUpAlert" title="你已经添加该学员为好友？" :visible.sync="addFriendDialog"  width="600">
        <el-form :model="addFriendForm" :rules="rules" ref="addFriendForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="添加方式" prop="type" style="text-align:left;">
            <el-radio-group v-model="addFriendForm.label" @change="addFriendTab">
              <el-radio-button v-for="(item, key) in addFriendOptions" :label="item.label" :value="item.id" :key="key" ></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="添加账号" prop="remark">
            <el-select v-model="addFriendForm.remark" placeholder="请选择">
              <el-option :value="item" :label="item"
              v-for="(item, key) in accountOptions" :key="key"></el-option>
            </el-select>
          </el-form-item>
          <div class="tac">
            <el-button @click="addFriendDialog = false">取消</el-button>
            <el-button type="success" @click="addFriendSubmit('addFriendForm')">确定</el-button>
          </div>
        </el-form>
      </el-dialog>

      <!-- 修改计划 弹框 -->
      <el-dialog class="" v-if="followData.id" title="修改回访计划" :visible.sync="followDialog" width="600px">
        <el-form class="demo-ruleForm" :model="followForm" :rules="followRules" ref="followForm" label-width="100px">
            <el-form-item label="回访时间：" prop="backPlan">
              <el-select v-model="followForm.backPlan" placeholder="请选择">
                <el-option v-for="(item, key) in followOptions" :label="item.label" :value="item.id" :key="key"></el-option>
              </el-select>
              <el-date-picker
                v-if="followForm.backPlan != 4"
                v-model="followForm.backTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="回访备注：">
              <el-input type="textarea" style="width:420px" v-model="followForm.backRemark"></el-input>
            </el-form-item>

            <el-form-item class="btn-right">
              <el-button @click="followDialog = false">取消</el-button>
              <el-button type="success" @click="handleFollowSubmit('followForm')">确定</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 学员跟进 Start -->
    <student-follow :stu-id="stuId" :student="student" :project-options="projectOptions"></student-follow>
  </div>

  <!-- <div class="empty-wp" v-else>
  </div> -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import StudentContact from './student-contact'  // 联系学员组件
import StudentFollow from './student-follow'    // 跟进跟进组件
import { summaryFields, baseFields, detailFields, identityOptions, degreeList, genderOptions, levelOptions, classTimeOptions, idCardOptions, followOptions, addFriendOptions} from './data'

export default {
  props:['stuCardList'],
  components: {
    StudentContact,
    StudentFollow
  },
  data(){
    return {
      stuId: this.$route.params.id,
      none: '无',
      summaryFields,
      baseFields,
      detailFields,
      // 学员意向度：
      intention: 4,
      intentionVal: '强',
      student: null,
      giveUpDialog: false,
      giveUpForm: { },
      addFriendDialog: false,
      addFriendForm: {
        remark: '',
        type: '',
        label: ''
      },
      accountOptions: [],
      followData: {},
      followForm: {},
      followRules: {
        backPlan: [
            { required: true, message: '请选择回访时间', trigger: 'change' }
          ],
      },
      // 意向项目
      projectOptions: [],
      dialogFormVisible: false,
      dialogFormVisibleFriend: false,
      followDialog: false,
      stutentInfo: {},
      stuCardInfo: {},
      Friendlist: [],
      showBackPlanId:0,
      // 显示出来省市
      province: [],
      provinceProps: {
        value: 'id',
        label: 'city',
        children: 'cities'
      },
      // 意向省
      intentProvinceIdFk: [],
      // 意向市
      intentCityIdFk: [],
      // 学员地域省、市
      provinceIdFk : [],
      cityIdFk : [],
      giveUpAlert:{
        region:"",
        Friendregion: "",
        way:""
      },
      EditReturn: {
        backPlan: "",
        backTime: "",
        backRemark: "",
        id: -1
      },
      EditReturnList: [
        { id : 0, label : "约定时间联系" },
        { id : 1, label : "稍后再联系" },
        { id : 2, label : "今晚联系" },
        { id : 3, label : "隔天联系" },
        { id : 4, label : "不需要了" }
      ],
      values:[
        { id : 0, label : "空号错号停机" },
        { id : 1, label : "三次无们接听" },
        { id : 2, label : "不符合报名条件" },
        { id : 3, label : "没有符合的产品" },
        { id : 4, label : "已报名其他机构" },
        { id : 5, label : "号码错误" },
        { id : 6, label : "明确表态不需要" },
        { id : 7, label : "谈合作" },
        { id : 8, label : "招聘" },
        { id : 9, label : "打过去没有咨询过" }
      ],
      rules: {
        region: [
            { required: true, message: '请选择退回原因', trigger: 'change' }
          ],
        Friendregion: [
            { required: true, message: '请选择账号', trigger: 'change' }
        ],
        way: [
            { required: true, message: '请选择', trigger: 'change' }
        ],
        returnOff: [
            { required: true, message: '请选择回访时间', trigger: 'change' }
        ]
      },
      // 这下面是引进的模块 死数据
      identityOptions,
      degreeList,
      genderOptions,
      levelOptions,
      classTimeOptions,
      idCardOptions,
      followOptions,
      addFriendOptions,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    studentNew() {
      const student = this.student
      if (!student) return { }

      const intentArea = (student.intentProvinceName || '') + (student.intentCityName ? ' - ' + student.intentCityName : '')

      const studentArea = (student.provinceName || '') + (student.cityName ? ' - ' + student.cityName : '')

      return {
        intentSubjectName: student.intentSubject,
        intentArea,
        studentArea,
        sexName: parseInt(student.sex) > -1 ? this.genderOptions[student.sex - 1].label : '未知',
        identityName: parseInt(student.identity) > -1 ? this.identityOptions[student.identity].label : '未知',
        levelName: parseInt(student.level) >= -1 ? this.levelOptions[student.level].label : '未知',
        classTimeName: parseInt(student.classTime) > -1 ? this.classTimeOptions[student.classTime].label : '未知',
      }
    },
    // 学员意向
    studentDegree() {
      const degree = this.student.degree
      const value = [0, 5, 4, 2, 0.5]
      const label = ['未知', '强', '中', '弱', '无']
      return {
        value: parseInt(degree) > -1 ? value[degree] : this.none,
        label: parseInt(degree) > -1 ? label[degree] : this.none,
      }
    },
    /*intentProject() {
      const list = this.projectOptions
      for (let i = 0; i < list.length; i++) {
        if (val.intentSubject == list[i].proId) {
          return list[i].proName
        }
      }
    }*/
  },
  watch: {
   '$route': 'getrouterQuery'
  },
  created(){
    this.getrouterQuery()
    this.qryAllProject()
  },
  methods:{
    ...mapMutations(['STUDENT_INFO']),
    getrouterQuery(){
      this.stuId = this.$route.params.id
      this.getStuBaseInfo()
      this.getStuFollowDetail()  // 获取回访记录
    },
    intentSubjectSum(){
      for(var i=0; i<this.projectOptions.length; i++){
        if(this.student.intentSubject == this.projectOptions[i].proId){
          return this.projectOptions[i].proName
        }
      }
    },
    //显示隐藏 回访计划的时间
    showBackPlan(val){
      this.showBackPlanId= val;
    },
    // 获取学员信息
    getStuBaseInfo(){
      console.log(this.stuId)
      this.API.getStuBaseInfo({
        stuId: this.stuId
      }).then(res=>{
        this.student = res.result[0].stuInfo;
        this.STUDENT_INFO(this.student);
      }).catch(err => {
        console.log(err.message)
      });
    },
    getStuFollowDetail() {
      this.API.getStuFollowDetail({
        stuId: this.stuId,
        userId: this.userInfo.userId
      }).then(res => {
        console.log(res.result);
        this.followData = res.result || { } // || { stuId: this.userInfo.userId }
      }).catch(err => {
        console.log(err.message)
      });
    },
    handleUpdateFollow() {
      this.followDialog = true
      const data = this.followData
      this.followForm = {
        id: data.id,
        backPlan: data.backPlan,
        backTime: data.backTime,
        backRemark: data.backRemark
      }
    },
    // 放弃归属
    giveUpSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.giveUpDialog = false

          this.API.delBelongTo({
            stuId: this.stuId,
            reason: this.giveUpForm.reason
          }).then(res=>{

          }).catch(err => {
            console.log(err.message)
          });
        } else {
          console.log('submit error!')
          return false
        }
      })
    },
    // 提交计划
    handleFollowSubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.followDialog = false

          if (this.followForm.backPlan == 4) {
            delete this.followForm.backTime
          }
          this.API.mdfStuFollowDetail(this.followForm).then(res=>{
            this.followData = this.followForm
          }).catch(err => {
            console.log(err.message)
          });
        } else {
          console.log('submit error!')
          return false
        }
      })
    },
    // 获取所有项目列表
    qryAllProject() {
      this.API.qryAllProject().then(res=>{
        //console.log(res.list);
        this.projectOptions = res.list
      }).catch(err => {
        console.log(err.message)
      });
    },
    //我已加好友
    addFriend() {
      //如果已经添加过好友了
      if (this.student.friend == 0) {
        this.$message({
          message: '你已经添加该学员为好友了！',
          type: 'warning'
        });
      } else {
        this.addFriendDialog = true
      }
    },
    //选择微信还是QQ
    addFriendTab() {
      this.API.qryStuContact({
        stuId: this.stuId
      }).then(res => {
        console.log(this.addFriendForm.type)
        //this.accountOptions = res.result && res.result[this.addFriendForm.type] ? res.result[this.addFriendForm.type].more : [];
        // 如果是微信 要把 手机号 和 微信 号加载出来
        if(this.addFriendForm.label == "微信"){
          // this.friendlist = this.friendlist.concat(res.result[type].more,res.result[0].more)
          this.addFriendForm.type = 2
          this.accountOptions = [...res.result[this.addFriendForm.type].more, ...res.result[0].more]
        }
        else{
          this.addFriendForm.type = 3
          this.accountOptions= res.result[this.addFriendForm.type].more;
        }

        this.addFriendForm.remark = ""
      }).catch(err => {
        console.log(err.message)
      })
    },
    // 添加好友
    addFriendSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.addFriendDialog = false

          this.API.addFriend(Object.assign(this.addFriendForm, {
            userIdFk: this.userInfo.userId,
            stuIdFk: this.stuId
          })).then(res=>{
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }).catch(err => {
            console.log(err.message)
          })
        } else {
          console.log('sumbit error!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .student-info{
    margin: 20px 0px 0 20px;
    background: #fff;
    .student-hd{
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
      .btn-plan {
        margin-top: 5px;
      }
      .btn-right{
        float: right;
        margin-right: 20px;
        margin-top: 7px;
        .btn{
          text-decoration: underline;

        }
      }
      .progress{
        float: left;
        margin: 0px 0px 0px 25px;
        span{
          float: left;
          font-size: 13px;
          color:#666;
          margin-top: 13px;
        }
        .xinxin{
          float: left;
          margin-top: 13px;
        }
      }
      .student-tit{
        height: 40px;
        line-height: 40px;
        float: left;
        h3{
          float: left;
          margin-left: 10px;
        }
        span{
          display: block;
          float: left;
          width: 4px;
          height: 20px;
          background: #38a6fa;
          margin-top: 10px;
        }
      }
    }
    /* .plan{
      overflow: hidden;
      .list{
        //float: left;
        //width: 80%;
      }
      .eidtPlan{
        float: left;
        margin-top: 40px;
      }

    } */
    .list{
      padding: 10px 20px 20px 20px;
      overflow: hidden;
      border-bottom: 1px solid #f4f4f4;
      li{
        float: left;
        margin-bottom: 20px;
        overflow: hidden;
        width: 33.333%;
        //text-align: center;
        &.col-2 {
          width: 66.666%
        }
        &.col-3 {
          width: 100%;
        }
        strong{
          display: block;
          float: left;
          width: 130px;
          color: #848e99;
          text-align: right;
        }
        span{
          //float: left;
          display: block;
          margin-left: 130px;
          color: #2c2f33;
          //text-align: left;
        }
      }
    }
    .give-up-dialog{
      text-align: center;
      p{
        margin-bottom: 10px;
      }
    }
    .btn-right{
      text-align: center;
    }
  }
</style>
