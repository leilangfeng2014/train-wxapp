var app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        limit: 10,
        page: 1,
        studentId: null,
        teacherId: null,
        messageList: [],
        content:''

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var teacherId = app.globalData.loginUser.userId;
        this.setData({
            studentId: options.studentId,
            teacherId: teacherId
        })
    },
    pageScrollToBottom: function() {
        wx.createSelectorQuery().select('#messageBox').boundingClientRect(function(rect){
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: rect.bottom
            })
        }).exec()
    },

    getMessageList: function (page, isAppend) {
        var limit = this.data.limit;
        var studentId = this.data.studentId;
        var teacherId = this.data.teacherId;
        request.get('messageboard/list', {studentId, teacherId, page, limit}).then( (res) => {
            var messageList = res.page.list;
            if(isAppend) {
                this.data.messageList.forEach(function(value,index,array){
                    messageList.push(value);
                });
            }
            this.setData({messageList: messageList});
            this.setData({page: res.page.currPage});
            if(!isAppend) {
                this.pageScrollToBottom();
            }
        });
    },

    nextMessageList: function() {
        var page = this.data.page + 1;
        this.getMessageList(page, true);
    },
    contentChange: function(e) {
        this.setData({content: e.detail.value})
    },
    sendMessage: function() {
        var studentId = this.data.studentId;
        var teacherId = this.data.teacherId;
        var content = this.data.content;
        if(!content) {
         return ;
        }
        request.post('messageboard/sendToStudent', {studentId, teacherId, content}).then( (res) => {
            this.setData({content: ''});
            this.getMessageList(1);
        });
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
        this.getMessageList(this.data.page);
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
        this.nextMessageList();
        wx.stopPullDownRefresh();
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
