// index.js
Page({
  toLoginPage: function() {
    wx.navigateTo({
      // url: '/pages/login/login'
      url: '/pages/informant_page_1/informant_page_1',
    })
  },
  toRegisterPage: function() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})
