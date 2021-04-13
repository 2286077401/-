 const app = getApp();
 var startX, endX; //首先创建2个变量 来记录触摸时的原点
 var moveFlag = true; // 判断执行滑动事件

 Page({
   /**
    * 页面的初始数据
    */
   data: {
     unitprice: '',
     inputKhname: "",
     numdw: "",
     ledindex: "",
     cpcouont: "",
     flag: true,
     dwindex: "",
     //控制变量
     controlStr: 0,
     inputproname: "",
     imgUrl: "",
     //单位下拉框
     dj: "",

     xlindex: "",
     productMsg: [],
     productData: [],

     // selectData: ['消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
     xslxindex: '', //选择的下拉列 表下标,
     paidtypeid: "", //付款方式id
     khItem: [], //下單客户名称
     khMsg: [], //客户信息余额地址...
     yewuyuanMsg: [], //业务员信息
     proNum: '', //所选产品对应下标
     ordertime: "", //下单时间
     reciever: "", //收货人
     ordernote: "", //备注
     receivertel: "", //收货电话
     logisticsname: "", //物流名称
     wuliuID: "", //物流id
     paidtype: "", //支付方式
     ordermoney: "",
     returnordermoney: "",
     hideShare: false,
     xslxshow: false,
     pagee: 1,
     ani1: '',
     ani2: '',
     currentab: '0',
     isdaishou: true,
     //客户名称选择
     khName: "",
     getKhname: '',
     //客户名称滚动加载
     khNamepage: 1,
     khNametotalDataCount: '',
     //产品滚动加载
     cpnamepage: 1,
     cpnametotalDataCount: '',
     biaos: "",
     // khName:false,
     //付款方式
     getFkway: "",
     getWlname: "",
     getCpname: "",
     getDw: "",
     //  销售类型
     getXsclass: "",
     page: 1,
     totalDataCount: '',
     //搜索结果
     isSearch: 'true',
     searchOrder: [],
     //
     custID: "",
     //代收金额
     daishoumoney: "",

     orderNumber: [{
       getdanjia: "",
       getKhname: '',
       getDw: '',
       getsaletypeid: '',
       getguige: '',
       getdanjia: '',
       getzhehou: '',
       getXsclass: '',
       getshuliang: '',
       getfanli: '',
       getjine: '',
       getzhehoujine: '',
       getprono: '',
       gettype: '',
       getacctype: '', //单位id

       getbianma: '',
       gettuihuoshuliang: "",
       gettuihuojine: "",
       getdwId: "", //批號
       getproid: "",
       prounitid: "",
     }],
     //产品名称
     cpNamemodelData: [],
     // 模态框数据
     wlmodelData: [],
     fkWayData: [],
     tempFilePaths: "",
     pics: [], //图片
     canpingproid: '',
     danweiid: "",
     tuihuoshuliangnum: "",
     serchflag: "",
   },
   tuihuoshuliang: function (e) {
     let index = wx.getStorageSync('index')
     var temp_strdj = 'orderNumber[' + index + '].gettuihuoshuliang';
     var temp_strje = 'orderNumber[' + index + '].gettuihuojine';

     let pric = this.data.orderNumber[index].getjine
     let thallje = parseFloat(pric) * parseFloat(e.detail.value)
 
     this.setData({
       tuihuoshuliangnum: e.detail.value,
       [temp_strdj]: e.detail.value,
       [temp_strje]: thallje,

     })
     var officersIds = this.data.orderNumber.map(function (officer) {
       return officer.gettuihuojine;
     });
     this.tootlemany(officersIds) 
   },
   tootlemany: function (officersIds) {
     var s = 0;
     for (var i = officersIds.length - 1; i >= 0; i--) {
       s += officersIds[i];
     }
     this.setData({
       salesmoneyall: s
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
   //延时
   sleep: function (numberMillis) {
     var now = new Date();
     var exitTime = now.getTime() + numberMillis;
     while (true) {
       now = new Date();
       if (now.getTime() > exitTime)
         return;
     }
   },
   /**
    * 图片上传
    * 
    */
   imgupload: function (pidid) {
     let that = this
     let tempFilePaths = that.data.pics
     let urlpath = app.globalData.url 
     for (var i = 0; i < tempFilePaths.length; i++) {
       that.sleep(1000) 
       wx.uploadFile({
         url: urlpath + "/Upload?action=add&tableName=sto_goods_return&mobile=true",
         filePath: tempFilePaths[i],
         name: 'file',
         formData: {
           'tableId': pidid,
           'photoename': '',
           'flag': '1',
           'place': '',
           'filenote': '',
           'file': ''
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
           that.clicktab1();
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
     }
   },
   //上传图片开始
   chooseImg: function (e) {
     var that = this,
       pics = this.data.pics; 
     if (pics.length < 4) {
       wx.chooseImage({
         count: 4, // 最多可以选择的图片张数，默认9
         sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
         sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
         success: function (res) {
           // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
           var tempFilePaths = res.tempFilePaths;
           that.setData({
             tempFilePaths,
           })

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
         title: '最多上传4张图片',
         icon: 'none',
         duration: 3000
       });

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

   //单位价格
   getdanwei: function () {
     let url = app.globalData.url + '/order?action=getPriceByUnit'
     let data = new Object()
     data.custid = this.data.custID
     data.proid = this.data.custID
     data.unitid = this.data.unitidID
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => { 
       this.setData({
         wlmodelData: res.data
       })
     }, (err) => { 
       wx.showToast({
         title: '服务器请求失败',
         icon: "none"
       })
     })
   },
  
   //表单事件

    
   inputDaishou: function (option) { 
     this.setData({
       daishoumoney: option.detail.value
     })
   },
 
   inputshouhuor: function (option) {
     this.setData({
       reciever: option.detail.value
     })
   },
   inputshPhone: function (option) { 
     this.setData({
       receivertel: option.detail.value
     })
   },
   inputDz: function (option) {
     this.setData({
       ['khMsg.receiveaddr']: option.detail.value
     }) 
   },
   inputBeizhu: function (option) { 
     this.setData({
       ordernote: option.detail.value
     })
   },
   inputCpname: function (option) {
     //cpNamemodelData 
     this.setData({
       inputproname: option.detail.value
     })
   },
    
   djinput: function (option) { 
     let index = option.currentTarget.dataset.index
     wx.setStorageSync('index', index)
   },
 
   inputCount: function (option) { 
     let allindex = wx.getStorageSync('index')
     var temp_strcount = 'orderNumber[' + allindex + '].getshuliang';
     var temp_strjine = 'orderNumber[' + allindex + '].getjine';
     var temp_strzhjine = 'orderNumber[' + allindex + '].getzhehoujine';
     let val = option.detail.value
     let jine = val * this.data.orderNumber[allindex].getdanjia
     let zhjine = val * this.data.orderNumber[allindex].getzhehou 
     this.setData({
       cpcouont: option.detail.value,
       [temp_strcount]: option.detail.value,
       [temp_strjine]: jine,
       // ordermoney:jine,
       [temp_strzhjine]: zhjine,
       // returnordermoney: zhjine,
     })
   },
    

  
   //提交订单
   submitOrder: function () { 
     if (this.data.getKhname == '' || this.data.getKhname == undefined) {
       wx.showToast({
         title: '请选择客户姓名',
         icon: "none"
       })
       return;
     }
     let url = app.globalData.url + '/goodsreturn?SP=true&action=addReturnByCust&table=sto_goods_return'
     let listdata = {
       // this.encodeUTF8(this.data.picmiaoshu)
       'table': 'thxx',
       'salesmoney': this.data.salesmoneyall,
       'custid': this.data.custID,
       'custname': this.data.getKhname,
       'salerid': this.data.fkWayData[0].id,
       'saler': this.data.fkWayData[0].name,
       'returnreason ': this.data.ordernote,
       'thmxList': []
     }
     for (var i = 0; i < this.data.orderNumber.length; i++) {
       let data = new Object();
       data.table = 'thmx'
       data.proid = this.data.orderNumber[i].getacctype
       data.proname = this.data.orderNumber[i].getKhname
       data.procount = this.data.orderNumber[i].gettuihuoshuliang
       data.specification = this.data.orderNumber[i].getguige
       data.prono = this.data.orderNumber[i].getbianma
       data.prounitname = this.data.orderNumber[i].getDw
       data.prounitid = this.data.orderNumber[i].getproid
       data.singleprice = this.data.orderNumber[i].getjine
       data.goodsmoney = this.data.orderNumber[i].gettuihuojine
       data.probatch = this.data.orderNumber[i].getdwId
       listdata.thmxList.push(data);
     } 

     app.wxRequest("POST", url, {
       'data': JSON.stringify(listdata)
     }, (res) => {
       wx.hideLoading() 
       wx.showToast({
         title: res.data.msg,
       })
       this.setData({
         picid: res.data.id
       })
       if (this.data.pics.length == 0) {
         this.clicktab1();
       } else {
         this.imgupload(res.data.id);
       }
     }, (err) => {
       wx.hideLoading() 
       wx.showToast({
         title: '请求服务器出错',
         icon: "none"
       })
     })
   },
   //添加产品列表
   addProduct: function (e) { 
     let list = this.data.orderNumber

     list.push({
       getdanjia: "",
       getKhname: '',
       getDw: '',
       getsaletypeid: '',
       getguige: '',
       getdanjia: '',
       getzhehou: '',
       getXsclass: '',
       getshuliang: '',
       getfanli: '',
       getjine: '',
       getzhehoujine: '',
       getprono: '',
       gettype: '',
       getacctype: '', //单位id

       getbianma: '',
       gettuihuoshuliang: "",
       gettuihuojine: "",
       getdwId: "", //批號
       getproid: "",
       prounitid: "",
     })
     this.setData({
       orderNumber: list,
     }) 
   },
   //删除产品列表mainProduct
   mainProduct: function (e) { 
     let numlist = []
     let index = e.currentTarget.dataset.index 
     let lists = this.data.orderNumber
     if (this.data.orderNumber.length == 1) {
       wx.showToast({
         title: '至少添加一种产品',
         icon: "none"
       })
       return;
     }
     lists.splice(index, 1)
     this.setData({
       orderNumber: lists
     }) 
   },
   //物流查询
   wlCx: function (e) { 
     wx.navigateTo({
       url: '/pages/orderManagement/ inquiry?orderno=' + e.currentTarget.dataset.orderno,
     })
   },
   //物流名称第一页
   wulName: function () {
     let url = app.globalData.url + '/customer?action=getSelectLog'
     let data = new Object()
     // data.rows='10'
     // data.page='0'
     app.wxRequest("POST", url, data, (res) => { 
       this.setData({
         wlmodelData: res.data
       })
     }, (err) => { 
       wx.showToast({
         title: '服务器请求失败',
         icon: "none"
       })
     })
   },

   //付款方式
   fkWay: function () {
     let url = app.globalData.url + '/account?action=getPrincipalByCust'
     let data = new Object()
     // data.rows='10'
     data.custidEQ = this.data.custID
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => { 
       this.setData({
         fkWayData: res.data,
         paidtype: res.data[0].name,
         paidtypeid: res.data[0].id,
       })
     }, (err) => { 
       wx.showToast({
         title: '服务器请求失败',
         icon: "none"
       })
     })
   },
   //销售类型
   saletyepid: function (Ind, allindex) {
     let url = app.globalData.url + '/sysbase?type=saletype&action=getSelectType'
     let data = new Object()
     // data.rows='10'
     // data.page='0'
     app.wxRequest("POST", url, data, (res) => { 
       if (Ind == '0') {
         let list = res.data[0]
         var temp_getsaletypeid = 'orderNumber[' + allindex + '].getsaletypeid';
         // wx.setStorageSync('danweiId', list)
         this.setData({
           [temp_getsaletypeid]: list.id
         })
       } else if (Ind == '1') {
         let list = res.data[1]
         var temp_getsaletypeid = 'orderNumber[' + allindex + '].getsaletypeid';
         // wx.setStorageSync('danweiId', list)
         this.setData({
           [temp_getsaletypeid]: list.id
         })
       }
       this.setData({
         selectleix: res.data.data
       })
     }, (err) => { 
       wx.showToast({
         title: '服务器请求失败',
         icon: "none"
       })
     })
   },

   //跳转
   goorderDetail: function (e) { 

     // let item = JSON.stringify(e.currentTarget.dataset.item) 
     wx.setStorageSync('orderdetail', e.currentTarget.dataset.item)
     wx.navigateTo({
       url: 'orderDetail?id=' + e.currentTarget.dataset.id,
       // url: '/pages/orderManagement/orderDetail?id=' + e.currentTarget.dataset.id + '&item=' + item,
     })
   },
   //查询
   chaxun: function (options) {
     wx.navigateTo({
       url: 'orderSearch?item=',
     })
   },
   // 页面上拉触底事件的处理函数 
   onReachBottom: function () { 
     if (this.data.serchflag == 'serch' && this.data.dataArray.length < 50) {
       wx.showToast({
         title: '已加载全部数据',
         icon: "none"
       })
     } else {
       this.next()
     }

   },
   //请求第一页数据
   getList: function () {
     var that = this;
     var page = 1
     wx.showLoading();
     let url = app.globalData.url + '/goodsreturn?action=queryReturn&page=1&rows=10&table=thxx'
     let data = new Object()
     data.statusNE = '1'
     // data.rows='10'
     // data.page='0'
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => {
       var list = res.data.rows
       var totalDataCount = list.length; 
       that.setData({
         dataArray: list,
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

   //请求下一页数据
   next: function () {
     wx.showLoading();
     var page = this.data.page;
     page += 1;
     let url = app.globalData.url + '/goodsreturn?action=queryReturn&page=' + page + '&rows=10&table=thxx'
     let data = new Object()
     data.statusNE = '1'
     //  data.rows='10'
     //  data.page=page
     app.wxRequest("POST", url, {
       "parmas": JSON.stringify(data)
     }, (res) => {
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

   getthisindex: function (e) {
     let index = e.currentTarget.dataset.index
     wx.setStorageSync('index', index)
   },
   inputcpph: function (e) { 
     let index = e.currentTarget.dataset.index
     wx.setStorageSync('index', index)
     let order_getdwId = 'orderNumber[' + index + '].getdwId'
     this.setData({
       [order_getdwId]: e.detail.value
     })
   },



   catchtouchmove() {}, //防止穿透
   guanbi: function () {
     this.setData({
       hideShare: false
     })
   },
   // 模块遮罩层
   chooseShare: function (e) {
     if (e.currentTarget.dataset.biaos != 'getKhname') {
       if (this.data.getKhname == '' || this.data.getKhname == undefined) {
         wx.showToast({
           title: '请选择客户姓名',
           icon: "none"
         })
         return;
       }
     } 
     var that = this; 
     this.setData({
       numdw: e.currentTarget.dataset.index
     })
     if (this.data.controlStr == 0 && e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.biaos == 'getKhname') {
       let a = 1
       this.setData({
         controlStr: a
       })
       let index = e.currentTarget.dataset.index
       wx.setStorageSync('index', index)

     } else if (e.currentTarget.dataset.index != undefined && this.data.controlStr != 0) {
       let index = e.currentTarget.dataset.index
       wx.setStorageSync('index', index)

     } else if (e.currentTarget.dataset.biaos == 'getDw') {
       if (e.currentTarget.dataset.dwbiaos == 'first') {
         let index = e.currentTarget.dataset.dwindex
         wx.setStorageSync('index', index)
       }
       let allindex = wx.getStorageSync('index')
       if (this.data.orderNumber[allindex].getKhname == '' || this.data.orderNumber[allindex].getKhname == undefined) {
         wx.showToast({
           title: '请先选择产品',
           icon: "none"
         })
         return;
       } 
       if (allindex == 0) {
         // let a='1'
         let a = wx.getStorageSync('productMsg') 
         if (a.length < 3) {
           let list = wx.getStorageSync('productMsg')
           let xb = allindex
           let xb1 = allindex + 1
           let handleProductMsg = list[xb]
           let handleProductMsg1 = list[xb1]
           let productMsg = []
           productMsg[0] = handleProductMsg
           productMsg[1] = handleProductMsg1 
           this.setData({
             productMsg
           })
         } else { 
           let list = wx.getStorageSync('productMsg')
           let xb = allindex + 2
           let handleProductMsg = list[xb] 
           this.setData({
             productMsg: handleProductMsg
           })
         }
       } else {
         let list = wx.getStorageSync('productMsg')
         let xb = allindex + 2
         let handleProductMsg = list[xb]
         this.setData({
           productMsg: handleProductMsg,
         }) 
       } 
       this.setData({
         biaos: e.currentTarget.dataset.biaos,
         // [temp_str]:e.currentTarget.dataset.cpname
       })
       var hides = that.data.hideShare;
       if (hides == true) {
         that.setData({
           hideShare: false
         })
       } else if (hides == false) {
         that.setData({
           hideShare: true
         })
       }
       return;
     }
     let index = wx.getStorageSync('index')
     var temp_str = 'orderNumber[' + index + '].getKhname';
     that.setData({
       dwindex: e.currentTarget.dataset.dwindex,
       biaos: e.currentTarget.dataset.biaos,
       [temp_str]: e.currentTarget.dataset.cpname
     })
     that.setData({
       biaos: e.currentTarget.dataset.biaos,
       // [temp_str]:e.currentTarget.dataset.cpname
     })
     var hides = that.data.hideShare;
     if (hides == true) {
       that.setData({
         hideShare: false
       })
     } else if (hides == false) {
       that.setData({
         hideShare: true
       })
     }

     if (e.currentTarget.dataset.biaos == 'getWlname') {
       this.wulName()
     } else if (e.currentTarget.dataset.biaos == 'getFkway') {
       this.fkWay();
     } else if (e.currentTarget.dataset.biaos == 'getCpname') {
       this.productData(this.data.inputproname);
     } else if (e.currentTarget.dataset.biaos == 'getXsclass') {

     } else if (e.currentTarget.dataset.biaos == 'getDw') {

     }
     if (e.currentTarget.dataset.biaos == 'getKhname') {
       this.tkhName(this.data.tkhName);
     }
   },
   // 模块遮罩层
   chooseSharecpName: function (e) { 
     let unitprice = e.currentTarget.dataset.proitem
     let index = wx.getStorageSync('index')
     //  let orser_getproid = ' orderNumber[' + index + '].getproid'
     let orser_getKhname = 'orderNumber[' + index + '].getKhname'
     let orser_getacctype = 'orderNumber[' + index + '].getacctype'
     let orser_getproid = 'orderNumber[' + index + '].getproid'
  
     this.setData({
       hideShare: false,
       unitprice,
       canpingproid: unitprice.id,
       danweiid: unitprice.mainunit,
       [orser_getproid]: unitprice.mainunit,
       [orser_getKhname]: unitprice.proname,
       [orser_getacctype]: unitprice.mainunit,
     })
     this.getdanweiprice(unitprice.id, unitprice.mainunit)
     // getdanweiprice:function(proid,unitid){

     var temp_str = 'orderNumber[' + index + '].getKhname';
     var temp_dw = 'orderNumber[' + index + '].getDw';
     var temp_bianma = 'orderNumber[' + index + '].getbianma';
     var temp_guigew = 'orderNumber[' + index + '].getguige';
     this.setData({
       [temp_str]: e.currentTarget.dataset.cpname,
       [temp_dw]: e.currentTarget.dataset.proitem.mainunitname,
       [temp_bianma]: e.currentTarget.dataset.proitem.prono,
       [temp_guigew]: e.currentTarget.dataset.proitem.specification,
     })
 
     let arr = e.currentTarget.dataset.proitem
 
     wx.setStorageSync('productMsg', arr)
  
    
   },
   //销售类型遮罩层

   showMask: function (e) { 
     let index = e.currentTarget.dataset.index
     wx.setStorageSync('index', index)
     var hides = this.data.xslxshow;
     if (hides == true) {
       this.setData({
         xslxshow: false
       })
     } else if (hides == false) {
       this.setData({
         xslxshow: true
       })
     }
     this.setData({
       flag: false
     })
   },
   closeMask: function (e) { 
     let index = wx.getStorageSync('index')
     let led = e.currentTarget.dataset.led
     if (led == '0') {
       var temp_strlx = 'orderNumber[' + index + '].getXsclass';
       var temp_strdj = 'orderNumber[' + index + '].getdanjia';
       var temp_strzh = 'orderNumber[' + index + '].getzhehou';
       var temp_strjine = 'orderNumber[' + index + '].getjine';
       var temp_strzhjine = 'orderNumber[' + index + '].getzhehoujine';
       let val = this.data.cpcouont
       let led = this.data.ledindex 
       if (this.data.ledindex === '') {
         wx.showToast({
           title: '请确认产品单位',
           icon: "none"
         })
         this.setData({
           flag: true,
           xslxshow: false
         })
       } 
       let jine = val * this.data.productMsg[led].proprice
       let zh = this.data.productMsg[led].proprice * (1 - this.data.productData.returnrate)
       let zhjine = val * zh 
       this.setData({
         flag: true,
         xslxshow: false,
         [temp_strlx]: e.currentTarget.dataset.type,
         [temp_strdj]: this.data.productMsg[led].proprice,
         [temp_strzh]: zh,
         [temp_strjine]: jine,
         [temp_strzhjine]: zhjine,
       })

     } else {
       var temp_strlx = 'orderNumber[' + index + '].getXsclass';
       // var temp_strdw = 'orderNumber[' + index + '].getDw';
       var temp_strdj = 'orderNumber[' + index + '].getdanjia';
       var temp_strzh = 'orderNumber[' + index + '].getzhehou';
       var temp_strjine = 'orderNumber[' + index + '].getjine';
       var temp_strzhehoujine = 'orderNumber[' + index + '].getzhehoujine';
       this.setData({
         flag: true,
         xslxshow: false,
         [temp_strzh]: 0,
         [temp_strjine]: 0,
         [temp_strdj]: 0,
         [temp_strzhehoujine]: 0,
         [temp_strlx]: e.currentTarget.dataset.type,
       })
     }
   },

   //客户姓名滚动
   khNamelower(e) { 
     if (this.data.biaos == 'getKhname') {
       this.khNamenext()
     } else if (this.data.biaos == 'getCpname') {
       this.khNamenext()
     }
   },
   //加载产品
   productData: function (inputproname) {
     wx.showLoading()
     var page = 1
     // var custId = wx.getStorageSync('user').account.custid;
     let url = app.globalData.url + '/easyui?action=proComboGrid&table=fhxx&page=1&rows=20'
     let data = new Object()
     data.q = inputproname
     // data.rows='10'
     // data.page='0'
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => {
       wx.hideLoading() 
       var list = res.data.rows
       var totalDataCount = list.length;
       this.setData({
         cpNamemodelData: res.data.rows,
         cpnamepage: page,
         cpnametotalDataCount: totalDataCount
       })
     }, (err) => {
       wx.hideLoading() 
       wx.showToast({
         title: '服务器请求失败',
         icon: "none"
       })
     })
   },
   //显示大图
   bigImg: function (e) { 
     let imgdizhi = e.currentTarget.dataset.imgdata
     let imgs = this.data.imgUrl + imgdizhi
     let arr = []
     arr.push(imgs)
     wx.previewImage({
       current: imgs, // 当前显示图片的http链接
       urls: arr, // 需要预览的图片http链接列表
     }) 
   },
   //请求下一页名客户姓产品信息滚动
   khNamenext: function () {
     if (this.data.biaos == 'getKhname') {
       wx.showLoading()
       var page = this.data.khNamepage;
       page += 1;
       let url = app.globalData.url + '/customer?action=getSelectName&page=' + page + '&rows=20'
       let data = new Object()
       //  data.rows='10'
       //  data.page=page
       app.wxRequest("POST", url, data, (res) => {
         wx.hideLoading() 
         var list = res.data.rows;
         // 计算当前共加载了多少条数据，
         var totalDataCount = this.data.totalDataCount; 
         // totalDataCount = totalDataCount + list.length;
         let khName = this.data.khName
         this.setData({
           khName: khName.concat(res.data.rows),
           khNamepage: page,
           khNametotalDataCount: totalDataCount
         }) 
         wx.hideLoading()
       }, (err) => {
         wx.hideLoading() 
         wx.showToast({
           title: '请求服务器出错',
           icon: "none"
         })
         wx.hideLoading()
       })

     } else if (this.data.biaos == 'getCpname') {
       wx.showLoading()
       var page = this.data.cpnamepage;
       page += 1;
       // var custId = wx.getStorageSync('user').account.custid;
       let url = app.globalData.url + '/easyui?action=proComboGrid&page=' + page + '&rows=20'
       let data = new Object()
       data.q = this.data.inputproname

       // data.rows='10'
       // data.page='0'
       app.wxRequest("POST", url, {
         "params": JSON.stringify(data)
       }, (res) => {
         wx.hideLoading()
         var list = res.data.rows;
         // 计算当前共加载了多少条数据，
         var cpnametotalDataCount = this.data.cpnametotalDataCount; 
         let cpNamemodelData = this.data.cpNamemodelData
         this.setData({
           cpNamemodelData: cpNamemodelData.concat(res.data.rows),
           cpnamepage: page,
           cpnametotalDataCount: cpnametotalDataCount
         })
       }, (err) => {
         wx.hideLoading() 
         wx.showToast({
           title: '服务器请求失败',
           icon: "none"
         })
       })
     }
     // else if(this.data.biaos == 'getWlname'){

     // }

   },

   //客户名称选择
   tkhName: function (inputKhname) {
     var khNamepage = 1
     this.setData({
       khNamedataArray: []
     })
     wx.showLoading() 
     let url = app.globalData.url + '/customer?action=getSelectName&mobile=true&table=khxx&row=20&page=1'
     let data = new Object()
     // data.custidEQ = custID
     data.nameLIKE = inputKhname
     app.wxRequest("POST", url, data, (res) => { 
       var list = res.data.rows
       var totalDataCount = list.length;
       this.setData({
         khName: res.data.rows,
         khNamepage: khNamepage,
         khNametotalDataCount: totalDataCount
       })
       wx.hideLoading()
     }), (err) => { 
       wx.hideLoading()
     }
   },
   //请求浏览对应数据
   getOrderList: function () {
     wx.showLoading();
     let url = app.globalData.url + '/order?action=getBeans'
     let data = new Object()
     data.isvalidEQ = '1'
     // data . table ='ddxx'
     app.wxRequest("POST", url, {
       "parmas": JSON.stringify(data)
     }, (res) => { 
       wx.hideLoading()
     }, (err) => { 
       wx.showToast({
         title: '请求服务器失败',
         icon: "none"
       })
       wx.hideLoading()
     })
   },
   //是否代收isdaishou
   changeds: function () {
     this.setData({
       isdaishou: true
     }) 
   },
   changedsf: function () {
     this.setData({
       isdaishou: false
     }) 
   },
   /**
    * 详情与售后左滑右滑事件
    */
   onLoad: function (e) { 
     if (e.serchlistdata !== undefined && e.serchlistdata !== '') {
       let dataArray = JSON.parse(e.serchlistdata)
       this.setData({
         dataArray,
         serchflag: e.flag
       })
     } else {
       this.getList();
     }
   },

   onShow: function () {

   },
   touchStart: function (e) {
     startX = e.touches[0].pageX; // 获取触摸时的原点
     moveFlag = true;
   },
   // 触摸移动事件
   touchMove: function (e) {
     endX = e.touches[0].pageX; // 获取触摸时的原点
     if (moveFlag) {
       if (endX - startX > 50) { 
         this.move2right();
         moveFlag = false;
       }
       if (startX - endX > 50) { 
         this.move2left();
         moveFlag = false;
       }
     }
   },
   // 触摸结束事件
   touchEnd: function (e) {
     moveFlag = true; // 回复滑动事件
   },
   clicktab1: function (e) {
     this.move2right();
     this.setData({
       currentab: 0,
       hideShare: false
     })

   },
   clicktab2: function (e) {
     this.move2left();
     this.setData({
       currentab: 1,
       hideShare: false
     })
   },
   close: function () {
     this.setData({
       hideShare: false,
       flag: true,
       xslxshow: false
     }) 
   },
   //向左滑动操作
   move2left() {
     var that = this;
     if (this.data.pagee == 2) {
       return
     }
     var animation = wx.createAnimation({
       duration: 1000,
       timingFunction: 'ease',
       delay: 100
     });
     animation.opacity(0.2).translate(-500, 0).step()
     this.setData({
       ani1: animation.export()
     })
     setTimeout(function () {
       that.setData({
         pagee: 2,
         ani2: '',
         currentab: 1
       });
     }, 300)
   },

   //向右滑动操作
   move2right() {
     this.getList();
     var that = this;
     if (this.data.pagee == 1) {
       return
     }
     var animation = wx.createAnimation({
       duration: 1000,
       timingFunction: 'ease',
       delay: 100
     });
     animation.opacity(0.2).translate(500, 0).step()
     this.setData({
       ani2: animation.export()
     })
     setTimeout(function () {
       that.setData({
         pagee: 1,
         ani1: '',
         currentab: 0
       });
     }, 300)
   },
   //获取客户名称
   getKhname: function (options) { 
     this.setData({
       inputKhname: options.detail.value
     })
   },
   //搜索对应客户名称
   serchKhname: function () {
     // if (this.data.inputKhname == '' || this.data.inputKhname == undefined) {
     //   wx.showToast({
     //     title: '请输入搜索内容',
     //     icon: "none"
     //   })
     //   return;
     // } 
     if (this.data.biaos == 'getKhname') {
       let url = app.globalData.url + '/customer?action=getSelectName&&row=20&page=1'
       let data = new Object();
       data.nameLIKE = this.data.inputKhname
       app.wxRequest("POST", url, {
         "params": JSON.stringify(data)
       }, (res) => { 
         this.setData({
           khName: res.data.rows
         })
       }, (err) => { 
         if (err != '') {
           wx.showToast({
             title: err,
             icon: "none"
           })
         } else {
           wx.showToast({
             title: "请求出错",
             icon: "none"
           })
         }

       })
     }
     wx.showToast({
       title: '搜索' + this.data.inputKhname,
       icon: "none"
     })
   },
   //确认客户名称
   confirmKhname: function (e) {
     // getKhname: 
     let custid = e.currentTarget.dataset.custid
     this.setData({
       getKhname: e.currentTarget.dataset.index,
       custID: custid,
       khItem: e.currentTarget.dataset.khitem
     })
     this.fkWay()
     // this.yewuyuan(custid)
   },
   //搜索对应付款方式
   serchFkway: function () {
     wx.showToast({
       title: '搜索' + this.data.getFkway,
       icon: "none"
     })
   },
   //确认付款方式
   confirmFkway: function (e) {
     // getKhname: 
     this.setData({
       paidtype: e.currentTarget.dataset.index,
       paidtypeid: e.currentTarget.dataset.id,
     })
   },

   //搜索对应物流名称
   serchWlname: function () {
     wx.showToast({
       title: '搜索' + this.data.getWlname,
       icon: "none"
     })
   },
   //确认物流名称
   confirmWlname: function (e) {
     // getKhname: 
     // let wuliuid= 'this.data.khMsg.logisticsid'
     this.setData({
       logisticsname: e.currentTarget.dataset.index,
       wuliuID: e.currentTarget.dataset.wuliuid,
     }) 
   },

   //搜索对应产品名称
   serchCpname: function () {

     wx.showLoading()
     let url = app.globalData.url + '/easyui?action=proComboGrid&row=100&page=1'
     let data = new Object();
     data.q = this.data.inputproname
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => { 
       this.setData({
         cpNamemodelData: res.data.rows
       })
       wx.hideLoading()
     }, (err) => { 
       if (err != '') {
         wx.showToast({
           title: err,
           icon: "none"
         })
       } else {
         wx.showToast({
           title: "请求出错",
           icon: "none"
         })
       }
       wx.hideLoading()
     })
   },
   //确认产品名称
   confirmCpname: function (e) {
     // getKhname: 
     this.setData({
       getCpname: e.currentTarget.dataset.index
     })
   },

   //搜索对应单位
   serchDw: function () {
     wx.showToast({
       title: '搜索' + this.data.getDw,
       icon: "none"
     })
   },
   //单位价格
   getdanweiprice: function (proid, unitid) {
     wx.showLoading()
     let url = app.globalData.url + '/order?action=getPriceByUnit'
     let data = new Object();
     data.custid = this.data.custID
     data.proid = proid
     data.unitid = unitid
     app.wxRequest("POST", url, {
       "params": JSON.stringify(data)
     }, (res) => { 
       let index = wx.getStorageSync('index')
       var temp_strjine = 'orderNumber[' + index + '].getjine';
       var temp_strprounitid = 'orderNumber[' + index + '].getacctype';
       if (this.data.tuihuoshuliangnum == '') {
         this.setData({
           [temp_strjine]: res.data[0].saleprice,
           [temp_strprounitid]: res.data[0].id,
         })
       } else {
         var temp_strje = 'orderNumber[' + index + '].gettuihuojine';
         let pric = res.data[0].saleprice
         let thallje = parseFloat(pric) * parseFloat(this.data.tuihuoshuliangnum)
         this.setData({
           [temp_strjine]: res.data[0].saleprice,
           [temp_strprounitid]: res.data[0].id,
           [temp_strje]: thallje,
         })
       }

       wx.hideLoading()
     }, (err) => { 
       if (err != '') {
         wx.showToast({
           title: err,
           icon: "none"
         })
       } else {
         wx.showToast({
           title: "请求出错",
           icon: "none"
         })
       }
       wx.hideLoading()
     })
   },
   //确认单位

   confirmDw: function (e) {
     // getKhname: 
     this.getdanweiprice(e.currentTarget.dataset.productid, e.currentTarget.dataset.pricesid)
     let index = wx.getStorageSync('index')
     var temp_getproid = 'orderNumber[' + index + '].getproid'
     // let led = e.currentTarget.dataset.led
     var temp_strDw = 'orderNumber[' + index + '].getDw';
     //  var temp_strdj = 'orderNumber[' + index + '].getdanjia';
     var temp_stgetdanjia = 'orderNumber[' + index + '].getdanjia';
     var temp_getacctype = 'orderNumber[' + index + '].getacctype'; 
     this.setData({
       getDw: e.currentTarget.dataset.name,
       [temp_strDw]: e.currentTarget.dataset.name,
       [temp_stgetdanjia]: e.currentTarget.dataset.productid,
       [temp_getacctype]: e.currentTarget.dataset.productid,
       [temp_getproid]: e.currentTarget.dataset.pricesid,
       hideShare: false
     })
   },

   //搜索对应销售类型
   serchXsclass: function () {
     wx.showToast({
       title: '搜索' + this.data.getXsclass,
       icon: "none"
     })
   },
   //确认销售类型
   confirmXsclass: function (e) {
     // getKhname: 
     this.setData({
       getXsclass: e.currentTarget.dataset.index
     })
   },
 })