/* eslint-disable semi */
import base from './base';
/**
 * 评论
 */
export default class commet extends base {
  /**
   * 视频评论
   */
  static getVideoComment(opts) {
    return this.get(`api/comment/getVideoComment`, opts);
  }
  /**
   * 添加视频评论
   */
  static addVideoComment(opts) {
    return this.post(`api/comment/insertVideoComment`, opts);
  }
  /**
   * 商品评论
   * @param {object} opts 参数
   */
  static insertSpuComment(opts) {
    return this.post(`/api/comment/insertSpuComment`, opts);
  }
  /**
   * 上传图片
   * @param {object} opts 参数
   */
  static uploadImg(opts) {
    return this.post(`api/file/upload`, opts);
  }
  /**
   * 删除图片
   * @param {object} opts 参数
   */
  static deleteImg(opts) {
    return this.post(`api/file/delete`, opts);
  }
  /**
   * 获取商品评论
   * @param {object} opts 参数
   */
  static getSpuComment(opts) {
    return this.get(`api/comment/getSpuComment`, opts);
  }
  /**
   * 获取活动评论
   * @param {object} opts 参数
   */
  static getActivityComment(opts) {
    return this.get(`api/comment/getActivityComment`, opts);
  }
  /**
   * 添加活动评论
   * @param {object} opts 参数
   */
  static insertActivityComment(opts) {
    return this.post(`api/comment/insertActivityComment`, opts);
  }
  /**
   * 添加活动评论数量
   * @param {object} opts 参数
   */
  static getActivityCommentNum(opts) {
    return this.get(`api/comment/getActivityCommentNum`, opts);
  }
  /**
   * 获取我的红点
   */
  static getRedPoint(opts) {
    return this.get(`api/comment/getRedPoint`, opts);
  }
  /**
   * 我的回复
   */
  static getMyForumReply(opts) {
    return this.get(`api/comment/getMyForumReply`, opts);
  }
  /**
   * 话题评论
   */
  static getForumComment(opts) {
    return this.get(`api/comment/getForumComment`, opts);
  }
  /**
   * 话题评论
   {
      "commentType": 0,
      "content": "string",
      "forumId": 0,
      "imageIndex": "string",
      "isEnable": 0,
      "parentId": 0,
      "replyId": 0,
    }
   */
  static insertForumComment(opts) {
    return this.post(`api/comment/insertForumComment`, opts);
  }
  /**
   * {
      "forumCommentId": 1
    }
   */
  static insertForumCommentReport(opts) {
    return this.post(`api/comment/insertForumCommentReport`, opts);
  }
  /** 比赛评论 */
  static insertActivityCompetitionComment(opts) {
    return this.post(`api/comment/insertActivityCompetitionComment`, opts);
  }
  /** 比赛评论 */
  static getActivityCompetitionComment(opts) {
    return this.get(`api/comment/getActivityCompetitionComment`, opts);
  }
  /** 获取比赛评论数量 */
  static getActivityCompetitionCommentNum(opts) {
    return this.get(`api/comment/getActivityCompetitionCommentNum`, opts);
  }
}
