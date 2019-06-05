import base from './base'
/**
 * 评论
 */
export default class user extends base {
  /**
   * 用户信息
   */
  static updateNickname (opts) {
    return this.get(`api/user/updateNickname`, opts)
  }
}