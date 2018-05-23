<template>
  <div class="header-container">
    <img src="../../../static/img/login/logo.png" class="logo fl"/>
    <nav class="fl">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="rgb(75, 75, 75)"
        active-text-color="#009aff"
        unique-opened router @select="handleSelect">
        <template v-for="(item, index) in itemsNav">
          <template v-if="item.menuList">
            <el-submenu :index="item.menuUrl" v-if="!item.requirePerm || $root.perm[item.requirePerm]">
              <template slot="title">
                <span slot="menuName">{{ item.menuName }}</span>
              </template>
              <el-menu-item v-if="!item.requirePerm || $root.perm[item.requirePerm]" v-for="(subItem, i) in item.menuList" :key="i" :index="subItem.menuUrl">{{ subItem.menuName }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.menuUrl" v-if="!item.requirePerm || $root.perm[item.requirePerm]">
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </nav>
    <section class="fr clear">
      <el-dropdown trigger="hover" class="fl" @command="handleCommand">
        <span class="userName el-dropdown-link">
          <img src="../../../static/img/login/account.svg" class="margin-right-10"/>{{userInfo.name}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">基本信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="exit fl" @click="loginout">退出</span>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {
        activeIndex: sessionStorage.getItem('activeIndex')||'/home',
        itemsNav: [
          {
            menuUrl: '/home',
            menuName: '首页',
          },
          {
            menuUrl: '/work-center',
            menuName: '工作台',
            requirePerm: 'GZT_XSMK',
          },
          /*{
            menuUrl: '/workbench',
            menuName: 'old',
            requirePerm: 'GZT_XSMK',
          },*/
          {
            menuUrl: '/publicOcean',
            menuName: '公海',
            requirePerm: 'GHK_XSMK',
          },
          {
            menuUrl: '/chanceManage',
            menuName: '机会管理',
            requirePerm: 'JHGL_XSMK',
          },
          {
            menuUrl: '/working',
            menuName: '排班管理',
            requirePerm: 'PBGL',
            menuList: [
              {
                menuUrl: '/working/arrange',
                menuName: '排班管理',
                requirePerm: 'PBGL_XSMK',
              },
              {
                menuUrl: '/working/schedule',
                menuName: '班次管理',
                requirePerm: 'BCGL_XSMK',
              },
            ]
          },
          {
            menuUrl: '3',
            menuName: '系统管理',
            requirePerm: 'XTGL',
            menuList: [
              {
                menuUrl: '/system/department',
                menuName: '组织架构',
                requirePerm: 'ZZJG_XSMK',
              },
              {
                menuUrl: '/system/role',
                menuName: '用户组管理',
                requirePerm: 'YHZGL_XSMK',
              },
              {
                menuUrl: '/system/project',
                menuName: '项目管理',
                requirePerm: 'XMGL_XSMK',
              },
              {
                menuUrl: '/system/school',
                menuName: '分校管理',
                requirePerm: 'FXGL_XSMK',
              },
              /*{
                menuUrl: '/tissue3',
                menuName: '系统配置'
              },
              {
                menuUrl: '/power',
                show: true, // 这个字段主要为了 三级页面做当前项
                menuName: '权限管理'
              }*/
            ]
          }
        ]
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      handleSelect(key,keyPath){
        this.activeIndex=key;
        sessionStorage.setItem('activeIndex',key);
      },
      ...mapActions([
        'USER_LOGOUT',
      ]),
      loginout() {
        this.$confirm('您确认退出登录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.USER_LOGOUT().then(()=>{
            this.$router.push({path: '/login'});
            sessionStorage.removeItem('activeIndex');
          }).catch(()=>{
            this.$router.push({path: '/login'});
            sessionStorage.removeItem('activeIndex');
          })
        })
      },
      handleCommand(command){
        if(command==='info'){
          this.$router.push({path:'/home/personal'});
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header-container {
    height: 60px;
    padding: 0 50px;
    background: #fff;
    box-shadow: 0px 5px 8px 0 rgba(143, 143, 143, 0.08);
    .logo {
      position: relative;
      top: 3px;
      cursor: pointer;
    }
    nav {
      margin-left: 140px;
    }
    .el-menu-demo {
      border-bottom: none;
    }
    .userName{
      img{
        display: inline-block;
        width: 28px;
        height: 28px;
        vertical-align: middle;
        position: relative;
        bottom: 3px;
      }
      line-height: 40px;
      position: relative;
      top: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #575e65;
      vertical-align: middle;
      &::after{
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #2ddc41;
        border-radius: 50%;
      }
    }
    .exit {
      color: #575e65;
      font-size: 16px;
      line-height: 60px;
      cursor: pointer;
      margin-left: 40px;
    }
  }
</style>
