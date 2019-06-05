function getNumber (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
function getFormatDate (o, seperator = '/') {
  const date = new Date(o)
  let dateTime = date.getFullYear() + seperator + getNumber(Number(date.getMonth() + 1)) + seperator + getNumber(date.getDate())
  return dateTime
}
function getNowFormatDate () {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}
function getFormatTime (time) {
  let date = new Date(time.replace(/-/g, '/'))
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let setdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes()
  return setdate
}
function getTime (time) {
  let newtime = new Date(getNowFormatDate().replace(/-/g, '/'))
  let oldtime = new Date(time.replace(/-/g, '/'))
  let s1 = newtime.getTime()
  let s2 = oldtime.getTime()
  let total = (s2 - s1) / 1000
  let day = parseInt(total / (24 * 60 * 60))
  let afterDay = total - day * 24 * 60 * 60
  let hour = parseInt(afterDay / (60 * 60))
  let afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60
  let min = parseInt(afterHour / 60)
  let afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60
  if (total < 0) {
    return false
  } else {
    return getNumber(min) + ':' + getNumber(afterMin)
  }
}
function getMin (time) {
  let newtime = new Date(getNowFormatDate().replace(/-/g, '/'))
  let oldtime = new Date(time.replace(/-/g, '/'))
  let s1 = newtime.getTime()
  let s2 = oldtime.getTime()
  let total = s2 - s1
  let tenMin = 60 * 10 * 1000
  // 判断订阅当前时间-开始时间>10分钟
  if (total > tenMin) {
    return true
  } else {
    return false
  }
}
function getTimeTrue (time) {
  let newtime = new Date(getNowFormatDate().replace(/-/g, '/'))
  let oldtime = new Date(time.replace(/-/g, '/'))
  let s1 = newtime.getTime()
  let s2 = oldtime.getTime()
  let total = s2 - s1
  // 判断订阅当前时间-开始时间>10分钟
  if (total > 0) {
    return true
  } else {
    return false
  }
}
function parseQueryString (url) {
  let regUrl = /^[^?]+\?([\w\W]+)$/
  let regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  let arrUrl = regUrl.exec(url)
  let ret = {}
  if (arrUrl && arrUrl[1]) {
    let strPara = arrUrl[1]
    let result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

module.exports = {
  getNowFormatDate: getNowFormatDate,
  getFormatDate: getFormatDate,
  getFormatTime: getFormatTime,
  getTime: getTime,
  getNumber: getNumber,
  getMin: getMin,
  parseQueryString: parseQueryString,
  getTimeTrue: getTimeTrue
}
