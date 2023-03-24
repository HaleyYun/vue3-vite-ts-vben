<template>
  <view class="voice">

    <view v-if="checkIsWithdrawFn()" class="withdraw-class">
      <u-tooltip-era :direction="direction"   @click="withdrawFn"   :showCopy="false" :buttons="['撤回']" >
        <view slot="content" >
          <view
            @tap="voiceTap"
            :class="{
        'voice-left': voiceMessageList.direction === 'from',
        'voice-right': voiceMessageList.direction === 'to',
      }"
          >
            <view
              v-if="voiceMessageList.direction === 'from'"
              class="flex flex-vertical-c flex-justify-between"
            >
              <!--<VoIcon name="voice" color="#22284B" />-->
              <!--<div class="box">-->
              <!--<div class="wifi-symbol symbol-from ">-->
              <!--<div class="wifi-circle first"></div>-->
              <!--<div class="wifi-circle second" :class="playStatus&&playId == voiceMessageList.id?'second-animation':'second'"></div>-->
              <!--<div class="wifi-circle third" :class="playStatus&&playId == voiceMessageList.id?'third-animation':'third'"></div>-->
              <!--</div>-->
              <!--</div>-->
              <div class="voice-img">
                <image v-if="isPlay" src="/static/im/voiceRight.gif"/>
                <image v-else src="/static/im/voiceRight.png"/>
              </div>
              <view class="voice-time">
                {{ voiceMessageList.content.duration || durationFilte }}
                <text class="fz-20 color-block">s</text>
              </view>
            </view>
            <view v-else class="flex flex-vertical-c flex-justify-between">
              <view class="voice-time">
                {{ voiceMessageList.content.duration || durationFilte }}
                <text class="fz-20 color-block">s</text>
              </view>
              <!--<VoIcon class="voice-icon" name="voice" color="#000" />-->
              <div class="voice-img">
                <image v-if="isPlay" src="/static/im/voiceLeft.gif"/>
                <image v-else src="/static/im/voiceLeft.png"/>
              </div>
              <!--<div class="box">-->
              <!--<div class="wifi-symbol">-->
              <!--<div class="wifi-circle first"></div>-->
              <!--<div class="wifi-circle second" :class="playStatus&&playId == voiceMessageList.id?'second-animation':'second'"></div>-->
              <!--<div class="wifi-circle third" :class="playStatus&&playId == voiceMessageList.id?'third-animation':'third'"></div>-->
              <!--</div>-->
              <!--</div>-->
            </view>
            <view class="voiceTurn" :style="{right:isRead?'-148rpx':'-180rpx'}" v-if="voiceMessageList.direction === 'from'">
              <view class="bubble-badge" v-if="!isRead" />
              <view class="bubble-text" v-if="!voiceTurnText"  @click.stop="toText">转成文字</view>
            </view>
          </view>

          <view class="voiceText" v-if="turnLoading || voiceTurnText">
            <u-loading-icon v-if="turnLoading" mode="circle" />
            <view v-else>{{ voiceTurnText }}</view>
          </view>
        </view>
      </u-tooltip-era>
    </view>
    <view v-else>
      <view
        @tap="voiceTap"
        :class="{
        'voice-left': voiceMessageList.direction === 'from',
        'voice-right': voiceMessageList.direction === 'to',
      }"
      >
        <view
          v-if="voiceMessageList.direction === 'from'"
          class="flex flex-vertical-c flex-justify-between"
        >
          <!--<VoIcon name="voice" color="#22284B" />-->
          <!--<div class="box">-->
          <!--<div class="wifi-symbol symbol-from ">-->
          <!--<div class="wifi-circle first"></div>-->
          <!--<div class="wifi-circle second" :class="playStatus&&playId == voiceMessageList.id?'second-animation':'second'"></div>-->
          <!--<div class="wifi-circle third" :class="playStatus&&playId == voiceMessageList.id?'third-animation':'third'"></div>-->
          <!--</div>-->
          <!--</div>-->
          <div class="voice-img">
            <image v-if="isPlay" src="/static/im/voiceRight.gif"/>
            <image v-else src="/static/im/voiceRight.png"/>
          </div>
          <view class="voice-time">
            {{ voiceMessageList.content.duration || durationFilte }}
            <text class="fz-20 color-block">s</text>
          </view>
        </view>
        <view v-else class="flex flex-vertical-c flex-justify-between">
          <view class="voice-time">
            {{ voiceMessageList.content.duration || durationFilte }}
            <text class="fz-20 color-block">s</text>
          </view>
          <!--<VoIcon class="voice-icon" name="voice" color="#000" />-->
          <div class="voice-img">
            <image v-if="isPlay" src="/static/im/voiceLeft.gif"/>
            <image v-else src="/static/im/voiceLeft.png"/>
          </div>
          <!--<div class="box">-->
          <!--<div class="wifi-symbol">-->
          <!--<div class="wifi-circle first"></div>-->
          <!--<div class="wifi-circle second" :class="playStatus&&playId == voiceMessageList.id?'second-animation':'second'"></div>-->
          <!--<div class="wifi-circle third" :class="playStatus&&playId == voiceMessageList.id?'third-animation':'third'"></div>-->
          <!--</div>-->
          <!--</div>-->
        </view>
        <view class="voiceTurn" :style="{right:isRead?'-148rpx':'-180rpx'}" v-if="voiceMessageList.direction === 'from'">
          <view class="bubble-badge" v-if="!isRead" />
          <view class="bubble-text" v-if="!voiceTurnText"  @click.stop="toText">转成文字</view>
        </view>
      </view>

      <view class="voiceText" v-if="turnLoading || voiceTurnText">
        <u-loading-icon v-if="turnLoading" mode="circle" />
        <view v-else>{{ voiceTurnText }}</view>
      </view>
    </view>
  </view>
</template>
<script>
  // const innerAudioContext = uni.createInnerAudioContext()
  import { error, isCanWithdrawFn, toast } from "@/common/helper";

  export default {
    name: 'VoiceMessage',
    filters: {
      durationFilte(val) {
        if (val) {
          let time = Number(val)
          let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
          let seconds = parseInt((time % (1000 * 60)) / 1000)
          console.log(parseInt((time % (1000 * 60)) / 1000))
          return (
            (minutes > 10 ? minutes : '0' + minutes) +
            ':' +
            (seconds > 10 ? seconds : '0' + seconds)
          )
        } else {
          return '00:00'
        }
      },
    },
    props: {
      /**
       * message 消息内容
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       */
      voiceMessageList: {
        type: Object,
        default() {
          return {}
        },
      },
      playId:{
        type:String,
        default:''
      },
      direction:{
        type:String,
        default:'top'
      }
    },
    data() {
      return {
        turnLoading: false,
        voiceTurnText: '',
        isRead: this.voiceMessageList.content.isRead === '1' ? true : false, //是否已读
      }
    },
    created() {
      console.log(this.voiceMessageList)
    },
    watch: {
      playStatus: {
        handler(val) {
          if(!val){
            this.$emit('update:playId', null)
          }
          console.log(val)
        },
        deep: true,
        immediate: true,
      },
    },
    computed:{
      isPlay(){
        let id = this.voiceMessageList.id ||this.voiceMessageList.createTime
        if(this.playStatus&&((this.playId == id))){
          return true
        }else {
          return false
        }
      }
    },
    methods: {
      checkIsWithdrawFn(){
        return this.voiceMessageList.direction==='to'&&isCanWithdrawFn(this.voiceMessageList.createTime)
      },
      withdrawFn(){
        let param={
          id:this.voiceMessageList.id,
          message:this.voiceMessageList.message,
          messageId:this.voiceMessageList.messageId,
          messageType:this.voiceMessageList.messageType,
          otherId:this.voiceMessageList.otherId,
          recipientId:this.voiceMessageList.friendId,
          recipientPlatformCode:this.voiceMessageList.friendPlatformCode
        }
        this.$VoHttp.apiMessageRecordRollbackMessage(param).then(res=>{
          toast('撤回成功','none')
          this.$emit('rollbackFn',{type:'rollbackMusic',messageType:19,  id:this.voiceMessageList.id,
            message:this.voiceMessageList.message,})

        }).catch(e=>{
          error(e.message||'撤回失败')
        })
      },
      //状态设为已读
      setRead() {
        let obj = this.voiceMessageList.content
        obj.isRead = '1'
        this.$VoHttp.IM.apiMessageRecordUpdateMessage({
          id: this.voiceMessageList.id, //要修改的消息id
          message: JSON.stringify(obj), //要修改的消息体
        })
          .then((res) => {
            console.log('已读')
            this.isRead = true
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      voiceTap() {
        if(this.voiceMessageList.content.isRead != '1'){
          this.setRead()
        }
        //this.playId = this.voiceMessageList.id;
        this.$emit('update:playId', this.voiceMessageList.id||this.voiceMessageList.createTime)
        console.log(this.voiceMessageList)
        this.playInnerAudioContext(this.voiceMessageList.content.fileNameUrl)
        this.innerAudioContextEvent()
        // innerAudioContext.src = this.voiceMessageList.content.fileNameUrl
        // if (innerAudioContext.paused) {
        //   innerAudioContext.play()
        //   this.playStatus = true
        // } else {
        //   innerAudioContext.stop()
        // }
        //
        // // 播放暂停
        // innerAudioContext.onPause(() => {
        //    console.log('播放暂停')
        // })
        // // 播放停止
        // innerAudioContext.onStop(() => {
        //    console.log('播放停止')
        // })
      },
      toText() {
        this.RecordAudioText()
      },
      // 语音转文字 apiMessageRecordAudioText
      async RecordAudioText() {
        try {
          if (this.turnLoading) {
            return
          }
          this.turnLoading = true
          if(this.voiceMessageList.content.isRead != '1'){
            this.setRead()
          }
          const { code, data } = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl({
            filePath: this.voiceMessageList.content.fileNameUrl,
          })
          this.turnLoading = false
          if (code == '20001') {
            console.log('log', data.join(''))
            let voiceTurnText = data.join('')
            let i = 0
            let timer = setInterval(() => {
              this.voiceTurnText = voiceTurnText.substring(0, i)
              i++
              if (this.voiceTurnText.length == voiceTurnText.length) {
                clearInterval(timer)
              }
            }, 60)
          }
        } catch (e) {
          uni.$u.toast(e.message)
          this.turnLoading = false
        }
      },
    },
    //监听页面隐藏
    onHide() {
      clearInterval(this.timer)
      this.timer = null
    },
    //监听页面卸载
    onUnload() {
      clearInterval(this.timer)
      this.timer = null
    },
  }
</script>
<style lang="scss" scoped>
  .voice-left {
    background: #fff;
    font-size: 28rpx;
    padding: 16rpx 24rpx;
    border-radius: 10rpx;
    position: relative;
    max-width: 400rpx;
    display: inline-block;
    min-width: 200rpx;
    //margin-right: 62rpx;
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
  .voice-right {
    //background: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    color: $v-c0-85;
    font-size: 28rpx;
    padding: 16rpx 24rpx;
    border-radius: 10rpx;
    position: relative;
    max-width: 400rpx;
    min-width: 200rpx;
    display: inline-block;
    //margin-left: 62rpx;
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
  .color-white{
    color: white;
  }
  .voice {
    &-time {
      height: 30rpx;
      line-height: 30rpx;
      font-size: 24rpx;
    }
    &-icon {
      transform: rotate(180deg);
    }
  }
  .voice-img{
    image{
      width: 46rpx;
      height: 46rpx;
    }
  }
  .voiceTurn {
    position: absolute;
    right: -180rpx;
    display: flex;
    align-items: center;
    top: 30rpx;
  }
  .bubble-badge {
    width: 16rpx;
    height: 16rpx;
    //background: $color-primary-red;
    background: $v-text-disabled;
    border-radius: 16rpx;
    margin: 0 16rpx;
  }
  .bubble-text {
    height: 30rpx;
    line-height: 30rpx;
    color: $v-btn-deep;
    font-size: 20rpx;
    padding: 0 16rpx;
    background: $v-text-disabled;
    border-radius: 224rpx;
  }
  .voiceText {
    background: #ffffff;
    border-radius: 8rpx;
    padding: 24rpx;
    font-size: 28rpx;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.85);
    width: 456rpx;
    margin-top: 20rpx;
    text-align: left;
    .u-loading-icon {
      display: inline-block;
    }
  }
  .box {
    box-sizing: border-box;
    position: relative;
  }
  .wifi-symbol {
    width: 30rpx;
    height: 30rpx;
    box-sizing: border-box;
    overflow: hidden;
    transform: rotate(-45deg)
  }
  .symbol-from{
    transform: rotate(135deg);
  }
  .wifi-circle {
    border: 4rpx solid rgba(0, 0, 0, 0.85);
    border-radius: 50%;
    position: absolute;
  }
  .first {
    background: rgba(0, 0, 0, 0.85);
    top: 24rpx;
    left: 24rpx;
  }
  .second {
    width: 16rpx;
    height: 16rpx;
    top: 14rpx;
    left: 14rpx;
  }
  .second-animation{
    animation: fadeInOut 1s infinite 0.2s;
  }
  .third {
    width: 28rpx;
    height: 28rpx;
    top: 6rpx;
    left: 6rpx;
  }
  .third-animation{
    animation: fadeInOut 1s infinite 0.4s;
  }
  @keyframes fadeInOut {
    0% { opacity: 0; /*初始状态 透明度为0*/ }
    100% { opacity: 1; /*结尾状态 透明度为1*/ }
  }
  .withdraw-class{
    display: flex;justify-content: flex-end;
  }
</style>
