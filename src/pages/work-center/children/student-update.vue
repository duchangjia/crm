<template>
  <div class="student-info">
    <h1 class="title">编辑学员信息</h1>
    <el-form :inline="true" label-width="100px" size="small" class="touch" ref="updateForm" >
      <div class="item">
        <div class="student-hd">
            <span></span>
            <h3>联系方式</h3>
        </div>
          <el-row class="touch">
              <template v-for="(item, key) in contactList">
                <el-col :span="8" v-if="item.type == 0">
                  <el-form-item label="手机号：" class="is-required">
                    <el-input v-model="item.contact" @change="handleMobileChange(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的手机号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 1">
                  <el-form-item label="座机：" class="is-required">
                    <el-input v-model="item.contact" @change="handlePhoneChange(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的座机号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 2">
                  <el-form-item label="微信：" class="is-required">
                    <el-input v-model="item.contact" @change="handleWXChange(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的微信号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 3">
                  <el-form-item label="QQ：" class="is-required">
                    <el-input v-model="item.contact" @change="handleQQChange(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的QQ号</span>
                  </el-form-item>
                </el-col>
              </template>
          </el-row>
      </div>

      <div class="item">
        <div class="student-hd">
            <span></span>
            <h3>学员概要</h3>
        </div>
          <el-row class="touch">
            <el-col :span="8">
              <el-form-item label="意向度：">
                <ul class="radio-group">
                  <li v-for="(item, key) in degreeOptions" :key="key"
                  :class="key == student.degree - 1 ? 'cur' : ''"
                  :label="item.label" @click="student.degree = key + 1"
                  >{{ item.label }}</li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="意向项目：">
                <el-select  placeholder="请选择" v-model="student.intentSubject">
                  <el-option v-for="(item, key) in projectOptions" :label="item.proName" :value="item.proId" :key="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="意向地域：">
                <el-cascader
                  :options="province"
                  @change="handleProvinceChange($event,'YXDY')"
                  v-model="intentProvinceIdFk"
                  :change-on-select="true"
                  clearable
                  :props="provinceProps">
                </el-cascader>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
      </div>

      <div class="item">
        <div class="student-hd">
            <span></span>
            <h3>基本信息</h3>
        </div>
          <el-row class="touch">
            <el-col :span="8">
              <el-form-item label="昵称：">
                <el-input v-model="student.nick"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="真实姓名：">
                <el-input v-model="student.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学员地域：">
              <el-cascader
                :options="province"
                @change="handleProvinceChange($event,'XYDY')"
                v-model="provinceIdFk"
                :change-on-select="true"
                clearable
                :props="provinceProps">
              </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item label="性别：">
                <ul class="radio-group">
                  <li v-for="(item, key) in genderOptions" :key="key"
                  :class="key == student.sex - 1 ? 'cur' : ''"
                  @click="student.sex = key + 1"
                  >{{ item.label }}</li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄：">
                <el-input v-model="student.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="身份证：">
                <el-select  placeholder="请选择" style="width:40%;" v-model="student.cardType" @change="cardId">
                  <el-option v-for="(item, index) in idCardOptions" :label="item.label" :value="item.id" :key="index"></el-option>
                </el-select>
                <el-input  style="width:55%;" v-model="student.cardNo"></el-input>
                <!-- <span class="el-form-item__error">请输入正确的身份证号</span> -->
              </el-form-item>
            </el-col>
          </el-row>
      </div>

      <div class="item">
        <div class="student-hd">
            <span></span>
            <h3>详细信息</h3>
        </div>
        <el-row class="touch">
          <el-col :span="13">
            <el-form-item label="身份：">
              <el-select  placeholder="请选择" style="width:30%;" v-model="student.identity">
                <el-option v-for="(item, key) in identityOptions" :label="item.label" :value="item.id" :key="key"></el-option>
              </el-select>
              <el-select  placeholder="" style="width:40%;" v-model="student.intentSubject">
                <el-option v-for='(item,index) in occupationOptions' :label="item.label" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="水平：">
              <!-- <el-radio-group v-model="detailedInfo.level">
                <el-radio-button label="零基础"></el-radio-button>
                <el-radio-button label="有基础"></el-radio-button>
                <el-radio-button label="基础较好"></el-radio-button>
              </el-radio-group> -->
              <ul class="radio-group">
                <li v-for="(item, key) in levelOptions" :key="key"
                :class="key == student.level ? 'cur' : ''"
                @click="student.level = item.id"
                >{{ item.label }}</li>
              </ul>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计划上课时间：" label-width="140px">
              <ul class="radio-group">
                <li v-for="(item, key) in classTimeOptions" :key="key"
                :class="key == student.classTime ? 'cur' : ''"
                @click="student.classTime = key"
                >{{ item.label }}</li>
              </ul>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开始学习时间：" label-width="140px">
              <el-date-picker
                v-model="student.startStudyTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学习用途：" class="textarea">
              <el-input type="textarea" v-model="student.purpose"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

      </div>
    </el-form>

    <div class="ctr">
      <el-button type="" class="btn" @click="$router.go(-1)">返回</el-button>
      <el-button type="primary" class="btn" @click="handleSubmit()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isMobile, isPhone, isQQ, isWeixin, isidcard, isGAT } from "@/common/util.js";
import { identityOptions, occupationOptions, degreeOptions, genderOptions, levelOptions, classTimeOptions, idCardOptions} from "./data.js";
export default {
  data(){
    return {
      validate: true,
      student:{},
      province: [],
      provinceProps: {
        value: 'id',
        label: 'city',
        children: 'cities'
      },
      // 联系方式
      contactList: [],
      projectOptions: [],
      // 意向省、市
      intentProvinceIdFk: [],
      // 学员省、市
      provinceIdFk: [],
      // 这下面是引进的模块
      identityOptions,
      occupationOptions,
      degreeOptions,
      genderOptions,
      levelOptions,
      classTimeOptions,
      idCardOptions
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.getStuBaseInfo()
    this.qryAllProject()
    this.qryArea()
  },
  methods: {
    // 获取学员信息
    getStuBaseInfo(){
      this.API.getStuBaseInfo({
        stuId: this.$route.params.id
      }).then(res => {
        //console.log(res);
        // 把旧的数据保存起来
        const student = res.result[0].stuInfo
        this.student = student
        let contactList = res.result[0].contactList
        contactList.forEach((item,val) => {
          item.validateMobile = false
          item.oldContact = item.contact
        })
        this.contactList = contactList

        //学员意向地域  拼接
        this.intentProvinceIdFk = [student.intentProvinceIdFk, student.intentCityIdFk]

        //学员地域  拼接
        this.provinceIdFk = [student.provinceIdFk, student.cityIdFk]
      }).catch(err => {
        console.log(err.message)
      })
    },
    // 获取所有项目列表
    qryAllProject(){
      this.API.qryAllProject().then(res=>{
        //console.log(res.list);
        this.projectOptions = res.list;
      }).catch(err => {
        console.log(err.message)
      });
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

        //这个主要是为了编辑 显示出来省市
        if(this.intentProvinceIdFk[1]){
          this.handleProvinceChange(this.intentProvinceIdFk[0]);
        }

        if(this.provinceIdFk[1]){
          this.handleProvinceChange(this.provinceIdFk[0]);
        }
      })
    },
    // 请求市
    handleProvinceChange(val,key) {
      // 意向地域
      if(key == 'YXDY'){
        this.student.intentProvinceIdFk = val[0];
        this.student.intentCityIdFk=val[1];
      }
      else if(key == 'XYDY'){
        this.student.provinceIdFk = val[0];
        this.student.cityIdFk = val[1];
      }
      //if (val.length > 1) return;
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
    },
    handleSubmit() {
      if(this.student.cardNo){
        if (this.student.cardType == 1){
          if (!isidcard(this.student.cardNo)) {
            this.$message({
              message: '请输入正确的身份证号',
              type: 'warning'
            })
            return;
          }
        } else if (this.student.cardType == 2) {
          if (!isGAT(this.student.cardNo)) {
            this.$message({
              message: '请输入正确的港澳台证件号',
              type: 'warning'
            })
            return;
          }
        }
      }

      if (this.validate) {
        this.API.mdfStuInfo({
          userIdFk: this.userInfo.userId,
          stuInfo: this.student,
          contactList: this.contactList,
        }).then(res=>{
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.$router.go(-1)
        }).catch(err => {
          console.log(err.message)
        });
      } else {
        this.$message({
          message: "请检查表单",
          type: 'error'
        })
      }
    },
    // 验证手机号
    handleMobileChange(item,value) {
      this.validateEvent(item, value, isMobile, 0)
    },
    // 验证 座机
    handlePhoneChange(item,value) {
      this.validateEvent(item, value, isPhone, 1)
    },
    // 验证 微信号
    handleWXChange(item,value) {
      this.validateEvent(item, value, isWeixin, 2)
    },
    // 验证 QQ号
    handleQQChange(item,value) {
      this.validateEvent(item, value, isQQ, 3)
    },
    // 验证 的事件
    validateEvent(item, value, fn, type) {
      if (item.type == type) {
        if (!fn(value)) {
          item.validateMobile = true;
          this.validate = false;
        }
        else{
          // 对了
          item.validateMobile = false;
          this.validate = true;
        }
      }
    },
    // 验证身份证号
    cardId(){
      // 如果输入为空我们就不验证
    },
  },

}
</script>

<style lang="scss" scoped>
  .student-info{
    background: #fff;
    overflow: hidden;
    margin-left: 20px;
    padding-bottom: 30px;
    .radio-group{
      li{
        padding: 0px 15px;
        font-size: 12px;
        border: 1px solid #dcdfe6;
        float: left;
        &+li{
          border-left: none;
          cursor: pointer;
        }
        &:first-child{
          border-radius: 4px 0 0 4px;
        }
        &:last-child{
          border-radius: 0px 4px 4px 0px;
        }
        &.cur{
          background: #409EFF;
          color: #fff;
        }
      }
    }
    .item{
      .touch{
        margin-top: 20px;
      }
    }
    .title{
      font-weight: bold;
      color: #333;
      padding:15px 0px 0px 15px;;
    }
    .student-hd{
      line-height: 20px;
      margin-top: 20px;
      overflow: hidden;
      span{
        display: block;
        float: left;
        width: 4px;
        height: 20px;
        background: #38a6fa;
      }
      h3{
        float: left;
        margin-left: 10px;
      }
    }
    .ctr{
      text-align: center;
      margin-top: 25px;
      .btn{
          width: 20%;
      }
    }

  }

</style>
<style type="scss">
  .student-info .textarea .el-textarea__inner{
    height: 90px;
    width: 175% !important;
  }
</style>
