<template>
  <view class="wrap">
    <view class="wrap-padding">
      <ChatTime class="bottom-margin" :time="time1" />
      <view class="bottom-margin wrap-flex wrap-width">
        <u-avatar :src="photo2" shape="square" @click="goFriendDetails" />
        <BubbleBox bubblePosition="left" :message="message1" />
      </view>
      <view class="bottom-margin wrap-flex wrap-width">
        <u-avatar class="right-margin" :src="photo2" shape="square" @click="goFriendDetails" />
        <u-image :src="src" width="150px" height="100px" />
      </view>
      <ChatTime class="bottom-margin" :time="time2" />
      <view class="bottom-margin wrap-flex wrap-right" v-for="info of list" :key="info.id">
        <BubbleBox bubblePosition="right" :message="info.content" />
        <u-avatar :src="photo1" shape="square" />
      </view>
      <ChatTime class="bottom-margin" :time="time3" />
      <view class="bottom-margin wrap-flex wrap-width" v-for="age of message2" :key="age.id">
        <u-avatar :src="photo2" shape="square" @click="goFriendDetails" />
        <BubbleBox bubblePosition="left" :message="age.content" />
      </view>
      <ChatTime class="bottom-margin" :time="time4" />
      <view class="bottom-margin wrap-flex wrap-right">
        <BubbleBox bubblePosition="right" :message="answer" />
        <u-avatar :src="photo1" shape="square" />
      </view>
      <view v-for="(message, index) of newMessage" :key="index">
        <ChatTime class="bottom-margin" :time="message.time" />
        <view class="bottom-margin wrap-flex wrap-right">
          <BubbleBox bubblePosition="right" :message="message.msg" />
          <u-avatar :src="photo1" shape="square" />
        </view>
      </view>
    </view>
    <view class="wrap-bottom" :class="{ 'padding-bottom': featur }">
      <view class="wrap-flex">
        <view>
          <image src="/static/icons/message.png" class="wrap-icon left-margin" />
        </view>
        <textarea
          @focus="focusFn"
          @blur="blurFn"
          class="wrap-bottom__text"
          border="none"
          v-model="valueText"
          :show-confirm-bar="false"
          :auto-height="true"
          confirm-type="send"
          @confirm="sendFn"
        ></textarea>
        <view @click="expression">
          <image v-if="face" src="/static/icons/grinning-face.png" class="wrap-icon left-margin" />
          <image v-else src="/static/icons/keyboard.png" class="wrap-icon left-margin" />
        </view>
        <view @click="addFeatur">
          <image src="/static/icons/add.png" class="wrap-icon" />
        </view>
      </view>
      <div class="safearea-box" :class="{ 'height-safearea': !safeareaShow || featur }"></div>
      <view v-if="featur" class="wrap-add">
        <view class="wrap-add__top"></view>
        <view class="wrap-add__box flex">
          <view
            class="box-adds flex flex-column flex1 flex-vertical-c"
            v-for="(info, index) of adds"
            :key="index"
          >
            <view class="box-adds__block"></view>
            <view class="box-adds__ann">{{ info }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  // import * as vocenApi from "@vocen/shared";
  import BubbleBox from '../Components/BubbleBox/BubbleBox'
  import ChatTime from '../Components/ChatTime/ChatTime'
  export default {
    components: { BubbleBox, ChatTime },
    data() {
      return {
        safeareaShow: true,
        time1: '1月9日 15:55',
        time2: '1月10日 17:22',
        time3: '1月11日 20:38',
        time4: '1月11日 21:31',
        photo2: '/static/headPhoto/photo2.JPG',
        photo1: '/static/headPhoto/photo1.png',
        src: '/static/headPhoto/girl.jpg',
        list: [
          { id: 1, content: '1111111111' },
          { id: 2, content: '22' },
          { id: 3, content: '33333333333' },
        ],
        message1: '444444444',
        message2: [
          { id: 'one', content: '555' },
          { id: 'two', content: '66666666666' },
        ],
        answer: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        confirmType: '发送',
        face: true,
        valueText: '',
        newMessage: [],
        featur: false,
        adds: ['相册', '相册', '相册', '相册'],
      }
    },
    methods: {
      focusFn() {
        this.safeareaShow = false
        this.featur = false
      },
      blurFn() {
        this.safeareaShow = true
        this.featur = true
      },
      sendFn(event) {
        console.log('111111111', event.detail.value)
        const timestamp = (new Date().getTime() / 1000).toFixed(0)
        // console.log(this.$vocenApi.VoUtils.timeFormat(1648699440000), 'sss')
        const times = this.$vocenApi.VoUtils.timeTransfer(timestamp)
        console.log(this.$vocenApi.VoUtils.timeTransfer(timestamp), '5555')

        this.valueText = event.detail.value
        this.newMessage.push({
          time: times,
          msg: this.valueText,
        })
        this.valueText = ''
      },
      expression() {
        this.face = !this.face
      },
      addFeatur() {
        this.featur = !this.featur
      },
      // 去好友详情
      goFriendDetails() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/FriendDetails')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f6f6f6;
    padding-bottom: 100rpx;
    .wrap-padding {
      padding: 30rpx;
      flex: 1;
    }
    &-flex {
      display: flex;
    }
    &-right {
      justify-content: flex-end;
      margin-left: 100rpx;
    }
    &-width {
      margin-right: 100rpx;
    }
    &-icon {
      width: 56rpx;
      height: 56rpx;
      margin-right: 20rpx;
      margin-top: 8rpx;
      display: block;
    }
    &-bottom {
      bottom: 0rpx;
      width: 750rpx;
      box-sizing: border-box;
      background: Lightgrey;
      padding: 10rpx 0;
      position: fixed;
      left: 0;
      &__text {
        //width: 480rpx;
        flex: 1;
        background: #fff;
        padding: 10rpx;
      }
      &__fixed {
        height: 50rpx;
      }
    }
    &-add {
      &__top {
        height: 10rpx;
        background: Lightgrey;
      }
      &__box {
        height: 300rpx;
        background: #fff;
        padding-top: 50rpx;
        .box-adds {
          &__block {
            width: 100rpx;
            height: 100rpx;
            background: #ccc;
            border-radius: 30rpx;
          }
          &__ann {
            font-size: 32rpx;
            margin-top: 10rpx;
            width: 100rpx;
            text-align: center;
          }
        }
      }
    }
  }
  .height-safearea {
    height: 0rpx !important;
  }
  .padding-bottom {
    padding-bottom: 0;
  }
  .bottom-margin {
    margin-bottom: 30rpx;
  }
  .right-margin {
    margin-right: 30rpx;
  }
  .left-margin {
    margin-left: 20rpx;
  }
  // 安全区域
  .safearea-box {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
    background: Lightgrey;
  }
</style>
