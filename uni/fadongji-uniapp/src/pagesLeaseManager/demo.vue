<template>
  <view class="container">
    <VoNav is-fixed is-have-more title="修理厂地图" @operationFn="$backFn">

      <template #operation>
        <view class="listBtn fz-28 p-r-28">列表</view>
      </template>
    </VoNav>
    <map
      class="map"
      style="width: 100%; height: 100%;"
      :latitude="options.latitude"
      :longitude="options.longitude"
      :markers="options.marker"
      :scale="options.scale"
      @markertap="clickMarker"
    />
    <!-- 标点对应状态说明 -->
    <view class="fixed check">
      <view class="check-item" @click="test">
        <image class="check-item-icon" src="/static/common/map/map_icon_0.png"></image>
        <view>待认证</view>
      </view>
      <view class="check-item">
        <image class="check-item-icon" src="/static/common/map/map_icon_1.png"></image>
        <view>待审核</view>
      </view>
      <view class="check-item">
        <image class="check-item-icon" src="/static/common/map/map_icon_2.png"></image>
        <view>已绑定</view>
      </view>
    </view>
    <!-- 底部悬浮区域 -->
    <view class="fixed bottom-box">
      <!-- 地区内修理厂数据 -->
      <view class="census flex flex-justify-between">
        <view class="census-content">
          <view>所在修理厂总数：100</view>
          <view>已绑定：45</view>
          <view>未绑定：55</view>
        </view>
      </view>
      <!-- 底部悬浮按钮 -->
      <view v-if="showBtn" class="bottom-box__btn-bar bg-white">
        <view class="btn">邀请修理厂注册</view>
        <view class="btn act">新增修理厂</view>
      </view>

      <u-transition :show="show" mode="slide-up" @afterLeave="test2">
        <view class="transition">
          <!-- 详情弹出层 -->
          <view class="detail bg-white">
            <view class="close flex flex-justify-between">
              <view></view>
              <VoIcon :opacity="1" color="#373A4E" name="close-x" size="14" />
            </view>

            <view class="detail-title">
              <image class="shrink icon-face" src="/static/common/map/map_icon_2.png"></image>
              <view class="name">江陵动力修理厂</view>
              <view class="shrink state-icon">
                <view class="state grey">
                  <!--            <view v-if="info.bindStatus === 0" class="status flex flex-row flex-vertical-c grey">-->
                  <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
                  <view>未认证</view>
                </view>
                <!--            <view-->
                <!--                v-else-if="info.bindStatus === 1"-->
                <!--                class="status flex flex-row flex-vertical-c orange"-->
                <!--            >-->
                <!--              <VoIcon color="#FF9B05" name="success-fill" size="12" />-->
                <!--              <view class="status-text2">待审核</view>-->
                <!--            </view>-->
                <!--            <view-->
                <!--                v-else-if="info.bindStatus === 2"-->
                <!--                class="status flex flex-row flex-vertical-c green"-->
                <!--            >-->
                <!--              <VoIcon color="#26BF26" name="success-fill" size="12" />-->
                <!--              <view class="status-text3">已认证</view>-->
                <!--            </view>-->
              </view>
            </view>

            <view class="fz-24 color-block-45 overTwoEllipsis m-t-24 m-b-8">439m丨河南省-郑州市-金水区-龙子湖街道中央广场河南省郑州市金水区龙子湖街道中央广场</view>

            <view class="detail-contact fz-24 color-block-45 flex flex-vertical-c flex-justify-between p-b-32">
              <view class="user-info">
                <view>张母字</view>
                <view class="flex flex-vertical-c">
                  <text class="m-r-28">132 **** 1232</text>
                  <VoIcon :opacity="1" color="#373A4E" name="mobile-new" size="15" />
                </view>
              </view>
              <view class="btn">去点亮</view>
            </view>

            <view class="sign-bar">
              <view class="sign act">目标客户</view>
              <view class="sign">汽车美容</view>
              <view class="sign">补胎</view>
              <view class="sign act">目标客户</view>
              <view class="sign">汽车美容</view>
              <view class="sign">补胎</view>
              <view class="sign act">目标客户</view>
              <view class="sign">汽车美容</view>
              <view class="sign">补胎</view>
              <view class="sign act">目标客户</view>
              <view class="sign">汽车美容</view>
              <view class="sign">补胎</view>
            </view>
          </view>
        </view>
      </u-transition>
      <!-- 底部安全区 -->
      <view class="safearea-box bg-white"></view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'Demo',
    data() {
      return {
        show: false,
        showBtn: true,
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
              // title:'我在这里',//标注点名
              alpha: 0.5,   //透明度
              // 自定义标注点提示
              // callout: {//自定义标记点上方的气泡窗口 点击有效
              //   content: '天宝大厦',//文本
              //   color: '#ffffff',//文字颜色
              //   fontSize: 14,//文本大小
              //   borderRadius: 15,//边框圆角
              //   borderWidth: '10',
              //   bgColor: '#e51860',//背景颜色
              //   display: 'ALWAYS',//常显
              // },
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
              alpha: 0.5,   //透明度
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
              alpha: 0.5,   //透明度
              // callout: {//自定义标记点上方的气泡窗口 点击有效
              //   content: '德隆大厦',//文本
              //   color: '#ffffff',//文字颜色
              //   fontSize: 14,//文本大小
              //   borderRadius: 15,//边框圆角
              //   borderWidth: '10',
              //   bgColor: '#e51860',//背景颜色
              //   display: 'ALWAYS',//常显
              // },
            },
          ]
        }
      }
    },
    onLoad() {
      console.log('zxc');
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log(res);
        },
        complete: (ret) => {
          console.log(ret);
        }
      })
    },
    methods: {
      /**
       * 点击地图标点事件
       * @param e 当前点击参数
       */
      clickMarker(e) {
        const cur = e.detail.markerId
        this.options.marker.forEach(item=>{
          if (item.id === cur) {
            item.width = item.height = 42
          } else {
            item.width = item.height = 20
          }
        })
      },
      test(){
        console.log('zxc');
        this.show = !this.show
        this.showBtn = false
      },
      test2(e) {
        console.log(e);
        this.showBtn = true
      }
    },
  }
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
}
// 列表按钮样式
.listBtn {
  color: $v-c0-65;
  line-height: 48rpx;
}
.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
// 固定定位
.fixed {
  position: fixed;
}
//标点对应状态说明
.check {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96rpx;
  top: 126rpx;
  right: 32rpx;
  padding-top: 22rpx;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8rpx;
  box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
  backdrop-filter: blur(8rpx);
  &-item {
    font-weight: 500;
    font-size: 24rpx;
    text-align: center;
    margin-bottom: 16rpx;
    &-icon {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
// 底部信息区
.bottom-box {
  width: 100%;
  left: 0;
  bottom: 0;
  //地区内修理厂数据
  .census {
    width: 100%;
    font-weight: 400;
    font-size: 28rpx;
    margin-bottom: 32rpx;
    &-content{
      padding: 24rpx 16rpx;
      margin-right: 32rpx;
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 8rpx;
      box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
      backdrop-filter: blur(8rpx);
    }
  }
  .census::before{
    content: '';
    display: block;
    width: 2rpx;
    height: 2rpx;
  }
  // 底部按钮
  &__btn-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 32rpx;
    text-align: center;
    color: #FF5319;
    font-weight: 400;
    font-size: 32rpx;
    .btn {
      width: 325rpx;
      height: 92rpx;
      box-sizing: border-box;
      line-height: 92rpx;
      border: 1px solid #FF7A4D;
      border-radius: 48rpx;
    }
    .btn.act {
      color: #fff;
      background-color: #FF5319;
      border-color: #FF5319;
    }
  }
  // 底部详情弹窗
  .detail {
    padding: 20rpx 32rpx;
    .close {
      margin-right: 14rpx;
      margin-bottom: 30rpx;
    }

    .icon-face {
      width: 48rpx;
      height: 48rpx;
      border-radius: 8rpx;
    }

    &-title {
      display: flex;
      align-item: center;
      font-weight: 500;
      font-size: 32rpx;
      .shrink {
        flex-shrink: 0;
      }
      .name {
        margin-left: 16rpx;
        margin-right: 8rpx;
      }
      .state {
        height: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 6rpx;
        padding-right: 16rpx;
        font-size: 20rpx;
        border-radius: 200rpx;
        &.grey {
          background-color: #F7F7F8;
          color: rgba(0, 0, 0, 0.25);
        }
        &.orange {
          color: #ff9b05;
          background-color: #fff5e5;
        }
        &.green {
          color: $v-success;
          background-color: $v-success-btn-disabled;
        }
        &.red {
          color: #f45f70;
          background: #feecee;
        }
      }
    }

    &-contact {
      border-bottom: 2rpx solid #F7F7F8;
      .user-info {
        line-height: 150%;
      }
      .btn {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        font-size: 24rpx;
        text-align: center;
        color: #FF5319;
        border: 1px solid #FF7A4D;
        border-radius: 30px;
      }
    }

    .sign-bar {
      padding: 24rpx 0rpx;
      display: flex;
      align-items: center;
      overflow: scroll;
      .sign {
        padding: 0 16rpx;
        flex-shrink: 0;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
        background-color: #F7F7F8;
        border-radius: 24rpx;
        margin-right: 16rpx;
        &.act{
          background-color: #E50012;
          color: #fff;
        }
      }
      .sign:nth-last-of-type(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
