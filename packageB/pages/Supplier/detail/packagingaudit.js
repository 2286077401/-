// packageB/pages/Supplier/detail/packagingaudit.js
const app = getApp();
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata: [],
    notimes:0,
    listchoose: [],
    clickIndex: "",
    sbmnitarr: [],
    factoryname: '', //厂名
    factoryaddress: '', //厂址
    audittime: '', //审计日期
    shenhezhuangtai: '', // 审核状态
    name: '', //供应商
    fax: '', //传真
    telno: '', //电话
    address: '', //地址
    email: '', //电子邮件
    auditnames: '', //审计列席人
    jialishijian: '', //建立时间
    zhandimianji: '', //占地面积
    zongjinglidianhua: '', //总经理/电话
    guyuanzongshu: '', //雇员总数
    chanpinpinzhongjimiaoshu: '', //产品品种及描述
    zhlliangrenzhengtixi: '', //是否通过有关质量体系认证？是什么？
    renzhengjigou: '', //认证机构？
    fushenriqijijieguo: '', //最近一次复审日期及结果
    zhiliangfuzerendianhua: '', //质量负责人/电话
    zhuyunfuzerendianhua: '', //储运负责人/电话
    gongsigonghuomingxi: '', //向我公司供货明细 
    shifoutigong1: '', //是否已向我公司提供以下文件：营业执照（复印件） 
    shifoutigong2: '', //是否已向我公司提供以下文件：卫生许可证（复印件）
    shifoutigong3: '', //是否已向我公司提供以下文件：出口商品包装容器质量许可证(复印件） 
    shifoutigong4: '', //是否已向我公司提供以下文件：生产许可证（复印件） 
    gaijinjianyi: '', //不符合项及改进建议
    shenjiren1: '', // 审计人 
    ///备注： 以上项目中如有超过15项（不包括15项）回答是“否”，则该供应商不能获得许可。
    shenhejielun: '', //审核结论
    gongsifuzeren: '', //公司负责人
    shenjiren2: '', //审计人
  },
  bindDateChange: function(e) {
    this.setData({
      audittime: e.detail.value
    })
  },
  // 获取用户输入内容
  getuserinput(e) {
  
    switch (e.currentTarget.dataset.inputcenter) {
      case '厂名':
        this.setData({
          factoryname: e.detail.value
        })
        break;
      case '厂址':
        this.setData({
          factoryaddress: e.detail.value
        })
        break;
      case '审计日期':
        this.setData({
          audittime: e.detail.value
        })
        break;

      case '审核状态':
        this.setData({
          shenhezhuangtai: e.detail.value
        })
        break;
      case '供应商':
        this.setData({
          name: e.detail.value
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
      case '电子邮件':
        this.setData({
          email: e.detail.value
        })
        break;
      case '审计列席人':
        this.setData({
          auditnames: e.detail.value
        })
        break;
      case '建立时间':
        this.setData({
          jialishijian: e.detail.value
        })
        break;
      case '占地面积':
        this.setData({
          zhandimianji: e.detail.value
        })
        break;
      case '总经理/电话':
        this.setData({
          zongjinglidianhua: e.detail.value
        })
        break;
      case '雇员总数':
        this.setData({
          guyuanzongshu: e.detail.value
        })
        break;
      case '产品品种及描述':
        this.setData({
          chanpinpinzhongjimiaoshu: e.detail.value
        })
        break;
      case '是否通过有关质量体系认证？是什么？':
        this.setData({
          zhlliangrenzhengtixi: e.detail.value
        })
        break;
      case '认证机构？':
        this.setData({
          renzhengjigou: e.detail.value
        })
        break;
      case '最近一次复审日期及结果':
        this.setData({
          fushenriqijijieguo: e.detail.value
        })
        break;
      case '质量负责人/电话':
        this.setData({
          zhiliangfuzerendianhua: e.detail.value
        })
        break;
      case '储运负责人/电话':
        this.setData({
          zhuyunfuzerendianhua: e.detail.value
        })
        break;
      case '向我公司供货明':
        this.setData({
          gongsigonghuomingxi: e.detail.value
        })
        break;
      case '不符合项及改进建议':
        this.setData({
          gaijinjianyi: e.detail.value
        })
        break;
      case '审计人1':
        this.setData({
          shenjiren1: e.detail.value
        })
        break;
      case '审核结论':
        this.setData({
          shenhejielun: e.detail.value
        })
        break;
      case '公司负责人':
        this.setData({
          gongsifuzeren: e.detail.value
        })
        break;
      case '审计人2':
        this.setData({
          shenjiren2: e.detail.value
        })
        break;
    }

  },
  choose(e) {
   
    let str = this.data.listchoose
    str[e.currentTarget.dataset.index].choose = e.currentTarget.dataset.type
  
    this.setData({
      clickIndex: e.currentTarget.dataset.index,
      listchoose: str,
      // sbmnitarr: subm
    })
    if (e.currentTarget.dataset.yes != undefined) {
      let subm = this.data.sbmnitarr[e.currentTarget.dataset.index]
      let sbmnitarr = this.data.sbmnitarr
      let nam = e.currentTarget.dataset.index + 1
      let yes = 'yes' + nam
      let no = 'no' + nam
      let note = 'note' + nam
      subm[yes] = e.currentTarget.dataset.yes
      subm[no] = ''
      subm[note] = ''
      sbmnitarr[e.currentTarget.dataset.index] = subm
      this.setData({
        sbmnitarr
      })

    }
    if (e.currentTarget.dataset.no != undefined) {
     
      let subm = this.data.sbmnitarr[e.currentTarget.dataset.index]
      let sbmnitarr = this.data.sbmnitarr
      let nam = e.currentTarget.dataset.index + 1
      let no = 'no' + nam
      let yes = 'yes' + nam
      let note = 'note' + nam
      subm[no] = e.currentTarget.dataset.no
      subm[yes] = ''
      subm[note] = ''
      sbmnitarr[e.currentTarget.dataset.index] = subm
      this.setData({
        sbmnitarr,
      })
 
    }


  },
  getdata() {
    wx.showLoading();
    let url = app.globalData.url + '/purchase?action=searchBzcl'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => {
   
      if (res.data != '') {
        var sbmnitarr = []
        var i = 0
        var yes = 'yes'
        var no = 'no'
        var note = 'note'
        let arr = res.data.Vlist
        let arr1 = arr.map(item => {
          i++
          sbmnitarr.push({
            [yes + i]: '',
            [no + i]: '',
            [note + i]: ''
          })
          return Object.assign(item, {
            A: '是',
            B: '否',
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
  submit() {
    ///servlet/exportWord?action=baocaiExportWord
    wx.showLoading();
    var that = this
    var chosselist = that.data.sbmnitarr
    let url = app.globalData.url + '/servlet/exportWord?action=baocaiExportWord'
    let data = new Object()
    data.factoryname = this.data.factoryname, //厂名
      data.factoryaddress = this.data.factoryaddress, //厂址
      data.audittime = this.data.audittime, //审计日期
      data.shenhezhuangtai = this.data.shenhezhuangtai, // 审核状态
      data.name = this.data.name, //供应商
      data.telno = this.data.telno, //电话
      data.fax = this.data.fax, //传真
      data.address = this.data.address, //地址
      data.email = this.data.email, //电子邮件
      data.jialishijian = this.data.jialishijian, //建立时间
      data.zhandimianji = this.data.zhandimianji, //占地面积
      data.zongjinglidianhua = this.data.zongjinglidianhua, //总经理/电话
      data.chanpinpinzhongjimiaoshu = this.data.chanpinpinzhongjimiaoshu, //产品品种及描述
      data.guyuanzongshu = this.data.guyuanzongshu, //雇员总数
      data.zhlliangrenzhengtixi = this.data.zhlliangrenzhengtixi, //是否通过有关质量体系认证？是什么？
      data.renzhengjigou = this.data.renzhengjigou, //认证机构？
      data.fushenriqijijieguo = this.data.fushenriqijijieguo, //最近一次复审日期及结果
      data.zhiliangfuzerendianhua = this.data.zhiliangfuzerendianhua, //质量负责人/电话
      data.zhuyunfuzerendianhua = this.data.zhuyunfuzerendianhua, //储运负责人/电话
      data.gongsigonghuomingxi = this.data.gongsigonghuomingxi, //向我公司供货明细 
      data.shifoutigong1 = this.data.shifoutigong1, //是否已向我公司提供以下文件：营业执照（复印件） 
      data.shifoutigong2 = this.data.shifoutigong2, //是否已向我公司提供以下文件：卫生许可证（复印件）
      data.shifoutigong3 = this.data.shifoutigong3, //是否已向我公司提供以下文件：出口商品包装容器质量许可证(复印件） 
      data.shifoutigong4 = this.data.shifoutigong4, //是否已向我公司提供以下文件：生产许可证（复印件） 
      data.gaijinjianyi = this.data.gaijinjianyi, //不符合项及改进建议
      data.shenjiren1 = this.data.shenjiren1, // 审计人 
      ///备注： 以上项目中如有超过15项（不包括15项）回答是“否”，则该供应商不能获得许可。
      data.shenhejielun = this.data.shenhejielun, //审核结论
      data.gongsifuzeren = this.data.gongsifuzeren, //公司负责人
      data.shenjiren2 = this.data.shenjiren2 //审计人
    for (let i = 0; i < chosselist.length; i++) {
      // data.chosselist[i].A=
      let str = this.data.sbmnitarr[i]
      let arr = Object.keys(str)
      let num = i + 1
      let yesnum = 'yes' + num
      let nonum = 'no' + num
      let notenum = 'note' + num
      let chosselisnum = chosselist[i]
      let yes = arr[0]
      let no = arr[1]
      let note = arr[2]
      if (chosselisnum[nonum] == '否') {
        notimes += 1
        if (notimes > 15) {
          wx.showToast({
            title: '以上条件超过十五条为否,不能或得许可',
            icon: "none"
          });
          return;
        }
      }
      data[yes] = chosselisnum[yesnum]
      data[no] = chosselisnum[nonum]
      data[note] = chosselisnum[notenum]
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