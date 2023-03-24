<template>
  <view class="wrap ">
    <cover-view @click="clickMarker" style="z-index: 10;width: 750rpx;height: 100rpx;position: fixed;top: 0rpx;left: 0rpx;background-color: #ffffff;">
      dddddd
    </cover-view>
    <map @markertap="clickMarker" class="wrap-map "  :markers="options.marker"
         :latitude="options.latitude" :longitude="options.longitude"  ></map>

    <view   class="wrap-content">
          <view style="background-color: #ff0000;height: 500px;width: 750rpx;">

          </view>
      <u-button @click="show=true">显示弹窗</u-button>
        <view style="background-color: #feff00;height: 500px;width: 750rpx;">

        </view>
    </view>

    <u-popup  :show="show" @close="show=false">
        <view>
          d大当家撒赖扩大撒赖
        </view>
    </u-popup>
  </view>
</template>

<script>
  export  default {
    name:'DemoMap',
    data(){
      return {
        show:false,
        // 地图参数
        options: {
          // 地图属性参数
          latitude: 23.106574, //纬度
          longitude: 113.324587,//经度
          scale: 13,//缩放级别
          // 标记点属性
          marker: [
            {
              state: 1,
              id: 0,
              latitude: 23.13065,//纬度
              longitude: 113.3274,//经度
              iconPath: '/static/common/map/map_icon_0.png',    //显示的图标
              rotate: 0,   // 旋转度数
              width: 20,   //宽
              height: 20,   //高
              alpha: 1,   //透明度
            },
            {
              id: 1234597,
              latitude: 23.106574,//纬度
              longitude: 113.324587,//经度
              iconPath: '/static/common/map/map_icon_1.png',    //显示的图标
              rotate: 0,   // 旋转度数
              width: 20,   //宽
              height: 20,   //高
              //  title:'我在这里',//标注点名
              alpha: 1,   //透明度
              //      label:{//为标记点旁边增加标签   //因背景颜色H5不支持
              //   color:'red',//文本颜色
              //      },
              // callout: {//自定义标记点上方的气泡窗口 点击有效
              //   content: '广州塔',//文本
              //   color: '#ffffff',//文字颜色
              //   fontSize: 14,//文本大小
              //   borderRadius: 15,//边框圆角
              //   borderWidth: '10',
              //   bgColor: '#e51860',//背景颜色
              //   display: 'ALWAYS',//常显
              // },
            },
            {
              id: 2,
              latitude: 23.1338,//纬度
              longitude: 113.33052,//经度
              iconPath: '/static/common/map/map_icon_2.png',    //显示的图标
              rotate: 0,   // 旋转度数
              width: 20,   //宽
              height: 20,   //高
              alpha: 1,   //透明度
            },
          ]
        },
          height:300,
          isTop:false,
      }
    },
    methods: {
      clickMarker(e){
        console.log(e,"eeeeeeeeeeeeeeeeeee");
      }
    }
  }
</script>
<style scoped lang="scss">
.wrap{
  //padding-top: 100rpx;
  width: 750rpx;
  height: 100vh;
  position: relative;
  &-map{
    width: 750rpx;
    height: 500rpx;
  }
  &-content{
    width: 750rpx;
  }


}

</style>



