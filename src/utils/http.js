import wepy from 'wepy'
import wxutils from '../utils/wxutils'

export default class http {
  static waitSendQues = []
  static loginStatus = 0
  static async clearWaitSendQues () {
    console.log('clearWaitSendQues')
    const {waitSendQues} = this
    let que = null
    while ((que = waitSendQues.shift())) {
      const {method, url, data, config, resolve} = que
      const res = await this.request(method, url, data, config)
      resolve(res)
    }
  }
  
  static checkNeedLogin () {
    return !this.getConfig('Token')
  }

  static checkUrlIsLogin (url) {
    return url === this.getConfig('loginUrl')
  }

  static async authLogin (config, { url, authType }) {
    try {
      const {code} = await wepy.login()
      const data = {
        code,
        ...config
      }
      let d
      try {
        d = await this.get(`api/user/wxPhoneLogin`, data)
      } catch (e) {
        console.log(e)
      }
      const { token, userId, userDO } = d.data
      this.setConfig('Token', token)
      this.setConfig('userId', userId)
      this.setConfig('userDO', userDO)
      console.log('wowlogin complete', Date.now())
      wx.setStorage({
        key: 'wow',
        data: {
          token,
          userId,
          userDO
        }
      })
      if (url) {
        wxutils.backOrNavigate(url)
      } else {
        wepy.$instance.globalData.subpub.emit(authType, userId)
      }
    } catch (e) {
      console.log(e)
    }
    /* eslint-enable */
  }

  static getConfig (key) {
    return wepy.$instance.globalData[key]
  }

  static setConfig (key, val) {
    wepy.$instance.globalData[key] = val
  }

  static async addWaitSendQue (method, url, data, config) {
    let that = this
    return await new Promise(function (resolve, reject) {
      that.waitSendQues.push({
        method,
        url,
        data,
        config,
        resolve
      })
    })
  }

  static async waitSendAfterLogin (method, url, data, config) {
    if (this.loginStatus === 0) {
      await this.login(config)
      this.clearWaitSendQues()
      return await this.request(method, url, data, config)
    } else {
      return await this.addWaitSendQue(method, url, data, config)
    }
  }

  static async login (config) {
    if (this.loginStatus === 1) {
      console.log('当前正在登录，请不要重复登录')
      return
    }
    this.loginStatus = 1
    console.log('logining', Date.now())
    try {
      const {code} = await wepy.login()
      const data = {
        code
      }
      console.log('wxlogin complete', Date.now())
      try {
        await this.get(`${this.getConfig('loginUrl')}`, data)
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async request (method, url, data, config = {}) {
    if (this.checkUrlIsLogin(url)) {
      let res
      try {
        res = await wepy.request({
          method,
          url,
          data
        })
      } catch (e) {
        console.log(e)
        // this.requestNetworkFail(e, config)
      }
      if (this.isSuccess(res)) {
        return res.data
      } else {
        const error = this.requestException(res)
        throw error
      }
    } else {
      let res
      try {
        res = await wepy.request({
          method,
          url,
          data
        })
      } catch (e) {
        console.log(e)
        // this.requestNetworkFail(e, config)
      }
      if (this.isSuccess(res)) {
        return res.data
      } else {
        const error = this.requestException(res)
        wx.hideLoading()
        throw wx.showModal({
          title: '提示',
          showCancel: false,
          content: error.msg || '系统繁忙',
          success(res) {
            if (res.confirm) {
            }
          }
        })
      }
    }
  }
  /**
   * 判断请求是否成功
   */
  static isSuccess (res) {
    const wxCode = res.statusCode
    // 微信请求错误
    if (wxCode !== 200) {
      return false
    }
    const wxData = res.data && !res.data.code
    return wxData
  }
  /**
   * 请求结果异常
   */
  static requestException (res) {
    const error = {}
    error.statusCode = res.statusCode
    const wxData = res.data
    if (wxData) {
      const {msg, code} = wxData
      error.code = code
      error.msg = msg
    }
    return error
  }

  /**
   * 网络异常处理，无网络，请求超时
  */
  static requestNetworkFail (e, config) {
    if (!config.REJECT_REQUEST_FAIL) {
      wx.hideLoading() // 关闭可能存在的loading
      if (e) {
        let msg = e.errMsg
        if (msg && msg.indexOf('request:fail') === 0) {
          let pages = getCurrentPages()
          let len = pages.length
          let lastPage = pages[len - 1]
          wepy.$instance.globalData.networkFailConf = {
            url: lastPage.__route__,
            opts: lastPage.options,
            msg
          }
          wx.hideLoading() // 关闭可能存在的loading
          wx.redirectTo({
            url: '/pages/network/index'
          })
          e.REDIRECTED = true
          throw e
        }
      }
    }
    throw e
  }

  static get (url, data, config) {
    return this.request('GET', url, data, config)
  }

  static put (url, data, config) {
    return this.request('PUT', url, data, config)
  }

  static post (url, data, config) {
    return this.request('POST', url, data, config)
  }

  static patch (url, data, config) {
    return this.request('PATCH', url, data, config)
  }

  static delete (url, data, config) {
    return this.request('DELETE', url, data, config)
  }
}
