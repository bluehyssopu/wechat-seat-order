const baseUrl = require("../../app");
const app = getApp();

Page({
  data: {
    user_id: "",
    seatZoneList: [],
    seatZoneId: "",
    seat_number: "",
    freeBg: 'https://vip2.loli.io/2023/04/05/672uUQBgzeLSf1G.png',
    busyBg: 'https://vip2.loli.io/2023/04/05/ecWymJTbS2ogM1q.png',
    modalShow: false,
    startTime: "",
    endTime: "",
    freeTime: "",
    message: ""
  },

  onLoad: function() {
    const that = this
    wx.getStorage({
      key: 'seatZoneId',
      success: function(res) {
        const id = res.data
        that.setData({
          seatZoneId: id
        })
        console.log(that.data.seatZoneId);
        that.getSeatZoneList()
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    })
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        const id = res.data
        that.setData({
          user_id: id
        })
        console.log(that.data.user_id);
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    })
  },

  getSeatZoneList: function () {
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/zonelist',
      method: 'post',
      data: {
        seat_area: that.data.seatZoneId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data.data
        console.log(obj);
        that.setData({
          seatZoneList: obj
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },

  bindStartTime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndTime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },

  // 保存座位的number 获取当前座位的已预约时间 展示预约窗口
  // 已预约时间 + picker选择器
  showModal(event) {
    const number = event.currentTarget.dataset.number
    this.setData({
      seat_number: number
    })
    this.getSeatFreeTime()
  },

  cancel() {
    this.setData({
      modalShow: false,
      startTime: "",
      endTime: ""
    })
  },

  confirm() {
    this.seatReserve()
    this.setData({
      modalShow: false,
      startTime: "",
      endTime: ""
    })
  },

  getSeatFreeTime() {
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/freetime',
      method: 'post',
      data: {
        seat_id: that.data.seat_number
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data.data
        // console.log(obj);
        that.setData({
          freeTime: obj,
          modalShow: true
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },

  seatReserve() {
    const that = this
    wx.request({
      url: baseUrl + '/api/seat/reserve',
      method: 'post',
      data: {
        user_id: that.data.user_id,
        seat_area: that.data.seatZoneId,
        seat_id: that.data.seat_number,
        startTime: that.data.startTime,
        endTime: that.data.endTime
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const message = res.data.message
        // console.log(obj);
        wx.showToast({
          title: message,
          icon: 'none'
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  }
})