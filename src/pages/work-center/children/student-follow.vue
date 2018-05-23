<template>
  <div class="follow-wp">
    <div class="follow-hd">
      <el-button class="mr10" type="primary" @click="addFollowDialog = true">手动录入跟进</el-button>
      <el-button class="mr10" type="primary" @click="qryAllSchoolInfo">创建分校预约单</el-button>
      <el-button type="primary" @click="handleAddOrder">创建订单</el-button>
    </div>

    <div class="follow-bd mt20">
      <el-tabs v-model="logTabName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="跟进信息" name="followList">
          <follow-list :follow-list="followList" :add-friend-list="addFriendList" :update-list="updateList"></follow-list>
        </el-tab-pane>

        <el-tab-pane label="分校预约单" name="advanceList">
          <follow-advance :advance-list="advanceList"></follow-advance>
        </el-tab-pane>

        <el-tab-pane label="成交订单" name="orderList">
          <follow-order :order-list="orderList"></follow-order>
        </el-tab-pane>

        <el-tab-pane label="通话记录" name="callList">
          <follow-call :call-list="callList"></follow-call>
        </el-tab-pane>

        <el-tab-pane label="在线聊天" name="chatList">
          <follow-chat :chat-list="chatList"></follow-chat>
        </el-tab-pane>

        <el-tab-pane label="流转日志" name="allocateList">
          <follow-allocate :allocate-list="allocateList"></follow-allocate>
        </el-tab-pane>
      </el-tabs>

    </div>

    <!-- 手动录入跟进 弹框 -->
    <el-dialog class="stick" title="新增跟进记录" :visible.sync="addFollowDialog"  width="760px">
      <el-form :model="followUp" :rules="rules" ref="followUp" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="联系时间" prop="followTimeMinute">
          <el-date-picker
            v-model="followUp.followTimeMinute"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="followMode">
          <el-select v-model="followUp.followMode" placeholder="请选择">
            <el-option
            v-for="item in wordbook.followMode"
            :key="item.id"
            :label="item.label"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨打结果" prop="isConnect" v-if="followUp.followMode == 1 || followUp.followMode == 0">
          <el-select v-model="followUp.isConnect" placeholder="请选择" @change="playCallResult($event)">
            <el-option
              v-for="item in wordbook.isConnect"
              :key="item.id"
              :value="item.id" :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通结果" prop="isValid">
          <el-select v-model="followUp.isValid" placeholder="请选择">
            <el-option
              v-for="item in wordbook.isValid"
              :disabled="followUp.followMode == 1 || followUp.followMode == 0"
              :key="item.id"
              :value="item.id"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="沟通备注" >
          <el-input  type="textarea" v-model="followUp.remark" style="width:270%"></el-input>
        </el-form-item>
        <!-- <current title="回访计划"></current> -->
        <div class="g-title">
          <h2>回访计划</h2>
        </div>

        <el-form-item label="回访时间" style="width:100%;">
          <el-select v-model="followUp.backPlan" placeholder="请选择">
            <el-option
            v-for="item in wordbook.backPlan"
            :key="item.id"
            :value="item.id"
            :label="item.label">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="followUp.backTimeMinute"
            v-if="followUp.backPlan !== 4"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="备注"  >
          <el-input  type="textarea" v-model="followUp.backRemark" style="width:270%"></el-input>
        </el-form-item>

        <el-form-item style=" width:100%; text-align:center; "  >
          <el-button @click="addFollowDialog = false">取消</el-button>
          <el-button type="success" @click="followUprEnter('followUp')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 创建分校预约单 -->
    <el-dialog class="stick" title="创建分校预约单" :visible.sync="schoolDialog"  width="760px">
      <el-form :model="reservations" :rules="reservationsRules" ref="reservations" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="预约时间" prop="advanceTimeMinute">
          <el-date-picker
            v-model="reservations.advanceTimeMinute"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约校区" prop="schoolIdFk">
          <el-select v-model="reservations.schoolIdFk" placeholder="请选择分校">
            <el-option
            v-for="item in schoolList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐项目" prop="proIdFk">
          <el-select v-model="reservations.proIdFk" placeholder="请选择项目" @change="getProject($event)">
            <el-option
            v-for="item in projectOptions"
            :key="item.proId"
            :value="item.proId"
            :label="item.proName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐班型" prop="ctIdFk">
          <el-select v-model="reservations.ctIdFk" placeholder="请选择班型">
            <el-option
            v-for="item in projectClassOptions"
            :key="item.ctId"
            :value="item.ctId"
            :label="item.cname">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推荐价格">
          <el-input v-model="reservations.price"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="推荐原因"  >
          <el-input  type="textarea" v-model="reservations.remark"></el-input>
        </el-form-item>
        <el-form-item style=" width:100%; text-align:center; "  >
          <el-button @click="schoolDialog = false">取消</el-button>
          <el-button type="success" @click="reservationsEnter('reservations')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog class="stick" title="创建订单" :visible.sync="addOrderDialog"  width="760px">
      <el-form :model="orderForm" :rules="createOrderVerification" ref="orderForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="orderForm.name"></el-input>
        </el-form-item>

        <el-form-item label="身份证：" style="width:100%;">
          <el-select  placeholder="请选择：" style="width:35%;" v-model="orderForm.cardType">
            <el-option v-for="(item,index) in idCardOptions" :label="item.label" :value="item.id" :key="index"></el-option>
          </el-select>
          <el-input  style="width:45%;" v-model="orderForm.cardNo"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="售卖省市：">
            <el-cascader
              :options="province"
              @change="handleProvinceChange($event)"
              v-model="sellCity"
              :change-on-select="true"
              clearable
              :props="provinceProps">
            </el-cascader>
          </el-form-item>
        </div>

        <el-form-item label="选择项目：" prop="proIdFk">
          <el-select v-model="orderForm.proIdFk" placeholder="请选择项目" @change="getProject($event)">
            <el-option
            v-for="item in projectOptions"
            :key="item.proId"
            :value="item.proId"
            :label="item.proName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择班型：" prop="ctIdFk" style="width:100%;">
          <el-select v-model="orderForm.ctIdFk" placeholder="请选择班型">
            <el-option
            v-for="item in projectClassOptions"
            :key="item.ctId"
            :value="item.ctId"
            :label="item.cname">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格：" prop="price">
          <el-input v-model="orderForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="优惠金额：" prop="offsetAmount">
          <el-input v-model="orderForm.offsetAmount"></el-input>
        </el-form-item>
        <el-form-item label="实付金额：" style="width:100%;">
          <span>{{orderForm.price - offsetAmount}}元</span>
        </el-form-item>
        <div class="tac">
          <el-button @click="addOrderDialog = false">取消</el-button>
          <el-button type="success" @click="handleOrderSubmit('orderForm')">确定</el-button>
        </div>>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import FollowList from './follow-list'
import FollowAdvance from './follow-advance'
import FollowOrder from './follow-order'
import FollowCall from './follow-call'
import FollowChat from './follow-chat'
import FollowAllocate from './follow-allocate'
import { isidcard, isGAT } from "@/common/util";
import { idCardOptions, isItConnected } from "./data"
export default {
  props: ['stuId', 'student', 'projectOptions'],
  components: {
    FollowList,
    FollowAdvance,
    FollowOrder,
    FollowCall,
    FollowChat,
    FollowAllocate,
  },
  data() {
      // 验证  优惠金额不能小于等于0或大于等于价格金额
      var validateDiscountAmount = (rule, value, callback) => {
        if (this.orderForm.offsetAmount <= 0) {
          callback(new Error('优惠金额不能小于等于0'));
        }
        else if(parseInt(this.orderForm.offsetAmount) >= parseInt(this.orderForm.price)) {
          callback(new Error('优惠金额不能大于等于价格'));
        }
        else {
          callback()
        }
      }
      return {
        logTabName: 'followList',
        idCardOptions,
        followList: [],
        addFriendList: [],
        updateList: [],
        // 手动录入弹框
        addFollowDialog: false,
        schoolDialog: false,
        addOrderDialog: false,
        // 推荐班型号
        projectClassOptions: [],
        // 分校列表
        schoolList: [],
        advanceList: [],  // 分校预约单
        callList: [],
        chatList: [],
        // 编辑学员的记
        orderList: [],  // 订单记录
        allocateList: [],  // 获取学员的流转日志
        province: [],
        provinceProps: {
          value: 'id',
          label: 'city',
          children: 'cities'
        },
        // 售卖的省市
        sellCity:[],
        // 自定义词典
        wordbook:{
          followMode: [
            {id: 0, label: "手机"},
            {id: 1, label: "座机"},
            {id: 2, label: "微信"},
            {id: 3, label: "QQ"}
          ],
          isConnect: isItConnected,
          isValid: [
            {id: 1, label: "有效沟通"},
            {id: 0, label: "无效沟通"}
          ],
          backPlan: [
            {id: 0, label: "隔天联系"},
            {id: 1, label: "约定时间联系"},
            {id: 2, label: "稍后在联系"},
            {id: 3, label: "今晚联系"},
            {id: 4, label: "不需要了"}
          ],
          mode:['系统分配','领取','手动分配']
        },
        followUp:{
          followTimeMinute: "",
          followMode: "",
          isConnect: "",
          isValid: "",
          remark: "",
          backPlan: "",
          backTimeMinute: "",
          backRemark: ""
        },
        // 创建分校预约单 弹框
        reservations:{
          advanceTimeMinute: "",
          schoolIdFk: "",
          proIdFk: "",
          ctIdFk: "",
          price: "",
          remark: ""
        },
        // 创建订单 弹框
        orderForm:{
          name: "",
          cardType: "",
          cardNo: "",
          regionIdFk: "",
          proIdFk: "",
          ctIdFk: "",
          offsetAmount: "",
          price: ""
        },
        rules:{
          followTimeMinute: [
              { required: true, message: '请选择时间', trigger: 'change' }
            ],
          followMode: [
              { required: true, message: '请选择联系方式', trigger: 'change' }
          ],
          isConnect: [
              { required: true, message: '请选择拨打结果', trigger: 'change' }
          ],
          isValid: [
              { required: true, message: '请选择沟通结果', trigger: 'change' }
          ]
        },
        // 创建分校预约单
        reservationsRules:{
          advanceTimeMinute: [
              { required: true, message: '请选择时间', trigger: 'change' }
            ],
          schoolIdFk: [
              { required: true, message: '请填写报名点', trigger: 'change' }
          ],
          proIdFk: [
              { required: true, message: '请选择项目', trigger: 'change' }
          ],
          ctIdFk: [
              { required: true, message: '请选择班型', trigger: 'change' }
          ]
        },
        // 创建订单
        createOrderVerification:{

          proIdFk: [
              { required: true, message: '请选择项目', trigger: 'change' }
          ],
          ctIdFk: [
              { required: true, message: '请选择班型', trigger: 'change' }
          ],
          offsetAmount: [
            {validator: validateDiscountAmount, trigger: 'blur'}
          ]
        },

      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      offsetAmount() {
        return Math.round(this.orderForm.offsetAmount * 100) / 100
      }
    },
    watch: {
      '$route': 'refreshRoute',
      followUp: {
        handler(val, oldVal) {
          console.log(val)
          if (val && val.backPlan == 4) {
            delete this.followUp.backTimeMinute
          }
        },
        deep:true
      }
    },
    created (){
      this.refreshRoute();
      this.qryArea();
    },
    methods: {
      handleTabClick(tab, event) {
        // 分校预约单
        if(this.logTabName == "advanceList"){
          this.qryStudentAdvanceList()
        }
        // 订单记录
        else if(this.logTabName == "orderList"){
          this.qryOrderList()
        }
        // 订单记录
        else if(this.logTabName == "callList"){
          this.getStuCallDetailList()
        }
        // 在线聊天
        else if(this.logTabName == "chatList"){
          this.API.getStuOnlineChatDetailList({stuId: this.stuId}).then((res)=>{
            this.chatList = res.list
          });
        }
        // 获取学员的流转日志
        else if(this.logTabName == "allocateList"){
          this.qryStudentAllocateList()
        }
      },
      // 刷新路由
      refreshRoute(){
        // 获取学员跟进记录：
        this.getStuFollowDetailList();
        // 获取学员跟进记录-好友添加记录
        this.qryStudentFriendList();
        //工作台 - 获取学员跟进记录-编辑学员记录
        this.qryStudentMdfLogList();
        this.getStuCallDetailList();
      },
      getStuCallDetailList(){
        this.API.getStuCallDetailList({stuId: this.stuId}).then((res) => {
          console.log(res)
          this.callList = res.list;
        });
      },
      // 获取学员跟进记录
      getStuFollowDetailList(){
        this.API.getStuFollowDetailList({
          stuId: this.stuId
        }).then(res=>{
          this.followList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 手动新增跟进记录
      followUprEnter(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid) return;
          // 如果选择了 不需要，就不要传时间
          if(this.followUp.backPlan == 4){
            this.followUp.backTimeMinute = ""
          }

          this.followUp.stuIdFk = this.stuId;
          this.API.addStudentFollowDetail(this.followUp)
          .then(res =>{
            this.$message({
              message: '录入成功',
              type: 'success'
            });
            this.addFollowDialog = false;
            this.$router.go(0)
          }).catch(err => {
            console.log(err.message)
          });

        })
      },
      // 获取学员跟进记录-好友添加记录
      qryStudentFriendList(){
        this.API.qryStudentFriendList({
          stuId: this.stuId
        })
        .then(res =>{
          // console.log(res);
          this.addFriendList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      //工作台 - 获取学员跟进记录-编辑学员记录
      qryStudentMdfLogList(){
        this.API.qryStudentMdfLogList({
          stuId: this.stuId
        })
        .then(res =>{
          console.log(res);
          this.updateList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 创建分校预约单
      reservationsEnter(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid) return;

          this.reservations.stuIdFk = this.stuId;
          this.API.addStudentAdvance(this.reservations).then(res =>{
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.schoolDialog = false;
          })
          .catch(err => {
            console.log(err.message)
          });
        })
      },
      // 获取所有分校
      qryAllSchoolInfo(){
        this.schoolDialog = true
        !this.schoolList.length && this.API.qryAllSchoolInfo().then(res =>{
          console.log(res.list);
          this.schoolList = res.list || [];
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 获取所有分校 预约单
      qryStudentAdvanceList(){
        this.API.qryStudentAdvanceList({
          stuId: this.stuId
        }).then(res =>{
          this.advanceList = res.list
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 在创建订单的时候 获取学员信息
      handleAddOrder(){
        const student = this.student
        this.addOrderDialog = true;
        this.orderForm.name =  student.name
        this.orderForm.cardType =  student.cardType
        this.orderForm.cardNo =  student.cardNo
        /*this.API.getStuBaseInfo({
          stuId:this.stuId
        })
        .then(res=>{
          let stuInfo = res.result[0].stuInfo;
          this.orderForm.name =  stuInfo.name;
          this.orderForm.cardType =  stuInfo.cardType;
          this.orderForm.cardNo =  stuInfo.cardNo;
        }).catch(err => {
          console.log(err.message)
        });*/
      },
      //创建订单
      handleOrderSubmit(formName){
        if (this.orderForm.cardType == 1){
          if (!isidcard(this.orderForm.cardNo)) {
            this.$message({
              message: '请输入正确的身份证号',
              type: 'warning'
            })
            return;
          }
        }
        else if (this.orderForm.cardType == 2){
          if (!isGAT(this.orderForm.cardNo)) {
            this.$message({
              message: '请输入正确的港澳台证件号',
              type: 'warning'
            })
            return;
          }
        }
        this.$refs[formName].validate((valid) => {
          if(!valid) return;
          this.orderForm.stuIdFk = this.stuId;
          this.API.addOrder(this.orderForm)
          .then(res =>{
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.addOrderDialog = false;
          })
          .catch(err => {
            console.log(err.message)
          });

        })
        //this.orderForm.dialogFormVisible = false;
      },
      // 获取学员的成交订单记录
      qryOrderList(){
        this.API.qryOrderList({
          stuId: this.stuId
        }).then(res =>{
          //console.log(res);
          this.orderList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 获取学员的流转日志
      qryStudentAllocateList(){
        this.API.qryStudentAllocateList({
          stuId: this.stuId
        }).then(res =>{
          //console.log(res);
          this.allocateList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 获取项目下的班型
      getProject(id){
        this.API.qryAllClassType({
          proIdFk:id
        })
        .then(res =>{
          this.projectClassOptions = res.list;
        })
      },
      // 选择拨打结果时 自动选择
      playCallResult(id){
        //console.log(id);
        if(id == 0){
          this.followUp.isValid = 1;
        }
        else{
          this.followUp.isValid = 0;
        }
      },
      // 请求省市
      qryArea(val){
        this.API.qryArea({areaId: 1}).then((res) => {
          let data = res.result.map((item) => {
            return {
              id: item.id,
              city: item.province || item.city,
              cities: []
            }
          });
          this.province = data;
        })
      },
      // 请求市
      handleProvinceChange(val,key) {
        const province = this.province;
        this.API.qryArea({areaId: val[0] || val}).then((res) => {
          province.forEach((item) => {
            if (item.id == val[0] || item.id == val) {
              if(res.result[0].city){
                item.cities = res.result;
              }else {
                item.cities='';
              }
              return false;
            }

          })
        })
        // 后台只要市 的ID
        if(this.sellCity[1]){
          this.orderForm.regionIdFk = this.sellCity[1]
        }
        else{
          this.orderForm.regionIdFk = this.sellCity[0]
        }
      },
    }
}
</script>

<style lang="scss" scoped>
  .follow-wp {
    margin: 20px 0 20px 20px;
    .follow-hd {
      //padding: 15px;
    }
    .follow-bd {
      min-height: 200px;
      background: #fff;
    }
    .box-card{
      margin-bottom: 20px;
      .el-card__header{
        padding: 10px 20px;
      }
      .list{
        padding: 10px 20px 20px 20px;
        overflow: hidden;
        border-bottom: 1px solid #f4f4f4;
        &.orderList{
          li{
            width: 50%;
          }
        }
        li{
          float: left;
          overflow: hidden;
          width: 100%;
          text-align: left;
          line-height: 40px;
          span{
            color: #2c2f33;
          }
          strong{
            color: #848e99;
          }
        }
      }
      .clearfix{

        .title{
          font-size: 14px;
          strong{
            color: #848e99;
            padding-left: 3px;
          }
        }
        .right{
          float: right; padding: 3px 0;
          color:#848e99;
          font-size: 13px;
        }
      }
    }
    .stick{
      .el-form-item{
        width: 45%;
        display: inline-block;
      }
    }
  }
</style>
<style lang="scss">
.follow-up{
  .box-card{
    .el-card__header{
      padding: 10px 20px;
    }
    .el-card__body{
      padding:10px 10px;
    }
  }
}
</style>
