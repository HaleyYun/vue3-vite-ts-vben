<template>
  <view class="wrap">
    <view class="wrap-nav">
      <view class="wrap-nav__input">
        <image class="input-img" src="/static/icons/search.png" />
        <u-input
          v-model="search"
          confirm-type="search"
          @confirm="goSearchResult"
          type="text"
          class="m-l-10 fz-28 c3"
          placeholder="请输入搜索内容"
          placeholder-class="fz-28 c9"
          clearable="true"
          border="none"
        />
      </view>
      <view class="fz-30 c3 wrap-nav__cancel" @click="returnFn">取消</view>
    </view>
    <view class="wrap-list">
      <view class="wrap-list__tip">联系人</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Inquiry',
    data() {
      return {}
    },
    created() {},
    onLoad(option) {
      console.log(option.search)
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30rpx;
    &-nav {
      width: 100%;
      height: 72rpx;
      display: flex;
      justify-content: space-between;
      &__cancel {
        height: 72rpx;
        line-height: 72rpx;
      }
      &__input {
        padding: 0rpx 20rpx;
        box-sizing: border-box;
        width: 606rpx;
        height: 72rpx;
        background: #fff;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        .input-img {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    &-list {
      &__tip {
        font-size: 32rpx;
        color: #666;
        height: 100rpx;
        line-height: 100rpx;
      }
    }
  }
</style>
