// packageA/pages/map/prodelisales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodelsalBardatalistnext:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    if(options.prodelsalBardatalistnext!=undefined){
    wx.setStorageSync('prodelsalBardatalistnext', JSON.parse(options.prodelsalBardatalistnext))
    }
  
    // if(JSON.parse(options.prodelsalBardatalistnext)!=''){
    //   wx.setStorageSync('prodelsalBardatalistnext', JSON.parse(options.prodelsalBardatalistnext))
    //   }
    //   this.setData({
    //     prodelsalBardatalistnext:JSON.parse(options.prodelsalBardatalistnext) 
    //   })
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
    wx.setStorageSync('prodelsalBardatalistnext', '')
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