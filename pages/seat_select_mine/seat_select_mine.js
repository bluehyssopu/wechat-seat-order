const baseUrl = require("../../app")

// pages/seat_select_mine/seat_select_mine.js
Page({
  data: {
    user_id: "",
    mySeat: [],
    date: new Date().toLocaleDateString()
  },

  onLoad: function() {
    const that = this
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        const id = res.data
        that.setData({
          user_id: id
        })
        that.getSeatMine()
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    })
  },

  getSeatMine: function() {
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/mine',
      method: 'post',
      data: {
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data.data
        console.log(obj);
        that.setData({
          mySeat: obj
        })
      }
    })
  },

  cancelSeat(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const day = new Date().toLocaleDateString()
    const start = day + " " + this.data.mySeat[index].start_time
    const startTime = new Date(start).getTime()
    const nowTime = new Date().getTime()
    wx.showModal({
      title: '提示',
      content: '您确定要取消预约吗',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          const reduceValue = nowTime < startTime ? 0 : 1;
          wx.request({
            url: baseUrl + '/api/seat/cancel',
            method: 'post',
            data: {
              reserveId: e.currentTarget.dataset.id,
              user_id: that.data.user_id,
              reduceValue: reduceValue
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'Authorization': wx.getStorageSync('token')
            },
            success: (res) => {
              
            }
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
})
