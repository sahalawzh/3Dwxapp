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
    userId: wepy.$instance.globalData.userId || '',
    authType: '',
    userInfo: wepy.$instance.globalData.userInfo || '',
    target: '',
    id: ''
  }
  async getCartNum () { // 获取购物车数量
    const { data } = await cartApis.cartNum({userId: this.userId})
    this.cartNum = data.num
    this.$apply()
  }
  onLoad () {
  }
  onShow () {
    const userId = wepy.$instance.globalData.userId
    this.userId = userId
    if (this.userId) {
      this.getCartNum()
    }
  }
  async login () {
    const { encryptedData, iv, url, authType, id } = this
    const config = {
      encryptedData,
      iv
    }
    await http.authLogin(config, { url, authType, id })
    this.isCreateClick = false
  }
  async getUserInfo () {
    try {
      const { userId, userInfo, target } = this
      const opts = {
        userId: userId || wepy.$instance.globalData.userId,
        nickname: userInfo.nickName,
        smallAvator: userInfo.avatarUrl
      }
      await userApis.updateNickname(opts)
      if (target) {
        // this.$emit('handleSendInfo')
        wepy.$instance.globalData.subpub.emit(target)
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
        const { url, type, id } = e.target.dataset
        this.url = url
        this.authType = type
        this.encryptedData = encryptedData
        this.id = id
        this.iv = iv
        this.login()
      }
    }
  }
}
