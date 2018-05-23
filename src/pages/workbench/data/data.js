const idOptions = [
  {id: 0, label: '未知'},
  {id: 1, label: '在职'},
  {id: 2, label: '学生'},
  {id: 3, label: '自雇'},
  {id: 4, label: '待业'},
  {id: 5, label: '自由职业'},
  {id: 6, label: '家庭主妇'},
  {id: 7, label: '其他'}
];
const intentLubjectList = [
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
const degreeList = [
  {id: 1, label: '强'},
  {id: 2, label: '中'},
  {id: 3, label: '弱'},
  {id: 4, label: '无'},
];
const sexList = [
  {id:1,label:"男"},
  {id:2,label:"女"}
];
const cardNoList = [
  {id:1,label:"中国大陆身份证"},
  {id:2,label:"港澳台居民身份证"}
];
const levelList = [
  { id:0, label:"未知"},
  { id:1, label:"零基础"},
  { id:2, label:"有点基础"},
  { id:3, label:"基础较好"}
];
const classtimeList = [
  { id:0, label:"未知"},
  { id:1, label:"晚上"},
  { id:2, label:"周末"},
  { id:3, label:"业余时间"}
];
const extendType = [
  { id:0, label:"未知"},
  { id:1, label:"百度推广"}
];

const editReturnList = [
  {id : 0, label : "隔天联系"},
  {id : 1, label : "约定时间联系"},
  {id : 2, label : "稍后在联系"},
  {id : 3, label : "今晚联系"},
  {id : 4, label : "不需要了"}
];

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
  idOptions,
  intentLubjectList,
  degreeList,
  sexList,
  levelList,
  cardNoList,
  classtimeList,
  extendType,
  editReturnList,
  isItConnected,
  studentContact,
  communicateResults,
  backOut
}
