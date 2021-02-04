// pages/register/register.js
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
      name: '',
      password: '',
      role: ''
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
      name: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        rangelength: [6, 18]
      },
      role: {
        required: true
      }
    }
    const messages = {
      id: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的姓名'
      },
      password: {
        required: '请填写密码',
        minlength: '密码长度不符合要求'
      },
      role: {
        required: '请选择注册身份'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  //返回上一页
  returnLastPage: function () {
    wx.navigateBack()
  },
  //点击注册按钮后
  clickRegisterBtn: function (data) {
    //校验表单
    const params = data.detail.value
    console.log(app.globalData.URL)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.openTopTips(error.msg)
    } else {
      this.showLoading()
      // console.log(JSON.stringify(data.detail.value))
      var res = {
        "data": {
          "status": "400"
        }
      }
      console.log(JSON.stringify(res))
      if (res.data.status === '200') {
        this.hideLoading()
        this.openToast('注册成功')
        setTimeout(() => {
          this.returnLastPage()
        }, 1000);
      } else if (res.data.status === '400') {
        this.hideLoading()
        this.openWarnToast('手机号已注册')
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