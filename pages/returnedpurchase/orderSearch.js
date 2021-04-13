// pages/orderManagement/orderSearch.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stadate: '',
    enddate: '',
    stadateend: '',
    enddateend: '',
    orderNo: "",
    khName: "",
    ywyName: "",
    hideShare: "",
    biaos: "",
    getKhname: '',
    getywyName: '',
    user: [],
    inputShow: true,
    ywynameData: "",
    ywynameid: "",
    Khnameid: "",
    yewuyuanlistdata: '',
    paidtype: '',
    paidtypeid: '',
  },
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () { 
    this.next()
  },
  //搜索
  
  searchBtn: function () {
    var that = this;
    var page = 1
    wx.showLoading();

    let url = app.globalData.url + '/goodsreturn?action=queryReturn&page=1&rows=50&table=thxx'
    let data = new Object()
    data.returnnoLIKE = this.data.orderNo
    if (this.data.khnameid == undefined) {
      data.custidEQ = ''
    } else {
      data.custidEQ = this.data.khnameid
    }

    // data.returntimeGE = this.data.enddate//开始
    // data.returntimeLE = this.data.enddateend//开始至
    data.applytimeGE = this.data.stadate //结束
    data.applytimeLE = this.data.stadateend //结束至
    // data.rows='10'
    // data.page='0'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows
      var totalDataCount = list.length; 
      that.setData({
        dataArray: list,
        page: page,
        totalDataCount: totalDataCount
      })
      if (list != '') {
        let liststr = JSON.stringify(list)
        wx.reLaunch({
          url: '/pages/returnedpurchase/returnedpurchase?flag=serch&serchlistdata=' + liststr,
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '未搜索到内容',
          icon: "none"
        })
      }
    }, (err) => { 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
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
  //获取业务员名称
  getywyName: function (options) { 
    this.setData({
      getywyName: options.detail.value
    })
  },
  //搜索对应客户名称
  serchKhname: function () { 
    if (this.data.biaos == 'getKhname') {
      this.khName();
    } else if (this.data.biaos == 'ywyName') {
      this.ywyName();
    }

  },
  //确认客户名称
  confirmKhname: function (e) {
    // getKhname: 
    this.yewuyuanlist(e.currentTarget.dataset.khnameid)
    if (this.data.biaos == 'getKhname') {
      this.setData({
        getKhname: e.currentTarget.dataset.index,
        khnameid: e.currentTarget.dataset.khnameid
      })
    } else if (this.data.biaos == 'ywyName') {
      this.setData({
        getywyNamee: e.currentTarget.dataset.index,
        ywynameid: e.currentTarget.dataset.ywynameid,
      })
    }
  },
  //获取业务员
  //付款方式
  yewuyuanlist: function (custid) {
    let url = app.globalData.url + '/account?action=getPrincipalByCust'
    let data = new Object()
    // data.rows='10'
    data.custidEQ = custid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        yewuyuanlistdata: res.data,
        paidtype: res.data[0].name,
        paidtypeid: res.data[0].id,
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },
  //清除表单数据
  remove: function () {
    this.setData({
      stadate: "",
      enddate: "",
      stadateend: "",
      enddateend: "",
      orderNo: "",
      khName: "",
      ywyName: "",
      nameData: [],
      page: '',
      totalDataCount: '',
      getKhname: "",
    })
  },
  //获取客户名称第一页
  khName: function () {
    var page = 1
    this.setData({
      dataArray: []
    })
    wx.showLoading();
    let url = app.globalData.url + '/customer?action=getSelectName&page=' + page + '&rows=20'
    let data = new Object()
    data.isvalidEQ = '1'
    data.nameLIKE = this.data.getKhname
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      var list = res.data.rows
      var totalDataCount = list.length;
      this.setData({
        nameData: res.data.rows,
        page: page,
        totalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => { 
      wx.hideLoading()
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },

  //获取业务员名称第一页
  ywyName: function () {
    var page = 1
    this.setData({
      dataArray: []
    })
    wx.showLoading();
    let url = app.globalData.url + '/account?action=getPrincipals&page=' + page + '&rows=20'
    let data = new Object()
    data.nameLIKE = this.data.getywyName
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      var list = res.data.rows
      var totalDataCount = list.length;
      this.setData({
        ywynameData: res.data.rows,
        page: page,
        totalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => { 
      wx.hideLoading()
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },

  //请求下一页客户名称数据
  next: function () {
    wx.showLoading();
    if (this.data.biaos == 'getKhname') {
      var page = this.data.page;
      page += 1;
      let url = app.globalData.url + '/customer?action=getSelectName&page=' + page + '&rows=20'
      let data = new Object()
      data.isvalidEQ = '1'
      data.nameLIKE = this.data.getKhname
      //  data.rows='10'
      //  data.page=page
      app.wxRequest("POST", url, {
        "parmas": JSON.stringify(data)
      }, (res) => { 
        var list = res.data.rows;
        // 计算当前共加载了多少条数据，
        var totalDataCount = this.data.totalDataCount; 
        // totalDataCount = totalDataCount + list.length;
        let nameData = this.data.nameData
        this.setData({
          nameData: nameData.concat(res.data.rows),
          page: page,
          totalDataCount: totalDataCount
        }) 
        wx.hideLoading()
      }, (err) => { 
        wx.showToast({
          title: '请求服务器出错',
          icon: "none"
        })
        wx.hideLoading()
      })
    } else if (this.data.biaos == 'ywyName') {
      var page = this.data.page;
      page += 1;
      let url = app.globalData.url + '/account?action=getPrincipals&page=' + page + '&rows=20'
      let data = new Object()
      data.isvalidEQ = '1'
      data.nameLIKE = this.data.getywyName
      //  data.rows='10'
      //  data.page=page
      app.wxRequest("POST", url, {
        "parmas": JSON.stringify(data)
      }, (res) => { 
        var list = res.data.rows;
        // 计算当前共加载了多少条数据，
        var totalDataCount = this.data.totalDataCount; 
        // totalDataCount = totalDataCount + list.length;
        let ywynameData = this.data.ywynameData
        this.setData({
          ywynameData: ywynameData.concat(res.data.rows),
          page: page,
          totalDataCount: totalDataCount
        }) 
        wx.hideLoading()
      }, (err) => { 
        wx.showToast({
          title: '请求服务器出错',
          icon: "none"
        })
        wx.hideLoading()
      })
    }
  },
  //获取业务员


  //开始时间
  bindstaDateChange: function (e) { 
    this.setData({
      enddate: e.detail.value
    })
  },
  //至
  bindstaDateChangeend: function (e) { 
    this.setData({
      enddateend: e.detail.value
    })
  },
  //结束时间
  bindendDateChange: function (e) { 
    this.setData({
      stadate: e.detail.value
    })
  },
  //至
  bindendDateChangeend: function (e) { 
    this.setData({
      stadateend: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // var timestamp = Date.parse(new Date());
    // var date = new Date(timestamp);
    // // //获取年份  
    // var year = date.getFullYear();


    // //获取月份  
    // var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    // // //获取当日日期   
    // let lastmonth = Number(month) - 1
    // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // let lastday = new Date(year, month + 1, 0).getDate()
    // if (day < 15) {
    //   lastday = 1
    // }
    // let stadate = year + '-' + month + '-' + day
    // let enddate = year + '-' + lastmonth + '-' + lastday
    // console.log(day, "----------------------------", year + '-' + month + '-' + day)
    // console.log(day, "----------------------------", year + '-' + lastmonth + '-' + lastday)
    // this.setData({
    //   stadate,
    //   enddate,
    //   stadateend:stadate,
    //   enddateend:enddate,
    // })
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