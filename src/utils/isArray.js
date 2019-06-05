/**
 * 判断是否是个数组
 * @param {String | Number | Object | Boolean} val 传入的参数
 * @return { Boolean } 是否为数组
 */
export default function isArray (val) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(val)
  } else {
    return Object.prototype.toString.call(val) === '[object Array]'
  }
}
