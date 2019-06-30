// pages/me/index.js
//获取应用实例  获取总组件的  app.js 的全局
const app = getApp()
// console.log(app)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义好数据
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') // 判断兼容

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // 小程序提供好的
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {




  

  },
  // 获取当前微信的用户信息 (点击事件调用)
  getUserInfo: function (e) {
   // console.log(e)
    this.setData({  // 设置值  (固定格式)
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

 
})