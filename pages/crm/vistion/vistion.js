var app = getApp()

Page({
  data: {
    page: '',
    totalDataCount: '',
    listdata: [],
    pfpage: '',
    pftotalDataCount: '',
    pflistdata: [],
    showModal: "",
    navbar: ['浏览', '批复'],
    currentTab: 0,

  },
  close: function () {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  //去历史
  gohistory: function (e) { 
    let index = e.currentTarget.dataset.index
    let pifu = e.currentTarget.dataset.pifu
    let datalist = this.data.listdata[index] 
    wx.setStorageSync('visitlist', datalist)
    wx.navigateTo({
      url: 'history?pifu='+pifu,
    })
  },
  navbarTap: function (e) { 
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //打电话
  calltel: function (e) { 
    let tel = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: tel
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
    if (e.currentTarget.dataset.biaos == '周边') {
      wx.navigateTo({
        url: 'periphery',
      })
    } else if (e.currentTarget.dataset.biaos == '搜索') {
      wx.navigateTo({
        url: 'search',
      })
    } else {
      wx.navigateTo({
        url: 'visit',
      })
    }

  },
  onLoad: function () {
    let listdata = wx.getStorageSync('bfserchlistdata')
    if (listdata == '') {
      wx.removeStorageSync('visitlist')
      this.datalist();
      this.pfdatalist();
    }

  },
  //获取列表
  datalist: function () {
    // 获取客户状态
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/custVisit?action=queryVisit&mobile=true&table=khbf&page=1&rows=20'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => { 
      let listdata = res.data.rows
      var totalDataCount = listdata.length;
      this.setData({
        listdata,
        page: page,
        totalDataCount: totalDataCount,
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading() 
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
    let url = app.globalData.url + '/custVisit?action=queryVisit&mobile=true&table=khbf&rows=20&page=' + page
    let data = new Object()
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


  //获取批复列表
  pfdatalist: function () {
    // 获取客户状态
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/custVisit?action=queryVisit&mobile=true&biaoshi=true&table=khbf&page=1&rows=20'
    let data = new Object()
    data.spstatusEQ = '0'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      let pflistdata = res.data.rows
      var totalDataCount = pflistdata.length;
      this.setData({
        pflistdata,
        pfpage: page,
        pftotalDataCount: totalDataCount,
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //请求下一页数据
  pfnext: function () {
    wx.showLoading();
    var page = this.data.pfpage;
    page += 1;
    let url = app.globalData.url + '/custVisit?action=queryVisit&mobile=true&table=khbf&biaoshi=true&rows=20&page=' + page
    let data = new Object()
    data.spstatusEQ = '0'
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.pftotalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let pflistdata = this.data.pflistdata
      this.setData({
        pflistdata: pflistdata.concat(res.data.rows),
        pfpage: page,
        pftotalDataCount: totalDataCount,
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

    if (this.data.currentTab == 0) {
      this.next() 
    } else {
      this.pfnext() 
    }
  },
  onShow: function () {
    let listdata = wx.getStorageSync('bfserchlistdata')
    if (listdata != '') {
      this.setData({
        listdata
      })
    }
  }
})