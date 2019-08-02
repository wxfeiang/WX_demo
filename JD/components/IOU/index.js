// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示框
    hideBaitiao: {
      type: Boolean,
      value: true
    },
    // 
    baitiao: {
      type: Array
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0 // 选中的下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView: function (e) { // 隐藏白条弹框
      if (e.target.dataset.target == 'self') {
        this.setData({
          hideBaitiao: true
        })
      }

    },
    selectItem: function (e) { //  选择事件  选择到下标
      var index = e.currentTarget.dataset.index
      //  传递过来得数据
      var baitiao = this.data.baitiao
      for (let i = 0; i < baitiao.length; i++) {
        baitiao[i].select = false;

      }
      baitiao[index].select = !baitiao[index].select
      // 更新data

      this.setData({
        baitiao: baitiao,
        selectIndex: index
      })

    },
    makeBaitiao: function () { // 点击打白条
      // 先隐藏掉窗口
      this.setData({
        hideBaitiao: true
      })
      // 把选中得传递到父级
      const selectItem = this.data.baitiao[this.data.selectIndex]
      // 传递父级
      this.triggerEvent('updateSelect', selectItem)
    },


  }
})