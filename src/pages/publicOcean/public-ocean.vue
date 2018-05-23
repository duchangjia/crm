<template>
  <div class="main-inner">
    <bread-crumb>
      <h2>公海</h2>
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
        <el-button type="primary" @click="receiveStudents" v-if="isReceive">批量领取</el-button>
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
                  v-for="(item,index) in projectOptions"
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
            <el-form-item label="创建时间" prop="createTimes">
              <el-date-picker v-model="formOptions.createTimes" start-placeholder="开始日期" end-placeholder="结束日期"
                              style="width: 100%" type="daterange" value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="推广类型" prop="extendType">
              <el-select v-model="formOptions.extendType" style="width: 100%" clearable>
                <el-option
                  v-for="(item,index) in extendTypeOptions"
                  :key="index"
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
                  <el-input-number style="width: 100%" v-model="formOptions.startFollowNum"
                                   :controls="false"></el-input-number>
                </el-col>
                <el-col :span="2" class="text-center">
                  -
                </el-col>
                <el-col :span="11">
                  <el-input-number style="width: 100%" v-model="formOptions.endFollowNum"
                                   :controls="false"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后跟进时间" prop="followTime">
              <el-date-picker v-model="formOptions.followTime" start-placeholder="开始日期"
                              end-placeholder="结束日期" style="width: 100%" type="daterange" value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后跟进人" prop="followUser">
              <el-input placeholder="请输入内容" v-model="formOptions.followUser" style="width: 100%" clearable>
                <el-select v-model="consulorType" slot="prepend" placeholder="请选择" style="width: 120px;">
                  <el-option label="咨询师姓名" value="followUserName"></el-option>
                  <el-option label="咨询师账号" value="followUserAccount"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <div class="btn-group inline-block right">
            <el-button type="success" @click.native="search">
              查询
            </el-button>
            <el-button type="success" plain @click.native="reset">
              清空
            </el-button>
          </div>
        </el-row>
      </el-form>
    </transition>

    <el-table-pagination :columns="columns" @selection-change="selectChange" :url="url" ref="table"
                         totalField="count" listField="stuPublicVOS" dataField="isReceive" @getData="getData">
      <el-table-column
        type="selection" slot="prepend" width="55"/>
      <el-table-column slot="append" label="操作" align="center">
        <template slot-scope="scope">
          <span @click="receive(scope.row)" v-if="isReceive">
            <img src="../../../static/img/workbench/lqu1.png" class="ver-middle inline-block" width="24" height="24"/>
            <el-button type="text" class="actionBtn ver-middle">领取</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table-pagination>

  </div>
</template>

<script>
  import ElTablePagination from '../../components/common/el-table-pagination';

  export default {
    name: 'publicOcean',
    components: {
      ElTablePagination,
    },
    data() {
      return {
        consulorType:'followUserName',
        formWord: {
          keyword: '',
          type: '0'
        },
        isReceive:true,
        showSearchForm: false,
        formOptions: {
          intentSubject: '',
          chanceArea: [],
          createTimes: [],
          extendType: '',
          startFollowNum: undefined,
          endFollowNum: undefined,
          followTime: [],
          followUser: ''
        },
        projectOptions: [],
        areaoptions: [],
        extendTypeOptions: [{
          value: 0,
          label: '电话推广'
        }, {
          value: 1,
          label: '百度推广'
        }],
        columns: [
          {prop: 'nick', label: '学员昵称'},
          {prop: 'extendType', label: '推广类型',render(row){
              switch (row.extendType) {
                case 0:
                  return '电话推广';
                  break;
                case 1:
                  return '百度推广';
                  break;
                default:
                  return '';
              }
            }},
          {prop: 'intentSubjectName', label: '项目'},
          {prop: 'createTime', label: '创建时间',render(row){
              if(row.createTime) {
                return row.createTime.substr(0,10)
              }else {
                return ''
              }
            }},
          {prop: 'validFollowCount', label: '有效跟进次数'},
          {prop: 'lastValidFollowTime', label: '最后有效跟进时间',render(row){
            if(row.lastValidFollowTime) {
              return row.lastValidFollowTime.substr(0,10)
            }else {
              return ''
            }
            }},
          {prop: 'followUserName', label: '最后跟进人'},
        ],
        url: '/api/stuPublic/qryStuPublicByCondition',//高级筛选URL
        areaProps: {
          value: 'id',
          label: 'city',
          children: 'cities'
        },
        selectionRows: [],//勾选项数据
      }
    },
    created() {
      //获取项目
      this.API.qryAllProject().then((res) => {
        this.projectOptions = res.list;
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
    },
    methods: {
      getData(data){
        //判断领取按钮是否能显示
        this.isReceive=data||false;
      },
      handleItemChange(val) {
        if (val.length > 1||!val.length) return;
        const {areaoptions} = this;
        this.API.qryArea({areaId: val[0]}).then((res) => {
          areaoptions.forEach((item) => {
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
      receiveStudents() {
        if (this.selectionRows.length === 0) {
          this.$message({
            message: '请至少勾选一项',
            type: 'warning'
          });
          return;
        }
        this.$confirm('您确认要领取勾选的学员吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let {selectionRows, ids} = this;
          ids = selectionRows.map((item) => {
            return item.stuIdFk;
          });
          this.mdfStuPublic(ids.join(','));
        })
      },
      selectChange(selection) {
        this.selectionRows = selection;
      },
      receive(row) {
        this.$confirm('您确认要领取该学员吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.mdfStuPublic(row.stuIdFk);
        })
      },
      mdfStuPublic(ids) {
        this.API.mdfStuPublic({stuIds: ids}).then((res) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.searchHandle();
        })
      },
      exactSearch() {
        //精确查找
        this.url = '/api/stuPublic/qryStuPublicByaAccurate';
        const {type, keyword} = this.formWord;
        this.$nextTick(function () {
          this.searchHandle({
            type:type,
            contact:keyword
          });
        });
      },
      getParams() {
        //获取筛选项的值
        let {chanceArea, createTimes, followTime,followUser} = this.formOptions;
        let {consulorType} = this;
        let data = Object.assign({}, this.formOptions, {
          intentProvinceIdFk: chanceArea&&chanceArea.length > 0 ? chanceArea[0] : '',
          intentCityIdFk: chanceArea&&chanceArea.length > 1 ? chanceArea[1] : '',
          startCreateTime: createTimes&&createTimes.length > 0 ? createTimes[0] : '',
          endCreateTime: createTimes&&createTimes.length > 1 ? createTimes[1] : '',
          startFollowTime: followTime&&followTime.length > 0 ? followTime[0] : '',
          endFollowTime: followTime&&followTime.length > 1 ? followTime[1] : '',
          [consulorType]:followUser
        });
        return data;
      },
      search() {
        this.url = '/api/stuPublic/qryStuPublicByCondition';
        const data = this.getParams();
        this.$nextTick(function () {
          this.searchHandle(data);
        })
      },
      searchHandle(formParams = {}) {
        this.$refs['table'].searchHandler(arguments[0]);
      },
      reset() {
        this.formOptions.startFollowNum = undefined;
        this.formOptions.endFollowNum = undefined;
        this.$refs['searchForm'].resetFields()
      },
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
