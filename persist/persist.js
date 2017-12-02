const requestUrl = require('../utils/constants.js').getOrderCreateURL();
const duration = 2000;

function makeRequest(data) {
  wx.request({
    url: requestUrl,
    method: "POST",
    data: data,
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
  });
};

module.exports = {
  makeRequest: makeRequest
};
