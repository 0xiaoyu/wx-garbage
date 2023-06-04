"use strict";

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
  },

  onShow () {
    
  },
  showMap(){
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  // 加载附加的垃圾桶和自己的位置
  onLoad: function() {
    var that = this;
    var marker=[]
    wx.getLocation({type: 'wgs84'})
    .then((res) => {
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
      marker = [{
        id: 0,
        latitude: res.latitude,
        longitude: res.longitude,
        iconPath: "/images/marker.png",
        width: 20,
        height: 20,
        callout: {
          content: "当前位置",
          color: "#333333",
          fontSize: 13,
          borderRadius: 20,
          bgColor: "#ffffff",
          textAlign: "center" ,
          padding: 10,
          display: 'ALWAYS'
        }
      }]
      wx.request({
        url: `http://127.0.0.1:8080/garbageLocation/list/${this.data.latitude}/${this.data.longitude}`,
        success: (res) => {
          let a =res.data.data
          for(let b of a){
            b.width = 30
            b.height = 35
            b.iconPath = "/images/g_common.jpg"
          }
          marker = [...marker,...a]
          that.setData({
            markers: marker
          });
        },
      })
    })
  },
  gotohere:function(res){
    console.log(res);
    let lat = ''; // 获取点击的markers经纬度
    let lon = ''; // 获取点击的markers经纬度
    let name = ''; // 获取点击的markers名称
    let markerId = res.markerId;// 获取点击的markers  id
    let markers = this.data.markers;// 获取markers列表
    console.log(markers);
    console.log(markerId);
    // 除去本身的marker
    if(markerId == 0) return
 
    for (let item of markers){
      if (item.id === markerId) {
        lat = item.latitude;
        lon = item.longitude;
        wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
          latitude: lat,
          longitude: lon,
          scale: 18
        })
        return
      }
    }
  },
  onUnload () {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  }
})

