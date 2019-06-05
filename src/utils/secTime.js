/**
 * 倒计时实例，dates, hours, minutes, seconds如果未开始，是当前时间跟开始时间的值，如果已开始，是当前时间跟结束时间的值
 * @typedef {Object} killsecTimeInstance
 * @property {number} dates 天数
 * @property {number} hours 小时
 * @property {number} minutes 分钟
 * @property {number} seconds 秒数
 * @property {number} process 当前状态  0：结束 1：未开始 2:已开始
 * @property {Function} start 开始倒计时
 * @property {Function} close 结束倒计时
 */
let SECONDMILLSECONDS = 1000
let MINUTEMILLSECONDS = 60000
let HOURMILLSECONDS = 60 * MINUTEMILLSECONDS
let DATEMILLISECONDS = 24 * HOURMILLSECONDS
// 将一个毫秒转换成天时分秒
function millsecondsToDHMS (millseconds) {
  let dates = parseInt(millseconds / DATEMILLISECONDS)
  let _d = dates * DATEMILLISECONDS
  let hours = parseInt((millseconds - _d) / HOURMILLSECONDS)
  let _h = hours * HOURMILLSECONDS
  let minutes = parseInt((millseconds - _d - _h) / MINUTEMILLSECONDS)
  let seconds = parseInt((millseconds - _d - _h - minutes * MINUTEMILLSECONDS) / SECONDMILLSECONDS)
  return {
    dates,
    hours,
    minutes,
    seconds
  }
}
/**
 * Class 倒计时构造函数
 */
export default class KillsecTime {
  /**
   * 创建一个倒计时实例
   * @param  {Object} options 配置参数
   * @param  {Number} options.start 倒计时开始毫秒数
   * @param  {Number} options.end 倒计时结束毫秒数
   * @param  {Number} [options.rate=1000] 倒计时刷新频率
   * @param  {Boolean} [options.auto=true] 是否自动开始倒计时
   * @param {Boolean} [options.immediately=false] 是否立即执行一次比较，防止当前js线程执行其他操作
   * @param {Number} [options.countdown] 计时器参数
   * @param {Boolean} [options.timeGapValue = false] 本地时间与服务器时间差值
   * @param  {killsecTimeCallback} [options.callback] 倒计时回调函数
   * @return {killsecTimeInstance}         返回实例
   */
  constructor (options = {}) {
    this.options = options
    if (this.options.auto !== false) {
      this.start()
    }
    return this
  }

  _startInterval () {
    const { callback, start, end, timeGapValue = false } = this.options
    let now = Date.now()
    if (timeGapValue) {
      now += timeGapValue
    }
    let gap1 = now - start
    let gap2 = end - now
    if (gap1 < 0) {
      this.process = 1
      let dhms = millsecondsToDHMS(-gap1)
      this.dates = dhms.dates
      this.hours = dhms.hours
      this.minutes = dhms.minutes
      this.seconds = dhms.seconds
    } else if (gap2 > 0 || gap1 === 0) {
      this.process = 2
      let dhms = millsecondsToDHMS(gap2)
      this.dates = dhms.dates
      this.hours = dhms.hours
      this.minutes = dhms.minutes
      this.seconds = dhms.seconds
      if (gap1 > 0 && !this._hasStartTrigger) {
        this._hasStartTrigger = true
        this.status && callback && callback('has-start', now, this)
      } else if (gap1 === 0) {
        this.status && callback && callback('on-start', now, this)
      }
    } else {
      this.process = 0
      this.status && callback && callback(gap2 === 0 ? 'on-finish' : 'has-finish', now, this)
      this.close()
    }
    this.status && callback && callback('is-change', now, this)
  }

  _startCountdown () {
    const { callback, rate = 1000 } = this.options
    this.process = 2
    let c = this._countdown
    let dhms = millsecondsToDHMS(c)
    this.dates = dhms.dates
    this.hours = dhms.hours
    this.minutes = dhms.minutes
    this.seconds = dhms.seconds
    if (!this._hasStartTrigger) {
      this.status && callback && callback('on-start', c, this)
      this._hasStartTrigger = true
    }
    if (c <= 0) {
      this.process = 0
      this.status && callback && callback('on-finish', c, this)
      this.close()
    }
    this.status && callback && callback('is-change', c, this)
    c -= rate
    c = Math.max(0, c)
    this._countdown = c
  }

  /**
   * 开始倒计时
   * @param {Boolean} [force=false] 强制开启倒时器
   * @return {killsecTimeInstance} 实例
   */
  start(force) {
    let that = this
    if (!that._hasStarted || force) {
      that._hasStarted = true
      const { rate = 1000, countdown, immediately } = this.options
      force && that.close()
      this.status = 1
      if (countdown) {
        this._countdown = countdown
        if (immediately) {
          this._startCountdown()
        }
        that.interval = setInterval(function () {
          that._startCountdown()
        }, rate)
      } else {
        if (immediately) {
          this._startInterval()
        }
        that.interval = setInterval(function () {
          that._startInterval()
        }, rate)
      }
    }
    return this
  }
  /**
   * 关闭计时器
   * @return {Boolean} 关闭状态
   */
  close () {
    if (this.interval !== undefined) {
      clearInterval(this.interval)
      this.status = 0
      return true
    }
    return false
  }
}

/**
 * 倒计时回调函数
 * @callback killsecTimeCallback
 * @param {String} type 正在发生的事件类型 on-start: 开始 has-start: 已经开始 on-finish: 结束 has-finish: 已经结束 is-change: 倒计时正在进行
 * @param {Number} Number 当前时间的毫秒数
 * @param {killsecTimeInstance} ctx 当前倒计时实例对象,只读，不要修改属性
 */
