import base from './base'
/**
 * 相关配置
 */
export default class config extends base {
  /**
   * template（review：审核版，normal：正式版）
   */
  static version (opts) {
    return this.get(`common/version`, opts)
  }
}