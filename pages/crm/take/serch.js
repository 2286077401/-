// pages/orderManagement/orderSearch.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // stadate: '',
    // enddate: '',
    orderNo: "",
    khName: "",
    // ywyName: "",
    hideShare: "",
    biaos: "",
    getKhname: '',
    // getywyName: '',
    user: [],
    inputShow: true,
    // ywynameData: "",
    // ywynameid: "",
    Khnameid: "",
  },
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () { 
    if(this.data.searchOrder==''||this.data.searchOrder==undefined){
    this.next()
    }else{
      wx.showToast({
        title: '已加载全部搜索内容',
        icon:"none "
      })
    }

  },
  //搜索
  searchBtn: function () {
    wx.showLoading()
    let url = app.globalData.url + '/picture?action=getPicOfCusts&page=1&rows=100&mobile=true&table=wjsc'
    let data = new Object();
    data.pictypeidEQ = this.data.khnameid
    data.custnameLIKE = this.data.orderNo
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      let str = res.data.rows
      wx.setStorageSync('searchOrder', str)
      wx.setStorageSync('takereturn', true)
      this.setData({
        searchOrder: str
      })
      if (str == '') {
        wx.showToast({
          title: '未搜索到内容',
          icon: "none"
        })
        return ;
      }
      wx.navigateBack({
        delta: 0,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
      // ({
      //   url: 'take',
      // })


    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  //获取用户输入订单号
  getorderNo: function (options) { 
    this.setData({
      orderNo: options.detail.value
    })
  },
  // 模块遮罩层
  chooseShare: function (e) {
    this.setData({
      biaos: e.currentTarget.dataset.biaos
    })
    if (e.currentTarget.dataset.biaos == 'getKhname') {
      this.khName() 
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
    } else if (e.currentTarget.dataset.biaos == 'ywyName') {
      this.ywyName() 
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
    }


  },
  // 模块遮罩层
  chooseSharee: function (e) {
    this.khName() 
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
   
  //确认客户名称
  confirmKhname: function (e) { 
    if (this.data.biaos == 'getKhname') {
      this.setData({
        getKhname: e.currentTarget.dataset.index,
        khnameid: e.currentTarget.dataset.khnameid
      })
    }
    // else if (this.data.biaos == 'ywyName') {
    //   this.setData({
    //     getywyNamee: e.currentTarget.dataset.index,
    //     ywynameid: e.currentTarget.dataset.ywynameid,
    //   })
    // }
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
  //获取客户名称第一页
  khName: function () {
    wx.showLoading()
    let url = app.globalData.url + '/picture?action=getPicTypeInBase'
    let data = new Object();
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      let str = res.data

      this.setData({
        nameData: str,
      })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },


   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})