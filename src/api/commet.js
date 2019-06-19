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
  /**
   * 上传图片
   * @param {object} opts 参数
   */
  static uploadImg (opts) {
    return this.post(`api/file/upload`, opts)
  }
  /**
   * 删除图片
   * @param {object} opts 参数
   */
  static deleteImg (opts) {
    return this.post(`api/file/delete`, opts)
  }
  /**
   * 获取商品评论
   * @param {object} opts 参数
   */
  static getSpuComment (opts) {
    return this.get(`api/comment/getSpuComment`, opts)
  }
}