<template>
<view >
  <view  v-if="checkIsWithdrawFn()" class="withdraw-class">
    <u-tooltip-era  @click="withdrawFn" :showCopy="false" :direction="direction" :buttons="['撤回']">
      <view
        slot="content"
        :class="{
      'wrap-bubble': textMessageList.direction === 'from',
      'wrap-bubble__main': textMessageList.direction === 'to',
    }"
      >

        {{ textMessageList.content }}
      </view
      >
    </u-tooltip-era>
  </view>



  <view
    v-else
    :class="{
      'wrap-bubble': textMessageList.direction === 'from',
      'wrap-bubble__main': textMessageList.direction === 'to',
    }"
  >

    {{ textMessageList.content }}
  </view
  >
</view>

</template>
<script>
import { isCanWithdrawFn, toast,error } from "@/common/helper";

  export default {
    name: 'TextMessage',
    props: {
      /**
       * message 消息内容
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       */
      textMessageList: {
        type: Object,
        default: {},
      },
      direction:{
        type:String,
        default:'top'
      }
    },
    data() {
      return {}
    },
    methods: {
      checkIsWithdrawFn(){
        return this.textMessageList.direction==='to'&&isCanWithdrawFn(this.textMessageList.createTime)
      },
      withdrawFn(){
        let param={
          id:this.textMessageList.id,
          message:this.textMessageList.message,
          messageId:this.textMessageList.messageId,
          messageType:this.textMessageList.messageType,
          otherId:this.textMessageList.otherId,
          recipientId:this.textMessageList.friendId,
          recipientPlatformCode:this.textMessageList.friendPlatformCode
        }
        this.$VoHttp.apiMessageRecordRollbackMessage(param).then(res=>{
          toast('撤回成功','none')
          this.$emit('rollbackFn',{type:'rollbackText',messageType:14,  id:this.textMessageList.id,
            message:this.textMessageList.message,})

        }).catch(e=>{
          error(e.message||'撤回失败')
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .wrap-bubble {
    max-width: 512rpx;
    background: #fff;
    font-size: 28rpx;
    padding: 16rpx 24rpx 16rpx;
    border-radius: 10rpx;
    position: relative;
    line-height: 2;
    word-break: break-all;
    display: inline-block;
    &::before {
      content: '';
      position: absolute;
      left: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-right: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }
  .wrap-bubble__main {
    //background: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    color: $v-c0-85;
    font-size: 28rpx;
    padding: 16rpx 24rpx 16rpx;
    border-radius: 10rpx;
    position: relative;
    line-height: 2;
    word-break: break-all;
    display: inline-block;
    &::before {
      content: '';
      position: absolute;
      right: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-left: 16rpx solid $v-tags-btn-disabled;
      //border-left: 16rpx solid $color-primary-yellow;
      border-radius: 8rpx;
    }
  }

  .withdraw-class{
    display: flex;justify-content: flex-end;
  }
</style>
