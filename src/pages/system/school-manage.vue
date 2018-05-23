<template>
  <div class="padding-20">
    <bread-crumb>
      <h2>分校管理</h2>
      <el-button slot="right" type="primary" v-if="$root.perm.FXGL_XZFX" @click="addSchool()">新增分校</el-button>
    </bread-crumb>

    <el-table-pagination :columns="columns" ref="table" totalField="page.totalItem" listField="list" url="/api/schoolInfo/qrySchoolInfo">
      <el-table-column slot="append" label="操作" align="center">
        <template slot-scope="scope">
          <span v-if="$root.perm.FXGL_BJFX" @click="edit(scope.row)" class="margin-right-10">
            <img src="../../../static/img/workbench/zz1.png" class="ver-middle inline-block" width="24" height="24"/>
            <el-button type="text" class="actionBtn ver-middle">编辑</el-button>
          </span>
          <template v-if="$root.perm.FXGL_KQGBFX">
            <span v-if="scope.row.status" @click="close(scope.row)">
              <img src="../../../static/img/workbench/hide1.png" class="ver-middle inline-block" width="24" height="24"/>
              <el-button type="text" class="actionBtn ver-middle">关闭</el-button>
            </span>
            <span v-else @click="open(scope.row)">
              <img src="../../../static/img/workbench/show1.png" class="ver-middle inline-block" width="24" height="24"/>
              <el-button type="text" class="actionBtn ver-middle">开启</el-button>
            </span>

          </template>
        </template>
      </el-table-column>
    </el-table-pagination>

    <!--新增/编辑分校modal-->
    <school-update :show.sync="showModal" :title="title" :schoolData="schoolData" @close="searchHandle"></school-update>
  </div>
</template>

<script>
  import elTablePagination from '@/components/common/el-table-pagination';
  import SchoolUpdate from './children/school-update';

  export default {
    name: "school-manage",
    components: {
      elTablePagination,
      SchoolUpdate
    },
    data() {
      return {
        columns: [
          {prop: 'name', label: '分校名称'},
        ],
        title: '新增分校',
        showModal: false,
        schoolData: ''
      }
    },
    methods: {
      edit(row) {
        this.schoolData = row;
        this.title = '编辑学校';
        this.showModal=true;
      },
      addSchool(){
        this.schoolData='';
        this.title='新增分校';
        this.showModal=true;
      },
      open(row) {
        this.$confirm('确认要开启该分校吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          const {id}=row;
          this.API.openSchoolInfo({id}).then(()=>{
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
          this.searchHandle();
        })
      },
      close(row) {
        this.$confirm('确认要关闭该分校吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          const {id}=row;
          this.API.closeSchoolInfo({id}).then(()=>{
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.searchHandle();
          })
        })
      },
      searchHandle(formParams = {}){
        this.$refs['table'].searchHandler(arguments[0]);
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
