// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      userType:'',
      userId: '',
      tCareList: null,
      time: '',
      week: '周四'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      that.setData({
        'time': this.getCurrentMonthFirst(),
        'userType':app.globalData.loginUser.userType,
        'userId':app.globalData.loginUser.userId
      });
    },

    onShow: function () {
      var that = this;
      that.getTCareList();
    },

    getTCareList: function (){
      var that = this;
      var userId = that.data.userId;
      request.get("aftercare/detail/teacher", {
        userId: userId
      }).then( (res) => {
        that.setData({'tCareList': res});
        if(res){
          res.studentList.forEach(function(val){
            if(val.workCount){
              var a = val.completedWorkCount;
              var b = val.workCount;
              util.drawCicle(a, b, 80, 80, 'canvasArc'+val.studentId);
            }
          })
        }
      })
    },

    getCurrentMonthFirst: function(){
      var date = new Date();
      var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth()+1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      return todate;
    },
    bindTimeChange: function(e) {
      let me = this
      this.setData({
        time: e.detail.value
      }, () => {
        console.log(me.data.time)
        console.log(new Date(me.data.time).getDay())
      })
    },

    toDetail: function (e){
      var studentId = e.currentTarget.dataset.studentid;
      wx.navigateTo({
        url: '/pages/careDetail/careDetail?studentId='+studentId,
      })
    },

    toTask: function () {
      wx.navigateTo({
        url: '/pages/task/task',
      })
    },

    datFformat: function() {

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
