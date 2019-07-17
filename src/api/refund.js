import base from './base'
/**
 * 退款
 */
export default class refund extends base {
  /**
   * 申请退款
   */
  static insertApply (opts) {
    return this.post(`api/refund/insertApply`, opts)
  }
  /**
   * 退款信息
   */
  static getRefund (opts) {
    return this.get(`api/refund/getRefund`, opts)
  }
}