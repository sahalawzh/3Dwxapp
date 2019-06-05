/**
 * 判断是否为空(Object, Array, String)
 * @param {String | Object | Array} val
 * @return {Boolean} 是否为空
 */
import isArray from './isArray'

function judgeObj (obj) {
  try {
    for (let key in obj) {
      return false
    }
    return true
  } catch (e) {
    return false
  }
}
export default function isEmpty (val) {
  if (typeof val === 'object' && val !== null) {
    // 是否是数组
    if (isArray(val)) {
      return val.length === 0
    }
    if (typeof Object.keys === 'function') {
      return Object.keys(val).length === 0
    }
    if (typeof JSON.stringify === 'function') {
      return JSON.stringify(val) === '{}'
    }
    return judgeObj(val)
  }
  // 其他
  if (val === undefined || val === null || val === '') {
    return true
  }
  return false
}
