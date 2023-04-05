// pages/seat_select_list/seat_select_list.js
Page({
  data: {
    seatZoneList: [],
    seatZoneId: ""
  },

  onLoad: function() {
    const that = this
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log(data.data);
      that.setData({
        seatZoneList: data.data,
        seatZoneId: data.data[0].seat_area
      })
      // console.log(that.seatZoneList);
      // console.log(that.seatZoneId);
    })
    // that.getSeatZoneList()
  },
  onBtnClick() {
    console.log("按钮点击");
  }
})