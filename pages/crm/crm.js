// pages/crm/crm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // images: {},
    imgwidth: 0,
    imgheight: 0,
    minimgwidth: 0,
    minimgheight: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.reLaunch({
    //   url: '/pages/index/index',
    // })
    // wx.showToast({
    //   title: '建设中...',
    //   icon: "none"
    // })
  },
  minimageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 70, //设置图片显示宽度，
      viewHeight = 60 / ratio; //计算的高度值
    _this.setData({
      minimgwidth: viewWidth,
      minimgheight: viewHeight
    })
  },
  imageLoad: function (e) { 
    var _this = this;
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 760, //设置图片显示宽度，
      viewHeight = 760 / ratio; //计算的高度值
    _this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  },
  //   imageLoad: function(e) {
  //     var $width=e.detail.width,    //获取图片真实宽度
  //         $height=e.detail.height,
  //         ratio=$width/$height;    //图片的真实宽高比例
  //     var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
  //         viewHeight=718/ratio;    //计算的高度值
  //      var image=this.data.images; 
  //      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  //      image[e.target.dataset.index]={
  //         width:viewWidth,
  //         height:viewHeight
  //      }
  //      this.setData({
  //           images:image,
  //      })
  //  },
  //跳转客户信息
  goChildren: function (e) {
    // console.log(e.currentTarget.dataset.biaos)
    let biaos = e.currentTarget.dataset.biaos
    if (biaos == 'msg') {
      wx.navigateTo({
        url: 'msg/msg',
      })
    } else if (biaos == 'vistion') {
      wx.navigateTo({
        url: 'vistion/vistion',
      })
    } else if (biaos == 'after') {
      wx.navigateTo({
        url: 'after/after',
      })
    } else if (biaos == 'postion') {
      wx.navigateTo({
        url: 'postion/postion',
      })
    } else if (biaos == 'take') {
      wx.navigateTo({
        url: 'take/take',
      })
    } else if (biaos == 'tel') {
      wx.navigateTo({
        url: 'tel/tel',
      })
    }

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
    wx.setStorageSync('takereturn', false)
   wx.setStorageSync('shouhouisSearch','')
   wx.setStorageSync('bfserchlistdata','')
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