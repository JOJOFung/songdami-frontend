//index.js
//获取应用实例
var app = getApp();

Page({

  data: {
    welcome:'，您好！\n\n欢迎光临贵龙米行！',
    order: '马上订购！',
    nextDeliver:'即将配送',
    addressManager:'收货地址管理',
    contactDeveloper:'联系开发者',
    userInfo: {}
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  //事件处理函数
  //Navigate to Order page
  order: function () {
    wx.navigateTo({
      url: '../order/order'
    });
  },

  //Navigate to Next Deliver page
  manageNextDeliver: function () {
    wx.navigateTo({
     url: '../nextdelivery/nextdelivery'
    });
  },

  manageAddress: function () {
    // wx.navigateTo({
    //   url: '../nextdeliver/nextdeliver'
    // });
  }
})
