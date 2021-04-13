// pages/msg/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    approvalarr: [],
    returnarr: [],
    replyarr: [],
    cgarr: [],
    bxarr: [],
    sqarr: [],
  },
  //订单审批
  //获取列表
  listData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/order?action=getBeansForAudit&table=ddxx&rows=50&page=1'
    let data = new Object()
    data.spstatusEQ="0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var approvalarr = []
      var approval = listdata.map(function (option) {
        if (option.spnodename != '审批结束') {
          approvalarr.push(option.spnodename)
        } else {
          return;
        }
      })
      console.log(approvalarr)
      this.setData({
        approvalarr,
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
  //日志审批
  // 获取列表
  splistData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/dailyreport?action=getBeansDepart&sort=createtime&order=desc&allflag=1&page=1&rows=50'
    let data = new Object()
    data.isreplyEQ="0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res, data, url, res.data.logisticsno)
      let listdata = res.data.rows
      var replyarr = []
      var reply = listdata.map(function (option) {
        if (option.isreply == '0') {
          replyarr.push(option.isreply)
        } else {
          return;
        }
      })
      console.log(replyarr)
      this.setData({
        replyarr,
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
  //退货审批
  //获取列表
  thlistData: function () {
    wx.showLoading({
      title: '加载中..',
    })

    let url = app.globalData.url + '/goodsreturn?action=getReturnBeans&table=thxx&rows=20&page=1'
    let data = new Object()
    data.spstatusEQ="0"
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var returnarr = []
      var returns = listdata.map(function (option) {
        if (option.spnodename != '审批结束') {
          returnarr.push(option.spnodename)
        } else {
          return;
        }
      })
      console.log(returnarr)
      this.setData({
        returnarr,
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
  //采购审批
  cglistData: function () {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })

    let url = app.globalData.url + '/purchase?action=getPurchaseSP&table=cgd&rows=40&page=1'
    let data = new Object()
    data.spstatusEQ = "0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var cgarr = []
      var cg = listdata.map(function (option) {
        if (option.spnodename != '审批结束') {
          cgarr.push(option.spnodename)
        } else {
          return;
        }
      })
      console.log(cgarr)
      this.setData({
        cgarr,
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
  //费用报销

  fybxcglistData: function () {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })

    let url = app.globalData.url + '/costapply?action=getReimSPBeans&table=fybx&rows=20&page=1'
    let data = new Object()
    data.isspEQ = "0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var bxarr = []
      var bx = listdata.map(function (option) {
        if (option.spnodename != '审批结束') {
          bxarr.push(option.spnodename)
        } else {
          return;
        }
      })
      console.log(bxarr)
      this.setData({
        bxarr,
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
  //费用申请
  //获取列表
  fysqlistData: function () {

    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/costapply?action=getSPBeans&table=fysq&sort=applytime&order=desc&rows=20&page=1'
    let data = new Object()
    data.isspEQ="0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data.rows
      var sqarr = []
      var sq = listdata.map(function (option) {
        if (option.spnodename != '审批结束') {
          sqarr.push(option.spnodename)
        } else {
          return;
        }
      })
      console.log(sqarr)
      this.setData({
        sqarr,
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

  click: function (e) {
    console.log(e.currentTarget.dataset.biaos)
    let biaos = e.currentTarget.dataset.biaos
    if (biaos == 'order') {
      wx.navigateTo({
        url: './notice/order',
      })
    } else if (biaos == 'journal') {
      wx.navigateTo({
        url: './notice/journal',
      })
    } else if (biaos == 'return') {
      wx.navigateTo({
        url: './notice/return',
      })
    } else if (biaos == 'purchase') {
      wx.navigateTo({
        url: './notice/purchase',
      })
    } else if (biaos == 'reimbursement') {
      wx.navigateTo({
        url: './notice/reimbursement',
      })
    } else {
      wx.navigateTo({
        url: './notice/apply',
      })
    }
    this.setData({
      biaos: e.currentTarget.dataset.biaos
    })
    // wx.showToast({
    //   title: '建设中..',
    //   icon: "none"
    // })
    // return;
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listData();
    this.splistData();
    this.thlistData();
    this.cglistData();
    this.fybxcglistData();
    this.fysqlistData();
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
    this.splistData();
    this.thlistData();
    this.fybxcglistData();
    this.fysqlistData();
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