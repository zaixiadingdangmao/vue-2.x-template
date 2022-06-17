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
export function formatDate(time = '', type = 1, dateF = '-', timeF = ':') {
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
