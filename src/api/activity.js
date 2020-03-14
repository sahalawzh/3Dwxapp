import base from './base';
/**
 * 活动相关
 */
export default class activity extends base {
  /**
   * 活动详情
   */
  static detail(opts) {
    return this.get(`api/activity/detail`, opts);
  }
  /**
   * 提交表单
   */
  static submit(opts) {
    return this.post(`api/form/submit`, opts);
  }
  /**
   * 提交表单
   */
  static listActivity(opts) {
    return this.get(`api/activity/listActivity`, opts);
  }
  /**
   * 检查是否有提交
   * @param id 活动id
   * @param activityType 活动类型
   */
  static checkForm(opts) {
    return this.get(`api/activity/checkForm`, opts);
  }
  /**
   * 比赛添加
   */
  static postInsertCompetition(opts) {
    return this.post(`api/activityCompetition/insertCompetition`, opts);
  }
  /**
   * 比赛模板
   */
  static getActivityCompetitionData(opts) {
    return this.get(
      `api/activityCompetitionData/getActivityCompetitionData`,
      opts
    );
  }
  /**
   * 比赛list
   */
  static getListCompetition(opts) {
    return this.get(`api/activityCompetition/listCompetition`, opts);
  }
  /**
   * 比赛状态
   */
  static getCompetitionStatus(opts) {
    return this.get(`api/activityCompetition/getCompetitionStatus`, opts);
  }
  /**
   * 比赛自己信息
   */
  static getCompetition(opts) {
    return this.get(`api/activityCompetition/getCompetition`, opts);
  }
  /**
   * 比赛详情
   */
  static getCompetitionDetail(opts) {
    return this.get(`api/activityCompetition/getCompetitionDetail`, opts);
  }
  /**
   * 投票
   */
  static postCompetitionVote(opts) {
    return this.post(`api/activityCompetitionVote/competitionVote`, opts);
  }
  /**
   * 搜索作品
   */
  static getSearchCompetition(opts) {
    return this.get(`api/activityCompetition/searchCompetition`, opts);
  }
  /**
   * 编辑作品
   */
  static updateCompetition(opts) {
    return this.put(`api/activityCompetition/updateCompetition`, opts);
  }
  /**
   * 获取票数
   */
  static getVote(opts) {
    return this.get(`api/activityCompetition/getVote`, opts);
  }
}
