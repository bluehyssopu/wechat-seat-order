const baseUrl = require("../../app");

// 在页面的js文件中，需要先获取各区域的座位信息
const app = getApp();
Page({
  data: {
    seatInfoList: {},
    seatZoneList: []
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

  getSeatZoneList: function (event) {
    const seatZone = event.currentTarget.id
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/zonelist',
      method: 'post',
      data: {
        seat_area: seatZone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        // console.log(res.data.data);
        const obj = res.data.data
        // that.setData({
        //   seatZoneList: obj
        // })
        wx.navigateTo({
          url: '/pages/seat_select_list/seat_select_list',
          success: function(res) {
            // 传递数组参数
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: obj })
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  }
})