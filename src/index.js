/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  // let val = /.*\/(.*)\.html/.exec(url)
  if(url.indexOf('/')!=0){
    var url='/'+url
  }
  // var url = url.split('/')[url.split('/').length - 1].split('.')[0]
  return url
}




/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength(s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, '**').length
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 *
 * @param {*} data 传入的日期
 */
export function format(data) {
  if (arguments[0] == "") {
    return ""
  }
  var time = new Date(data);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h=time.getHours();
  var f=time.getMinutes();
  var s=time.getSeconds()
  if(m<=9){
    m="0"+m
  }
  if(d<=9){
    d="0"+d
  }
  if(h<=9){
    h="0"+h
  }
  if(f<=9){
    f="0"+f
  }
  if(s<=9){
    s="0"+s
  }
  if (arguments[1] == 'yyyy-MM-dd') {
    if(arguments[2] == 'zh') {
      return y + "年" + m + "月" + d + '日'
    }else{
      return y + "-" + m + "-" + d
    }
  }
  if (arguments[1] == 'HH') {
    return h
  }
  if (arguments[1] == 'yyyy-MM') {
    return y + "-" + m
  }
  if (arguments[1] == 'MM-dd') {
    if(arguments[2] == 'zh') {
      return m + "月" + d + '日'
    }else{
      return m + "-" + d
    }
  }
  if(arguments[1] == 'HH:mm') {
    return h+":"+f
  }
  if(arguments[1] == 'HH:mm:ss') {
    return h+":"+f+":"+s
  }
  return y + "-" + m + "-" + d + " "+h+":"+f+":"+s;
}

 // 驼峰命名转下划线命名
 export function camelCaseToUnderScoreCase(str) {
   // 字符串转成数组
   let arr = str.split("");
   let newStr = "";
  for (let i = 0; i < arr.length; i++) {
    if (64 < arr[i].charCodeAt(0) &&  arr[i].charCodeAt(0) < 91) {
      arr[i]="_"+arr[i].toLowerCase();
    }
    newStr+=arr[i];
  }
  return newStr;
 }
// 下划线命名转驼峰命名
 export function underScoreCaseToCamelCase(str) {
  if(!str.includes('_')) {
    return str
  }
  let arr = str.split("_");
  let newStr = "";
  for (let i = 0; i < arr.length; i++) {
    if (i != 0) {
      arr[i]=arr[i].substr(0,1).toUpperCase()+arr[i].substr(1,arr[i].length-1)
    }
    newStr+=arr[i];
  }
  return newStr;
 }




//  三点法转化
export function money(value){
  if (!value) return 0
  else if(value<1000){
    return value
  }
  let text = value.toString();
  // let integer=value.parseInt(value)
  let arr=text.split('.');
  let l=arr[0].length;
  let yu=l%3;
  let str='';
  if(yu!=0){
    str=arr[0].substring(0,yu)
    for(let i=0;i<l-yu;i=i+3){
      str+=","+arr[0].substring(yu+i,yu+3+i)
    }
  }else{
  str=arr[0].substring(0,3)
    for(let i=3;i<l;i=i+3){
      str+=","+arr[0].substring(i,3+i)
    }
  }
  if(arr[1]){
    str+='.'+arr[1]
  }
  return str
}

/**
 * 转成引用类型数组或者非引用类型数组
 * @param {Array} mapVal - 待转换的map值
 * @param {Boolean} type - 是否返回引用类型
 */
export function toArray (mapVal) {
  /**
   * @returns {Array}
   */
  let type = arguments[1] ? true : false;
  let arr = [];
  for (let key in mapVal) {
    arr.push(mapVal[key])
  }
  if (type) {
    return JSON.parse(JSON.stringify(arr));
  }
  return arr;
}

/**
 *
 * @param {String} string -等待处理的字符串
 * @param {Array} match -待删除的字符可以是一个元素，也可以是一个集合
 */
export function stringDeleteMatch(string,match) {
  let arr = [];
  let newstring = "";
  if(typeof match == "string") {
    arr = string.split(match)
    for(let i = 0; i < arr.length; i++) {
      newstring += arr[i]
    }
    return newstring;
  } else if (typeof match == "object") {
    newstring = string;
    for(let i = 0; i < match.length; i++) {
      arr = newstring.split(match[i]);
      newstring = ""
      for(let i = 0; i < arr.length; i++) {
        newstring += arr[i]
      }
    }
    return newstring;
  }
}
/**
 *
 * @param {String} string -待处理的字符串
 * @param {*} re -正则表达式
 * @param {*} replace -取代字符
 */
export function stringReplaceMatch(string,reAndReplace) {
  if(string == '') return '';
  string= string.toString()
  for(let i = 0; i < reAndReplace.length; i++) {
    string = string.replace(reAndReplace[i].re,reAndReplace[i].replace)
  }
  return string
}
/**
 *
 * @param {Array} arr -做搜索的数据
 * @param {Array} order -搜索的关键字和优先级
 * @param {String,Namber} key -要搜索的关键字
 */
export function searchCollate(arr,order,key) {
  let win = {}
  for(let i = 0; i < order.length; i++) {
    win[order[i]] = []
  }
  for (let i = 0; i < arr.length; i++) {
    for(let j = 0; j < order.length; j++) {
      if(arr[i][order[j]] != null && win[order[j]].length < 20) {
        if(arr[i][order[j]].includes(key)) {
          win[order[j]].push(arr[i])
          break;
        }
      }
    }
  }
  let array = []
  for(let i = 0; i < order.length; i++) {
    array = array.concat(win[order[i]])
  }
  return array
}
// 对包含日期的属性的对象进行日期格式化
export function objectPropertyDateTypeSwitch(obj) {
  Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
    console.log(obj[val] instanceof Date,'已经做过日期处理');
    if(obj[val] instanceof Date) {
      obj[val] = format(obj[val],'yyyy-MM-dd');
    }
  });
  return obj;
}
/**
 * 比较两个数组，取得相同或不同部分
 * @param {*} arr1 -数组1
 * @param {*} arr2 -数组2
 * @param {*} type -返回数据指定 same 返回相同 difference 返回去除相同的部分
 */
export function doubleArrayCompare(arr1,arr2,type) {
  let same = []
  let difference1 = JSON.parse(JSON.stringify(arr1))
  let difference2 = JSON.parse(JSON.stringify(arr2))
  // if(arr1.length > arr2.length) {
    for(let i = 0; i < arr1.length; i++) {
      for(let j = 0; j < arr2.length; j++) {
        if(JSON.stringify(arr1[i]) == JSON.stringify(arr2[j])) {
          same.push(arr1[i]);
        }
      }
    }
  // } else {
  //   for(let i = 0; i < arr2.length; i++) {
  //     for(let j = 0; j < arr1.length; j++) {
  //       if(JSON.stringify(arr1[i]) == JSON.stringify(arr2[j])) {
  //         same.push(arr2[i]);
  //       }
  //     }
  //   }
  // }
  if(type == 'same') {
    return same;
  }
  if(type == 'difference') {
    for(let i = 0; i < difference1.length; i++) {
      for(let j = 0; j < same.length; j++) {
        if(JSON.stringify(difference1[i]) == JSON.stringify(same[j])) {
          difference1.splice(i,1);
        }
      }
    }
    for(let i = 0; i < difference2.length; i++) {
      for(let j = 0; j < same.length; j++) {
        if(JSON.stringify(difference2[i]) == JSON.stringify(same[j])) {
          difference2.splice(i,1);
        }
      }
    }
    return [difference1,difference2]
  }
}


// 匹配超链接
export function IsURL(urlString){
let regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/

 if (urlString.match(regExp))

 return true;
 else
 return false;
}
/**
 * 字符串的显示设置
 * @param {*} str -传入的字符串
 * @param {*} len -限制显示长度
 * @param {*} rep -超出部分替代字符 可以不传
 */
export function strShowSet(str,len) {
  let req = '...';
  if (arguments.length >= 3) {
    req = arguments[2]
  }
  let reset = ""
  if(str.length > len) {
    reset = str.slice(0,len).concat(req)
  } else {
    reset = str;
  }
  return reset
}
/**
 * 对象属性设置自定义值
 * @param {*} obj 待处理的对象
 * @param {Array,Object} keysAndVal key: 待处理的属性 old: 待替换的旧值 newVal: 替换成的心值oldVal
 * 使用： objectPropertyCustomByKey(Object,Array,*)
 *        objectPropertyCustomByKey(Object,{
 *          keys: Array,
 *          oldVal: String || Arrary,
 *          newVal: String
 *        })
 */
export function objectPropertyCustomByKey(obj,keysAndVal) {
  let res = JSON.parse(JSON.stringify(obj))
  if(typeof obj != 'object') {
    return;
  }
  // 如果keysAndVal 是个数组，数组的元素被设置成第三形参的值
  if(keysAndVal instanceof Array) {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      keysAndVal.forEach(element => {
        if(key == element) {
          if(obj[key] == '' || obj[key] == null) {
            res[key] = arguments[2]
          }
        }
      });
    })
  }else if(keysAndVal instanceof Object){
    // 如果 keysAndVal 是一个 对象， 应该包看 keys，oldVal newVal
    Object.getOwnPropertyNames(obj).forEach(key => {
      keysAndVal.keys.forEach(element => {
        if(key == element) {
          if(keysAndVal.oldVal instanceof Array) {
            keysAndVal.oldVal.forEach(oldVal => {
              if(obj[key] == oldVal) {
                res[key] = keysAndVal.newVal
              }
            });
          }else {
            if(obj[key] == keysAndVal.oldVal) {
              res[key] = keysAndVal.newVal
            }
          }
        }
      });
    })
  }
  return res
}
/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
/**
 * 计算time天之后的时间
 * @param {*} begin 开始时间
 * @param {*} day 时间间隔
 */
export function computedEndTime (begin,day) {
  let beginTime = new Date;
  let num = 0;
  begin instanceof Date ? beginTime = begin : beginTime = new Date(begin)
  day instanceof Number ? num = day : num = Number(day)
  return new Date(beginTime.getTime() - num * 24 * 60 * 60 * 1000)
}
