<template>
  <view :class="chatItemInfo.type" class="chat flex flex-justify-between">
    <view class="chat-left">
      <image :src="chatItemInfo.photoUrl || '/static/default_avatar.png'" class="chat-left__img" />
      <VoBadge
        v-if="chatItemInfo.message && !chatItemInfo.doNotDisturb"
        :value="chatItemInfo.notReadNum"
        class="chat-left__badge"
      />
      <VoBadge
        v-if="chatItemInfo.notReadNum && chatItemInfo.doNotDisturb"
        :isDot="true"
        class="chat-left__badge point"
      />
    </view>
    <view v-if="chatItemInfo.type === 'interest'" class="chat-right function flex1">{{
      chatItemInfo.name
    }}</view>
    <view v-else class="chat-right flex1 flex flex-column flex-justify-between">
      <view class="chat-right__up flex flex-justify-between flex-vertical-c">
        <view class="up-note">{{ chatItemInfo.targetName }}</view>
        <view v-if="chatItemInfo.recordTimeLast" class="up-time">{{
          chatItemInfo.recordTimeLast
        }}</view>
      </view>
      <view class="chat-right__down flex flex-justify-between flex-vertical-c">
        <!--        <view class="down-msg" v-if="chatItemInfo.recordLast">{{ chatItemInfo.recordLast|recordTextFilter }}</view>-->
        <view v-if="chatItemInfo.recordLast" class="down-msg">{{ chatItemInfo.recordLast }}</view>
        <VoIcon v-if="chatItemInfo.doNotDisturb" :opacity="0.45" :size="16" name="message-mute" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'MessageItem',
    filters: {
      recordTextFilter(val) {
        let lestInfo = JSON.parse(val)
        //消息类型(0:文本  1:图片  2:视频 3:订单 4:商品)
        let messageTypeDict = ['text', '【图片】', '【视频】', '【订单】', '【商品】', '【语音】']
        if (lestInfo.messageType == 0) {
          return lestInfo.message
        } else {
          return messageTypeDict[lestInfo.messageType]
        }
      },
    },
    props: {
      /**
       * photoUrl 头像
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
      recordTimeChange(time) {
        /**
       * 最后一条消息日期＝当日  消息发送时间≤1分钟，显示文案“刚刚”；
       消息发送时间＞1分钟，显示文案“hh:mm”，小时为24小时制
       最后一条消息日期 = 当前日期前一天
       显示文案：昨天
       最后一条消息日期 = 本周内
       显示文案：周X
       最后一条消息日期 =  本年内
       显示文案：XX月XX日
       最后一条消息日期不在本年内
       显示文案：XXXX年XX月XX日
       */
        return this.$vocenApi.VoUtils.timeTransfer(time)
      },
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
        display: inline-block;
        &.point {
          top: -8rpx;
          right: -8rpx;
        }
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
    }
  }
</style>
