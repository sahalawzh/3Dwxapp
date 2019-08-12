import base from './base'
/**
 * 商品相关接口
 */
export default class goods extends base {
  /**
   * 获取商品详情
   * @param {object} opts 参数
   * @param {string} opts.id 详情id
   */
  static getSpuById (opts) {
    return this.get(`api/spu/getSpuById`, opts)
  }
  /**
   * 搜索商品
   * @param {object} opts 参数
   * @param {string} opts.id 详情id
   */
  static queryShoppingByName (opts) {
    return this.get(`api/spu/listSpuVO`, opts)
  }
  /**
   * 相关商品
   * @param {object} opts 参数
   * @param {string} opts.id 详情id
   */
  static relatedProducts (opts, config) {
    return this.get(`api/spu/relatedSpu`, opts, config)
  }
  /**
   * 话题接口
   * @param {object} opts 参数
   */
  static queryTopic (opts) {
    return this.get(`api/topic/listTopic`, opts)
  }
  /**
   * 筛选
   * @param {object} opts 参数
   */
  static listSpuScreening (opts) {
    return this.post(`api/spu/listSpuScreening`, opts)
  }
  /**
   * 获取多规格
   * @param {object} opts 参数
   */
  static querySku (opts, config) {
    return this.get(`api/spu/getSku`, opts, config)
  }
  /**
   * 获取规格样板
   * @param {object} opts 参数
   */
  static querySpu (opts, config) {
    return this.get(`api/spu/getSpuDetail`, opts, config)
  }
  /**
   * 小编推荐
   * @param {object} opts 参数
   */
  static recommended (opts) {
    return this.get(`api/spu/listRecommended`, opts)
  }
  /**
   * 下单页面
   * @param {object} opts 参数
   */
  static settlement (opts) {
    return this.get(`api/cart/Settlement`, opts)
  }
  /**
   * 首页广告
   * @param {object} opts 参数
   */
  static queryAdvertisements (opts) {
    return this.get(`/api/advertisement/queryAdvertisements`, opts)
  }
  /**
   * 打印机商品
   * @param {object} opts 参数
   */
  static listPrintSpu (opts) {
    return this.get(`api/spu/listPrintSpu`, opts)
  }
  /**
   * 商品分享
   * @param {object} opts 参数
   */
  static updateShareSpu (opts) {
    return this.post(`/api/share/updateShareSpu`, opts)
  }
  /**
   * 商品搜索记录
   * @param {object} opts 参数
   */
  static getHistorySearch (opts) {
    return this.get(`api/spu/getHistorySearch`, opts)
  }
  /**
   * 热门搜索记录
   * @param {object} opts 参数
   */
  static getHeatSearch (opts) {
    return this.get(`api/spu/getHeatSearch`, opts)
  }
  /**
   * 删除搜索记录
   * @param {object} opts 参数
   */
  static removeAllHistorySearch (opts) {
    return this.get(`api/spu/removeAllHistorySearch`, opts)
  }
  /**
   * 打印列表勾选缺省
   * @param {object} opts 参数
   */
  static getPrint (opts) {
    return this.get(`/api/spu/getPrint`, opts)
  }
}