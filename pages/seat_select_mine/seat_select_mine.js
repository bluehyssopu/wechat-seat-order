const baseUrl = require("../../app")
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

const qqmapsdk = new QQMapWX({
  key: '2AZBZ-JS5W4-E2MUP-KMF4V-BVZA5-GCFIA'
});

// pages/seat_select_mine/seat_select_mine.js
Page({
  data: {
    user_id: "",
    mySeat: [],
    date: new Date().toLocaleDateString(),
    isHidden: true,
    nowlatitude: 1,
    nowlongitude: 1,
  },

  onLoad: function () {
    const that = this
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        const id = res.data
        that.setData({
          user_id: id
        })
        that.getSeatMine()
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },

  getSeatMine() {
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
  },

  bindCheckout(e) {
    const defaultDay = new Date().toLocaleDateString()
    const index = e.currentTarget.dataset.index
    const startTime = this.data.mySeat[index].start_time
    const start = new Date(defaultDay + " " + startTime).getTime()
    const now = new Date().getTime()

    if (now < start) {
      wx.showToast({
        title: '还未到签到时间',
        icon: 'error'
      })
    } else {
      // 东馆位置
      // lat: 35.946651
      // lng: 120.182667
      const that = this
      // 获取用户的位置信息
      wx.getLocation({
        type: 'wgs84', // 使用 GPS 定位
        isHighAccuracy: true,
        success: res => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          console.log(latitude + " " + longitude);

          // 定义目标位置的经纬度信息
          const latitude2 = 35.946651
          const longitude2 = 120.182667

          // 计算用户与目标位置之间的距离
          const distance = this.getDistance(latitude, longitude, latitude2, longitude2)
          
          let message = ""
          // 根据距离判断用户是否在规定的范围内
          if (distance <= 2000) {
            that.checkout(e)
            message = "用户已到达图书馆东馆，签到成功"
          } else {
            message = "用户不在图书馆东馆范围内，签到失败"
          }

          // 使用 QQMapWX 实例的 reverseGeocoder 接口逆地址解析，获取位置的地址信息
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: res => {
              const address = res.result.address;
              const dec = '用户当前位置：' + address + "；" + message
              console.log('用户当前位置：', address);
              wx.showToast({
                title: dec,
                icon: 'none'
              })
            }
          });
        },
        fail: err => {
          console.log(err);
        }
      });
    }


  },

  checkout(e) {
    wx.request({
      url: baseUrl + '/api/seat/checkout',
      method: 'post',
      data: {
        reserveId: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data
        console.log(obj);
      }
    })
  },

  // 计算用户与目标位置之间的球面距离
  getDistance(latitude1, longitude1, latitude2, longitude2) {
    const EARTH_RADIUS = 6378137.0 // 地球半径
    const PI = Math.PI
    const radLat1 = latitude1 * PI / 180.0
    const radLat2 = latitude2 * PI / 180.0
    const a = radLat1 - radLat2
    const b = longitude1 * PI / 180.0 - longitude2 * PI / 180.0
    const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    const distance = s * EARTH_RADIUS
    console.log(distance);
    return distance
  }

})