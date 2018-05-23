/**
 * 判断有效手机号码
 * @method isMobile
 * @param {Number} mobile 手机号码
 */
export function isMobile(mobile) {
  return /^1[345678]\d{9}$/.test(mobile);
}

/**
 * 判断有效 座机号码
 * @method isPhone
 * @param {String} isPhone 座机号码
 */
export function isPhone(isPhone) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(isPhone);
}

/**
 * 判断有效 QQ 号码
 * @method isQQ
 * @param {Number} isPhone QQ号码
 */
export function isQQ(QQ) {
  return /^[1-9]\d{4,11}$/.test(QQ);
}

/**
 * 判断有效 微信 号码
 * @method isWeixin
 * @param {String} isWeixin QQ号码
 */
export function isWeixin(wexin) {
  return /^[a-z0-9]{5,15}$/.test(wexin);
}

/**
 * 判断有效 身份证号码
 * @method isidcard
 * @param {String} isidcard 身份证号码
 */
export function isidcard(val) {
  return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(val);
}

/**
 * 判断有效 港澳台身份证
 * @method isGAT
 * @param {String} isGAT
 */
export function isGAT(val) {
  return /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(val);
}


/**
 * 去除字符串两端空格
 * @method trimString
 * @param {String} str 被处理字符串
 * @return {String} 期望字符串
 */
export function trimString(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}


/**
 * 格式化时间
 * @method formatDate
 * @param {String} data 时间戳秒数
 * @param {formate} 格式
 * @return {String} 格式化后的时间
 */
export function formatDate(date, format) {
  var fmt = format || 'yyyy-MM-dd HH:mm';
  var day = new Date(date * 1000);

  let o = {
    'M+': day.getMonth() + 1, // 月份
    'd+': day.getDate(), // 日
    'H+': day.getHours(), // 小时
    'm+': day.getMinutes(), // 分
    's+': day.getSeconds(), // 秒
    'q+': Math.floor((day.getMonth() + 3) / 3), // 季度
    'S': day.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (day.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt;
}

/**
 * 把源对象自身的属性（Own Property）扩展到目标对象
 * @method extend
 * @param {Any} target 目标对象
 * @param {Any*} [source] 源对象。若有同名属性，则后者覆盖前者
 * @return {Any} 目标对象
 */
export function extend(target) {
  if (target == null) { throw new Error('target cannot be null'); }

  let i = 0, len = arguments.length, key, src;
  while (++i < len) {
    src = arguments[i];
    if (src != null) {
      for (key in src) {
        if ( src.hasOwnProperty(key) ) { target[key] = src[key]; }
      }
    }
  }

  return target;
}
