import base from './base'
/**
 * 引导页
 */
export default class refund extends base {
  /**
   * 修改引导状态
   */
  static updateByPrintGuide (opts) {
    return this.put(`api/guide/updateByPrintGuide`, opts)
  }
  /**
   * 引导信息
   */
  static printGuide (opts) {
    return this.get(`api/guide/printGuide`, opts)
  }
}