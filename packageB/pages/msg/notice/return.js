// packageA/pages/msg/notice/order.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata: [],
    page: '',
    totalDataCount: '',
  },

  godetail: function (option) {
    console.log(option)
    wx.navigateTo({
      url: 'returndetail?item='+option,
    })
  },


    //获取列表
    listData: function () {
      let imgUrl = app.globalData.imgurl
      this.setData({
        imgUrl
      })
      wx.showLoading({
        title: '加载中..',
      })
      var page = 1
      let url = app.globalData.url + '/goodsreturn?action=getReturnBeans&table=thxx&rows=20&page=1'
      let data = new Object()
      data.spstatusEQ="0"
  
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        wx.hideLoading();
        console.log(res)
        if( res.data != ''){
        let listdata = res.data.rows
        var totalDataCount = listdata.length;
        console.log(res, data, url, res.data.logisticsno)
        this.setData({
          listdata,
          // dataArray: listdata,
          page: page,
          totalDataCount: totalDataCount
        })
      }else{
        wx.showToast({
          title: '暂无数据',
        })
      }
      }, (err) => {
        wx.hideLoading();
        console.log(err, data, url)
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    },
    //请求下一页数据
    next: function () {
      wx.showLoading();
      var page = this.data.page;
      page += 1;
      let url = app.globalData.url + '/goodsreturn?action=getReturnBeans&table=thxx&rows=20&page=' + page
      let data = new Object()
      data.spstatusEQ="0"
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        var list = res.data.rows;
        // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
        var totalDataCount = this.data.totalDataCount;
        console.log(url, data, res.data.rows)
        totalDataCount = totalDataCount + list.length;
        if(totalDataCount==this.data.totalDataCount){
       wx.showToast({
         title: '已加载全部数据',
         icon:"none"
       })
        }
        let listdata = this.data.listdata
        this.setData({
          listdata: listdata.concat(res.data.rows),
          page: page,
          totalDataCount: totalDataCount,
          // imgarr: imgarr.concat(imgarrl)
        })
        console.log(this.data.listdata)
        wx.hideLoading()
      }, (err) => {
        console.log(err)
        wx.showToast({
          title: '请求服务器出错',
          icon: "none"
        })
        wx.hideLoading()
      })
    },
    // 页面上拉触底事件的处理函数 
    onReachBottom: function () {
      console.log('请求下一页')
      this.next()
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.listData()
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
    this.listData()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})