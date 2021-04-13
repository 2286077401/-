// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pronameLIKE: "",
    listdate: [],
    imgUrl: "",
    itempic: "",
    //图片宽高比
    images: {},
    proid:"",
  },
  //获取图片宽高比
  imageLoad: function (e) {
  
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 500, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 500 / ratio; //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  //请求商品详情

  detail: function (itemData) {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/product?action=getBeans&view=cpstview&row=10&pages=1'
    let data = new Object()
    data.pronoEQ = ''
    data.pronameLIKE = itemData
    data.helpnoLIKE = ''
    data.protypeidEQ = ''
    data.mainunitEQ = ''
    data.secondunitEQ = ''
    data.isvalidEQ = ''
    data.table = 'cpxx'
    data.idEQ=this.data.proid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
   
      let listdate = res.data
      this.setData({
        listdate
      })
    }, (err) => {
      wx.hideLoading();
     
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //跳转订单管理
  orderManagement: function () {
    wx.reLaunch({
      url: '/pages/orderManagement/orderManagement?currentab=1&pagee=2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let imgUrl = app.globalData.imgurl
    let itemData = JSON.parse(options.item).proname
    let proid = JSON.parse(options.item).id
    let itempic = options.imgData
    this.setData({
      pronameLIKE: itemData.proname,
      imgUrl,
      itempic,
      proid,
    })
    this.detail(itemData);
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