// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();

var request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemId: null,
        userId: '',
        tCourseItem: null,
        signBtn: false,
        signName: '',
        workName:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            'itemId': options.itemId,
            'userId':app.globalData.loginUser.userId
        });
        that.getItemStudentForCheck(options.itemId);
    },

    getItemStudentForCheck: function (itemId) {
        var that = this;
        request.get("traincourseitem/getItemStudentForCheck", {
            itemId: itemId,
        }).then( (res) => {
            res.studentList.forEach(function(val){
                if(val.checkStatus == 1){
                    val.checked1 = 'true'
                }
                if(val.checkStatus == 2){
                    val.checked2 = 'true'
                }
            });

            if(res.teacherCheckStatus == 1){
                that.setData({
                    'signBtn': true,
                    'signName': '已打卡'
                });
            }else{
                that.setData({
                    'signBtn': false,
                    'signName': '打卡上班'
                });
            }

            that.setData({'tCourseItem': res});

        })
    },

    checkItem: function (e) {
        var that = this;
        var itemId = e.currentTarget.dataset.itemid;
        request.post("traincourseitem/checkItem", {
            itemId: itemId,
        }).then( (res) => {
            that.getItemStudentForCheck(itemId);
        })
    },

    radioChange: function (e) {
        console.log(e)
        var that = this;
        var checkStatus = e.detail.value;
        var itemId = e.currentTarget.dataset.itemid;
        var studentId = e.currentTarget.dataset.studentid;
        request.post("traincourseitem/checkStudent", {
            checkStatus: e.detail.value,
            itemId: itemId,
            studentId: studentId
        }).then( (res) => {
            console.log(res);
        })
    },

    prevItemForCheck: function (e){
        var that = this;
        var itemId = e.currentTarget.dataset.cid;
        request.get("traincourseitem/prevItemForCheck", {
            currentItemId: itemId
        }).then( (res) => {
            that.getItemStudentForCheck(res.itemId);
        })
    },

    nextItemForCheck: function (e){
        var that = this;
        var itemId = e.currentTarget.dataset.cid;
        request.get("traincourseitem/nextItemForCheck", {
            currentItemId: itemId,
        }).then( (res) => {
            that.getItemStudentForCheck(res.itemId);
        })
    },

    toTimeTable: function (e){
        var courseId = e.currentTarget.dataset.courseid;
        wx.navigateTo({
            url: '/pages/timetable/timetable?courseId='+courseId,
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
        request.post("traincourseitem/addWork", {
            content: that.data.workName,
            itemId: that.data.itemId
        }).then( (res) => {
            that.getItemStudentForCheck(that.data.itemId);
        })
        that.hideModal();
        this.resetWorkName();
    },

    addTask: function (e) {
        var that = this;
        that.setData({"itemId": e.currentTarget.dataset.itemid});
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

    },
    /**
     * 用户点击右上角分享
     */
    closePage: function () {

      }
  })
