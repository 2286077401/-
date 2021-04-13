const app = getApp();
var startX, endX; //首先创建2个变量 来记录触摸时的原点
var moveFlag = true; // 判断执行滑动事件

Page({
  /**`
   * 页面的初始数据
   */
  data: {
    inputKhname: "",
    numdw: "",
    ledindex: "",
    cpcouont: "",
    flag: true,
    dwindex: "",
    //控制变量
    controlStr: 0,
    inputproname: "",
    imgUrl: "",
    //单位下拉框
    dj: "",

    xlindex: "",
    productMsg: [],
    productData: [],

    // selectData: ['消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
    xslxindex: '', //选择的下拉列 表下标,
    paidtypeid: "", //付款方式id
    khItem: [], //下單客户名称
    khMsg: [], //客户信息余额地址...
    yewuyuanMsg: [], //业务员信息
    proNum: '', //所选产品对应下标
    ordertime: "", //下单时间
    reciever: "", //收货人
    ordernote: "", //备注
    receivertel: "", //收货电话
    logisticsname: "", //物流名称
    wuliuID: "", //物流id
    paidtype: "", //支付方式
    ordermoney: "",
    returnordermoney: "",
    hideShare: false,
    xslxshow: false,
    pagee: 1,
    ani1: '',
    ani2: '',
    currentab: '0',
    isdaishou: true,
    //客户名称选择
    khName: "",
    getKhname: '',
    //客户名称滚动加载
    khNamepage: 1,
    khNametotalDataCount: '',
    //产品滚动加载
    cpnamepage: 1,
    cpnametotalDataCount: '',
    biaos: "",
    // khName:false,
    //付款方式
    getFkway: "",
    getWlname: "",
    getCpname: "",
    getDw: "",
    //  销售类型
    getXsclass: "",
    page: 1,
    totalDataCount: '',
    //搜索结果
    isSearch: 'true',
    searchOrder: [],
    //
    custID: "",
    //代收金额
    daishoumoney: "",
    // orderallNumber: [{
    //   getKhname: '',
    //   getDw: '',
    //   getguige: '',
    //   getdanjia: '',
    //   getzhehou: '',
    //   getXsclass: '',
    //   getshuliang: '',
    //   getfanli: '',
    //   getjine: '',
    //   getzhehoujine: '',
    // }],
    orderNumber: [{
      getKhname: '',
      getDw: '',
      getsaletypeid: '',
      getguige: '',
      getdanjia: '',
      getzhehou: '',
      getXsclass: '',
      getshuliang: '',
      getfanli: '',
      getjine: '',
      getzhehoujine: '',
      getprono: '',
      gettype: '',
      getacctype: '',
      getproid: '',
    }],
    //产品名称
    cpNamemodelData: [],
    // 模态框数据
    wlmodelData: [],
    fkWayData: [],
  },
 
  
  inputDaishou: function (option) {
 
    this.setData({
      daishoumoney: option.detail.value
    })
  },
 
  inputshouhuor: function (option) {
    this.setData({
      reciever: option.detail.value
    })
  },
  inputshPhone: function (option) {
   
    this.setData({
      receivertel: option.detail.value
    })
  },
  inputDz: function (option) {
    this.setData({
      ['khMsg.receiveaddr']: option.detail.value
    })
   
  },
  inputBeizhu: function (option) {
  
    this.setData({
      ordernote: option.detail.value
    })
  },
  inputCpname: function (option) {
    //cpNamemodelData
 
    this.setData({
      inputproname: option.detail.value
    })
  },
 
 
  djinput: function (option) {
     
    let index = option.currentTarget.dataset.index
    wx.setStorageSync('index', index)
  },
 
  inputCount: function (option) {
  
    let allindex = wx.getStorageSync('index')
    var temp_strcount = 'orderNumber[' + allindex + '].getshuliang';
    var temp_strjine = 'orderNumber[' + allindex + '].getjine';
    var temp_strzhjine = 'orderNumber[' + allindex + '].getzhehoujine';
    let val = option.detail.value
    let jine = val * this.data.orderNumber[allindex].getdanjia
    let zhjine = val * this.data.orderNumber[allindex].getzhehou
   
    this.setData({
      cpcouont: option.detail.value,
      [temp_strcount]: option.detail.value,
      [temp_strjine]: jine,
      // ordermoney:jine,
      [temp_strzhjine]: zhjine,
      // returnordermoney: zhjine,
    })
  },
  
   
  //提交订单
  submitOrder: function () {
    if (this.data.getKhname == '' || this.data.getKhname == undefined) {
      wx.showToast({
        title: '请选择客户姓名',
        icon: "none"
      })
      return;
    }
    if (this.data.isdaishou == true && this.data.daishoumoney == '') {
      wx.showToast({
        title: '请输入代收金额',
        icon: "none"
      })
      return;
    }
    if (this.data.reciever == '' || this.data.reciever == undefined) {
      wx.showToast({
        title: '请填写收货人',
        icon: "none"
      })
      return;
    }
    if (this.data.receivertel == '' || this.data.receivertel == undefined) {
      wx.showToast({
        title: '请填写收货人电话',
        icon: "none"
      })
      return;
    }
    if (this.data.khMsg.receiveaddr == '' || this.data.khMsg.receiveaddr == undefined) {
      wx.showToast({
        title: '请填写收货人地址',
        icon: "none"
      })
      return;
    }
    let a = 0
    let b = 0
    for (var i = 0; i < this.data.orderNumber.length; i++) {
      a += this.data.orderNumber[i].getzhehoujine
      b += this.data.orderNumber[i].getjine
    }
    this.setData({
      returnordermoney: a,
      ordermoney: b
    })
    //判断是否有空值



    let userid = wx.getStorageSync('user').account.id
    let url = app.globalData.url + '/order?SP=true&action=add'
    if (this.data.isdaishou) {
      var daidai = 1
    } else {
      var daidai = 0
    }
    let listdata = {
      'daidai': daidai,
      'addType': '4',
      'daishoumoney': this.data.daishoumoney,
      'bussinesstime': '',
      'custaddr': '',
      'creditline': this.data.khMsg.creditline,
      'receiver': this.data.reciever,
      'ordercount': this.data.orderNumber.length,
      'telno': '',
      'salerid': this.data.yewuyuanMsg[0].id,
      'ordertime': this.data.ordertime,
      'table': 'ddxx',
      'invoicetype': '',
      'saler': this.data.yewuyuanMsg[0].name,
      'paidtypeid': this.data.paidtypeid,
      'logisticsid': this.data.wuliuID,
      'custlinker': '',
      'ordernote': this.data.ordernote,
      'receivertel': this.data.receivertel,
      'logisticsname': this.data.logisticsname,
      'ordermoney': this.data.ordermoney,
      'returnordermoney': this.data.returnordermoney,
      'receiveaddr': this.data.khMsg.receiveaddr,
      'paidtype': this.data.khMsg.paidtype,
      'custname': this.data.getKhname,
      'custid': this.data.custID,
      'orderid': userid,
      'ddmxList': [],
    };
    //产品信息


    for (var i = 0; i < this.data.orderNumber.length; i++) {
      let data = new Object();
      data.totalmoney = this.data.orderNumber[i].getjine
      data.returnrate = this.data.orderNumber[i].getfanli
      data.prono = this.data.orderNumber[i].getprono
      data.proname = this.data.orderNumber[i].getKhname
      data.table = 'ddmx'
      data.type = this.data.orderNumber[i].getdwId
      data.singleprice = this.data.orderNumber[i].getdanjia
      data.maincount = this.data.orderNumber[i].getshuliang
      data.remaincount = this.data.orderNumber[i].getshuliang
      data.stockcount = this.data.orderNumber[i].getkucun
      data.saletype = this.data.orderNumber[i].getsaletypeid
      data.saledprice = this.data.orderNumber[i].getzhehou
      data.specification = this.data.orderNumber[i].getguige
      data.prounitname = this.data.orderNumber[i].getDw
      data.proid = this.data.orderNumber[i].getproid
      data.prounitid = this.data.orderNumber[i].getdwId
      data.saledmoney = this.data.orderNumber[i].getzhehoujine
      listdata.ddmxList.push(data);
    }
  
    let ob = this.data.orderNumber
    for (let item of ob) {
  
      if (item.getKhname == '' || item.getKhname == undefined || item.getshuliang == '') {
        wx.showToast({
          title: '请填写全部参数',
          icon: "none"
        })
        return;
      }
    }
     
    wx.showLoading()
    app.wxRequest("POST", url, {
      'data': JSON.stringify(listdata)
    }, (res) => {
      wx.hideLoading();
     
      if (res.data == 'true') {
        wx.showToast({
          title: '下单成功',
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/orderManagement/orderManagement',
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '您还有信息未填,请检查后重新提交',
          icon: "none"
        })
      }
    }, (err) => {
      wx.hideLoading();
      
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },
  //添加产品列表
  addProduct: function () {
    let list = this.data.orderNumber
    for (let i = 0; i < list.length; i++) {
      if (list[i].getKhname == '' || list[i].getKhname == undefined) {
        wx.showToast({
          title: '请先完善上一条产品信息',
          icon: "none"
        })
        return;
      }
    }
    list.push({
      getKhname: '',
      getDw: '',
      getguige: '',
      getdanjia: '',
      getzhehou: '',
      getXsclass: '',
      getshuliang: '',
      getfanli: '',
      getjine: '',
      getzhehoujine: '',
    })
    this.setData({
      orderNumber: list,
    })
 
  },
  //删除产品列表mainProduct
  mainProduct: function (e) { 
    let numlist = []
    let index = e.currentTarget.dataset.index 
    let lists = this.data.orderNumber
    if (this.data.orderNumber.length == 1) {
      wx.showToast({
        title: '至少添加一种产品',
        icon: "none"
      })
      return;
    }
    lists.splice(index, 1)
    this.setData({
      orderNumber: lists
    }) 
  },
  //物流查询
  wlCx: function (e) { 
    wx.navigateTo({
      url: '/pages/orderManagement/ inquiry?orderno=' + e.currentTarget.dataset.orderno,
    })
  },
  //物流名称第一页
  wulName: function () {
    let url = app.globalData.url + '/customer?action=getSelectLog'
    let data = new Object()
    // data.rows='10'
    // data.page='0'
    app.wxRequest("POST", url, data, (res) => {
     
      this.setData({
        wlmodelData: res.data
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },

  //付款方式
  fkWay: function () {
    let url = app.globalData.url + '/sysbase?type=seal&action=getSelectType'
    let data = new Object()
    // data.rows='10'
    // data.page='0'
    app.wxRequest("POST", url, data, (res) => { 
      this.setData({
        fkWayData: res.data
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },
  //销售类型
  saletyepid: function (Ind, allindex) {
    let url = app.globalData.url + '/sysbase?type=saletype&action=getSelectType'
    let data = new Object()
    // data.rows='10'
    // data.page='0'
    app.wxRequest("POST", url, data, (res) => { 
      if (Ind == '0') {
        let list = res.data[0]
        var temp_getsaletypeid = 'orderNumber[' + allindex + '].getsaletypeid';
        // wx.setStorageSync('danweiId', list)
        this.setData({
          [temp_getsaletypeid]: list.id
        })
      } else if (Ind == '1') {
        let list = res.data[1]
        var temp_getsaletypeid = 'orderNumber[' + allindex + '].getsaletypeid';
        // wx.setStorageSync('danweiId', list)
        this.setData({
          [temp_getsaletypeid]: list.id
        })
      }
      this.setData({
        selectleix: res.data.data
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },

  //跳转
  goorderDetail: function (e) { 

    // let item = JSON.stringify(e.currentTarget.dataset.item) 
    wx.setStorageSync('orderdetail', e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/orderManagement/orderDetail?id=' + e.currentTarget.dataset.id,
      // url: '/pages/orderManagement/orderDetail?id=' + e.currentTarget.dataset.id + '&item=' + item,
    })
  },
  //查询
  chaxun: function (options) {
    wx.navigateTo({
      url: '/pages/orderManagement/orderSearch?item=',
    })
  },
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () { 
    if (this.data.isSearch == true && this.data.dataArray.length > 50) {
      this.next()
    } else if (this.data.isSearch == true) {
      wx.showToast({
        title: '已加载全部数据',
        icon: "none"
      })
    } else {
      this.next()
    }

  },
  //请求第一页数据
  getList: function () {
    var that = this;
    var page = 1
    // that.setData({
    //   dataArray: []
    // })
    wx.showLoading();
    let url = app.globalData.url + '/order?action=getBeans&page=1&rows=10'
    let data = new Object()
    data.isvalidEQ = '1'
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
      wx.hideLoading()
    }, (err) => { 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },

  //请求下一页数据
  next: function () {
    wx.showLoading();
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/order?action=getBeans&rows=10&page=' + page
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
      let dataArray = this.data.dataArray

      this.setData({
        dataArray: dataArray.concat(res.data.rows),
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
  },





  catchtouchmove() {}, //防止穿透
  guanbi: function () {
    this.setData({
      hideShare: false
    })
  },
  // 模块遮罩层
  chooseShare: function (e) {
    if (e.currentTarget.dataset.biaos != 'getKhname') {
      if (this.data.getKhname == '' || this.data.getKhname == undefined) {
        wx.showToast({
          title: '请选择客户姓名',
          icon: "none"
        })
        return;
      }
    } 
    var that = this; 
    this.setData({
      numdw: e.currentTarget.dataset.index
    })
    if (this.data.controlStr == 0 && e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.biaos == 'getKhname') {
      let a = 1
      this.setData({
        controlStr: a
      })
      let index = e.currentTarget.dataset.index
      wx.setStorageSync('index', index) 
    } else if (e.currentTarget.dataset.index != undefined && this.data.controlStr != 0) {
      let index = e.currentTarget.dataset.index
      wx.setStorageSync('index', index) 
    } else if (e.currentTarget.dataset.biaos == 'getDw') {

      if (e.currentTarget.dataset.dwbiaos == 'first') {
        let index = e.currentTarget.dataset.dwindex
        wx.setStorageSync('index', index)
      }
      let allindex = wx.getStorageSync('index')
      if (this.data.orderNumber[allindex].getKhname == '' || this.data.orderNumber[allindex].getKhname == undefined) {
        wx.showToast({
          title: '请先选择产品',
          icon: "none"
        })
        return;
      }
      // var temp_strdw = 'orderNumber[' + allindex + '].getDw';
      if (allindex == 0) {
        // let a='1'
        let a = wx.getStorageSync('productMsg') 
        if (a.length < 3) {
          let list = wx.getStorageSync('productMsg')
          let xb = allindex
          let xb1 = allindex + 1
          let handleProductMsg = list[xb]
          let handleProductMsg1 = list[xb1]
          let productMsg = []
          productMsg[0] = handleProductMsg
          productMsg[1] = handleProductMsg1 
          this.setData({
            productMsg
          })
        } else { 
          let list = wx.getStorageSync('productMsg')
          let xb = allindex + 2
          let handleProductMsg = list[xb] 
          this.setData({
            productMsg: handleProductMsg
          })
        }

      } else {
        let list = wx.getStorageSync('productMsg')
        let xb = allindex + 2
        let handleProductMsg = list[xb]
        this.setData({
          productMsg: handleProductMsg,
        }) 
      } 
      this.setData({

        biaos: e.currentTarget.dataset.biaos,
        // [temp_str]:e.currentTarget.dataset.cpname
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
      return;
    }
    let index = wx.getStorageSync('index')
    var temp_str = 'orderNumber[' + index + '].getKhname';
    that.setData({
      dwindex: e.currentTarget.dataset.dwindex,
      biaos: e.currentTarget.dataset.biaos,
      [temp_str]: e.currentTarget.dataset.cpname
    })
    that.setData({
      biaos: e.currentTarget.dataset.biaos,
      // [temp_str]:e.currentTarget.dataset.cpname
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

    if (e.currentTarget.dataset.biaos == 'getWlname') {
      this.wulName()
    } else if (e.currentTarget.dataset.biaos == 'getFkway') {
      this.fkWay();
    } else if (e.currentTarget.dataset.biaos == 'getCpname') {
      this.productData();
    } else if (e.currentTarget.dataset.biaos == 'getXsclass') {

    } else if (e.currentTarget.dataset.biaos == 'getDw') {

    }
    if (e.currentTarget.dataset.biaos == 'getKhname') {
      this.tkhName();
    }
  },
  // 模块遮罩层
  chooseSharecpName: function (e) { 
    let allindex = wx.getStorageSync('index')
    // var temp_strdw = 'orderNumber[' + allindex + '].getDw';
    let list = wx.getStorageSync('productMsg')
    let arr = e.currentTarget.dataset.proitem.unitlist
    if (list == '') {
      var productMsg = {}
      productMsg[allindex] = e.currentTarget.dataset.proitem.unitlist
      wx.setStorageSync('productMsg', arr) 
    } else {
      let xb = allindex + 2 
      list.splice(xb, 1, arr)
      wx.setStorageSync('productMsg', list)
    }
    let a = wx.getStorageSync('productMsg')
    this.setData({
      productData: e.currentTarget.dataset.proitem,
    }) 
    let xb = allindex + 1
    let handleProductMsg = a[xb] 
    this.setData({
      productMsg: handleProductMsg
    })
    var that = this;
    if (this.data.controlStr == 0 && e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.biaos == 'getKhname') {
      let a = 1
      this.setData({
        controlStr: a
      })
      let index = e.currentTarget.dataset.index
      wx.setStorageSync('index', index)
    } else if (e.currentTarget.dataset.index != undefined && this.data.controlStr != 0) {
      let index = e.currentTarget.dataset.index
      wx.setStorageSync('index', index)
    }
    let index = wx.getStorageSync('index')
    var temp_str = 'orderNumber[' + index + '].getKhname';
    var temp_guige = 'orderNumber[' + index + '].getguige';
    var temp_guigefln = 'orderNumber[' + index + '].getfanli';
    var temp_prono = 'orderNumber[' + index + '].getprono';
    var temp_acctype = 'orderNumber[' + index + '].getacctype';
    var temp_keyongkucun = 'orderNumber[' + index + '].getkuncun';
    var temp_keycpId = 'orderNumber[' + index + '].getproid';
    var temp_keycpdw = 'orderNumber[' + index + '].getDw';
    var temp_keycpdj = 'orderNumber[' + index + '].getdanjia';
    var temp_keycplx = 'orderNumber[' + index + '].getXsclass';
    var temp_keycpzh = 'orderNumber[' + index + '].getzhehou';
    let zh = e.currentTarget.dataset.proitem.unitlist[0].proprice * (1 - e.currentTarget.dataset.proitem.returnrate)  
    that.setData({
      biaos: e.currentTarget.dataset.biaos,
      [temp_str]: e.currentTarget.dataset.cpname,
      [temp_guige]: e.currentTarget.dataset.proitem.specification,
      [temp_guigefln]: e.currentTarget.dataset.proitem.returnrate,
      [temp_prono]: e.currentTarget.dataset.proitem.prono,
      [temp_acctype]: e.currentTarget.dataset.proitem.acctype,
      [temp_keyongkucun]: e.currentTarget.dataset.proitem.freecount,
      [temp_keycpId]: e.currentTarget.dataset.proitem.id,
      [temp_keycpdw]: e.currentTarget.dataset.proitem.unitlist[0].name,
      [temp_keycpdj]: e.currentTarget.dataset.proitem.unitlist[0].proprice,
      [temp_keycplx]: '产品',
      [temp_keycpzh]: zh
    })
    
    that.setData({
      biaos: e.currentTarget.dataset.biaos,
      // [temp_str]:e.currentTarget.dataset.cpname
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
    this.productData();
  },
  //销售类型遮罩层

  showMask: function (e) { 
    let index = e.currentTarget.dataset.index
    wx.setStorageSync('index', index)
    var hides = this.data.xslxshow;
    if (hides == true) {
      this.setData({
        xslxshow: false
      })
    } else if (hides == false) {
      this.setData({
        xslxshow: true
      })
    }
    this.setData({
      flag: false
    })
  },
  closeMask: function (e) { 
    let index = wx.getStorageSync('index')
    let led = e.currentTarget.dataset.led
    if (led == '0') {
      var temp_strlx = 'orderNumber[' + index + '].getXsclass';
      var temp_strdj = 'orderNumber[' + index + '].getdanjia';
      var temp_strzh = 'orderNumber[' + index + '].getzhehou';
      var temp_strjine = 'orderNumber[' + index + '].getjine';
      var temp_strzhjine = 'orderNumber[' + index + '].getzhehoujine';
      let val = this.data.cpcouont
      let led = this.data.ledindex 
      if (this.data.ledindex === '') {
        wx.showToast({
          title: '请确认产品单位',
          icon: "none"
        })
        this.setData({
          flag: true,
          xslxshow: false
        })
      } 
      let jine = val * this.data.productMsg[led].proprice
      let zh = this.data.productMsg[led].proprice * (1 - this.data.productData.returnrate)
      let zhjine = val * zh 
      this.setData({
        flag: true,
        xslxshow: false,
        [temp_strlx]: e.currentTarget.dataset.type,
        [temp_strdj]: this.data.productMsg[led].proprice,
        [temp_strzh]: zh,
        [temp_strjine]: jine,
        [temp_strzhjine]: zhjine,
      })

    } else {
      var temp_strlx = 'orderNumber[' + index + '].getXsclass';
      // var temp_strdw = 'orderNumber[' + index + '].getDw';
      var temp_strdj = 'orderNumber[' + index + '].getdanjia';
      var temp_strzh = 'orderNumber[' + index + '].getzhehou';
      var temp_strjine = 'orderNumber[' + index + '].getjine';
      var temp_strzhehoujine = 'orderNumber[' + index + '].getzhehoujine';
      this.setData({
        flag: true,
        xslxshow: false,
        [temp_strzh]: 0,
        [temp_strjine]: 0,
        [temp_strdj]: 0,
        [temp_strzhehoujine]: 0,
        [temp_strlx]: e.currentTarget.dataset.type,
      })
    }
  },

  //客户姓名滚动
  khNamelower(e) { 
    if (this.data.biaos == 'getKhname') {
      this.khNamenext()
    } else if (this.data.biaos == 'getCpname') {
      this.khNamenext()
    }
  },
  //加载产品
  productData: function () {
    wx.showLoading()
    var page = 1
    // var custId = wx.getStorageSync('user').account.custid;
    let url = app.globalData.url + '/order?action=getMBProduct&page=1&rows=20'
    let data = new Object()
    data.proname = ''
    data.custid = ''
    // data.rows='10'
    // data.page='0'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      var list = res.data.rows
      var totalDataCount = list.length;
      this.setData({
        cpNamemodelData: res.data.rows,
        cpnamepage: page,
        cpnametotalDataCount: totalDataCount
      })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },
  //显示大图
  bigImg: function (e) { 
    let imgdizhi = e.currentTarget.dataset.imgdata
    let imgs = this.data.imgUrl + imgdizhi
    let arr = []
    arr.push(imgs)
    wx.previewImage({
      current: imgs, // 当前显示图片的http链接
      urls: arr, // 需要预览的图片http链接列表
    }) 
  },
  //请求下一页名客户姓产品信息滚动
  khNamenext: function () {
    if (this.data.biaos == 'getKhname') {
      wx.showLoading()
      var page = this.data.khNamepage;
      page += 1;
      let url = app.globalData.url + '/customer?action=getSelectName&page=' + page + '&rows=20'
      let data = new Object()
      //  data.rows='10'
      //  data.page=page
      app.wxRequest("POST", url, data, (res) => {
        wx.hideLoading() 
        var list = res.data.rows;
        // 计算当前共加载了多少条数据，
        var totalDataCount = this.data.totalDataCount; 
        // totalDataCount = totalDataCount + list.length;
        let khName = this.data.khName
        this.setData({
          khName: khName.concat(res.data.rows),
          khNamepage: page,
          khNametotalDataCount: totalDataCount
        }) 
        wx.hideLoading()
      }, (err) => {
        wx.hideLoading() 
        wx.showToast({
          title: '请求服务器出错',
          icon: "none"
        })
        wx.hideLoading()
      })

    } else if (this.data.biaos == 'getCpname') {
      wx.showLoading()
      var page = this.data.cpnamepage;
      page += 1;
      // var custId = wx.getStorageSync('user').account.custid;
      let url = app.globalData.url + '/order?action=getMBProduct&page=' + page + '&rows=20'
      let data = new Object()
      data.proname = ''
      data.custid = ''
      // data.rows='10'
      // data.page='0'
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => {
        wx.hideLoading()
        var list = res.data.rows;
        // 计算当前共加载了多少条数据，
        var cpnametotalDataCount = this.data.cpnametotalDataCount; 
        let cpNamemodelData = this.data.cpNamemodelData
        this.setData({
          cpNamemodelData: cpNamemodelData.concat(res.data.rows),
          cpnamepage: page,
          cpnametotalDataCount: cpnametotalDataCount
        })
      }, (err) => {
        wx.hideLoading() 
        wx.showToast({
          title: '服务器请求失败',
          icon: "none"
        })
      })
    }
    // else if(this.data.biaos == 'getWlname'){

    // }

  },

  //客户名称选择
  tkhName: function () {
    var khNamepage = 1
    this.setData({
      khNamedataArray: []
    })
    wx.showLoading()
    // let custID = wx.getStorageSync('user').account.custid 
    let url = app.globalData.url + '/customer?action=getSelectName&row=20&page=1'
    let data = new Object()
    // data.custidEQ = custID
    // data . table ='ddxx'
    app.wxRequest("POST", url, data, (res) => { 
      var list = res.data.rows
      var totalDataCount = list.length;
      this.setData({
        khName: res.data.rows,
        khNamepage: khNamepage,
        khNametotalDataCount: totalDataCount
      })
      wx.hideLoading()
    }), (err) => { 
      wx.hideLoading()
    }
  },
  //请求浏览对应数据
  getOrderList: function () {
    wx.showLoading();
    let url = app.globalData.url + '/order?action=getBeans'
    let data = new Object()
    data.isvalidEQ = '1'
    // data . table ='ddxx'
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => { 
      wx.hideLoading()
    }, (err) => { 
      wx.showToast({
        title: '请求服务器失败',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  //是否代收isdaishou
  changeds: function () {
    this.setData({
      isdaishou: true
    }) 
  },
  changedsf: function () {
    this.setData({
      isdaishou: false
    }) 
  },
  /**
   * 详情与售后左滑右滑事件
   */
  onLoad: function (e) { 
    if (e.currentab != undefined) {
      let currentab = e.currentab
      this.setData({
        currentab,
        pagee: e.pagee
      })
    }

    let that = this
    let imgUrl = app.globalData.imgurl
    let myData = new Date()
    let yyy = myData.getFullYear()
    let mmm = myData.getMonth()
    let ddd = myData.getDate()
    let ordertime = yyy + '-' + mmm + '-' + ddd
    that.setData({
      ordertime,
      imgUrl
    })
    //  this.getOrderList();

    if (e.searchOrder != undefined) { 
      let searchOrd = JSON.parse(e.searchOrder)
      that.setData({
        searchOrder: searchOrd,
        dataArray: searchOrd,
        isSearch: true
      }) 
    } else {
      that.getList();
    }


  },

  onShow: function () {

  },
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) { 
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) { 
        this.move2left();
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  clicktab1: function (e) {
    this.move2right();
    this.setData({
      currentab: 0,
      hideShare: false
    })

  },
  clicktab2: function (e) {
    this.move2left();
    this.setData({
      currentab: 1,
      hideShare: false
    })
  },
  close: function () {
    this.setData({
      hideShare: false,
      flag: true,
      xslxshow: false
    }) 
  },
  //向左滑动操作
  move2left() {
    var that = this;
    if (this.data.pagee == 2) {
      return
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    animation.opacity(0.2).translate(-500, 0).step()
    this.setData({
      ani1: animation.export()
    })
    setTimeout(function () {
      that.setData({
        pagee: 2,
        ani2: '',
        currentab: 1
      });
    }, 300)
  },

  //向右滑动操作
  move2right() {
    var that = this;
    if (this.data.pagee == 1) {
      return
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    animation.opacity(0.2).translate(500, 0).step()
    this.setData({
      ani2: animation.export()
    })
    setTimeout(function () {
      that.setData({
        pagee: 1,
        ani1: '',
        currentab: 0
      });
    }, 300)
  },
  //获取客户名称
  getKhname: function (options) { 
    this.setData({
      inputKhname: options.detail.value
    })
  },
  //搜索对应客户名称
  serchKhname: function () {
    // if (this.data.inputKhname == '' || this.data.inputKhname == undefined) {
    //   wx.showToast({
    //     title: '请输入搜索内容',
    //     icon: "none"
    //   })
    //   return;
    // } 
    if (this.data.biaos == 'getKhname') {
      let url = app.globalData.url + '/customer?action=getSelectName&&row=20&page=1'
      let data = new Object();
      data.nameLIKE = this.data.inputKhname
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => { 
        this.setData({
          khName: res.data.rows
        })
      }, (err) => { 
        if (err != '') {
          wx.showToast({
            title: err,
            icon: "none"
          })
        } else {
          wx.showToast({
            title: "请求出错",
            icon: "none"
          })
        }

      })
    }
    wx.showToast({
      title: '搜索' + this.data.inputKhname,
      icon: "none"
    })
  },
  //确认客户名称
  confirmKhname: function (e) {
    // getKhname: 
    let custid = e.currentTarget.dataset.custid
    this.setData({
      getKhname: e.currentTarget.dataset.index,
      custID: custid,
      khItem: e.currentTarget.dataset.khitem
    })
    this.yue(custid)
    this.yewuyuan(custid)
  },
  //客户详情余额等
  yue: function (custid) {
    let url = app.globalData.url + '/order?action=getCustInfo'
    let data = new Object();
    data.id = custid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        khMsg: res.data[0],
        wuliuID: res.data[0].logisticsid,
        logisticsname: res.data[0].logisticsname,
        paidtype: res.data[0].paidtype,
        paidtypeid: res.data[0].id,
        receivertel: res.data[0].receivertel,
        reciever: res.data[0].receiver,
      })
    }, (err) => { 
      if (err != '') {
        wx.showToast({
          title: err,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: "请求出错",
          icon: "none"
        })
      }

    })
  },

  //客户业务员信息
  yewuyuan: function (custid) {
    let url = app.globalData.url + '/account?action=getPrincipalByCust'
    let data = new Object();
    data.custidEQ = custid
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        yewuyuanMsg: res.data
      })
    }, (err) => { 
      if (err != '') {
        wx.showToast({
          title: err,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: "请求出错",
          icon: "none"
        })
      }

    })
  },
  //搜索对应付款方式
  serchFkway: function () {
    wx.showToast({
      title: '搜索' + this.data.getFkway,
      icon: "none"
    })
  },
  //确认付款方式
  confirmFkway: function (e) {
    // getKhname: 
    this.setData({
      paidtype: e.currentTarget.dataset.index,
      paidtypeid: e.currentTarget.dataset.id,
    })
  },

  //搜索对应物流名称
  serchWlname: function () {
    wx.showToast({
      title: '搜索' + this.data.getWlname,
      icon: "none"
    })
  },
  //确认物流名称
  confirmWlname: function (e) {
    // getKhname: 
    // let wuliuid= 'this.data.khMsg.logisticsid'
    this.setData({
      logisticsname: e.currentTarget.dataset.index,
      wuliuID: e.currentTarget.dataset.wuliuid,
    }) 
  },

  //搜索对应产品名称
  serchCpname: function () {

    wx.showLoading()
    let url = app.globalData.url + '/order?action=getMBProduct&row=100&page=1'
    let data = new Object();
    data.custid = this.data.custid
    data.proname = this.data.inputproname
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
 
      this.setData({
        cpNamemodelData: res.data.rows
      })
      wx.hideLoading()
    }, (err) => { 
      if (err != '') {
        wx.showToast({
          title: err,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: "请求出错",
          icon: "none"
        })
      }
      wx.hideLoading()
    })
  },
  //确认产品名称
  confirmCpname: function (e) {
    // getKhname: 
    this.setData({
      getCpname: e.currentTarget.dataset.index
    })
  },

  //搜索对应单位
  serchDw: function () {
    wx.showToast({
      title: '搜索' + this.data.getDw,
      icon: "none"
    })
  },
  //确认单位

  confirmDw: function (e) {
    // getKhname: 
    let index = wx.getStorageSync('index')
    let led = e.currentTarget.dataset.led
    var temp_strDw = 'orderNumber[' + index + '].getDw';
    var temp_strdj = 'orderNumber[' + index + '].getdanjia';
    var temp_strzh = 'orderNumber[' + index + '].getzhehou';
    // var temp_strcount = 'orderNumber[' + allindex + '].getshuliang';
    var temp_strjine = 'orderNumber[' + index + '].getjine';
    var temp_strzhjine = 'orderNumber[' + index + '].getzhehoujine';
    let val = this.data.cpcouont

    let jine = val * this.data.productMsg[led].proprice
    let zh = this.data.productMsg[led].proprice * (1 - this.data.productData.returnrate)
    let zhjine = val * zh 
    this.setData({
      getDw: e.currentTarget.dataset.name,
      [temp_strDw]: e.currentTarget.dataset.name,
      [temp_strdj]: this.data.productMsg[led].proprice,
      [temp_strzh]: zh,
      [temp_strjine]: jine,
      [temp_strzhjine]: zhjine,
      ledindex: led,
    })
  },

  //搜索对应销售类型
  serchXsclass: function () {
    wx.showToast({
      title: '搜索' + this.data.getXsclass,
      icon: "none"
    })
  },
  //确认销售类型
  confirmXsclass: function (e) {
    // getKhname: 
    this.setData({
      getXsclass: e.currentTarget.dataset.index
    })
  },
})