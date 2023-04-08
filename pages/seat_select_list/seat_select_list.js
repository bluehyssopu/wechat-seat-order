const baseUrl = require("../../app");
const app = getApp();

Page({
  data: {
    seatZoneList: [],
    seatZoneId: "",
    seat_number: "",
    freeBg: 'https://vip2.loli.io/2023/04/05/672uUQBgzeLSf1G.png',
    busyBg: 'https://vip2.loli.io/2023/04/05/ecWymJTbS2ogM1q.png',
    modalShow: false,
    startTime: "",
    endTime: ""
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

  showModal(event) {
    const number = event.currentTarget.dataset.number
    this.setData({
      modalShow: true,
      seat_number: number
    })
  },

  cancel() {
    this.setData({
      modalShow: false,
      startTime: "",
      endTime: ""
    })
  },

  confirm() {
    this.setData({
      modalShow: false,
      startTime: "",
      endTime: ""
    })
  },

  seatReserve() {
  }
})