// pages/informant_page_1/informant_page_1.js
Page({
  toAccountPage: function () {
    wx.reLaunch({
      url: '/pages/informant_page_2/informant_page_2',
    })
  }
});