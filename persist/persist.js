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
      wx.showToast({
        title: '请求成功',
        icon: 'success',
        mask: true,
        duration: duration
      })
      console.log('request success', result)
    },

    fail: function ({ errMsg }) {
      console.log('request fail', errMsg)
    }
  })
};

module.exports = {
  makeRequest: makeRequest
}
