import base from './base'
/**
 * 收藏
 */
export default class suggestion extends base {
  /**
   * 用户收藏商品
   */
  static insertFeedBack (opts) {
    return this.post(`api/suggestion/insertFeedBack`, opts)
  }
  /**
   * 用户收藏商品
   */
  static getCustomerService (opts) {
    return this.get(`api/suggestion/getCustomerService`, opts)
  }
}