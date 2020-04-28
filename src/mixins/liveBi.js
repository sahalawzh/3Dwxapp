import wepy from 'wepy'
import liveApis from '../api/live'
export default class LiveBiMixin extends wepy.mixin {
  data = {
  }
  methods = {
    async handleClickLiveHot (id) {
      try {
        const opts = {
          id
        }
        await liveApis.enterRoom(opts, {
          REJECTERRORCONFIG: true
        })
        wx.navigateTo({
          url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${id}`
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  // async getTemplateFormId () {
  //   const { formId } = this
  //   const param = {
  //     formId
  //   }
  //   liveApis.insertTemplateFormId(param, {
  //     REJECTERRORCONFIG: true
  //   }).then(function(res) {
  //     return Promise.resolve()
  //   })
  // }
}
