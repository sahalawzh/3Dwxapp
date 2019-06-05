import base from './base'
/**
 * 广告
 */
export default class advertisement extends base {
  /**
   * 广告
   */
  static queryAdvertisements (opts) {
    return this.get(`api/marketing/listMarketing`, opts)
  }
}