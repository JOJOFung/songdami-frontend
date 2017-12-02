const requestUrl = require('../utils/constants.js').getOrderCreateURL()
const duration = 2000

function makeRequest() {
  wx.request({
    url: requestUrl,
    method: "POST",
    data: {
      noncestr: Date.now()
    },
    success: function (result) {
      wx.navigateTo({
        url: '../success/success'
      });
    },

    fail: function ({ errMsg }) {
      wx.navigateTo({
        url: '../fail/fail'
      });
    }
  })
};

module.exports = {
  makeRequest: makeRequest
}
