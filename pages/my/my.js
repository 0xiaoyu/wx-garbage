// pages/my/my.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad() {
    this.getOpenId()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getOpenId: function() {  // 获取用户的唯一标识
    let  appId = 'wx67d7a099e3fb9fe2'
    let appSecret = 'f5f3064bdb836d0d8a166029bd72e33e'
    let _this = this
    wx.login({
      success(res){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid: appId,
            secret: appSecret,
            js_code: res.code,
            grant_type:'authorization_code'
          },
          method:"GET",
          success(res){
            _this.setData({
              openid:res.data.openid,
              session_key:res.data.session_key
            })
          }
        })
      }
    })
  },
  gotoHistory(){
    wx.navigateTo({
      url: `/pages/history/history?id=${this.data.openid}`
    })
  },
  photo(e){
    util.photo()
  }
})
