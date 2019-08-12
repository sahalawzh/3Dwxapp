import base from './base'
/**
 * 活动相关
 */
export default class activity extends base {
  /**
   * 活动详情
   */
  static detail (opts) {
    return this.get(`api/activity/detail`, opts)
  }
  /**
   * 提交表单 
   */
  static submit (opts) {
    return this.post(`api/form/submit`, opts)
  }
  /**
   * 提交表单 
   */
  static listActivity (opts) {
    return this.get(`api/activity/listActivity`, opts)
  }
}