// pages/add/add.js
const chooseLocation = requirePlugin('chooseLocation');
//使用在腾讯位置服务申请的key（必填）
const key = "xx"; 
//调用插件的app的名称（必填）
const referer = "wx-----";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addlatitude:'',
    addlongitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  add(e){
    if(this.data.addlatitude==''||this.data.addlongitude==''){
      this.setData({
        error:"没有上传位置"
      });
      return
    }
    if(this.data.imagePath==null){
      this.setData({
        error:"没有上传图片"
      });
      return
    }
    console.log(e);
    let type = e.detail.value.type.replaceAll(" ","")
    if(type == "")
      type = null      
    wx.request({
      method:"POST",
      // url: "http://127.0.0.1:8080/kong",
      url: 'http://127.0.0.1:8080/garbageLocation/saveone',
      data:{
        latitude:this.data.addlatitude,
        longitude:this.data.addlongitude,
        type:type
      },
      success:res=>{
        wx.switchTab({
          url: '/pages/map/map'
        })
      }
    })
  },
  onLoad(options) {

  },
    //显示地图
    showMap() {
      wx.navigateTo({
          url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&scale=19`
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
    const addLocation = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if(addLocation!=null){
      this.setData({
        addlatitude:addLocation.latitude,
        addlongitude:addLocation.longitude
      });
    }
  },
  goback(){
    this.init()
    wx.switchTab({
      url: '/pages/map/map'
    })
  },
  chooseImage(){
    wx.chooseMedia({count: 1})
    .then(res=>{
      console.log(res);
      this.setData({
        imagePath:res.tempFiles[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.init()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.setData({
      addlatitude:'',
      addlongitude:''
    });
    chooseLocation.setLocation(null);
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
