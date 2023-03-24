import Promisify  from '@/common/promisify'
/**
 * @name canvasTextAutoLine
 * @desc 面对残酷的现实，我选择自己写遍历整个字符串然后计算每个字的宽度，来搞定文字换行
 * @param {*} str
 * @param {*} ctx
 * @param {*} canvasWidth
 * @param {*} initX
 * @param {*} initY
 * @param {*} lineHeight
 */
function canvasTextAutoLine (str, ctx, canvasWidth, initX, initY, lineHeight) {
  // var ctx = ctx
  var lineWidth = 0
  // var canvasWidth = canvasWidth
  var lastSubStrIndex = 0
  var totalLineHeight = 0
  console.log(canvasWidth)
  for (let i = 0; i < str.length; i++) {
    lineWidth += 16 // 假定一个字是12px
    // canvasWidth-initX*6
    if (lineWidth > canvasWidth) { // 减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY)
      totalLineHeight += lineHeight
      initY += lineHeight
      lineWidth = 0
      lastSubStrIndex = i
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
    }
  }
  return totalLineHeight
}
function getLocalImage(url, toFail = true) {
  let defaultImg = require('@/static/logo.jpg')
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: url,
      success: async res => {
        // 20210918 app好像是不进fail了。。。就很难受
        // #ifdef APP-PLUS
        if (res.width === -1 || res.height === -1) {
          resolve(defaultImg)
          return
        }
        // #endif
        resolve(res.path)
      },
      fail: async e => {
        console.log('获取图片失败', e);
        if (toFail) {
          resolve(defaultImg)
        } else {
          resolve(false)
        }
      }
    });
  });
}
export const createCanvasFunc = async (thumb, qr, title, desc, price, type) => {
  try {
    console.log(thumb, title, desc, price)
    uni.showLoading()
    // 750 1125
    // bg 1125
    // fell 100
    // icon 129
    // icon
    // 750 1334
    var ctx = uni.createCanvasContext('myCanvas', this)
    // _self.setData({
    //   canvasShow: true
    // })
    // 绘制底部白色
    ctx.fillRect(0, 0, 750, 1200)
    ctx.setFillStyle('white')
    ctx.fill()
    // var typetext = '分享'
    // switch (type) {
    //   case 'goods':
    //     typetext = '特色产品'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 200, 550, 550)
    //     break
    //   case 'collection':
    //     typetext = '数字藏品'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 200, 550, 550)
    //     break
    //   case 'trans_collection':
    //     typetext = '转赠数字藏品'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 200, 550, 550)
    //     break
    //   case 'scene':
    //     typetext = '目的地推荐'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 250, 550, 350)
    //     break
    //   case 'hotel':
    //     typetext = '精品民宿'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 250, 550, 350)
    //     break
    //   case 'town':
    //     typetext = '旅游精品小镇'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 250, 550, 350)
    //     break
    //   case 'city':
    //     typetext = '旅游城市'
    //     // 缩略图
    //     ctx.drawImage(thumb, 100, 250, 550, 350)
    //     break
    //   default:
    //     break
    // }
    ctx.drawImage(thumb, 100, 200, 550, 550)

    // const logoTempPath = await downLoadFile('https://api.qingclouds.cn/static/logo.png')
    // 顶部的
    // ctx.drawImage(logoTempPath, 40, 40, 100, 100)
    // ctx.setFillStyle('black')
    // ctx.setFontSize(26)
    // ctx.fillText('青云智慧全域 * ' + typetext, 160, 100)
    // address icon
    // ctx.drawImage(_self.data.thumb, 0, 0, 414,207)
    // ctx.setFillStyle('#333333')
    // ctx.setFontSize(24)
    // ctx.fillText(_self.data.feel, 35, 1200)
    // ctx.setFillStyle('white')
    // ctx.drawImage('/images/icon/icon_address.png', 12, 173, 20, 20)
    // ctx.setFontSize(16)
    // ctx.setFillStyle('white')
    // ctx.fillText(_self.data.info.name, 35, 190)
    // // 介绍的文字内容 //除掉两边的12px之外，能写字的有380
    // ctx.setFontSize(14)
    // ctx.setFillStyle('#333333')
    // 最后还是要换行的来了
    var totalHeight = 0// canvasTextAutoLine(content, ctx, 464, 20, 750, 40)
    // ctx.drawImage('/images/end.png', 70, totalHeight + 235 + 60 + 20, 280, 8)
    // ctx.drawImage(qr, 55, totalHeight + 750 + 70, 200, 200)
    // ctx.fillText('我的我的我的我的我的我的我的我的'||title, 300, totalHeight+750+10)
    // var titleHeight = 0
    // if (title) {
    //   ctx.setFontSize(30)
    //   titleHeight = canvasTextAutoLine(cutstrFun(title, 20), ctx, 225, 280, totalHeight + 750 + 100, 45)
    // }
    // var descHeight = 0
    // desc = '范德萨发生大幅士大夫撒旦发生大发生大三分地是否师范生到范德萨发生大';
    // console.log(desc)
    // if (desc) {
    //   ctx.setFontSize(24)
    //   ctx.setFillStyle('#888888')
    //   descHeight = canvasTextAutoLine(cutstrFun(desc, 26), ctx, 250, 280, totalHeight + 750 + 100 + titleHeight + 40, 32)
    // }
    // if (price) {
    //   ctx.setFontSize(30)
    //   ctx.setFillStyle('red')
    //   ctx.fillText('￥' + price, 280, totalHeight + 750 + 100 + titleHeight + descHeight + 60 + 30)
    // }
    // descHeight = 100
    // ctx.setFontSize(26)
    // ctx.setFillStyle('#999')
    // if (type === 'collection') {
    //   ctx.fillText('—— 基于中移链 ——', 230, totalHeight + 750 + 100 + titleHeight + descHeight + 60 + 120)
    // } else if (type === 'trans_collection') {
    //   ctx.fillText('—— 扫码即领取 ——', 230, totalHeight + 750 + 100 + titleHeight + descHeight + 60 + 120)
    // } else {
    //   ctx.fillText('下载', 230, totalHeight + 750 + 100 + titleHeight + descHeight + 60 + 120)
    // }
    // await ctx.draw(false, function (res) {
    //   console.log('draw done')
    //   console.log(res);
    //   // resolve()
    // })
    await new Promise(resolve => {
      ctx.draw(false, function () {
        console.log('draw done')
        resolve()
      })
    })
    var width = 750
    var height = totalHeight + 750 + 50 + 60 + 200 + 60 + 100// 截取到这里
    const { tempFilePath } = await Promisify('canvasToTempFilePath', {
      canvasId: 'myCanvas',
      height
    })
    console.log(tempFilePath)
    // wx.previewImage({
    //   urls: [tempFilePath] // 需要预览的图片http链接列表
    // })
    uni.hideLoading()
    return tempFilePath
  } catch (e) {
    uni.hideLoading()
    console.log(e)
    return false
  }
}
