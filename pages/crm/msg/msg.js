// pages/crm/msg/msg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: "",
    //客户信息浏览
    khMsgdata: '',
    page: '',
    totalDataCount: '',
    serchtype: "",
  },
  //客户信息
  //获取列表
  khMsglistData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/customer?action=getBeans&table=khxx&rows=10&page=1&mobile=true'
    let data = new Object()
    data.isvalidEQ = '1'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let khMsgdata = res.data.rows
      var totalDataCount = khMsgdata.length; 
      this.setData({
        khMsgdata,
        // dataArray: khMsgdata,
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
    let url = app.globalData.url + '/customer?action=getBeans&table=khxx&mobile=true&rows=10&page=' + page
    let data = new Object()
    data.isvalidEQ = '1'
    //  data.rows='10'
    //  data.page=page
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let khMsgdata = this.data.khMsgdata
      // let imgarrl = []
      // for (let i = 0; i < list.length; i++) {
      //   let arr = list[i].pathlist
      //   let str = JSON.parse(arr) 
      //   imgarrl.push(str[0])
      // } 
      // let imgarr = this.data.imgarr
      this.setData({
        khMsgdata: khMsgdata.concat(res.data.rows),
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
    if (this.data.serchtype == 'serch') {
      wx.showToast({
        title: '已加载全部搜索内容',
        icon:"none"
      })
    } else {
      this.next()
    }

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
    if (e.currentTarget.dataset.biaos == 'serch') {
      wx.reLaunch ({
        url: 'search',
      })
    } else {
      wx.setStorageSync('isModify', true)
      wx.reLaunch({
        url: 'add',
      })
    }
  },
  closemask: function (e) {
    this.setData({
      showModal: false
    })
  },
  //跳转详情
  godetail: function (e) {

    let item = e.currentTarget.dataset.item
    let jsoni = JSON.stringify(item) 
    let jsonitem = encodeURIComponent(jsoni)
    wx.navigateTo({
      url: 'add?item=' + jsonitem,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      serchtype: options.type
    })
    let serchdata = wx.getStorageSync('serchdata')  
    if (serchdata != '') {
      this.setData({
        khMsgdata: serchdata
      })
    } else {
      this.khMsglistData();
    }

  },
  onShow: function () { 
    wx.setStorageSync('isModify', false)
    let serchdata = wx.getStorageSync('serchdata') 
    if (serchdata != '') {
      this.setData({
        khMsgdata: serchdata
      })
    } else {
      this.khMsglistData();
    }
    if (this.data.serchtype != 'serch') {
      this.khMsglistData(); 
    }  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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