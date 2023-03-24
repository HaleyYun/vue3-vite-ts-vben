<template>
  <view class="chat flex flex-justify-between">
    <view class="chat-left">
      <u-avatar :size="48" class="chat-left__img" default-url="/static/icons/defaultHead.png" :src="friendItemInfo.photoUrl+'&type=2'" shape="square"></u-avatar>
    </view>
    <view class="chat-right  flex1 flex flex-column flex-justify-between">
      <view>{{friendItemInfo.friendName }}</view>
      <view class="companyName">{{friendItemInfo.friendCompanyName}}</view>
    </view>


  </view>
</template>

<script>
  export default {
    name: 'ChatFirendItem',
    props: {
      /**
       * headImage 头像
       * message 消息数
       * doNotDisturb 是否开启了消息免打扰
       * note 消息列表备注名
       * time 消息时间
       * content 消息内容
       * name 功能名称
       */
      friendItemInfo: {
        type: Object,
        default: () => {},
      },
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .chat {
    background: #ffffff;
    padding: 10rpx 0rpx;
    &-left {
      position: relative;
      width: 96rpx;
      height: 96rpx;
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
        background: #f2f2f2;
      }
      &__badge {
        position: absolute;
        top: -14rpx;
        right: -14rpx;
        display: inline-block;
        &.point {
          top: -8rpx;
          right: -8rpx;
        }
      }
    }
    &-right {
      margin-left: 24rpx;
      height: 96rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      &__up {
        .up-note {
          height: 48rpx;
          line-height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .up-time {
          height: 36rpx;
          font-size: 24rpx;
          line-height: 36rpx;
          color: $v-c0-45;
        }
      }
      &__down {
        .down-msg {
          width: 500rpx;
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-65;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .companyName{
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
