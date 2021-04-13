//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    rempass: true,
    user: '',
    pwd: '',
  },
  //记住密码
  changerem: function () {
    if (this.data.rempass) {
      this.setData({
        rempass: false
      })
      wx.setStorageSync("logpwd", "");
      wx.setStorageSync("loguse", "");
      // console.log('忘记密码')
    } else {
      wx.setStorageSync('logpwd', this.data.pwd)
      wx.setStorageSync('loguse', this.data.user)
      this.setData({
        rempass: true
      })
      // console.log('记住密码')
    }

  },
  //获取用户名
  getUse: function (e) {
    // console.log(e.detail.value)
    this.setData({
      user: e.detail.value
    })
  },
  //获取密码
  getPwd: function (e) {
    // console.log(e.detail.value)
    this.setData({
      pwd: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //登录mallLogin?action=mallLogin
  login: function () {
    // console.log(this.data.user, this.data.pwd)
    if (this.data.rempass) {
      wx.setStorageSync('logpwd', this.data.pwd)
      wx.setStorageSync('loguse', this.data.user)

      // console.log('忘记密码')
    } else {
      wx.setStorageSync("logpwd", "");
      wx.setStorageSync("loguse", "");
      // console.log('记住密码')
    }
    if (this.data.user == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return;
    }
    if (this.data.pwd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    }
    wx.showLoading();
    //http://192.168.1.199:8080/jingxin/login&params={}+callback
    let url = app.globalData.root + '/login?jsonbiaoshi=yes&imei=&mobile=true&account=' + this.data.user + '&password=' + this.data.pwd + app.globalData.callback
    let data = {}
    app.wxRequest('POST', url, data, (res) => {
      // console.log(typeof (res.data), res.data, JSON.stringify(data), url)
      wx.hideLoading()
      var dataType = typeof (res.data)
      var jsonStr = res.data;
      if (dataType == 'string') {
        //删除最后一个字符串
        let jsonStra = jsonStr.substring(0, jsonStr.length - 1);
        //删除前四个字符串
        let jsonStrb = jsonStra.slice(2);
        let jsonStrc = JSON.parse(jsonStrb)
        let jsonData = JSON.parse(jsonStrc)
        // json字符串转对象
        // console.log(jsonData)
        if (jsonData.isPass == 'false'&& jsonData.info != '登录手机异常，请使用绑定手机登录！') {
          wx.showToast({
            title: jsonData.info,
            icon: "none"
          })
        } else {
          wx.setStorage({
            key: "user",
            data: jsonData
          })
          wx.navigateTo({
            url: '/pages/index/index',
          });
          wx.showToast({
            title: '登录成功',
          })
        }
      } else {
        if (jsonStr.isPass == 'false') {
          wx.showToast({
            title: jsonStr.info,
            icon: "none"
          })
        } else {
          wx.navigateTo({
            url: '/pages/index/index',
          });
          wx.showToast({
            title: '登录成功',
          })
        }
      }
    }, (err) => {
      // console.log(err)
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
      wx.hideLoading();
    })
  },
  onLoad: function () {
    let user = wx.getStorageSync('loguse')
    let pwd = wx.getStorageSync('logpwd')
    this.setData({
      user,
      pwd
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})