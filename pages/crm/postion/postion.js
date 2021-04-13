// pages/crm/postion/postion.js
import util from "../../../utils/util";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    show: false,
    name: "",
    latitude: '',
    longitude: '',
    listdata: [],
    page: '',
    totalDataCount: '',
    markers: [{
      id: '',
      iconPath: "",
      latitude: '',
      longitude: '',
      width: '',
      height: '',
      callout: {
        content: '',
        color: '',
        fontSize: '',
        borderRadius: '',
        display: '',
        padding: '',
        borderRadius: '',
        borderWidth: ''
      }
    }]
  },
  inputadd: util.debounce(function (msg) {
    console.log('1', msg[0].detail.value)
    let name = msg[0].detail.value
    // console.log(encodeURIComponent(name))
    this.setData({
      name,
    })
    this.khaddress()
  }),
  //回到当前位置
  restoreaddress: function () {
    let latitude=wx.getStorageSync('latitude')
    let longitude= wx.getStorageSync('longitude')
    wx.showToast({
      title: '回到当前位置',
    })
    this.setData({
      latitude: latitude,
      longitude: longitude,
    })
  },
  //下一页
  khaddressnext: function () {
    let  that=this
    wx.showLoading({
      title: '加载中..',
    })
    var page = that.data.page;
    page += 1;
    let url = app.globalData.url + '/customer?action=getCustomerPositionList&page=' + page + '&row=100'
    let data = new Object()
      data.classname = '',
      data.name = this.data.name,
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => {
        wx.hideLoading();
        var list = res.data.rows;
        var totalDataCount = that.data.totalDataCount;
        var listdata = that.data.listdata;
        console.log(res, data, url)
        totalDataCount = totalDataCount + list.length;
        that.setData({
          listdata: listdata.concat(res.data.rows),
          show: true,
          page: page,
          totalDataCount: totalDataCount
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
        console.log(this.data.markers)
      }, (err) => {
        wx.hideLoading();
        console.log(err, data, url)
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
  },
  getnext: function () {
    console.log('next')
    this.khaddressnext();
  },
  //获取焦点
  getfocus: function () {
    console.log('获取焦点')
    this.setData({
      focus: true
    })
  },
  // inputadd:function(e){
  //   let name=e.detail.value
  //     this.khaddress(name)
  // },
  //跳转
  jump: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.latitudeafter == "" || e.currentTarget.dataset.longitudeafter == "") {
      wx.showToast({
        title: '未获取到经纬度',
        icon: "none",
      })
      this.setData({
        show: false,
      })
      return;
    }
    this.setData({
      latitude: e.currentTarget.dataset.latitudeafter,
      longitude: e.currentTarget.dataset.longitudeafter,
      show: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.khaddress()
    let that = this
    // that.khaddress();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   scale: 28
        // })
      }
    })

  },
  //客户位置列表
  // NSString *urlstr = [NSString stringWithFormat:@"%@%@",DATA_ADDRESS,@"/customer"];
  // NSDictionary *params = @{@"action":@"getCustomerPositionList",@"classname":@"",@"name":name};
  khaddress: function () {
    let that=this
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/customer?action=getCustomerPositionList&page=1&row=50'
    let data = new Object()
      data.classname ='',
      data.flag= '1',
      data.name =  that.data.name,
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => {
        wx.hideLoading(); 
        console.log(res, data, url)
        let listdata = res.data.rows
        var totalDataCount = listdata.length;
       
        that.setData({
          listdata,
          show: true,
          page: page,
          totalDataCount: totalDataCount
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})