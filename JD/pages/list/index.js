const interfaces = require('../../utils/urlconfig.js');
// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1, // 当前请求的page
    size: 5, // 请求数据的size
    noData: false // 是否有更多数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 动态添加 标题
    wx.setNavigationBarTitle({
      title: options.title
    });
    // 加载提示
    wx.showLoading({
      title: "加载中"
    })
    const self = this
    // 展示详情数据
    wx.request({
      url: interfaces.productionsList,
      data: {},

      success: function (res) {
        //console.log(res)
        self.setData({
          prolist: res.data
        })
        wx.hideLoading();
      },

    })
    // 下拉刷新在json  文件中配置


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
    // 请求数据
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      noData: false
    })
    const self = this
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        console.log("下拉刷新的数据")
        self.setData({
          prolist: res.data
        })
        // 隐藏加载状态
        wx.hideNavigationBarLoading()
        // 隐藏标题栏 的状态
        wx.stopPullDownRefresh();
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // 判读数据是否加载完毕
    if (this.data.noData) return
    // 停止下拉刷新
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading() //在标题栏中显示加载
    const prolist = this.data.prolist // 当前data 数组中
    let page = this.data.page
    this.setData({ // 每次下拉 page+1
      page: ++page
    })
    const self = this;
    wx.request({
      // 出入当前的 页数
      url: interfaces.productionsList + '/' + self.data.page + '/' + self.data.size,
      success(res) {
        if (res.data.length == 0) {
          //  所有的数据都请求完了
          self.setData({
            noData: true
          })
        } else {
          res.data.forEach(item => {
            prolist.push(item) // 把请求的数据在放到 要渲染数据的数组中
          })
          self.setData({
            prolist: prolist
          })
        }
        // 隐藏加载状态
        wx.hideNavigationBarLoading()
      }
    })

  },
  switchProlistDetail(e) {
    // 拿到当前的key
    //console.log(e)
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      // 拼接当前的id 
      url: '/pages/detail/index?id=' + this.data.prolist[index].id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})