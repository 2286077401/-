// pages/msg/msg.js
var util = require('../../../utils/util')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowtime:"",//当前时间
    newAjaxlength: "",
    approvalarr: [],
    returnarr: [],
    replyarr: [],
    cgarr: [],
    bxarr: [],
    sqarr: [],
    approvalnum: "",
  },
  golistpage: function (e) { 
    this.setData({
      biaos: e.currentTarget.dataset.biaos
    })
    if (e.currentTarget.dataset.biaos == '审批') {
      wx.navigateTo({
        url: 'notice',
      })
    } else if (e.currentTarget.dataset.biaos == '公告') {
      wx.navigateTo({
        url: 'approval',
      })
    } else if (e.currentTarget.dataset.biaos == '新闻') {

      wx.navigateTo({
        url: 'news',
      })
    } else if (e.currentTarget.dataset.biaos == '视频') {
      // wx.showToast({
      //   title: '建设中..',
      //   icon: "none"
      // })
      // return ;
      wx.navigateTo({
        url: 'video',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let time=util.getnewData();
   this.setData({
     nowtime:time
   }) 
    this.newAjax();
    this.approvalAjax();
    this.vidoAjax();
    let that = this
    setTimeout(function () {
      let num1 = that.data.approvalarr.length
      let num2 = that.data.returnarr.length
      let num3 = that.data.replyarr.length
      let num4 = that.data.cgarr.length
      let num5 = that.data.bxarr.length
      let num6 = that.data.sqarr.length 
      let approvalnum = num1 + num2 + num3 + num4 + num5 + num6
      that.setData({
        approvalnum
      })
    }, 2000);
  },
  newAjax: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/news?action=getBeans&table=xwgg&mobile=true'
    let data = new Object()
    data.typenameEQ = '新闻'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdata = res.data 
      var i = 0
      var isvisited = listdata.map(function (listdata) {
        if (listdata.isvisited == '0') {
          i++
        }
        return i
      }); 
      this.setData({
        newAjaxlength: isvisited[isvisited.length - 1]
      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  approvalAjax: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/news?action=getBeans&table=xwgg&mobile=true'
    let data = new Object()
    data.typenameEQ = '公告'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      let listdata = res.data
      var i = 0
      var isvisited = listdata.map(function (listdata) {
        if (listdata.isvisited == '0') {
          i++
        }
        return i
      }); 
      this.setData({
        approvalAjaxlength: isvisited[isvisited.length - 1]

      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  vidoAjax: function () {
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/news?action=getBeansVideo'
    let data = new Object()
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {

      let listdata = res.data
      var i = 0
      var isvisited = listdata.map(function (listdata) {
        if (listdata.isvisited == '0') {
          i++
        }
        return i
      }); 
      this.setData({
        vidolength: isvisited[isvisited.length - 1]
      })
      wx.hideLoading();
    }, (err) => {
      wx.hideLoading(); 
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
  //订单审批
  //获取列表
  ddlistData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/order?action=getBeansForAudit&table=ddxx&rows=50&page=1'
    let data = new Object()
    data.spstatusEQ = "0"
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
      this.setData({
        approvalarr,
      })
    }, (err) => {
      wx.hideLoading(); 
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
    data.isreplyEQ = "0"
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      let listdata = res.data.rows
      var replyarr = []
      var reply = listdata.map(function (option) {
        if (option.isreply == '0') {
          replyarr.push(option.isreply)
        } else {
          return;
        }
      }) 
      this.setData({
        replyarr,
      })

    }, (err) => {
      wx.hideLoading(); 
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
    data.spstatusEQ = "0"
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
      this.setData({
        returnarr,
      })
    }, (err) => {
      wx.hideLoading(); 
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
      this.setData({
        cgarr,
      })
    }, (err) => {
      wx.hideLoading(); 
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
      this.setData({
        bxarr,
      })
    }, (err) => {
      wx.hideLoading(); 
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
    data.isspEQ = "0"
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
      this.setData({
        sqarr,
      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.selected = 0
    this.setData({
      tabbalbarstr: app.globalData.selected
    }) 
    this.newAjax();
    this.approvalAjax();
    this.vidoAjax();
    this.ddlistData();
    this.splistData();
    this.thlistData();
    this.cglistData();
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