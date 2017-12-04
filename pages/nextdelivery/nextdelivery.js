// pages/nextdelivery/nextdelivery.js
const persist = require("../../persist/persist.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      // {
      //   name: "皇帝贵宾20斤／120元",
      //   date:"2017-12-08"
      // }, {
      //   name: "五谷龙20斤／100元",
      //   date: "2017-12-08"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        persist.makeGETRequest({ "code": code }, function (aOrders) {
          that.setData({
            items: aOrders
          });
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})