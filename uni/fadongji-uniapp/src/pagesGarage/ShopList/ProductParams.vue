<template>
  <view
    class="serviceSafe flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="产品参数" />
    <view class="h16" />

    <view v-for="(item, index) in ServiceList" :key="index">
      <view class="flex flex-justify-between flex-vertical-c serviceSafe-item">
        <view class="flex flex-vertical-c">
          <view v-if="item.isMust === 1" class="serviceSafe-item__start">*</view>
          <view>{{ item.title }}</view>
        </view>
        <view class="content"> {{ item.content }}</view>
      </view>
      <view class="serviceSafe-line" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        ServiceList: [],
      }
    },
    created() {
      const params = this.$storage.get('paramsProperty') || []
      this.ServiceList = params.map((item) => {
        return {
          title: item.name,
          content: item.value,
          isMust: item.isMust===2?0:1,
        }
      })
    },
    onHide() {
      this.$storage.remove('paramsProperty')
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .serviceSafe {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;

    &-item {
      background-color: #ffffff;
      padding: 0rpx 32rpx;
      color: $v-c0-85;
      font-size: 28rpx;
      height: 88rpx;

      &__start {
        color: $color-primary-red;
      }

      .content {
        padding-left: 16rpx;
      }
    }

    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
    }
  }
</style>
