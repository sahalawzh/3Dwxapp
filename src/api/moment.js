import base from './base'
/**
 * 活动相关
 */
export default class moment extends base {
  /**
   * @param forumCommentId 话题评论id
   * @param forumId 话题id
   */
  static insertForumCommentMoment (opts) {
    return this.post(`api/moment/insertForumCommentMoment`, opts)
  }
}