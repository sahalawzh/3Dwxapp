import base from './base';
/**
 * 收藏
 */
export default class template extends base {
  /**
   *
   */
  static insertTemplateFormId(opts) {
    return this.post(`api/wxTemplate/insertTemplateFormId`, opts);
  }
  /**
   * 获取模板idList
   */
  static getListTemplateId(opts) {
    return this.get(`api/wxTemplate/listTemplateId`, opts);
  }
  /**
   * 微信返回信息（订阅返回）
   */
  static insertTemplateMessage(opts, config) {
    return this.post(`api/wxTemplate/insertTemplateMessage`, opts, config);
  }
}
