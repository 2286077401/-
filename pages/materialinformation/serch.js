// pages/inventorymanagement/serch.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    biaos: '',
    showModalStatus: false,
    khNamelistdata: [],
    page: '',
    totalDataCount: '',
    inputname:'',
  },

  getkhName: function (e) {
    console.log(e)
    this.setData({
      name: e.currentTarget.dataset.khname,
      showModalStatus: false,
    })

  },
  //模态框
  powerDrawer: function (e) {
    console.log(e)
    var currentStatu = e.currentTarget.dataset;
    let biaos = e.currentTarget.dataset.biaos
    this.setData({
      biaos,
    })
    this.util(currentStatu)
    if (currentStatu.biaos == 'khName') {
      this.khName();
    }
  },
  serchinputname:function(){
    this.khName(this.data.inputname)
  },
  khName: function (inputname) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/order?action=fuzzyQuery&table=cpxx&mobile=true&rows=20&page=1'
    let data = new Object()
    data.proname = this.data.inputname

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      console.log(res, JSON.stringify(data), url)
      var totalDataCount = res.data.rows.length;
      this.setData({
        khNamelistdata: res.data.rows,
        page: page,
        totalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  serchinput: function (e) {
    console.log(e)
    this.setData({
      inputname: e.detail.value
    })
  },
  //请求下一页数据
  next: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/order?action=fuzzyQuery&table=cpxx&mobile=true&rows=20&page=' + page
    let data = new Object()
    data.proname = this.data.inputname
  

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      console.log(res, JSON.stringify(data), url)
      var totalDataCount = this.data.totalDataCount;
      totalDataCount = totalDataCount + res.data.rows.length;
      let khNamelistdata = this.data.khNamelistdata
      this.setData({
        khNamelistdata: khNamelistdata.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //动画
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu.statu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu.statu == "open") {
      this.setData({
        showModalStatus: true
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getinput: function (e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  cler: function () {
    this.setData({
      name: ''
    })
  },
  serch: function () {
    let name = this.data.name
    this.serchdata(name)
  },
  serchdata: function (name) {
    console.log('搜索数据')
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/order?action=fuzzyQuery&mobile=true&row=50&pages=1&table=cpxx'
    let data = new Object()
    data.proname = name
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      console.log(res, data, url)
      let listdate = res.data
      this.setData({
        listdate
      })
      if (listdate != '') {
        wx.setStorageSync('kcglserch', listdate)
        wx.reLaunch({
          url: 'materialinformation',
        })
      } else {
        wx.showToast({
          title: '未搜索到内容',
          icon: "none"
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