// pages/returnedpurchase/photo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
  },
  bigimg: function (e) { 
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.getimg(options.id);
    let imgurl = app.globalData.msgimgurl
    this.setData({
      imgUrl: imgurl
    })
  },
  getimg: function (id) {
    wx.showLoading({})
    let url = app.globalData.url + '/Upload?action=getFiles&tableName=sto_goods_return&isenable=1&tableId=' + id
    let data = new Object();
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading() 
      let str = res.data
      this.setData({
        imglist: str
      })
    }, (err) => {
      wx.hideLoading()
      wx.showToast({
        title: '请求出错',
        icon: "none"
      })
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