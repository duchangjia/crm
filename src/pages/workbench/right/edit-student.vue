<template lang="html">
  <div class="studentInfo">
    <h1 class="title">编辑学员信息</h1>
    <el-form :inline="true" label-width="100px" size="small" class="touch" ref="eidtStudent" >
      <div class="item">
        <div class="studentHeader">
            <span></span>
            <h3>联系方式</h3>
        </div>
          <el-row class="touch">
              <template v-for="(item,index) in contactList">
                <el-col :span="8" v-if="item.type == 0">
                  <el-form-item label="手机号：" class="is-required">
                    <el-input v-model="item.contact" @change="telblur(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的手机号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 1">
                  <el-form-item label="座机：" class="is-required">
                    <el-input v-model="item.contact" @change="Camerablur(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的座机号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 2">
                  <el-form-item label="微信：" class="is-required">
                    <el-input v-model="item.contact" @change="Weixinblur(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的微信号</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else-if="item.type == 3">
                  <el-form-item label="QQ：" class="is-required">
                    <el-input v-model="item.contact" @change="QQblur(item,item.contact)"></el-input>
                    <span v-if="item.validateMobile" class="el-form-item__error">请输入正确的QQ号</span>
                  </el-form-item>
                </el-col>
              </template>
          </el-row>
      </div>

      <div class="item">
        <div class="studentHeader">
            <span></span>
            <h3>学员概要</h3>
        </div>
          <el-row class="touch">
            <el-col :span="8">
              <el-form-item label="意向度：">
                <ul class="radio-group">
                  <li v-for='(item,index) in degreeList'
                  :label="item.label"
                  :class="index == stuInfo.degree-1 ? 'cur' : ''"
                  :key="index"
                  @click="degreeEv(index)"
                  >{{item.label}}</li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="意向项目：">
                <el-select  placeholder="请选择" v-model="stuInfo.intentSubject">
                  <el-option v-for='(item,index) in intentSubject' :label="item.proName" :value="item.proId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="意向地域：">
                <el-cascader
                  :options="province"
                  @change="handleItemChange($event,'YXDY')"
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
        <div class="studentHeader">
            <span></span>
            <h3>基本信息</h3>
        </div>
          <el-row class="touch">
            <el-col :span="8">
              <el-form-item label="昵称：">
                <el-input v-model="stuInfo.nick"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="真实姓名：">
                <el-input v-model="stuInfo.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学员地域：">
              <el-cascader
                :options="province"
                @change="handleItemChange($event,'XYDY')"
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
                  <li v-for='(item,index) in sexList'
                  :class="index == stuInfo.sex-1 ? 'cur' : ''"
                  :key="index"
                  @click="sexEv(index)"
                  >{{item.label}}</li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄：">
                <el-input v-model="stuInfo.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="身份证：">
                <el-select  placeholder="请选择" style="width:40%;" v-model="stuInfo.cardType" @change="cardId">
                  <el-option v-for='(item,index) in cardNoList' :label="item.label" :value="item.id" :key="index"></el-option>
                </el-select>
                <el-input  style="width:55%;" v-model="stuInfo.cardNo"></el-input>
                <span v-if="isCardNo" class="el-form-item__error">请输入正确的身份证号</span>
                <!-- <span v-else class="el-form-item__error">请输入正确的港澳台居民证件</span> -->
              </el-form-item>
            </el-col>
          </el-row>
      </div>

      <div class="item">
        <div class="studentHeader">
            <span></span>
            <h3>详细信息</h3>
        </div>
        <el-row class="touch">
          <el-col :span="13">
            <el-form-item label="身份：">
              <el-select  placeholder="请选择" style="width:30%;" v-model="stuInfo.identity">
                <el-option v-for='(item, key) in idOptions' :label="item.label" :value="item.id" :key="key"></el-option>
              </el-select>
              <el-select  placeholder="" style="width:40%;" v-model="stuInfo.industry">
                <el-option v-for='(item,index) in intentLubjectList' :label="item.label" :value="item.id" :key="index"></el-option>
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
                <li v-for='(item,index) in levelList'
                :class="index == stuInfo.level ? 'cur' : ''"
                :key="index"
                @click="levelEv(index)"
                >{{item.label}}</li>
              </ul>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计划上课时间：" label-width="140px">
              <ul class="radio-group">
                <li v-for='(item,index) in classtimeList'
                :class="index == stuInfo.classTime ? 'cur' : ''"
                :key="index"
                @click="classtimeEv(index)"
                >{{item.label}}</li>
              </ul>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开始学习时间：" label-width="140px">
              <el-date-picker
                v-model="stuInfo.startStudyTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学习用途：" class="textarea">
              <el-input type="textarea" v-model="stuInfo.purpose"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

      </div>
    </el-form>

    <div class="ctr">
      <el-button type="primary" class="btn" @click="_eidtSave()">保存</el-button>
      <el-button type="" class="btn" @click="_eidtback()">返回</el-button>
    </div>
  </div>

</template>

<script>
import { isMobile, isPhone, isQQ, isWeixin, isidcard, isGAT } from "@/common/util.js";
import { idOptions, intentLubjectList, degreeList, sexList, levelList, classtimeList, cardNoList} from "./../data/data.js";
import {mapMutations} from 'vuex'
export default {
  data(){
    return {
      validate: true,
      isCardNo: false,
      province: [],
      provinceProps: {
        value: 'id',
        label: 'city',
        children: 'cities'
      },
      intentSubject: [],
      // 意向省
      intentProvinceIdFk: [],
      // 意向市
      intentCityIdFk: [],
      // 学员地域省、市
      provinceIdFk : [],
      cityIdFk : [],
      // 联系方式
      contactList:[
      ],
      // 学员信息
      stuInfo:{},
      // 这下面是引进的模块
      idOptions,
      intentLubjectList,
      degreeList,
      sexList,
      levelList,
      classtimeList,
      cardNoList
    }
  },
  created(){
    // 请求省
    this.qryArea();

    this.getStuBaseInfo();
    this.qryAllProject();
  },
  methods: {
    // 获取学员信息
    getStuBaseInfo(){
      this.userId = this.$store.state.user.userInfo.userId;
      //学员ID
      this.stuId = this.$router.currentRoute.query.stuId;
      // 不要显示哪个小人 提示
      this.$store.state.workbench.status = false;
      this.API.getStuBaseInfo({
        stuId:this.stuId
      })
      .then(res=>{
        //console.log(res);
        // 把旧的数据保存起来
        let contactList = res.result[0].contactList
        contactList.forEach((item,val)=>{
          item.validateMobile = false;
          item.oldContact = item.contact;
        })
        this.contactList = contactList;
        this.stuInfo = res.result[0].stuInfo;
        //学员意向地域  拼接  -- 后台不让给数组，硬是要分开写
        this.intentProvinceIdFk[0] = this.stuInfo.intentProvinceIdFk
        this.intentProvinceIdFk[1] = this.stuInfo.intentCityIdFk

        //学员地域  拼接
        this.provinceIdFk[0] = this.stuInfo.provinceIdFk;
        this.provinceIdFk[1] = this.stuInfo.cityIdFk;

      }).catch(err => {
        console.log(err.message)
      });
    },
    // 获取所有项目列表
    qryAllProject(){
      this.API.qryAllProject()
      .then(res=>{
        //console.log(res.list);
        this.intentSubject = res.list;
      }).catch(err => {
        console.log(err.message)
      });
    },
    // 学员意向度
    degreeEv (index) {
      this.stuInfo.degree = index+1;
    },
    sexEv(index){
      this.stuInfo.sex = index+1;
    },
    levelEv(index){
      this.stuInfo.level = index;
    },
    classtimeEv(index){
      this.stuInfo.classTime = index;
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
          this.handleItemChange(this.intentProvinceIdFk[0]);
        }

        if(this.provinceIdFk[1]){
          this.handleItemChange(this.provinceIdFk[0]);
        }
      })


    },
    // 请求市
    handleItemChange(val,key) {
      //console.log(val[0] || val);
      // 意向地域
      if(key == 'YXDY'){
        this.stuInfo.intentProvinceIdFk = val[0];
        this.stuInfo.intentCityIdFk=val[1];
      }
      else if(key == 'XYDY'){
        this.stuInfo.provinceIdFk = val[0];
        this.stuInfo.cityIdFk = val[1];
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
    // 保存
    _eidtSave(){
      console.log(isGAT);
      // 如果身份证有值就验证
      if(this.stuInfo.cardNo){
        if (this.stuInfo.cardType == 1){
          if (!isidcard(this.stuInfo.cardNo)) {
            this.$message({
              message: '请输入正确的身份证号',
              type: 'warning'
            })
            return;
          }
        }
        else if (this.stuInfo.cardType == 2){
          if (!isGAT(this.stuInfo.cardNo)) {
            this.$message({
              message: '港澳台居民身份证',
              type: 'warning'
            })
            return;
          }
        }
      }

      var obj = {
        contactList : this.contactList,
        stuInfo : this.stuInfo,
        userIdFk : this.userId
      }
      if(this.validate){
        this.API.mdfStuInfo(
          obj
        )
        .then(res=>{
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          //
          window.history.back(-1)
        }).catch(err => {
          console.log(err.message)
        });
      } else {
        this.$message({
          message: '请检查联系方式',
          type: 'warning'
        });
      }

    },
    // 返回
    _eidtback(){
      window.history.back(-1)
    },

    // 验证手机号
    telblur(item,value){
      this.validateEvent(item,value,isMobile,0)
    },
    // 验证 座机
    Camerablur(item,value){
      this.validateEvent(item,value,isPhone,1)
    },
    // 验证 微信号
    Weixinblur(item,value){
      this.validateEvent(item,value,isWeixin,2)
    },
    // 验证 QQ号
    QQblur(item,value){
      this.validateEvent(item,value,isQQ,3)
    },
    // 验证 的事件
    validateEvent(item,value,fn,type){
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
  .studentInfo{
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
    .studentHeader{
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
  .studentInfo .textarea .el-textarea__inner{
    height: 90px;
    width: 175% !important;
  }
</style>
