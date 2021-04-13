// pages/inventorymanagement/inventorymanagement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdate: [],
    page: '',
    totalDataCount: '',
    name: "",
    imgarr: [],
    imgUrl: "",
  },
  godetail: function (options) {
 
    let item = JSON.stringify(options.currentTarget.dataset.item)
    wx.navigateTo({
      url: 'detail?item=' + item,
    })
  },
  //获取数据
  // NSString *urlStr = [NSString stringWithFormat:@"%@%@",DATA_ADDRESS,@"/product?action=getImagesList"];
  // NSDictionary *params = @{@"action":@"getImagesList",@"rows":@"20",@"page":[NSString stringWithFormat:@"%zi",_page],
  // @"params":[NSString stringWithFormat:@"{\"pronameLIKE\":\"%@\"}",@""]};
  goserch: function () {
 
    wx.navigateTo({
      url: 'serch',
    })
  },
  getdata: function (name) {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/product?action=getImagesList&rows=20&page=1'
    let data = new Object()
    data.pronameLIKE = name
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
   
      let listdate = res.data.rows
      var totalDataCount = listdate.length;
      let imgArr = []
      for (let i = 0; i < listdate.length; i++) {
        let img = JSON.parse(listdate[i].pathlist)
        imgArr.push(img)
      }
      this.setData({
        listdate,
        imgarr: imgArr,
        page: page,
        totalDataCount: totalDataCount
      })
     
    }, (err) => {
      wx.hideLoading();
       
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  next: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/product?action=getImagesList&rows=20&page=1'
    let data = new Object()
    data.pronameLIKE = this.data.name
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      
      var list = res.data.rows;
      var totalDataCount = this.data.totalDataCount;
      totalDataCount = totalDataCount + list.length;
      let listdate = this.data.listdate

      let imgArr = []
      for (let i = 0; i < listdate.length; i++) {
        let img = JSON.parse(listdate[i].pathlist)
        imgArr.push(img)
      }
      this.setData({
        imgarr: imgArr,
        listdate: listdate.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
      })
   
    }, (err) => {
      wx.hideLoading();
    
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  onReachBottom: function () {
   
    this.next(this.data.name)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lastlist = wx.getStorageSync('kcglserch')
    if (lastlist == '' || lastlist == undefined) {
      this.getdata(this.data.name);
    } else {
      this.setData({
        listdate: lastlist
      })

    }
    let imgurl = app.globalData.imgurl
    this.setData({
      imgUrl: imgurl
    })
  },
  bigimage: function (e) {
 
    // console.log(this.data.imgarr[e.currentTarget.dataset.index][0],e.currentTarget.dataset.index,e.currentTarget.dataset.imgu)
    let arr = this.data.imgarr[e.currentTarget.dataset.index]
    let that = this
    let getarr = []
    for (let i = 0; i < arr.length; i++) {
      getarr.push(that.data.imgUrl + '/' + arr[i].imgpath)
    }
    // console.log('-------------', getarr)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})