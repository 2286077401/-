const app = getApp();
Page({
  data: {
    //用户输入的搜索内容
    nameLIKE: "",
    bgtime: "",
    endtime: '',
    //客户名称滚动加载
    khNamelistdata: [],
    khNamepage: '',
    khNametotalDataCount: '',
    khName: "",
    khNameid: "",
    getkhName: "",
    //业务员户名称滚动加载
    ywynamelistdata: [],
    ywynamepage: '',
    ywynametotalDataCount: '',
    ywyName: "",
    getywyName: "",
    ywyNameid: "",
    //客户分类 
    khclassnamelistdata: [],
    khclassnamepage: '',
    khclassnametotalDataCount: '',
    khclassName: "",
    getkhClass: "",
    khclassNameid: "",
    //客户状态
    khstatenamelistdata: [],
    khstateName: "",
    getkhState: "",
    khstateNameid: "",

    provincedata: [], //省
    citydata: [], //市
    countiesdata: [], //区
    provincename: '', //省
    cityname: '', //市
    countiesname: '', //区
    provinceid: "", //省id
    cityid: "", //市id
    countiesid: '', //县id
    showModalStatus: false,
    biaos: "",
  },
  bindDateChangebgtime: function (e) { 
    this.setData({
      bgtime: e.detail.value
    })
  },
  bindDateChangeendtime: function (e) { 
    this.setData({
      endtime: e.detail.value
    })
  },
  //获取用户选的的省份
  getprovince: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    this.setData({
      provincename: e.currentTarget.dataset.provincename,
      provinceid: e.currentTarget.dataset.provinceid,
    })
  },
  //获取用户选的的市
  getcity: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    this.setData({
      cityname: e.currentTarget.dataset.cityname,
      cityid: e.currentTarget.dataset.cityid,
    })
  },
  //获取用户选的的县
  getcounty: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    this.setData({
      countiesname: e.currentTarget.dataset.countyname,
      countiesid: e.currentTarget.dataset.countyid,
    })
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
    } else if (currentStatu.biaos == 'ywyName') {
      this.ywyName();

    } else if (currentStatu.biaos == 'khClass') {
      this.khclassName();
    } else if (currentStatu.biaos == 'khState') {
      this.khstateName();
    } else if (currentStatu.biaos == 'province') {
      this.province();
      this.setData({

      })
    } else if (currentStatu.biaos == 'city') {
      let prid = this.data.provinceid
      if (prid == '' || prid == undefined) {
        wx.showToast({
          title: '请先选择省份',
          icon: "none"
        })
        return;
      }
      this.city(prid);
      this.setData({

      })
    } else if (currentStatu.biaos == 'county') {
      let prid = this.data.provinceid
      let cityid = this.data.cityid
      if (prid == '' || prid == undefined || cityid == '' || cityid == undefined) {
        wx.showToast({
          title: '请先选择省份和市区',
          icon: "none"
        })
        return;
      }
      this.counties(cityid);
    }
  },
  //重置
  clern: function () {
    this.setData({
      getkhName: "",
      getywyName: "",
      getkhClass: "",
      getkhState: "",
      getprovince: "",
      getcity: "",
      getcounty: "",
      bgtime: "",
      endtime: '',
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

  //查询条件 搜索列表  NSString *urlStr = [NSString stringWithFormat:@"%@%@",DATA_ADDRESS,@"/customer?action=getBeans"];
  // NSDictionary *params = @{@"action":@"getBeans",@"table":@"khxx",@"mobile":@"true",@"rows":@"20",@"page":[NSString stringWithFormat:@"%zi",_searchPage],@"params":[NSString stringWithFormat:@"{\"table\":\"khxx\",\"idEQ\":\"%@\",\"principalLIKE\":\"%@\",\"classidEQ\":\"%@\",\"tracelevelidEQ\":\"%@\",\"provinceEQ\":\"%@\",\"cityEQ\":\"%@\",\"countyEQ\":\"%@\"}",custId,accountId,classId,tracelevelId,provinceId,cityId,countyId]};
  //查询
  submit: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/custVisit?action=queryVisit&table=khbf&rows=20&page=1&mobile=true&flag=1'
    let data = new Object()
      data.table = "khbf",
      data.custidEQ = this.data.khNameid,
      data.classidEQ = this.data.khclassNameid,
      data.tracelevelidEQ = this.data.khstateNameid,
      data.accountidEQ = this.data.ywyNameid,
      data.reportdateGE = this.data.bgtime,
      data.reportdateLE = this.data.endtime,
      data.linkerLIKE = "",
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => {
        wx.hideLoading();
        let listdata = res.data.rows 
        this.setData({
          listdata,
        })
        wx.setStorageSync('serchdata', listdata)
        if (listdata == '') {
          wx.showToast({
            title: '未搜索到对应内容',
            icon: "none"
          })
        } else {
          wx.setStorageSync('bfserchlistdata', listdata)
          wx.reLaunch({
            url: 'vistion',
          })
        }

      }, (err) => {
        wx.hideLoading(); 
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
  },


  //获取省市区
  province: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/customer?action=getProvince&table=xzqy'
    let data = new Object()
    data.newinfo = true
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        provincedata: res.data,
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
  city: function (parentid) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/customer?action=getCity&table=xzqy&parentid=' + parentid
    let data = new Object()
    data.newinfo = true
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
    let url = app.globalData.url + '/customer?action=getCounties&table=xzqy&parentid=' + cityid
    let data = new Object()
    data.newinfo = true
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
  //客户姓名
  khName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&mobile=true&rows=30&page=1'
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
  //用户选择的客户姓名
  getkhName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      getkhName: e.currentTarget.dataset.khname,
      khNameid: e.currentTarget.dataset.khnameid,
    })
  },
  //请求下一页数据
  khNamenext: function (nameLIKE) {
    wx.showLoading();
    var page = this.data.khNamepage;
    page += 1;
    let url = app.globalData.url + '/customer?action=getSelectName&table=khxx&mobile=true&rows=30&page=' + page
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
  // // 页面上拉触底事件的处理函数 

  //业务员姓名
  ywyName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/account?action=getPrincipals&table=yhzh&mobile=true&rows=30&page=1'
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      let listdata = res.data.rows
      var totalDataCount = listdata.length; 
      this.setData({
        ywynamelistdata: listdata,
        // dataArray: listdata,
        ywynamepage: page,
        ywynametotalDataCount: totalDataCount
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
  //用户选择的业务员姓名
  getywyName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      getywyName: e.currentTarget.dataset.ywyname,
      ywyNameid: e.currentTarget.dataset.ywynameid,
    })
  },
  //业务员请求下一页数据
  ywyNamenext: function (nameLIKE) {
    wx.showLoading();
    var page = this.data.ywypage;
    page += 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=yhzh&mobile=true&rows=30&page=' + page
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.ywytotalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let listdata = this.data.khNamelistdata
      this.setData({
        ywynamelistdata: listdata.concat(res.data.rows),
        ywynamepage: page,
        ywynametotalDataCount: totalDataCount,
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


  //客户分类
  khclassName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/customer?action=loadKeHuFenLei&table=cate&catetype=customerclassify'
    let data = new Object()
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      let listdata = res.data 
      this.setData({
        khclassnamelistdata: listdata,
        // dataArray: listdata,
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
  //用户选择的客户分类
  getkhclassName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      getkhClass: e.currentTarget.dataset.khclassname,
      khclassNameid: e.currentTarget.dataset.khclassnameid,
    })
  },
  //客户状态列表
  khstateName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/sysbase?action=getSelectType&type=manageclass'
    let data = new Object()
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      let listdata = res.data
      this.setData({
        khstatenamelistdata: listdata,
        // dataArray: listdata,
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
  //用户选择的客户状态列表
  getkhstateName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      getkhState: e.currentTarget.dataset.khstatename,
      khstateNameid: e.currentTarget.dataset.khstatenameid,
    })
  },
 
  next: function () {
    let biaos = this.data.biaos
    if (biaos == 'khName') {
      this.khNamenext();
    } else if (biaos == 'ywyName') {
      this.ywyNamenext();
    }

  },


  //搜索框输入的内容    let nameLIKE=this.data.nameLIKE
  serchinput: function (e) { 
    let biaos = this.data.biaos
    this.setData({
      nameLIKE: e.detail.value
    })
    if (biaos == 'khName') {
      this.khName(e.detail.value);
    } else if (biaos == 'ywyName') {
      this.ywyName(e.detail.value);
    }
  }
})