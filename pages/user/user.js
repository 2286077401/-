// pages/user/user.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbalbarstr:"",
    usermsg:[],
  },
  ceshi:function(){
    // wx.navigateTo({
    //   url: 'ceshi',
    // })
  },
  downloadapp:function(){
    wx.navigateTo({
      url: 'downweb',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getusermsg:function(){
    wx.showLoading({})
    let url = app.globalData.url + '/account?action=getAccount'
    let data = new Object();
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading()
      console.log(res, url, data)
      let str = res.data
      this.setData({
        usermsg:str
      })
    }, (err) => {
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  onLoad: function (options) {
   this.getusermsg();
  },
  gogerenmsg:function(){
   wx.navigateTo({
     url: 'usermsg',
   })
  },
  gosetup:function(){

  wx.navigateTo({
    url: 'setup',
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
    app.globalData.selected= 0
    this.setData({
      tabbalbarstr:app.globalData.selected
    })
    console.log(app.globalData.selected)
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