<template>
  <view :class="{ top: chatItemInfo.top == 1 }" class="chat flex flex-justify-between">
    <view class="chat-left">
      <u-avatar
        :size="48"
        :src="
          chatItemInfo.type === 'interest'
            ? chatItemInfo.photoUrl
            : chatItemInfo.photoUrl + '&type=2'
        "
        class="chat-left__img"
        default-url="/static/icons/defaultHead.png"
        shape="square"
      />
      <VoBadge v-if="chatItemInfo.disturb && chatItemInfo.notReadNum" :isDot="true" class="point" />
      <VoBadge v-else :value="chatItemInfo.notReadNum" class="chat-left__badge" max="99" />
    </view>
    <view v-if="chatItemInfo.type === 'interest'" class="chat-right function flex1">{{
      chatItemInfo.name
    }}</view>
    <view v-else class="chat-right flex1 flex flex-column flex-justify-between">
      <view class="chat-right__up flex flex-justify-between flex-vertical-c">
        <view class="up-note overEllipsis">
          {{ chatItemInfo.targetNickName || chatItemInfo.targetName }}
        </view>
        <view v-if="chatItemInfo.recordTimeLastText" class="up-time">
          {{ chatItemInfo.recordTimeLastText }}
        </view>
      </view>
      <view class="chat-right__down flex flex-justify-between flex-vertical-c">
        <view v-if="chatItemInfo.recordLast" class="down-msg">
          {{ recordTextFilterFn(chatItemInfo) }}
        </view>
        <view v-else class="down-msg" />
        <VoIcon v-if="chatItemInfo.disturb == 1" :opacity="0.45" :size="16" name="message-mute" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ChatListItem',
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
      chatItemInfo: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      recordTextFilterFn(chatItemInfo){
        let lestInfo = JSON.parse(chatItemInfo.recordLast)
        //消息类型(0:文本  1:图片  2:视频 3:订单 4:商品)
        let messageTypeDict = []
        if(+lestInfo.messageStyle===0){
          //0 最后一条消息 接受   1最后发送
          messageTypeDict=['text', '【图片】', '【视频】', '【订单】', '【商品】', '【语音】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','对方撤回了一条消息','对方撤回了一条消息','对方撤回了一条消息','对方撤回了一条消息','对方撤回了一条消息','对方撤回了一条消息']
        }else{
          messageTypeDict=['text', '【图片】', '【视频】', '【订单】', '【商品】', '【语音】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','【订单】','你撤回了一条消息','你撤回了一条消息','你撤回了一条消息','你撤回了一条消息','你撤回了一条消息','你撤回了一条消息']
        }

        if (lestInfo.messageType == 0) {
          return lestInfo.message
        } else  {
          return messageTypeDict[lestInfo.messageType]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .chat {
    background: #ffffff;
    padding: 24rpx 32rpx;
    &.function {
      padding-left: 0;
      padding-right: 0;
    }
    &-left {
      position: relative;
      width: 96rpx;
      height: 96rpx;
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }
      &__badge {
        position: absolute;
        top: -14rpx;
        right: -14rpx;
        font-size: 20rpx;
        min-width: 30rpx;
        min-height: 30rpx;
        border-radius: 30rpx;
        width: auto;
        height: auto;
      }
    }
    &-right {
      margin-left: 24rpx;
      &.function {
        height: 96rpx;
        line-height: 96rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__up {
        .up-note {
          max-width: 408rpx;
          height: 48rpx;
          line-height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .up-time {
          width: 136rpx;
          height: 36rpx;
          font-size: 24rpx;
          line-height: 36rpx;
          text-align: right;
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
    }
  }
  .top {
    background: #f7f7f8;
  }
  .point {
    position: absolute;
    top: -8rpx;
    right: -8rpx;
  }
</style>
