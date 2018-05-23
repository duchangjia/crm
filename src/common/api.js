import fetch from './fetch'
import qs from 'qs'

const http = {
  get: (path, data) => fetch.get(path, {
    params: data,
  }),

  post: (path, data, config) => fetch.post(path, data, config)
};

export default {
  //登录
  login: data => http.post('/api/user/login', data),
  //登出
  logout:data => http.post('/api/user/logout', data),
  //获取用户信息
  getUserInfo: data => http.get('/api/user/getUser', data),
  //
  mdfStuChanceAlloc: () => http.get('/api/stuChance/mdfStuChanceAlloc'),
  //小能客服录入学员信息
  from: (data) => http.post('/api/customer/from',data),

  //组织架构 获取部门列表
  qryDept: data => http.get('/api/dept/qryDept', data),
  //组织架构 新增部门
  addDept: data => http.get('/api/dept/addDept', data),
  //组织架构 编辑部门
  mdfDept: data => http.post('/api/dept/mdfDept', data),
  //组织架构 删除部门
  delDept: data => http.post('/api/dept/delDept', data),

  //组织架构 获取部分所能选择角色列表
  getDeptRole: data => http.get('/api/dept/getDeptRole', data),

  //组织架构 选择部门后所能选择角色
  getUser: data => http.get('/api/user/getUser', data),

  //组织架构 客服部添加客服组的时候获取咨询组
  qryDeptSaleById: data => http.get('/api/dept/qryDeptSaleById', data),

  //组织架构 获取座席列表
  qryUser: data => http.get('/api/user/qryUser', data),
  // 坐席管理 - 新增坐席
  addUser: data => http.post('/api/user/addUser', data),
  // 坐席管理 - 编辑坐席
  mdfUser: data => http.post('/api/user/mdfUser', data),
  // 坐席管理 - 删除坐席
  delUser: data => http.post('/api/user/delUser', data),

  // 获取用户组列表
  seatAdd: data => http.get('/api/role/qryRole', data),
  // 把所有事业群请求过来
  seatAddChild: data => http.get('/api/dept/qryDeptChild', data),
  //要锁死的api
  seatgetUserDeptRole: data => http.get('/api/user/getUserDeptRole', data),

  // 用户组管理 - 列表
  qryRole: () => http.get('/api/role/qryRole'),
  // 用户组管理 - 修改
  mdfRole: data => http.post('/api/role/mdfRole', data),

  // 权限管理 - 列表
  qryRoleMenu: data => http.get('/api/role/qryRoleMenu', data),
  // 用户组管理 - 修改
  mdfRoleMenu: data => http.post('/api/role/mdfRoleMenu', data),

  // 项目管理 - 列表
  qryProject: data => http.get('/api/project/qryProject', data),
  // 项目管理 - 新增
  addProject: data => http.post('/api/project/addProject', data),
  // 项目管理 - 修改
  mdfProject: data => http.post('/api/project/mdfProject', data),
  // 项目管理 - 显示/隐藏
  mdfProjectBlock: data => http.post('/api/project/mdfProjectBlock', data),

  // 班型管理 - 列表
  qryClassType: data => http.get('/api/classType/qryClassType', data),
  // 班型管理 - 新增
  addClassType: data => http.post('/api/classType/addClassType', data),
  // 班型管理 - 修改
  mdfClassType: data => http.post('/api/classType/mdfClassType', data),

  // 排班管理 - 列表
  qrySchList: data => http.get('/api/clsSch/qrySchList', data),
  // 排班管理 - 获取班次列表
  qryRgeList: data => http.get('/api/clsRge/qryRgeList', data),
  // 排班管理 - 编辑
  mdfSchList: data => http.post('/api/clsSch/mdfSchList', data, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'//'application/json;charset=utf-8'
    }
  }),

  // 班次管理 - 列表
  qryClsRge: data => http.get('/api/clsRge/qryClsRge', data),
  // 班次管理 - 获取班次信息
  getClsRge: data => http.get('/api/clsRge/getClsRge', data),
  // 班次管理 - 新增
  addClsRge: data => http.post('/api/clsRge/addClsRge', data),
  // 班次管理 - 修改
  mdfClsRge: data => http.post('/api/clsRge/mdfClsRge', data),
  // 班次管理 - 删除
  delClsRge: data => http.post('/api/clsRge/delClsRge', data),

  //分校管理-添加分校
  addSchoolInfo:data=>http.post('/api/schoolInfo/addSchoolInfo', data),
  //分校管理-修改分校
  mdfSchoolInfo:data=>http.post('/api/schoolInfo/mdfSchoolInfo', data),
  //分校管理-关闭分校
  closeSchoolInfo:data=>http.post('/api/schoolInfo/closeSchoolInfo', data),
  //分校管理-开启分校
  openSchoolInfo:data=>http.post('/api/schoolInfo/openSchoolInfo', data),

  //机会管理-添加学员
  addStuChance:data=>http.post('api/stuChance/addStuChance', data),
  //机会管理 -转归属
  mdfStuChanceBelong:data=>http.post('api/stuChance/mdfStuChanceBelong', data),

  //公海库-领取学员
  mdfStuPublic:data=>http.post('/api/stuPublic/mdfStuPublic', data),


  /*公共下拉项*/
  //所属咨询师下拉项
  qryDeptUser:data=>http.get('api/user/qryDeptUser', data),
  //项目下拉项目
  qryAllProject:data=>http.get('api/project/qryAllProject', data),
  //获取地域下一级单位
  qryArea:data=>http.get('api/area/qryArea', data),
  //获取不同角色下的部门
  qryDeptByRole:data=>http.get('api/dept/qryDeptByRole', data),

  //工作台 - 获取学员列表 及 学员详细信息
  qryMyStuInfo: data => http.get('/api/student/qryMyStuInfo', data),
  //工作台 - 查询学员联系方式
  qryStuContact: data => http.get('/api/student/qryStuContact', data),
  //工作台 - 添加学员联系方式
  addStuContact: data => http.post('/api/student/addStuContact', data),
  //工作台 - 添加好友
  addFriend: data => http.post('/api/student/addFriend', data),
  //工作台 - 保存编辑学员信息
  mdfStuInfo: data => http.post('/api/student/mdfStuInfo', data, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'//'application/json;charset=utf-8'
    }
  }),
  //工作台 - 获取编辑学员信息
  getStuBaseInfo: data => http.get('/api/student/getStuBaseInfo', data),
  //工作台 - 放弃归属
  delBelongTo: data => http.post('/api/stuPublic/delBelongTo', data),
  //工作台 - 查看回访计划
  getStuFollowDetail: data => http.get('/api/student/getStuFllowDetail', data),
  //工作台 - 修改回访计划
  mdfStuFollowDetail: data => http.post('/api/student/mdfStuFllowDetail', data),
  // 工作台 - 获取学员跟进记录：
  getStuFollowDetailList: data => http.get('/api/student/getStuFllowDetailList', data),
  // 工作台 - 获取学员的分校预约单
  qryStudentAdvanceList: data => http.get('/api/student/qryStudentAdvanceList', data),
  // 工作台 - 获取学员的成交订单记录
  qryOrderList: data => http.get('/api/student/qryOrderList', data),
  // 工作台 - 录入学员跟进明细
  addStudentFollowDetail: data => http.post('/api/student/addStudentFollowDetail', data),
  // 工作台 - 创建分校预约单
  addStudentAdvance: data => http.post('/api/student/addStudentAdvance', data),
  // 工作台 - 创建订单
  addOrder: data => http.post('/api/student/addOrder', data),
  //外呼中心
  hangup:data => http.post('api/call/hangUp', data),
  // 工作台 - 请求意向项目下面的 班型
  qryAllClassType: data => http.get('/api/classType/qryAllClassType', data),
  // 工作台 - 查询所有分校列表
  qryAllSchoolInfo: data => http.get('/api/schoolInfo/qryAllSchoolInfo', data),
  // 工作台 - 获取学员跟进记录-好友添加记录
  qryStudentFriendList: data => http.get('/api/student/qryStudentFriendList', data),
  //工作台 - 获取学员跟进记录-编辑学员记录
  qryStudentMdfLogList: data => http.get('/api/student/qryStudentMdfLogList', data),
  //工作台 - 获取学员跟进记录-好友添加记录：
  qryStudentFriendList: data => http.get('/api/student/qryStudentFriendList', data),
  //获取学员的流转日志
  qryStudentAllocateList: data => http.get('/api/student/qryStudentAllocateList', data),
  //工作台 - 获取在线聊天记录
  getStuOnlineChatDetailList:data => http.get('/api/student/getStuOnlineChatDetailList', data),
  //工作台-获取通话记录
  getStuCallDetailList:data => http.get('/api/student/getStuCallDetailList', data),
  //个人信息
  mdfUser:data => http.post('api/user/mdfUser', data),
  //挂断通话-是否是有效通话
  effective:data => http.get('api/call/effective', data),
  //保存学员跟进信息
  mdfStudentFollowDetail:data => http.post('/api/student/mdfStudentFollowDetail', data),
}
