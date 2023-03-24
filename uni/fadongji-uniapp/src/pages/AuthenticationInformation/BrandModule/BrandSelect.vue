<template>
  <view
    class="brand p-b-safe-area"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav title="选择主营品牌" :is-fixed="false" />

    <view class="flag" :style="{ top: Number($systemInfo.statusBarHeight) + 67 + 'px' }">
      <scroll-view scroll-y="true" class="flag-scroll" style="width: 100%; height: 100%">
        <view
          @click="goToScroll(item)"
          class="flag-key"
          v-for="(item, itemIndex) of resource"
          :key="itemIndex"
        >
          {{ item.key }}
        </view>
      </scroll-view>
    </view>

    <scroll-view :scroll-into-view="toView" scroll-y class="brand-scroll">
      <view class="brand-scroll__title" id="Z1"> A </view>
      <view class="brand-scroll__item" v-for="item of 20" :key="item">
        <VoIcon name="success-fill" :size="24" v-if="true" />
        <VoIcon name="circle" :size="24" color="#d9d9d9" v-else />
        <image src="/static/logo-2.png" class="item-img" />
        <view class="item-title">江陵动力江陵动力江陵动力江陵动力</view>
      </view>
    </scroll-view>

    <view class="safearea-box" />
  </view>
</template>

<script>
  export default {
    name: 'BrandSelect',
    data() {
      return {
        resource: [],
        toView: '',
      }
    },
    created() {
      this.initFn()
    },
    methods: {
      goToScroll(item) {
        this.toView = item.key + '1'
        console.log(this.toView, 'sss')
      },
      initFn() {
        // 生成a-z的数组
        let data = []
        for (let i = 65; i <= 90; i++) {
          let key = String.fromCharCode(i)
          data.push({ key: key, data: [] })
        }
        this.resource = data
        console.log(data, 'ssss')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    width: 750rpx;
    background: #ffffff;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-scroll {
      flex: 1;
      width: 750rpx;
      overflow-y: scroll;
      &__title {
        width: 750rpx;
        height: 90rpx;
        line-height: 90rpx;
        padding: 0rpx 16rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        background-color: #f7f7f8;
      }
      &__item {
        width: 718rpx;
        height: 102rpx;
        display: flex;
        align-items: center;
        padding: 0rpx 70rpx 0rpx 0rpx;
        box-sizing: border-box;
        margin: 0rpx 16rpx;
        border-bottom: 2rpx solid #f7f7f8;
        .item-img {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          margin: 0rpx 20rpx;
        }
        .item-title {
          flex: 1;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }

  .flag {
    width: 50rpx;
    position: absolute;
    right: 24rpx;
    bottom: 25rpx;
    z-index: 2;
    &-key {
      padding: 0;
      margin: 0 auto 10rpx auto;
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      color: rgba(0, 0, 0, 0.45);
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20rpx;
    }
  }
</style>
