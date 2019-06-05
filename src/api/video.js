import base from './base'
/**
 * 视频相关接口
 */
export default class video extends base {
  /**
   * 视频列表
   * @param {object} opts 参数
   * @param {string} opts.start 需要显示的页数
   * @param {string} opts.limits 某页数上显示多少条数据
   * @param {string} opts.orderBy 根据某条数据排序
   * @param {string} opts.search 根据关键字段的模糊查询
   */
  static list (opts) {
    return this.get(`api/video/listVideo`, opts)
  }
  /**
   * 视频详情
   * @param {object} opts 参数
   * @param {string} opts.id 详情id
   */
  static detail (opts) {
    return this.get(`api/video/getVideoById`, opts)
  }
  /**
   * 视频详情
   * @param {object} opts 参数
   * @param {string} opts.id 详情id
   */
  static listVideoPrint (opts) {
    return this.get(`api/video/listVideoPrint`, opts)
  }
  /**
   * 话题视频列表
   */
  static listVideoByTopicId (opts) {
    return this.get(`api/video/listVideoByTopicId`, opts)
  }
  /**
   * 视频分享
   */
  static updateShareVideo (opts) {
    return this.post(`api/share/updateShareVideo`, opts)
  }
  /**
   * 视频打印机商品
   */
  static getPrintByVideoId (opts) {
    return this.get(`/api/video/getPrintByVideoId`, opts)
  }
}