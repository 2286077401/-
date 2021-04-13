const app = getApp();
var startX, endX; //首先创建2个变量 来记录触摸时的原点
var moveFlag = true; // 判断执行滑动事件

Component({
  properties: {

  },
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: "",
    isShow: true,
    currentab: 0,
    gylDatalist: [],
    gylDatalistImg: [
      "/pages/images/5kXFYePkni.png", "/pages/images/6berbcwePC.png", "/pages/images/mYQhCKDMGm.png", "/pages/images/3BfjzFBe63.png", "/pages/images/crzx3Y8jjB.png", "/pages/images/2xctMbXrCK.png"
    ],
    cgglDatalist: [],
    cgglDatalistImg: [
      "/pages/images/wjQKaGs4kh.png", "/pages/images/2rjYsynndM.png"
    ],
    oabgDatalist: [],
    oabgDatalistImg: [
      "/pages/images/sx3rcjhkYr.png", "/pages/images/QGjn8BsMHB.png", "/pages/images/CyYKsP5r8i.png", "/pages/images/sJGffRDYeB.png", "/pages/images/SpBSmF2am8.png", "/pages/images/Pxs8X7Nb3X.png"
    ],
  },

  /**
   * 点击导航栏
   */
  //组件生命周期
  ready: function () {

    // var urlList = app.globalData.isinto;
    // if (urlList < 2) {
    //   
    //   app.globalData.isinto ++
  
    // }
    this.getData();

  },
  methods: {
    //页面跳转
    goPage: function (e) { 
      let tzBiaoshi = e.currentTarget.dataset.biaoshi
      if (tzBiaoshi == '产品信息') {
        wx.navigateTo({
          url: '/pages/allList/allList?class=' + '产品信息',
        })
      } else if (tzBiaoshi == '订单管理') {
        wx.navigateTo({
          url: '/pages/orderManagement/orderManagement?class=' + '订单管理',
        })
      } else if (tzBiaoshi == '库存管理') {
        wx.navigateTo({
          url: '/pages/inventorymanagement/inventorymanagement?class=' + '库存管理',
        })
      } else if (tzBiaoshi == '库存查询') {
        wx.navigateTo({
          url: '/pages/inventoryquery/inventoryquery?class=' + '库存查询',
        })
      } else if (tzBiaoshi == '物料信息') {
        wx.navigateTo({
          url: '/pages/materialinformation/materialinformation?class=' + '物料信息',
        })
      } else if (tzBiaoshi == '退货管理') {
        wx.navigateTo({
          url: '/pages/returnedpurchase/returnedpurchase?class=' + '退货管理',
        })
      } else if (tzBiaoshi == '采购管理') {
        wx.navigateTo({
          url: '../../packageA/pages/purchase/purchase?class=' + '采购管理',
        })
      } else if (tzBiaoshi == '供应商管理') {
        wx.navigateTo({
          url: '../../packageB/pages/Supplier/Supplier?class=' + '供应商管理',
        })
      }
    },
    //获取数据/schedule
    getData: function () {
      let url = app.globalData.url + '/schedule?action=getMenu1'
      let data = new Object()
      app.wxRequest('POST', url, {
        'parmas': JSON.stringify(data)
      }, (res) => {
        wx.showLoading({
          title: '加载中...',
        }) 
        if (res.data == 'sessionoutofdate') {
          wx.reLaunch({
            url: '/pages/login/login',
          })
          return;
        }

        let gylData = [];
        let cgglData = [];
        let oabgData = [];
        for (let i = 0; i < res.data.length; i++) {
          let url = res.data[i].url
          if (url == 'cpll' || url == 'cgwlgl' || url == 'ddgl' || url == 'kccx' || url == 'cgkcgl' || url == 'thgl') {
            gylData.push(res.data[i])
          } else if (url == "cgxxgl" || url == "gysxx") {
            cgglData.push(res.data[i])
          } else if (url == "ywywzgl" || url == "rzsb" || url == "kqgl" || url == "fygl" || url == "zkgl" || url == "zykgl") {
            oabgData.push(res.data[i])
          }
        } 
        //供应链
        let gylDatalist = [];
        for (let i = 0; i < gylData.length; i++) {
          if (gylData[i].url == "cpll") {
            gylDatalist[0] = "产品信息"
            // a[0] = gylData[i]
          } else if (gylData[i].url == "cgwlgl") {
            gylDatalist[1] = "物料信息"
            // a[1] = gylData[i]
          } else if (gylData[i].url == "ddgl") {
            gylDatalist[2] = "订单管理"
            // a[2] = gylData[i]
          } else if (gylData[i].url == "kccx") {
            gylDatalist[3] = "库存查询"
            // a[3] = gylData[i]
          } else if (gylData[i].url == "cgkcgl") {
            gylDatalist[4] = "库存管理"
            // a[4] = gylData[i]
          } else if (gylData[i].url == "thgl") {
            // a[5] = gylData[i]
            gylDatalist[5] = "退货管理"
          }
        }
        //采购管理
        let cgglDatalist = [];
        for (let i = 0; i < cgglData.length; i++) {
          if (cgglData[i].url == "cgxxgl") {
            cgglDatalist[0] = "采购管理"
            // a[0] = gylData[i]
          } else {
            cgglDatalist[1] = "供应商管理"
            // a[1] = gylData[i]
          }
        }
        //OA办公
        let oabgDatalist = [];
        for (let i = 0; i < oabgData.length; i++) {
          if (oabgData[i].url == "ywywzgl") {
            oabgDatalist[0] = "位置查询"
            // a[0] = gylData[i]
          } else if (oabgData[i].url == "rzsb") {
            oabgDatalist[1] = "工作日志"
            // a[1] = gylData[i]
          } else if (oabgData[i].url == "kqgl") {
            oabgDatalist[2] = "考情管理"
            // a[1] = gylData[i]
          } else if (oabgData[i].url == "fygl") {
            oabgDatalist[3] = "费用管理"
            // a[1] = gylData[i]
          } else if (oabgData[i].url == "zykgl") {
            oabgDatalist[4] = "资源库管理"
            // a[1] = gylData[i]
          } else if (oabgData[i].url == "zkgl") {
            oabgDatalist[5] = "财务管理"
            // a[1] = gylData[i]
          }
        }
        if (gylDatalist.length < 4) {
          this.setData({
            isShow: false
          })
        } 
        this.setData({
          gylDatalist,
          cgglDatalist,
          oabgDatalist
        })
        wx.hideLoading()
      }, (err) => { 
        wx.showToast({
          title: '服务器请求失败',
          icon: 'none'
        })
      })
    },

    onLoad: function (options) {

      /** 
       * 获取系统信息 
       */
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
        }
      });
    },
    bindChange: function (e) { 
      this.setData({
        currentTab: e.detail.current
      });
    },
    /** 
     * 点击tab切换 
     */
    swichNav: function (e) { 
      var that = this;
      if (this.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current
        })
      }
    },
  }
  //获取数据

})