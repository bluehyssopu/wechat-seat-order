const baseUrl = require("../../app");

// 在页面的js文件中，需要先获取用户信息
const app = getApp();
Page({
  data: {
    version: app.globalData.version,
    userInfo: {}
  },
  options: {
    onPullDownRefresh() {
      this.getUserInfo()
    }
  },
  editorUserInfo() {
    wx.navigateTo({
      url: "/pages/updateUserInfo/updateUserInfo",
    })
  },
  updatePwd() {
    console.log("更新密码");
  },
  onLoad: function() {
    this.getUserInfo()
  },
  getUserInfo() {
    const that = this;
    wx.request({
      url: baseUrl + '/my/userinfo',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        const obj = res.data.data;
        that.setData({
          userInfo: obj
        })
        app.globalData.userInfo = obj
        console.log(app.globalData.userInfo);
        // wx.setStorage({
        //   key: "userInfo",
        //   data: obj
        // })
        // that.userInfo = obj
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },
  loginout() {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
          wx.setStorageSync('token', ''); //将token置空
          wx.redirectTo({
            url: '/pages/login/login', //跳去登录页
            // url: '/pages/home/home'
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
})