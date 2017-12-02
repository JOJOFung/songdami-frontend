// order.js
var persist = require("../../persist/persist.js");

const items = [
  "皇帝贵宾20斤／120元", 
  "五谷龙20斤／100元",
  "天然香20斤／100元",
  "东台大米20斤／60元",
  "东台大米50斤／150元",
  "崇明新大米20斤／60元",
  "宝骏大米20斤／70元",
  "射阳晚粳米20斤／52元",
  "东北大米20斤／60元",
  "秋田小町20斤／60元",
  "稻花香20斤／60元",
  "新糯米10斤／35元"];

const date = new Date();
const years = [date.getFullYear()];
const months = [];
const days = [];

for (let i = date.getMonth() + 1; i <= 12; i++) {
  months.push(i);
}

for (let i = 1; i <= 31; i++) {
  days.push(i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactTitle: "请问如何联系您？",
    choiceTitle: "您需要什么大米？",
    addressTitle: "您希望配送到哪里？",
    timeTitle: "您期望何时送达？",
    contactSurname: "姓",
    contactTelephone: "电话号码",
    addressPrefix: "上海市徐汇区",
    addressPlaceholder: "门牌号码",
    timeYear: "年",
    timeMonth: "月",
    timeDay: "日",
    confirm: "确认！",
    //Initial data of view
    sexes: [
      {
        value: 0,
        name: "先生"
      },
      {
        value: 1,
        name: "女士"
      }
    ],
    items: items,
    years: years,
    months: months,
    days: days,
    value: [0, 0, 0], //滑块第几个值

    //Initial data of controller
    item: "1",
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  },

  bindSurnameInput: function (e) {
    this.setData({
      surnameValue: e.detail.value
    })
  },

  onSexChange: function (e) {
    let itemName = "";

    let items = this.data.sexes;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value == e.detail.value) {
        itemName = items[i].name;
        break;
      };
    }

    this.setData({
      sexValue: itemName
    });
  },

  bindTelephoneInput: function (e) {
    this.setData({
      telephoneValue: e.detail.value
    })
  },

  bindAddressInput: function (e) {
    this.setData({
      addressValue: e.detail.value
    })
  },

  bindItemChange: function (e) {
    let val = e.detail.value;
    this.setData({
      item: this.data.items[val[0]]
    });
  },

  bindTimeChange: function (e) {
    let val = e.detail.value;

    let year = this.data.years[val[0]];

    let month = this.data.months[val[1]];
    this._updateMonthDates(year, month);

    let day = this.data.days[val[2]];
    if (day == undefined) {
      day = this.data.days[this.data.days.length - 1];
    }

    this.setData({
      year: year,
      month: month,
      days: this.data.days,
      day: day
    });
  },

  _getDays: function (iYear, iMonth) {
    let actualDays;
    if (iMonth == 1 || iMonth == 3 || iMonth == 5 || iMonth == 7 || iMonth == 8 || iMonth == 10 || iMonth == 12) {
      actualDays = this._get31Days();
    } else if (iMonth == 2) {
      if (iYear % 100 == 0 && iYear % 400 == 0 || iYear % 100 != 0 && iYear % 4 == 0) {
        actualDays = this._get28Days();
      } else {
        actualDays = this._get29Days();
      }
    } else {
      actualDays = this._get30Days();
    }

    if (iMonth === (date.getMonth() + 1)) {
      actualDays = actualDays.slice(date.getDate() - 1);
    }

    return actualDays;
  },

  _updateMonthDates: function (iYear, iMonth) {

    this.data.days = this._getDays(iYear, iMonth);
  },

  _get28Days: function () {
    return this._prepareDays(28);
  },

  _get29Days: function () {
    return this._prepareDays(29);
  },

  _get30Days: function () {
    return this._prepareDays(30);
  },

  _get31Days: function () {
    return this._prepareDays(31);
  },

  _prepareDays: function (iDayNumber) {
    let monthDays = [];
    for (let i = 1; i <= iDayNumber; i++) {
      monthDays.push(i);
    }

    return monthDays;
  },

  contact:function(){
    //send message to backend system;
    //重复信息，好的，知道咯。
    persist.makeRequest();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let days = this._getDays(date.getFullYear(), date.getMonth() + 1);
    this.setData({
      days: days
    });
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
});