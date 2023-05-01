// app.js
const baseUrl = "http://8.130.76.114:4000"
module.exports = baseUrl

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    version: "1.0.0",
    userInfo: {},
    seatZoneId: ""
  }
})