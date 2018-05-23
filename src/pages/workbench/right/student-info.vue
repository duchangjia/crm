<template lang="html">
  <!-- 学员信息组件 -->
  <div class="studentInfo">
    <div class="item">
      <div class="studentHeader">
        <h4 class="slideTitle">
          <span></span>
          <h3>学员概要</h3>
        </h4>
        <div class="progress">
          <span>学员意向度：</span>
          <el-rate class="xinxin"
            v-model="studentIntention.value"
            disabled
            show-score
            text-color="#40b3ff"
            :score-template="studentIntention.label">
          </el-rate>
        </div>
        <div  class="btn-right">
          <el-button type="text" size="small" class="btn" @click="dialogFormVisible = true;">放弃归属</el-button>
          <el-button type="text" size="small" class="btn" @click="addFriends">我已加为好友</el-button>
          <el-button type="text" size="small" class="btn" @click="edit">编辑学员信息</el-button>
        </div>
      </div>
      <ul class="list">
        <li>
          <strong>学员ID：</strong>
          <span>{{stuInfo.stuId}}</span>
        </li>
        <li>
          <strong>推广类型：</strong>
          <span>{{stuInfo.extendType || '无'}}</span>
        </li>
        <li>
          <strong>意向项目：</strong>
          <span>{{intentSubjectSum()}}</span>
        </li>
        <li>
          <strong>机会地域：</strong>
          <span>{{stuInfo.intentProvinceName}} {{stuInfo.intentCityName}}</span>
        </li>
        <li>
          <strong>创建时间：</strong>
          <span>{{stuInfo.createTime}}</span>
        </li>
        <li>
          <strong>分配时间：</strong>
          <span>{{stuInfo.lastAllocTime}}</span>
        </li>
        <li>
          <strong>最后跟进时间：</strong>
          <span>{{stuInfo.lastFollowTime || '无'}}</span>
        </li>
        <li>
          <strong>最近有效跟进：</strong>
          <span>{{stuInfo.lastValidFollowTime || '无'}}</span>
        </li>
      </ul>
    </div>

    <div class="item"  >
      <div class="studentHeader">
        <h4 class="slideTitle">
          <span></span>
          <h3>基本信息</h3>
        </h4>
      </div>

      <ul class="list">
        <li>
          <strong>昵称：</strong>
          <span>{{stuInfo.nick || '无'}}</span>
        </li>
        <li>
          <strong>真实姓名：</strong>
          <span>{{stuInfo.name  || '无'}}</span>
        </li>
        <li>
          <strong>学员地域：</strong>
          <span>{{stuInfo.provinceName}} {{stuInfo.cityName}}</span>
        </li>
        <li>

          <strong>性别：</strong>
          <span v-if="stuInfo.sex || stuInfo.sex == 0">{{sexList[stuInfo.sex-1].label}}</span>
          <span v-else>无</span>
        </li>
        <li>
          <strong>年龄：</strong>
          <span>{{stuInfo.age  || '无'}}</span>
        </li>
        <li>
          <strong>{{!stuInfo.cardType || stuInfo.cardType == 1 ? '中国大陆身份证：' : '港澳台居民证件：'}}</strong>
          <span>{{stuInfo.cardNo  || '无'}}</span>
        </li>
      </ul>
    </div>

    <div class="item"  >
      <div class="studentHeader">
        <h4 class="slideTitle">
          <span></span>
          <h3>详细信息</h3>
        </h4>
      </div>

      <ul class="list">
        <li>
          <strong>身份：</strong>
          <span v-if="stuInfo.identity || stuInfo.identity == 0">{{ idOptions[stuInfo.identity].label}}</span>
          <span v-else>无</span>
        </li>
        <li>
          <strong>水平：</strong>
          <span v-if="stuInfo.level || stuInfo.level == 0">{{ levelList[stuInfo.level].label}}</span>
          <span v-else>无</span>
        </li>
        <li>
          <strong>计划上课时间：</strong>
          <span v-if="stuInfo.classTime || stuInfo.classTime == 0">{{ classtimeList[stuInfo.classTime].label}}</span>
          <span v-else>无</span>
        </li>
        <li>
          <strong>开始学习时间：</strong>
          <span>{{stuInfo.startStudyTime || '无'}}</span>
        </li>
        <li>
          <strong>学习用途：</strong>
          <span class="study-use">{{stuInfo.purpose || '无'}}</span>
        </li>
      </ul>
    </div>
    <div class="item">
      <div class="studentHeader">
        <h4 class="slideTitle">
          <span></span>
          <h3>回访计划</h3>
        </h4>
      </div>

      <div class="pay">
        <ul class="list">
          <li style="width:100%; text-align:left;">
            <strong style="width:150px;">下次回访时间：</strong>
            <span >
              <span v-if="EditReturn.backPlan ||　EditReturn.backPlan === 0">{{editReturnList[EditReturn.backPlan].label || '无'}}</span>
              &nbsp;&nbsp;
              <i v-show="EditReturn.backPlan !== 4">{{EditReturn.backTime}}</i>
            </span>
          </li>

          <li style="width:100%; text-align:left;">
            <strong style="width:150px;">回访备注：</strong>
            <span style="width:calc(100% - 150px)">{{EditReturn.backRemark || '无'}}</span>
          </li>
        </ul>
        <el-button v-if="EditReturn.id" type="primary" size="small" class="eidtPlan" @click="dialogFormEditReturn = true">修改计划</el-button>
      </div>
    </div>

    <!-- 放弃归属 弹框 -->
    <el-dialog class="giveUpAlert" title="放弃归属" :visible.sync="dialogFormVisible"  width="45%">
      <el-form :model="giveUpAlert" :rules="rules" ref="giveUpAlert" label-width="100px" class="demo-ruleForm">
        <p>放弃归属后，其他咨询师可在公海库中领取该学员，确认进行此操作？</p>
        <el-form-item label="退回原因" prop="region">
          <el-select v-model="giveUpAlert.region" placeholder="请选择退回原因" style="width:100%">
            <el-option
              v-for="item in backOut"  :key="item.id"
              :value="item.id" :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:-100px">
          <el-button @click="dialogFormVisible = false ">取消</el-button>
          <el-button type="success" @click="_giveUpEnter('giveUpAlert')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 我已加好友 弹框 -->
    <el-dialog class="giveUpAlert" title="你已经添加该学员为好友？" :visible.sync="dialogFormVisibleFriend"  width="45%">
      <el-form :model="giveUpAlert" :rules="rules" ref="addFriends" label-width="100px" class="demo-ruleForm">
        <el-form-item label="添加方式" prop="way" style="text-align:left;">
          <el-radio-group v-model="giveUpAlert.way" @change="addFriendTab">
            <el-radio-button v-for='(item,index) in ["微信","QQ"]' :label="item" :value="index" :key="index" ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加账号" prop="Friendregion">
          <el-select v-model="giveUpAlert.Friendregion" placeholder="请选择" style="width:100%">
            <el-option
            :value="item"
            :label="item"
            v-for="(item,index) in friendlist" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:-100px; "  >
          <el-button @click="dialogFormVisibleFriend = false">取消</el-button>
          <el-button type="success" @click="_FriendrEnter('addFriends')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改计划 弹框 -->
    <el-dialog class="" title="修改回访计划" :visible.sync="dialogFormEditReturn"  width="45%">
      <el-form class="demo-ruleForm">
          <el-form-item label="回访时间：">
            <el-select  placeholder="请选择" v-model="EditReturn.backPlan" @change="showBackPlan($event)">
              <el-option v-for='(item,index) in editReturnList' :label="item.label" :value="item.id" :key="item.id"></el-option>
            </el-select>
            <el-date-picker
              v-model="EditReturn.backTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              v-if="showBackPlanId == 4 ? false : true"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="回访备注：" >
            <el-input type="textarea" style="width:74%;" v-model="EditReturn.backRemark"></el-input>
          </el-form-item>

          <el-form-item class="btn-right" >
            <el-button @click="dialogFormEditReturn = false;getStuFollowDetail() ">取消</el-button>
            <el-button type="success" @click="EditReturnUp()">确定</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { idOptions, intentLubjectList, degreeList, sexList, levelList, classtimeList, cardNoList, editReturnList, backOut } from "./../data/data.js";
import { mapMutations } from 'vuex'
export default {
  props:['intentSubject'],
  data(){
    return {
      // 学员意向度：
      stuInfo: "",
      dialogFormVisible: false,
      dialogFormVisibleFriend: false,
      dialogFormEditReturn: false,
      stutentInfo: {},
      stuCardInfo: {},
      showBackPlanId:0,
      cityIdFk : [],
      friendlist: [],
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
      idOptions,
      intentLubjectList,
      degreeList,
      sexList,
      levelList,
      classtimeList,
      cardNoList,
      editReturnList,
      backOut
    }
  },
  computed: {
    // 计算学员的意向度
    studentIntention(){
      const degree = this.stuInfo.degree;
      const value = [0, 5, 4, 2 ,0.5];
      const label = ["未知","强","中","弱","无"];
      return {
        value : parseInt(degree) >= -1 ? value[degree] : 0 ,
        label : parseInt(degree) >= -1 ? label[degree] : '无'
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
   '$route': 'getrouterQuery'
   },
  created(){
    this.getrouterQuery();
  },
  methods:{
    getrouterQuery(){
      this.userId = this.$store.state.user.userInfo.userId;
      //学员ID
      this.stuId = this.$router.currentRoute.query.stuId;

      // 是否已加好友
      this.isAddFriends = this.$router.currentRoute.query.friend
      // 获取回访记录
      this.getStuFollowDetail();
      this.getStuBaseInfo();
      //console.log(this.stuCardList);
    },
    intentSubjectSum(){
      for(var i=0; i<this.intentSubject.length; i++){
        if(this.stuInfo.intentSubject == this.intentSubject[i].proId){
          return this.intentSubject[i].proName;
        }
      }
    },
    //显示隐藏 回访计划的时间
    showBackPlan(val){
      this.showBackPlanId= val;
    },
    ...mapMutations([
      'STUDENT_INFO',
    ]),
    // 获取学员信息
    getStuBaseInfo(){
      this.API.getStuBaseInfo({
        stuId:this.stuId
      })
      .then(res=>{
        this.stuInfo = res.result[0].stuInfo;
        this.STUDENT_INFO(this.stuInfo);
        //this.studentIntention();
      }).catch(err => {
        console.log(err.message)
      });
    },
    // 我已加好友
    addFriends(){
      // 把第一选的去掉
      this.giveUpAlert.way = "";
      this.giveUpAlert.Friendregion = "";
      // 如果已经添加过好友了
      if (this.isAddFriends == 0) {
        this.$message({
          message: '你已经添加该学员为好友了！',
          type: 'warning'
        });
        return;
      }
      this.dialogFormVisibleFriend = true;
    },
    //选择微信还是QQ
    addFriendTab(){
      let type = -1;
      if(this.giveUpAlert.way == "微信"){ type = 2} else { type= 3 };
      this.API.qryStuContact({
        stuId: this.stuId
      })
      .then(res=>{
        // 如果是微信 要把 手机号 和 微信 号加载出来
        if(this.giveUpAlert.way == "微信"){
          // this.friendlist = this.friendlist.concat(res.result[type].more,res.result[0].more)
          this.friendlist = [...res.result[type].more, ...res.result[0].more];
        }
        else{
          this.friendlist= res.result[type].more;
        }
        this.giveUpAlert.Friendregion = "";
      }).catch(err => {
        console.log(err.message)
      });
    },
    // 添加好友
    _FriendrEnter(formName){

      let type = -1;
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        // 用户ID
        let userIdFk = this.userId; //this.$store.state.user.userData.userId;
        // 学员 ID
        let stuIdFk = this.stuId;
        if(this.giveUpAlert.way == "微信"){ type = 2} else { type= 3 };
        let remark = this.giveUpAlert.Friendregion;

        this.API.addFriend({
          userIdFk,stuIdFk,type,remark
        })
        .then(res=>{
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.dialogFormVisibleFriend = false;
        }).catch(err => {
          console.log(err.message)
        });
      })
    },
    // 编辑学员信息
    edit(){
      this.$router.push({path:'edit-student',query:{stuId:this.stuId}});
    },
    //放弃归属
    _giveUpEnter(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return;

        this.API.delBelongTo({
          stuId: this.stuId
        })
        .then(res=>{
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }).catch(err => {
          console.log(err.message)
        });


        this.dialogFormVisible = false;
      })
    },
    // 查看回访计划
    getStuFollowDetail(){
      this.API.getStuFollowDetail({
        stuId: this.stuId,
        userId: this.userId
      })
      .then(res=>{
        this.EditReturn.backPlan = res.result.backPlan
        this.EditReturn.backTime = res.result.backTime
        this.EditReturn.backRemark = res.result.backRemark
        this.EditReturn.id = res.result.id
      }).catch(err => {
        for(var k in this.EditReturn){
          this.EditReturn[k] = "";
        }
        //console.log(err.message)
      });
    },
    // 提交计划
    EditReturnUp(){
      if (!String(this.EditReturn.backPlan)) {
        this.$message({
          message: '回访时间不能为空',
          type: 'warning'
        });
        return;
      }
      this.API.mdfStuFollowDetail(
        this.EditReturn
      )
      .then(res=>{

      }).catch(err => {
        console.log(err.message)
      });

      this.dialogFormEditReturn = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  .studentInfo{
    margin: 20px 0px 0 20px;
    background: #fff;
    .studentHeader{
  		width: 100%;
  		margin-top: 10px;
      overflow: hidden;
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
  		.slideTitle{
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
    .pay{
      overflow: hidden;
      .list{
        float: left;
        width: 80%;
      }
      .eidtPlan{
        float: left;
        margin-top: 40px;
      }

    }
    .list{
      padding: 10px 20px 20px 20px;
      overflow: hidden;
      border-bottom: 1px solid #f4f4f4;
      li{
        float: left;
        overflow: hidden;
        width: 33.333%;
        text-align: center;
        line-height: 40px;
        span{
          color: #2c2f33;
          display: block;
          float: left;
          width: 50%;
          text-align: left;
          &.study-use{
            line-height: 24px;
            margin-top: 7px;
            word-break: break-word;
          }
        }
        strong{
          color: #848e99;
          width: 50%;
          display: block;
          float: left;
          text-align: right;
        }
      }
    }
    .giveUpAlert{
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
