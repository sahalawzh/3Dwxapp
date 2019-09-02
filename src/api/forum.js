import base from './base'
/**
 * 论坛相关
 */
export default class forum extends base {
  /**
   * 热门列表
   */
  static listHotForum (opts) {
    return this.get(`api/forum/listHotForum`, opts)
  }
  /**
   * 热门详情
   */
  static getForumDetail (opts) {
    return this.get(`api/forum/getForumDetail`, opts)
  }
  /**
   * 关注列表
   */
  static listFollowForum (opts) {
    return this.get(`api/forum/listFollowForum`, opts)
  }
  /**
   * 是否关注isFollow 1 关注 0 没关注
   */
  static insertFollow (opts) {
    return this.post(`api/follow/insertFollow`, opts)
  }
  /**
   * 我的列表
   */
  static listMyForum (opts) {
    return this.get(`api/forum/listMyForum`, opts)
  }
  /**
   * 发布论坛
   * {
    "content": "string",
    "forumStatus": 0,
    "hiddenContent": "string",
    "hiddenType": 0,
    "title": "string"}
   */
  static insertForum (opts) {
    return this.post(`api/forum/insertForum`, opts)
  }
  /**
   * 删除草稿
   {
      "forumStatus": 0,
      "id": 10
    }
   */
  static removeTheDraft (opts) {
    return this.delete(`api/forum/removeTheDraft`, opts)
  }
}