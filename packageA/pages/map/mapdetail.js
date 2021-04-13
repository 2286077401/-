// pages/map/mapdetail.js
const app = getApp();
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalid:'',
    totalcountall1: '',
    totalmoneyall1: '',
    totalcountall5: '',
    totalmoneyall5: '',
    next: '',
    getmaplist: [], //区域分析跳转传参
    getmapDatapage: '',
    getmapDatatotalCount: '',



    custprosaleslistnext: [],
    selarprosaleslistnext: [],
    prodelsalBardatalistnext: [],
    prodelperBardatalistnext: [],
    cusdelperBardatalistnext: [],



    showtype: "",
    getmapDatalist: [],
    custprosaleslist: [],
    selarprosaleslist: [],
    prodelsalBardatalist: [],
    prodelperBardatalist: [],
    cusdelperBardatalist: [],
  },
  //跳转详情
  prodetail(e) {
 
    wx.navigateTo({
      url: './saleprosales/detail?custid=' + e.currentTarget.dataset.barcustid,
    })
  },
  //跳转详情
  ywydetail(e) { 
    wx.setStorageSync('serchcustid', e.currentTarget.dataset.barcustid)
    wx.navigateTo({
      url: './custprosales/detail?custid=' + e.currentTarget.dataset.barcustid,
    })
  },
  //跳转柱状图
  bardetail(e) {
    let arr = []
    arr.push(e.currentTarget.dataset.baritem) 
    let showtype = this.data.showtype
    wx.setStorageSync('baritem', arr)
    if (showtype == '产品销售区域分析数据统计') { 
      wx.navigateTo({
        url: 'prosalesanalysis',
      })
    } else if (showtype == '客户产品销售分析数据统计') { 
      wx.navigateTo({
        url: 'custprosales',
      })
    } else if (showtype == '业务员产品销售分析数据统计') { 
      wx.navigateTo({
        url: 'saleprosales',
      })
    } else if (showtype == '产品发货销售分析数据统计') { 
      wx.navigateTo({
        url: 'prodelisales',
      })
    } else if (showtype == '产品发货同期对比数据统计') { 
      wx.navigateTo({
        url: 'compdatastat',
      })
    } else if (showtype == '客户发货同期对比数据统计') { 
      wx.navigateTo({
        url: 'compcusdsales',
      })
    }
  },
  serch(e) { 
    let serchstate = e.currentTarget.dataset.type
    wx.navigateTo({
      url: 'serchdate?serchstate=' + serchstate,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 产品销售区域分析
  getmapData: function (placeid, timege, timele, guige, city, county, proid, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var getmapDatapage = 1
    let url = app.globalData.url + '/report?action=proSaleArea&rows=20&page=1' + isstat
    let data = new Object()
    data.placeidEQ = placeid
    data.cityEQ = city
    data.countyEQ = county
    data.proidEQ = proid
    data.specificationLIKE = guige //规格
    data.saletimeGE = timege
    data.saletimeLE = timele
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows[0].totalcountall != undefined) {
        this.setData({
          totalcountall1: res.data.rows[0].totalcountall,
          totalmoneyall1: res.data.rows[0].totalmoneyall,
        })
        return;
      } 
      var getmapDatatotalCount = res.data.rows.length;
      // const custnamelist = officers.map(officer => officer.custname);
      // const allmoneylist = officers.map(officer => officer.allmoney);
      // const allcountlist = officers.map(officer => officer.allcount);
      this.setData({
        getmapDatalist: res.data.rows,
        // custnamelist,
        // allmoneylist,
        // allcountlist,
        getmapDatapage: getmapDatapage,
        getmapDatatotalCount: getmapDatatotalCount
      })

    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextgetmapData: function (placeid, timege, timele, guige, city, county, proid) {
    wx.showLoading({
      title: '加载中..',
    })
    var getmapDatapage = this.data.getmapDatapage;
    getmapDatapage += 1;
    let url = app.globalData.url + '/report?action=proSaleArea&rows=20&page=' + getmapDatapage
    let data = new Object()
    data.placeidEQ = placeid
    data.cityEQ = city
    data.countyEQ = county
    data.proidEQ = proid
    data.specificationLIKE = guige //规格
    data.saletimeGE = timege
    data.saletimeLE = timele
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      var getmapDatatotalCount = this.data.getmapDatatotalCount;
      getmapDatatotalCount = getmapDatatotalCount + res.data.rows.length;
      // const custnamelist = officers.map(officer => officer.custname);
      // const allmoneylist = officers.map(officer => officer.allmoney);
      // const allcountlist = officers.map(officer => officer.allcount);
      this.setData({
        getmapDatalist: this.data.getmapDatalist.concat(res.data.rows),
        getmapDatapage: getmapDatapage,
        getmapDatatotalCount: getmapDatatotalCount,
      })
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },

  //客户产品销售分析
  custprosalesdata: function (id, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var custprosalesdatapage = 1
    let url = app.globalData.url + '/report?action=custProSales&tjlx=' + isstat + '&rows=25&page=1'
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({})
      if (res.data.rows[0].allsendmoney != undefined) {
        this.setData({
          totalmoneyall2: res.data.rows[0].allsendmoney,
        })
        return;
      } 
      var custprosalestotalCount = res.data.rows.length;
      this.setData({
        custprosaleslist: res.data.rows,
        custprosalesdatapage: custprosalesdatapage,
        custprosalestotalCount: custprosalestotalCount
      })

    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextcustprosalesdata: function (id) {
    wx.showLoading({
      title: '加载中..',
    })
    var custprosalesdatapage = this.data.custprosalesdatapage;
    custprosalesdatapage += 1;
    let url = app.globalData.url + '/report?action=custProSales&tjlx=detail&rows=25&page=' + custprosalesdatapage
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      var custprosalestotalCount = this.data.custprosalestotalCount;
      custprosalestotalCount = custprosalestotalCount + res.data.rows.length;
      this.setData({
        custprosaleslist: this.data.custprosaleslist.concat(res.data.rows),
        custprosalesdatapage: custprosalesdatapage,
        custprosalestotalCount: custprosalestotalCount,
      })
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },

  //业务员产品销售分析数据统计
  selarprosalesdata: function (id, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var selarprosalesdatapage = 1
    let url = app.globalData.url + '/report?action=salerFaHuoPaiMing&rows=25&page=1' + isstat
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows[0].saler == undefined) {
        this.setData({
          totalcountall1: res.data.rows[0].totalcount,
          totalmoneyall1: res.data.rows[0].totalmoney,
        })
        return;
      }
      var selarprosalesCount = res.data.rows.length;
      this.setData({
        selarprosaleslist: res.data.rows,
        selarprosalesdatapage: selarprosalesdatapage,
        selarprosalesCount: selarprosalesCount
      })

    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextselarprosalesdata: function (id) {
    wx.showLoading({
      title: '加载中..',
    })
    var selarprosalesdatapage = this.data.selarprosalesdatapage;
    selarprosalesdatapage += 1;
    let url = app.globalData.url + '/report?action=salerFaHuoPaiMing&rows=25&page=' + selarprosalesdatapage
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {

      var selarprosalesCount = this.data.selarprosalesCount;
      selarprosalesCount = selarprosalesCount + res.data.rows.length;
      this.setData({
        selarprosaleslist: this.data.selarprosaleslist.concat(res.data.rows),
        selarprosalesdatapage: selarprosalesdatapage,
        selarprosalesCount: selarprosalesCount,
      })

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },

  //产品发货销售分析
  prodelsalBardata: function (id, typeid, guige, getime, letime, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var prodelsalBardatapage = 1
    let url = app.globalData.url + '/report?action=proShipRank&rows=25&page=1' + isstat
    let data = new Object()
    data.proidEQ = id
    data.protypeidEQ = typeid
    data.specificationLIKE = guige
    data.saletimeGE = getime
    data.saletimeLE = letime
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows[0].totalcountall != undefined) {
        this.setData({
          totalcountall1: res.data.rows[0].totalcountall,
          totalmoneyall1: res.data.rows[0].totalmoneyall,
        })
        return;
      }
      var prodelsalBarCount = res.data.rows.length;
      this.setData({
        prodelsalBardatalist: res.data.rows,
        prodelsalBardatapage: prodelsalBardatapage,
        prodelsalBarCount: prodelsalBarCount
      })

    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextprodelsalBardata: function (id, typeid, guige, getime, letime) {
    wx.showLoading({
      title: '加载中..',
    })
    var prodelsalBardatapage = this.data.prodelsalBardatapage;
    prodelsalBardatapage += 1;
    let url = app.globalData.url + '/report?action=proShipRank&rows=25&page=' + prodelsalBardatapage
    let data = new Object()
    data.proidEQ = id
    data.protypeidEQ = typeid
    data.specificationLIKE = guige
    data.saletimeGE = getime
    data.saletimeLE = letime
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      var prodelsalBarCount = this.data.prodelsalBarCount;
      prodelsalBarCount = prodelsalBarCount + res.data.rows.length;
      this.setData({
        prodelsalBardatalist: this.data.prodelsalBardatalist.concat(res.data.rows),
        prodelsalBardatapage: prodelsalBardatapage,
        prodelsalBarCount: prodelsalBarCount,
      })

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //产品发货同期对比
  prodelperBardata: function (id, yeartimeEQ, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var prodelperBardatapage = 1
    let url = app.globalData.url + '/report?action=productSendTongQiDuiBi&rows=25&page=1' + isstat
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows[0].proname == undefined) {
        this.setData({
          totalcountall5: res.data.rows[0].totalcount,
          totalmoneyall5: res.data.rows[0].uptotalcount,
        })
        return;
      }
      var prodelperBarCount = res.data.rows.length;
      this.setData({
        prodelperBardatalist: res.data.rows,

        prodelperBardatapage: prodelperBardatapage,
        prodelperBarCount: prodelperBarCount
      })



    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextprodelperBardata: function (id, yeartimeEQ) {
    wx.showLoading({
      title: '加载中..',
    })
    var prodelperBardatapage = this.data.prodelperBardatapage;
    prodelperBardatapage += 1;
    let url = app.globalData.url + '/report?action=productSendTongQiDuiBi&rows=25&page=' + prodelperBardatapage
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      var prodelperBarCount = this.data.prodelperBarCount;
      prodelperBarCount = prodelperBarCount + res.data.rows.length;
      this.setData({
        prodelperBardatalist: this.data.prodelperBardatalist.concat(res.data.rows),
        prodelperBardatapage: prodelperBardatapage,
        prodelperBarCount: prodelperBarCount,
      })

      wx.hideLoading({})

    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },


  //客户发货同期对比
  cusdelperBardata: function (id, yeartimeEQ, isstat) {
    wx.showLoading({
      title: '加载中..',
    })
    var cusdelperBardatapage = 1
    let url = app.globalData.url + '/report?action=custSendTongQiDuiBi&rows=25&page=1' + isstat
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ

    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({}) 
      if (res.data.rows[0].custname == undefined) {
        this.setData({
          totalcountall6: res.data.rows[0].totalcount,
          totalmoneyall6: res.data.rows[0].uptotalcount,
        })
        return;
      }
      var cusdelperBarCount = res.data.rows.length;
      this.setData({
        cusdelperBardatalist: res.data.rows,

        cusdelperBardatapage: cusdelperBardatapage,
        cusdelperBarCount: cusdelperBarCount
      })


    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  nextcusdelperBardata: function (id, yeartimeEQ) {
    wx.showLoading({
      title: '加载中..',
    })
    var cusdelperBardatapage = this.data.cusdelperBardatapage;
    cusdelperBardatapage += 1;
    let url = app.globalData.url + '/report?action=custSendTongQiDuiBi&rows=25&page=' + cusdelperBardatapage
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      var cusdelperBarCount = this.data.cusdelperBarCount;
      cusdelperBarCount = cusdelperBarCount + res.data.rows.length;
      this.setData({
        cusdelperBardatalist: this.data.cusdelperBardatalist.concat(res.data.rows),
        cusdelperBardatapage: cusdelperBardatapage,
        cusdelperBarCount: cusdelperBarCount,
      })

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },

  onLoad: function (options) { 
    if (options.showtype == '产品销售区域分析数据统计') {
      let nextlistdata = decodeURIComponent(options.getmaplist) 
      this.setData({
        getmaplist: JSON.parse(nextlistdata),
        next: options.next,
        showtype: options.showtype
      })
    } else if (options.showtype == '客户产品销售分析数据统计') {
      let nextlistdata2 = decodeURIComponent(options.custprosaleslist) 
      this.setData({
        custprosaleslistnext: JSON.parse(nextlistdata2),
        next: options.next,
        showtype: options.showtype,
      
      })
    } else if (options.showtype == '业务员产品销售分析数据统计') {
      let nextlistdata3 = decodeURIComponent(options.selarprosaleslist) 
      this.setData({
        selarprosaleslistnext: JSON.parse(nextlistdata3),
        next: options.next,
        showtype: options.showtype
      })
    } else if (options.showtype == '产品发货销售分析数据统计') {
      let nextlistdata4 = decodeURIComponent(options.prodelsalBardatalist) 
      this.setData({
        prodelsalBardatalistnext: JSON.parse(nextlistdata4),
        next: options.next,
        showtype: options.showtype
      })
    } else if (options.showtype == '产品发货同期对比数据统计') {
      let nextlistdata5 = decodeURIComponent(options.prodelperBardatalist) 
      this.setData({
        prodelperBardatalistnext: JSON.parse(nextlistdata5),
        next: options.next,
        showtype: options.showtype
      })
    } else if (options.showtype == '客户发货同期对比数据统计') {
      let nextlistdata6 = decodeURIComponent(options.cusdelperBardatalist) 
      this.setData({
        cusdelperBardatalistnext: JSON.parse(nextlistdata6),
        next: options.next,
        showtype: options.showtype
      })
    }
 
    if (options.stat == '1' && options.next != 'true') {
      this.setData({
        showtype: "产品销售区域分析数据统计"
      })
      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.getmapData('', lasttime, thistime, '', '', '', '', '');
      this.getmapData('', lasttime, thistime, '', '', '', '', '&isstat=true');
    } else if (options.stat == '2' && options.next != 'true') {
      this.setData({
        showtype: "客户产品销售分析数据统计"
      })
      this.custprosalesdata('', 'detail');
      this.custprosalesdata(this.data.totalid, 'total');
    } else if (options.stat == '3' && options.next != 'true') {
      this.setData({
        showtype: "业务员产品销售分析数据统计"
      })
      this.selarprosalesdata('', '');
      this.selarprosalesdata(this.data.ywynameid, '&issum=yes');
    } else if (options.stat == '4') {
      this.setData({
        showtype: "产品发货销售分析数据统计"
      })
      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.prodelsalBardata('', '', '', lasttime, thistime, '');
      this.prodelsalBardata('', '', '', lasttime, thistime, '&isstat=true');
    } else if (options.stat == '5') {
      this.setData({
        showtype: "产品发货同期对比数据统计"
      })
      this.prodelperBardata('', '2020', '');
      this.prodelperBardata('', '2020', '&issum=yes');
    } else if (options.stat == '6') {
      this.setData({
        showtype: "客户发货同期对比数据统计"
      })
      this.cusdelperBardata('', '2020', '');
      this.cusdelperBardata('', '2020', '&issum=yes');;
    }
  },
  //跳转echart柱状图
  ranking: function () {

    let showtype = this.data.showtype 
    if (showtype == '产品销售区域分析数据统计') { 
      wx.navigateTo({
        url: 'prosalesanalysis?getmaplist=' + JSON.stringify(this.data.getmaplist),
      })
    } else if (showtype == '客户产品销售分析数据统计') { 
      wx.navigateTo({
        url: 'custprosales?custprosaleslistnext=' + JSON.stringify(this.data.custprosaleslistnext),
      })
    } else if (showtype == '业务员产品销售分析数据统计') { 
      wx.navigateTo({
        url: 'saleprosales?selarprosaleslistnext=' + JSON.stringify(this.data.selarprosaleslistnext),
      })
    } else if (showtype == '产品发货销售分析数据统计') { 
      wx.navigateTo({
        url: 'prodelisales?prodelsalBardatalistnext=' + JSON.stringify(this.data.prodelsalBardatalistnext),
      })
    } else if (showtype == '产品发货同期对比数据统计') { 

      wx.navigateTo({
        url: 'compdatastat?prodelperBardatalistnext=' + JSON.stringify(this.data.prodelperBardatalistnext),
      })
    } else if (showtype == '客户发货同期对比数据统计') { 
      wx.navigateTo({
        url: 'compcusdsales?cusdelperBardatalistnext=' + JSON.stringify(this.data.cusdelperBardatalistnext),
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
  onShow: function (e) { 
    wx.setStorageSync('baritem', '')
    let showtype = this.data.showtype
    if (showtype == '产品销售区域分析数据统计') { 
      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.getmapData('', lasttime, thistime, '', '', '', '', '&isstat=true');
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.custprosalesdata(wx.getStorageSync('cpNameid'), 'total');
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.selarprosalesdata(this.data.ywynameid, '&issum=yes');

    } else if (showtype == '产品发货销售分析数据统计') { 
      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.prodelsalBardata('', '', '', lasttime, thistime, '&isstat=true');

    } else if (showtype == '产品发货同期对比数据统计') {
      this.prodelperBardata('', '2020', '&issum=yes');

    } else if (showtype == '客户发货同期对比数据统计') {
      this.cusdelperBardata('', '2020', '&issum=yes');
    }

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
    let showtype = this.data.showtype

    if (showtype == '产品销售区域分析数据统计') {

      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.nextgetmapData('', lasttime, thistime, '', '', '', '');
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.nextcustprosalesdata();
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.nextselarprosalesdata();
    } else if (showtype == '产品发货销售分析数据统计') { 
      this.nextprodelsalBardata();
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.nextprodelperBardata();
    } else if (showtype == '客户发货同期对比数据统计') { 
      this.nextcusdelperBardata();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})