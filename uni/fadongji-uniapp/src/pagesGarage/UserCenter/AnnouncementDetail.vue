<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="announcement"
  >
    <VoNav :title="title" is-fixed is-have-more />
    <view class="announcement-detail">
      <view class="color-block fz-32 fz-b flex flex-justify-c">{{ detailData.title }}</view>
      <view class="announcement-detail__line" />
      <view class="flex m-t-24">
        <image :src="detailData.photoUrl" class="announcement-detail__logo" />
        <view class="m-l-16 m-t-14">
          <view class="fz-32 fz-b">{{ detailData.creatorName || '1212' }}</view>
          <view class="m-t-12 color-block-45 fz-24">{{ detailData.createTime }}</view>
        </view>
      </view>
      <view class="m-t-24">
        <u-parse :content="JSON.parse(detailData.content).json" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AnnouncementDetail',
    data() {
      return {
        title: '公告',
        detailData: {},
      }
    },
    onLoad(option) {
      let data = JSON.parse(option.data)
      this.detailData = data
    },
  }
</script>

<style lang="scss" scoped>
  .announcement {
    width: 750rpx;
    min-height: 100vh;
    background: #ffffff;
    &-detail {
      margin: 26rpx 32rpx 0rpx;
      &__line {
        height: 2rpx;
        width: 100%;
        margin-top: 24rpx;
        background-color: $v-bg-light;
      }
      &__logo {
        width: 136rpx;
        height: 136rpx;
        border-radius: 68rpx;
        background-color: aquamarine;
      }
    }
  }
</style>
