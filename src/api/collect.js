import base from './base'
/**
 * 收藏
 */
export default class collect extends base {
   /**
   * 用户收藏商品数量
   */
  static getSpuCollectionNum (opts) {
    return this.get(`api/collection/getSpuCollectionNum`, opts)
  }
  /**
   * 用户添加收藏商品
   */
  static insertSpuCollection (opts) {
    return this.post(`api/collection/insertSpuCollection`, opts)
  }
  /**
   * 用户收藏视频数量
   */
  static getVideoCollectionNum (opts) {
    return this.get(`api/collection/getVideoCollectionNum`, opts)
  }
  /**
   * 用户收藏视频
   */
  static addVideoCollection (opts) {
    return this.post(`api/collection/insertVideoCollection`, opts)
  }
  /**
   * 获取用户商品收藏
   */
  static getUserCommodityCollection (opts) {
    return this.get(`api/collection/listUserSpuCollection`, opts)
  }
  /**
   * 获取用户视频收藏
   */
  static getUserVideoCollection (opts) {
    return this.get(`api/collection/listUserVideoCollection`, opts)
  }
  /**
   * 批量取消商品收藏
   */
  static updateSpuCollection (opts) {
    return this.put(`api/collection/updateSpuCollection`, opts)
  }
  /**
   * 批量取消视频收藏
   */
  static updateVideoCollection (opts) {
    return this.put(`api/collection/updateVideoCollection`, opts)
  }
  /**
   * 商品是否收藏
   */
  static getTheSpuCollection (opts) {
    return this.get(`api/collection/getTheSpuCollection`, opts)
  }
  /**
   * 视频是否收藏
   */
  static getTheVideoCollection (opts) {
    return this.get(`api/collection/getTheVideoCollection`, opts)
  }
  /**
   * 话题收藏
   */
  static insertForumCollection (opts) {
    return this.post(`api/collection/insertForumCollection`, opts)
  }
  /**
   * 话题收藏集
   */
  static getUserForumCollection (opts) {
    return this.get(`api/collection/getUserForumCollection`, opts)
  }
  /**
   * 删除话题
   */
  static updateForumCollection (opts) {
    return this.put(`api/collection/updateForumCollection`, opts)
  }
}