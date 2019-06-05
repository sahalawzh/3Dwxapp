const strlen = (str, vertical) => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2
    } else {
      if (vertical) {
        if ((str.charCodeAt(i + 1) && str.charCodeAt(i + 1) > 127 || str.charCodeAt(i + 1) === 94) || (str.charCodeAt(i - 1) && str.charCodeAt(i - 1) > 127 || str.charCodeAt(i - 1) === 94)) {
          len += 2
        } else {
          len++
        }
      } else {
        len++
      }
    }
  }
  return len
}
const cutstr = (str, len, vertical) => {
  var strLen = 0
  var strlen = 0
  var strCut = ''
  strlen = str.length
  for (var i = 0; i < strlen; i++) {
    var a = str.charAt(i)
    strLen++
    if (escape(a).length > 4) {
      strLen++
    } else {
      if (vertical) {
        if (str.charAt(i + 1) && escape(str.charAt(i + 1)).length > 4 || str.charAt(i - 1) && escape(str.charAt(i - 1)).length > 4) {
          strLen++
        }
      }
    }
    strCut = strCut.concat(a)
    if (strLen >= len) {
      // strCut = strCut.concat('...')
      return strCut
    }
  }
  if (strLen < len) {
    return str
  }
}
export {strlen, cutstr}
