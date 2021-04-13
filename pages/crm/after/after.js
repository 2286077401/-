// pages/crm/after/after.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata: '',
    page: '',
    totalDataCount: '',
    showModal: "",
  },
  godetail: function (e) { 

    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: 'detail?item=' + item,
    })
  },
  close: function () {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  // 点击更多
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  close_mask: function (e) {
    this.setData({
      showModal: false
    })
    if (e.currentTarget.dataset.biaos == '搜索') {
      wx.navigateTo({
        url: 'serch',
      })
    } else if (e.currentTarget.dataset.biaos == '添加问题') {
      wx.navigateTo({
        url: 'addque',
      })
    }
  },
  //列表查询
  //获取列表
  listData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/questions?action=searchQusetion&rows=20&page=1'
    let data = new Object()
    data.isdealEQ = ''
    data.submittimeGE = ''
    data.submittimeLE = ''

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var totalDataCount = listdata.length; 
      this.setData({
        listdata,
        // dataArray: listdata,
        page: page,
        totalDataCount: totalDataCount
      })
    }, (err) => {
      wx.hideLoading(); 
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
    let url = app.globalData.url + '/questions?action=searchQusetion&rows=20&page=' + page
    let data = new Object()
    data.isdealEQ = ''
    data.submittimeGE = ''
    data.submittimeLE = ''
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let listdata = this.data.listdata
      this.setData({
        listdata: listdata.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
        // imgarr: imgarr.concat(imgarrl)
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
  onReachBottom: function () { 
    this.next()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    

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
 
    let isSearch = wx.getStorageSync('shouhouisSearch')
    if (isSearch == 'false' || isSearch == undefined) {

      let totalDataCount = wx.getStorageSync('shouhousearchOrder')
      this.setData({
        listdata: totalDataCount
      })
    } else {
   
      this.listData();


    }

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