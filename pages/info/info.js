const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    cateItems: [
      {
        cate_id: 0,
        cate_name: "垃圾分类",
        ishaveChild: false,
      },
      {
        cate_id: 1,
        cate_name: "可回收垃圾",
        ishaveChild: true,
        children:
        []
      },
      {
        cate_id: 2,
        cate_name: "有害垃圾",
        ishaveChild: true,
        children:
          []
      },
      {
        cate_id: 3,
        cate_name: "厨余垃圾",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 4,
        cate_name: "其他垃圾",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 0,
    curIndex: 0,
    infoString:"",
    requirements:["1","2"],
    tableData:[1,2,3,4,5],
  },

  onLoad(options){
    let id = options.id
    this.setData({
      curNav:id
    });
    this.getRequire(id)
    this.getTableData(id)
  },
  //事件处理函数  
  switchRightTab(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    this.getRequire(id)
    this.getTableData(id)
  },
  getTableData(id){
    if(id==0 || id==null) return
    wx.request({
      url: `http://127.0.0.1:8080/refuse/limit/${id}/8`,
      success: (res) => {
        let data = res.data.data.map(a=>a.name)
        this.setData({
          tableData:data
        });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  getRequire(id){
    if(id!=0 && id !=null){
      wx.request({
        url: `http://127.0.0.1:8080/require/list/${id}`,
        success: (res) => {
          // console.log(res);
          this.setData({
            requirements:res.data.data
          });
        },
        fail: (err) => {},
        complete: (res) => {},
      })
      }
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