const summaryFields = [
  {id: 'stuId', label: '学员ID'},
  {id: 'extendType', label: '推广类型'},
  {id: 'projectName', label: '意向项目'},
  {id: 'intentArea', label: '机会地域'},
  {id: 'createTime', label: '创建时间'},
  {id: 'lastAllocTime', label: '分配时间'},
  {id: 'lastFollowTime', label: '最后跟进时间'},
  {id: 'lastValidFollowTime', label: '最近有效跟进'}
]
const baseFields = [
  {id: 'nick', label: '昵称'},
  {id: 'name', label: '真实姓名'},
  {id: 'studentArea', label: '学员地域'},
  {id: 'sexName', label: '性别'},
  {id: 'age', label: '年龄'},
  // {id: 'idCard', label: '身份证'}
]
const detailFields = [
  {id: 'identityName', label: '身份'},
  {id: 'levelName', label: '水平'},
  {id: 'classTimeName', label: '计划上课时间'},
  {id: 'startStudyTime', label: '开始学习时间'},
  {id: 'purpose', label: '学习用途'}
]

var identityOptions = [
  {id: 0, label: '未知'},
  {id: 1, label: '在职'},
  {id: 2, label: '学生'},
  {id: 3, label: '自雇'},
  {id: 4, label: '待业'},
  {id: 5, label: '自由职业'},
  {id: 6, label: '家庭主妇'},
  {id: 7, label: '其他'}
];
var occupationOptions = [
  {id: 0, label: '未知'},
  {id: 1, label: '相关行业'},
  {id: 2, label: '非相关行业'},
  {id: 3, label: '年级：初中,高中,大学'},
  {id: 4, label: '专业'},
  {id: 5, label: '淘宝店'},
  {id: 6, label: '实体店'},
  {id: 7, label: '刚毕业'},
  {id: 8, label: '辞职、失业'}
];
var degreeOptions = [
  {id: 1, label: '强'},
  {id: 2, label: '中'},
  {id: 3, label: '弱'},
  {id: 4, label: '无'},
];
var genderOptions = [
  {id:1,label:"男"},
  {id:2,label:"女"}
];
var idCardOptions = [
  {id:1,label:"中国大陆身份证"},
  {id:2,label:"港澳台身份证"}
];
var levelOptions = [
  { id:0, label:"未知"},
  { id:1, label:"零基础"},
  { id:2, label:"有点基础"},
  { id:3, label:"基础较好"}
];
var classTimeOptions = [
  { id:0, label:"未知"},
  { id:1, label:"晚上"},
  { id:2, label:"周末"},
  { id:3, label:"业余时间"}
];
var extendType = [
  { id:0, label:"未知"},
  { id:1, label:"百度推广"}
];
var addFriendOptions = [
  { id: 2, label: "微信"},
  { id: 3, label: "QQ"}
];
var followOptions = [
  {id : 0, label : "隔天联系"},
  {id : 1, label : "约定时间联系"},
  {id : 2, label : "稍后在联系"},
  {id : 3, label : "今晚联系"},
  {id : 4, label : "不需要了"}
]

const studentContact = [
  {id:0,label:"手机"},
  {id:1,label:"座机"},
  {id:2,label:"微信"},
  {id:3,label:"QQ"}
];

const isItConnected = [
  {id:0,label:"接通"},
  {id:1,label:"无人接听"},
  {id:2,label:"空号"},
  {id:3,label:"停机/错号"}
];

const communicateResults = [
  {id:0,label:"无效沟通"},
  {id:1,label:"有效沟通"}
];

const backOut = [
  { id : 0, label : "空号错号停机" },
  { id : 1, label : "三次无们接听" },
  { id : 2, label : "不符合报名条件" },
  { id : 3, label : "没有符合的产品" },
  { id : 4, label : "已报名其他机构" },
  { id : 5, label : "号码错误" },
  { id : 6, label : "明确表态不需要" },
  { id : 7, label : "谈合作" },
  { id : 8, label : "招聘" },
  { id : 9, label : "打过去没有咨询过" }
];

module.exports = {
  summaryFields,
  baseFields,
  detailFields,
  identityOptions,
  occupationOptions,
  degreeOptions,
  genderOptions,
  levelOptions,
  idCardOptions,
  classTimeOptions,
  extendType,
  addFriendOptions,
  followOptions,
  isItConnected,
  studentContact,
  communicateResults,
  backOut
}
