// pages/nextdelivery/nextdelivery.js
const persist = require("../../persist/persist.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      // {
      //   id: 1,
      //   name: "皇帝贵宾20斤／120元",
      //   date:"2017-12-08"
      // }
    ],
    cancel: '取消'
  },

  cancel: function (e) {
    var show = e.currentTarget.dataset.show;
    if(!show){
      return;
    }

    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.login({
      success: function (res) {
        var code = res.code;
        persist.makeDELETERequest({ "id": id, "code": code }, function (aOrders) {
          that.setData({
            items: that._formatItems(aOrders)
          });
        });
      }
    });
  },

  _formatItems: function (aItems) {
    for (var i = 0, length = aItems.length; i < length; i++) {
      var sDate = aItems[i].date;
      aItems[i].show = this._setShow(sDate);
    }
    return aItems;
  },

  _setShow: function (sDate) {
    var current = new Date();
    var oDate = new Date(sDate);
    if (oDate.getFullYear() == current.getFullYear() && oDate.getMonth() == current.getMonth() && oDate.getDay() == current.getDay()) {
      return false;
    }
    return true;
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
            items: that._formatItems(aOrders)
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