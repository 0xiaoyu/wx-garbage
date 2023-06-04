// pages/addmo/addmo.js
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
      sortid:"",
    },
    sortid:0,
    array:["可回收垃圾","有害垃圾","厨余垃圾","其他垃圾"],
    warnToast: false,
  },
  bindPickerChange(e){
    this.setData({
      "garbage.sortid":e.detail.value
    });
  },
  add(e){
    let value = e.detail.value
    if(value.name==""){
      this.openWarnToast() 
      return
    }
    let _this = this
    wx.request({
      url: 'http://127.0.0.1:8080/refuse/save',
      method:"POST",
      data:{
        id:this.data.garbage.id,
        name : value.name,
        sortid : this.data.sortid+1,
        detail : value.detail
      },
      success:res=>{
        _this.cancel()
      }
    })

  },
  cancel(){
    wx.navigateBack({
      delta: 1,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      garbage:wx.getStorageSync('garbage')
    });
    this.setData({
      sortid:this.data.garbage.sortid-1
    });
  },
  chooseImage(){
    wx.chooseMedia({
      count:1,
      mediaType:["image"]
    }).then(res=>{
      this.setData({
        "garbage.imagePath":res.tempFiles[0].tempFilePath
      });
    })
  },
  openWarnToast() {
    this.setData({
      warnToast: true,
    });
    setTimeout(() => {
      this.setData({
        hidewarnToast: true,
      });
      setTimeout(() => {
        this.setData({
          warnToast: false,
          hidewarnToast: false,
        });
      }, 300);
    }, 3000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      sortid:0
    });
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