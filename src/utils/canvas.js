
import {strlen, cutstr} from './strLength'
let staticUrl = '../../images'
import wepy from 'wepy'
import Modal from '../packages/modal/modal'
let isIOS = wepy.$instance.globalData.platform !== 'android' || wepy.$instance.globalData.platform === 'devtools'
// 文字竖排方法
/**
* @author zhangxinxu(.com)
* @licence MIT
* @description http://www.zhangxinxu.com/wordpress/?p=7362
*/
let fillTextVertical = function (ctx, text, x, y) {
  var context = ctx
  var arrText = text.split('')
  var arrWidth = arrText.map(function (letter) {
    return context.measureText(letter).width
  })
  var align = context.textAlign
  var baseline = context.textBaseline
  if (align === 'left') {
    x = x + Math.max.apply(null, arrWidth) / 2
  } else if (align === 'right') {
    x = x - Math.max.apply(null, arrWidth) / 2
  }
  if (baseline === 'bottom' || baseline === 'alphabetic' || baseline === 'ideographic') {
    y = y - arrWidth[0] / 2
  } else if (baseline === 'top' || baseline === 'hanging') {
    y = y + arrWidth[0] / 2
  }
  context.setTextAlign('center')
  context.setTextBaseline('middle')
  // 开始逐字绘制
  arrText.forEach(function (letter, index) {
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index]
    // 是否需要旋转判断
    var code = letter.charCodeAt(0)
    if (code <= 256 && arrText[index + 1] && arrText[index + 1].charCodeAt(0) <= 256 && arrText[index + 1].charCodeAt(0) !== 32 || code <= 256 && arrText[index - 1] && arrText[index - 1].charCodeAt(0) <= 256 && arrText[index - 1].charCodeAt(0) !== 32) {
      context.translate(x, y)
      // 英文字符，旋转90°
      context.rotate(90 * Math.PI / 180)
      context.translate(-x, -y)
    } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
      // y修正
      y = y + arrWidth[index - 1] / 2
    }
    context.fillText(letter, x, y)
    // 旋转坐标系还原成初始态
    context.setTransform(1, 0, 0, 1, 0, 0)
    y = y + letterWidth
  })
  // 水平垂直对齐方式还原
  context.setTextAlign(align)
  context.setTextBaseline(baseline)
}
// 文字自动换行方法
let wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
  if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
    return
  }
  var context = ctx
  var canvas = context.canvas
  if (typeof maxWidth === 'undefined') {
    maxWidth = (canvas && canvas.width) || 300
  }
  if (typeof lineHeight === 'undefined') {
    lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight)
  }
  // 字符分隔为数组
  var arrText = text.split('')
  var line = ''
  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n]
    var metrics = context.measureText(testLine)
    var testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = arrText[n]
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}
// 异常情况
let catchFn = function (id, itemType) {
  wx.hideLoading()
  // Modal({
  //   selector: '#jfk-http-modal',
  //   title: '提示',
  //   content: '海报生成失败',
  //   type: 'alert',
  //   icon: 'error'
  // }).then(function () {
  //   wx.redirectTo({
  //     url: '/pages/detail/detail?pid=' + id + '&itemType=' + itemType
  //   })
  // })
}
export default function handleCanvasPoster (ctx, posterInfo, callback, miniCode) {
  const CURRENCYSYMBOL = '￥'
  ctx.clearRect(0, 0, 750, 720)
  // 预加载图片
  let mulitImg = []
  // 默认模版
  ctx.setFillStyle('#ffffff')
  ctx.fillRect(0, 0, 750, 720)
  if (!isIOS) ctx.draw()
  let productName = posterInfo.title
  let addHeight = 0
  if (strlen(productName) > 30) {
    addHeight = 50
  }
  let productimg = {}
  mulitImg.push(posterInfo.picture, miniCode)
  let promiseAll = []
  let drwaProduct = function (imgsrc) {
    if (productimg.width === productimg.height) {
      ctx.drawImage(imgsrc, 0, 0, 750, productimg.height * 2)
      if (!isIOS) ctx.draw(true)
    } else if (productimg.width > productimg.height) {
      let x
      if (productimg.height < 750 - 110) {
        let times = (750 - 110) / productimg.height
        x = (((productimg.width * times - (750 - 110)) / 2) / (productimg.width * times)) * productimg.width
      } else {
        let times = productimg.height / (750 - 110)
        x = ((((productimg.width / times) - (750 - 110)) / 2) / (productimg.width / times)) * productimg.width
      }
      if (!isIOS && productimg.width / productimg.height >= 2) {
        ctx.drawImage(imgsrc, 0.9 * x, 0, productimg.width - 1.8 * x, productimg.height, 55, 200, 750 - 110, 750 - 110)
      } else {
        ctx.drawImage(imgsrc, x, 0, productimg.width - 2 * x, productimg.height, 55, 200, 750 - 110, 750 - 110)
      }
      if (!isIOS) ctx.draw(true)
    } else {
      let y
      if (productimg.width < 750 - 110) {
        let times = (750 - 110) / productimg.width
        y = (((productimg.height * times - (750 - 110)) / 2) / (productimg.height * times)) * productimg.height
      } else {
        let times = productimg.width / (750 - 110)
        y = ((((productimg.height / times) - (750 - 110)) / 2) / (productimg.height / times)) * productimg.height
      }
      ctx.drawImage(imgsrc, 0, y, productimg.width, productimg.height - 2 * y, 55, 200, 750 - 110, 750 - 110)
      if (!isIOS) ctx.draw(true)
    }
  }
  for (let i = 0; i < mulitImg.length; i++) {
    promiseAll[i] = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: mulitImg[i],
        success: function (res) {
          console.log('img_success', i)
          if (i === 0) {
            productimg.width = res.width
            productimg.height = res.height
            drwaProduct(res.path)
          } else if (i === 1) {
            ctx.drawImage(res.path, 500, productimg.height * 2 + 60, 150, 150)
            if (!isIOS) ctx.draw(true)
          }
          if (!isIOS) {
            setTimeout(function () {
              resolve(mulitImg[i])
            }, 100)
          } else {
            resolve(mulitImg[i])
          }
        },
        fail: function (err) {
          console.log('img_fail', i)
          reject(err)
        }
      })
    })
  }
  Promise.all(promiseAll).then((success) => {
    ctx.font = '36px Arial'
    ctx.setFillStyle('#3c3c3c')
    ctx.setTextBaseline('top')
    if (strlen(productName) > 30) {
      if (strlen(productName) > 57) {
        productName = cutstr(productName, 57) + '...'
      }
      ctx.setTextAlign('left')
      wrapText(ctx, productName, 60, 600, 750 - 180, 45)
      if (!isIOS) ctx.draw(true)
    } else {
      ctx.setTextAlign('left')
      ctx.fillText(productName, 60, 500)
      if (!isIOS) ctx.draw(true)
    }
    ctx.font = '36px  Arial'
    ctx.setTextAlign('right')
    ctx.setFillStyle('red')
    let priceWidth = ctx.measureText(CURRENCYSYMBOL + posterInfo.price).width
    ctx.fillText(CURRENCYSYMBOL + posterInfo.price, priceWidth + 30, 600)
    if (!isIOS) ctx.draw(true)
    if (!isIOS) {
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750,
          height: 720,
          destWidth: 750,
          destHeight: 720,
          canvasId: 'posterCanvas',
          success: function(res) {
            callback(res.tempFilePath)
          }
        })
      }, 800)
    } else {
      ctx.draw(false, function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750,
          height: 720,
          destWidth: 750,
          destHeight: 720,
          canvasId: 'posterCanvas',
          success: function(res) {
            callback(res.tempFilePath)
          }
        })
      })
    }
  }).catch((err) => {
    catchFn(posterInfo.id, posterInfo.good_type)
  })
}
