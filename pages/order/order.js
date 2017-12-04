// order.js
const persist = require("../../persist/persist.js");

//TODO: 把时间抽到另外一个单独的文件中去
//TODO: SAVE SURNAME, SEX, TELEPHONE, ITEM, ADDRESS TO LOCAL STORAGE
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
  data: {
    contactTitle: "请问如何联系您？",
    choiceTitle: "您需要什么大米？",
    addressTitle: "您希望配送到哪里？",
    timeTitle: "您期望何时送达？",
    contactSurname: "姓",
    surnameValue: "",//View value
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
    //TODO: check why sexValue cannot be 0
    sexValue: 1,//View value
    contactTelephone: "手机号码",
    telephoneValue: "",//View value
    items: [
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
      "新糯米10斤／35元"
    ],
    itemIndex: 0,//View value
    addressPrefix: "上海市徐汇区",
    addressValue: "",//View value
    addressPlaceholder: "门牌号码",
    addressValue: "",//View value
    timeYear: "年",
    timeMonth: "月",
    timeDay: "日",
    years: years,
    months: months,
    days: days,
    deliverDateValue: [0, 0, 0],//View value
    confirm: "确认！"
  },

  bindSurnameInput: function (e) {
    this.setData({
      surnameValue: e.detail.value
    })
  },

  onSexChange: function (e) {
    this.setData({
      sexValue: e.detail.value
    });
  },

  _getSexName: function (iSexValue) {
    let items = this.data.sexes;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value == iSexValue) {
        return items[i].name;
      };
    }
  },

  bindTelephoneInput: function (e) {
    this.setData({
      telephoneValue: e.detail.value
    })
  },

  bindAddressInput: function (e) {
    this.setData({
      addressValue: e.detail.value
    });
  },

  bindItemChange: function (e) {
    this.setData({
      itemIndex: e.detail.value
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
      deliverDateValue: val,
      days: this.data.days
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

  contact: function () {
    //send message to backend system;
    //重复信息，好的，知道咯。
    var order = this._getOrderDetails();
    if (!this._validateTelephone(order)) {
      return;
    }

    persist.makeRequest(order);
  },

  _getOrderDetails: function () {
    var code = getApp().globalData.code;
    return {
      code: code,
      name: this.data.surnameValue,
      sex: this._getSexName(this.data.sexValue),
      telephone: this.data.telephoneValue,//电话号码作为订单的唯一标识符
      itemName: this.data.items[this.data.itemIndex],
      address: this.data.addressPrefix + this.data.addressValue,
      date: this.data.years[this.data.deliverDateValue[0]] + "-" + this.data.months[this.data.deliverDateValue[1]] + "-" + this.data.days[this.data.deliverDateValue[2]]
    }
  },

  _validateTelephone: function (oOrder) {
    if (!oOrder.telephone || oOrder.telephone.length !== 11) {
      wx.showToast({
        title: '请正确填写手机',
        duration: 2000
      });
      return false;
    } else if (!oOrder.address || oOrder.address.length <= 6) {
      wx.showToast({
        title: '请正确填写地址',
        duration: 2000
      });
      return false;
    }

    return true;
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