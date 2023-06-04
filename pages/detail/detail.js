// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbage:{    
      id:"",
      name:"",
      detail:"",
      imagePath:"",
      sortid:1,
    },
    sorts:["","可回收垃圾","有害垃圾","厨余垃圾","其他垃圾"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: `http://127.0.0.1:8080/refuse/id/${options.id}`,
      success: (res) => {
        let data = res.data.data[0]
        console.log(data);
        this.setData({
          garbage:data
        });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  modify(e){
    wx.setStorageSync('garbage', this.data.garbage)
    wx.navigateTo({
      url: `/pages/addmo/addmo?garbage`,
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