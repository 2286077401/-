// pages/msg/approval.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata: '',
    page: '',
    totalDataCount: '',
    imgUrl: "",
  },
  godetail: function (e) {
    this.isyuedu(e.currentTarget.dataset.id,e.currentTarget.dataset.isvisited)
    console.log(e.currentTarget.dataset.content)
    wx.setStorageSync('appleycontent', e.currentTarget.dataset.content)
    wx.navigateTo({
      url: '/packageB/pages/msg/approvaldetail',
    })
  },
  //改变阅读状态
  isyuedu: function (id,isvisited) {

    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/news?action=visitNewsDetail'
    let data = new Object()
    data.isvisited=isvisited
    data.id= id
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res, data)
    }, (err) => {
      wx.hideLoading();
      console.log(err, data, url)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  bigimg: function (e) {
    console.log(e)

    wx.previewImage({
      current: e.currentTarget.dataset.bigimg, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.bigimg] // 需要预览的图片http链接列表
    })
  },
  //获取列表
  listData: function () {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/news?action=getBeans&table=xwgg&mobile=true'
    let data = new Object()
    data.typenameEQ='公告'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res)
      let listdata = res.data
      var totalDataCount = listdata.length;
      console.log(res, data, url, res.data.logisticsno)
      this.setData({
        listdata,
        // dataArray: listdata,
        page: page,
        totalDataCount: totalDataCount
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
  //请求下一页数据
  next: function () {
    wx.showLoading();
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/news?action=getBeans&table=xwgg&mobile=true&rows=20&page=' + page
    let data = new Object()
    data.typenameEQ='公告'
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount;
      console.log(url, data, res.data.rows)
      totalDataCount = totalDataCount + list.length;
      let listdata = this.data.listdata
      this.setData({
        listdata: listdata.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
        // imgarr: imgarr.concat(imgarrl)
      })
      console.log(this.data.listdata)
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () {
    console.log('请求下一页')
    // this.next()
    wx.showToast({
      title: '已加载全部',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
    this.listData();
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
    this.listData();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})