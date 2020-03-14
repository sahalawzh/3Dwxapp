import base from './base'
/**
 * 公共api
 */
export default class common extends base {
  /**
   * 删除图片
   */
  static deleteImg (opts) {
    return this.post(`api/file/delete`, opts)
  }
}
