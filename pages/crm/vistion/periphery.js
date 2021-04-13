const app = getApp();

Page({
  data: {
    listdata: [],
    longitude: 36.68013, //地图界面中心的经度
    latitude: 90, //地图界面中心的纬度
    markers: [ //标志点的位置
      //位置0
      {
        id: '',
        iconPath: '',
        latitude: '',
        longitude: '',
        width: '',
        height: '',
        callout: {
          content: "",
          color: "#00000",
          fontSize: "16",
          borderRadius: "10",
          bgColor: "#ffffff",
          padding: "10",
          display: "BYCLICK"
        }
      }
    ]
  },

  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("当前位置的经纬度为：", res.latitude, res.longitude);
        that.setData({
          latitude,
          longitude,
        })
        that.coordinate(latitude, longitude)
      }
    })

  },
  onReady: function () {

  },
  //获取坐标点
  coordinate: function (latitude, longitude) {
    let that = this
    wx.showLoading({
      title: '加载中..',
    })
    // var page = 1
    let url = app.globalData.url + '/location?action=getSurroundCust&mobile=true'
    let data = new Object()
    data.lat1 = latitude
    data.long1 = longitude
    data.distance = '40000'
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data
      console.log(res, data, url)
      that.setData({
        listdata
      })


     listdata.map(function (listdata) {
        let arr = that.data.markers
        arr.push({
          id: listdata.id,
          iconPath: '../../images/wzdw.png',
          latitude: listdata.latitude,
          longitude: listdata.longitude,
          width: 20,
          height: 20,
          callout: {
            content: listdata.name,
            color: "#ff0000",
            fontSize: "16",
            borderRadius: "10",
            bgColor: "#ffffff",
            padding: "10",
            display: "BYCLICK"
          }
        })
        that.setData({
          markers: arr
        })

      });
      console.log(that.data.markers)

    }, (err) => {
      wx.hideLoading();
      console.log(err, data, url)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },


  /**
   * 地图放大缩小事件触发
   * @param {*} e 
   */
  bindregionchange(e) {
    console.log('=bindregiοnchange=', e)
  },

  /**
   * 点击地图事件，有经纬度信息返回
   * @param {*} e 
   */
  bindtapMap(e) {
    console.log('=bindtapMap=', e)
  }
})