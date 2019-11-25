// "use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _theme_behaviors=require("./../package_help/theme_behaviors.js"),_theme_behaviors2=_interopRequireDefault(_theme_behaviors);exports.default=Component({behaviors:[_theme_behaviors2.default],properties:{value:{type:[Number,String],value:"",observer:function(e){var t=this.data,a=t.min,i=t.max,r=t.ivalue,s=t.trigger,u=+e;isNaN(u)||u<+a?(u=a,s=1):i&&!isNaN(+i)&&u>+i&&(u=i,s=2),u!==r&&(this.setData({ivalue:+u}),this.data.trigger=0,this.triggerEvent("changenumber",{value:u,trigger:s},{}))}},min:{type:[Number,String],value:0,observer:function(e,t){var a=this.data.ivalue;e>t&&e>a&&(this.data.trigger=1,this.setData({value:e}))}},max:{type:[Number,String],value:"",observer:function(e,t){this.data.ivalue>e&&(this.data.trigger=2,this.setData({value:e}))}},step:{type:[Number,String],value:1},disabled:{type:String,value:"false"},disableInput:{type:String,value:"false"},height:{type:String,value:"88rpx"},width:{type:String},isMin:{type:String,value:"true"}},attached:function(){var e=this.data,t=e.min,a=e.max,i=e.value;"false"!==e.isMin&&(i||(i=+t),+i<+t?i=t:a&&+i>+a&&(i=a),this.setData({ivalue:+i}))},data:{ivalue:1,mid:!1,mad:!1,tigger:0},methods:{stepChange:function(e){var t=this.data,a=t.disabled,i=t.step,r=t.ivalue;if("true"===a)return void this.triggerEvent("stepperDisableTap",{value:+r,trigger:3},{});this.data.trigger=0,this.setData({value:+r+(+i*e?1:-1)})},stepBlur:function(e){var t=e.detail.value;this.setData({value:t})},stepMinus:function(){var e=this.data,t=e.ivalue,a=e.min;if(+a>=+t)return void this.triggerEvent("stepperDisableTap",{value:+a,trigger:1},{});this.stepChange(!1)},stepPlus:function(){var e=this.data,t=e.ivalue,a=e.max;if(a&&+a<=+t)return void this.triggerEvent("stepperDisableTap",{value:+a,trigger:2},{});this.stepChange(!0)}}});
"use strict";

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var _theme_behaviors = require("./../package_help/theme_behaviors.js"),
    _theme_behaviors2 = _interopRequireDefault(_theme_behaviors);
exports.default = Component({
    behaviors: [_theme_behaviors2.default],
    properties: {
        value: {
            type: [Number, String],
            value: "",
            observer: function (e) {
                var t = this.data,
                    a = t.min,
                    i = t.max,
                    r = t.ivalue,
                    s = t.trigger,
                    u = +e;
                isNaN(u) || u < +a ? (u = a, s = 1) : i && !isNaN(+i) && u > +i && (u = i, s = 2), u !== r &&
                    (this.setData({
                        ivalue: +u
                    }), this.data.trigger = 0, this.triggerEvent("changenumber", {
                        value: u,
                        trigger: s
                    }, {}))
            }
        },
        min: {
            type: [Number, String],
            value: 0,
            observer: function (e, t) {
                var a = this.data.ivalue;
                e > t && e > a && (this.data.trigger = 1, this.setData({
                    value: e
                }))
            }
        },
        max: {
            type: [Number, String],
            value: "",
            observer: function (e, t) {
                this.data.ivalue > e && (this.data.trigger = 2, this.setData({
                    value: e
                }))
            }
        },
        step: {
            type: [Number, String],
            value: 1
        },
        disabled: {
            type: String,
            value: "false"
        },
        disableInput: {
            type: String,
            value: "false"
        },
        height: {
            type: String,
            value: "88rpx"
        },
        width: {
            type: String
        },
        isMin: {
            type: String,
            value: "true"
        }
    },
    attached: function () {
        var e = this.data,
            t = e.min,
            a = e.max,
            i = e.value;
        "false" !== e.isMin && (i || (i = +t), +i < +t ? i = t : a && +i > +a && (i = a), this.setData({
            ivalue: +i
        }))
    },
    data: {
        ivalue: 0,
        mid: !1,
        mad: !1,
        tigger: 0
    },
    methods: {
        bindManual: function (e) {
            var t = e.detail.value;
            this.setData({
                value: t
            })
        },
        stepChange: function (e) {
            var t = this.data,
                a = t.disabled,
                i = t.step,
                r = t.ivalue;
            if ("true" === a) return void this.triggerEvent("stepperDisableTap", {
                value: +r,
                trigger: 3
            }, {});
            this.data.trigger = 0, this.setData({
                value: +r + (+i * e ? 1 : -1)
            })
        },
        stepBlur: function (e) {
            var t = e.detail.value;
            this.setData({
                value: t
            })
        },
        stepMinus: function () {
            var e = this.data,
                t = e.ivalue,
                a = e.min;
            if (+a >= +t) return void this.triggerEvent("stepperDisableTap", {
                value: +a,
                trigger: 1
            }, {});
            this.stepChange(!1)
        },
        stepPlus: function () {
            var e = this.data,
                t = e.ivalue,
                a = e.max;
            if (a && +a <= +t) return void this.triggerEvent("stepperDisableTap", {
                value: +a,
                trigger: 2
            }, {});
            this.stepChange(!0)
        }
    }
});