import base from './base';
/**
 * 评论
 */
export default class share extends base {
  /**
   * 生成分享海报
   */
  static createSharePoster(opts) {
    return this.post(`api/share/createSharePoster`, opts);
  }
}
