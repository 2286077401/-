const app = getApp();
var util = require('../../../utils/util')
Page({
  data: {

    xiugai: false,
    serchinput: "", //用户输入
    lastarr: [], //跳转携带参数
    //滚动加载
    //业务员姓名滚动加载
    ywypage: '',
    ywytotalDataCount: '',
    provincedata: [], //省
    citydata: [], //市
    countiesdata: [], //区
    parentid: "", //省id
    cityid: "", //市id
    countiesid: '', //县id

    name: "", //客户姓名
    helpno: "", //助记码
    classname: "", //客户分类
    tracelevel: "", //客户状态
    receivername: "", //收货人
    receivercell: "", //收货人电话
    isformal: "", //正式客户
    lxrMsg: "", //联系人
    lxWay: "", //联系方式
    salername: "", //客户输入业务员
    receiveaddr: "", //收货人地址
    provincename: "", //所述省份
    cityname: '', //市
    countyname: "", //所属县
    
    classname: "", //客户类别
    classnameid: "", //客户类别id
    tracelevel: "", //客户状态
    tracelevelid: "", //客户状态id
    note: '', //备注
    ywyname: "", //业务员姓名
    ywyid: "", //业务员id

    ywy: [], //详情业务员
    lxr: [], //详情联系人

    khclasslistdata: [], //客户分类列表
    khstatedata: [], //客户状态列表
    isDetail: true, //判断入口
    lxrMsgdata: [], //联系人信息
    yewuyuannamedata: [], //业务员姓名
    khMsg: [],
    showModalStatus: false,
    navbar: ["资料", "联系人", "业务员"],
    currentIndex: 0,
    status: false,
    lxrismain: '0', //是否主要联系人
    ywyismain: '0', //是否主要业务员
    ismain: '0',
    navbarimg: [{
        "active": "/pages/images/kh_zl1.png",
        "after": "/pages/images/kh_zl.png"
      },
      {
        "active": "/pages/images/kh_lxr1.png",
        "after": "/pages/images/kh_lxr.png"
      },
      {
        "active": "/pages/images/kh_ywy1.png",
        "after": "/pages/images/kh_ywy.png"
      }
    ],
    //联系人数组
    contactsarr: [{
      contactsway: "",
      contacts: "",
      contactinformation: "",
      QQ: "",
      mailbox: "",
      lxrismain: "",
      cellno: "",
      address: "",
    }],
    //业务员
    yewuyuan: [],
    iconshow: false, //单选
  },
  //获取用户输入信息
  inputkhName: function (e) {
    let isModify = wx.getStorageSync('isModify') 
    let a=util.pinyin.getCamelCharssml(e.detail.value);
    //name
    this.setData({
      name: e.detail.value,
      helpno: a
    }) 
  },
  
  inputKhclass: function (e) { 
    //classname
    this.setData({
      classname: e.detail.value
    })
  },
  inputKhstate: function (e) { 
    //tracelevel
    this.setData({
      tracelevel: e.detail.value
    })
  },
  inputShouhuor: function (e) { 
    //receivername
    this.setData({
      receivername: e.detail.value
    })
  },
  inputTel: function (e) { 
    //receivercell
    this.setData({
      receivercell: e.detail.value
    })
  },
  inputaddes: function (e) { 
    //receiveaddr
    this.setData({
      receiveaddr: e.detail.value
    })
  },
 
 
  inputnote: function (e) { 
    //note
    this.setData({
      note: e.detail.value
    })
  },
  //联系人
  inputlxrMsg: function (e) { 
    //lxrMsg 
    let index = wx.getStorageSync('lxrarrindex')
    let contactsarr_contacts = 'contactsarr[' + index + '].contacts'
    let lxr_linke = 'lxr[' + index + '].linke'
    this.setData({
      lxrMsg: e.detail.value,
      [contactsarr_contacts]: e.detail.value,
      [lxr_linke]: e.detail.value,
    }) 
  },
  //联系方式
  inputlxWay: function (e) { 
    let index = wx.getStorageSync('lxrarrindex')
    let contactsarr_contactsway = 'contactsarr[' + index + '].contactsway'
    //lxWay
    let lxr_cellno = 'lxr[' + index + '].cellno'
    this.setData({
      lxWay: e.detail.value,
      [contactsarr_contactsway]: e.detail.value,
      [lxr_cellno]: e.detail.value,
    })
  },
  //QQ
  inputqq: function (e) { 
    let index = wx.getStorageSync('lxrarrindex')
    let contactsarr_QQ = 'contactsarr[' + index + '].QQ'
    let lxr_QQ = 'lxr[' + index + '].QQ'
    //QQ
    this.setData({
      QQ: e.detail.value,
      [contactsarr_QQ]: e.detail.value,
      [lxr_QQ]: e.detail.value,
    })
  },
  inputmailbox: function (e) { 
    let index = wx.getStorageSync('lxrarrindex')
    let contactsarr_mailbox = 'contactsarr[' + index + '].mailbox'
    //mailbox
    let lxr_email = 'lxr[' + index + '].email'
    this.setData({
      mailbox: e.detail.value,
      [contactsarr_mailbox]: e.detail.value,
      [lxr_email]: e.detail.value,
    })
  },
  //业务员
  // inputywyName: function (e) {

  // },
  //获取省市区
  province: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/customer?action=getProvince&table=xzqy'
    let data = new Object()
    data.newinfo = 'true'
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


  //客户点击结果
  getprovince: function (e) { 
    let isModify = wx.getStorageSync('isModify')
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    if (isModify) {
      let khMsg_provincename = 'khMsg.provincename'
      let khMsg_parentid = 'khMsg.parentid'
      let khMsg_cityname = 'khMsg.cityname'
      let khMsg_countyname = 'khMsg.countyname'
      this.setData({
        [khMsg_provincename]: e.currentTarget.dataset.name,
        [khMsg_parentid]: e.currentTarget.dataset.provinceid,
        [khMsg_cityname]: '',
        [khMsg_countyname]: '',
        provincename: e.currentTarget.dataset.name,
        parentid: e.currentTarget.dataset.provinceid,
        cityname: "",
        countyname: "",
      })
    } else {
      this.setData({
        provincename: e.currentTarget.dataset.name,
        parentid: e.currentTarget.dataset.provinceid
      })
    }
  },
  getcity: function (e) {  
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      let khMsg_cityname = 'khMsg.cityname'
      let khMsg_cityid = 'khMsg.city'
      let khMsg_countyname = 'khMsg.countyname'
      let khMsg_countyid = 'khMsg.county'
      this.setData({
        [khMsg_cityname]: e.currentTarget.dataset.name,
        [khMsg_cityid]: e.currentTarget.dataset.cityid,
        [khMsg_countyname]: '',
        [khMsg_countyid]: '',
        countyname: "",
        cityname: e.currentTarget.dataset.name,
        cityid: e.currentTarget.dataset.cityid,
        countiesid: ''
      })
    } else {
      this.setData({
        cityname: e.currentTarget.dataset.name,
        cityid: e.currentTarget.dataset.cityid
      })
    }

  },
  getcounties: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      let khMsg_countyname = 'khMsg.countyname'
      let khMsg_countyid = 'khMsg.county'
      this.setData({
        [khMsg_countyname]: e.currentTarget.dataset.name,
        [khMsg_countyid]: e.currentTarget.dataset.countiesid,
        countyname: e.currentTarget.dataset.name,
        countiesid: e.currentTarget.dataset.countiesid
      })
    } else {
      this.setData({
        countyname: e.currentTarget.dataset.name,
        countiesid: e.currentTarget.dataset.khclass
      })
    }

  },
  getywy: function (e) { 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    let index = wx.getStorageSync('ywyindex')
    let isModif = wx.getStorageSync('isModify')
    if (isModif) { 
      let yewuyuan_ywyName = 'yewuyuan[' + index + '].ywyName'
      let yewuyuan_ywyid = 'yewuyuan[' + index + '].ywyid'
      let ywy_id = 'ywy[' + index + '].accountid'
      let ywy_namee = 'ywy[' + index + '].account'
      this.setData({
        ywyname: e.currentTarget.dataset.name,
        [yewuyuan_ywyName]: e.currentTarget.dataset.name,
        [yewuyuan_ywyid]: e.currentTarget.dataset.ywyid,
        [ywy_id]: e.currentTarget.dataset.ywyid,
        [ywy_namee]: e.currentTarget.dataset.name,
      })
    } else {
      //yewuyuan
      let yewuyuan_ywyName = 'yewuyuan[' + index + '].ywyName'
      this.setData({
        ywyname: e.currentTarget.dataset.name,
        [yewuyuan_ywyName]: e.currentTarget.dataset.name,
        ywyid: e.currentTarget.dataset.ywyid
      })
    }
  },
  getkhstate: function (e) {
    let isModify = wx.getStorageSync('isModify') 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    if (isModify) {
      let khMsg_tracelevelid = 'khMsg.tracelevelid'
      let khMsg_tracelevel = 'khMsg.tracelevel'
      this.setData({
        [khMsg_tracelevel]: e.currentTarget.dataset.name,
        [khMsg_tracelevelid]: e.currentTarget.dataset.khstateid,
        tracelevel: e.currentTarget.dataset.name,
        tracelevelid: e.currentTarget.dataset.khstateid
      })

    } else {
      this.setData({
        tracelevel: e.currentTarget.dataset.name,
        tracelevelid: e.currentTarget.dataset.khstateid
      })
    }
  },
  getkhclass: function (e) {
    let isModify = wx.getStorageSync('isModify') 
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
    if (isModify) { 
      let khMsg_classname = 'khMsg.classname'
      let khMsg_classid = 'khMsg.classid'
      this.setData({
        [khMsg_classname]: e.currentTarget.dataset.name,
        [khMsg_classid]: e.currentTarget.dataset.khclass,
        classname: e.currentTarget.dataset.name,
        classnameid: e.currentTarget.dataset.khclass,
      })

    } else { 
      this.setData({
        classname: e.currentTarget.dataset.name,
        classnameid: e.currentTarget.dataset.khclass
      })
    }
  },





  catchtouchmove() {}, //防止穿透
  //提交添加客户
  submitKhadd: function () {
    let that = this
    //联系人信息
    wx.showLoading({
      title: '加载中...',
    })
    if (this.data.xiugai == true) {
      let url = app.globalData.url + '/customer?action=update&mobile=true&table＝khxx'
      let uplodid = String(that.data.lastarr.id)
      if (that.data.name == "" || that.data.receivername == '' || that.data.classname == '' || that.data.receiveaddr == ''||that.data.receivercell=='') {
        wx.showToast({
          title: '请填写完整信息',
          icon: "none"
        })
        return;
      }
      let data = {
        "helpno": that.data.helpno,
        "note": that.data.note,
        "id": uplodid,
        "estabtime": '',
        "name": that.data.name,
        "tracelevel": that.data.tracelevel,
        "receiveaddr": that.data.receiveaddr,
        "classid": that.data.classnameid, //客户分类id(联动)
        "receivername": that.data.receivername,
        "classname": that.data.classname,
        "receivercell": that.data.receivercell,
        "businesstime": '',
        "table": 'khxx',
        "tracelevelid": that.data.tracelevelid, //客户状态(联动)
        "province": that.data.parentid, //id(联动)
        "city": that.data.cityid, //id(联动)
        "county": that.data.countiesid, //id(联动)
        // "isformal": that.data.isformal,
        "linkerList": [],
        "salerList": []
      }
      for (var i = 0; i < that.data.contactsarr.length; i++) {
        var date = new Object();
        date.linker = that.data.contactsarr[i].contacts,
          date.birthday = '',
          date.fax = 0,
          date.native = 0,
          date.email = that.data.contactsarr[i].mailbox,
          date.duty = 0,
          date.ismain = that.data.contactsarr[i].lxrismain,
          date.telno =  '',
          date.hobby = 0,
          date.table = 'khlxr',
          date.micromsg = 0,
          date.qq = that.data.contactsarr[i].QQ,
          date.cellno = that.data.contactsarr[0].contactsway,
          date.address = that.data.contactsarr[0].address,
          data.linkerList.push(date);
      }
      for (var i = 0; i < that.data.yewuyuan.length; i++) {
        var datt = new Object();
        datt.account = that.data.yewuyuan[i].ywyName,
          datt.accountid = that.data.yewuyuan[i].ywyid,
          datt.ismain = that.data.yewuyuan[i].ywyismain,
          datt.table = 'khfzr'
        data.salerList.push(datt);
      } 
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => { 
        this.setData({
          lxrMsgdata: res.data,
        })
        wx.hideLoading()
        wx.showToast({
          title: res.data,
          icon: "none",
        })
        if (res.data == 'true') {
          setTimeout(() => {
            wx.navigateTo({
              url: 'msg',
            })
          }, 2000)
      }
      }, (err) => { 
        wx.hideLoading()
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    } else if (this.data.xiugai == false) {
      if (that.data.name == "" || that.data.receivername == '' || that.data.classname == '' || that.data.receivername == '' || that.data.receiveaddr == '') {
        wx.showToast({
          title: '请填写完整信息',
          icon: "none"
        })
        return;
      }
      let url = app.globalData.url + '/customer?action=add&mobile=true&table＝khxx'
      let data = {
        "helpno": that.data.helpno,
        "note": that.data.note,
        "estabtime": '',
        "name": that.data.name,
        "tracelevel": that.data.tracelevel,
        "receiveaddr": that.data.receiveaddr,
        "classid": that.data.classnameid, //客户分类id(联动)
        "receivername": that.data.receivername,
        "classname": that.data.classname,
        "receivercell": that.data.receivercell,
        "businesstime": '',
        "table": 'khxx',
        "tracelevelid": that.data.tracelevelid, //客户状态(联动)
        "province": that.data.parentid, //id(联动)
        "city": that.data.cityid, //id(联动)
        "county": that.data.countiesid, //id(联动)
        "isformal": that.data.isformal,
        "linkerList": [],
        "salerList": []
      }
      for (var i = 0; i < that.data.contactsarr.length; i++) {
        if(that.data.contactsarr[i].contactsway==''||that.data.contactsarr[i].mailbox==''||that.data.contactsarr[i].QQ==''){
             wx.showToast({
               title: '请补充联系人信息',
               icon:"none"
             })
             return ;
        }
        var date = new Object();
        date.linker = that.data.contactsarr[i].contacts,
          date.birthday = '',
          date.fax = 0,
          date.native = 0,
          date.email = that.data.contactsarr[i].mailbox,
          date.duty = 0,
          date.ismain = that.data.contactsarr[i].lxrismain,
          date.telno = '',
          date.hobby = 0,
          date.table = 'khlxr',
          date.micromsg = 0,
          date.qq = that.data.contactsarr[i].QQ,
          date.cellno = that.data.contactsarr[i].contactsway,
          date.address = '',
          data.linkerList.push(date);
      }
      for (var i = 0; i < that.data.yewuyuan.length; i++) {
        if(that.data.yewuyuan[i].ywyid==''){
          wx.showToast({
            title: '请补充业务员信息',
            icon:"none"
          })
          return ;
     }
        var datt = new Object();
        datt.account = that.data.yewuyuan[i].ywyName,
          datt.accountid = that.data.yewuyuan[i].ywyid,
          datt.ismain = that.data.yewuyuan[i].ywyismain,
          datt.table = 'khfzr'
        data.salerList.push(datt);
      } 
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => { 
        this.setData({
          lxrMsgdata: res.data,
        })
        wx.hideLoading()
        wx.showToast({
          title: res.data,
          icon: "none",
        })
        if (res.data == 'true') {
          setTimeout(() => {
 
            wx.navigateTo({
              url: 'msg',
            })
          }, 2000)
        }
      }, (err) => { 
        wx.hideLoading()
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    }

  },
  //添加联系人
  addcontent: function () {
    let isModify = wx.getStorageSync('isModify')
    if (this.data.khMsg != '') { 
      let tem = this.data.lxr
      tem.push({
        address: "",
        birthday: "",
        cellno: "",
        custid: '',
        duty: "",
        email: "",
        fax: "",
        hobby: "",
        id: '',
        ismain: "",
        linker: "",
        micromsg: "",
        native: "",
        qq: "",
        telno: "",
      })
      this.setData({
        lxr: tem
      }) 
    } else {
      let tem = this.data.contactsarr
      tem.push({
        contactsway: "",
        contacts: "",
        contactinformation: "",
        QQ: "",
        mailbox: "",
        lxrismain: "",
      })
      this.setData({
        contactsarr: tem
      }) 
    }
  },
  //删除联系人
  mainProduct: function (e) { 
    let index = e.currentTarget.dataset.index 
    let a = wx.getStorageSync('isModify')
    if (a == true && this.data.khMsg == '') { 
      let lists = this.data.contactsarr
      if (this.data.contactsarr.length == 1) {
        wx.showToast({
          title: '至少添加一条信息',
          icon: "none"
        })
        return;
      }
      lists.splice(index, 1)
      this.setData({
        contactsarr: lists
      })
    } else if (a == true && this.data.khMsg != '') { 
      let lists = this.data.lxr
      if (this.data.lxr.length == 1) {
        wx.showToast({
          title: '至少添加一条信息',
          icon: "none"
        })
        return;
      }
      lists.splice(index, 1)
      this.setData({
        lxr: lists
      })
    } 
  },
  //添加业务员
  addYwy: function () {
    let tem = this.data.yewuyuan
    let item = this.data.ywy
    item.push({
      id: '',
      name: "",
    })
    tem.push({
      ywyName: "",
      ywyismain: "",
      ywyid: "",
    })
    this.setData({
      yewuyuan: tem,
      ywy: item
    }) 
  },
  //删除业务员
  mainYwy: function (e) { 
    let index = e.currentTarget.dataset.index 

    let a = wx.getStorageSync('isModify')

    if (a == true && this.data.khMsg == '') { 
      let lists = this.data.yewuyuan
      if (lists.length == 1) {
        wx.showToast({
          title: '至少添加一条信息',
          icon: "none"
        })
        return;
      }
      lists.splice(index, 1)
      this.setData({
        yewuyuan: lists
      })
    } else if (a == true && this.data.khMsg != '') { 
      let lists = this.data.ywy
      if (lists.length == 1) {
        wx.showToast({
          title: '至少添加一条信息',
          icon: "none"
        })
        return;
      }
      lists.splice(index, 1)
      this.setData({
        ywy: lists
      })
    }
 
  },
  //获取联系人
  // 获取客户状态列表
  lxr: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/customer?action=toUpdateCust&table=khlxr&mobile=true'
    let data = new Object()
    data.idEQ = this.data.lastarr.id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        lxr: res.data,
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
  //单选
  singlechoice: function () { 
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      this.setData({
        iconshow: !this.data.iconshow
      })
      if (this.data.iconshow == true) {
        this.setData({
          isformal: '1'
        })
      } else if (this.data.iconshow == false) {
        this.setData({
          isformal: '0'
        })
      }

    } else {
      console.log(this.data.iconshow)

    }
  },
  // navbar切换
  navbarTab: function (e) { 
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
    if (e.currentTarget.dataset.index == 1 && this.data.lastarr.length != 0) {
      //联系人信息
      this.lxr()
    }
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
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })
      if (currentStatu.statu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    if (currentStatu.statu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  //模态框
  powerDrawer: function (e) {
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      let index = wx.getStorageSync('ywyindex') 
      var currentStatu = e.currentTarget.dataset;
      let biaos = e.currentTarget.dataset.biaos
      this.setData({
        biaos,
      })
      this.util(currentStatu)
      if (biaos == 'province') {
        this.province();
      } else if (biaos == 'city') {
        let parentid = this.data.parentid 
        if (parentid == undefined || parentid == '') {
          wx.showToast({
            title: '请选择省份',
            icon: "none"
          })
          return;
        }
        this.city(parentid);
      } else if (biaos == 'county') {
        let cityid = this.data.cityid
        let parentid = this.data.parentid 
        if (parentid == undefined || parentid == '' || cityid == undefined || cityid == '') {
          wx.showToast({
            title: '请选择省份和市',
            icon: "none"
          })
          return;
        }
        this.counties(cityid);
      } else if (biaos == 'khClass') {
        this.khclasslist();
      } else if (biaos == 'khState') {
        this.khstate();
      } else if (biaos == 'ywyname') {
        let index = e.currentTarget.dataset.ywyindex
        wx.setStorageSync('ywyindex', index)
        this.yewuyuanname();
      } else if (biaos == 'lxrismain') {
        let index = e.currentTarget.dataset.ywyindex
        wx.setStorageSync('ywyindex', index)
        this.yewuyuanname();
      } else if (biaos == 'ywyismain') {
        let index = e.currentTarget.dataset.index
        wx.setStorageSync('ywyindex', index)
      }
    }
  },
  //用户输入模态框搜索内容
  topserch: function (e) { 
    this.setData({
      serchinput: e.detail.value
    })
  },
  //模态框搜索
  serchall: function (e) { 
    let biaos = this.data.biaos
    if (biaos == 'province') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })
    } else if (biaos == 'city') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })
    } else if (biaos == 'county') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })

    } else if (biaos == 'khClass') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })
    } else if (biaos == 'khState') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })
    } else if (biaos == 'ywyname') {
      let str = this.data.serchinput
      this.yewuyuanname(str)
    } else if (biaos == 'lxrismain') {
      wx.showToast({
        title: '已加载全部',
        icon: "none",
      })
    } else if (biaos == 'ywyismain') {

    }

  },


  ismain: function (e) { 
    this.setData({
      ismain: e.currentTarget.dataset.type,
      showModalStatus: false,
    })
  },
  lxrismain: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      let index = wx.getStorageSync('lxrarrindex')
      let lxr_ismain = 'lxr[' + index + '].ismain'
      let contactsarr_lxrismain = 'contactsarr[' + index + '].lxrismain'
      this.setData({
        [contactsarr_lxrismain]: e.currentTarget.dataset.type,
        [lxr_ismain]: e.currentTarget.dataset.type
      })
    } else {
      if (e.currentTarget.dataset.type == '1') {
        let index = wx.getStorageSync('lxrarrindex')
        let contactsarr_lxrismain = 'contactsarr[' + index + '].lxrismain'
        this.setData({
          [contactsarr_lxrismain]: 1,
          showModalStatus: false,
        })
      } else {
        let index = wx.getStorageSync('lxrarrindex')
        let contactsarr_lxrismain = 'contactsarr[' + index + '].lxrismain'
        this.setData({
          [contactsarr_lxrismain]: 0,
          showModalStatus: false,
        })
      }
    }
  },
  ywyismain: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    let index = wx.getStorageSync('ywyindex')
    let isModify = wx.getStorageSync('isModify')
    if (isModify) {
      let ywy_ywyismain = 'ywy[' + index + '].ywyismain'
      let yewuyuan_ywyismain = 'yewuyuan[' + index + '].ywyismain'
      this.setData({
        [yewuyuan_ywyismain]: e.currentTarget.dataset.type,
        [ywy_ywyismain]: e.currentTarget.dataset.type,
      })
    } else {
      let yewuyuan_ywyismain = 'yewuyuan[' + index + '].ywyismain'
      this.setData({
        ywyismain: e.currentTarget.dataset.type,
        [yewuyuan_ywyismain]: e.currentTarget.dataset.type,
        showModalStatus: false,
      })
    }
  },
  onLoad: function (e) { 
    if (e.item == undefined || e.item == '') { 
      this.setData({
        isDetail: false, //判断入口
      })
    } else {
      let a = decodeURIComponent(e.item)  
      let data = JSON.parse(a)
      let contactsarr_contactsway = 'contactsarr[0].contactsway'
      let contactsarr_contacts = 'contactsarr[0].contacts' 
      let contactsarr_QQ = 'contactsarr[0].QQ'
      let contactsarr_mailbox = 'contactsarr[0].mailbox'
      let contactsarr_lxrismain = 'contactsarr[0].lxrismain'
      let contactsarr_address = 'contactsarr[0].address'
      let contactsarr_cellno = 'contactsarr[0].cellno'

      let yewuyuan_ywyName = 'yewuyuan[0].ywyName'
      let yewuyuan_ywyismain = 'yewuyuan[0].ywyismain'
      let yewuyuan_ywyid = 'yewuyuan[0].ywyid'


      this.setData({
        [yewuyuan_ywyName]: data.account,
        [yewuyuan_ywyid]: data.accountid,
        [yewuyuan_ywyismain]: data.isvalid,
        [contactsarr_lxrismain]: data.isvalid,
        [contactsarr_contacts]: data.linker,
        [contactsarr_cellno]: data.receivercell,
        // [contactsarr_contactinformation]:data.isvalid,
        [contactsarr_QQ]: data.qq,
        [contactsarr_mailbox]: data.email,
        [contactsarr_contactsway]: data.telno,
        [contactsarr_address]: data.receiveaddr,
        lastarr: data,
        helpno: data.helpno,
        note: data.note,
        name: data.name,
        tracelevel: data.tracelevel,
        receiveaddr: data.receiveaddr,
        classnameid: data.classid,
        receivername: data.receivername,
        classname: data.classname,
        receivercell: data.receivercell,
        tracelevelid: data.tracelevelid,
        parentid: data.province,
        cityid: data.city,
        countiesid: data.county,
      })
      //业务员
      let salername = data.saler
      wx.showLoading({
        title: '加载中...',
      })
      let url = app.globalData.url + '/customer?action=toUpdateCust&table=khfzr&mobile=true'
      let da = new Object()
      da.idEQ = this.data.lastarr.id
      app.wxRequest("POST", url, {
        "params": JSON.stringify(da)
      }, (res) => { 
        let ywy = res.data
        this.setData({
          ywy,
        })
        wx.hideLoading()
      }, (err) => {
        wx.hideLoading() 
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })

      this.setData({
        khMsg: data,
      })
      if (data.isteamwork == '否') {
        this.setData({
          iconshow: 'false'
        })
      } else {
        this.setData({
          iconshow: 'true'
        })
      }
    }
  },
  //点击修改
  modify: function () {
    wx.setStorageSync('isModify', true)
    this.setData({
      isDetail: false,
      xiugai: true,
    })
  },

  // 获取客户状态列表
  khstate: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/sysbase?action=getSelectType&type=manageclass'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => { 
      this.setData({
        khstatedata: res.data,
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
  // 获取客户状态
  khclasslist: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/customer?action=loadKeHuFenLei&table=cate&catetype=customerclassify'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => { 
      this.setData({
        khclasslistdata: res.data,
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
  //page 2-----------------------------------
  //获取点击当前数组下标
  getlxrIndex: function (e) { 
    let index = e.currentTarget.dataset.lxrmsgindex
    wx.setStorageSync('lxrarrindex', index)
  },
  
  //业务员
  yewuyuanname: function (salername) {
    wx.showLoading({
      title: '加载中...',
    })
    var ywypage = 1
    let url = app.globalData.url + '/account?action=getPrincipals&table=yhzh&rows=20&page=1&mobile=true'
    let data = new Object()
    data.nameLIKE = salername
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      let yewuyuannamedata = res.data.rows
      var ywytotalDataCount = yewuyuannamedata.length;
      this.setData({
        yewuyuannamedata,
        ywypage: ywypage,
        ywytotalDataCount: ywytotalDataCount
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
  //请求下一页业务员姓名
  //请求下一页数据
  ywynext: function (salername) {
    wx.showLoading();
    var page = this.data.ywypage;
    page += 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=yhzh&rows=50&page=' + page + '&mobile=true'
    let data = new Object()
    data.nameLIKE = salername
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var ywytotalDataCount = this.data.ywytotalDataCount; 
      ywytotalDataCount = ywytotalDataCount + list.length;
      let yewuyuannamedata = this.data.yewuyuannamedata
      this.setData({
        yewuyuannamedata: yewuyuannamedata.concat(res.data.rows),
        ywypage: page,
        ywytotalDataCount: ywytotalDataCount,
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
 
})