// packageB/pages/Supplier/detail/materialaudit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    approvaltime:"",
    datetime:"",
    listdata: [],
    listchoose: [],
    clickIndex: "",
    name: "",
    license: "",
    address: "",
    fax: "",
    linker: "",
    telno: "",
    zlrzqk: "",
    product: "",
    jx: "",
    pzscwh: "",
    monthcount: "",
    prochcount: "",
    zlbzh: "",
    zonghepingjia: "",
    pingguren: "",
    riqi: "",
    pizhunyijian: "",
    pizhunren: "",

  },
  bindDateChange: function(e) { 
    this.setData({
      datetime: e.detail.value
    })
  },
  bindapprovalChange: function(e) { 
    this.setData({
      approvaltime: e.detail.value
    })
  },
  // 获取用户输入内容
  getuserinput(e) {
  
    switch (e.currentTarget.dataset.inputcenter) {
      case '供应商名称':
        this.setData({
          name: e.detail.value
        })
        break;
      case '许可证号':
        this.setData({
          license: e.detail.value
        })
        break;
      case '联系人':
        this.setData({
          linker: e.detail.value
        })
        break;
      case '传真':
        this.setData({
          fax: e.detail.value
        })
        break;
      case '电话':
        this.setData({
          telno: e.detail.value
        })
        break;
      case '地址':
        this.setData({
          address: e.detail.value
        })
        break;


      case '质量认证情况':
        this.setData({
          zlrzqk: e.detail.value
        })
        break;
      case '产品名称':
        this.setData({
          product: e.detail.value
        })
        break;

      case '剂型':
        this.setData({
          jx: e.detail.value
        })
        break;
      case '批准生产文号':
        this.setData({
          pzscwh: e.detail.value
        })
        break;
      case '月供数量':
        this.setData({
          monthcount: e.detail.value
        })
        break;
      case '批量':
        this.setData({
          prochcount: e.detail.value
        })
        break;
      case '质量标准号':
        this.setData({
          zlbzh: e.detail.value
        })
        break;
      case '综合评价':
        this.setData({
          zonghepingjia: e.detail.value
        })
        break;
      case '评估人':
        this.setData({
          pingguren: e.detail.value
        })
        break;
      case '批准意见':
        this.setData({
          pizhunyijian: e.detail.value
        })
        break;
      case '批准人':
        this.setData({
          pizhunren: e.detail.value
        })
        break;
    }

  },
  submit() {
    ///servlet/exportWord?action=baocaiExportWord
    wx.showLoading();
    var that = this
    var notimes = 0;
    var chosselist = that.data.sbmnitarr
    let url = app.globalData.url + '/servlet/exportWord?action=zltxExportWord'
    let data = new Object()
    data.name = this.data.name, //供 应 商名称
      data.license = this.data.license, //许可证号
      data.address = this.data.address, //地址
      data.fax = this.data.fax, //传真
      data.linker = this.data.linker, //联系人
      data.telno = this.data.telno, //电话
      data.zlrzqk = this.data.zlrzqk, //质量认证情况
      data.product = this.data.product, // 产品名称
      data.jx = this.data.jx, //剂型
      data.pzscwh = this.data.pzscwh, //批准生产文号
      data.monthcount = this.data.monthcount, //月供数量
      data.prochcount = this.data.prochcount, //批量
      data.zlbzh = this.data.zlbzh, //质量标准号
      data.zonghepingjia = this.data.zonghepingjia, //综合评价
      data.pingguren = this.data.pingguren, //评估人
      data.riqi = this.data.datetime, //日期
      data.pizhunyijian = this.data.pizhunyijian, //批准意见
      data.pizhunren = this.data.pizhunren //批准人
      data.pizhunriqi = this.data.approvaltime //批准人
    for (let i = 0; i < chosselist.length; i++) {
      // data.chosselist[i].A=
      let str = this.data.sbmnitarr[i]
      let arr = Object.keys(str)
      let num = i + 1
      let younum = 'Y' + num
      let liangnum = 'L' + num
      let chanum = 'C' + num
      let kongnum = 'N' + num
      let chosselisnum = chosselist[i]
      let Y = arr[0]
      let L = arr[1]
      let C = arr[2]
      let N = arr[3]
      if (chosselisnum[liangnum] == '否') {
        notimes += 1
        if (notimes > 15) {
          wx.showToast({
            title: '以上条件超过十五条为否,不能或得许可',
            icon: "none"
          });
          return;
        }
      }
      data[Y] = chosselisnum[younum]
      data[L] = chosselisnum[liangnum]
      data[C] = chosselisnum[chanum]
      data[N] = chosselisnum[kongnum]
    }
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading()
   
    }, (err) => {
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  choose(e) {
    let str = this.data.listchoose
    str[e.currentTarget.dataset.index].choose = e.currentTarget.dataset.type
    this.setData({
      clickIndex: e.currentTarget.dataset.index,
      listchoose: str
    })
    if (e.currentTarget.dataset.type == '优') {
      let subm = this.data.sbmnitarr[e.currentTarget.dataset.index]
      let sbmnitarr = this.data.sbmnitarr
      let nam = e.currentTarget.dataset.index + 1
      let you = 'Y' + nam
      let liang = 'L' + nam
      let cha = 'C' + nam
      let kong = 'N' + nam
      subm[you] = e.currentTarget.dataset.type
      subm[liang] = ''
      subm[cha] = ''
      subm[kong] = ''
      sbmnitarr[e.currentTarget.dataset.index] = subm
      this.setData({
        sbmnitarr
      })
    }
    if (e.currentTarget.dataset.type == '良') {
      let subm = this.data.sbmnitarr[e.currentTarget.dataset.index]
      let sbmnitarr = this.data.sbmnitarr
      let nam = e.currentTarget.dataset.index + 1
      let you = 'Y' + nam
      let liang = 'L' + nam
      let cha = 'C' + nam
      let kong = 'N' + nam
      subm[you] = ''
      subm[liang] = e.currentTarget.dataset.type
      subm[cha] = ''
      subm[kong] = ''
      sbmnitarr[e.currentTarget.dataset.index] = subm
      this.setData({
        sbmnitarr
      })
    }
    if (e.currentTarget.dataset.type == '差') {
      let subm = this.data.sbmnitarr[e.currentTarget.dataset.index]
      let sbmnitarr = this.data.sbmnitarr
      let nam = e.currentTarget.dataset.index + 1
      let you = 'Y' + nam
      let liang = 'L' + nam
      let cha = 'C' + nam
      let kong = 'N' + nam
      subm[you] = ''
      subm[liang] = ''
      subm[cha] = e.currentTarget.dataset.type
      subm[kong] = ''
      sbmnitarr[e.currentTarget.dataset.index] = subm
      this.setData({
        sbmnitarr
      })
    }
  },
  getdata() {
    wx.showLoading();
    let url = app.globalData.url + '/purchase?action=searchGyssp'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => { 
      if (res.data != '') {
        var sbmnitarr = []
        var i = 0
        var you = 'Y'
        var liang = 'L'
        var cha = 'C'
        var nul = 'N'
        let arr = res.data
        let arr1 = arr.map(item => {
          i++
          sbmnitarr.push({
            [you + i]: '',
            [liang + i]: '',
            [cha + i]: '',
            [nul + i]: ''
          })
          return Object.assign(item, {
            A: '优',
            B: '良',
            C: '差',
            choose: '',
          })
        });
        this.setData({
          listdata: res.data,
          listchoose: arr1,
          sbmnitarr,
        }) 
      }
      wx.hideLoading()
    }, (err) => {
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata();
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