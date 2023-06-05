
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonText: "请等待",
    buttons: [{text: '取消'}, {text: '确认'}],
    showO: true,
    items:[{
      id:1,
      imageUrl:"/images/huishou.jpg"
    },{
      id:2,
      imageUrl:"/images/youhai.jpg"
    },{
      id:3,
      imageUrl:"/images/shi.jpg"
    },{
      id:4,
      imageUrl:"/images/gan.jpg"
    }]
    
  },
  // 拍照识别
  photo(){
    util.photo()
  },


    
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchs: this.searchs.bind(this)
  })
  },
  add(){
    wx.navigateTo({
      url: '/pages/addmo/addmo'
    })
  },
  searchs(value) {
    return new Promise((resolve, reject) => {
      value = value.replaceAll(" ","")
      if(value == ""){
        resolve([]);
        return
      }
      wx.request({
        url: 'http://127.0.0.1:8080/refuse/name/'+value,
        success: (res) => {
          if(res.data.code == 200){
             let i = 1
             let data = res.data.data
             resolve(data)
             return
           }
         },
         fail: (err) => {
           console.log(err);
         },
         complete: (res) => {
           console.log(res);
         },
       })
     })
  },
  // 选择后的方法
  selectResult(e) {
      console.log('select result', e.detail)
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.detail.item.value}`
      })
  },
  // 展示与隐藏除搜索外其他内容
  hindOther(e){
    this.setData({
      showO:false
    });
  },
  showOther(e){
    this.setData({
      showO:true
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