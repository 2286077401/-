// pages/crm/vistion/history.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pifu: "",
    listdata: [],
    visitlist: [], //上一页数据
    submitreturnvi: "", //回复内容
    // page: '',
    // totalDataCount: '',
  },
  powerDrawer: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.statu == 'open') {
      this.setData({
        showModalStatus: true,
      })
    } else {
      this.setData({
        showModalStatus: false,
      })
    }
  },
  //获取历史
  // data.accountid = this.data.visitlist.visitorid
  // data.custid = this.data.visitlist.custid
  gethistory: function (e) {
    wx.navigateTo({
      url: 'historydetail?visitorid=' + this.data.visitlist.visitorid + '&custid=' + this.data.visitlist.custid,
    })
    console.log(e)
  },
  //获取列表
  listData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    // var page = 1
    let url = app.globalData.url + '/custVisit?action=queryThisDetail&table=khbf'
    let data = new Object()
    data.id = this.data.visitlist.id
    data.custid = this.data.visitlist.custid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data
      console.log(res, data, url)
      this.setData({
        listdata,
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
  // //请求下一页数据
  // next: function () {
  //   wx.showLoading();
  //   var page = this.data.page;
  //   page += 1;
  //   let url = app.globalData.url + '/picture?action=getPicOfCusts&mobile=true&table=wjsc&rows=20&page=' + page
  //   let data = new Object()
  //   app.wxRequest("POST", url, {
  //     "parmas": JSON.stringify(data)
  //   }, (res) => {
  //     var list = res.data.rows;
  //     // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
  //     var totalDataCount = this.data.totalDataCount;
  //     console.log(url, data, res.data.rows)
  //     totalDataCount = totalDataCount + list.length;
  //    let listdata=this.data.listdata
  //     this.setData({
  //       listdata: listdata.concat(res.data.rows),
  //       page: page,
  //       totalDataCount: totalDataCount,
  //       // imgarr: imgarr.concat(imgarrl)
  //     })
  //     console.log(this.data.listdata)
  //     wx.hideLoading()
  //   }, (err) => {
  //     console.log(err)
  //     wx.showToast({
  //       title: '请求服务器出错',
  //       icon: "none"
  //     })
  //     wx.hideLoading()
  //   })
  // },
  // // 页面上拉触底事件的处理函数 
  // onReachBottom: function () {
  //   console.log('请求下一页')
  //   this.next()
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let visitlist = wx.getStorageSync('visitlist')
    console.log(visitlist)
    this.setData({
      visitlist,
      pifu: options.pifu
    })
    this.listData();
    console.log(this.data.pifu)
  },
  //回复内容
  returnvi: function (e) {
    console.log(e.detail.value)
    this.setData({
      submitreturnvi: e.detail.value
    })
  },
  //提交回复
  submitvi: function (e) {
    console.log(e)

    if(e.currentTarget.dataset.type=='huifu'){
        this.huifu()
    }else{
         this.pifu()
    }
 
  },
  //回复
  huifu: function () {
    wx.showLoading({
      title: '加载中..',
    })
    if(this.data.submitreturnvi==''||this.data.submitreturnvi==undefined){
      wx.showToast({
        title: '请输入评论内容',
        icon:"none"
      })
      return ;
     }
    // var page = 1
    let url = app.globalData.url + '/custVisit?action=addRevert&table=khbf'
    let data = new Object()
    data.table = "bfpf"
    data.visiteid = this.data.visitlist.id
    data.content = this.data.submitreturnvi

    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res, data, url)
      if (res.data == "true") {
        this.listData();
        wx.showToast({
          title: "回复成功",
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.data,
        })
      }
    }, (err) => {
      wx.hideLoading();
      console.log(err, data, url)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //批复
  pifu: function () {
    wx.showLoading({
      title: '加载中..',
    })
    if(this.data.submitreturnvi==''||this.data.submitreturnvi==undefined){
      wx.showToast({
        title: '请输入批复内容',
        icon:"none"
      })
      return ;
     }
    // var page = 1
    let url = app.globalData.url + '/custVisit?action=addVisitRe&table=khbf'
    let data = new Object()
    data.table = "bfpf"
    data.visiteid = this.data.visitlist.id
    data.content = this.data.submitreturnvi

    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res, data, url)
      if (res.data == "true") {
        this.listData();
        wx.showToast({
          title: "批复成功",
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.data,
        })
      }
    }, (err) => {
      wx.hideLoading();
      console.log(err, data, url)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //
  govisit: function (e) {

    // visitlist
    wx.reLaunch({
      url: 'visit?modify=true',
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