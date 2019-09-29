import base from './base'
/**
 * 收藏
 */
export default class template extends base {
   /**
   * 用户收藏商品数量
   */
  static insertTemplateFormId (opts) {
    return this.post(`api/wxTemplate/insertTemplateFormId`, opts)
  }
}