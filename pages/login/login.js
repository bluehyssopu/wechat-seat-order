const baseUrl = require("../../app");

Page({
  data: {
    username: '',
    password: ''
  },

  // 更新用户名
  bindUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 更新密码
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onSubmit: function () {
    console.log(this.data);
    const user_id = this.data.username
    wx.request({
      url: baseUrl + '/api/login',
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 0) {
          // 登录成功，跳转到首页
          console.log("登录成功");
          wx.setStorage({
            key: "token",
            data: res.data.token,
          })
          wx.setStorage({
            key: "user_id",
            data: user_id
          })
          wx.switchTab({
            url: '/pages/home/home',
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  }
})