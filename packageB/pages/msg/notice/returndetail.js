// pages/orderManagement/orderDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: '',
    displa: 'none',
    id: "",
    proMag: [],
    itemData: [],
    daidai: "", //是否代收
    danhao: "",
    pifustat:"审批通过",//批复状态
    approvalstatushow:false,

    speciallylist: "", //特批人员列表
    speciallyname: "",
    speciallyid: "",
    pfhistory: "",
    speciallyapproved: false,
    speciallyapprovedshow: false,
  },
   //批复状态选择
   approvalstatus:function (){
    // let stat=this.data.approvalstatushow
    // this.setData({
    //   approvalstatushow:!stat
    // })
    if (this.data.speciallyapproved) {
      this.setData({
        speciallyapprovedshow: true,
        approvalstatushow:true,
         speciallyshow:false
      })
    } else {
      let stat = this.data.approvalstatushow
      this.setData({
        approvalstatushow: !stat
      })
    }
  },
 
    //选择批复状态
    choosapprovalstatus: function (e) {
      console.log(e.currentTarget.dataset)
      let stat = this.data.approvalstatushow
      let stat2 = this.data.speciallyapprovedshow
      this.setData({
        approvalstatushow: !stat,
        speciallyapprovedshow: false,
        pifustat: e.currentTarget.dataset.statu
      })
      if (e.currentTarget.dataset.statu == '转特批') {
        this.setData({
          speciallyshow: true
        })
        this.speacpep()
      } else {
        this.setData({
          speciallyname: ''
        })
      }
    },
    //选特批人
    choosespecially: function (e) {
      console.log(e)
      this.setData({
        speciallyid: e.currentTarget.dataset.speciallyid,
        speciallyname: e.currentTarget.dataset.speciallyname,
        speciallyshow: !this.data.speciallyshow
      })
  
    },
  
    speciallshow: function () {
      let stat = this.data.speciallyshow
      this.setData({
        speciallyshow: !stat
      })
    },
  //重置批复内容
  resetreplycontent:function(){
    this.setData({
      replycontent:''
    })
  },
  repcontent:function(e){
    console.log(e)
    this.setData({
      replycontent:e.detail.value
    })
  },
  //加载批复内容
  getReply: function (id) {
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    let url = app.globalData.url + '/sp?action=getAnswers'
    let data = new Object()
    data.id = id
    data.table = 'thxx'
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, data, url)
      if (res.data.length != 0) {
        this.setData({
          danhao: res.data[0].answerstatedesc
        })
      }
      wx.hideLoading()
    }, (err) => {
      console.log(err)
    })
  },
    //转特批/account?action=getLeaders
    speacpep: function () {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      let url = app.globalData.url + '/account?action=getLeaders'
      let data = new Object()
      app.wxRequest("POST", url, data, (res) => {
        console.log(res, data, url)
        this.setData({
          speciallylist: res.data
        })
        wx.hideLoading()
        wx.showToast({
          title: res.data,
          icon: "none"
        })
      }, (err) => {
        console.log(err)
      })
    },
  //提交审批
  submitreply: function () {
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    let url = app.globalData.url + '/sp?action=doSp&table=thxx'
    let data = new Object()
    data.recordid = this.data.id
    if (this.data.pifustat == '转特批') {

      data.SPresult = 2
      data.SPcontent = this.data.replycontent
      data.tpaccountid = this.data.speciallyid
      data.tpname = this.data.speciallyname
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res, data, url)
        wx.hideLoading()
        wx.showToast({
          title: res.data,
          icon: "none"
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 2000);
      }, (err) => {
        console.log(err)
      })
    } else {
      let pifustat = this.data.pifustat
      if (this.data.pifustat == '审批通过') {
        pifustat = 1
      } else if (this.data.pifustat == '审批拒绝') {
        pifustat = -1
      } else if (this.data.pifustat == '特批通过返回') {
        pifustat = 11
      } else if (this.data.pifustat == '特批结束审批') {
        pifustat = 13
      } else if (this.data.pifustat == '特批拒绝') {
        pifustat = -2
      }
      data.SPresult = pifustat
      data.SPcontent = this.data.replycontent
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res, data, url)

        wx.hideLoading()
        wx.showToast({
          title: res.data,
          icon: "none"
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 2000);
      }, (err) => {
        console.log(err)
      })
    }

  },
  kuaidiyibai: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '单号复制成功'
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/orderseach/orderseach',
              })
            }, 2000)
          }
        })
      }
    })

  },
  //遮罩层
  open: function () {
    wx.navigateTo({
      url: 'photo?id=' + this.data.id,
    })
  },
  // 订单状态
  showview: function () {
    this.setData({
      display: "block"
    })
    let url = app.globalData.url + '/order?action=getOrderStatus'
    let data = new Object()
    data.orderno = this.data.itemData.orderno
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      console.log(res, data, url)
      this.setData({
        danhao: res.data
      })

    }, (err) => {
      console.log(err)
    })
  },
  hideview: function () {
    this.setData({
      display: "none",
      displa: "none",
    })
  },
  //遮罩层__
  //操作框
  //关闭订单
  orderClose: function () {
    let that = this
    console.log("aaaaa")
    wx.showModal({
      title: '提示',
      content: '是否关闭当前订单',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading();
          let url = app.globalData.url + '/order?action=stopOrder'
          let data = new Object()
          data.id = that.data.id
          data.stopreason = '手机端关闭'
          app.wxRequest("POST", url, {
            "data": JSON.stringify(data)
          }, (res) => {
            console.log(res, data, url)
            wx.hideLoading()
            if (res.data == 'true') {

              wx.showToast({
                title: '关闭成功',
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/orderManagement/orderManagement',
                })
              }, 2000)
            } else {
              wx.showToast({
                title: '操作失败',
                icon: "none"
              })
            }
          }, (err) => {
            wx.hideLoading()
            console.log(err)
            wx.showToast({
              title: '服务器请求失败',
              icon: "none"
            })
          })

          that.setData({
            displa: 'none',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            displa: 'none',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let optionsitem = JSON.parse(options.item)
    let str = optionsitem.spnodename
    if (str.indexOf("特批") != -1) {
      this.setData({
        speciallyapproved: true,
        pifustat: "特批通过返回",
      })
    }

    let itemData = wx.getStorageSync('orderdetail')
    console.log(itemData)
    let daidai = itemData.daidai
    if (daidai == 1) {
      this.setData({
        daidai: "是"
      })
    } else {
      this.setData({
        daidai: "否"
      })
    }
    this.setData({
      id: itemData.id,
      itemData: itemData
    })
    this.getdetail();
    this.getReply(optionsitem.id)
  },
  //获取订单详情 &mobile=true&table=thxx
  getdetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/goodsreturn?action=toUpdateReturn&table=thmx&mobile=true'
    let data = new Object()
    data.idEQ = this.data.id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      console.log(res, JSON.stringify(data), url)
      if (res.data != '') {
        this.setData({
          proMag: res.data,
          orderId: res.data[0].id
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