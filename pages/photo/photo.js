// pages/photo/photo.js
import * as paddlejs from '@paddlejs/paddlejs-core';
import '@paddlejs/paddlejs-backend-webgl';

const plugin = requirePlugin("paddlejs-plugin");
plugin.register(paddlejs, wx);
import {labelMap} from './util.js'
export const PaddleJS = new paddlejs.Runner({
  // modelPath: 'https://mms-voice-fe.cdn.bcebos.com/pdmodel/clas/common/v4_2_0915',
  // modelPath: 'http://xiaoyu.website:7071/',
   modelPath: 'http://127.0.0.1:8080/mod3',
  feedShape: {
      fw: 224,
      fh: 224
  },
  fill: '#fff',
  targetSize: {
      height: 224,
      width: 224
  },
  bgr: false,
  mean: [0.485, 0.456, 0.406],
  std:  [0.229, 0.224, 0.225],
  needPreheat: true,
  webglFeedProcess: true
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "",
    canvasWidth: 320,
    canvasHeight: 500,
    detail:"",
    require:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this
    wx.showLoading({
      title: '识别中',
    })
    wx.getSystemInfo().then(result => {
      this.setData({
        canvasWidth: result.windowWidth
      })
    })
    PaddleJS.init()
    // this.setData({
    //   imageSrc:options.imagePath
    // });
    wx.getImageInfo({
      src:options.imagePath
    }).then(res=>{
      let {width, height, path} = res;
      let scale = this.data.canvasWidth / width
      width = width * scale
      height = height * scale
      this.setData({
        canvasHeight: height
      })
      const ctx = wx.createCanvasContext("myCanvas")
      // console.log(path);
      ctx.drawImage(path, 0, 0, width, height);
      // console.log(res);
      ctx.draw(false, () => {
        wx.canvasGetImageData({
          canvasId: "myCanvas",
          height: height,
          width: width,
          x: 0,
          y: 0,
        }).then(res => {
          console.log(res);
          // for(let i = 0 ; i < res.data.length; i ++){
           //   res.data[i] = res.data[i] / 255.0
          // }
          // console.log(res.data[100])
          PaddleJS.predict(res).then(res =>{
            // console.log(res)
            const max = Math.max.apply(null, res);
            const index = res.indexOf(max);
            // console.log(index, max)
            // console.log(labelMap[index])
            if (max >= 0.2){
              this.setData({
                 buttonText: labelMap[index]
              })
              let a = labelMap[index].split("_")
              _this.getDetail(a[1])
              _this.getC(a[0])
              wx.hideLoading()
             }else{
               this.setData({
                 buttonText: "没识别出来"
               })
            }
          })
        })
       })
    })
  },
  getDetail(e){
    wx.request({
      url: `http://127.0.0.1:8080/refuse/nameone/${e}`,
      success:res=>{
        this.setData({
          detail:res.data.data[0].detail
        });
      }
    })
  },
  getC(e){
    let index = ["可回收垃圾","有害垃圾","厨余垃圾","其他垃圾"].indexOf(e)
    wx.request({
      url: `http://127.0.0.1:8080/require/list/${index}`,
      success:res=>{
        this.setData({
          require:res.data.data
        });
      }
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