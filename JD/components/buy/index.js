// components/buy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy: {
      type: Boolean,
      value: true
    },
    partData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBuyView: function (e) { // 隐藏商品弹框  和点击X 号
      if (e.target.dataset.target == 'self')
        this.setData({
          hideBuy: true
        })
    },
    //  input 组件传递过来得数量
    getCount: function (e) {
      //console.log(e)
      // 在传递到父级
      this.triggerEvent('onGetCount', e.detail)
    },
    // 点击添加购物车

    buy: function () {
      // 先隐藏遮罩
      this.setData({
        hideBuy: true
      })
      // 父级事件传递
      this.triggerEvent('buyEvent')
    }

  }
})