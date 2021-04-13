// pages/user/setup/modify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPass: "",
    newoldPass: "",
    confirmPass: "",
  },
  cancel: function () {

  },
  submit: function () {
    if (this.data.oldPass === '') {
      wx.showToast({
        title: '请输入原密码',
        icon: "none"
      })
      return;
    } else if (this.data.newoldPass === '') {
      wx.showToast({
        title: '请输入新密码',
        icon: "none"
      })
      return;
    } else if (this.data.confirmPass === '') {
      wx.showToast({
        title: '请再次输入密码',
        icon: "none"
      })
      return;
    }
    if (this.data.newoldPass !== this.data.confirmPass) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: "none"
      })
      return;
    }
    this.setData({
      dataArray: []
    })
    wx.showLoading();
    let url = app.globalData.url + '/account?action=updatePassword'
    let data = new Object()
    data.table = "yhzh",
      data.password = this.data.newoldPass,
      data.oldpwd = this.data.oldPass
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, url, data)
      if (res.data=='输入旧密码有误') {
       wx.showToast({
         title: '输入旧密码有误',
         icon:"none"
       })
     
      }else if(res.data=='true'){
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '修改成功',
        })
      }  else{
        wx.showToast({
          title: res.data,
          icon:"none"
        })
      }
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },

  oldPass: function (e) {
    console.log(e.detail.value)
    this.setData({
      oldPass: e.detail.value
    })
  },
  newoldPass: function (e) {
    console.log(e.detail.value)
    this.setData({
      newoldPass: e.detail.value
    })
  },
  confirmPass: function (e) {
    console.log(e.detail.value)
    this.setData({
      confirmPass: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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