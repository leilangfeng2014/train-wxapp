var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      courseId: null,
      userId: '',
      tableList: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            'courseId': options.courseId,
            'userId':app.globalData.loginUser.userId
        });
    },

    getCourseItemListForTeacher: function (courseId) {
        var that = this;
        var courseId = that.data.courseId;
        request.get("traincourseitem/getCourseItemListForTeacher", {
            courseId: courseId,
          }).then( (res) => {
              that.setData({'tableList': res});
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
    onShow: function () {
        this.getCourseItemListForTeacher();
    },

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
