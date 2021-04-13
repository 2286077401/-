// pages/index/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clear:false,
    tabbalbarstr: "",
    lodaing: true,
    height: wx.getSystemInfoSync().windowHeight,
    hiddenName: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 产品销售区域分析
  getmapData: function (placeid, timege, timele, guige, city, county, proid) {
    let url = app.globalData.url + '/report?action=proSaleArea&rows=5&page=1'
    let data = new Object()
    data.placeidEQ = placeid
    data.cityEQ = city
    data.countyEQ = county
    data.proidEQ = proid
    data.specificationLIKE = guige //规格
    data.saletimeGE = timege
    data.saletimeLE = timele
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao0', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //客户产品销售分析
  custprosalesdata: function (id) {
    let url = app.globalData.url + '/report?action=custProSales&tjlx=detail&rows=5&page=1'
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao1', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //业务员产品销售分析
  salprosalBardata: function (id) {
    let url = app.globalData.url + '/report?action=salerFaHuoPaiMing&rows=5&page=1'
    let data = new Object()
    data.saleridEQ = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao2', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //产品发货销售分析
  prodelsalBardata: function (id, typeid, guige, getime, letime) {
    let url = app.globalData.url + '/report?action=proShipRank&rows=5&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.protypeidEQ = typeid
    data.specificationLIKE = guige
    data.saletimeGE = getime
    data.saletimeLE = letime
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao3', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //产品发货同期对比
  prodelperBardata: function (id, yeartimeEQ) {
    let url = app.globalData.url + '/report?action=productSendTongQiDuiBi&rows=5&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao4', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //客户发货同期对比
  cusdelperBardata: function (id, yeartimeEQ) {
    let url = app.globalData.url + '/report?action=custSendTongQiDuiBi&rows=5&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows != '') {
        wx.setStorageSync('databao5', res.data.rows)
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  onLoad: function (options) {
    this.setData({
      clear:false
    })
    let consol = wx.getStorageSync('consol')
    if (consol == 1) {
      this.setData({
        hiddenName: false,
        lodaing: false,
      })
      return;
    }
    this.gaibi();
  },
  gaibi: function () {
    this.setData({
      hiddenName: true
    })
  },
  clicklinqu: function () {
    wx.setStorageSync('consol', 1)
    let a = wx.getStorageSync('consol')
    this.setData({
      hiddenName: false,
      lodaing: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // app.globalData.selected= 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.setStorageSync('', '') 
    app.globalData.selected = 0
    this.setData({
      tabbalbarstr: app.globalData.selected
    }) 
    wx.setStorageSync('selected', 0)
    wx.removeStorageSync('index')
    wx.removeStorageSync('serchdata')
    wx.removeStorageSync('productMsg')
    wx.removeStorageSync('searchOrder')
    wx.removeStorageSync('kcglserch')
    wx.removeStorageSync('kccxserch')
    // wx.setStorageSync('productMsg', '')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      clear:true
    })
  
  },
  //关闭弹出层
  close: function () {
    this.setData({
      lodaing: false
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      clear:true
    })
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