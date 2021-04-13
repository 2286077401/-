 // pages/inventorymanagement/serch.js
 const app = getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     name: "",
     ckname: "",
     inputkey: "",
     cknamelistdate: [],
     khnamelistdate: [],
     page: '',
     totalDataCount: '',
   },
   //模态框
   powerDrawer: function (e) { 
     var currentStatu = e.currentTarget.dataset;
     let biaos = e.currentTarget.dataset.biaos
     this.setData({
       biaos,
     })
     this.util(currentStatu)
     if (currentStatu.biaos == 'khName') {
       this.getcpname(this.data.inputkey);
     } else if (currentStatu.biaos == 'ywyName') {
       this.getckname();
     }
   },
   getcpname: function (inputkey) {
     wx.showLoading({
       title: '加载中..',
     })
     var page = 1
     let url = app.globalData.url + '/order?action=PCfuzzyQuery&rows=20&page=1&mobile=true&table=cpxx'
     let data = new Object()
     data.proname = inputkey
     app.wxRequest("POST", url, {
       'params': JSON.stringify(data)
     }, (res) => {
       wx.hideLoading(); 
       let khnamelistdate = res.data.rows
       var totalDataCount = khnamelistdate.length;
       if (khnamelistdate.length != 0) {
         this.setData({
           khnamelistdate,
           totalDataCount,
           page
         })
       } else {
         wx.showToast({
           title: '未搜索到内容',
           icon: "none"
         })
       }
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
    let url = app.globalData.url + '/order?action=PCfuzzyQuery&rows=20&page='+page+'&mobile=true&table=cpxx'
    let data = new Object()
    data.proname = this.data.inputkey
    app.wxRequest("POST", url, {
      'params': JSON.stringify(data)
    }, (res) => {
      wx.hideLoading(); 
      var list = res.data.rows;
      var totalDataCount = this.data.totalDataCount;
      totalDataCount = totalDataCount + list.length;
      let khnamelistdate = this.data.khnamelistdate
      if (khnamelistdate != '') {
        this.setData({
          khnamelistdate:khnamelistdate.concat(res.data.rows),
          page: page,
          totalDataCount,
        })
      } else {
        wx.showToast({
          title: '未搜索到内容',
          icon: "none"
        })
      }
    }, (err) => {
      wx.hideLoading(); 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
   },
  // 页面上拉触底事件的处理函数 
  // onReachBottom: function () { 
  //   this.next(this.data.inputkey)
  // },
   getchooseckname: function (e) { 
     this.setData({
       showModalStatus: false,
       ckname: e.currentTarget.dataset.ywyname
     })
   },
   getchoosegetcpname: function (e) { 
     this.setData({
       showModalStatus: false,
       name: e.currentTarget.dataset.khname
     })
   },
   serchinput: function (e) {
     if (this.data.biaos == 'khName') {
       this.setData({
         inputkey: e.detail.value
       })
       this.getcpname(e.detail.value)
     } else {}
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
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   getinput: function (e) { 
     this.setData({
       name: e.detail.value
     })
   },
   getckinput: function (e) { 
     this.setData({
       ckname: e.detail.value
     })
   },
   cler: function () {
     this.setData({
       name: '',
       ckname: "",
     })
   },
   serch: function () {
     let name = this.data.name
     let ckname = this.data.ckname
     this.serchdata(name, ckname)
   },
   serchdata: function (name, ckname) { 
     wx.showLoading({
       title: '加载中..',
     })
     let url = app.globalData.url + '/stock?action=queryAllStock&rows=20&page=1&table=ckxx'
     let data = new Object()
     data.storagenameLIKE =this.data.ckname
     data.pronameEQ = this.data.name
     data.probatchLIKE = ''
     data.protypeidEQ = ''
     data.pronoLIKE = ''
     data.specificationLIKE = ''
     data.providerLIKE = ''
     data.producedateGE = ''
     data.producedateLE = ''
     data.validtimeGE = ''
     data.validtimeLE = ''
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => {
       wx.hideLoading(); 
       let listdate = res.data.rows
       this.setData({
         listdate
       })
       if (res.data.rows.length != 0) {
         wx.setStorageSync('kccxserch', listdate)
         wx.reLaunch({
           url: 'inventoryquery',
         })
       } else {
         wx.showToast({
           title: '未搜索到内容',
           icon: "none"
         })
       }
     }, (err) => {
       wx.hideLoading(); 
       wx.showToast({
         title: '服务器请求出错',
         icon: "none"
       })
     })
   },
   getckname: function () {
     wx.showLoading({
       title: '加载中..',
     })
     let url = app.globalData.url + '/storage?action=getAllStorages'
     let data = new Object()

     app.wxRequest("POST", url, data, (res) => {
       wx.hideLoading(); 
       let cknamelistdate = res.data

       if (cknamelistdate != '') {
         this.setData({
           cknamelistdate
         })
       } else {
         wx.showToast({
           title: '未搜索到内容',
           icon: "none"
         })
       }
     }, (err) => {
       wx.hideLoading(); 
       wx.showToast({
         title: '服务器请求出错',
         icon: "none"
       })
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