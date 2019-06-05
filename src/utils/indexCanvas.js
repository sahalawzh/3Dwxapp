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
  var indexArr = []
  var cutArr = []
  for (let n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n]
    var metrics = context.measureText(testLine)
    var testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      // context.fillText(line, x, y)
      indexArr.push(n)
      cutArr = arrText.slice(0, indexArr.join(''))
      cutArr.splice(cutArr.length - 1, 1, '...')
      line = cutArr.join('')
      // y += lineHeight
      console.log(line)
      context.fillText(line, x, y)
      return
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}
// 圆角矩形
// let roundRect = function (ctx, x, y, w, h, r) {
//   var minSize = Math.min(w, h)
//   if (r > minSize / 2) r = minSize / 2
//   // 开始绘制
//   ctx.beginPath()
//   ctx.moveTo(x + r, y)
//   ctx.arcTo(x + w, y, x + w, y + h, r)
//   ctx.arcTo(x + w, y + h, x, y + h, r)
//   ctx.arcTo(x, y + h, x, y, r)
//   ctx.arcTo(x, y, x + w, y, r)
//   ctx.closePath()
//   return ctx
// }

export default function handleCanvasIndexPoster (ctx, posterInfo, callback) {
  ctx.clearRect(0, 0, 750, 1334)
  // 预加载图片
  let mulitImg = []
  // 默认模版
  if (posterInfo.posterId === 'index') {
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, 750, 1334)
    if (!isIOS) ctx.draw()
    let productimg = {}
    mulitImg.push(posterInfo['qrcode'])
    let promiseAll = []
    let drwaProduct = function (imgsrc) {
      if (productimg.width === productimg.height) {
        ctx.drawImage(imgsrc, 110, 80, 522, 522)
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
      ctx.font = '42px  Arial'
      ctx.setFillStyle('#000000')
      ctx.setTextAlign('center')
      ctx.setTextBaseline('top')
      wrapText(ctx, posterInfo.title || '发现一家好去处，快来看看吧！', 750 / 2, 680, 700, 45)
      // ctx.fillText(posterInfo.title || '发现一家好去处，快来看看吧！', 750 / 2, 680, 700)
      if (!isIOS) ctx.draw(true)
      ctx.font = '36px Arial'
      ctx.setFillStyle('#bfbfbf')
      ctx.setTextAlign('center')
      ctx.setTextBaseline('top')
      ctx.fillText('长按识别小程序', 750 / 2, 770)
      if (!isIOS) ctx.draw(true)
      ctx.font = '36px  Arial'
      ctx.setFillStyle('#808080')
      ctx.setTextAlign('right')
      ctx.setTextBaseline('bottom')
      ctx.fillText(posterInfo.nickname ? posterInfo.nickname : '', 690, 920)
      if (!isIOS) ctx.draw(true)
      if (!isIOS) {
        setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1034,
            destWidth: 750,
            destHeight: 1034,
            canvasId: 'myCanvas',
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
            height: 1034,
            destWidth: 621,
            destHeight: 841,
            canvasId: 'myCanvas',
            success: function(res) {
              callback(res.tempFilePath)
            }
          })
        })
      }
    }).catch((err) => {
      wx.hideLoading()
      Modal({
        selector: '#jfk-http-modal',
        title: '提示',
        content: '海报生成失败',
        type: 'alert',
        icon: 'error'
      }).then(function () {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      })
    })
  }
}
