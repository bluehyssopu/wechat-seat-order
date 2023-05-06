// pages/seat_select_history/seat_select_history.js
const baseUrl = require("../../app");

Page({
  data: {
    user_id: "",
    reservationList: []
  },

  onLoad(options) {
    const that = this
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        const id = res.data
        console.log(id);
        that.setData({
          user_id: id
        })
        that.getReservationList()
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    })
  },

  getReservationList: function () {
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/reservations',
      method: 'post',
      data: {
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data.data.reverse()
        // console.log(obj);
        that.setData({
          reservationList: obj
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onShareAppMessage() {

  }
})