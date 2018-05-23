<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>机会管理</h2>
    </bread-crumb>

    <section class="margin-bottom-20 clear">
      <div class="el-col-6 clear margin-right-20" style="min-width: 400px">
        <label class="el-form-item__label boldFont" style="width:120px">精确查找：</label>
        <el-input placeholder="请输入内容" v-model="formWord.keyword" style="width: calc(100% - 120px)">
          <el-select v-model="formWord.type" slot="prepend" placeholder="请选择" style="width: 110px;">
            <el-option label="手机" value="0"></el-option>
            <el-option label="座机" value="1"></el-option>
            <el-option label="微信" value="2"></el-option>
            <el-option label="QQ" value="3"></el-option>
            <el-option label="昵称" value="5"></el-option>
            <el-option label="ID" value="4"></el-option>
          </el-select>
        </el-input>
      </div>
      <el-button type="success" @click="exactSearch">查找</el-button>
      <span class="expandBtn margin-left-20" @click="showSearchForm=!showSearchForm">{{showSearchForm?'收起筛选':'展开筛选'}}
        <i class="el-icon-arrow-up" :class="{'down':showSearchForm}"></i>
      </span>
      <div class="right">
        <el-button type="primary" @click="showAddStudent=true" v-if="$root.perm.JHGL_XJXY">新建学员</el-button>
        <!--<el-button type="primary">导入</el-button>-->
        <el-button type="primary" @click="changeGroup" v-if="$root.perm.JHGL_ZGS">批量转归属</el-button>
      </div>
    </section>
    <transition name="el-fade-in">
      <el-form :model="formOptions" ref="searchForm" label-width="120px" class="search-from" label-suffix="："
               v-show="showSearchForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目" prop="intentSubject">
              <el-select v-model="formOptions.intentSubject" style="width: 100%" clearable>
                <el-option
                  v-for="(item,index) in projectoptions"
                  :key="index"
                  :label="item.proName"
                  :value="item.proId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机会地域" prop="chanceArea">
              <el-cascader :options="areaoptions"
                           v-model="formOptions.chanceArea" style="width: 100%" clearable class="full-width" clearable
                           :props="areaProps" @change="handleItemChange" :change-on-select="true">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间" prop="createStuTime">
              <el-date-picker v-model="formOptions.createStuTime" start-placeholder="开始日期" end-placeholder="结束日期"
                              style="width: 100%" type="daterange" value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机会状态" prop="status">
              <el-select v-model="formOptions.status" style="width: 100%" clearable>
                <el-option
                  v-for="item in chanceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入类型" prop="entryType">
              <el-select v-model="formOptions.entryType" style="width: 100%" clearable>
                <el-option
                  v-for="item in enteringOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="有效跟进次数">
              <el-row>
                <el-col :span="11">
                  <el-input-number style="width: 100%" v-model="formOptions.validMinFollowCount "
                                   :controls="false"></el-input-number>
                </el-col>
                <el-col :span="2" class="text-center">
                  -
                </el-col>
                <el-col :span="11">
                  <el-input-number style="width: 100%" v-model="formOptions.validMaxFollowCount"
                                   :controls="false"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分配时间" prop="allocTime">
              <el-date-picker v-model="formOptions.allocTime" start-placeholder="开始日期" end-placeholder="结束日期"
                              style="width: 100%" type="daterange" value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组织架构" prop="departmentIds">
              <el-cascader v-model="formOptions.departmentIds" style="width: 100%" clearable :options="deptOptions"
                           :change-on-select="true" :props="departmentProps" placeholder="组织架构"
                           :show-all-levels="false">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后跟进时间" prop="lastValidFollowTime">
              <el-date-picker v-model="formOptions.lastValidFollowTime" start-placeholder="开始日期"
                              end-placeholder="结束日期" style="width: 100%" type="daterange" value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属咨询师" prop="nameFk">
              <el-input placeholder="请输入内容" v-model="formOptions.consulor" style="width: 100%" clearable>
                <el-select v-model="consulorType" slot="prepend" placeholder="请选择" style="width: 120px;">
                  <el-option label="咨询师姓名" value="nameFk"></el-option>
                  <el-option label="咨询师账号" value="userNameFk"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <div class="btn-group inline-block right">
            <el-button type="success" @click="search">
              查询
            </el-button>
            <el-button type="success" plain @click="reset">
              清空
            </el-button>
          </div>
        </el-row>
      </el-form>
    </transition>

    <el-table-pagination :columns="columns" @selection-change="selectChange" :url="url" ref="table"
                         totalField="page.totalItem" listField="result">
      <el-table-column
        type="selection" slot="prepend" width="55"/>
      <el-table-column slot="append" label="操作" align="center">
        <template slot-scope="scope">
          <span @click="changeBelong(scope.row)" v-if="$root.perm.JHGL_ZGS">
            <img src="../../../static/img/workbench/zz1.png" class="ver-middle inline-block" width="24" height="24"/>
            <el-button type="text" class="actionBtn ver-middle">转归属</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table-pagination>

    <!--新增学员modal-->
    <add-student :show.sync="showAddStudent" @close="searchHandle" :projectoptions="projectoptions"
                 :chanceArea="areaoptions" :counselorOptions="counselorOptions"></add-student>

    <!--转归属-->
    <chance-belong :show.sync="showBelong" :stuIds="stuIds" @close="searchHandle"
                   :counselorOptions="counselorOptions" :consulors="consulors"></chance-belong>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ElTablePagination from '../../components/common/el-table-pagination';
  import addStudent from './modal/add-student';
  import chanceBelong from './modal/chance-belong';

  export default {
    name: 'chanceManage',
    components: {
      ElTablePagination,
      addStudent,
      chanceBelong
    },
    data() {
      return {
        formWord: {
          keyword: '',
          type: '0'
        },
        showSearchForm: false,
        consulorType: 'nameFk',
        formOptions: {
          intentSubject: '',
          chanceArea: [],
          createStuTime: '',
          status: '',
          entryType: '',
          validMinFollowCount: undefined,
          validMaxFollowCount: undefined,
          allocTime: '',
          departmentIds: [],
          lastValidFollowTime: '',
          consulor: ''
        },
        projectoptions: [],
        chanceOptions: [{
          value: '0',
          label: '待分配'
        }, {
          value: '1',
          label: '已分配'
        }, {
          value: '2',
          label: '已退回'
        }, {
          value: '3',
          label: '已预约'
        }, {
          value: '4',
          label: '已成交'
        }, {
          value: '5',
          label: '已回收'
        }],
        deptOptions: [],
        enteringOptions: [{
          value: '0',
          label: '外部导入'
        }, {
          value: '1',
          label: '手动录入'
        }],
        areaoptions: [],
        columns: [
          {prop: 'stuId', label: '机会ID'},
          {prop: 'nick', label: '学员昵称'},
          {prop: 'contact', label: '联系方式'},
          {prop: 'projectName', label: '意向项目'},
          {
            prop: 'provinceName', label: '机会地域', render: function (row) {
              const {provinceName, cityName} = row;
              const data = `${provinceName ? provinceName : ''}${cityName ? '-' + cityName : ''}`;
              return data;
            }
          },
          {prop: 'deptName', label: '事业部'},
          {
            prop: 'status', label: '机会状态', render: function (row) {
              switch (row.status) {
                case 0:
                  return '待分配';
                  break;
                case 1:
                  return '已分配';
                  break;
                case 2:
                  return '已退回';
                  break;
                case 3:
                  return '已预约';
                  break;
                case 4:
                  return '已成交';
                  break;
                default:
                  return '已回收';
              }
            }
          },
          {
            prop: 'nameFk', label: '所属咨询师', render: function (row) {
              const {userNameFk, nameFk} = row;
              return `${userNameFk ? userNameFk : ''}${nameFk ? '(' + nameFk + ')' : ''}`;
            }
          },
          {prop: 'lastAllocTime', label: '分配时间'},
          {prop: 'createTime', label: '创建时间'},
        ],
        showBelong: false,
        showAddStudent: false,
        url: 'api/stuChance/qryStuChance',
        counselorOptions: [],
        areaProps: {
          value: 'id',
          label: 'city',
          children: 'cities'
        },
        departmentProps: {
          label: 'label',
          value: 'id',
          children: 'children'
        },
        selectionRows: [],//勾选项数据
        stuIds: '',//转归属ids
        consulors:[],//咨询师ID,判断咨询师不能转给自己
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created() {
      //获取项目
      this.API.qryAllProject({status: 1}).then((res) => {
        this.projectoptions = res.list;
      });

      //获取所有省
      this.API.qryArea({areaId: 1}).then((res) => {
        let data = res.result.map((item) => {
          return {
            id: item.id,
            city: item.province,
            cities: []
          }
        });
        this.areaoptions = data;
      });

      //获取组织架构
      this.API.qryDept({ deptId: this.userInfo.deptIdFk }).then(res => {
        this.deptOptions = res.result
      })

      //获取所属咨询师
      this.API.qryDeptByRole().then((res) => {
        this.counselorOptions = res.result
      });
    },
    methods: {
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
      changeGroup(selection) {
        if (this.selectionRows.length === 0) {
          this.$message({
            message: '请至少勾选一项',
            type: 'warning'
          });
          return;
        }
        let {selectionRows, ids} = this;
        ids = selectionRows.map((item) => {
          return item.stuId;
        });
        this.stuIds = ids.join(',');
        this.showBelong = true;
      },
      selectChange(selection) {
        this.selectionRows = selection;
      },
      exactSearch() {
        //精确查找
        this.url = 'api/stuChance/getAccurate';
        const {type, keyword} = this.formWord;
        this.$nextTick(function () {
          this.searchHandle({
            type: type,
            contact: keyword
          });
          this.url = 'api/stuChance/qryStuChance';
        });
      },
      getParams() {
        //获取筛选项的值
        let {departmentIds, chanceArea, createStuTime, lastValidFollowTime, allocTime, consulor} = this.formOptions;
        let {consulorType} = this;
        let data = Object.assign({}, this.formOptions, {
          intentProvinceIdFk: chanceArea.length > 0 ? chanceArea[0] : '',
          intentCityIdFk: chanceArea.length > 1 ? chanceArea[1] : '',
          deptId: departmentIds && departmentIds.length > 0 ? departmentIds[departmentIds.length - 1] : '',
          startCreateTime: createStuTime && createStuTime.length > 0 ? createStuTime[0] : '',
          endCreateTime: createStuTime && createStuTime.length > 1 ? createStuTime[1] : '',
          alloStartTime: allocTime && allocTime.length > 0 ? allocTime[0] : '',
          alloEndTime: allocTime && allocTime.length > 1 ? allocTime[1] : '',
          followStartTime: lastValidFollowTime && lastValidFollowTime.length > 0 ? lastValidFollowTime[0] : '',
          followEndTime: lastValidFollowTime && lastValidFollowTime.length > 1 ? lastValidFollowTime[1] : '',
          [consulorType]:consulor
        });
        return data;
      },
      search() {
        this.url = 'api/stuChance/qryStuChance';
        let data = this.getParams();
        delete data.lastValidFollowTime
        this.$nextTick(function () {
          this.searchHandle(data);
        })
      },
      searchHandle(formParams = {}) {
        this.$refs['table'].searchHandler(arguments[0]);
      },
      reset() {
        this.formOptions.validMinFollowCount = undefined;
        this.formOptions.validMaxFollowCount = undefined;
        this.$refs['searchForm'].resetFields()
      },
      changeBelong(row) {
        this.consulors=[row.followUserIdFk];
        this.stuIds = row.stuId;
        this.showBelong = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .expandBtn {
    font-size: 16px;
    color: rgb(58, 165, 250);
    cursor: pointer;
    i {
      transition: all .5s;
    }
    .down {
      transform: rotate(180deg);
    }
  }
</style>
