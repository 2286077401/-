// pages/allList/allList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pronameLIKE: "",
    //产品列表
    listdate: [],
    //产品图片
    imgarr: [],
    //图片更路径
    imgUrl: "",
    page: '',
    totalDataCount: '',
    //图片宽高比
    images: {},
    show:false
  },
  //搜索
  chaxun: function () {
    wx.navigateTo({
      url: 'serch',
    })
  },
  //获取图片宽高比
  imageLoad: function (e) {
    // console.log(e.target.dataset.index)
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 150, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 150 / ratio; //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image,
    
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.item)
    if (options.item != undefined) {
      let serchArr = JSON.parse(options.item)
      let imgarr = []
      for (let i = 0; i < serchArr.length; i++) {
        let arr = serchArr[i].pathlist
        let str = JSON.parse(arr)
        // console.log(str[0])
        imgarr.push(str[0])
      }
      // console.log(imgarr)

      this.setData({
        listdate: serchArr,
        imgarr
      })
      // console.log(this.data.imgarr,serchArr)
    } else {
      this.listData();
    }
    let imgUrl = app.globalData.imgurl
    this.setData({
      imgUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取列表
  listData: function () {
    wx.showLoading({
      title: '加载中..',
    })
    var page = 1
    let url = app.globalData.url + '/product?action=getImagesList&rows=10&page=1'
    let data = new Object()
    data.pronameLIKE = this.data.pronameLIKE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      wx.hideLoading();
      let listdate = res.data.rows
      var totalDataCount = listdate.length;
      // console.log(res, data, url, res.data.logisticsno)
      this.setData({
        listdate,
        // dataArray: listdate,
        page: page,
        totalDataCount: totalDataCount
      })
      let imgarr = []
      for (let i = 0; i < listdate.length; i++) {
        let arr = listdate[i].pathlist
        let str = JSON.parse(arr)
      
        imgarr.push(str[0])
      }
  
      this.setData({
        imgarr,
   
      })
    }, (err) => {
      wx.hideLoading();
    
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
    let url = app.globalData.url + '/product?action=getImagesList&rows=10&page=' + page
    let data = new Object()
    data.pronameLIKE = this.data.pronameLIKE
    //  data.rows='10'
    //  data.page=page
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount;
    
      totalDataCount = totalDataCount + list.length;
      let listdate = this.data.listdate
      let imgarrl = []
      for (let i = 0; i < list.length; i++) {
        let arr = list[i].pathlist
        let str = JSON.parse(arr)
       
        imgarrl.push(str[0])
      }
  
      let imgarr = this.data.imgarr
      this.setData({
        listdate: listdate.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
        imgarr: imgarr.concat(imgarrl)
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
  // 页面上拉触底事件的处理函数 
  onReachBottom: function () {
 
    this.next()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //跳转详情
  goDetail: function (e) {
   
    let item = e.currentTarget.dataset.item
    let i = JSON.stringify(item)
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + e.currentTarget.dataset.index + '&item=' + i + '&imgData=' + e.currentTarget.dataset.imgdata,
    })
  },
  //查看大图
  serchbigImg: function (e) {
 
    let imgstr = e.currentTarget.dataset.item
    let imgarr = JSON.parse(imgstr)
 
    let arr = []
    for (let i = 0; i < imgarr.length; i++) {
      let item = this.data.imgUrl + imgarr[i].imgpath
      arr.push(item)
    }
   
    wx.previewImage({
      current: this.data.imgUrl + e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
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