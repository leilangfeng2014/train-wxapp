// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      userId: '',
      lastMessage: null,
      tcardData: null,
      index:0,
      numArray: [],
      numNameArray: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      that.setData({
        'userId':app.globalData.loginUser.userId
      })
      var numArray = [];
      var numNameArray = [];
      for(var i=1; i<31; i++){
          numArray.push(i);
          numNameArray.push(i+" 天")
      }
      that.setData({
          numArray: numArray,
          numNameArray: numNameArray
      });
    },

    onShow: function () {
      var that = this;
      that.teacherCard(that.data.userId);
      that.getLastMessage();
    },

    bindPickerChange: function(e){
      var that = this;
      var days = that.data.numArray[e.detail.value];
      request.post("aftercare/create", {
        teacherId: that.data.userId,
        days: days
      }).then( (res) => {
        that.teacherCard(that.data.userId);
      })
    },

    teacherCard: function (userId) {
      var that = this;
      request.get("teacher/teacherCard", {
        userId: userId,
      }).then( (res) => {
        if(res.afterCare){
          app.globalData.afterCareId = res.afterCare.afterCareId;
          var a = res.afterCare.stuCompletedCount;
          var b = res.afterCare.stuCount;
          util.drawCicle(a, b, 98, 98, 'canvasArc');
        }
        that.setData({'tcardData': res});

      })
    },

    getLastMessage: function () {
      var that = this;
      request.get("notifymessage/lastMessage", {}).then( (res) => {
        that.setData({'lastMessage': res})
      })
    },

    toCare: function (e) {
      if(e.currentTarget.dataset.status){
        wx.switchTab({
          url: '/pages/care/care',
        })
      }
    },

    toTrain: function (){
      wx.switchTab({
        url: '/pages/train/train',
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
    // onShow: function () {

    // },

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

    },
    /**
     * 用户点击右上角分享
     */
    closePage: function () {

    }
  })
