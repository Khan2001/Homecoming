// pages/login/login.js
import WxValidate from '../../utils/WxValidate.js'
var app = getApp()
Page({
  data: {
    toast: false,
    warnToast: false,
    loading: false,
    hideToast: false,
    hideWarnToast: false,
    hideLoading: false,
    topTips: false,
    hideTopTips: false,
    success: '',
    warn: '',
    tips: '',
    form: {
      id: '',
      password: ''
    }
  },
  //成功提示的显示与自动隐藏
  openToast: function (msg) {
    this.setData({
      toast: true,
      success: msg
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
          success: ''
        });
      }, 300);
    }, 3000);
  },
  //失败提示的显示与自动隐藏
  openWarnToast: function (msg) {
    this.setData({
      warnToast: true,
      warn: msg
    });
    setTimeout(() => {
      this.setData({
        hidewarnToast: true
      });
      setTimeout(() => {
        this.setData({
          warnToast: false,
          hidewarnToast: false,
          warn: ''
        });
      }, 300);
    }, 3000);
  },
  //显示请稍后
  showLoading: function () {
    this.setData({
      loading: true,
      hideLoading: true
    })
  },
  //隐藏请稍后
  hideLoading: function () {
    this.setData({
      loading: false,
      hideLoading: false
    })
  },
  //表单验证提示
  openTopTips: function (msg) {
    this.setData({
      topTips: true,
      tips: msg
    });
    setTimeout(() => {
      this.setData({
        hideTopTips: true
      });
      setTimeout(() => {
        this.setData({
          topTips: false,
          hideTopTips: false,
          tips: ''
        });
      }, 300);
    }, 3000);
  },


  onLoad() {
    this.initValidate() //验证规则函数
  },
  //验证函数
  initValidate() {
    const rules = {
      id: {
        required: true,
        tel: true
      },
      password: {
        required: true
      }
    }
    const messages = {
      id: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      password: {
        required: '请填写密码'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },


  returnLastPage: function () {
    wx.navigateBack()
  },
  clickLoginBtn: function (data) {
    //校验表单
    const params = data.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.openTopTips(error.msg)
    } else {
      this.showLoading()
      var res = {
        "data": {
          "status": "200"
        }
      }
      if (res.data.status === '200') {
        this.hideLoading()
        this.openToast('登录成功')
        setTimeout(() => {
          //此处跳转系统内部
        }, 1000);
      } else if (res.data.status === '400') {
        this.hideLoading()
        this.openWarnToast('用户名或密码错误')
      }
    }
  }
  // wx.request({
  //   url: app.globalData.URL, //接口地址,在app.js中
  //   data: JSON.stringify(data.detail),
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success(res) {
  //     console.log(res.data)
  //     if (res.data.status === '200') {
  //       this.hideLoading()
  //       this.openToast()
  //       this.returnLastPage()
  //     } else if (res.data.status === '400') {
  //       this.hideLoading()
  //       this.openWarnToast()
  //     }
  //   }
  // })
});