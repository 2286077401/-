// packageB/pages/Supplier/businesslicense.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [], //图片
    supplierId: "",
    imgUrl: "",
    listdata: [],
  },

  //删除资质图片
  deleatimg: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确定删除?',
      success(res) {
        if (res.confirm) { 
          // deleatid
          wx.showLoading();
          let url = app.globalData.url + '/purchase?action= delSupplierPhoto'
          let data = new Object()
          data.supplierid = e.currentTarget.dataset.deleatid
          app.wxRequest("POST", url, {
            "data": JSON.stringify(data)
          }, (res) => { 
            wx.hideLoading()
            that.getimg(that.data.supplierId)
          }, (err) => {
            wx.showToast({
              title: '请求服务器出错',
              icon: "none"
            })
            wx.hideLoading()
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除',
            icon:"none"
          })
        }
      }
    })

  },
  //获取资质图片
  getimg: function (id) {
    wx.showLoading();
    let url = app.globalData.url + '/purchase?action=getSupplierPhoto'
    let data = new Object()
    data.supplierid = id
    data.type = 'ypjybgs'
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => { 
      this.setData({
        listdata: res.data,
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
  /**
   * 图片放大查看
   */
  previewImg: function (e) {
    var index = e.target.dataset.index; //当前图片地址
    var imgArr = e.target.dataset.list; //所有要预览的图片的地址集合 数组形式 
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr,
    })
  },
  //上传图片开始
  chooseImg: function (e) {
    var that = this,
      pics = this.data.pics; 
    if (pics.length < 3) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {

          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          } 
          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },

  imgupload: function () {
    let that = this
    wx.showToast({
      title: '加载中...',
      icon: "none"
    })
    let tempFilePaths = that.data.pics
    let urlpath = app.globalData.url
    for (var i = 0; i < tempFilePaths.length; i++) {
      wx.uploadFile({
        url: urlpath + '/purchase?action=addSupplierPhoto&supplierId=' + that.data.supplierId + '&photoType=ypjybgs',
        filePath: tempFilePaths[i],
        name: 'file',
        formData: {},
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': wx.getStorageSync("token"),
          'Accept': 'application/json',
          'token': wx.getStorageSync("token"),
          'Cookie': getApp().globalData.Cookie,
        },
        success(res) {
          wx.hideLoading({}) 
          wx.showToast({
            title: res.data,
            icon:"none"
          })
          that.getimg(that.data.supplierId)
        },
        fail: function (res) {
          wx.hideLoading({})
          wx.hideToast();
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            showCancel: false,
            success: function (res) {}
          })
        }
      })
    }
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1); 
    this.setData({
      pics: pics,
    })
  },
  // 预览图片
  previewImg1: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var pics = this.data.pics;
    wx.previewImage({
      //当前显示图片
      current: pics[index],
      //所有图片
      urls: pics
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgUrl = app.globalData.imgurl
    this.getimg(options.fuzerenid) 
    this.setData({
      supplierId: options.fuzerenid,
      imgUrl
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