import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/home',
  },
  // 登录
  {
    path: '/login',
    component: resolve => require(['@/pages/site/login'], resolve),
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/404',
    component: resolve => require(['@/pages/site/404'], resolve),
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/403',
    component: resolve => require(['@/pages/site/403'], resolve),
    meta: {
      requireLogin: false
    }
  },
  // 首页
  {
    path: '/home',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      // 首页
      {
        path: '/',
        component: resolve => require(['@/pages/home/home'], resolve),
        meta: {
          requirePerm: 'SY_XSMK'
        }
      },
      // 个人中心
      {
        path: 'personal',
        component: resolve => require(['@/pages/personal/personal'], resolve)
      },
    ]
  },
  // 工作台new
  {
    path: '/work-center',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['@/pages/work-center/work-center'], resolve),
        meta: {
          requirePerm: 'GZT_XSMK'
        },
        children: [
          {
            path: 'student-detail/:id',
            component: resolve => require(['@/pages/work-center/children/student-detail'], resolve)
          },
          {
            path: 'student-update/:id',
            component: resolve => require(['@/pages/work-center/children/student-update'], resolve)
          }
        ]
      }
    ]
  },
  // 工作台
  {
    path: '/workbench',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['@/pages/workbench/workbench.vue'], resolve),
        meta: {
          requirePerm: 'GZT_XSMK'
        },
        children: [
          {
            path: '/workbench-info',
            component: resolve => require(['@/pages/workbench/right/right-home.vue'], resolve)
          },
          {
            path: '/edit-student',
            component: resolve => require(['@/pages/workbench/right/edit-student.vue'], resolve)
          }
        ]
      }
    ]
  },
  // 公海
  {
    path: '/publicOcean',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      {
        path: '/',
        component: () => import('@/pages/publicOcean/public-ocean'),
        meta: {
          requirePerm: 'GHK_XSMK',
        },
      },
    ]
  },
  // 机会管理
  {
    path: '/chanceManage',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      // 公海
      {
        path: '/',
        component: () => import('@/pages/chanceManage/chance-manage'),
        meta: {
          requirePerm: 'JHGL_XSMK',
        },
      },
    ]
  },
  // 排班管理
  {
    path: '/working',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      // 排班管理
      {
        path: 'arrange',
        component: resolve => require(['@/pages/working/arrange'], resolve),
        meta: {
          requirePerm: 'PBGL_XSMK'
        }
      },
      // 班次管理
      {
        path: 'schedule',
        component: resolve => require(['@/pages/working/schedule'], resolve),
        meta: {
          requirePerm: 'BCGL_XSMK'
        }
      },
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: resolve => require(['@/components/common/layout'], resolve),
    children: [
      // 组织架构
      {
        path: 'department',
        component: resolve => require(['@/pages/system/department'], resolve),
        meta: {
          title: '组织架构',
          requirePerm: 'ZZJG_XSMK',
        }
      },
      // 用户组管理
      {
        path: 'role',
        component: resolve => require(['@/pages/system/role'], resolve),
        meta: {
          requirePerm: 'YHZGL_XSMK',
        }
      },
      // 用户组管理 > 权限管理
      {
        path: 'role-perm/:id',
        component: resolve => require(['@/pages/system/role-perm'], resolve),
        meta: {
          requirePerm: 'YHZGL_QXGL',
        }
      },
      // 项目管理
      {
        path: 'project',
        component: resolve => require(['@/pages/system/project'], resolve),
        meta: {
          requirePerm: 'XMGL_XSMK',
        }
      },
      // 项目管理 > 班型管理
      {
        path: 'project-class/:id',
        component: resolve => require(['@/pages/system/project-class'], resolve),
        meta: {
          requirePerm: 'XMGL_BXGL',
        }
      },
      // 分校管理
      {
        path: 'school',
        component: resolve => require(['@/pages/system/school-manage'], resolve),
        meta: {
          requirePerm: 'FXGL_XSMK'
        }
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true} // 设置 404页面
];


const router = new Router({
  routes,
  scrollBehavior: () => ({ y: 0 }),
})

export default router
