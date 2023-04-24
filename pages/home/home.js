// index.js
Page({
  data: {
    pages: [
      {
        name: "预约选座",
        path: "/pages/seat_select_choose/seat_select_choose"
      },
      {
        name: "我的预约",
        path: "/pages/seat_select_mine/seat_select_mine"
      },
      {
        name: "选座记录",
        path: "/pages/seat_select_history/seat_select_history"
        // path: "/pages/logs/logs"
      },
      {
        name: "学习记录",
        path: "/pages/studyRecord/studyRecord"
      }
    ],
    // 居中显示项的位置
    centerItem: 0,
    // 首页轮播图数据
    coverList: [{
        id: 0,
        url: "https://vip2.loli.io/2023/03/02/GK14xqZgEF2bnPB.jpg"
      },
      {
        id: 1,
        url: "https://vip2.loli.io/2023/03/02/yJsdU4XhWK8vkza.jpg"
      },
      {
        id: 2,
        url: "https://vip2.loli.io/2023/03/02/DglifakmxAwIqWJ.jpg"
      },
      {
        id: 3,
        url: "https://vip2.loli.io/2023/03/02/LbJAvdIX3nFRDey.jpg"
      }
    ],
  },
  onBtnClick(event) {
    // 1.获取item
    const item = event.target.dataset.item

    // 2.跳转路径
    wx.navigateTo({
      url: item.path,
    })
  },
  getToken: function (e) {
    wx.request({
      url: 'http://127.0.0.1:4000/my/userinfo',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  },
})
