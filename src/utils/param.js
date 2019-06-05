const parseJson = function (param, key, encode) {
  if (typeof param === 'undefined' || param === null) return ''
  let paramStr = ''
  let t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += parseJson(param[i], k, encode)
    }
  }
  return paramStr
}

const getResult = function (param) {
  let result = parseJson(param)
  if (result.length > 0) {
    result = result.substr(1, result.length)
  }
  return result
}

export default getResult
