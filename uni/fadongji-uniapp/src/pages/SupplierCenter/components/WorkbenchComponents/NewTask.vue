<template>
  <view class="task">
    <view class="bg-white">
      <view class="task-top">
        <view class="lh48 fz-b fz-32 color-block">新手任务</view>
        <view class="m-t-12 flex flex-vertical-c flex-justify-between">
          <view class="lh42 fz-28 color-block-45">任务倒计时60天</view>
          <VoIcon name="question-line" :size="20" color="#000000" :opacity="0.45" />
        </view>
      </view>
      <scroll-view class="task-list" scroll-x="true" scroll-left="0">
        <view class="task-list__item" v-for="item in taskList" :key="item.id">
          <image class="img" :src="item.bg" />
          <view class="content">
            <view class="nav" :style="{ color: item.color }">
              <VoCircleProgress
                :pro="item.process"
                :size="24"
                :border_width="4"
                :border_color="item.barColor"
                border_back_color="none"
              />
              <view class="nav-value">{{ item.process * 100 }}%</view>
            </view>
            <view v-if="item.type === 'garage'">
              <view class="title">全国30000家修理厂</view>
              <view class="tip">如何快速卖货赚钱</view>
              <view class="status">完成后可领取100积分</view>
            </view>
            <view v-if="item.type === 'agent'">
              <view class="title">全国1000家服务商</view>
              <view class="tip">如何实现合作共赢</view>
              <view class="receive">领取100积分</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'NewTask',
    data() {
      return {
        taskList: [
          {
            id: 0,
            bg: '/static/supplier/home/task1.png',
            color: '#F87020',
            process: 0.6,
            barColor: '#F99946',
            type: 'garage',
          },
          {
            id: 1,
            bg: '/static/supplier/home/task2.png',
            color: '#1E86CE',
            process: 0.75,
            barColor: '#51AAE8',
            type: 'agent',
          },
          {
            id: 2,
            bg: '/static/supplier/home/task1.png',
            color: '#F87020',
            process: 0.2,
            barColor: '#F99946',
            type: 'garage',
          },
          {
            id: 3,
            bg: '/static/supplier/home/task2.png',
            color: '#1E86CE',
            process: 0.75,
            barColor: '#51AAE8',
            type: 'agent',
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .task {
    padding-bottom: 32rpx;
    box-sizing: border-box;
    .bg-white {
      border-radius: 16rpx;
      overflow: hidden;
    }
    &-top {
      padding: 32rpx;
      box-sizing: border-box;
    }
    &-list {
      padding: 0 24rpx 24rpx;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      white-space: nowrap;
      &__item {
        width: 308rpx;
        height: 220rpx;
        margin-right: 16rpx;
        line-height: 1.5;
        border-radius: 4rpx;
        position: relative;
        display: inline-block;
        &:last-child {
          margin-right: 0rpx;
        }
        .img {
          width: 100%;
          height: 100%;
        }
        .content {
          padding: 24rpx;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }
        .nav {
          font-size: 20rpx;
          color: $v-c0-45;
          display: flex;
          align-items: center;
          &-value {
            margin-left: 10rpx;
          }
        }
        .title {
          font-weight: bold;
          font-size: 28rpx;
          color: $v-c0-85;
          line-height: 42rpx;
        }
        .tip {
          line-height: 36rpx;
          font-size: 24rpx;
          color: $v-c0-65;
        }
        .status {
          font-size: 20rpx;
          color: #f87020;
          margin-top: 18rpx;
          text-decoration-line: underline;
        }
        .receive {
          padding: 4rpx 16rpx;
          //width: auto;
          display: inline-block;
          margin-top: 12rpx;
          background: rgba(255, 255, 255, 0.65);
          border: 2rpx solid #ffffff;
          box-shadow: 0rpx 4rpx 16rpx rgba(34, 40, 75, 0.15);
          border-radius: 34rpx;
          font-size: 20rpx;
          color: #1e86ce;
        }
      }
    }
  }
</style>
