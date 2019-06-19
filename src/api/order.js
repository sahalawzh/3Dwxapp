import base from './base'
/**
 * 订单相关接口
 */
export default class order extends base {
  /**
   * 获取订单详情
   */
  static getOrder (opts) {
    return this.get(`api/order/getOrder`, opts)
  }
  /**
   * 提交订单
   * @param {object} opts 参数
   */
  static wxInsertOrder (opts) {
    return this.post(`/api/order/wxInsertOrder`, opts)
  }
  /**
   * 订单列表
   * @param {object} opts 参数
   */
  static listOrder (opts) {
    return this.get(`api/order/listOrder`, opts)
  }
  /**
   * 支付成功
   * @param {object} opts 参数
   */
  static getPayMsg (opts) {
    return this.get(`api/order/getPayMsg`, opts)
  }
  /**
   * 订单详情
   * @param {object} opts 参数
   */
  static wxAppletsPay (opts) {
    return this.post(`api/order/wxAppletsPay`, opts)
  }
  /**
   * 取消订单
   * @param {object} opts 参数
   */
  static updateOrderByCancel (opts) {
    return this.get(`api/order/updateOrderByCancel`, opts)
  }
  /**
   * 确认订单
   * @param {object} opts 参数
   */
  static updateOrderByConfirm (opts) {
    return this.get(`api/order/updateOrderByConfirm`, opts)
  }
  /**
   * 物流信息
   * @param {object} opts 参数
   */
  static getLogisticsMessage (opts) {
    return this.get(`api/logistics/getLogisticsMessage`, opts)
  }
  /**
   * 物流信息
   * @param {object} opts 参数
   */
  static deleteOrder (opts) {
    return this.get(`api/order/deleteOrder`, opts)
  }
}
