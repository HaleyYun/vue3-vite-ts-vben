<template>
  <view class="basic">
    <view class="basic-outlets">
      <view class="basic-outlets__title">{{ information.storeName }}</view>
      <image :src="information.storeUrl" class="basic-outlets__img" @click="test"></image>
    </view>
    <view class="basic-list lh48 fz-32 color-block">
      <view class="basic-list__item">
        <view>门店手机号</view>
        <view>{{ information.contractPhone }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>门店负责人</text></view>
        <view>{{ information.contractName }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>注册手机号</text></view>
        <view>{{ information.userName }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>汽修厂名称</text></view>
        <view>{{ information.storeName }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>所在地区</text></view>
        <view>{{ information.areaCodeStr }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>详细地址</text></view>
        <view>{{ information.address }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>主修车系</text></view>
        <view v-if="+information.carSeries===1">国产车</view>
        <view v-if="+information.carSeries===2">韩系车</view>
        <view v-if="+information.carSeries===3">德系车</view>
        <view v-if="+information.carSeries===4">日系车</view>
        <view v-if="+information.carSeries===5">美系车</view>
      </view>
      <view class="basic-list__item">
        <view>工位数量</view>
        <view>{{ information.locationNumber||0 }}</view>
      </view>
      <view class="basic-list__item">
        <view>规模(人)</view>
        <view>{{ information.scale||0 }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'BasicInformation',
    props: {
      information: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    data() {
      return {}
    },
    created() {},
    methods: {
      test() {
        // information.storePhotos
        uni.previewImage({
          current: 0, // 当前点击缩略图的下标
          urls: [this.information.storePhotos],
          indicator: 'number', // 指示器/步长器  可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
          loop: true, //轮播
          success: (res) => {
            console.log('调用成功', res)
          },
          fail: (err) => {
            console.log('调用失败', err)
          },
          complete: (ret) => {
            console.log('调用完成，管你成功失败', ret)
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .basic {
    width: 750rpx;
    height: 100%;
    &-outlets {
      padding: 24rpx 32rpx;
      background: #fff;
      &__title {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-top: 32rpx;
      }
    }
    &-list {
      background: #fff;
      &__item {
        padding: 24rpx 32rpx 24rpx 0;
        box-sizing: border-box;
        margin-left: 32rpx;
        border-top: 2rpx solid $v-bg-light;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
