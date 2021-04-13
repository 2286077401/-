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
  },
  kuaidiyibai: function (e) { 
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
      this.setData({
        danhao: res.data
      })

    }, (err) => { 
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
    wx.showModal({
      title: '提示',
      content: '是否关闭当前订单',
      success: function (res) {
        if (res.confirm) { 
          wx.showLoading();
          let url = app.globalData.url + '/order?action=stopOrder'
          let data = new Object()
          data.id = that.data.id
          data.stopreason = '手机端关闭'
          app.wxRequest("POST", url, {
            "data": JSON.stringify(data)
          }, (res) => { 
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
            wx.showToast({
              title: '服务器请求失败',
              icon: "none"
            })
          })

          that.setData({
            displa: 'none',
          })
        } else if (res.cancel) { 
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
    let itemData = wx.getStorageSync('orderdetail') 
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
      id: options.id,
      itemData: itemData
    })
    this.getdetail();
  },
  //获取订单详情 &mobile=true&table=ddmx
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
      if (res.data != '') {
        this.setData({
          proMag: res.data,
          orderId: res.data[0].id
        })
      }

      wx.hideLoading()
    }, (err) => {
      wx.hideLoading() 
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