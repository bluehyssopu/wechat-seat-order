// app.js
// const baseUrl = "http://47.104.109.145:4000"
// const baseUrl = "http://110.42.220.152:8081"
const baseUrl = "http://127.0.0.1:4000"
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