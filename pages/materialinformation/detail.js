// pages/inventorymanagement/detail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemdata:[],
  listdate:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let itemdata = JSON.parse(options.item)
    this.setData({
      itemdata
    })
 
    this.getdata();
  },
//   {\"table\":\"kcxx\",
// \"storagenameLIKE\":\"%@\",
// \"pronameLIKE\":\"%@\",
// \"probatchLIKE\":\"%@\",
// \"pronoLIKE\":\"\",
// \"providerLIKE\":\"\",
// \"producedateGE\":\"%@\",
// \"producedateLE\":\"%@\",
// \"proidss\":\"%@\"}",@"",@"",@"",@"",@"",self.proId]};

  getdata: function () {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/materials?action=getBeans'
    let data = new Object()
    data.nameLIKE  ='',
    data.helpnoLIKE ='',
    data.labelnoLIKE ='',
    data.typeidEQ="",
    data.labelnoLIKE="",
    data.typeidEQ='',
    data.isvalidEQ=1,
    data.proidaaLIKE=this.data.itemdata.id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
 
      let listdate = res.data
      this.setData({
        listdate,
  
      })
    }, (err) => {
      wx.hideLoading();
 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  godetaillist:function(e){
 
    let item=e.currentTarget.dataset.item
    let data=JSON.stringify(item)
    wx.navigateTo({
      url: 'detaillist?item='+data,
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