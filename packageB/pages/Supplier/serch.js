// packageA/pages/Supplier/serch.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    people: "",
    product: "",
    businessleader:"",
    animationData:"",
    showModalStatus: false,
    biaos:"",
    businessleader:'',
    businessleaderid:'',
    nameLIKE:"",
    khNamelistdata: [],
    // dataArray: listdata,
    khNamepage: '',
    khNametotalDataCount: '',

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
    if (currentStatu.biaos == 'supplier') { 
    } else if (currentStatu.biaos == 'khName') { 
         this.khName();
    }
  },
  getkhName(e) {
    if (e.currentTarget.dataset.statu == "close") {
      this.setData({
        showModalStatus: false
      });
    } 
    this.setData({
      businessleader: e.currentTarget.dataset.khname,
      businessleaderid: e.currentTarget.dataset.khnameid,
    })
  },
  serchinputname() {
    if (this.data.nameLIKE != '') {
      this.khName(this.data.nameLIKE);
    } else {
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
    }
  },
  serchinput: function (e) { 
    let biaos = this.data.biaos
    this.setData({
      nameLIKE: e.detail.value
    })
    this.khName(e.detail.value);
  },
  //客户姓名
  khName: function (nameLIKE) {
    wx.showLoading({
      title: '加载中...',
    })
    var page = 1
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=30&page=1'
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      let listdata = res.data.rows
      var totalDataCount = listdata.length; 
      this.setData({
        khNamelistdata: listdata,
        // dataArray: listdata,
        khNamepage: page,
        khNametotalDataCount: totalDataCount
      })
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading() 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //请求下一页数据
  khNamenext: function (nameLIKE) {
    wx.showLoading();
    var page = this.data.khNamepage;
    page += 1;
    let url = app.globalData.url + '/account?action=getPrincipals&table=ddxx&rows=30&page=' + page
    let data = new Object()
    data.nameLIKE = nameLIKE
    app.wxRequest("POST", url, {
      "parmas": JSON.stringify(data)
    }, (res) => {
      var list = res.data.rows;
      // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
      var totalDataCount = this.data.khNametotalDataCount; 
      totalDataCount = totalDataCount + list.length;
      let listdata = this.data.khNamelistdata
      this.setData({
        khNamelistdata: listdata.concat(res.data.rows),
        khNamepage: page,
        khNametotalDataCount: totalDataCount,
        // imgarr: imgarr.concat(imgarrl)
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

  next: function () {
    let biaos = this.data.biaos
    if (biaos == 'khName') {
      this.khNamenext();
    } else if (biaos == 'ywyName') {
      this.ywyNamenext();
    }

  },

  getinput(e) { 
    if (e.currentTarget.dataset.type == 'supplier') {
      this.setData({
        name: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 'person') {
      this.setData({
        people: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 'commodity') {
      this.setData({
        product: e.detail.value
      })
    }
  },
  clear() {
    this.setData({
      name: "",
      people: "",
      product: "",
    })
  },
  serch() {
    if (this.data.name == '' || this.data.people == '' || this.data.product == '') {
      wx.showToast({
        title: '请输入全部参数',
        icon: 'none'
      })
      return;
    }
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