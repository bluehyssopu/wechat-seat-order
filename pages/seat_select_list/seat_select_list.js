const baseUrl = require("../../app");
const app = getApp();

Page({
  data: {
    seatZoneList: [],
    seatZoneId: ""
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
    
    // this.getSeatZoneList()

    // const that = this
    // const eventChannel = that.getOpenerEventChannel()
    // eventChannel.on('acceptDataFromOpenerPage', (data) => {
    //   console.log(data.data);
    //   that.setData({
    //     seatZoneList: data.data,
    //     seatZoneId: data.data[0].seat_area
    //   })
      // wx.setStorage({
      //   key: 'myData',
      //   data: data.data
      // })
      // console.log(that.seatZoneList);
      // console.log(that.seatZoneId);
    // })
    // that.getSeatZoneList()
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

  onBtnClick() {
    console.log("按钮点击");
  }
})