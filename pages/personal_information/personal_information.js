// 在页面的js文件中，需要先获取用户信息
Page({
  data: {
    userInfo: {}
  },
  onShow() {
    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  }
})