var util = require('utils/util.js');
var app = getApp();
var request = require('utils/request.js');

App({
    onLaunch: function () {

        // 登录
        wx.login({
            success: res => {
                this.wxLoginSuccessCallback(res);
            }
        })
    },
    wxLoginSuccessCallback: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        request.get('api/getOpenId/teacher', {code}).then((res) => {
            var openId = res.openId;
            this.globalData.openId = openId;
            //如果this.globalData.loginUser == null则通过openId获取登录到用户ID和用户类型
            if (!this.globalData.loginUser) {
                request.get("api/getLoginInfoByOpenId/teacher", {openId}).then((res) => {
                    this.globalData.hasGetLoginUser = true;
                    this.globalData.loginUser = res;
                    //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                    //所以此处加入 callback 以防止这种情况
                    if (this.loginUserCallback) {
                        this.loginUserCallback(res);
                    }
                })
            }
        }).catch((errMsg) => {
            wx.login({
                success: res => {
                    this.wxLoginSuccessCallback(res);
                }
            })
        });
    },

  getWindowWidth: function(cb){
    var that = this;
    if(this.globalData.windowWidth){
      typeof cb == "function" && cb(that.globalData.windowWidth);
    }else{
      wx.getStorage({
        key: 'windowWidth',
        success: function(res) {
          that.globalData.windowWidth = res.data;
          typeof cb == "function" && cb(that.globalData.windowWidth);
        },
        fail: function(){
          wx.getSystemInfo({
            success: function(res) {
              that.globalData.windowWidth = res.windowWidth;
              typeof cb == "function" && cb(that.globalData.windowWidth);
              wx.setStorage({key:"windowWidth", data:that.globalData.windowWidth});
            }
          });
        }
      });
    }
  },
  getWindowHeight: function(cb){
    var that = this;
    if(this.globalData.windowHeight){
      typeof cb == "function" && cb(that.globalData.windowHeight);
    }else{
      wx.getStorage({
        key: 'windowHeight',
        success: function(res) {
          that.globalData.windowHeight = res.data;
          typeof cb == "function" && cb(that.globalData.windowHeight);
        },
        fail: function(){
          wx.getSystemInfo({
            success: function(res) {
              that.globalData.windowHeight = res.windowHeight;
              typeof cb == "function" && cb(that.globalData.windowHeight);
              wx.setStorage({key:"windowHeight", data:that.globalData.windowHeight});
            }
          });
        }
      });
    }
  },
  globalData:{
    userInfo: null,
    openId: null,
    afterCareId: null,
    hasGetLoginUser: false,
    loginUser: null,
    windowWidth: null,
    windowHeight: null,
    firstRqList: null,
    version: '1.0'
  }
})
