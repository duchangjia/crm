<template>
  <el-dialog
    center
    :visible.sync="visible"
    width="500px"
    @close="$emit('update:show', false)"
    :show="show">
    <span slot="title" class="title-header left">{{title}}</span>
    <el-form ref="form" :model="formOption" label-suffix="：" label-width="110px" :rules="rules">
      <el-form-item label="分校名称" prop="name">
        <el-input v-model="formOption.name" clearable placeholder="请填写分校名称"></el-input>
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
    name: "edit-school",
    data() {
      return {
        visible: this.show,
        formOption: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写分校名称'}
          ],
        }
      }
    },
    props: {
      schoolData: '',
      title: {
        required: true,
        type: String
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      save() {
        const {schoolData, formOption} = this;
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (schoolData) {
              //编辑分校
              this.API.mdfSchoolInfo({id: schoolData.id, name: formOption.name}).then(() => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.$emit('update:show', false);
                this.$emit('close');
              })
            } else {
              //新增 分校
              this.API.addSchoolInfo({name: formOption.name}).then(() => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.$emit('update:show', false);
                this.$emit('close');
              })
            }
          }
        })
      }
    },
    watch: {
      show() {
        this.visible = this.show;
      },
      schoolData(){
        this.formOption.name=this.schoolData?this.schoolData.name:''
      }
    }
  }
</script>

<style scoped>

</style>
