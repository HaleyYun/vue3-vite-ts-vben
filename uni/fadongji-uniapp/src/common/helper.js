import store from '@/store'
import Promisify from '@/common/promisify.js'
import { storage, vocenApi, VoHttp } from '@/common/unifyGlobalReg'
import devConf from '@/common/env'
import util from '@/common/MapCoordinate'
import permission, { gotoAppPermissionSetting, requestAndroidPermission } from '@/common/permission'
import { dayjs } from '../../../../packages/shared/dist/index.es5'
import { reject } from 'lodash/collection'

// #ifdef APP-PLUS
const vocenService = uni.requireNativePlugin('vocen-qimoService')
const vocenCamera = uni.requireNativePlugin('vocen-camera')
const vocenScanCode = uni.requireNativePlugin('vocen-scanCode')
// #endif
export const sumFn = (a, b) => {
  return a + b
}

// 获取默认的下个时间段
export function fetchNextTimeDistance(transfer = false) {
  const timeDistance = {
    0: '08:00-10:00',
    1: '08:00-10:00',
    2: '08:00-10:00',
    3: '08:00-10:00',
    4: '08:00-10:00',
    5: '08:00-10:00',
    6: '08:00-10:00',
    7: '08:00-10:00',
    8: '08:00-10:00',
    9: '08:00-10:00',
    10: '10:00-12:00',
    11: '10:00-12:00',
    12: '12:00-14:00',
    13: '12:00-14:00',
    14: '14:00-16:00',
    15: '14:00-16:00',
    16: '16:00-18:00',
    17: '16:00-18:00',
    18: '18:00-20:00',
    19: '18:00-20:00',
    20: '18:00-20:00',
    21: '08:00-10:00',
    22: '08:00-10:00',
    23: '08:00-10:00',
  }

  const nextDistance = {
    '08:00-10:00': '10:00-12:00',
    '10:00-12:00': '12:00-14:00',
    '12:00-14:00': '14:00-16:00',
    '14:00-16:00': '16:00-18:00',
    '16:00-18:00': '18:00-20:00',
    '18:00-20:00': '08:00-10:00',
  }

  let nowDate = dayjs().format('YYYY-MM-DD')
  const nowHour = dayjs().hour()
  if (nowHour >= 18) {
    nowDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
  }

  const dis = timeDistance[nowHour]
  return transfer
    ? {
        date: nowDate,
        time: nextDistance[dis],
        dateTime: `${nowDate} ${nextDistance[dis]}`,
      }
    : `${nowDate} ${nextDistance[dis]}`
}

/**
 * @desc 清理对象中多余的属性
 * @param {Object} obj 对象
 * @param {Boolean} strice 是否严格模式
 * @param {Boolean} tip 是否提示
 * @param {Array<String>} clearValues 过滤的值
 * @returns {boolean|*}
 */
export const clearParamsUnalbeAttr = (
  obj,
  strice = false,
  tip = false,
  clearValues = [null, undefined, '', 'null', 'undefined'],
) => {
  for (var prop in obj) {
    if (checkValue(obj[prop], clearValues)) {
      if (strice) {
        tip && error('参数' + prop + '不能为空')
        return false
      }
      console.log('参数' + prop + '为空被删除')
      delete obj[prop]
    }
  }
  return obj
}

// 数组
/**
 * 指定key，铺平二维数组，一般用于将树状的菜单、分类（数据结构一致，但是利用child这种来标识上下级)
 * 使平铺城1维数组
 * @param {Array} arr 二位数组
 * @param {Object} key 指定的键
 * @param {Array} newArr 一维数组
 * @returns {boolean}
 */
export const plainArray = (arr, key, newArr) => {
  if (!arr || !key) return false
  for (var item of arr) {
    const tempObj = objTranslate(item)
    if (Object.hasOwnProperty.call(tempObj, key)) {
      delete tempObj[key]
    }
    newArr.push(tempObj)
    if (item && item[key] && Array.isArray(item[key])) {
      plainArray(item[key], key, newArr)
    }
  }
}
/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param {Array} arr 指定的数组
 * @param {Object} keyValArr 键值
 * @param {boolean} full 是否返回值和下标，默认只返回下标
 * @returns {{val, idx: string}|string|boolean}
 */
export const findArrayIdx = (arr, keyValArr, full = false) => {
  for (var i in arr) {
    if (typeof arr[i] !== 'object') continue
    // 用来比较对象
    if (compareObj(keyValArr, arr[i])) {
      if (!full) return i
      return {
        val: arr[i],
        idx: i,
      }
    }
  }
  return false
}
/**
 * 从元素是对象的一维数组中，获取指定的键名对应的值组成的简单值一维数组.
 * 支持两级（也就是可以获取数组对象中的指定属性的子属性
 * @param {Object} arr 数组对象
 * @param {Array/Object} column 键名
 * @returns {*[]}
 */
export const getArrColumn = (arr, column) => {
  if (typeof arr !== 'object') {
    throw new Error('第二个参数为一个数组或者对象')
  }
  // if (!Array.isArray(arr)) {
  //   throw new Error('第二个参数为一个数组')
  // }
  if (typeof column !== 'string') {
    throw new Error('键名为字符串')
  }
  if (!column) {
    throw new Error('键名必传')
  }
  const rt = []
  // 这就约束column中没有...号，如果有代表着子属性
  if (column.indexOf('...') !== -1) {
    // 两级
    const key1 = column.split('...')[0]
    const key2 = column.split('...')[1]
    for (var k in arr) {
      if (typeof arr[k] !== 'object') {
        throw new Error('获取的数值为简单值')
      }
      rt.push(arr[k][key1][key2])
    }
  } else {
    for (var k in arr) {
      if (typeof arr[k] !== 'object') {
        throw new Error('获取的数值为简单值')
      }
      rt.push(arr[k][column])
    }
  }
  return rt
}

// 获取
/**
 * 获取对象的属性个数
 * @param {Object} obj 对象
 * @param {boolean} stict 严格模式下，只返回自己的，忽略原型链继承的
 * @returns {boolean|number}
 */
export const getObjectAttrNum = (obj, stict = true) => {
  if (typeof stict !== 'object') return false
  if (!stict) return Object.keys(obj).length // 不区分是否继承而来
  let count = 0
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) count++
  }
  return count
}

// 判断
/**
 *判断链接是否带域名
 * @param {string|*} url
 * @returns {string|*}
 */
export const getDomain = (url) => {
  if (!url) return ''
  if (url.indexOf('http') === -1) return devConf.showCosUrl + url
  return url
}

/**
 *判断是否是微信环境
 * @returns {boolean}
 */
export const isWeiXin = () => {
  // #ifdef H5
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) && ua.match(/micromessenger/i).toString() === 'micromessenger') {
    return true
  } else {
    return false
  }
  // #endif
  // #ifndef H5
  return false
  // #endif
}

/**
 * 判断APP来源
 * @returns {number}
 */
export const appSource = () => {
  //1：Android，2：IOS，3：h5，4：pc，5：小程序 6 公众号

  // #ifdef H5
  if (isWeiXin()) {
    return 5 //公众号
  } else {
    return 3 //H5
  }
  // #endif

  // #ifdef MP-WEIXIN
  return 5 //小程序
  // #endif

  // #ifdef APP
  let platform = uni.getSystemInfoSync().platform
  if (platform == 'android') {
    return 1 //android
  } else {
    return 2 //ios
  }
  // #endif
}

/**
 * 检测是否登录
 * @return {boolean}
 */
export const checkIsLogin = () => {
  const userInfo = storage.get('userInfo')
  if (userInfo && userInfo.access_token) {
    return true
  }
  return false
}

/**
 * 检测是否认证
 * @return {boolean}
 */
export const checkIsApproveFn = () => {
  //checkStatus -1：游客模式，0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
  const userInfo = storage.get('userInfo')
  return !!(userInfo && +userInfo.checkStatus === 3)
}

// 分享
/**
 *构造分享事件
 * @param {string} path 这个里面无需传owenr_id和users_id
 * @return {string}
 */
export const buildSharePath = (path) => {
  const userInfo = store.state.userInfo || storage.get('userInfo')
  let search = ''
  if (path.indexOf('owner_id') === -1) {
    let owner_id = 0
    if (userInfo.id && userInfo.is_distributor === 1) {
      owner_id = userInfo.id
    }
    search += '&owner_id=' + owner_id
  }
  let ret = ''
  if (path.indexOf('?') !== -1) {
    ret = path + (search ? '&' : '') + search
  } else {
    ret = path + (search ? '?' : '') + search
  }
  console.log(`share path is ${ret}`)
  return ret
}

// 下载
/**
 * 下载文件
 * @param {string} url 下载资源的url
 * @returns {Promise<boolean>}
 */
export const downLoadFile = async (url) => {
  try {
    if (url.indexOf('https') < 0 && url.indexOf('aliyuncs.com') >= 0) {
      url = 'https' + url.substr(4)
    }
    const downRT = await Promisify('downloadFile', { url }).catch((e) => {
      throw Error(e.errMsg)
    })
    const { tempFilePath } = downRT
    if (!tempFilePath) throw Error('图片下载失败')
    return tempFilePath
  } catch (e) {
    return false
  }
}
/**
 * 保存图片到本地
 * @param {string} fileUrl 保存到相册的图片路径
 * @param {string} type 本地
 * @returns {Promise<boolean|*>}
 */
export const saveImageToDisk = async ({ fileUrl, type = 'local' }) => {
  try {
    const fileTempPath = type === 'local' ? fileUrl : await downLoadFile(fileUrl)
    await Promisify('saveImageToPhotosAlbum', { filePath: fileTempPath }).catch((e) => {
      throw Error(e.errMsg)
    })
    return fileTempPath
  } catch (e) {
    return false
  }
}

// 提示框
/**
 *显示消息提示框
 * @param {string} title 提示的内容
 * @param {string} [icon] 图标
 * @param {string} [image] 自定义图标的本地路径
 * @param {number} [duration] 提示的延迟时间
 */
export const toast = (title, icon, image, duration, mask = true) => {
  uni.showToast({
    title,
    duration: duration || 3000,
    icon,
    image,
    mask,
  })
}
/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param {string} title 提示的内容
 * @param {string} [icon] 图标
 * @param {number} [duration] 提示的延迟时间
 */
export const error = (title, icon, duration) => {
  if (!title) return
  if (title.length > 6) {
    // 显示所有的问题
    toast(title, 'none', '', duration)
  } else {
    toast(title, 'none', duration)
  }
}
/**
 * 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
 */
export const modal = function () {
  const opt = {
    title: '提示',
    content: '',
  }
  if (typeof arguments[0] === 'string') {
    opt.content = arguments[0]
  } else if (typeof arguments[0] === 'object') {
    Object.assign(opt, arguments[0])
  }
  uni.showModal(opt)
}
/**
 * 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
 * @param {Function} options title提示的文字内容,mask是否显示透明蒙层，防止触摸穿透
 * @returns {Promise<unknown>}
 */
export const confirm = (options) => {
  return new Promise(function (resolve, reject) {
    uni.showModal({
      ...options,
      success: function (res) {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      },
    })
  })
}
/**
 * 显示 loading 提示框
 * @param {string} title 提示的文字内容
 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
 */
export const showLoading = (title = '加载中', mask = true) => {
  uni.showLoading({
    title,
    mask,
  })
}
/**
 * 隐藏 loading 提示框
 */
export const hideLoading = () => {
  uni.hideLoading()
}

// 定位
/**
 * 使用应用内置地图查看位置
 * @param {string} [name] 位置名
 * @param {string} [address] 地址的详细说明
 * @example let data = openLocation()
 * data:{
 * 	"name": "龙子湖街道文都考研龙子湖总部正商木华广场",
 * 	"latitude": 34.794721,
 * 	"longitude": 113.809085,
 * 	"address": "河南省郑州市金水区龙子湖街道文都考研龙子湖总部正商木华广场",
 * 	"errMsg": "chooseLocation:ok"
 * }
 */
export const openLocation = () => {
  // TODO  地图换为jssdk   和app条件编译
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: function (result) {
        console.log('success', result)
        resolve(result)
      },
      fail(err) {
        reject(err)
        console.log(err)
      },
    })
    // uni.getLocation({
    //   type: 'wgs84', //返回可以用于uni.chooseLocation的经纬度
    //   success: function (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     setTimeout(() => {
    //
    //     }, 1000)
    //   },
    //   fail: () => {
    //     uni.showModal({
    //       title: '提示',
    //       content: '需要您开启定位授权，获取您的位置信息！',
    //       cancelText: '暂不开启',
    //       confirmText: '去开启',
    //       success: ({ confirm, cancel }) => {
    //         if (confirm) {
    //           // android平台
    //           if (uni.getSystemInfoSync().platform == 'android') {
    //             var Intent = plus.android.importClass('android.content.Intent')
    //             var Settings = plus.android.importClass('android.provider.Settings')
    //             var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
    //             var main = plus.android.runtimeMainActivity()
    //             main.startActivity(intent) // 打开系统设置GPS服务页面
    //           }
    //           // ios平台
    //           if (uni.getSystemInfoSync().platform == 'ios') {
    //             var UIApplication = plus.ios.import('UIApplication')
    //             var application2 = UIApplication.sharedApplication()
    //             var NSURL2 = plus.ios.import('NSURL')
    //             var setting2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION')
    //             application2.openURL(setting2)
    //             plus.ios.deleteObject(setting2)
    //             plus.ios.deleteObject(NSURL2)
    //             plus.ios.deleteObject(application2)
    //           }
    //         }
    //         // 用户取消前往开启定位服务
    //         if (cancel) {
    //           // do sth...
    //           uni.navigateBack()
    //         }
    //       },
    //     })
    //   },
    // })
  })
}
/**
 * 获取用户经纬度，打开定位权限
 * @param message Ovject { message: 提示语, cancel:取消按钮文字, confirm: 确定按钮文字 }
 * @returns {Promise<unknown>}
 */
export const getLocation = (message) => {
  // TODO  地图换为jssdk   和app条件编译
  return new Promise((resolve, reject) => {
    uni.getLocation({
      // 间隔最低30s
      type: 'wgs84', //返回可以用于uni.chooseLocation的经纬度
      success: function (res) {
        console.log('getLocations', res)
        const { latitude, longitude } = res
        const result = util.transformFromWGSToGCJ(latitude, longitude)
        console.log(result)
        let data = Object.assign({}, res)
        data.latitude = +result.latitude.toFixed(6)
        data.longitude = +result.longitude.toFixed(6)
        resolve(data)
        // const latitude = res.latitude
        // const longitude = res.longitude
      },
      complete: (e) => {
        console.log(e)
      },
      fail: (e) => {
        console.log(e)
        uni.showModal({
          title: '提示',
          showCancel: true,
          content: message ? message.message : '需要您开启定位授权，获取您的位置信息！',
          cancelText: message ? message.cancel : '暂不开启',
          confirmText: message ? message.confirm : '去开启',
          success: ({ confirm, cancel }) => {
            if (confirm) {
              // android平台
              if (uni.getSystemInfoSync().platform == 'android') {
                var context = plus.android.importClass('android.content.Context')
                var locationManager = plus.android.importClass('android.location.LocationManager')
                var main = plus.android.runtimeMainActivity()
                var mainSvr = main.getSystemService(context.LOCATION_SERVICE)
                if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
                  main.startActivity(intent) // 打开系统设置GPS服务页面
                } else {
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var Uri = plus.android.importClass('android.net.Uri')
                  var mainActivity = plus.android.runtimeMainActivity()
                  var intent = new Intent()
                  intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                  var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
                  intent.setData(uri)
                  mainActivity.startActivity(intent)
                }
              }
              // ios平台
              if (uni.getSystemInfoSync().platform == 'ios') {
                var UIApplication = plus.ios.import('UIApplication')
                var application2 = UIApplication.sharedApplication()
                var NSURL2 = plus.ios.import('NSURL')
                var setting2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION')
                application2.openURL(setting2)
                plus.ios.deleteObject(setting2)
                plus.ios.deleteObject(NSURL2)
                plus.ios.deleteObject(application2)
              }
            }
            // 用户取消前往开启定位服务
            if (cancel) {
              // do sth...
              console.error('取消了')
              reject('取消了')
            }
          },
          fail: (err) => {
            reject(err)
          },
        })
      },
    })
  })
}
/**
 * Nvue前端转换wgs84报错，交由后端处理
 * @param message
 * @returns {Promise<unknown>}
 */
export const getLocationForNvue = (message) => {
  // TODO  地图换为jssdk   和app条件编译
  return new Promise((resolve, reject) => {
    uni.getLocation({
      // 间隔最低30s
      type: 'wgs84', //返回可以用于uni.chooseLocation的经纬度
      success: function (res) {
        console.log('getLocations', res)
        resolve(res)
      },
      fail: (e) => {
        console.log(e)
        uni.showModal({
          title: '提示',
          content: message ? message.message : '需要您开启定位授权，获取您的位置信息！',
          cancelText: message ? message.cancel : '暂不开启',
          confirmText: message ? message.confirm : '去开启',
          success: ({ confirm, cancel }) => {
            if (confirm) {
              // android平台
              if (uni.getSystemInfoSync().platform == 'android') {
                var context = plus.android.importClass('android.content.Context')
                var locationManager = plus.android.importClass('android.location.LocationManager')
                var main = plus.android.runtimeMainActivity()
                var mainSvr = main.getSystemService(context.LOCATION_SERVICE)
                if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
                  main.startActivity(intent) // 打开系统设置GPS服务页面
                } else {
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var Uri = plus.android.importClass('android.net.Uri')
                  var mainActivity = plus.android.runtimeMainActivity()
                  var intent = new Intent()
                  intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                  var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
                  intent.setData(uri)
                  mainActivity.startActivity(intent)
                }
              }
              // ios平台
              if (uni.getSystemInfoSync().platform == 'ios') {
                var UIApplication = plus.ios.import('UIApplication')
                var application2 = UIApplication.sharedApplication()
                var NSURL2 = plus.ios.import('NSURL')
                var setting2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION')
                application2.openURL(setting2)
                plus.ios.deleteObject(setting2)
                plus.ios.deleteObject(NSURL2)
                plus.ios.deleteObject(application2)
              }
            }
            // 用户取消前往开启定位服务
            if (cancel) {
              console.error('取消了')
              reject('取消了')
            }
          },
          fail: (err) => {
            reject(err)
          },
        })
      },
    })
  })
}

// 返回
/**
 * 关闭当前页面，返回上一页面或多级页面
 */
export const backFunc = (step = 1) => {
  // const currentPages = getCurrentPages()
  // if (currentPages.length < 2) {
  //   toHome()
  // }
  uni.navigateBack({
    delta: step,
    fail(err) {},
  })
}

/**
 *保留当前页面，跳转到应用内的某个页面，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {string} url 需要跳转的应用内非 tabBar 的页面的路径
 * @param {string} type
 */
export const linkToEasy = (url, type = 'default') => {
  throttle(() => {
    uni.navigateTo({
      url,
    })
  }, 1000)
}
/**
 *保留当前页面，跳转到应用内的某个页面，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {string} url 需要跳转的应用内非 tabBar 的页面的路径
 * @param {string} type
 */
export const linkToWebView = (url, encode = true) => {
  let href = '/pages/CommonWeb/WebView?url=' + url
  throttle(() => {
    uni.navigateTo({
      url: encode ? href + '&encode=1' : href,
    })
  }, 1000)
}

let timer
let flag
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export const throttle = (func, wait = 500, immediate = true) => {
  if (immediate) {
    if (!flag) {
      flag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  } else if (!flag) {
    flag = true
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false
      typeof func === 'function' && func()
    }, wait)
  }
}

// 打电话
/**
 * 拨打电话
 * @param {string} phone 需要拨打的电话号码
 */
export const cellPhone = async (phone) => {
  let a = true
  // #ifdef APP-PLUS
  if (uni.getSystemInfoSync().platform === 'android') {
    //ios不需要获取电话权限
    a = await permission.requestAndroidPermission('android.permission.CALL_PHONE')
    // 永久拒绝
    if (a === -1) {
      a = false
    }
  }
  console.log('quanxian=====', a)
  if (!a) {
    uni.showModal({
      title: '提示',
      content: '请去设置打开电话权限',
      success: function (res) {
        if (res.confirm) {
          permission.gotoAppPermissionSetting()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
    return
  }
  // #endif
  uni.makePhoneCall({
    phoneNumber: String(phone),
  })
}

export const urlencode = (str) => {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+')
}

/**
 * 从指定的字符串中获取需要的参数，适用于网络地址
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str, name) => {
  // 获取？号出现几次
  var tempArr = str.split('?')

  // //如果大于1
  if (tempArr.length - 1 > 1) {
    var rt = null
    for (var i in tempArr) {
      var s = tempArr[i]
      var reg1 = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r1 = s.match(reg1) // 匹配目标参数
      if (r1 != null) {
        rt = encodeURIComponent(r1[2]) // 一直覆盖，要最后的就行了
      }
    }

    return rt
  }

  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  if (!str.split('?')[1]) return null
  var r = str.split('?')[1].match(reg) // 匹配目标参数

  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null // 返回参数值
}

/**
 * 获取视频
 * @param {number} count 最多可以选择的文件个数
 * @param {Array<String>} sourceType album 从相册选视频，camera 使用相机拍摄
 * @param {Array<String>} sizeType 可以指定是原图还是压缩图，默认二者都有
 * @returns {Promise<unknown>}
 */
export const chooseVideoByPromise = ({
  durationLimit = 0,
  count = 9,
  sourceType = ['camera', 'album'],
  sizeType = ['original', 'compressed'],
  progressList = [],
  tip = '',
  isTencentCloud = true,
} = {}) => {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      count,
      sizeType,
      compressed:false,
      success(res) {
        console.log(res)
        // // #ifdef H5
        // // if (res.tempFiles)
        // console.log(res.tempFiles[0].type.indexOf('video'))
        // for (let i = 0; i < res.tempFiles.length; i++) {
        //   if (res.tempFiles[i].type.indexOf('video') === -1) {
        //     uni.$u.toast('请上传视频类型文件')
        //     return
        //   }
        // }
        // // #endif
        if (durationLimit > 0 && res.duration > 60) {
          reject({ message: '视频超出1分钟，请重新选择' })
          return
        }

        // #ifdef APP-PLUS
        resolve(
          uploadFile({
            imgs: [res.tempFile || res.tempFilePath],
            progressList,
            isPath: true,
            tip,
            haveShot: true,
            isTencentCloud,
            extraData: {
              width: res.width,
              height: res.height,
            },
            baseData: res,
          }),
        )
        // #endif

        // #ifndef APP-PLUS
        resolve(
          uploadFile({
            imgs: [res.tempFile || res.tempFilePath],
            progressList,
            tip,
            haveShot: true,
            isTencentCloud,
            extraData: {
              width: res.width,
              height: res.height,
            },
            baseData: res,
          }),
        )
        // #endif

        // resolve(res)
      },
      fail(err) {
        if (err.code && err.code !== 12) {
          uni.showModal({
            title: '提示',
            content: '请去设置打开相机权限',
            success: function (res) {
              if (res.confirm) {
                gotoAppPermissionSetting()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
          })
          reject(err)
        }
      },
      complete() {},
    })
  })
}

/**
 * 选择图片上传腾讯云
 * @param count
 * @param sizeType
 * @sourceType
 * @returns {Promise<unknown>}
 */
// 图片类型列表
const imgTypeArr = 'png,jpg,jpeg,gif,webp'
export const chooseImageByPromise = ({
  count = 9,
  sourceType = ['camera', 'album'],
  sizeType = ['original', 'compressed'],
  progressList = [],
  tip = '',
  isTencentCloud = true,
} = {}) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      success(res) {
        console.log(res, 'sss')
        // // #ifdef H5
        // console.log(res.tempFiles[0].type.indexOf('image'))
        // for (let i = 0; i < res.tempFiles.length; i++) {
        //   if (res.tempFiles[i].type.indexOf('image') === -1) {
        //     uni.$u.toast('请上传图片类型文件')
        //     return
        //   }
        // }
        // // #endif

        // #ifndef APP-PLUS
        resolve(uploadFile({ imgs: res.tempFiles, progressList, tip, isTencentCloud }))
        // #endif
        // #ifdef APP-PLUS
        resolve(
          uploadFile({ imgs: res.tempFilePaths, progressList, isPath: true, tip, isTencentCloud }),
        )
        // #endif
      },
      fail(err) {
        if (err.code && err.code !== 12 && err.code !== -2 && err.code !== 2 && err.code !== 11) {
          uni.showModal({
            title: '提示',
            content: '请去设置打开相机权限',
            success: function (res) {
              if (res.confirm) {
                gotoAppPermissionSetting()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
          })
          reject(err)
        }
      },
      complete() {},
    })
  })
}

/**
 * 批量上传照片
 * @param imgs string:[]
 * @param name 标识
 * @param data 业务参数:{}
 * @returns {Promise<unknown>}
 */
export const uploadFile = ({
  imgs,
  data,
  progressList = [],
  isPath = false,
  tip,
  haveShot = false,
  isTencentCloud = false,
  extraData = {},
  baseData,
}) => {
  const taskList = []
  console.log(imgs, 'sss')
  for (let i = 0; i < imgs.length; i++) {
    let name = ''
    if (isPath) {
      let splitName = imgs[i].split('.')
      name = '.' + splitName[splitName.length - 1]
    } else {
      name = imgs[i].name
    }
    if (tip) {
      uni.showLoading({
        title: tip,
        mask: true,
      })
    }
    const taskItem = upload({
      haveShot,
      url: imgs[i],
      name,
      idx: i,
      progressList,
      formData: data,
      isPath,
      isTencentCloud,
      extraData,
      tip,
    })
    taskList.push(taskItem)
  }

  return new Promise((resolve, reject) => {
    Promise.all(taskList)
      .then((urls) => {
        console.log(urls, 'urls')
        // uni.hideLoading()
        if (baseData) {
          urls.forEach((item) => {
            item.baseData = baseData
          })
        }
        resolve(urls)
      })
      .catch((err) => {
        // uni.hideLoading()
        const errMsg = Object.hasOwnProperty.call(err, 'errMsg') ? err.errMsg : err
        reject(errMsg)
      })
  })
}

// h5 下载文件

export function download(data, strFileName, strMimeType) {
  var self = window, // this script is only for browsers anyway...
    u = 'application/octet-stream', // this default mime also triggers iframe downloads
    m = strMimeType || u,
    x = data,
    D = document,
    a = D.createElement('a'),
    z = function (a) {
      return String(a)
    },
    B = self.Blob || self.MozBlob || self.WebKitBlob || z,
    BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
    fn = strFileName || 'download',
    blob,
    b,
    fr

  //if(typeof B.bind === 'function' ){ B=B.bind(self); }

  if (String(this) === 'true') {
    //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
    x = [x, m]
    m = x[0]
    x = x[1]
  }

  //go ahead and download dataURLs right away
  if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
    return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
      ? navigator.msSaveBlob(d2b(x), fn)
      : saver(x) // everyone else can save dataURLs un-processed
  } //end if dataURL passed?

  try {
    blob = x instanceof B ? x : new B([x], { type: m })
  } catch (y) {
    if (BB) {
      b = new BB()
      b.append([x])
      blob = b.getBlob(m) // the blob
    }
  }

  function d2b(u) {
    var p = u.split(/[:;,]/),
      t = p[1],
      dec = p[2] == 'base64' ? atob : decodeURIComponent,
      bin = dec(p.pop()),
      mx = bin.length,
      i = 0,
      uia = new Uint8Array(mx)

    for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i)

    return new B([uia], { type: t })
  }

  function saver(url, winMode) {
    if ('download' in a) {
      //html5 A[download]
      a.href = url
      a.setAttribute('download', fn)
      a.innerHTML = 'downloading...'
      D.body.appendChild(a)
      setTimeout(function () {
        a.click()
        D.body.removeChild(a)
        if (winMode === true) {
          setTimeout(function () {
            self.URL.revokeObjectURL(a.href)
          }, 250)
        }
      }, 66)
      return true
    }

    //do iframe dataURL download (old ch+FF):
    var f = D.createElement('iframe')
    D.body.appendChild(f)
    if (!winMode) {
      // force a mime that will download:
      url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, u)
    }

    f.src = url
    setTimeout(function () {
      D.body.removeChild(f)
    }, 333)
  } //end saver

  if (navigator.msSaveBlob) {
    // IE10+ : (has Blob, but not a[download] or URL)
    return navigator.msSaveBlob(blob, fn)
  }

  if (self.URL) {
    // simple fast and modern way using Blob and URL:
    saver(self.URL.createObjectURL(blob), true)
  } else {
    // handle non-Blob()+non-URL browsers:
    if (typeof blob === 'string' || blob.constructor === z) {
      try {
        return saver('data:' + m + ';base64,' + self.btoa(blob))
      } catch (y) {
        return saver('data:' + m + ',' + encodeURIComponent(blob))
      }
    }

    // Blob but not URL:
    fr = new FileReader()
    fr.onload = function (e) {
      saver(this.result)
    }
    fr.readAsDataURL(blob)
  }
  return true
}

/**
 * @description 上传图片
 * @param url
 * @param extraData 额外的参数
 * @param formData
 * @param isTencentCloud 是否是腾讯云
 * @returns {Promise<unknown>}
 */
export const upload = ({
  url,
  name,
  data,
  isPath = false,
  tip = '',
  haveShot = false,
  isTencentCloud = true,
  formData = {},
  extraData = {},
}) => {
  let _this = this
  if (isTencentCloud) {
    const dateVal = new Date()
    const yearDate =
      dateVal.getFullYear() + '/' + (dateVal.getMonth() + 1) + '/' + dateVal.getDate() + '/'

    // 如果是腾讯云
    let fileName =
      'GongChuangJi/' +
      yearDate +
      (Date.now() +
        Math.floor(Math.random() * (100 - 0)) * Math.floor(Math.random() * (100 - 0)) +
        name)

    if (tip) {
      uni.showLoading({
        title: tip,
      })
    }
    return new Promise((resolve, reject) => {
      // 此处替换为你自己的网络请求方法
      VoHttp.apiCreatedCosGet({
        businessType: 1,
        fileUrl: 1,
      })
        .then((res) => {
          let formData = {
            key: fileName,
            policy: res.data.policy, // 这个传 policy 的 base64 字符串
            success_action_status: 200,
            'q-sign-algorithm': 'sha1',
            'q-ak': res.data.secretId,
            'q-key-time': res.data.KeyTime,
            'q-signature': res.data.qSignature,
            'x-cos-security-token': res.data.secretToken,
          }
          formData = { ...data, ...formData }
          // 如果服务端用了临时密钥计算，需要传 x-cos-security-token
          // formData['x-cos-security-token'] = formData.securityToken

          let options = {
            url: devConf.tencentCosUrl, //仅为示例，非真实的接口地址
            name: 'file',
            formData: formData,
            success: (res) => {
              let result = {
                fileName: fileName,
                filePath: name,
                fileNameUrl: devConf.tencentCosUrl + '/' + fileName,
                width: extraData.width || res.width,
                height: extraData.height || res.height,
              }

              if (haveShot) {
                let shotName = fileName.split('.')[0]
                result.shotUrl = devConf.tencentCosUrl + '/' + shotName + 'shot0' + '.jpg'

                loadImage(result.shotUrl)
                  .then((res) => {
                    uni.hideLoading()
                    resolve(result)
                  })
                  .catch((e) => {
                    uni.hideLoading()

                    reject(e)
                  })
              } else {
                const shotUrl = devConf.tencentCosUrl + '/' + fileName
                loadImage(shotUrl)
                  .then((res) => {
                    uni.hideLoading()
                    resolve(result)
                  })
                  .catch((e) => {
                    uni.hideLoading()

                    reject(e)
                  })
              }
            },
            fail(err) {
              uni.hideLoading()

              reject(err)
            },
          }
          //是否上传路径
          if (isPath) {
            options.filePath = url
          } else {
            options.file = url
          }

          if (tip) {
            uni.showLoading({
              title: tip,
            })
          }

          uni.uploadFile(options)
        })
        .catch((e) => {
          reject(e)
        })
    })
  } else {
    console.log('url', url)
    console.log('name', name)
    console.log('data', data)
    console.log('formData', formData)
    console.log('extraData', extraData)

    // 本地上传图片   文件
    if (tip) {
      uni.showLoading({
        title: tip,
      })
    }
    const token = getToken()
    return new Promise((resolve, reject) => {
      let options = {
        url:
          devConf.apiBaseUrl +
          devConf.apiPrefix +
          (haveShot ? '/v1/api/file/videoUpload' : '/v1/api/file/imgUpload'), //仅为示例，非真实的接口地址
        name: 'file',
        formData: formData,
        header: {
          Authorization: 'Bearer ' + token,
        },
        success: (res) => {
          let result = JSON.parse(res.data)
          console.log(result, '图片信息')
          let obj = {
            fileNameUrl: result.data.filePath,
            filePatLocation: url,
            fileName: result.data.fileName,
            width: extraData.width || result.data.width,
            height: extraData.height || result.data.width,
            shotUrl: result.data.picUrl,
            ...result.data,
          }
          console.log(obj)

          resolve(obj)
        },
        fail(err) {
          reject(err)
        },
        complete() {
          uni.hideLoading()
        },
      }
      //是否上传路径
      if (isPath) {
        options.filePath = url
      } else {
        options.file = url
      }
      console.log(options, '111111111111')

      uni.uploadFile(options)
    })
  }
}
/**
 *xuex
 * @param src
 * @returns {Promise<unknown>}
 */
const loadImage = (src) => {
  console.log(src, 'srcsrc')
  let boo = null
  let count = 0
  return new Promise(function (resolve, reject) {
    setInterval(() => {
      if (!boo) {
        count++
        uni.getImageInfo({
          src: src,
          success: function () {
            console.log('999988888')
            boo = true
            clearInterval()
            resolve() //加载时执行resolve函数
          },
          fail: function (err) {
            if (count > 20) {
              boo = true
              clearInterval()
              resolve()
            }
            console.log(err, 'err')
          },
        })
      }
    }, 1000)
  })
}

/**
 * @description 上传mp3
 * @param url
 * @param extraData 额外的参数
 * @param formData
 * @param isTencentCloud 是否是腾讯云
 * @returns {Promise<unknown>}
 */
export const uploadMp3 = ({
  url,
  name,
  data,
  isPath = false,
  tip = '',
  mask = false,
  haveShot = false,
  isTencentCloud = true,
  formData = {},
  extraData = {},
  api = '/v1/api/file/mp3Upload',
}) => {
  let _this = this

  // 本地上传图片   文件
  if (tip) {
    uni.showLoading({
      title: tip,
      mask: mask,
    })
  }
  const token = getToken()
  return new Promise((resolve, reject) => {
    let options = {
      url: devConf.apiBaseUrl + devConf.apiPrefix + api, //仅为示例，非真实的接口地址
      name: 'file',
      formData: formData,
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: (res) => {
        console.log('3333333', res)
        if (+res.statusCode === 200) {
          let result = res.data ? JSON.parse(res.data) : ''
          let obj = {
            fileNameUrl: result.data.filePath,
            fileName: result.data.fileName,
            width: extraData.width || result.data.width,
            height: extraData.height || result.data.width,
            shotUrl: result.data.picUrl,
            ...result.data,
            ...result,
          }
          console.log(obj)

          resolve(obj)
          return
        }
        reject(err)
        // uni.showToast({
        //   title: res.errMsg,
        //   icon: 'none',
        // })
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // uni.hideLoading()
      },
    }
    //是否上传路径
    if (isPath) {
      options.filePath = url
    } else {
      options.file = url
    }
    console.log(options)
    uni.uploadFile(options)
  })
}

/**
 * 分享到微信,仅支持app
 * @param title 分享内容的标题
 * @param path 分享链接
 * @param imageUrl 分享图片
 * @param desc 分享摘要
 * @param scene WXSceneSession 聊天界面  WXSceneTimeline 朋友圈 可选参数，默认聊天界面
 * @example shareWeixin({title: '标题', path: 'http://www.baidu.com', imgUrl: '图片路径', desc: '分享的描述'})
 */
export const shareWeixin = ({
  title = '发动集APP-买发动机，上发动集',
  path,
  imageUrl,
  desc = '品牌多，型号全，价格透明，全站一键比价',
  scene = 'WXSceneSession',
}) => {
  let shareOptions
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    shareOptions = {
      provider: 'weixin',
      title,
      scene,
      summary: desc,
      imageUrl,
      type: 0,
      href: buildSharePath(path),
      // href: path,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
    }
    uni.share(shareOptions)
    // #endif
    // #ifdef H5
    if (!isWeiXin()) {
      reject(new Error('请在微信中打开！'))
    }
    console.log('zxc', path)
    VoHttp.wxSignature({ url: path }, { noPrefix: true })
      .then((res) => {
        const config = res.data
        const jsApiList = [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'openLocation',
          'getLocation',
          'scanQRCode',
          'chooseImage',
          'previewImage',
          'uploadImage',
        ]
        const { nonceStr, timestamp, appId, signature } = config
        wx.config({
          debug: true,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList,
        })
        let shareOptions
        shareOptions = {
          title,
          link: path,
          desc,
          imageUrl,
          success: () => {
            console.log('分享成功了')
          },
        }
        wx.ready(() => {
          wx.updateAppMessageShareData(shareOptions)
          wx.updateTimelineShareData(shareOptions)
        })
      })
      .catch((res) => {
        console.log(res)
        reject(res.msg || 'jssdk签名失败')
      })
    // #endif
  })
}

/**
 * 获取图片 OCR
 * @param count
 * @param sizeType
 * @sourceType
 * @returns {Promise<unknown>}
 */
export const chooseImageOcrByPromise = ({
  count = 9,
  sourceType = ['camera', 'album'],
  sizeType = ['original', 'compressed'],
  formData = {},
  tip = '',
  apiUrl = '/v1/api/file/ocr',
} = {}) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sourceType,
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      success(res) {
        console.log(res, 'chooseImage')

        // #ifndef APP-PLUS
        resolve(uploadOcr({ url: res.tempFiles[0], formData, tip, apiUrl }))
        // #endif
        // #ifdef APP-PLUS
        resolve(uploadOcr({ url: res.tempFilePaths[0], isPath: true, formData, tip, apiUrl }))
        // #endif
      },
      fail(err) {
        console.log(err)
        //-2 是用户收订取消的
        if (err.code && err.code !== 12 && err.code !== 11 && err.code !== -2 && err.code !== 2) {
          uni.showModal({
            title: '提示',
            content: '请去设置打开相机权限',
            success: function (res) {
              if (res.confirm) {
                gotoAppPermissionSetting()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
          })
          reject(err)
        }
      },
      complete() {},
    })
  })
}
const getToken = () => {
  return storage.get('access_token')
}
/**
 * @description 上传图片到OCR
 * @param url
 * @returns {Promise<unknown>}
 */
export const uploadOcr = ({ url, formData = {}, isPath = false, tip, apiUrl }) => {
  if (tip) {
    uni.showLoading({
      title: tip,
      mask: true,
    })
  }
  const token = getToken()
  return new Promise((resolve, reject) => {
    let options = {
      url: devConf.apiBaseUrl + devConf.apiPrefix + apiUrl, //仅为示例，非真实的接口地址
      name: 'file',
      formData: formData,
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: (res) => {
        console.log('上传图片到OCRsuccess', res)
        resolve({ ...res, url })
      },
      fail: (err) => {
        console.log('上传图片到OCRerrrr', err)
        reject(err)
      },
      complete(c) {
        uni.hideLoading()
      },
    }
    //是否上传路径
    if (isPath) {
      options.filePath = url
    } else {
      options.file = url
    }
    uni.uploadFile(options)
  })
}

export const regroupFileData = (item, key = 'fileUrl', symbol = '|') => {
  if (item[key]) {
    let dataArr = item[key].split(symbol)

    let image = []
    let video = []
    let audio = []
    dataArr.map((it) => {
      let file = it.substring(it.length - 3, it.length)
      if (file === 'MP4' || file === 'mp4') {
        video.push(it)
      } else if (file === 'MP3' || file === 'mp3') {
        audio.push(it)
      } else {
        image.push(it)
      }
    })
    video.length > 0 ? (item.video = video) : ''
    audio.length > 0 ? (item.audio = audio) : ''
    image.length > 0 ? (item.image = image) : ''
  }
}
/**
 * 腾讯云 回显视频封面图
 * @param url 视频路径
 * @returns {string}
 */
export const transformShotUrl = (url) => {
  return vocenApi.Pattern.isImgUrl(url) ? url : url.split('.')[0] + 'shot0' + '.jpg'
}

/**
 * @description 拼接图片路径
 * @param url
 * @returns {string|*}
 */
export const serveDomainFn = (url) => {
  if (!url) return ''
  if (url.indexOf('http') === -1) return url
  return url
}

export const toRoleHome = () => {
  let userInfo = store.getters['user/userInfoGetter']
  console.log(userInfo)
  if (userInfo.roleCode === 'supplier') {
    // 供应商
    uni.reLaunch({
      url: '/pages/SupplierCenter/SupplierTabbar',
    })
  } else if (userInfo.roleCode === 'agent') {
    // 服务商
    uni.reLaunch({
      url: '/pages/AgentCenter/AgentTabbar',
    })
  } else if (userInfo.roleCode === 'garage') {
    //汽修厂
    uni.reLaunch({
      url: '/pages/GarageCenter/GarageCenter',
    })
  } else if (userInfo.roleCode === 'investmentManager') {
    // 招商经理
    uni.reLaunch({
      url: '/pages/LeaseCenter/LeaseTabbar',
    })
  } else if (userInfo.roleCode === 'channelManager') {
    // 渠道经理
    uni.reLaunch({
      url: '/pages/ChannelCenter/ChannelTabbar',
    })
  } else if (userInfo.roleCode === 'oldMachine') {
    // 旧机买家
    uni.reLaunch({
      url: '/pages/OldBuyerCenter/OldBuyerTabbar',
    })
  } else if (userInfo.roleCode === 'skilledWorker') {
    // 技术工
    uni.reLaunch({
      url: '/pages/EngineerCenter/EngineerTabbar',
    })
  } else if (userInfo.roleCode === 'recycling') {
    // 回收公司
    uni.reLaunch({
      url: '/pages/RecoveryCenter/RecoveryTabbar',
    })
  }
}

/**
 * 加法
 * @param x
 * @param y
 * @returns {*}
 */
export const decimalAddFn = (x, y) => {
  return vocenApi.Decimal.add(x, y).toNumber()
}
/**
 * 减法
 * @param x
 * @param y
 * @returns {*}
 */
export const decimalSubFn = (x, y) => {
  return vocenApi.Decimal.sub(x, y).toNumber()
}
/**
 * 乘法
 * @param x
 * @param y
 * @returns {*}
 */
export const decimalMulFn = (x, y) => {
  return vocenApi.Decimal.mul(x, y).toNumber()
}
/**
 * 除法
 * @param x
 * @param y
 * @returns {*}
 */
export const decimalDivFn = (x, y) => {
  return vocenApi.Decimal.div(x, y).toNumber()
}
/**
 * 格式化方法
 * @param value: String 传入的值
 * @param type: String 类型：int正整数；money：小数点两位金额
 * @param length: Number 类型：最大数值长度
 * @returns {string|number|*} 格式化后的值
 * @example let val = formatterHandle('123.3', 'money')
 */
export const formatterHandle = (value, type, length, canZero = false) => {
  const numberTypeList = ['int', 'money']
  console.log(value)
  if (value) {
    if (numberTypeList.indexOf(type) != -1) {
      console.log(value)
      // 格式化，只保留输入框中的纯数字
      let val = value.toString().replace(/[^\d^\.]+/g, '')
      if (+val < 0) {
        return 0
      }
      if (canZero) {
        if (+val === 0) {
          return 0
        }
      }
      if (type === 'money') {
        console.log(13)
        let checked = ''
        if (val.indexOf('.') !== -1) {
          checked = parseInt(val)
        } else {
          checked = val
        }
        console.log(checked)
        if (length) {
          if ((checked + '').length >= +length) {
            val = val.substr(0, +length)
          }
        } else {
          if ((checked + '').length >= 7) {
            val = val.substr(0, 7)
          }
        }
        console.log(val)
        // 保留两位小数
        if (val.indexOf('.') > -1 && val.split('.')[1].length > 2) {
          val = Number(val).toFixed(2)
          return val
        }
        return val
      }
      if (type === 'int') {
        if (length) {
          if ((val + '').length >= +length) {
            val = val.replace(/\b(0+)/gi, '')
            return +val
          }
        } else {
          if ((val + '').length >= 19) {
            val = val.replace(/\b(0+)/gi, '')
            return +val
          }
        }
        val = val.replace(/\b(0+)/gi, '')
        console.log(val, 'xx')
        return parseInt(val) || 0
      }
    }
  }
}

/**
 * 和当前时间对比
 * @param value: time 传入的值 需要对比的时间
 */
export const compareTime = (time) => {
  let newData = new Date().getTime()
  let date = new Date(time).getTime()

  if (newData > date) {
    return true
  } else {
    return false
  }
}
/**
 * 打开第三方导航  参数均为目的地参数
 * @param latitude    纬度
 * @param longitude   经度
 */
export const openGpsAppFn = (latitude, longitude,name='目的地') => {
  uni.openLocation({
    latitude: Number(latitude),
    longitude: Number(longitude),
    name: name
  })

}

/**
 * @description app跳转小程序
 */
export const goWechat = (path = '/pages/pay/pay') => {

  // let newPath=path
  // if(devConf.isPre){
  //   // 如果是预生产环境
  //   let url=path.split('?')[1]
  //
  //
  //   newPath='/pages/pay/pay?isPre=1&'+url
  //
  //
  // }

  plus.share.getServices(
    function (res) {
      var sweixin = null
      for (var i = 0; i < res.length; i++) {
        var t = res[i]
        if (t.id == 'weixin') {
          sweixin = t
        }
      }
      if (sweixin) {
        sweixin.launchMiniProgram({
          id: 'gh_c67fe9e13fbc',
          type: 0,
          path,
        })
      }
    },
    function (res) {
      console.log(JSON.stringify(res))
    },
  )
}

export const cellCustomerPhone=async (phone)=>{
  await VoHttp.apiExtraCustomerMoor().then((res) => {
    cellPhone(phone)
  }).catch(e=>{
    cellPhone(phone)
  })
}

/**
 * @description 跳转在线客服
 * @param type  1售前  2售后  3投诉客服
 */
export const goOnlineCustomerFn = async (type = 1) => {
  const userInfo = storage.get('userInfo')
  let url = ''

  let otherParams = {
    nickName: userInfo.userName,
    userId: userInfo.id,
  }
  // 跳转不同的客服
  if (+type === 1) {
    url =
      'https://ykf-webchat.7moor.com/wapchat.html?accessId=b3c770c0-ab23-11ec-8fcc-d9e18082232d&fromUrl=http://平台&urlTitle=平台&language=ZHCN'
    // otherParams.agent = 8000
    otherParams.peerId = '10055349'
    otherParams.accessId = 'b3c770c0-ab23-11ec-8fcc-d9e18082232d'
  } else if (+type === 2) {
    url =
      'https://ykf-webchat.7moor.com/wapchat.html?accessId=e663dc50-4932-11ed-9746-c593049817ab&fromUrl=http://售后&urlTitle=售后&language=ZHCN'
    // otherParams.agent = 8001
    otherParams.peerId = '10057414'
    otherParams.accessId = 'e663dc50-4932-11ed-9746-c593049817ab'
  } else {
    url =
      'https://ykf-webchat.7moor.com/wapchat.html?accessId=0c936760-4933-11ed-9746-c593049817ab&fromUrl=http://投诉客服&urlTitle=投诉客服&language=ZHCN'
    // otherParams.agent = 8002
    otherParams.peerId = '10057415'
    otherParams.accessId = '0c936760-4933-11ed-9746-c593049817ab'
  }

  // #ifndef APP-PLUS
 await VoHttp.apiExtraCustomerMoor().then((res) => {
   otherParams.userId = res.data
   url += '&clientId=' + userInfo.id + '&otherParams=' + JSON.stringify(otherParams)
   window.open(url, '_self')
 })
  // #endif


  // #ifdef APP-PLUS

  vocenService.voQimoStartLoading()
  await VoHttp.apiExtraCustomerMoor({},{noLoading:true}).then((res) => {
    otherParams.userId = res.data
    url += '&clientId=' + userInfo.id + '&otherParams=' + JSON.stringify(otherParams)
     goService(otherParams, type, userInfo.id)
  }).catch(e=>{
    vocenService.voQimoStopLoading()
  })
   // #endif

}

/**
 * 跳转七陌客服
 */
export const goService = async (data, type, userId) => {
  let param = {}
  param.userName = data.nickName
  param.userId = userId
  param.appkey = '6daa0830-37ed-11ed-86c7-95ddbe54e24a'
  param.peers = data.peerId
  // 跳转不同的客服
  if (+type === 1) {
    param.mobile = '400-893-5518'
  } else if (+type === 2) {
    param.mobile = '010-52534369'
  } else {
    param.mobile = '010-52534148'
  }
  vocenService.voQiMoServiceData(param)
}

//根据店铺id获取userId
export const getImUserId = ({ companyId }) => {
  console.log('companyId', companyId)
  return new Promise((resolve, reject) => {
    VoHttp.IM.apiMessageRecordCompanyChangeUser({
      companyId: companyId,
    })
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

// 下载远程路径图片
export const downloadImage = (link, picName) => {
  let img = new Image()
  img.setAttribute('crossOrigin', 'Anonymous')
  img.src = link
  img.onload = function () {
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0, img.width, img.height)
    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      let event = new MouseEvent('click')
      a.download = picName || 'default'
      a.href = url
      a.dispatchEvent(event)
      URL.revokeObjectURL(url)
    })
  }
}

//检查用户是否禁言
export const getUserCheckStatus = async () => {
  try {
    let res = await VoHttp.apiCreateQuestionsHomeCheckEnable({}, { noLoading: true })
    return res.data || false
  } catch (e) {
    return false
  }
}

//
/**
 * 转换第三方平台url
 * @param url 图片视频地址
 * @param type 类型
 * @returns {string|*}
 */
export const transferCosUrl = (url, type = 1) => {
  if (!url) return ''
  if (url.indexOf('/api/file/operations') > -1) {
    return url + `&type=${type}`
  } else {
    return url
  }
}

/**
 * @description 检测是否五分钟能否撤回
 * @param time 需要判断的时间
 */
export const isCanWithdrawFn = (time) => {
  const nowDate = Date.parse(String(new Date()))
  const createTime = Date.parse(String(time))
  if (nowDate - createTime > 300000) {
    return false
  }
  return true
}
/**
 * @description app识别车架号等等
 * @param apiUrl ocr识别路径
 * @param type  1 识别车架号  2识别发动集识别号  3  识别车架号和发动集识别号
 */
export const vocenCameraFn = (apiUrl, type = 3) => {
  return new Promise((resolve, reject) => {
    let param = {
      title: '将车架号、发动机识别号置于此区域',
      tipFirst: '通过扫码识别车架号，可以快速找到合适该车型的商品。',
      tipSecond: '扫码识别发动机识别码，可以快速找到发动机历史订单，极速进行售后。',
    }
    if (+type === 1) {
      param = {
        title: '将车架号置于此区域',
        tipFirst: '通过扫码识别车架号，可以快速找到合适该车型的商品。',
      }
    } else if (+type === 2) {
      param = {
        title: '将发动机识别号置于此区域',
        tipFirst: '扫码识别发动机识别码，可以快速找到发动机历史订单，极速进行售后。',
      }
    }

    vocenCamera.voCamera(param, (res) => {
      // sourceType  photo: 相册 camera:相机 handInput:手动输入
      if (res.data.sourceType === 'handInput') {
        vocenCamera.voCameraTip()

        // 为了兼容后面的接口判断
        let result = {
          type: 'handInput',
          data: JSON.stringify({
            data: {
              code: res.data.filePath,
              scanResultType: res.data.filePath.length === 17 ? 1 : 2,
            },
          }),
        }
        vocenCamera.voCameraHiddenTip()
        vocenCamera.voCameraBack()
        resolve(result)

        // 只需要判断17位就是商品  不用调用接口
        // VoHttp.apiBusinessVehicleScanGetgoodsbyvin({
        //   vin:res.data.filePath
        // }).then(res=>{
        //   vocenCamera.voCameraHiddenTip()
        //   vocenCamera.voCameraBack()
        //   let result={...res,type:'handInput',pro:res.data.filePath.length===17}
        //
        //   resolve(result)
        // }).catch(e=>{
        //   vocenCamera.voCameraHiddenTip()
        //   vocenCamera.voCameraBack()
        //   reject(e)
        // })
      } else {
        vocenCamera.voCameraTip()
        uploadOcr({ url: res.data.filePath, isPath: true, isTencentCloud: false, apiUrl })
          .then((res) => {
            vocenCamera.voCameraHiddenTip()
            vocenCamera.voCameraBack()
            let result = { ...res, type: 'scan' }
            resolve(result)
          })
          .catch((e) => {
            vocenCamera.voCameraHiddenTip()
            vocenCamera.voCameraBack()
            reject(e)
          })
      }
    })
  })
}

/**
 * @description app识别车架号等等
 * @param apiUrl ocr识别路径
 * @param type  1 识别车架号  2识别发动集识别号  3  识别车架号和发动集识别号
 */
export const vocenScanCodeFn = (countDown = 0) => {
  return new Promise((resolve, reject) => {
    vocenScanCode.voScanCodeStart({ countDown: String(countDown) }, function (res) {
      let dict = res
      if (dict.code === 200 || dict.code === 100) {
        // 为了兼容后面的接口判断
        let result = {
          ...res,
          vocenScanCode,
          type: 'scan',
        }
        resolve(result)
      } else {
        console.log('vin扫码失败')
        reject('识别失败')
      }
    })
  })
}
/**
 * @description app出库扫描
 * @param apiUrl ocr识别路径
 * @param type  1 识别车架号  2识别发动集识别号  3  识别车架号和发动集识别号
 * @param jumpType 1 服务商首页跳转进扫码页面
 */
export const vocenOutboundScanCodeFn = (countDown = 0,jumpType) => {
  return new Promise((resolve, reject) => {
    let param = {
      title: '将车架号、发动机识别号置于此区域',
      tipFirst: '通过扫码识别车架号，可以快速找到合适该车型的商品。',
      tipSecond: '扫码识别发动机识别码，可以快速找到发动机历史订单，极速进行售后。',
      jumpType:jumpType,
    }
    vocenScanCode.voOutboundScanCodeStart({ countDown: String(countDown),param }, function (res) {
      let dict = res
      if (dict.code === 200 || dict.code === 100) {
        // 为了兼容后面的接口判断
        let result = {
          ...res,
          vocenScanCode,
          type: 'scan',
        }
        resolve(result)
      } else {
        console.log('vin扫码失败')
        reject('识别失败')
      }
    })
  })
}
/**
 * @description app出库扫码信息
 */
export const vocenOutboundScanCodeMessageFn =  (param) => {
  return new Promise((resolve, reject) => {
    vocenScanCode.voOutboundScanCodeMessage({param}, function (res) {
      let dict = res
      if (dict.code === 200 || dict.code === 100) {
        let result = {
          ...res,
          vocenScanCode,
          type: 'scan',
        }
        resolve(result)
      } else {
        console.log('vin扫码失败')
        reject('识别失败')
      }
    })
  })
}
/**
 * @description app出库扫码持续返回信息
 */
export const vocenOutboundScanCodeKeepMessageFn =  (param) => {
  return new Promise((resolve, reject) => {
    vocenScanCode.voOutboundScanCodeKeepMessage({param}, function (res) {
      let dict = res
      if (dict.code === 200 || dict.code === 100) {
        let result = {
          ...res,
          vocenScanCode,
          type: 'scan',
        }
        resolve(result)
      } else {
        console.log('vin扫码失败')
        reject('识别失败')
      }
    })
  })
}

/**
 * 格式化价格保留两位小数
 * @param num 传入的数据
 * @returns String 格式化后的数据
 */
export const floatTwo = (num) => {
  if (num) {
    let aNum = String(num).split('.')
    if (aNum.length !== 2) {
      return num + '.00'
    } else {
      if (String(aNum[1]).length !== 2) {
        return num + '0'
      } else {
        return num
      }
    }
  }
  return 0
}

/**
 * im聊天获取店铺下的客服用户id
 * @param num 店铺companyId
 * @returns String 客服id
 */
export const getStoreImUserIdFn = ({companyId='',noLoading=false}) => {
  return new Promise((resolve,reject)=>{
      VoHttp.apiUserInfoCustomer$GET({
        id:companyId
      },{noLoading}).then(res=>{
          resolve(res.data)
      }).catch(e=>{
        reject(e)
      })
  })

}

// 导出
export default {
  openGpsAppFn,
  decimalAddFn,
  decimalSubFn,
  decimalMulFn,
  decimalDivFn,
  clearParamsUnalbeAttr,
  plainArray,
  findArrayIdx,
  getArrColumn,
  getObjectAttrNum,
  chooseVideoByPromise,
  chooseImageByPromise,
  getDomain,
  isWeiXin,
  checkIsLogin,
  buildSharePath,
  downLoadFile,
  saveImageToDisk,
  toast,
  error,
  modal,
  confirm,
  showLoading,
  hideLoading,
  openLocation,
  getLocation,
  getLocationForNvue,
  backFunc,
  linkToEasy,
  linkToWebView,
  cellPhone,
  appSource,
  urlencode,
  GetQueryByString,
  uploadFile,
  upload,
  regroupFileData,
  uploadOcr,
  chooseImageOcrByPromise,
  serveDomainFn,
  uploadMp3,
  formatterHandle,
  shareWeixin,
  compareTime,
  checkIsApproveFn,
  goOnlineCustomerFn,
  getImUserId,
  downloadImage,
  getUserCheckStatus,
  transferCosUrl,
  isCanWithdrawFn,
  goService,
  vocenCameraFn,
  vocenScanCodeFn,
  vocenOutboundScanCodeFn,
  vocenOutboundScanCodeMessageFn,
  vocenOutboundScanCodeKeepMessageFn,
  floatTwo,
  cellCustomerPhone,
  getStoreImUserIdFn
}
