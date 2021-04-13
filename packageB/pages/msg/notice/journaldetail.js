// packageA/pages/msg/notice/journaldetail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    completiontype: "1",
    qualitytype: "1",
    lastdatalist: '',
    pfcontent: "", //批复内容
    detaillistdata:[],
  },
  //批复内容/dailyreport?action=upReply
  submitpf: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/dailyreport?action=upReply'
    let data = new Object()
    data.table = 'rzsbpf'
    data.reportid = this.data.lastdatalist.id
    data.replycontent = this.data.pfcontent
    data.situation = this.data.qualitytype
    data.quality = this.data.completiontype
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      if (res.data == 'true') {

         wx.showToast({
          title: '批复成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 2000);

      } else {
        wx.showToast({
          title: res.data,
          icon: "none"
        })
      } 

    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getpfcontent: function (e) { 
    this.setData({
      pfcontent: e.detail.value
    })
  },
  //完成情况
  completion: function (e) { 
    this.setData({
      completiontype: e.currentTarget.dataset.completiontype
    })
  },
  //完成质量
  quality: function (e) { 
    this.setData({
      qualitytype: e.currentTarget.dataset.qualitytype
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let lastdatalist = JSON.parse(options.item) 
    this.setData({
      lastdatalist
    })
    this.getdetail();
    this.getpicdata();
  },
  //获取详情
  getdetail: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/dailyreport?action=getReprtDetail'
    let data = new Object()
    data.idEQ = this.data.lastdatalist.id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      let detaillistdata = res.data 
      this.setData({
        detaillistdata,
      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //日志图片获取/dailyreport?action=searchdailyreportPic
  getpicdata: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/dailyreport?action=searchdailyreportPic'
    let data = new Object()
    data.reportid = this.data.lastdatalist.id
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      let picdata = res.data
      this.setData({
        picdata,
      })
    }, (err) => {
      wx.hideLoading(); 
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