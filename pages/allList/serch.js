// pages/allList/serch.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    showView: true,
    //图片宽高比
    images: {},
    height: "",
    width: "",
    imgUrl: "",
    serchName: "",
  },
  //搜索关键字
  serchgj:function(){
    
  },
  //清除搜索内容
  clern:function(){
     this.setData({
      serchName:"",
     })
  },
  //获取用户输入的名称
  inputName:function(e){
  
    this.setData({
      serchName:e.detail.value
    })
  },
  serch: function () {
    wx.showLoading()
    let url = app.globalData.url + '/product?action=getImagesList&rows=20&page=1'
    let data = {}
    data.pronameLIKE = this.data.serchName
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdate = res.data.rows
    
      this.setData({
        listdate,
      })
    let item=JSON.stringify(listdate)
      if(listdate!=''){
        wx.reLaunch({
          url: 'allList?item=' + item ,
        })
      }
    }, (err) => {
      wx.hideLoading();
    
      wx.showToast({
        title: "服务器请求失败",
        icon: "none"
      })
    })
  },
  //打开规则提示
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
    wx.showLoading();
    //加载数据
    var page = 1
    let url = app.globalData.url + '/order?action=fuzzyQuery&table=cpxx&mobile=true&rows=20&page=1'
    let data = {}
    data.proname = ''
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading();
      let listdate = res.data.rows
      var totalDataCount = listdate.length;
   
      this.setData({
        listdate,
        // dataArray: listdate,
        page: page,
        totalDataCount: totalDataCount
      })
  
    }, (err) => {
      wx.hideLoading();
    
      wx.showToast({
        title: "服务器请求失败",
        icon: "none"
      })
    })
  },
  //请求下一页数据
  next: function () {
    wx.showLoading();
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/order?action=fuzzyQuery&rows=20&page=1&table=cpxx&mobile=true'
    let data = {}
    data.proname = ''
    app.wxRequest("POST", url, data, (res) => {

      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount;
 
      totalDataCount = totalDataCount + list.length;
      let listdate = this.data.listdate

      this.setData({
        listdate: listdate.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
      })
   
      wx.hideLoading()
    }, (err) => {
    
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  // 页面上拉触底事件的处理函数 
  lower: function () {
 
    this.next()
  },
  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  //获取产品名称
  getName: function (e) {
  
    let serchName = e.currentTarget.dataset.name
    this.setData({
      serchName
    })
  },
  //获取图片宽高比
  imageLoad: function (e) {
   
    var $width = e.detail.width,  
      $height = e.detail.height,
      ratio = $width / $height;  
    var viewWidth = 200,  
      viewHeight = 200 / ratio; 
    var image = this.data.images;
   
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  //加载数据
  // serchData:function(){

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
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