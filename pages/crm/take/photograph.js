const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // utf8name: "", //转码
    page: '',
    totalDataCount: '',
    khnamelist: [],
    khNameid: "",
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
    customItem: '全部'
  },
  //客户列表
  khdatalist: function () {
    wx.showLoading()
    var page = 1
    let url = app.globalData.url + '/customer?action=getSelectName&rows=20&page=1&table=khxx'
    let data = new Object();
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading()
      let khnamelist = res.data.rows
      var totalDataCount = khnamelist.length; 
      this.setData({
        khnamelist,
        // dataArray: khnamelist,
        page: page,
        totalDataCount: totalDataCount
      })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },
  //用户选择的客户姓名
  getkhName: function (e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      inputkhname: e.currentTarget.dataset.khname,
      khNameid: e.currentTarget.dataset.khnameid,
    })
  },
  khnamenext: function () {
    wx.showLoading()
    var page = this.data.page;
    page += 1;
    let url = app.globalData.url + '/customer?action=getSelectName&rows=20&page=' + page + '&table=khxx'
    let data = new Object();
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading()
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.totalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let khnamelist = this.data.khnamelist
      this.setData({
        khnamelist: khnamelist.concat(res.data.rows),
        page: page,
        totalDataCount: totalDataCount,
        // imgarr: imgarr.concat(imgarrl)
      })
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
  },

  next: function () {
    this.khnamenext()
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

    this.imgtype();

  },
  // encodeUTF8: function (str) {
  //   let utf8str = str.replace(/[^\u0000-\u00FF]/g, function ($0) {
  //     return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;")
  //   });
  //   this.setData({
  //     utf8name: utf8str
  //   }) 
  // },
  //上传
  uploadall: function () {
    wx.showLoading() 
    if (this.data.chosearr.name == '' || this.data.chosearr.name == undefined || this.data.inputkhname == '' || this.data.chosearr.id == "" || this.data.chosearr.id == undefined) {
      wx.showToast({
        title: '请填写全部信息',
        icon: "none"
      })
      return;
    } 
    let url = app.globalData.url + '/picture?mobile=true&action=add&table=wjsc'
    let data = new Object();
    // this.encodeUTF8(this.data.picmiaoshu)
    data.table = 'wjsc'
    data.custname = this.data.inputkhname,
      data.pictypeid = this.data.chosearr.id,
      data.pictype = this.data.chosearr.name,
      data.uploadSite = this.data.picmiaoshu,
      data.upLongititudeB = '',
      data.upLatitudeB = '',
      data.upLongititudeA = '',
      data.upLatitudeA = '',
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
      url: urlpath + "/picture?action=uploadPicture&mobile=true",
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'uploadid':that.data.picid,
        'filenote':that.data.picmiaoshu,
        'photoename':that.data.chosearr.name,
        'flag':'1',
        'place':'',
        'file':''
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
        //do something 
        wx.reLaunch({
          url: 'take',
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

  //动画
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu.statu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu.statu == "open") {
      this.setData({
        showModalStatus: true
      });
    }

  },
  //模态框
  powerDrawer: function (e) { 
    var currentStatu = e.currentTarget.dataset;
    let biaos = e.currentTarget.dataset.biaos
    this.setData({
      biaos,
    })
    this.util(currentStatu)
    this.khdatalist();
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