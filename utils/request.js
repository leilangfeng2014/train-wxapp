const UseDistribute = true;
// const UseDistribute = false;

var BASIC_URL = '';
if(UseDistribute){
    //生产环境
    BASIC_URL = "https://wuwei.jyh5.cn/";
}else{
    BASIC_URL = "http://127.0.0.1:8081/";
}

function request(url, method, data){
    var promise = new Promise((resolve, reject) => {
        var app = getApp();
        var openId = '';
        var userType = '';
        if(app) {
            openId = app.globalData.openId;
            if(app.globalData.loginUser) {
                userType = app.globalData.loginUser.userType;
            }
        }
        //init
        var that = this;
        var postData = data;
        //网络请求
        wx.request({
            url: BASIC_URL + url,
            data: postData,
            method: method,
            header: { 'openId': openId, 'userType': userType },
            success: function (res) {//服务器返回数据
                if(res.data.code === 110) {
                    //没有登录，强制跳转到登录页
                    wx.redirectTo({
                        url: '/pages/login/login'
                    });
                } else if(res.data.code === 0){
                    //成功
                    resolve(res.data.data);
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    });
                    //业务失败,返回错误提示信息
                    reject(res.data.msg);
                }
            },
            fail: function (e) {
                reject('网络出错');
            }
        })
    });
    return promise;
}

function post(url, data) {
    return request(url, "POST", data);
}

function get(url, data) {
    return request(url, "GET", data);
}

module.exports = {
    post: post,
    get: get
}


