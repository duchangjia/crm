<template>
  <el-dialog
    center
    :visible.sync="visible"
    width="900px"
    @close="$emit('update:show', false)"
    :show="show">
    <span slot="title" class="title-header left">新增学员</span>
    <el-form ref="addform" :model="formData" label-suffix="：" label-width="110px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="学员昵称" prop="nick">
            <el-input v-model="formData.nick" placeholder="学员昵称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="意向项目" prop="intentSubject">
            <el-select clearable v-model="formData.intentSubject" class="full-width" placeholder="请选择意向项目">
              <el-option v-if="projectoptions"
                v-for="(item,index) in projectoptions"
                :key="index"
                :label="item.proName"
                :value="item.proId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="contactType margin-bottom-20">
        联系方式<span class="margin-left-10" :class="{red:error}">以下四种联系方式至少填写一种</span>
      </h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="手机" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信" prop="weiXin">
            <el-input v-model="formData.weiXin" placeholder="微信"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="座机" prop="phone">
            <el-input v-model="formData.phone" placeholder="座机" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="qq" prop="qq">
            <el-input v-model="formData.qq" placeholder="qq" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属咨询师" prop="followUserIdFk">
            <el-row>
              <el-col :span="11">
                <el-cascader
                  :options="counselorOptions"
                  v-model="formData.department" placeholder="请选择部门" class="full-width" :props="counselorProps" clearable
                  @change="counselorChange" :show-all-levels="false" expand-trigger="hover">
                </el-cascader>
              </el-col>
              <el-col :span="2" class="text-center">
                -
              </el-col>
              <el-col :span="11">
                <el-select clearable v-model="formData.followUserIdFk" class="full-width" placeholder="请选择咨询师">
                  <el-option
                    v-for="(item,index) in followUserOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <section class="more-container border-top">
        <h3 class="moreTile" @click="showMore=!showMore">
          填写更多信息<i class="el-icon-arrow-up" :class="{'down':showMore}"></i>
        </h3>
        <transition name="el-fade-in-linear">
          <el-row :gutter="20" v-show="showMore">
            <el-col :span="12">
              <el-form-item label="机会地域" prop="chanceLocation">
                <el-cascader :options="chanceArea"
                             v-model="formData.chanceLocation" class="full-width" clearable :props="areaProps"
                             :change-on-select="true" @change="handleItemChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="意向程度" prop="degree">
                <el-radio-group v-model="formData.degree">
                  <el-radio-button label="0">未知</el-radio-button>
                  <el-radio-button label="1">强</el-radio-button>
                  <el-radio-button label="2">中</el-radio-button>
                  <el-radio-button label="3">弱</el-radio-button>
                  <el-radio-button label="4">无</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学员姓名" prop="name">
                <el-input v-model="formData.name" placeholder="学员姓名" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="cardNo">
                <el-input v-model="formData.cardNo" placeholder="身份证号" clearable>
                  <el-select v-model="formData.cardType" slot="prepend" placeholder="请选择" style="width: 110px;">
                    <el-option label="中国大陆" value="1"></el-option>
                    <el-option label="港澳台" value="2"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学员地域" prop="studentLocation">
                <el-cascader :options="chanceArea"
                             v-model="formData.studentLocation" class="full-width" clearable :props="areaProps"
                             @change="handleItemChange" :change-on-select="true">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划上课时间" prop="class_time">
                <el-select clearable v-model="formData.class_time" class="full-width" placeholder="计划上课时间">
                  <el-option
                    v-for="(item,index) in schoolTimeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </transition>
      </section>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$emit('update:show', false)">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      let validateContact = (rule, value, callback) => {
        const {mobile, phone, weiXin, qq} = this.formData;
        if (!mobile && !phone && !weiXin && !qq) {
          this.error = true;
          callback();
        } else {
          this.error = false;
          callback();
        }
      };
      return {
        visible: this.show,
        error: false,
        formData: {
          nick: '',
          intentSubject: '',
          mobile: '',
          phone: '',
          weiXin: '',
          qq: '',
          department: [],
          followUserIdFk: '',
          chanceLocation: [],
          degree: '',
          name: '',
          cardNo: '',
          cardType:'1',
          studentLocation: [],
          class_time: ''
        },
        rules: {
          cardNo: [
            {
              pattern: '^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$',
              message: '请填写正确身份证号码',
              trigger: 'blur'
            },
          ],
          mobile: [
            {pattern: '^1[23456789]\\d{9}$', message: '请填写正确手机号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          weiXin: [
            {pattern: '^[a-zA-Z\\d_]{5,}$', message: '请填写正确微信号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          qq: [
            {pattern: '^\\d{5,10}$', message: '请填写正确qq号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          phone: [
            {pattern: '^(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}$', message: '请填写正确座机号码', trigger: 'blur'},
            {validator: validateContact, trigger: 'blur'},
          ],
          nick: [
            {required: true, message: '请填写学员昵称'},
          ],
          intentSubject: [
            {required: true, message: '请选择意向项目'}
          ],
          followUserIdFk: [
            {required: true, message: '请选择咨询师', trigger: 'change'}
          ]
        },
        followUserOptions: [],
        schoolTimeOptions: [{
          value: '1',
          label: '晚上'
        }, {
          value: '2',
          label: '周末'
        }, {
          value: '3',
          label: '业余时间'
        }],
        showMore: false,
        areaProps: {
          value: 'id',
          label: 'city',
          children: 'cities'
        },
        counselorProps: {
          value: 'id',
          label: 'label',
          children: 'children'
        }
      };
    },
    props: {
      showFooter: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: false
      },
      projectoptions:{
        default:''
      },
      counselorOptions:{
        type:Array,
        default: () => {
          return []
        },
      },
      chanceArea:{
        type:Array,
        default:() => {
          return []
        },
      }
    },
    methods: {
      counselorChange(val) {
        //根据部门选择咨询师
        this.followUserOptions = [];
        this.formData.followUserIdFk = ''
        let depId = val[val.length - 1];
        if(depId) {
          this.API.qryDeptUser({deptId: depId}).then((res) => {
            this.followUserOptions = res.result;
          })
        }
      },
      handleItemChange(val) {
        if (val.length > 1||!val.length) return;
        const {chanceArea} = this;
        this.API.qryArea({areaId: val[0]}).then((res) => {
          chanceArea.forEach((item) => {
            if (item.id == val[0]) {
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
      save() {
        let {chanceLocation, studentLocation} = this.formData;
        let data = Object.assign({}, this.formData, {
          intentProvinceIdFk: chanceLocation.length > 0 ? chanceLocation[0] : '',
          intentCityIdFk: chanceLocation.length > 1 ? chanceLocation[1] : '',
          provinceIdFk: studentLocation.length > 0 ? studentLocation[0] : '',
          cityIdFk: studentLocation.length > 1 ? studentLocation[1] : ''
        })
        this.$refs['addform'].validate((valid) => {
          if(valid) {
            this.API.addStuChance(data).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('update:show', false);
              this.$emit('close');
            });
          }
        })
      }
    },
    watch: {
      show() {
        this.visible = this.show;
        if(this.show) {
          this.formData.department=[];
          this.$refs['addform'] && this.$refs['addform'].resetFields();
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .contactType {
    color: rgb(44, 47, 51);
    font-size: 16px;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
    span {
      font-size: 12px;
      color: rgb(175, 189, 204);
      &.red {
        color: #f56c6c;
      }
    }
  }

  .moreTile {
    font-size: 16px;
    color: rgb(132, 142, 153);
    line-height: 40px;
    cursor: pointer;
    i {
      transition: all .5s;
    }
    .down {
      transform: rotate(180deg);
    }
  }
</style>
