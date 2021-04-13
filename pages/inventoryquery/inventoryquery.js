// pages/inventorymanagement/inventorymanagement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: '',
    totalDataCount: '',
    listdate: [],
    name: "",
    imgarr: [],
    imgUrl: "",
    // kucundate:"",
  },
  //获取数据
  // NSString *urlStr = [NSString stringWithFormat:@"%@%@",DATA_ADDRESS,@"/stock"];
  //     NSDictionary *params = @{@"rows":@"20",@"mobile":@"true",@"page":[NSString stringWithFormat:@"%zi",_page],
  // @"action":@"queryAllStock",@"table":@"kcxx"};
  goserch: function () { 
    wx.navigateTo({
      url: 'serch',
    })
  },
  goudetail:function(option){ 
    let itemdata=encodeURIComponent(JSON.stringify(option.currentTarget.dataset.item))
    wx.navigateTo({
      url: 'detail?item=' +itemdata,
    })

  },
  getdata: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/stock?action=queryAllStock&rows=20&page=1&mobile=true&table=kcxx'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading(); 
      let listdate = res.data.rows
      var totalDataCount = listdate.length;
      this.setData({
        listdate,
        page: page,
        totalDataCount: totalDataCount
        // imgarr:imgArr
      }) 
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  next:function(){
    wx.showLoading({
      title: '加载中..',
    })
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/stock?action=queryAllStock&rows=20&page=1&mobile=true&table=kcxx'
    let data = new Object()
    app.wxRequest("POST", url, data, (res) => {
      wx.hideLoading(); 
      let list = res.data.rows
      var totalDataCount = this.data.totalDataCount;
      totalDataCount = totalDataCount + list.length;
      let listdate = this.data.listdate
      this.setData({
        listdate: listdate.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount
        // imgarr:imgArr
      }) 
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  getkucun: function () {
    // wx.showLoading({
    //   title: '加载中..',
    // })
    // let url = app.globalData.url + '/stock?action=getStockAllCount'
    // let data = new Object()
    // data.table='kcxx'
    // data.action='getStockAllCount'
    // app.wxRequest("POST", url, {'params':JSON.stringify(data)}, (res) => {
    //   wx.hideLoading(); 
    //   let kucundate = res.data
    //   this.setData({
    //     kucundate,
    //   })
    // }, (err) => {
    //   wx.hideLoading(); 
    //   wx.showToast({
    //     title: '服务器请求出错',
    //     icon: "none"
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let lastlist = wx.getStorageSync('kccxserch')
    if (lastlist == '' || lastlist == undefined) {
      // this.getkucun();
      this.getdata(this.data.name);

    } else {
      this.setData({
        listdate: lastlist
      })
      // this.getkucun();
    }
    let imgurl = app.globalData.imgurl
    this.setData({
      imgUrl: imgurl
    })
  },
  bigimage: function (e) {  
    let arr = this.data.imgarr[e.currentTarget.dataset.index]
    let that = this
    let getarr = []
    for (let i = 0; i < arr.length; i++) {
      getarr.push(that.data.imgUrl + '/' + arr[i].imgpath)
    } 
    wx.previewImage({
      current: e.currentTarget.dataset.imgu, // 当前显示图片的http链接
      urls: getarr // 需要预览的图片http链接列表
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
    this.next()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})