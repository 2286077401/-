const app = getApp();
var unitl= require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',

    tempFilePaths: [],
    picid: "",
    inputkhname: "",
    imgs: [],
    placeholder: '请选择',
    array: [],
    objectArray: [],
    picmiaoshu: "",
    //选择的数组
    chosearr: [],
    multiIndex: [0, 0, 0],
    customItem: '全部',
    inputphone: "",
    inputmiaoshu: "",
    inputgongsi: "",
    picid: "", //图片id
  },
  //手机号
  getphone: function (e) { 
    this.setData({
      inputphone: e.detail.value
    })
  },
  //描述
  getmiaoshu: function (e) { 
    this.setData({
      inputmiaoshu: e.detail.value
    })
  },
  //公司
  getgongsi: function (e) { 
    this.setData({
      inputgongsi: e.detail.value
    })
  },
  bindDateChange: function (e) { 
    this.setData({
      date: e.detail.value
    })
  },
  getkh: function (e) { 
    this.setData({
      inputkhname: e.detail.value
    })
  },
  picmiaoshu: function (e) { 
    this.setData({
      picmiaoshu: e.detail.value
    })
  },
  onLoad: function () {
   let time=unitl.getnewData()
   this.setData({  
    date:time
   })
    this.imgtype();

  },
  //上传
  uploadall: function () {
    wx.showLoading()
    if (this.data.inputmiaoshu == '' || this.data.inputphone == '' || this.data.date == "" || this.data.inputgongsi == "") {
      wx.showToast({
        title: '请填写全部信息',
        icon: "none"
      })
      return;
    }
    let url = app.globalData.url + '/questions?action=addQuestions&mobile=true'
    let data = new Object();
      data.question = this.data.inputmiaoshu,
      data.phone = this.data.inputphone,
      data.time = this.data.date,
      data.company = this.data.inputgongsi
    app.wxRequest("POST", url, {
      'data': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      this.setData({
        picid: res.data
      })
      this.imgupload();
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  //图片上传
  imgupload: function () {
    let that = this
    let tempFilePaths = that.data.tempFilePaths
    let urlpath = app.globalData.url 
    
    wx.uploadFile({
      url: urlpath + "/questions?action=uploadImage&mobile=true",
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'file':'',
        'questionid':that.data.picid
      },
      header: {
        'Content-Type': 'multipart/form-data',
        'Authorization': wx.getStorageSync("token"),
        'Accept': 'application/json',
        'token': wx.getStorageSync("token"),
        'Cookie': getApp().globalData.Cookie,
      },
      success(res) {
        const data = res.data 

        wx.reLaunch({
          url: 'after',
        })
        wx.showToast({
          title: '上传成功',
        })

      },
      fail: function (res) {
        wx.hideToast();
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) {}
        })
      }
    })
  },
  //照片类型
  imgtype: function () {
    wx.showLoading()
    let url = app.globalData.url + '/picture?action=getPicTypeInBase'
    let data = new Object();
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading() 
      let str = res.data
      let array = [];
      str.map(item => {
        array.push(item.name)
      }) 
      this.setData({
        objectArray: str,
        array,
      })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 4) {
      this.setData({
        lenMore: 1
      });
      wx.showToast({
        title: '最多上传四张图片',
        icon: "none"
      })
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths,
        }) 
        var imgs = that.data.imgs; 
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 4) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        } 
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  //上传按钮



  bindPickerChange(e) { 
    let chosearr = this.data.objectArray[e.detail.value]
    this.setData({
      index: e.detail.value,
      chosearr
    }) 
  },
  clearFont() {
    this.setData({
      placeholder: ''
    })
  },

  bindRegionChange(e) { 
    this.setData({
      region: e.detail.value
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