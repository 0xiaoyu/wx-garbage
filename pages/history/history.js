// pages/history/history.js
// author zay
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    type:["","查询","修改/新建（审核中）","新建垃圾桶(审核中)","新建(通过)","新建垃圾桶（通过）"],
    imagePath:["","查询","new"],
    list: [{
      id: 1,
      name: 'yu',
      content: "我是yu识别记录。。。"
    }, {
      id: 2,
      name: '香蕉',
      content: "我是李四，可以带大将去玩。。。。"

    }]
  },

  click: function (e) { 
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this
    this.setData({
      userId:options.id
    });
    wx.request({
      url: `http://127.0.0.1:8080/history/list/${this.data.userId}`,
      success: (res) => {
        let data = res.data.data
        console.log(data);
        _this.setData({
          list:data
        });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})