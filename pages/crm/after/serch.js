// pages/orderManagement/orderSearch.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchlist: [],
    stadate: '',
    enddate: '',
    nameData: [{
      id: '1',
      name: '是'
    }, {
      id: '0',
      name: '否'
    }],
    khName: "",

    hideShare: "",
    biaos: "",
    getKhname: '',

    user: [],
    inputShow: true,

    Khnameid: "",
  },
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () {

  },
  bindTimeChange: function (e) { 
    this.setData({
      time: e.detail.value
    })
  },
  //搜索
  searchBtn: function () {
    wx.showLoading()
    let url = app.globalData.url + '/questions?action=searchQusetion&page=1&rows=50'
    let data = new Object();
    data.isdealEQ = this.data.khnameid
    data.submittimeGE = this.data.enddate
    data.submittimeLE = this.data.stadate
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      let str = res.data.rows
      // let searchOrder = JSON.stringify(str)
   wx.setStorageSync('shouhousearchOrder', str)
   wx.setStorageSync('shouhouisSearch', 'false')
      this.setData({
        searchlist: str
      })
      wx.navigateBack({
        delta: 0,
      })
      // ({
      //   url: 'after?searchOrder=' + searchOrder + '&isSearch=false',
      // })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },

  // 模块遮罩层
  chooseShare: function (e) {
    this.setData({
      biaos: e.currentTarget.dataset.biaos
    }) 
    var that = this;
    that.setData({
      biaos: e.currentTarget.dataset.biaos,
      inputShow: false
    })
    var hides = that.data.hideShare;
    if (hides == true) {
      that.setData({
        hideShare: false
      })
    } else if (hides == false) {
      that.setData({
        hideShare: true
      })
    }
  },
  // 模块遮罩层
  chooseSharee: function (e) { 
    var that = this;
    that.setData({
      biaos: e.currentTarget.dataset.biaos,
      inputShow: true,
      ywyNameid: e.currentTarget.dataset.ywyNameid,
    })
    var hides = that.data.hideShare;
    if (hides == true) {
      that.setData({
        hideShare: false
      })
    } else if (hides == false) {
      that.setData({
        hideShare: true
      })
    }
  },
  //获取客户名称
  getKhname: function (options) { 
    this.setData({
      getKhname: options.detail.value
    })
  },

  //搜索对应客户名称
  serchKhname: function () { 
  },
  //确认客户名称
  confirmKhname: function (e) { 
    this.setData({
      getKhname: e.currentTarget.dataset.index,
      khnameid: e.currentTarget.dataset.khnameid
    })
  },
  //清除表单数据
  remove: function () {
    this.setData({
      stadate: "",
      enddate: "",
      orderNo: "",
      khName: "",
      ywyName: "",
      nameData: [],
      page: '',
      totalDataCount: '',
    })
  },


  //获取业务员名称第一页


  //获取业务员


  //开始时间
  bindstaDateChange: function (e) { 
    this.setData({
      enddate: e.detail.value
    })
  },
  //结束时间
  bindendDateChange: function (e) { 
    this.setData({
      stadate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let lastmonth = Number(month) - 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let lastday = new Date(year, month + 1, 0).getDate()
    if (day < 15) {
      lastday = 1
    }
    let stadate = year + '-' + month + '-' + day
    let enddate = year + '-' + lastmonth + '-' + lastday 
    this.setData({
      stadate,
      enddate:'2020-11-01',
    })
    wx.getStorage({
      key: 'user',
      success(res) { 
        that.setData({
          user: res.data
        })
      }
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
  catchtouch: function () { 
    this.next()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})