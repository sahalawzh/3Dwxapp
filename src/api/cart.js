import base from './base'
/**
 * 购物车
 */
export default class cart extends base {
  /**
   * 添加购物车
   * @param {object} opts 参数
   */
  static addToCart (opts) {
    return this.post(`api/cart/AddToCart`, opts)
  }
  /**
   * 购物车列表
   * @param {object} opts 参数
   */
  static cartList (opts) {
    return this.get(`api/cart/listCart`, opts)
  }
  /**
   * 购物车数量
   * @param {object} opts 参数
   */
  static cartNum (opts) {
    return this.get(`api/cart/countCartNum`, opts)
  }
  /**
   * 购物车计算金额
   * @param {object} opts 参数
   */
  static countPrice (opts) {
    return this.get(`api/cart/countPrice`, opts)
  }
  /**
   * 删除购物车
   * @param {object} opts 参数
   */
  static removeCart (opts) {
    return this.get(`api/cart/deleteCart`, opts)
  }
  /**
   * 修改购物车数量
   * @param {object} opts 参数
   */
  static updateCartNum (opts) {
    return this.get(`api/cart/updateCartNum`, opts)
  }
  /**
   * 修改购物车规格
   * @param {object} opts 参数
   */
  static updateSku (opts) {
    return this.get(`api/cart/updateSku`, opts)
  }
}