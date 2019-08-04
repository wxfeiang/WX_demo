// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: '0.00', // 金额总计
    totalCount: 0, // 结算商品数量总和
    selectAll: false, // 是否全选 默认都不选

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 子组件修改count触发
   */
  onGetCount: function (e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    cartArray[index].total = e.detail.val
    // 更新data
    this.setData({
      cartArray: cartArray
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
    var self = this
    // 获取 本地存储
    wx.getStorage({
      key: 'cartInfo',
      success: function (res) {
        // success
        console.log(res.data)
        const cartArray = res.data
        //   给每一个数据添加一个选择状态的属性
        cartArray.forEach(cart => {
          cart.select = false //  全部不选中

        })

        self.setData({
          cartArray: cartArray,

        })
        cartArray.length > 0 ?
          wx.setTabBarBadge({
            index: 2, // 下标位置
            text: String(cartArray.length)
          }) : wx.removeTabBarBadge({
            index: 2,
          })
      }

    })

  },
  /**
   * 点击进入详情页面
   */
  switchGoodDetail(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },
  /* 
  单个点击事件
  */
  selectGood(e) {
    //  先拿到下标
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray
    //  计算总价
    let totalMoney = Number(this.data.totalMoney) // 字符串转为number来进行计算
    let totalCount = this.data.totalCount
    // let selectAll = this.data.selectAll
    // 设置选中/不选中状态
    cartArray[index].select = !cartArray[index].select
    // 计算总金额和商品个数  判断当前的是否被选中
    if (cartArray[index].select) { //  单价*数量
      totalMoney += Number(cartArray[index].price) * cartArray[index].total
      totalCount++
    } else { //  没有选中
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--

    }

    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount

    })


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