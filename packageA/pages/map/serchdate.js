const app = getApp();
Page({
  pupopovul(e) {
    this.setData({
      pupopo: e.detail.value
    })
  },
  pupoposerch() {
    var showtype = this.data.showtype;
    if (showtype == '产品销售区域分析数据统计') { 
      this.khnamelist(this.data.pupopo);
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.cpnamelist(this.data.pupopo);
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.ywynamelist(this.data.pupopo);
    } else if (showtype == '产品发货销售分析数据统计') { 
      this.khnamelist(this.data.pupopo);
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.khnamelist(this.data.pupopo);
    } else if (showtype == '客户发货同期对比数据统计') { 
      this.cpnamelist(this.data.pupopo);
    }
  },
  data: {
    provincedata: [],
    citydata: [],
    countiesdata: [],
    clssArr:[],
    provincename: "", //所述省份
    parentid: "", //所述省份
    cityname: '', //市
    cityid: '', //市
    countyname: "", //所属县
    countiesid: "", //所属县
    classvul:"",
    classtype:"",
    pupopo: "",
    biaos: "",
    animationData: "",
    showModalStatus: "",
    serch0: "",
    khNameid: "",
    cpNameid: "",
    ywynameid: "",
    serch0vul: '',
    getmapDatalist: [],
    serch1: "",
    serch2: "",
    serch3: "",
    serch4: "",
    serch5: "",
    showtype: "",
    startime1: "",
    endtime1: "",
    startime2: "",
    endtime2: "",
    startime5: "",
    endtime5: "",
    startime3: "",
    endtime3: "",
    khnamelist: [],
    khnamepage: '',
    khnamepagetotalDataCount: '',
    cpnamelist: [],
    cpnamepage: '',
    cpnamepagetotalDataCount: '',
    ywynamelist: [],
    ywynamepage: '',
    ywynamepagetotalDataCount: '',
  },

  //客户点击结果
  getprovince: function (e) {
    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    };
    this.setData({
      provincename: e.currentTarget.dataset.name,
      parentid: e.currentTarget.dataset.provinceid
    });
  },
  getcity: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    this.setData({
      cityname: e.currentTarget.dataset.name,
      cityid: e.currentTarget.dataset.cityid
    })
  },
  getcounties: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }

    this.setData({
      countyname: e.currentTarget.dataset.name,
      countiesid: e.currentTarget.dataset.countyid
    })

  },
  getclasstype: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    this.setData({
      classtype: e.currentTarget.dataset.name,
      classvul: e.currentTarget.dataset.vul
    })

  },
  //获取省市区
  province: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    let url = app.globalData.url + '/customer?action=getProvince&table=xzqy';
    let data = new Object();
    data.newinfo = 'true';
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      that.setData({
        provincedata: res.data,
      });
      // that.city()
      wx.hideLoading();
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  city: function (parentid) {
    wx.showLoading({
      title: '加载中...',
    })
    if (parentid == '' || parentid == undefined) {
      wx.showToast({
        title: '请先选择省份',
        icon: "none"
      })
      return;
    }
    let url = app.globalData.url + '/customer?action=getCity&table=xzqy&parentid=' + parentid
    let data = new Object()
    data.newinfo = 'true'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        citydata: res.data,
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
  counties: function (cityid) {
    wx.showLoading({
      title: '加载中...',
    })
    if (cityid == '' || cityid == undefined) {
      wx.showToast({
        title: '请先选择省份或市',
        icon: "none"
      })
      return;
    }
    let url = app.globalData.url + '/customer?action=getCounties&table=xzqy&parentid=' + cityid
    let data = new Object()
    data.newinfo = 'true'
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        countiesdata: res.data,
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


  serchlistData: function (proidEQ, custid, saletimeGE, saletimeLE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/report?action=custProDetail&rows=20&page=1'
    let data = new Object()
    data.proidEQ = proidEQ
    data.custid = custid
    data.saletimeGE = saletimeGE
    data.saletimeLE = saletimeLE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      var totalcount = res.data.rows.length 
      if (res.data.rows != '') {
        this.setData({
          listdata: res.data.rows,
          page,
          totalcount,
        })
        let getmaplist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'saleprosales/detail?getmaplist=' + getmaplist + '&nameid='+this.data.cpNameid+'&stat=1&next=true&showtype=客户产品销售分析数据统计详情搜索',
        })
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  serchlistData2: function (proidEQ, custid, saletimeGE, saletimeLE,isstat) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/report?action=salerProDetail&rows=20&page=1' + isstat
    let data = new Object()
    data.proidEQ = proidEQ
    data.salerid = custid
    data.saletimeGE = saletimeGE
    data.saletimeLE = saletimeLE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows != '') {
        var totalcount = res.data.rows.length
        this.setData({
          listdata: res.data.rows,
          page,
          totalcount,
        })
        let getmaplist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'custprosales/detail?getmaplist=' + getmaplist + '&nameid='+this.data.cpNameid+'&stat=1&next=true&showtype=业务员产品销售分析数据统计搜索',
        })
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },

  getmapData: function (placeid, timege, timele, guige, city, county, pronameLIKE) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=proSaleArea&rows=20&page=1';
    let data = new Object();
    data.placeidEQ = placeid;
    data.cityEQ = city;
    data.countyEQ = county;
    data.pronameLIKE = pronameLIKE;
    data.companyEQ = guige;
    data.saletimeGE = timege;
    data.saletimeLE = timele;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        getmapDatalist: res.data.rows,
      });
      if (res.data.rows == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let getmaplist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'mapdetail?getmaplist=' + getmaplist +'&stat=1&next=true&showtype=产品销售区域分析数据统计',
        })
      }
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  custprosalesdata: function (custid) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=custProSales&tjlx=detail&rows=15&page=1 ';
    let data = new Object();
    data.custnameLIKE = this.data.serch1;
    data.starttime = this.data.startime2;
    data.endtime = this.data.endtime2;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        custprosaleslist: res.data.rows,
      });
      if (res.data == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let custprosaleslist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.setStorageSync('cpNameid',this.data.cpNameid)
        wx.redirectTo({
          url: 'mapdetail?custprosaleslist=' + custprosaleslist + '&stat=2&next=true&showtype=客户产品销售分析数据统计',
        })
      }
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  selarprosalesdata: function (id) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=salerFaHuoPaiMing&rows=15&page=1 ';
    let data = new Object();
    data.saleridEQ = id;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let selarprosaleslist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'mapdetail?selarprosaleslist=' + selarprosaleslist + '&stat=2&next=true&showtype=业务员产品销售分析数据统计',
        })
      };
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  prodelsalBardata: function (id, typeid, guige, getime, letime) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=proShipRank&rows=9&page=1 ';
    let data = new Object();
    data.pronameLIKE = id;
    data.protypeidEQ = typeid;
    data.specificationLIKE = guige;
    data.saletimeGE = getime;
    data.saletimeLE = letime;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let prodelsalBardatalist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'mapdetail?prodelsalBardatalist=' + prodelsalBardatalist + '&stat=2&next=true&showtype=产品发货销售分析数据统计',
        })
      };
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  prodelperBardata: function (likename, yeartimeEQ) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=productSendTongQiDuiBi&rows=15&page=1 ';
    let data = new Object();
    data.proidEQ = this.data.khNameid;
    data.yeartimeEQ = 2020;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let prodelperBardatalist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'mapdetail?prodelperBardatalist=' + prodelperBardatalist + '&stat=2&next=true&showtype=产品发货同期对比数据统计',
        })
      };
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  cusdelperBardata: function (id, yeartimeEQ) {
    wx.showLoading({
      title: '加载中..',
    });
    let url = app.globalData.url + '/report?action=custSendTongQiDuiBi&rows=15&page=1 ';
    let data = new Object();
    data.custidEQ = id;
    data.yeartimeEQ = yeartimeEQ;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows == '') {
        wx.showToast({
          title: '暂无搜索内容',
        })
      } else {
        let cusdelperBardatalist = encodeURIComponent(JSON.stringify(res.data.rows)); 
        wx.redirectTo({
          url: 'mapdetail?cusdelperBardatalist=' + cusdelperBardatalist + '&stat=2&next=true&showtype=客户发货同期对比数据统计',
        })
      };
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    });
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      });
      if (currentStatu.statu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200);
    if (currentStatu.statu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  khnamelist(proname) {
    wx.showLoading({
      title: '加载中..',
    });
    var page = 1;
    let url = app.globalData.url + '/order?action=fuzzyQuery&table=cpxx&page=1&rows=100';
    let data = new Object();
    if (proname == '') {
      data.proname = ''
    } else {
      data.proname = this.data.pupopo
    };
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      let khnamelist = res.data.rows;
      var totalDataCount = khnamelist.length;
      this.setData({
        khnamelist,
        khnamepage: page,
        khnamepagetotalDataCount: totalDataCount
      });
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getkhName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }; 
    this.setData({
      serch0: e.currentTarget.dataset.khname,
      serch3: e.currentTarget.dataset.khname,
      serch4: e.currentTarget.dataset.khname,
      khNameid: e.currentTarget.dataset.khnameid,
    })
  },
  khnamenext: function (proname) {
    wx.showLoading();
    var khnamepage = this.data.khnamepage;
    khnamepage += 1;
    let url = app.globalData.url + '/order?action=fuzzyQuery&table=cpxx&rows=100&page=' + khnamepage;
    let data = new Object();
    if (proname == '') {
      data.proname = '';
    } else {
      data.proname = this.data.pupopo;
    };
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      var list = res.data.rows;
      var khnamepagetotalDataCount = this.data.khnamepagetotalDataCount; 
      khnamepagetotalDataCount = khnamepagetotalDataCount + list.length;
      let khnamelist = this.data.khnamelist;
      if (res.data.rows == 0) {
        wx.showToast({
          title: '已加载全部内容',
        })
      };
      this.setData({
        khnamelist: khnamelist.concat(res.data.rows),
        khnamepage: khnamepage,
        khnamepagetotalDataCount: khnamepagetotalDataCount,
      });
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  cpnamelist(nameLIKE) {
    wx.showLoading({
      title: '加载中..',
    });
    var page = 1;
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&cflag=1&rows=20&page=1';
    let data = new Object();
    if (nameLIKE == '') {
      data.nameLIKE = ''
    } else {
      data.nameLIKE = this.data.pupopo
    };
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      let cpnamelist = res.data.rows;
      var totalDataCount = cpnamelist.length;
      this.setData({
        cpnamelist,
        cpnamepage: page,
        cpnamepagetotalDataCount: totalDataCount
      });
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getcpName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }; 
    this.setData({
      serch1: e.currentTarget.dataset.cpname,
      serch1serch: e.currentTarget.dataset.cpname,
      serch2serch: e.currentTarget.dataset.cpname,
      serch3: e.currentTarget.dataset.cpname,
      serch5: e.currentTarget.dataset.cpname,
      cpNameid: e.currentTarget.dataset.cpnameid,
    })
  },
  cpnamenext: function (nameLIKE) {
    wx.showLoading();
    var cpnamepage = this.data.cpnamepage;
    cpnamepage += 1;
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&cflag=1&rows=20&page=' + cpnamepage;
    let data = new Object();
    if (nameLIKE == '') {
      data.nameLIKE = ''
    } else {
      data.nameLIKE = this.data.pupopo
    };
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      var list = res.data.rows;
      var cpnamepagetotalDataCount = this.data.cpnamepagetotalDataCount; 
      cpnamepagetotalDataCount = cpnamepagetotalDataCount + list.length;
      let cpnamelist = this.data.cpnamelist;
      if (res.data.rows == 0) {
        wx.showToast({
          title: '已加载全部内容',
        })
      }
      this.setData({
        cpnamelist: cpnamelist.concat(res.data.rows),
        cpnamepage: cpnamepage,
        cpnamepagetotalDataCount: cpnamepagetotalDataCount,
      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  ywynamelist(nameLIKE) {
    wx.showLoading({
      title: '加载中..',
    });
    var page = 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=20&page=1';
    let data = new Object();
    if (nameLIKE == '') {
      data.nameLIKE = ''
    } else {
      data.nameLIKE = this.data.pupopo
    };
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      let ywynamelist = res.data.rows;
      var totalDataCount = ywynamelist.length;
      this.setData({
        ywynamelist,
        ywynamepage: page,
        ywynamepagetotalDataCount: totalDataCount
      });
      wx.hideLoading({
        success: (res) => {},
      })
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getywyName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }; 
    this.setData({
      serch2: e.currentTarget.dataset.ywyname,
      ywynameid: e.currentTarget.dataset.ywynameid,
    })
  },
  ywynamenext: function (nameLIKE) {
    wx.showLoading();
    var ywynamepage = this.data.ywynamepage;
    ywynamepage += 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=20&page=' + cpnamepage;
    let data = new Object();
    if (nameLIKE == '') {
      data.nameLIKE = ''
    } else {
      data.nameLIKE = this.data.pupopo
    };
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      var list = res.data.rows;
      var ywynamepagetotalDataCount = this.data.ywynamepagetotalDataCount; 
      ywynamepagetotalDataCount = ywynamepagetotalDataCount + list.length;
      let ywynamelist = this.data.ywynamelist;
      if (res.data.rows == 0) {
        wx.showToast({
          title: '已加载全部内容',
        })
      };
      this.setData({
        ywynamelist: ywynamelist.concat(res.data.rows),
        ywynamepage: ywynamepage,
        ywynamepagetotalDataCount: ywynamepagetotalDataCount,
      })
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  next: function () {
    var showtype = this.data.showtype;
    if (showtype == '产品销售区域分析数据统计') { 
      this.khnamenext();
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.cpnamenext();
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.ywynamenext();;
    } else if (showtype == '产品发货销售分析数据统计') { 
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.khnamenext();
    } else if (showtype == '客户发货同期对比数据统计') { 
    }
  },
  powerDrawer: function (e) { 
    var showtype = this.data.showtype;
    var currentStatu = e.currentTarget.dataset;
    let biaos = e.currentTarget.dataset.biaos;
    this.setData({
      biaos,
    });
    this.util(currentStatu);
    if (showtype == '产品销售区域分析数据统计' || showtype == '产品发货销售分析数据统计' || showtype == '产品发货同期对比数据统计' || showtype == '业务员产品销售分析数据统计搜索') {
 
      if (biaos == 'province') { 
        this.province();
      } else if (biaos == 'city') { 
        this.city(this.data.parentid);
      } else if (biaos == 'county') { 
        this.counties(this.data.cityid)
      } else if(biaos == 'class'){
        this.setData({
          clssArr:[{name:'全部',vul:'0'},{name:'中抗药业',vul:'1'},{name:'京信药业',vul:'2'}]
        })
      }else  {
        this.khnamelist();
      }
    } else if (showtype == '客户产品销售分析数据统计' || showtype == '客户发货同期对比数据统计'|| showtype == '客户产品销售分析数据统计详情搜索') { 
      this.cpnamelist();
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.ywynamelist();
    }
  },
  getinputvlu(e) { 
    let showtype = this.data.showtype;
    if (showtype == '产品销售区域分析数据统计') { 
      this.setData({
        serch0vul: e.detail.value
      });
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.setData({
        serch1: e.detail.value
      });
    } else if (showtype == '业务员产品销售分析数据统计') { 
      this.setData({
        serch2: e.detail.value
      });
    } else if (showtype == '产品发货销售分析数据统计') { 
      this.setData({
        serch3: e.detail.value
      });
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.setData({
        serch4: e.detail.value
      });
    } else if (showtype == '客户发货同期对比数据统计') { 
      this.setData({
        serch5: e.detail.value
      });
    }else if (showtype == '客户产品销售分析数据统计详情搜索') { 
      this.setData({
        serch1serch: e.detail.value
      });
    }else if (showtype == '业务员产品销售分析数据统计搜索') { 
      this.setData({
        serch2serch: e.detail.value
      });
    };
  },
  clearvlu() {
    let showtype=this.data.showtype
    if (showtype == '产品销售区域分析数据统计') { 
      this.setData({
        parentid:'',
        serch0:'',
        provincename:"",
        startime1:'',
        endtime1:'',
        classvul:'',
        classtype:'',
        cityid:'',
        cityname:"",
        countyname:"",
        countiesid:'',
        khNameid:'',
      });
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.setData({
        serch1: "",
      });
    }else if (showtype == '客户产品销售分析数据统计详情搜索') { 
      this.setData({
        serch1serch: "",
        startime1: "",
        endtime1: "",
      });
    } else if (showtype == '业务员产品销售分析数据统计') {
      this.setData({
        serch2: ""
      });
    } else if (showtype == '业务员产品销售分析数据统计搜索') {
      this.setData({
        serch0: "",
        startime3: "",
        endtime3: "",
      });
    } else if (showtype == '产品发货销售分析数据统计') { 
      this.setData({
        serch3: ""
      });
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.setData({
        serch4: ""
      });
    } else if (showtype == '客户发货同期对比数据统计') { 
      this.setData({
        serch5: "",
        startime5: "",
        endtime5: "",
      });
    }
  },
  serchdate() {
    var showtype = this.data.showtype;
    if (showtype == '产品销售区域分析数据统计') { 
      //placeid, timege, timele, companyEQ, city, county, pronameLIKE
      //companyEQ
      this.getmapData( this.data.parentid, this.data.startime1, this.data.endtime1,this.data.classvul,this.data.cityid,this.data.countiesid,  this.data.serch0);
    } else if (showtype == '客户产品销售分析数据统计') { 
      this.custprosalesdata(this.data.cpNameid);
    } else if (showtype == '业务员产品销售分析数据统计') {
      this.selarprosalesdata(this.data.ywynameid);
    } else if (showtype == '产品发货销售分析数据统计') { 
      this.prodelsalBardata(this.data.serch3, '', '', '', '')
    } else if (showtype == '产品发货同期对比数据统计') { 
      this.prodelperBardata();
    } else if (showtype == '客户发货同期对比数据统计') { 
      this.cusdelperBardata(this.data.cpNameid, 2020);
    }else if (showtype == '客户产品销售分析数据统计详情搜索') { 
      this.serchlistData('', this.data.cpNameid, this.data.startime2, this.data.endtime2);
    }else if (showtype == '业务员产品销售分析数据统计搜索') { 
      this.serchlistData2(this.data.khNameid,this.data.barcustid,this.data.startime3, this.data.endtime3,'');
    }
  },
  bindstartime1Change: function (e) { 
    this.setData({
      startime1: e.detail.value
    });
  },
  bindendtime1Change: function (e) { 
    this.setData({
      endtime1: e.detail.value
    });
  },
  bindstartime2Change: function (e) { 
    this.setData({
      startime2: e.detail.value
    });
  },
  bindendtime2Change: function (e) { 
    this.setData({
      endtime2: e.detail.value
    });
  },
  bindstartime3Change: function (e) { 
    this.setData({
      startime3: e.detail.value
    });
  },
  bindendtime3Change: function (e) { 
    this.setData({
      endtime3: e.detail.value
    });
  },
  bindstartime5Change: function (e) { 
    this.setData({
      startime5: e.detail.value
    });
  },
  bindendtime5Change: function (e) { 
    this.setData({
      endtime5: e.detail.value
    });
  },
  onLoad: function (options) { 
    this.setData({
      showtype: options.serchstate,
      barcustid: options.barcustid,
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})