// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      courseList: null,
      showModal: false,
      objectArray: [],
      index:0,
      workList: [],
      workName:'',
      subjectName:'',
      afterCareId:'',
      time:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      that.setData({'afterCareId': options.afterCareId})
      that.getStudentWork();
      that.getAllObject();
    },

    getStudentWork: function () {
      var that = this;
      var afterCareId = that.data.afterCareId;
      request.get("aftercarework/getStudentWork", {
        afterCareId: afterCareId,
      }).then( (res) => {
        that.setData({'courseList': res})
        if(!res.predictCompleteTime){
          res.predictCompleteTime = '';
        }
        that.setData({
          'workList': res.workList,
          'time': res.predictCompleteTime
        })
      });
    },

    getAllObject: function () {
      var that = this;
      request.get("subject/listAll", {}).then( (res) => {
        that.setData({
          'objectArray': res,
          'subjectName': res[0].name
        })
      })
    },

    addObject: function (){
      this.showModal();
    },

    bindPickerChange: function (e) {
      var that = this;
      var arr = that.data.objectArray;
      that.setData({
        'index': e.detail.value,
        'subjectName': arr[e.detail.value].name
      })
    },

    inputChange: function (e) {
      var that = this;
      that.setData({
        workName: e.detail.value
      })
    },

    showModal: function () {
      this.setData({showModal: true});
    },

    hideModal: function () {
      this.setData({showModal: false});
    },
    resetWorkName: function() {
      this.setData({workName:''});
    },

    onCancel: function () {
      this.hideModal();
      this.resetWorkName();
    },

    onConfirm: function (e) {
      var that = this;
      var curWork = that.data.workName;
      var curObject = that.data.subjectName;
      var arr = that.data.workList;
      if(!curWork || !curObject){
        wx.showToast({
          title: '请完善作业信息',
          icon: 'none',
          duration: 2000
        });
      }
      for(var i=0; i<arr.length; i++){
        if(curWork == arr[i].workName &&  curObject == arr[i].subjectName){
          wx.showToast({
            title: '已存在该作业！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
      }
      arr.push({
          'subjectName': that.data.subjectName,
          'workName': that.data.workName
      })
      that.setData({
        'workList': arr
      })
      that.hideModal();
      this.resetWorkName();
    },

    delSigleCourse: function (e) {
      var that = this;
      var curWork = e.currentTarget.dataset.wname;
      var curObject = e.currentTarget.dataset.oname;
      var arr = that.data.workList;
      for(var i=0; i<arr.length; i++){
        if(curWork == arr[i].workName &&  curObject == arr[i].subjectName){
          arr.splice(i,1);
          i--;
        }
      }
      that.setData({
        'workList': arr
      })
    },

    bindTimeChange: function (e) {
      var that = this;
      that.setData({
        time: e.detail.value
      });
      request.post("aftercare/updatePredictCompleteTime", {
        afterCareId: that.data.afterCareId,
        predictCompleteTime: e.detail.value
      }).then( (res) => {

      });
    },

    submit: function (){
      var that = this;
      var afterCareId = that.data.afterCareId;
      request.post("aftercarework/addOrUpdate", {
        afterCareId: afterCareId,
        workList: that.data.workList
      }).then( (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        });
        //that.getStudentWork();
        wx.navigateBack({
            delta: 1
        });
      });
    },

    /**
     * 生命周期函数--监听页面初次
     * 渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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

    }
  })
