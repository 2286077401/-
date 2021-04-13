// packageA/pages/map/saleprosales/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    barcustid: "",
    listdata: [],
    page: '',
    totalcount: '',
  },
  //跳转柱状图
  bardetail(e) {
    let arr = []
    arr.push(e.currentTarget.dataset.baritem) 
    let showtype = this.data.showtype
    wx.setStorageSync('baritem', arr) 
    wx.navigateTo({
      url: '../custprosales',
    })
  },

  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    if (options.showtype == '客户产品销售分析数据统计详情搜索') {
      let nextlistdata = decodeURIComponent(options.getmaplist) 
      this.setData({
        listdata: JSON.parse(nextlistdata),
        next: options.next,
        showtype: options.showtype
      })
      this.listData('',options.nameid, '', '', '&isstat=true');
      return;
    }
    this.setData({
      barcustid: options.custid
    })
    this.listData('', this.data.barcustid, '', '', '');
    this.listData('', this.data.barcustid, '', '', '&isstat=true');
  },
  listData: function (proidEQ, custid, saletimeGE, saletimeLE, isstat) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/report?action=custProDetail&rows=20&page=1' + isstat
    let data = new Object()
    data.proidEQ = proidEQ
    data.custid = custid
    data.saletimeGE = saletimeGE
    data.saletimeLE = saletimeLE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows != '') {
        var totalcount = res.data.rows.length
        if (res.data.rows[0].totalcountall != undefined) {
          this.setData({
            totalcountall1: res.data.rows[0].totalcountall,
            totalmoneyall1: res.data.rows[0].totalmoneyall,
          })
          return;
        }
        this.setData({
          listdata: res.data.rows,
          page,
          totalcount,
        })
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
  next: function (proidEQ, custid, saletimeGE, saletimeLE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = this.data.page
    page += 1
    let url = app.globalData.url + '/report?action=custProDetail&rows=20&page=' + page
    let data = new Object()
    data.proidEQ = proidEQ
    data.custid = custid
    data.saletimeGE = saletimeGE
    data.saletimeLE = saletimeLE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({})
      var totalcount = this.data.totalcount
      totalcount = totalcount + res.data.rows.length 
      if (res.data.rows != '') {

        this.setData({
          listdata: this.data.listdata.concat(res.data.rows),
          page,
          totalcount,
        })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //跳转echart柱状图
  ranking: function () { 
    wx.navigateTo({
      url: '../custprosales?custprosaleslistnext=' + JSON.stringify(this.data.custprosaleslistnext),
    })

  },
  serch(e) { 
    let serchstate = '客户产品销售分析数据统计详情搜索'
    wx.navigateTo({
      url: '../serchdate?serchstate=' + serchstate,
    })
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
    this.next();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})