// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      studentId: '',
      careItem:null,
      nowDay: null,
      comment:'',
      rateList: ['优','良','差']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      var studentId = options.studentId;
      var nowDay = that.getCurrentMonthFirst();
      
      that.setData({
        'nowDay': nowDay,
        'studentId': studentId,
      });
    },

    onShow: function () {
      var that = this;
      that.getCareItem();
    },


    getCareItem: function () {
      var that = this;
      var day = this.data.nowDay;
      request.get("aftercare/detail/student", {
        userId: this.data.studentId,
        day: day
      }).then( (res) => {
        that.setData({'careItem': res});
        var a = 0;
        var b = 0;
        if(res && res.workCompletedCount) {
            a = res.workCompletedCount;
        }
        if(res && res.workCount) {
            b = res.workCount;
        }
        util.drawCicle(a, b, 80, 80, 'canvasArc');
      })
    },

    getCurrentMonthFirst: function(){
      var date = new Date();
      var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth()+1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      return todate;
    },
    bindTimeChange: function(e) {
      this.setData({
        nowDay: e.detail.value
      });
      this.getCareItem();
    },
    bindRateChange: function(e) {
        console.log(e)
        var rate  = this.data.rateList[e.detail.value];
        var workId = e.currentTarget.dataset.workid;
        request.post('aftercarework/complete', {workId, rate}).then( (res) => {
            //刷新页面
            this.getCareItem();
        })
    },
    totask: function (e) {
      var aid = e.currentTarget.dataset.aid;
      wx.navigateTo({
        url: '/pages/task/task?afterCareId='+aid,
      })
    },

    inputChange: function (e) {
        var that = this;
        that.setData({
          comment: e.detail.value
        })
    },

  showModal: function () {
      this.setData({showModal: true});
  },

  hideModal: function () {
      this.setData({showModal: false});
  },

  onCancel: function () {
      this.hideModal();
  },

  onConfirm: function (e) {
      var that = this;
      request.post("aftercare/comment", {
        afterCareId: that.data.afterCareId,
        comment: that.data.comment
      }).then( (res) => {
          that.getCareItem();
      })
      that.hideModal();
      that.setData({"workName": ''})
  },

  writeSay: function (e) {
      var that = this;
      that.setData({"afterCareId": e.currentTarget.dataset.cid});
      that.showModal();
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
