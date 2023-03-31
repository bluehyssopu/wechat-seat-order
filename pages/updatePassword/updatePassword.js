const baseUrl = require("../../app");
const app = getApp();

Page({
  data: {
    id: 1,
    oldPwd: "",
    newPwd: "",
    reNewPwd: ""
  },
  onLoad: function() {
    const id = app.globalData.userInfo.id;
    this.setData({
      id: Number(id),
    })
  },

  // 原密码
  bindOldPwdInput(e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },
  // 新密码
  bindNewPwdInput(e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  // 再次确认密码
  bindreNewPwdInput(e) {
    this.setData({
      reNewPwd: e.detail.value
    })
  },

  onSubmit: function (e) {
    console.log(this.data);
    wx.request({
      url: baseUrl + '/my/updatepwd',
      method: 'POST',
      data: {
        id: this.data.id,
        oldPwd: this.data.oldPwd,
        newPwd: this.data.newPwd,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 0) {
          // 修改密码成功，跳转到登录页面 清除token
          console.log("修改密码成功");
          wx.setStorageSync('token', ''); //将token置空
          wx.redirectTo({
            url: '/pages/login/login',
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