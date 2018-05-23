<template lang="html">
  <div class="follow-up">
    <div class="btn">
      <el-button type="primary" @click="followUpDialogFormVisible = true">手动录入跟进</el-button>
      <el-button type="primary" @click="qryAllSchoolInfo">创建分校预约单</el-button>
      <el-button type="primary" @click="getStudentInfo">创建订单</el-button>
    </div>

    <el-tabs class="fllowup-tab" v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="跟进信息" name="followUp">
        <el-row :gutter="20" style="padding:0px 15px;">
          <el-col
            :span="12"
            v-for="(item,index) in studentFollowUp"
            :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix" v-if="item.followMode || item.followMode==0">
                <span class="title">{{wordbook.followMode[item.followMode].label || '其他'}}<strong v-show="item.source == 1">(去电生成)</strong></span>
                <p class="right" type="text">{{item.followTime}}</p>
              </div>
              <ul class="list text item">
                <li v-show="item.isConnect == 0 || item.isConnect == 1">
                  <strong>拨打结果：</strong>
                  <span v-if="item.isConnect || item.isConnect == 0">{{wordbook.isConnect[item.isConnect].label}}</span>
                </li>
                <li >
                  <strong>沟通结果：</strong>
                  <span  v-if="item.isValid || item.isValid == 0">{{ item.isValid == 0 ? '无效果跟进' : '有效跟进' }}</span>
                </li>
                <li>
                  <strong>下次回访时间：</strong>
                  <span>{{item.backTime}}</span>
                </li>
                <li>
                  <strong>备注：</strong>
                  <span class="remarks">{{item.remark}}</span>
                </li>
              </ul>
            </el-card>
          </el-col>
          <!-- 已加地友记录 -->
          <el-col
            :span="12"
            v-for="(item,index) in myAddFriendList"
            :key="index+200">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">我已加好友</span>
                <p class="right" type="text">{{item.createTime}}</p>
              </div>
              <ul class="list text item">
                <li>
                  <strong>操作人：</strong>
                  <span>{{item.operateName}}</span>
                </li>
                <li>
                  <strong>添加方式：</strong>
                  <span v-if="item.type || item.type==0">{{wordbook.followMode[item.type].label}}</span>
                </li>
                <li>
                  <strong>添加账号：</strong>
                  <span>{{item.remark}}</span>
                </li>
              </ul>
            </el-card>
          </el-col>

          <!-- 编辑学员的记录 -->
          <el-col
            :span="12"
            v-for="(item,index) in editStudentList"
            :key="index+300">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">编辑学员信息</span>
                <p class="right" type="text">{{item.createTime}}</p>
              </div>
              <ul class="list text item">
                <li>
                  <strong>操作人：</strong>
                  <span>{{item.operateName}}</span>
                </li>
                <li v-if="item.newMobile || item.mobile">
                  <strong >修改手机号：</strong>
                  <span>{{item.mobile}} <i class="el-icon-d-arrow-right"></i> {{item.newMobile}} </span>
                </li>
                <li v-if="item.newWechat || item.wechat">
                  <strong>修改微信号：</strong>
                  <span>{{item.wechat}} <i class="el-icon-d-arrow-right"></i> {{item.newWechat}} </span>
                </li>
                <li v-if="item.newQq || item.qq">
                  <strong>修改QQ：</strong>
                  <span>{{item.qq}} <i class="el-icon-d-arrow-right"></i> {{item.newQq}} </span>
                </li>
                <li v-if="item.newPhone || item.phone">
                  <strong>修改座机号：</strong>
                  <span>{{item.phone}} <i class="el-icon-d-arrow-right"></i> {{item.newPhone}} </span>
                </li>
                <li v-if="item.proName || item.newProName">
                  <strong>修改意向项目：</strong>
                  <span>{{item.proName}} <i class="el-icon-d-arrow-right"></i> {{item.newProName}} </span>
                </li>
                <li v-if="item.newRegionName || item.regionName">
                  <strong>修改机会地域：</strong>
                  <span>{{item.regionName}} <i class="el-icon-d-arrow-right"></i> {{item.newRegionName}} </span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="分校预约单" name="schoolOrder">
        <el-row :gutter="20" style="padding:0px 15px;">
          <el-col
            :span="12"
            v-for="(item,index) in schoolReservation"
            :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">{{item.schoolName}}</span>
                <p class="right" type="text">{{item.createTime}}</p>
              </div>
              <ul class="list text item">
                <li>
                  <strong>推荐项目：</strong>
                  <span>{{item.proName}}</span>
                </li>
                <li >
                  <strong>推荐班型：</strong>
                  <span>{{item.cname}}</span>
                </li>
                <li>
                  <strong>推荐价格：</strong>
                  <span>{{item.price}}</span>
                </li>
                <li>
                  <strong>推荐原因：</strong>
                  <span>{{item.remark}}</span>
                </li>
              </ul>
            </el-card>
          </el-col>

        </el-row>
      </el-tab-pane>
      <el-tab-pane label="成交订单" name="dealOrder">
        <el-row :gutter="20" style="padding:0px 15px;">
          <el-col
            :span="12"
            v-for="(item,index) in orderList"
            :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">订单ID:{{item.sn}}</span>
                <p class="right" type="text">{{item.createTime}}</p>
              </div>
              <ul class="list text item dealOrder">
                <li>
                  <strong>姓名：</strong>
                  <span>{{item.name}}</span>
                </li>
                <li >
                  <strong>大陆身份证：</strong>
                  <span>{{item.cardNo}}</span>
                </li>
                <li>
                  <strong>省市：</strong>
                  <span>{{item.regionName}}</span>
                </li>
                <li>
                  <strong>项目：</strong>
                  <span>{{item.proName}}</span>
                </li>
                <li>
                  <strong>班型：</strong>
                  <span>{{item.cname}}</span>
                </li>
                <li>
                  <strong>价格：</strong>
                  <span>{{item.price}}元</span>
                </li>
                <li>
                  <strong>优惠金额：</strong>
                  <span>{{item.offsetAmount}}元</span>
                </li>
                <li>
                  <strong>实付金额：</strong>
                  <span>{{item.amount}}元</span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="通话记录" name="callRecord">
        <el-row :gutter="20" class="padding-left-right-20">
          <el-col :span="12" v-for="(item,index) in contactMsg" :key="index" class="margin-bottom-10">
            <el-card>
              <div slot="header" class="clear">
                <span>咨询师：{{item.userName}}</span>
                <span class="right">{{item.followTime}}</span>
              </div>
              <div>
                <div class="lineHeight-40">拨打结果：{{item.isValid?'有效':'无效'}}</div>
                <div class="lineHeight-40">通话时长：{{item.duration}}</div>
                <div class="lineHeight-40">电话录音：
                  <el-button type="text" class="margin-right-10" @click="playAudio" v-if="item.url">
                    播放
                  </el-button>
                  <audio :src="item.url" controls="controls" preload hidden/>
                  <a :href="item.url" download="tanzhouCRM" class="downloadBtn" v-if="item.url">下载</a>
                </div>
                <div><span class="lineHeight-40">沟通备注：</span>{{item.remark}}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="在线聊天" name="chatOnline">暂无接口</el-tab-pane>
      <el-tab-pane label="流转日志" name="roamLog">
        <el-row :gutter="20" style="padding:0px 15px;">
          <el-col
            :span="12"
            v-for="(item,index) in studentAllocateList"
            :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="title">{{wordbook.mode[item.mode]}}</span>
                <p class="right" type="text">{{item.createTime}}</p>
              </div>
              <ul class="list text item">
                <li>
                  <strong>接待客服：</strong>
                  <span>{{item.operateName}}</span>
                </li>
                <li >
                  <strong>原归属咨询师：</strong>
                  <span>{{item.beforeUserName}}</span>
                </li>
                <li>
                  <strong>分配归属咨询师：</strong>
                  <span>{{item.userName}}</span>
                </li>
              </ul>
            </el-card>
          </el-col>

        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 手动录入跟进 弹框 -->
    <el-dialog class="stick" title="新增跟进记录" :visible.sync="followUpDialogFormVisible"  width="60%">
      <el-form :model="followUp" :rules="rules" ref="followUp" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="联系时间" prop="followTimeMinute">
          <el-date-picker
            v-model="followUp.followTimeMinute"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="followMode">
          <el-select v-model="followUp.followMode" placeholder="请选择">
            <el-option
            v-for='item in wordbook.followMode'
            :key="item.id"
            :label="item.label"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨打结果" prop="isConnect" v-if="followUp.followMode == 1 || followUp.followMode == 0">
          <el-select v-model="followUp.isConnect" placeholder="请选择" @change="playCallResult($event)">
            <el-option
              v-for='item in wordbook.isConnect'
              :key="item.id"
              :value="item.id" :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通结果" prop="isValid">
          <el-select v-model="followUp.isValid" placeholder="请选择">
            <el-option
              v-for='item in wordbook.isValid'
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
            v-for='item in wordbook.backPlan'
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
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="备注"  >
          <el-input  type="textarea" v-model="followUp.backRemark" style="width:270%"></el-input>
        </el-form-item>

        <el-form-item style=" width:100%; text-align:center; "  >
          <el-button @click="followUpDialogFormVisible = false">取消</el-button>
          <el-button type="success" @click="followUprEnter('followUp')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 创建分校预约单 -->
    <el-dialog class="stick" title="创建分校预约单" :visible.sync="reservationsDialogFormVisible"  width="60%">
      <el-form :model="reservations" :rules="reservationsRules" ref="reservations" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="预约时间" prop="advanceTimeMinute">
          <el-date-picker
            v-model="reservations.advanceTimeMinute"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约校区" prop="schoolIdFk">
          <el-select v-model="reservations.schoolIdFk" placeholder="请选择分校">
            <el-option
            v-for='item in allSchoolInfo'
            :key="item.id"
            :value="item.id"
            :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐项目" prop="proIdFk">
          <el-select v-model="reservations.proIdFk" placeholder="请选择项目" @change="getProject($event)">
            <el-option
            v-for='item in intentSubject'
            :key="item.proId"
            :value="item.proId"
            :label="item.proName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐班型" prop="ctIdFk">
          <el-select v-model="reservations.ctIdFk" placeholder="请选择班型">
            <el-option
            v-for='item in projectClassType'
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
          <el-button @click="reservationsDialogFormVisible = false">取消</el-button>
          <el-button type="success" @click="reservationsEnter('reservations')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog class="stick" title="创建订单" :visible.sync="createOrderDialogFormVisible"  width="50%">
      <el-form :model="createOrder" :rules="createOrdeVerificationr" ref="createOrder" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：">
          <el-input v-model="createOrder.name"></el-input>
        </el-form-item>

        <el-form-item label="身份证：" style="width:100%;">
          <el-select  placeholder="请选择：" style="width:35%;" v-model="createOrder.cardType">
            <el-option v-for='(item,index) in idCardOptions' :label="item.label" :value="item.id" :key="index"></el-option>
          </el-select>
          <el-input  style="width:45%;" v-model="createOrder.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="售卖省市：">
          <el-cascader
            :options="province"
            @change="handleItemChange($event)"
            v-model="sellCity"
            :change-on-select="true"
            clearable
            :props="provinceProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="选择项目：" prop="proIdFk">
          <el-select v-model="createOrder.proIdFk" placeholder="请选择项目" @change="getProject($event)">
            <el-option
            v-for='item in intentSubject'
            :key="item.proId"
            :value="item.proId"
            :label="item.proName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择班型：" prop="ctIdFk" style="width:100%;">
          <el-select v-model="createOrder.ctIdFk" placeholder="请选择班型">
            <el-option
            v-for='item in projectClassType'
            :key="item.ctId"
            :value="item.ctId"
            :label="item.cname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input type="" v-model.number="createOrder.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="优惠金额：" prop="offsetAmount">
          <el-input v-model.number="createOrder.offsetAmount"></el-input>
        </el-form-item>
        <el-form-item label="实付金额：" style="width:100%;">
          <span>{{createOrder.price - favorablePrice}}元</span>
        </el-form-item>
        <el-form-item style=" width:100%; text-align:center; "  >
          <el-button @click="createOrderDialogFormVisible = false">取消</el-button>
          <el-button type="success" @click="createOrderEvent('createOrder')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { isidcard, isGAT } from "@/common/util.js";
import { idCardOptions, editReturnList, isItConnected, studentContact, communicateResults } from "./../data/data.js"
export default {
  props: ['intentSubject'],
  components: {
  },
  computed:{
    // 优惠价格 保留两位小数
    favorablePrice(){
      const offsetAmount = this.createOrder.offsetAmount;
      return Math.round(this.createOrder.offsetAmount*100)/100
    }
  },
  data() {
      // 验证  优惠金额不能小于等于0或大于等于价格金额
      var validateDiscountAmount = (rule, value, callback) => {

        if(this.createOrder.offsetAmount >= this.createOrder.price){
          callback(new Error('优惠金额不能大于等于价格金额'));
        }
        else if (this.createOrder.offsetAmount <= 0) {
          callback(new Error('优惠金额不能小于等于0'));
        }
        else {
          callback()
        }
      }
      return {
        activeName2: 'followUp',
        idCardOptions,
        contactMsg:[],
        studentFollowUp:[],
        // 手动录入弹框
        followUpDialogFormVisible:false,
        reservationsDialogFormVisible:false,
        createOrderDialogFormVisible: false,
        // 推荐班型号
        projectClassType: [],
        // 分校列表
        allSchoolInfo: [],
        // 分校预约单
        schoolReservation: [],
        // 我已加好友
        myAddFriendList: [],
        // 编辑学员的记录
        editStudentList: [],
        // 订单记录
        orderList: [],
        // 获取学员的流转日志
        studentAllocateList: [],
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
          followMode: studentContact,
          isConnect: isItConnected,
          isValid:communicateResults,
          backPlan: editReturnList,
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
        createOrder:{
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
        createOrdeVerificationr:{
          proIdFk: [
              { required: true, message: '请选择项目', trigger: 'change' }
          ],
          ctIdFk: [
              { required: true, message: '请选择班型', trigger: 'change' }
          ],
          offsetAmount: [
            {validator: validateDiscountAmount, trigger: 'blur'},
            { type: 'number', message: '必须为数字值'}
          ],
          price: [
            { required: true, type: 'number', message: '必须为数字值'}
          ]
        },

      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
     '$route': 'refreshRoute'
     },
    created (){
      this.refreshRoute();
      // 取到省
      this.qryArea();
    },
    methods: {
      playAudio(evt) {
        //播放音频
        let targetElement = evt.target;
        if(targetElement.tagName!=='SPAN') return;
        let audio = targetElement.parentElement.parentElement.children[1];
        let handle=function () {
          //播放完成后重新load
          audio.load();
          targetElement.innerText = '播放';
        };
        audio.removeEventListener("ended", handle, false);
        audio.addEventListener('ended', handle, false);
        if (audio.paused) {
          audio.play();// 播放
          targetElement.innerText = '暂停'
        } else {
          audio.pause();// 暂停
          targetElement.innerText = '播放'
        }
      },
      handleClick(tab, event) {
        if(this.activeName2 == "schoolOrder"){
          // 分校预约单
          this.qryStudentAdvanceList();
        }
        else if(this.activeName2 == "dealOrder"){
          // 订单记录
          this.qryOrderList();
        }
        else if(this.activeName2 == "roamLog"){
          // 获取学员的流转日志
          this.qryStudentAllocateList();
        }
      },
      // 刷新路由
      refreshRoute(){
        this.userId = this.$store.state.user.userInfo.userId;
        //学员ID
        this.stuId = this.$router.currentRoute.query.stuId;
        // 获取学员跟进记录：
        this.getStuFollowDetailList();
        // 获取学员跟进记录-好友添加记录
        this.qryStudentFriendList();
        //工作台 - 获取学员跟进记录-编辑学员记录
        this.qryStudentMdfLogList();
        this.getCalllLog();
      },
      getCalllLog(){
        const stuId=this.$router.currentRoute.query.stuId;
        this.API.getStuCallDetailList({stuId:stuId}).then((res)=>{
          this.contactMsg=res.list;
        });
      },
      // 获取学员跟进记录
      getStuFollowDetailList(){
        this.API.getStuFollowDetailList({
          stuId: this.stuId
        })
        .then(res=>{
          this.studentFollowUp = res.list;
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
            this.followUpDialogFormVisible = false;
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
          this.myAddFriendList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 工作台 - 获取学员跟进记录-编辑学员记录
      qryStudentMdfLogList(){
        this.API.qryStudentMdfLogList({
          stuId: this.stuId
        })
        .then(res =>{
          console.log(res);
          this.editStudentList = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 创建分校预约单
      reservationsEnter(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid) return;

          this.reservations.stuIdFk = this.stuId;
          this.API.addStudentAdvance(this.reservations)
          .then(res =>{
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.reservationsDialogFormVisible = false;
          })
          .catch(err => {
            console.log(err.message)
          });
        })
      },
      // 获取所有分校
      qryAllSchoolInfo(){
        this.reservationsDialogFormVisible = true
        this.API.qryAllSchoolInfo()
        .then(res =>{
          console.log(res.list);
          this.allSchoolInfo = res.list;
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 获取所有分校 预约单
      qryStudentAdvanceList(){
        this.API.qryStudentAdvanceList({
          stuId: this.stuId
        })
        .then(res =>{
          this.schoolReservation = res.list
        }).catch(err => {
          console.log(err.message)
        });
      },
      // 在创建订单的时候 获取学员信息
      getStudentInfo(){
        this.createOrderDialogFormVisible = true;
        this.API.getStuBaseInfo({
          stuId:this.stuId
        })
        .then(res=>{
          let stuInfo = res.result[0].stuInfo;
          this.createOrder.name =  stuInfo.name;
          this.createOrder.cardType =  stuInfo.cardType;
          this.createOrder.cardNo =  stuInfo.cardNo;
        }).catch(err => {
          console.log(err.message)
        });
      },
      //创建订单
      createOrderEvent(formName){
        if (this.createOrder.cardType == 1){
          if (!isidcard(this.createOrder.cardNo)) {
            this.$message({
              message: '请输入正确的身份证号',
              type: 'warning'
            })
            return;
          }
        }
        else if (this.createOrder.cardType == 2){
          if (!isGAT(this.createOrder.cardNo)) {
            this.$message({
              message: '港澳台居民身份证',
              type: 'warning'
            })
            return;
          }
        }
        this.$refs[formName].validate((valid) => {
          if(!valid) return;
          this.createOrder.stuIdFk = this.stuId;
          this.API.addOrder(this.createOrder)
          .then(res =>{
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.createOrderDialogFormVisible = false;
          })
          .catch(err => {
            console.log(err.message)
          });

        })
        //this.createOrder.dialogFormVisible = false;
      },
      // 获取学员的成交订单记录
      qryOrderList(){
        this.API.qryOrderList({
          stuId: this.stuId
        })
        .then(res =>{
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
        })
        .then(res =>{
          //console.log(res);
          this.studentAllocateList = res.list;
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
          this.projectClassType = res.list;
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
      handleItemChange(val,key) {
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
          this.createOrder.regionIdFk = this.sellCity[1]
        }
        else{
          this.createOrder.regionIdFk = this.sellCity[0]
        }


      },
    }
}
</script>

<style lang="scss" scoped>
  .follow-up{
    margin-left: 20px;
    background: #fff;
    padding-bottom: 30px;
    .btn{
      margin: 15px 0;
    }
    .fllowup-tab{
      background: #fff;
    }
    .box-card{
      margin-bottom: 20px;
      .el-card__header{
        padding: 10px 20px;
      }
      .el-card__body{
        padding: 0;
      }
      .list{
        padding: 0px 20px 10px 20px;
        overflow: hidden;
        border-bottom: 1px solid #f4f4f4;
        &.dealOrder{
          li{
            width: 50%;
          }
        }
        li{
          float: left;
          overflow: hidden;
          width: 100%;
          text-align: left;
          margin: 10px 0px;
          span{
            color: #2c2f33;
            display: block;
            //float: left;
          }
          strong{
            color: #848e99;
            float: left;
          }
          // 备注有很多字要单独处理下
          .remarks{
            line-height: 24px;
            margin-top: -1px;
            word-break: break-word;
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
    // 如果浏览器支持 flex 就用flex 不行就用float  主要解决卡片错位问题
    .el-row{
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>

<style lang="css">
.follow-up .el-card__header{
  padding: 10px 20px;
}
.follow-up .el-card__body{
  padding: 0;
}
</style>
