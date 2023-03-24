<template>
  <view>
    <EraSwipeAction>
      <EraSwipeActionItem :options="options2">
        <view class="swipe-action u-border-top u-border-bottom">
          <view class="swipe-action__content flex flex-justify-between">
            <text class="swipe-action__content__text">标题文字</text>
            <text class="swipe-action__content__content m-r-30">说明文字</text>
          </view>
        </view>
      </EraSwipeActionItem>
    </EraSwipeAction>

    <view class="m-t-30" />
    <EraSwipeAction>
      <EraSwipeActionItem :options="options5">
        <view class="swipe-action u-border-top u-border-bottom">
          <view class="swipe-action__content flex flex-justify-between">
            <text class="swipe-action__content__text">标题文字</text>
            <text class="swipe-action__content__content m-r-30">说明文字</text>
          </view>
        </view>
      </EraSwipeActionItem>
    </EraSwipeAction>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options2: [
          {
            text: '普通',
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            },
            rightLine: true,
          },
          {
            text: '普通',
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            },
            rightLine: true,
          },
          {
            text: '删除',
            rightLine: false,
            style: {
              backgroundColor: '#E50012',
            },
          },
        ],
        options5: [
          {
            icon: 'focus',
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              width: '48px',
              height: '48px',
              borderRadius: '100px',
              margin: '0 12px',
            },
          },
          {
            icon: 'add-four',
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              width: '48px',
              height: '48px',
              borderRadius: '100px',
              margin: '0 12px',
            },
          },
          {
            icon: 'delete',
            style: {
              backgroundColor: '#E50012',
              width: '48px',
              height: '48px',
              borderRadius: '100px',
              margin: '0 12px',
            },
          },
        ],
      }
    },
  }
</script>

<style lang="scss">
  .u-page {
    padding: 0;
  }

  .u-demo-block__title {
    padding: 10px 0 2px 15px;
  }

  .swipe-action {
    &__content {
      padding: 25rpx 0;

      &__text {
        font-size: 16px;
        color: $u-main-color;
        padding-left: 30rpx;
      }

      &__content {
        color: rgba(0, 0, 0, 0.25);
        font-size: 16px;
      }
    }
  }
</style>
