<template>
  <el-dialog
    center
    :visible.sync="visible"
    width="500px"
    @close="$emit('update:show', false)"
    :show="show">
    <span slot="title" class="title-header left">学员转归属</span>
    <el-form ref="changeForm" :model="formOption" label-suffix="：" label-width="110px" :rules="rules">
      <el-form-item label="所属咨询师" prop="followUserIdFk">
        <el-row>
          <el-col :span="11">
            <el-cascader
              :options="counselorOptions"
              v-model="formOption.department" placeholder="请选择部门" class="full-width" :props="counselorProps" clearable
              @change="counselorChange" :show-all-levels="false" expand-trigger="hover">
            </el-cascader>
          </el-col>
          <el-col :span="2" class="text-center">
            -
          </el-col>
          <el-col :span="11">
            <el-select clearable v-model="formOption.followUserIdFk" class="full-width" placeholder="请选择咨询师">
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$emit('update:show', false)">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "chance-belong",
    data() {
      return {
        visible: this.show,
        formOption: {
          followUserIdFk: '',
          department: [],
        },
        followUserOptions: [],
        counselorProps: {
          value: 'id',
          label: 'label',
          children: 'children'
        },
        rules: {
          followUserIdFk: [
            {required: true, message: '请选择咨询师'}
          ],
        }
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      consulors:{
        type: [Array]
      },
      stuIds: {
        type: [Number, String]
      },
      counselorOptions:{
        type:Array,
        default: () => {
          return []
        },
      },
    },
    methods: {
      counselorChange(val) {
        //根据部门选择咨询师
        this.followUserOptions = [];
        this.formOption.followUserIdFk = ''
        let depId = val[val.length - 1];
        if(depId) {
          this.API.qryDeptUser({deptId: depId}).then((res) => {
            this.followUserOptions = res.result;
          })
        }
      },
      save() {
        this.$refs['changeForm'].validate((valid) => {
          if (valid) {
            const {consulors}=this;
            const {followUserIdFk}=this.formOption;
            if(consulors.indexOf(followUserIdFk)>-1){
              this.$message({
                type: 'warning',
                message: '不能选择学员当前所属咨询师!'
              });
              return;
            };
            const data = {
              stuIds: this.stuIds,
              userId: this.formOption.followUserIdFk
            };
            this.API.mdfStuChanceBelong({
              belongToInfo: JSON.stringify(data)
            }).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('update:show', false);
              this.$emit('close');
            })
          }
        })
      }
    },
    watch: {
      show() {
        this.visible = this.show;
        if(this.show){
          this.formOption.department = [];
          this.formOption.followUserIdFk = '';
          this.$refs['changeForm'] && this.$refs['changeForm'].clearValidate();
        }
      }
    }
  }
</script>

<style scoped>

</style>
