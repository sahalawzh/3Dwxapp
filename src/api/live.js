import base from './base'
/**
 * 直播
 */
export default class live extends base {
  /**
   * 直播列表
   */
  static liveRoomList (opts) {
    return this.get(`api/liveRoom//listRoom`, opts)
  }
  /**
   * 默认显示的直播间
   */
  static liveRoom (opts) {
    return this.get(`api/liveRoom/listRoom`, opts)
  }
  /**
   * 精彩推荐
   */
  static highlights (opts) {
    return this.get(`api/liveRoom/highlights`, opts)
  }
  /**
   * 根据type获取直播信息
   */
  static listRoomByType (opts) {
    return this.get(`api/liveRoom/listRoomByType`, opts)
  }
  /**
   * 进入直播间前调用的修改热度接口
   */
  static enterRoom (opts) {
    return this.get(`api/liveRoom/enterRoom`, opts)
  }
  /**
   * 进入历史直播间前调用的修改热度接口
   */
  static enterReplyRoom (opts) {
    return this.get(`api/liveRoom/enterReplyRoom`, opts)
  }
  /**
   * 获取type信息
   */
  static getLiveType (opts) {
    return this.get(`api/liveRoom/getLiveType`, opts)
  }
  /**
   * 获取首页直播当前状态
   */
  static getLiveStatus (opts) {
    return this.get(`api/liveRoom/getLiveStatus`, opts)
  }
  /**
   * 获取首页直播列表
   */
  static listLiveShow (opts) {
    return this.get(`api/liveRoom/listLiveShow`, opts)
  }
}
