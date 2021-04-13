// packageA/pages/map/saleprosales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selarprosaleslist:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    if(options.selarprosaleslistnext!=undefined){
    wx.setStorageSync('selarprosaleslistnext', JSON.parse(options.selarprosaleslistnext))
    }

    // if(JSON.parse(options.selarprosaleslistnext)!=''){
    //   wx.setStorageSync('selarprosaleslistnext', JSON.parse(options.selarprosaleslistnext))
    //   }
    //   this.setData({
    //     selarprosaleslistnext:JSON.parse(options.selarprosaleslistnext) 
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
  wx.setStorageSync('selarprosaleslistnext', '')
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