<template>
  <view>
    <block v-for="(info, index) of showMessageList" :key="info.id+'_'+(index)">
      <view v-if="info.content" class="room-message-item">
        <!--   文字消息样式   -->
        <view class="room-message-container"  :class="{'p-t-80':+index===0}">
          <view class="room-message-timer" v-if="timeDifference(info.createTime, index)">{{
              getNowTime(info.createTime, index)
            }}</view>

          <RollbackInfo
            v-if="info.type === 'rollbackText'||info.type === 'rollbackPic'||info.type === 'rollbackVideo'||info.type === 'rollbackOrder'||info.type === 'rollbackGoods'||info.type === 'rollbackMusic'"
            bubblePosition="right"
            :info="info"
            @reEditFn="reEditFn"

          />
          <view
            v-else
            class="chat-middle__bubble flex"
            :class="{ 'flex-justify-r': info.direction === 'to' }"
          >
            <u-avatar
              v-if="info.direction === 'from'"
              default-url="/static/icons/defaultHead.png"
              :src="head.from+'&type=2'"
              shape="square"
              :size="48"
              @click="goSetting(info)"
            />
            <view class="content flex1" :class="info.direction === 'from' ? 'text-l' : 'text-r'">
              <view class="refresh" v-if="info.sendStatus == 0">
                <VoIcon name="refresh-home" color="#000000" :opacity="0.45" :size="16" />
              </view>
              <view class="errorMessage" v-if="info.sendStatus == -1">
                <VoIcon name="error-full" color="#E50012" @click="resend(info, index)" />
              </view>

              <TextMessage
                bubblePosition="right"
                v-if="info.type === 'text'"
                :text-message-list="info"
                @rollbackFn="rollbackFn($event,index)"

              />
              <!--   查看商品消息样式 查看订单样式   -->
              <CheckGoods
                bubblePosition="right"
                v-if="info.type === 'prod' || info.type === 'order'"
                :check-goods-list="info"
                @checkClick="checkClick"
              />
              <!--   核对订单信息消息样式   -->
              <CheckOrderInfo
                v-if="info.type == 'confirmOrder' || info.type == 'substituteOrder'"
                bubblePosition="right"
                :order-info-list="info"
                @remindPayment="remindPayment(info, index)"
              />
              <MediaMessage
                v-if="info.type === 'video' || info.type === 'image'"
                :type="info.type"
                bubblePosition="right"
                :video-message-list="info"
                @rollbackFn="rollbackFn($event,index)"
              />
              <VoiceMessage
                v-if="info.type === 'voice'"
                :playId.sync="playId"
                bubblePosition="right"
                :voice-message-list="info"
                @rollbackFn="rollbackFn($event,index)"
              />

              <!--   核对集师傅订单信息消息样式   -->
              <CheckMasterOrder
                v-if="info.type === 'garageCancelInstallation'||info.type === 'garageCancelRecovery'||info.type === 'masterInstallation'||info.type === 'masterRecovery'||info.type === 'masterCancelInstallation'||info.type === 'masterCancelRecovery'"
                bubblePosition="right"
                :order-info-list="info"
                @remindPayment="remindPayment(info, index)"
              />










            </view>
            <u-avatar
              v-if="info.direction === 'to'"
              default-url="/static/icons/defaultHead.png"
              :src="getMeHead"
              shape="square"
              :size="48"
              @click="goSetting(info)"
            />
          </view>

          <view v-if="info.isblack == 1 || info.isBlack == 1" class="flex flex-justify-r">
            <view class="blackInfo flex">
              <VoIcon name="error-full" color="#E50012" @click="resend(info, index)" />
              <view class="text">消息已发出但被对方拒收！</view>
            </view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import TextMessage from '@/pagesSupplier/ImMessage/components/TextMessage'
  import CheckGoods from '@/pagesSupplier/ImMessage/components/CheckGoods'
  import CheckOrderInfo from '@/pagesSupplier/ImMessage/components/CheckOrderInfo'
  import MediaMessage from '@/pagesSupplier/ImMessage/components/mediaMessage'
  import VoiceMessage from '@/pagesSupplier/ImMessage/components/VoiceMessage'
  import CheckMasterOrder from '@/pagesSupplier/ImMessage/components/CheckMasterOrder'
  import RollbackInfo from '@/pagesSupplier/ImMessage/components/RollbackInfo'
  import store from "@/store";

  export default {
    name: 'RoomMessageItem',
    components: {
      TextMessage,
      CheckGoods,
      CheckOrderInfo,
      MediaMessage,
      VoiceMessage,
      CheckMasterOrder,RollbackInfo
    },
    props: {
      showMessageList: {
        type: Array,
        default: [],
        required: true,
      },
      head: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        voiceTurnText: '',
        playId:null,
      }
    },
    computed: {
      getMeHead() {
        let currentUserInfo = this.$store.getters['user/getUserInfo']()
        if (currentUserInfo.platformCode == 'garage') {
          return currentUserInfo.photoUrl+'&type=2'
        } else {
          return currentUserInfo.photoUrl+'&type=2' || currentUserInfo.storeUrl+'&type=2'
        }
      },
    },
    methods: {
      /**
       * 重新编辑
       * @param data
       */
      reEditFn(data){
        this.$emit('reEditFn', data)

      },
      rollbackFn(data,index){
        data.messageStyle=1

        store.dispatch('im/setMessageRollbackFn', {...data})
        this.showMessageList[index].type=data.type
        this.showMessageList[index].messageType=data.messageType



      },
      toChoose() {},
      checkClick(data) {
        console.log(data.content.url)
        this.$linkToEasy(data.content.url)
      },
      goSetting(info) {
        this.$emit('goUseSetting', info)
      },
      // 从新发送
      resend(info, index) {
        this.$emit('resend', { info: info, index: index })
      },
      // 提醒付款，就是重新再发送一遍
      remindPayment(info, index){
        this.$emit('resend', { info: info, index: null })
      },
      timeDifference(date, index) {
        let timestamp = this.getTimeType(date)
        let nextTime = ''
        if (this.showMessageList[index - 1]) {
          nextTime = this.getTimeType(this.showMessageList[index - 1].createTime)
        } else {
          return true
          // nextTime = new Date().getTime()
        }
        let timer = timestamp - nextTime
        timer = parseInt(String(timer / 1000))




        if (timer > 300) {
          return true
        } else {
          return false
        }
      },
      getNowTime(date, index) {
        const createdTime=new Date(date)
        const nowTime=new Date()
        // 下方统一时间判断有问题  特hack下今天的聊天时间
        if(createdTime.getFullYear()==nowTime.getFullYear()&&createdTime.getMonth()==nowTime.getMonth()&&createdTime.getDate()==nowTime.getDate()){

          return  createdTime.getHours().toString().padStart(2, '0')+':'+createdTime.getMinutes().toString().padStart(2, '0')
        }




        let time = this.getTimeType(date)
        let nextTime = ''
        if (this.showMessageList[index - 1]) {
          nextTime = this.getTimeType(this.showMessageList[index - 1].createTime)
        } else {
          nextTime = new Date().getTime()
        }

        return this.$vocenApi.VoUtils.chartTimeTransfer(time, 'yyyy-mm-dd', new Date().getTime())
      },
      getTimeType(date) {
        let timestamp = ''
        if (this.$vocenApi.Pattern.isDate(date)) {
		  timestamp = Number(new Date(date.replace(/-/g, '/')))
		} else {
          timestamp = date
        }
        if (timestamp.toString().length == 10) timestamp *= 1000
        return timestamp
      },
    },
  }
</script>

<style lang="scss" scoped>
  .room-message-item {
    margin-top: 20rpx;
    .room-message-timer {
      text-align: center;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.25);
      margin-bottom: 24rpx;
    }
    .chat-middle__bubble {
      margin-bottom: 20rpx;
    }
    .content {
      width: 512rpx;
      min-width: 512rpx;
      max-width: 512rpx;
      margin: 0 32rpx;
      position: relative;
    }
    .text-l {
      text-align: left;
    }
    .text-r {
      text-align: right;
    }
    .blackInfo {
      padding: 16rpx;
      font-size: 28rpx;
      line-height: 150%;
      background: #feecee;
      border-radius: 4px;
      color: #e50012;
      margin-right: 128rpx;
      .text {
        margin-left: 16rpx;
      }
    }
    .refresh {
      margin-right: 20rpx;
      display: inline-block;
      animation: fadenum 2s infinite;
    }
    .errorMessage {
      margin-right: 20rpx;
      display: inline-block;
    }

    @keyframes fadenum {
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .p-t-80{
    padding-top: 80rpx;
  }
</style>
