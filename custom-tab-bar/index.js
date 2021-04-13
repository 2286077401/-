// custom-tab-bar/index.js
 const app=getApp();
  Component({
    /**
     * 组件的属性列表
     */
    properties: {
      tabs:{
        type:String,
        value:"",
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      selected: 0,
      color: "#999999",
      selectedColor: "#D49929",
      foot: [
        {
          "url": "/pages/index/index",
          "iconPath": "/pages/images/zy.png",
          "selectedIconPath": "/pages/images/zyactive.png",
          "text": "主页"
        },
        {
          "url": "/packageB/pages/msg/msg",
          "iconPath": "/pages/images/xx.png",
          "selectedIconPath": "/pages/images/xxactive.png",
          "text": "消息"
        },
        {
          "url": "/packageA/pages/map/map",
          // "url": "/pages/reportform/reportform",
          "iconPath": "/pages/images/bb.png",
          "selectedIconPath": "/pages/images/bbactive.png",
          "text": "报表"
        },
        {
          "url": "/pages/crm/crm",
          "iconPath": "/pages/images/crm.png",
          "selectedIconPath": "/pages/images/crmactive.png",
          "text": "CRM"
        },
        {
          "url": "/pages/user/user",
          "iconPath": "/pages/images/my.png",
          "selectedIconPath": "/pages/images/myActive.png",
          "text": "我的"
        },
      ],
    },
    lifetimes: {
      attached: function() {
        let ind= +app.globalData.selected

        this.setData({
          selected:ind
        }) 
      },
    },
    /**
     * 组件的方法列表
     */
    methods: {
      navigateTo(e) { 
        const data = e.currentTarget.dataset
        const url = data.path
        // if(data.index==2){
        //    wx.showToast({
        //      title: '建设中...',
        //      icon:"none"
        //    })

        //    return ;
        // }
        app.globalData.selected= data.index
        wx.reLaunch({ url })
        // this.setData({
        //   selected: data.index,
        // })
      }
    }
  })
 