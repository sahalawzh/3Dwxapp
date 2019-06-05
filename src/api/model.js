import base from './base'
/**
 * 模型
 */
export default class printer extends base {
  /**
   * 模型列表
   * @param {object} opts 参数
   */
  static listModelTypes (opts) {
    return this.get(`api/model/listModelTypes`, opts)
  }
  /**
   * 模型
   * @param {object} opts 参数
   */
  static listModels (opts) {
    return this.get(`api/model/listModels`, opts)
  }
  /**
   * 模型细览
   * @param {object} opts 参数
   */
  static getModel (opts) {
    return this.get(`api/model/getModel`, opts)
  }
}