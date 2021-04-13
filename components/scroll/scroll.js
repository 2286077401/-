 const app = getApp();
 Component({
   properties: {

   },
   data: {
     starty: 0, //开始的位置x
     endy: 0, //结束的位置y
     margintop: 0, //滑动下拉距离
     lodaing: '加载中...',
     headd: true,
     deg: "",
     animationSlow: 'animationSlow', //控制旋转
     dataArray: '',
     page: '',
     totalDataCount: '',
   },
   lifetimes: {
     attached: function () {
       // 在组件实例进入页面节点树时执行
       var that = this;
       var page = 1
       wx.showLoading();
       let url = app.globalData.url + '/stock?action=stockWarnProductBrowse&page=1&rows=10'
       let data = new Object();
       app.wxRequest('POST', url, data, (res) => { 
        wx.hideLoading()
         if(res.data!='sessionoutofdate'){
         var list = res.data.rows
         var totalDataCount = list.length; 
         that.setData({
           dataArray: list,
           page: page,
           totalDataCount: totalDataCount,
           animationSlow:"",
           headd: false,
         })
        }
        
       }, (err) => { 
         wx.hideLoading();
         wx.showToast({
           title: '服务器请求失败',
           icon: "none"
         })
         this.setData({
          animationSlow:"",
         })
       })
     },
     detached: function () {
       // 在组件实例被从页面节点树移除时执行
     },
   },
   methods: {
     // 页面上拉触底事件的处理函数 
     onReachBottom: function () { 
       this.next()
     },
     //请求下一页数据
     next: function () {
       wx.showLoading();
       var page = this.data.page;
       page += 1;
       let url = app.globalData.url + '/stock?action=stockWarnProductBrowse&rows=5&page=' + page
       let data = new Object()

       //  data.rows='10'
       //  data.page=page
       app.wxRequest("POST", url, data, (res) => {
         var list = res.data.rows;
         // 计算当前共加载了多少条数据，来证明这种方式可以加载更多数据
         var totalDataCount = this.data.totalDataCount; 
         totalDataCount = totalDataCount + list.length;
         let dataArray = this.data.dataArray
         this.setData({
           dataArray: dataArray.concat(res.data.rows),
           page: page,
           totalDataCount: totalDataCount
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

     dataList: function () {

     },


     scrollTouchstart: function (e) { 
       let py = e.touches[0].pageY;
       this.setData({
         starty: py
       })
     },
     scrollTouchmove: function (e) { 
       let py = e.touches[0].pageY;
       let d = this.data;
       this.setData({
         endy: py,
         headd: true,
         lodaing: '加载中...',
         deg: e.currentTarget.offsetTop,
       })
       if (py - d.starty < 50 && py - d.starty > -50) {
        
         this.setData({
           margintop: py - d.starty
         })
       }
     },
     scrollTouchend: function (e) {
       let that = this
       this.next(); 
       that.setData({
         starty: 0,
         endy: 0,
         margintop: 0,
         lodaing: '加载成功',
         deg: 0,
         animationSlow: 'animationSlow',
       })
       setTimeout(function () {
         that.setData({
           headd: false,
         })
       }, 3000);
     },
     //请求弹出窗内容
     getlodaing: function () {
       this.setData({
         lodaing: '加载成功',
       })
     },
   }
 })