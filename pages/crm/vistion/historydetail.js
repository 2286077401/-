// pages/crm/vistion/historydetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata: [],
  },
  //
  datalist: function (visitorid, custid) {
    wx.showLoading({
      title: '加载中..',
    })
    // var page = 1
    let url = app.globalData.url + '/custVisit?action=getVisiteByYear&mobile=true&page=1&rows=4'
    let data = new Object()
    data.accountid = visitorid
    data.custid = custid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      console.log(res, data, url)
      this.setData({
        listdata
      })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let accountid = options.visitorid
    let custid = options.custid
    this.datalist(accountid, custid);
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