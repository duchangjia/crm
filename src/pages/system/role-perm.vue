<template>
  <div class="main-inner">
    <bread-crumb>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/system/role' }">用户组管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ roleName || '-' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </bread-crumb>

    <template v-if="menuTree">
      <div class="perm-wp" v-for="(mod, key1) in menuTree">
        <div class="perm-hd">
          <span class="perm-tit">{{ mod.menuName }}</span>

          <label class="perm-label">
            <input class="perm-check" v-model="mod.checked" type="checkbox"> 显示模块 {{ mod.perms }}
          </label>
        </div>
        <ul class="perm-bd">
          <li v-for="(page, key2) in mod.children">
            <span class="perm-tit">{{ page.menuName }}</span>

            <div class="perm-list">
              <!-- <label class="perm-label">
                <input class="perm-check" v-model="page.checked" type="checkbox"> 显示模块
              </label> -->

              <label class="perm-label" v-for="(item, key3) in page.children" :key="item.menuId">
                <input class="perm-check" v-model="item.checked" type="checkbox"> {{ item.menuName }} {{ item.perms }}
              </label>
            </div>
            <!-- <el-checkbox v-model="item.checked" v-for="(item, key3) in page.children" :key="item.menuId">{{ item.menuName }}({{ item.menuId }})</el-checkbox> -->
          </li>
        </ul>
      </div>
      <div class="mt30 tac">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="default" @click="$router.push('/system/role')">返回</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data(){
    return {
      roleId: this.$route.params.id,
      roleName: '-',
      menuTree: null,
      selectedList: [],  // 编辑前已勾选的权限
      checkedList: [],   // 点击保存时已勾选的权限
    }
  },
  created() {
    this.API.qryRoleMenu({ roleId: this.roleId }).then(res => {
      console.log(res)
      this.roleName = res.roleVO && res.roleVO.roleName
      this.menuTree = res.menuTreeVO
      this.selectedList = res.roleMenu || []

      this.initChecked(this.menuTree)
    })
  },
  methods:{
    initChecked(list) {
      let vm = this
      let selectedList = this.selectedList
      if (list && list.length) {
        list.forEach(listItem => {
          listItem.checked = false

          if (selectedList.length) {
            for (let i = selectedList.length - 1; i >= 0; i--) {
              if (listItem.menuId == selectedList[i]) {
                listItem.checked = true
                selectedList.splice(i, 1)
                break;
              }
            }
          }

          if (listItem.children && listItem.children.length) {
            vm.initChecked(listItem.children)
          }
        })
      }
    },
    getChecked(list) {
      let vm = this
      if (list && list.length) {
        list.forEach(listItem => {
          if (listItem.checked) {
            vm.checkedList.push(listItem.menuId)
          }

          if (listItem.children && listItem.children.length) {
            vm.getChecked(listItem.children)
          }
        })
      }
    },
    submit() {
      console.log(this.menuTree)
      this.checkedList = []
      this.getChecked(this.menuTree)
      console.log(this.checkedList)

      this.API.mdfRoleMenu({ roleId: this.roleId, menuId: this.checkedList.join(',')}).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .perm-wp {
    padding: 15px 20px;
    .perm-hd {
      padding-bottom: 15px;
      border-bottom: 1px solid #efefef;
      font-size: 16px;
      .perm-tit {
        margin-right: 36px;
      }
    }
    .perm-bd {
      li {
        margin: 15px 20px 0 20px;
        line-height: 32px;
      }
    }
    .perm-tit {
      float: left;
      margin-right: 30px;
      width: 7em;
    }
    .perm-list {
      margin-left: 128px;
    }
    .perm-label {
      display: inline-block;
      margin-right: 30px;
      padding-left: 10px;
      line-height: 19px;
      font-size: 14px;
      color: #606266;
      &:last-child {
        margin-right: 0;
      }
    }
    .perm-check {
      display: inline-block;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
    }
  }
</style>
