//app.js
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.login({
      success: res => {
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //ajax
  wxRequest(method, url, data, callback, errFun, token) {
    wx.setStorageSync('token', token)
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'token': token,
        'Cookie': getApp().globalData.Cookie,
      },
      dataType: 'json',
      success: function (res) {
        if (res.header["Set-Cookie"] != null) {
          getApp().globalData.Cookie = res.header["Set-Cookie"]
          wx.setStorageSync('Cookie', res.header["Set-Cookie"])
        }
        if (res.data == 'sessionoutofdate') {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
        callback(res);
      },
      fail: function (err) {
        errFun(err);
      }
    })
  },
  baseUrl: 'https://www.wanandroid.com',
  globalData: {
    userInfo: null,
    // imgurl: 'http://118.190.47.231/jx/',
    imgurl: 'http://192.168.1.199:8080/jingxin/',
    msgimgurl: 'http://192.168.1.199:8080/jingxin/uploadfile/',
    root: 'http://192.168.1.199:8080/jingxin',
    // root:'https://kinsana.lianxiangnet.com:442',
    url: 'http://192.168.1.199:8080/jingxin/servlet',
    // url:'https://kinsana.lianxiangnet.com:442/servlet',
    callback: '&callback=?&1=1',
    Cookie: '',
    selected: "0",
    isinto:0,
  },

 
  httpGet: function (url, data, loading, loadingMsg) {
    return this.httpBase("GET", url, data, loading, loadingMsg);
  },
  httpBase: function (method, url, data, loading = false, loadingMsg) {
    let _this = this;
    let requestUrl = this.baseUrl + url;

    if (loading) {
      wx.showLoading({
        title: loadingMsg || '提交中...',
        mask: true
      });
    } else {
      wx.showNavigationBarLoading()
    }

    function request(resolve, reject) {
      wx.request({
        header: {
          'Content-Type': 'application/json'
        },
        method: method,
        url: requestUrl,
        data: data,
        success: function (result) {
          if (loading) {
            wx.hideLoading();
          } else {
            wx.hideNavigationBarLoading()
          }

          let res = result.data || {};
          let code = res.errorCode;

          if (code !== 0) {
            reject(res);
            if (res.message) {
              wx.showToast({
                title: res.message,
                icon: 'none'
              });
            }
          } else {
            resolve(res);
          }
        },
        fail: function (res) {
          reject(res);
          if (loading) {
            wx.hideLoading();
          } else {
            wx.hideNavigationBarLoading()
          }
          wx.showToast({
            title: '网络出错',
            icon: 'none'
          });
        }
      })
    }
    return new Promise(request);
  },
  request(method, url, data = {}, loading = false, loadingMsg = 'loading...') {
    return new Promise((resolve, reject) => {
      if (loading) {
        wx.showLoading({
          title: loadingMsg,
          mask: true
        });
      } else {
        wx.showNavigationBarLoading()
      }
      wx.request({
        header: {
          'Content-Type': 'application/json'
        },
        method: method,
        url,
        data: data,
        success: function (result) {
          if (loading) {
            wx.hideLoading();
          } else {
            wx.hideNavigationBarLoading()
          }
          if(result.statusCode === 200) {
            const res = result.data || {};
            resolve(res);
          } else {
            wx.showToast({
              title: '出错了',
              icon: 'none'
            });
            reject(res);
          }
          // let code = res.errorCode;
          // if (code !== 0) {
          //   reject(res);
          //   if (res.message) {
          //     wx.showToast({
          //       title: res.message,
          //       icon: 'none'
          //     });
          //   }
          // } else {
          // }
        },
        fail: function (res) {
          reject(res);
          if (loading) {
            wx.hideLoading();
          } else {
            wx.hideNavigationBarLoading()
          }
          wx.showToast({
            title: '网络出错',
            icon: 'none'
          });
        }
      })
    })
  }

})