import base from './base'
/**
 * 打印机
 */
export default class printer extends base {
  /**
   * 打印机列表
   * @param {object} opts 参数
    id : 该项绑定打印机的字段id值
    manufacturerId : 绑定的打印机对应的厂商的id
    manufacturerName : 绑定的打印机对应的厂商的名称
    printerAlias : 对当前绑定的打印机设置的别名
    printerId : 当前绑定的打印机的id值
    printerSerialNumber : 当前绑定的打印机的序列号id值
    printerIpAddress : 打印机的ip地址
    printerPort : 打印机的端口
    printerTypeId : 打印机型号id
    printerTypeImage : 打印机型号图片
    printerTypeName : 打印机型号名称
    status : 打印机是否在线
   */
  static listModels (opts) {
    return this.get(`api/printer/listMyPrinters`, opts)
  }
  // 打印机详情
  static getMyPrinter (opts) {
    return this.get(`api/printer/getMyPrinter`, opts)
  }
  // 用于绑定前根据扫二维码拿到的序列号查询打印机品牌信息
  static getPrinterBrand (opts) {
    return this.get(`api/printer/getPrinterBrand`, opts)
  }
  // 绑定打印机
  static bindPrinter (opts) {
    return this.post(`api/printer/bindPrinter`, opts)
  }
  // 控制打印机暂停/继续/取消/重新开始打印
  static controlPrinterWork (opts) {
    return this.post(`api/printer/controlPrinterWork`, opts)
  }
  // 调试打印机喷头和热床的移动
  static debugPrinterXyzMove (opts) {
    return this.post(`api/printer/debugPrinterXyzMove`, opts)
  }
  // 调试打印机喷头和热床温度
  static debugPrinterBedTemperature (opts) {
    return this.post(`api/printer/debugPrinterBedTemperature`, opts)
  }
  // 获取打印机打印模式
  static getPrintModeDetail (opts) {
    return this.get(`api/printerSlice/getPrintModeDetail`, opts)
  }
  // 调试打印机喷头
  static debugPrinterTool (opts) {
    return this.post(`api/printer/debugPrinterTool`, opts)
  }
  // 解绑打印机
  static unbindPrinter (opts) {
    return this.post(`api/printer/unbindPrinter`, opts)
  }
  // 打印机队列
  static listMyQueues (opts) {
    return this.get(`api/printerQueue/listMyQueues`, opts)
  }
  // 加入打印机队列
  static pushQueue (opts) {
    return this.post(`api/printerQueue/pushQueue`, opts)
  }
  // 设置打印机模式
  static choosePrinter (opts) {
    return this.post(`api/printerSlice/choosePrinter`, opts)
  }
  // 设置打印模式
  static choosePrintMode (opts) {
    return this.post(`api/printerSlice/choosePrintMode`, opts)
  }
  // 获取打印模式
  static getPrintMode (opts) {
    return this.get(`api/printerSlice/getPrintMode`, opts)
  }
  // 队列-选择打印机
  static chooseQueuePrinter (opts) {
    return this.post(`api/printerQueue/choosePrinter`, opts)
  }
  // 删除队列
  static deleteQueue (opts) {
    return this.get(`api/printerQueue/deleteQueue`, opts)
  }
  // 切片打印
  static slice (opts) {
    return this.post(`api/printerSlice/slice`, opts)
  }
  // 切片进度
  static getSliceSchedule (opts) {
    return this.get(`api/printerSlice/getSliceSchedule`, opts)
  }
  // 打印机设备
  static getPrintSpu (opts) {
    return this.get(`/api/spu/getPrintSpu`, opts)
  }
  // 打印机设备
  static getCountQueue (opts) {
    return this.get(`/api/printerQueue/countQueue`, opts)
  }
}