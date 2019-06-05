import base from './base'
/**
 * 地址相关接口
 */
export default class address extends base {
  /**
   * 获取地址列表
   */
  static getAddress (opts) {
    return this.get(`api/address/getAddress`, opts)
  }
  /**
   * 删除地址接口
   */
  static deleteAddress (opts) {
    return this.get(`api/address/deleteAddress`, opts)
  }
  /**
   * 添加地址接口
   */
  static addAddress (opts) {
    return this.post(`api/address/addAddress`, opts)
  }
  /**
   * 修改地址接口
   */
  static updateAddress (opts) {
    return this.post(`api/address/updateAddress`, opts)
  }
  /**
   * 获取省
   */
  static getProvince (opts) {
    return this.get(`api/address/getProvince`, opts)
  }
  /**
   * 获取市
   */
  static getCity (opts) {
    return this.get(`api/address/getCity`, opts)
  }
  /**
   * 获取区
   */
  static getArea (opts) {
    return this.get(`api/address/getArea`, opts)
  }
}