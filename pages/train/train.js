// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tTrainList: null,
        userId: ''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            'userId':app.globalData.loginUser.userId
        });
    },

    onShow: function () {
        var that = this;
        that.getTtrainList(that.data.userId);
    },

    getTtrainList: function (userId) {
        var that = this;
        request.get("traincourse/listDetail/teacher", {
            userId: userId,
        }).then( (res) => {
            that.setData({'tTrainList': res});
        })
    },

    toTrainDetail: function (e) {
        var itemId = e.currentTarget.dataset.itemid;
        wx.navigateTo({
            url: '/pages/trainDetail/trainDetail?itemId='+itemId,
        })
    },

    toTimeTable: function (e){
        var courseId = e.currentTarget.dataset.courseid;
        wx.navigateTo({
            url: '/pages/timetable/timetable?courseId='+courseId,
        })
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
     *tTrainList 生命周期函数--监听页面卸载
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