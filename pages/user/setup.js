// pages/user/setup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usermsg: [],
    show: false,
    showModalStatus: false,
  },
  gomodify: function () {
  wx.navigateTo({
    url: 'setup/modify',
  })
  },
  powerDrawer: function () {
    this.setData({
      showModalStatus: false
    });
  },

  signout: function () {
    this.setData({
      show: true,
      showModalStatus: true
    })
  },
  signoutnext: function () {
    console.log("退出登录")
    wx.showLoading({})
    let url = app.globalData.url + '/loginout'
    let data = new Object();
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading()
      console.log(res, url, data)
      let str = res.data
      this.setData({
        usermsg: str,
        show: false,
        showModalStatus: false
      })
      wx.removeStorageSync('logpwd')
      wx.reLaunch({
        url: '/pages/login/login',
      })
      wx.showToast({
        title: '退出成功',
        icon: "none"
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getusermsg();
  },
  getusermsg: function () {
    wx.showLoading({})
    let url = app.globalData.url + '/account?action=getAccount'
    let data = new Object();
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading()
      console.log(res, url, data)
      let str = res.data
      this.setData({
        usermsg: str
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