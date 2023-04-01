const baseUrl = require("../../app");
const app = getApp();

Page({
  data: {
    id: 1,
    nickname: "",
    email: ""
  },
  onLoad: function() {
    const id = app.globalData.userInfo.id;
    this.setData({
      id: Number(id)
    })
  },
  // 更新用户名
  bindNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 更新密码
  bindEmailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },

  onSubmit: function (e) {
    console.log(this.data);
    wx.request({
      url: baseUrl + '/my/userinfo',
      method: 'POST',
      data: {
        id: this.data.id,
        nickname: this.data.nickname,
        email: this.data.email
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 0) {
          // 修改个人信息成功，跳转到个人信息页面
          console.log("修改个人信息成功");
          wx.redirectTo({
            url: '/pages/user/user',
          })
        } else {
          wx.showToast({
            title: '修改个人信息失败',
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