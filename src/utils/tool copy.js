/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 16:18:13
 */
/**
 * 生成 uuid
 *
 * @return {*} uuid
 */
export function randomId() {
  let s = [];
  let hexDigits = '0123456789abcdef';

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ''; // bit 8 13 18 23 delete

  return s.join('');
}

/**
 * 加密
 * @param {string} 内容
 * @param {string} 公钥
 * @return {string} 加密内容
 */
export function rsaEncrypt(content, publicKey) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encryptUnicodeLong(content);
}

/**
 * 深拷贝
 *
 * @param {object | array} obj 需要拷贝的对象
 * @return {object} 返回对象
 */
export function deepCopy(obj = {}, weakMap = new WeakMap()) {
  if (typeof obj !== 'object') return obj;

  if (weakMap.has(obj)) return weakMap.get(obj);

  const newObj = Array.isArray(obj) ? [] : {};

  weakMap.set(obj, newObj);

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key], weakMap);
    }
  }

  return newObj;
}

/**
 *全屏
 *
 */
export function fullScreen() {
  if (document.documentElement.RequestFullScreen) {
    document.documentElement.RequestFullScreen();
  }
  //兼容火狐
  if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
  if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  }
  //兼容IE,只能写msRequestFullscreen
  if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

/**
 * 取消全屏
 *
 */
export function noFullScreen() {
  if (document.exitFullScreen) {
    document.exitFullscreen();
  }
  //兼容火狐
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
  //兼容谷歌等
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  //兼容IE
  if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * 首字母大写
 * @param {string} string
 * @returns 大写首字母
 */
export function firstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 格式化时间
 * @param {*} time 时间
 * @param {*} type 类型
 * @param {*} dateF 日期格式化分割线
 * @param {*} timeF 时间格式化分割线
 * @return {*} 返回格式化时间
 */
export function formatDate(
  time = '',
  type = 1,
  dateF = '-',
  timeF = ':'
) {
  let dateTime = time ? new Date(time) : new Date();
  let result = '';

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hour = String(dateTime.getHours()).padStart(2, '0');
  const minute = String(dateTime.getMinutes()).padStart(2, '0');
  const second = String(dateTime.getSeconds()).padStart(2, '0');

  switch (type) {
    // 年月日
    case 1:
      result = `${year}${dateF}${month}${dateF}${day}`;
      break;

    // 年月日 时分秒
    case 2:
      result = `${year}${dateF}${month}${dateF}${day} ${hour}${timeF}${minute}${timeF}${second}`;
      break;
    // 时分秒
    case 3:
      result = `${hour}${timeF}${minute}${timeF}${second}`;
      break;

    default:
      result = `${year}${dateF}${month}${dateF}${day}`;
      break;
  }

  return result;
}

/**
 * 预览动画
 * @param {Element} el
 * @param {value} animation
 * @return {*}
 */
export function runAnimation($el, animation) {
  return new Promise((resolve, reject) => {
    const { value = '', durationTime = 0.3 } = animation;

    $el.style.setProperty('--durationTime', `${durationTime}s`);
    $el.classList.add(value, 'animated');

    const removeAnimation = () => {
      $el.removeEventListener('animationend', removeAnimation);
      $el.removeEventListener('animationcancel', removeAnimation);
      $el.classList.remove(value, 'animated');
      resolve();
    };

    $el.addEventListener('animationend', removeAnimation);
    $el.addEventListener('animationcancel', removeAnimation);
  });
}

const x_PI = (3.14159265358979324 * 3000.0) / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

export function bd09towgs84(bd_lon, bd_lat) {
  const [gcjLog, gcjLat] = bd09togcj02(bd_lon, bd_lat);
  const [lng, lat] = gcj02towgs84(gcjLog, gcjLat);
  return [lng, lat];
}

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
  let x = bd_lon - 0.0065;
  let y = bd_lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
  let gg_lng = z * Math.cos(theta);
  let gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0);
    let dlng = transformlng(lng - 105.0, lat - 35.0);
    let radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    let sqrtmagic = Math.sqrt(magic);
    dlat =
      (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    let mglat = lat + dlat;
    let mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
  }
}

function transformlat(lng, lat) {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) +
      20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) *
      2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) +
      320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

function transformlng(lng, lat) {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) +
      20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) *
      2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
  return (
    lng < 72.004 ||
    lng > 137.8347 ||
    lat < 0.8293 ||
    lat > 55.8271 ||
    false
  );
}

/**
 * @param {Object}   option 配置
 * @param {*} option.start 起始数字
 * @param {*} option.end 结束数字
 * @param {*} option.limitTime 指定时间(ms)
 * @param {*} option.callback 回调函数，参数为每次累加后的数字
 * @return {*}
 */
export function numberAnimation({
  start = 0,
  end = 0,
  limitTime = 1000,
  callback = _ => {}
}) {
  start = +start;
  end = +end;

  if (start === end || typeof callback !== 'function') return;

  const frameTime = 1000 / 60;
  // 帧数
  let frameAmount = limitTime / frameTime;
  let frameStep = (end - start) / frameAmount;

  // 帧的回调函数
  function step() {
    if (start < end) {
      start += frameStep;

      if (start >= end) {
        callback(end);
        window.cancelAnimationFrame(req);
      } else {
        callback(~~start);
        window.cancelAnimationFrame(req);
        req = window.requestAnimationFrame(step);
      }
    }
  }

  let req = window.requestAnimationFrame(step);
}
