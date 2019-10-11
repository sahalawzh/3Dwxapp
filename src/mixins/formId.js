import wepy from 'wepy'
import templateApis from '../api/template'
export default class FormIdMixin extends wepy.mixin {
  data = {
    formId: ''
  }
  methods = {
    setFormId (e) {
      const { formId } = e.detail
      this.formId = formId
      console.log(this.formId)
    }
  }
  async getTemplateFormId () {
    const { formId } = this
    const param = {
      formId
    }
    templateApis.insertTemplateFormId(param, {
      REJECTERRORCONFIG: true
    }).then(function(res) {
      return Promise.resolve()
    })
  }
}