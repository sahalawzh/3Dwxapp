import wepy from 'wepy'
import cartApis from '../api/cart'
import userApis from '../api/user'
import http from '../utils/http'
export default class CommonMixin extends wepy.mixin {
  data = {
    cartNum: '',
    encryptedData: '',
    iv: '',
    url: '',
    userId: '',
    authType: '',
    userInfo: '',
    target: ''
  }
  async getCartNum () { // 获取购物车数量
    const { data } = await cartApis.cartNum({userId: this.userId})
    this.cartNum = data.num
    this.$apply()
  }
  onLoad () {
  }
  onShow () {
    const userId = wx.getStorageSync('wow').userId
    this.userId = userId
    if (this.userId) {
      this.getCartNum()
    }
  }
  async login () {
    const { encryptedData, iv, url, authType } = this
    const config = {
      encryptedData,
      iv
    }
    await http.authLogin(config, { url, authType })
  }
  async getUserInfo () {
    try {
      const { userId, userInfo, target } = this
      const opts = {
        userId,
        nickname: userInfo.nickName,
        smallAvator: userInfo.avatarUrl
      }
      await userApis.updateNickname(opts)
      if (target === 'commet') {
        this.$emit('handleSendInfo')
      }
    } catch (error) {
      console.log(error)
    }
  }
  onHide () {
  }
  onUnload () {
  }
  methods = {
    onGotUserInfo (e) {
      const { errMsg, userInfo } = e.detail
      const { target } = e.currentTarget.dataset
      if (errMsg === 'getUserInfo:ok') {
        this.target = target
        wepy.$instance.globalData.userInfo = userInfo
        wepy.setStorageSync('userInfo', userInfo)
        this.userInfo = userInfo
        this.getUserInfo()
      }
    },
    getPhoneNumber (e) {
      const { errMsg, encryptedData, iv } = e.detail
      if (errMsg === 'getPhoneNumber:ok') {
        const { url, type } = e.target.dataset
        this.url = url
        this.authType = type
        this.encryptedData = encryptedData
        this.iv = iv
        this.login()
      }
    }
  }
}
