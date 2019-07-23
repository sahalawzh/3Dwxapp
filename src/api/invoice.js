import base from './base'
/**
 * 发票相关
 */
export default class invoice extends base {
  /**
   * 新增发票
   */
  static wxInsertInvoice (opts) {
    return this.post(`api/invoice/wxInsertInvoice`, opts)
  }
  /**
   * 发送地址
   */
  static sendAttachmentMail (opts) {
    return this.get(`/api/mail/sendAttachmentMail`, opts)
  }
}