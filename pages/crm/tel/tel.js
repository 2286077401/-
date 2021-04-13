// pages/crm/tel/tel.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    firstcolor: "",
    firsts: "",
    detailshow: false,
    showdivdata: '',
    teldata: [],
    serchdata: [], //搜索后的数组
    serch: false,
    page: '',
    totalDataCount: '',
    colorArr: [], //随机颜色
    firstStr: [],
  },
  close: function () {
    this.setData({
      detailshow: !this.data.detailshow
    })

  },
  calltel: function (e) { 
    let tell = e.currentTarget.dataset.tell
    wx.makePhoneCall({
      phoneNumber: tell
    })
  },
  detailshow: function (e) { 
    this.setData({
      detailshow: !this.data.detailshow,
      showdivdata: e.currentTarget.dataset.item,
      firsts: e.currentTarget.dataset.firsts,
      firstcolor: e.currentTarget.dataset.firstcolor,
      showModal:!this.data.showModal
    }) 
  },
  close:function(){
   this.setData({
    showModal:!this.data.showModal,
    detailshow:!this.data.detailshow
   })
  },
  serch: function (e) { 
    let list = [];
    this.data.teldata.map(item => {
      if (item.name.indexOf(e.detail.value) > -1) {
        return list.push(item)
      }
    }) 
    this.setData({
      serchdata: list,
      serch: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.khMsglistData();

  },
  //生成随机颜色teldata
  color: function (leng) {
    let colorArr = []
    let firstStr = []
    for (let i = 0; i < leng; i++) {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      let color = "rgb(" + r + ',' + g + ',' + b + ")";
      let str = this.data.teldata[i].name
      let first = str.substr(0, 1)
      colorArr.push(color)
      firstStr.push(first)
    } 
    this.setData({
      colorArr,
      firstStr
    })
  },
  //获取电话号码
  khMsglistData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/rongcloud?action=getFriendsList'
    let data = new Object()
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      let teldata = res.data
      let leng = teldata.length
      this.setData({
        teldata,
      })
      this.color(leng)
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