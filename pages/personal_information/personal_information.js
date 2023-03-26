// 在页面的js文件中，需要先获取用户信息
Page({
  data: {
    userInfo: {
      nickName: "微信用户",
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
      username: "1907010107",
      email: "test@upc.edu.cn"
    },
    version: "0.0.1"
  },
  onShow() {
    
  },
  editorUserInfo() {
    console.log("编辑用户信息")
  },
  updatePwd() {
    console.log("更新密码");
  },
  loginout(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) {  //这里是点击了确定以后
          console.log('用户点击确定')
          wx.setStorageSync('token', '');//将token置空
          wx.redirectTo({
            url: '/pages/login/login',  //跳去登录页
            // url: '/pages/home/home'
          })
        } else {  //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
})