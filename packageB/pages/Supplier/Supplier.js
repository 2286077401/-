const app = getApp();
var startX, endX; //首先创建2个变量 来记录触摸时的原点
var moveFlag = true; // 判断执行滑动事件

Page({
  /**
   * 页面的初始数据/purchase?action=addSupplier
   */
  data: {
    
    type: "0",
    typeactive: 'false',
    gystype: "包装材料",
    biaos: "",
    hideShare: false,
    xslxshow: false,
    pagee: 1,
    ani1: '',
    ani2: '',
    currentab: '0',
    isdaishou: true,
    suppliername: "",
    contacts: "",
    telephone: "",
    businessleader: "",
    mailbox: "",
    billingname: "",
    fax: "",
    identificationnumber: "",
    companytel: "",
    companybank: "",
    bankaccount: "",
    address: "",
    corporatename: "",
    companyaddress: "",
    animationData: "",
    showModalStatus: false,
    khNamelistdata: [],
    khNamepage: '',
    khNametotalDataCount: '',
    nameLIKE: "",
  },
  gopages(e) {
  
    // if (this.data.jumpother) {
    switch (e.currentTarget.dataset.gotype) {
      case '营业执照':
        wx.navigateTo({
          url: 'businesslicense?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '生产许可证':
        wx.navigateTo({
          url: 'productionlicense?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '卫生许可证':
        wx.navigateTo({
          url: 'hygienelicense?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case 'GMP证书/GSP证书':
        wx.navigateTo({
          url: 'gmp?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '样品检验报告':
        wx.navigateTo({
          url: 'inspectionreport?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '质量标准证书':
        wx.navigateTo({
          url: 'standardcertificate?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '经营授权书':
        wx.navigateTo({
          url: 'authorization?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '生产批件':
        wx.navigateTo({
          url: 'approval?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '供货品种':
        wx.navigateTo({
          url: 'supplytype?gotype=' + e.currentTarget.dataset.gotype+'&fuzerenid='+this.data.businessleaderid,
        })
        break;
      case '原料审计':
        wx.navigateTo({
          url: 'materialaudit?gotype=' + e.currentTarget.dataset.gotype,
        })
        break;
      case '包装审计':
        wx.navigateTo({
          url: 'packagingaudit?gotype=' + e.currentTarget.dataset.gotype,
        })
        break;
    }
    // } else {
    //   wx.showToast({
    //     title: '请先保存供应商信息',
    //     icon: "none"
    //   })
    // }
  },
  choosetype() {
    this.setData({
      typeactive: !this.data.typeactive
    })
  },
  determinetype(e) {
    if (e.currentTarget.dataset.type == "包装材料") {
      this.setData({
        type: 0
      })
    } else {
      this.setData({
        type: 1
      })
    }
    this.setData({
      gystype: e.currentTarget.dataset.type,
      typeactive: !this.data.typeactive
    })
  },
  getkhName(e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }

    this.setData({
      businessleader: e.currentTarget.dataset.khname,
      businessleaderid: e.currentTarget.dataset.khnameid,
    })
  },
  serchinputname() {
    if (this.data.nameLIKE != '') {
      this.khName(this.data.nameLIKE);
    } else {
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
    }
  },
  serchinput: function (e) {
    let biaos = this.data.biaos
    this.setData({
      nameLIKE: e.detail.value
    })
    this.khName(e.detail.value);
  },
  //客户姓名
  khName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=30&page=1'
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {

      let listdata = res.data.rows
      var totalDataCount = listdata.length;
      this.setData({
        khNamelistdata: listdata,
        // dataArray: listdata,
        khNamepage: page,
        khNametotalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading()
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //请求下一页数据
  khNamenext: function (nameLIKE) {
    wx.showLoading();
    var page = this.data.khNamepage;
    page += 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=30&page=' + page
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.khNametotalDataCount;
      totalDataCount = totalDataCount + list.length;
      let listdata = this.data.khNamelistdata
      this.setData({
        khNamelistdata: listdata.concat(res.data.rows),
        khNamepage: page,
        khNametotalDataCount: totalDataCount,
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
  next: function () {
    let biaos = this.data.biaos
    if (biaos == 'khName') {
      this.khNamenext();
    } else if (biaos == 'ywyName') {
      // this.ywyNamenext();
    }
  },
  //添加
  submit() {
    wx.showLoading({
      title: '加载中',
    })
    let url = app.globalData.url + '/purchase?action=addSupplier'
    let data = {}
    data.type = this.data.type
    data.table = 'purchase_supplier'
    data.name = this.data.suppliername
    data.telno = this.data.telephone
    data.address = this.data.address
    data.email = this.data.mailbox
    data.linker = this.data.contacts
    data.fax = this.data.fax
    data.principal = this.data.businessleader
    data.principalid = this.data.businessleaderid
    data.bank = this.data.companybank
    data.account = this.data.bankaccount
    data.invoicename = this.data.identificationnumber
    data.bankaddress = this.data.address
    if (this.data.suppliername == '' || this.data.telephone == '' || this.data.businessleader == '' || this.data.businessleaderid == '' || this.data.contacts == '' || this.data.address == '') {
      wx.showToast({
        title: '请填写所有必填项',
        icon: "none"
      })
      return;
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading({})
      if (res.data) {
        this.setData({
          jumpother: 'true'
        })
      }
 
    }, (err) => {
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getinputvlu(e) {
  
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    switch (e.currentTarget.dataset.type) {
      case 'suppliername':
        this.setData({
          suppliername: e.detail.value
        })
        break;
      case 'contacts':
        this.setData({
          contacts: e.detail.value
        })
        break;
      case 'telephone':
        this.setData({
          telephone: e.detail.value
        })
        break;
      case 'businessleader':
        this.setData({
          businessleader: e.detail.value
        })
        break;
      case 'mailbox':
        this.setData({
          mailbox: e.detail.value
        })
        break;
      case 'identificationnumber':
        this.setData({
          identificationnumber: e.detail.value
        })
        break;
      case 'companytel':
        this.setData({
          companytel: e.detail.value
        })
        break;
      case 'companybank':
        this.setData({
          companybank: e.detail.value
        })
        break;
      case 'bankaccount':
        this.setData({
          bankaccount: e.detail.value
        })
        break;
      case 'fax':
        this.setData({
          fax: e.detail.value
        })
        break;

      case 'address':
        this.setData({
          address: e.detail.value
        })
        break;
      case 'corporatename':
        this.setData({
          corporatename: e.detail.value
        })
        break;
      case 'companyaddress':
        this.setData({
          companyaddress: e.detail.value
        })
        break;

        break;
        // default:
        //   默认代码块
    }
  },
  chaxun() {
    wx.navigateTo({
      url: 'serch',
    })
  },
  godetail() {
    wx.navigateTo({
      url: 'detail',
    })
  },
  catchtouchmove() {}, //防止穿透


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
  //模态框
  powerDrawer: function (e) {
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

})