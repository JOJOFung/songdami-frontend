const requestUrl = require('../utils/constants.js').getOrderCreateURL();
const duration = 2000;

function makePOSTRequest(data) {
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
}

function makeGETRequest(data, fnCallback) {
  wx.request({
    url: requestUrl,
    data: data,
    success: function (result) {
      typeof fnCallback == "function" && fnCallback(result.data)
    },

    fail: function ({ errMsg }) {
      wx.navigateTo({
        url: '../fail/fail'
      });
    }
  });
}

function makeDELETERequest(data, fnCallback) {
  wx.request({
    url: requestUrl,
    data: data,
    method: "DELETE",
    success: function (result) {
      typeof fnCallback == "function" && fnCallback(result.data)
    },

    fail: function ({ errMsg }) {
      wx.navigateTo({
        url: '../fail/fail'
      });
    }
  });
}

module.exports = {
  makePOSTRequest: makePOSTRequest,
  makeGETRequest: makeGETRequest,
  makeDELETERequest: makeDELETERequest
};
