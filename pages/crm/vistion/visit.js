// pages/crm/vistion/visit.js
var util = require('../../../utils/util')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputkhname: "",
    date: '2020-12-31',
    datelast: '',
    khname: "",
    khnameid: "",
    khzt: '',
    khztid: '',
    getlxr: [],
    lxrmsg: [],
    khaddress: "",
    yqcjmoney: "",
    visitgoal: "",
    conversation: "",
    nexttime: "",
    note: "",
    //传递参数
    lastdata: "",
    modify: 'false',
    //motai
    showModalStatus: false,
    //客户名称
    khnamelistdata: [],
    khnamepage: '',
    khnametotalDataCount: '',
    kinput:"",

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_visitedate = 'transmitdata.visitedate'
      this.setData({
        date: e.detail.value,
        [transmitdata_visitedate]: e.detail.value,
      })
    } else {
      this.setData({
        date: e.detail.value
      })
    }

  },
  bindDateChangelast: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_nextvisitetime = "transmitdata.nextvisitetime"
      this.setData({
        datelast: e.detail.value,
        [transmitdata_nextvisitetime]: e.detail.value,
      })
    } else {
      this.setData({
        datelast: e.detail.value
      })
    }

  },
  //客户名称
  khName: function (e) {
    console.log(e)
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_custname = 'transmitdata.custname'
      this.setData({
        khName: e.detail.value,
        [transmitdata_custname]: e.detail.value
      })
    }
    this.setData({
      khName: e.detail.value
    })
  },
  //客户地址
  khaddress: function (e) {
    console.log(e)
    this.setData({
      khaddress: e.detail.value
    })
  },
  //预期成交金额
  yqcjmoney: function (e) {
    console.log(e)
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_forecastmoney = 'transmitdata.forecastmoney'

      this.setData({
        [transmitdata_forecastmoney]: e.detail.value,
        yqcjmoney: e.detail.value,
      })
    } else {
      this.setData({
        yqcjmoney: e.detail.value
      })
    }

  },
  //拜访目的
  visitgoal: function (e) {
    console.log(e)
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_purpose = 'transmitdata.purpose'
      this.setData({
        visitgoal: e.detail.value,
        [transmitdata_purpose]: e.detail.value,
        mudiinput:"ok",
      })
    } else {
      this.setData({
        visitgoal: e.detail.value
      })
    }

  },
  //洽谈说明
  conversation: function (e) {
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_visitecontent = 'transmitdata.visitecontent'
      this.setData({
        conversation: e.detail.value,
        [transmitdata_visitecontent]: e.detail.value,
        qiatancontent:"ok"
      })
    } else {
      this.setData({
        conversation: e.detail.value
      })

    }
    console.log(e)

  },
  //下次拜访目的
  nexttime: function (e) {
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_nextvisitepurpose = 'transmitdata.nextvisitepurpose'
      this.setData({
        nexttime: e.detail.value,
        [transmitdata_nextvisitepurpose]: e.detail.value,
      })
    } else {

      this.setData({
        nexttime: e.detail.value
      })
    }
    console.log(e)

  },
  //备注
  note: function (e) {
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      let transmitdata_note = 'transmitdata.note'
      this.setData({
        note: e.detail.value,
        [transmitdata_note]: e.detail.value,
      })
    } else {
      this.setData({
        note: e.detail.value
      })
    }
    console.log(e)
    this.setData({
      note: e.detail.value
    })
  },
  //提交拜访
  submitbf: function () {
    // 获取客户状态
    wx.showLoading({
      title: '加载中...',
    })
 
    if (this.data.modify == 'false') {
      let url = app.globalData.url + '/custVisit?action=addVisit'
      let data = new Object()
      if(this.data.yqcjmoney==''||this.data.conversation==''||this.data.visitgoal==''||this.data.khzt==''){
     wx.showToast({
       title: '请填写必填项',
       icon:"none"
     })
     return ;
      }
       data.linker = this.data.getlxr[0].linker,
        data.linkertel = this.data.getlxr[0].cellno,
        data.visitedate = this.data.date,
        data.visitecontent = this.data.conversation,
        data.purpose = this.data.visitgoal,
        data.table = "khbf",
        data.nextvisitetime = this.data.datelast,
        data.nextvisitepurpose = this.data.nexttime,
        data.forecastmoney = this.data.yqcjmoney,
        data.tracelevelid = String(this.data.khztid),
        data.tracelevel = this.data.khzt,
        data.note = this.data.note,
        data.custname = this.data.khname,
        data.custid = String(this.data.khnameid)
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res, JSON.stringify(data), url)
        wx.hideLoading()
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 2000)
        wx.showToast({
          title: res.data,
        })
      }, (err) => {
        wx.hideLoading()
        console.log(err)
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })

    } else {
      let url = app.globalData.url + '/custVisit?action=addVisit'
      let data = new Object()
      let mudi;
      let nextpurpose;
      let nextnote;
      if(this.data.mudiinput=='ok'&&this.data.qiatancontent=='ok'){
        mudi = this.data.transmitdata.purpose
        nextpurpose = this.data.transmitdata.nextvisitetime
        // nextnote = this.data.transmitdata.note
       
      }else{
       
        mudi = ''
        nextpurpose = ''
        nextnote = ''
      }
      console.log(nextpurpose,mudi)
      if(nextpurpose ==''||mudi==''||this.data.transmitdata.linker==''||this.data.transmitdata.forecastmoney==''||this.data.transmitdata.purpose==''||this.data.transmitdata.visitecontent==''){
        wx.showToast({
          title: '请填写必填项',
          icon:"none"
        })
        return ;
         }
      data.linker = this.data.transmitdata.linker,
        data.linkertel = this.data.transmitdata.linkertel,
        data.visitedate = this.data.transmitdata.visitedate,
        data.visitecontent = this.data.transmitdata.visitecontent,
        data.purpose=mudi,
        data.table = "khbf",   
      
        data.nextvisitetime = this.data.transmitdata.nextvisitetime,
        data.nextvisitepurpose = nextpurpose,
        data.forecastmoney = this.data.transmitdata.forecastmoney,
        data.tracelevelid = String(this.data.transmitdata.tracelevelid),
        data.tracelevel = this.data.transmitdata.tracelevel,
        data.note = nextnote,
        data.custname = this.data.transmitdata.custname,
        data.custid = String(this.data.transmitdata.custid)
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res, JSON.stringify(data), url)

        wx.showToast({
          title: res.data,
        })
        setTimeout(() => {
          wx.reLaunch({
            url: 'vistion',
          })
        }, 2000)
        wx.hideLoading()
      }, (err) => {
        wx.hideLoading()
        console.log(err)
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    }
  },
  //获取客户名称
  getkhdetail: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&rows=20&page=1'
    let data = new Object()
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      let listdata = res.data.rows
      var totalDataCount = listdata.length;
      console.log(res, JSON.stringify(data), url)
      this.setData({
        getkhnamedata: listdata,
        tkhnamepage: page,
        tkhnametotalDataCount: totalDataCount
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
  //请求下一页客户名称数据
  khnamenext: function () {
    wx.showLoading();
    var page = this.data.khnamepage;
    page += 1;
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&rows=20&page=' + page
    let data = new Object()
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      let listda = res.data.rows
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.khnametotalDataCount;
      console.log(url, data, res.data.rows)
      totalDataCount = totalDataCount + listda.length;
      let listdata = this.data.getkhnamedata
      this.setData({
        getkhnamedata: listdata.concat(res.data.rows),
        khnamepage: page,
        khnametotalDataCount: totalDataCount,
        // imgarr: imgarr.concat(imgarrl)
      })
      console.log(this.data.listdata)
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  next: function () {
    if (this.data.biaos == 'khname') {
      this.khnamenext();
    }
  },
  //选择的客户姓名
  getchoosekhname: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      console.log('1111111111111111111111111')
      let transmitdata_custname = 'transmitdata.custname'
      let transmitdata_custid = 'transmitdata.custid'
      this.setData({
        khname: e.currentTarget.dataset.name,
        khnameid: e.currentTarget.dataset.khnameid,
        [transmitdata_custname]: e.currentTarget.dataset.name,
        [transmitdata_custid]: e.currentTarget.dataset.khnameid,
      })
      this.lxr(e.currentTarget.dataset.khnameid)
      this.lxrmsg(e.currentTarget.dataset.khnameid)
      console.log(this.data.transmitdata)
    } else {
      console.log('-------------------------------------')
      this.setData({
        khname: e.currentTarget.dataset.name,
        khnameid: e.currentTarget.dataset.khnameid,
      })
      this.lxr(e.currentTarget.dataset.khnameid)
      this.lxrmsg(e.currentTarget.dataset.khnameid)
    }
    console.log(e)
  },
  //获取客户状态
  getkhzt: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/sysbase?action=getSelectType&type=manageclass'
    let data = new Object()
    // data.custidEQ = this.data.transmitdata.custid
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, JSON.stringify(data), url)
      this.setData({
        getkhztdata: res.data,
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
  //选择客户状态
  getchoosekhzt: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
      console.log('111111111111111111')
      let transmitdata_tracelevel = 'transmitdata.tracelevel'
      let transmitdata_tracelevelid = 'transmitdata.tracelevelid'
      this.setData({
        [transmitdata_tracelevel]: e.currentTarget.dataset.name,
        [transmitdata_tracelevelid]: e.currentTarget.dataset.khnameid,
        khzt: e.currentTarget.dataset.name,
        khztid: e.currentTarget.dataset.khnameid,
      })
      console.log(this.data.transmitdata.tracelevelid, e.currentTarget.dataset.khnameid)
    } else {
      console.log('------------------')
      this.setData({
        khzt: e.currentTarget.dataset.name,
        khztid: e.currentTarget.dataset.khnameid,
      })
    }

    console.log(e)
  },
  //联动联系人
  lxr: function (custid) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/custVisit?action=getLinker&table=khlxr'
    let data = new Object()
    data.custidEQ = custid
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, {
        "data": JSON.stringify(data)
      }, url)
      if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
        let transmitdata_custname = 'transmitdata.custname'
        this.setData({
          getlxr: res.data,
          [transmitdata_custname]: res.data[0].linker
        })
      } else {
        this.setData({
          getlxr: res.data,
        })
      }
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
  //联动详情
  lxrmsg: function (custid) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/custVisit?action=getCustInfo&table=khlxr'
    let data = new Object()
    data.custidEQ = custid
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, {
        "data": JSON.stringify(data)
      }, url)
      if (this.data.transmitdata != '' || this.data.transmitdata != undefined) {
        let transmitdata_address = 'transmitdata.address'
        this.setData({
          [transmitdata_address]: res.data[0].receiveaddr,
          lxrmsg: res.data,
        })
      } else {
        this.setData({
          lxrmsg: res.data,
        })
      }


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
  //公共模态框
  //模态框
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
  powerDrawer: function (e) {
    console.log(e)
    var currentStatu = e.currentTarget.dataset;
    let biaos = e.currentTarget.dataset.biaos
    this.setData({
      biaos,
    })
    this.util(currentStatu)
    if (biaos == 'khzt') {
      this.getkhzt()
    } else if (biaos == 'xgkhzt') {
      this.getkhzt()
    } else if (biaos == 'khname') {
      this.getkhdetail();
    } else if (biaos == 'xgkhname') {
      this.getkhdetail();
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = util.getnewData();
    this.setData({
      datelast:time
    })
    console.log(options.modify, time)
    if (options.modify == undefined || options.modify == '') {

    } else {
      let lastdata = wx.getStorageSync('visitlist')
      console.log(lastdata)
      this.setData({
        transmitdata: lastdata,
        modify: options.modify
      })
    }
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