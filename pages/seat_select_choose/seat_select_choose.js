const baseUrl = require("../../app");

// 在页面的js文件中，需要先获取各区域的座位信息
const app = getApp();
Page({
  data: {
    seatInfoList: {}
  },
  onLoad(options) {
    this.getSeatInfoList();
  },
  getSeatInfoList() {
    const that = this;
    wx.request({
      url: baseUrl + '/api/seat/list',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        // console.log(res.data.data[0]);
        const obj = res.data.data[0];
        that.setData({
          seatInfoList: obj
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },
})