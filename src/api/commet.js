import base from './base'
/**
 * 评论
 */
export default class commet extends base {
  /**
   * 视频评论
   */
  static getVideoComment (opts) {
    return this.get(`api/comment/getVideoComment`, opts)
  }
  /**
   * 添加视频评论
   */
  static addVideoComment (opts) {
    return this.post(`api/comment/insertVideoComment`, opts)
  }
  /**
   * 商品评论
   * @param {object} opts 参数
   */
  static insertSpuComment (opts) {
    return this.post(`/api/comment/insertSpuComment`, opts)
  }
  static insertSpuComment (opts) {
    return this.post(`api/file`, opts)
  }
}