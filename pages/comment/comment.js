// pages/index/index.js
var app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentList: [],
        userId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userId = app.globalData.loginUser.userId;
        this.setData({
            userId: userId
        })
    },

    onShow: function () {
        var that = this;
        that.getStudentList();
    },

    getStudentList: function() {
        var userId = this.data.userId;
        request.get('messageboard/listStudent', {userId}).then( (res) => {
            this.setData({studentList: res});
        });
    },

    toSendMessage: function(e) {
      var studentId = e.currentTarget.dataset.studentid;
      wx.navigateTo({
        url: '/pages/commentMessage/commentMessage?studentId=' + studentId
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
