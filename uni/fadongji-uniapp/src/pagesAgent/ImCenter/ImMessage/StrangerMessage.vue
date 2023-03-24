<template>
  <view class="wrap">
    <!--  头部  -->
    <view class="wrap-navigation flex flex-vertical-c">
      <image class="wrap-navigation__return" src="/static/icons/left.png" @click="returnFn" />
      <view class="wrap-navigation-msg flex1">消息</view>
    </view>
    <!--  消息列表  -->
    <view>
      <u-cell-group>
        <u-cell
          :title="info.title"
          :label="info.label"
          v-for="(info, index) of indexList"
          :key="index"
          @click="goChat"
        >
          <u-avatar class="m-r-16" slot="icon" shape="circle" size="35" :src="info.url" />
          <view slot="value">
            <view class="wrap-time">{{ info.time }}</view>
            <view class="flex flex-vertical-c flex-justify-r">
              <image class="wrap-msg__close" :src="indexList[0].src" />
              <u-badge v-if="info.badge" class="wrap-msg__badge" :isDot="true" type="error" />
            </view>
          </view>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Inquiry',
    data() {
      return {
        indexList: [
          {
            url: '/static/icons/me.png',
            title: '新乡汽配之家',
            label: '你问的这个发动机我们有货',
            time: '10:30',
            badge: true,
          },
          {
            url: '/static/icons/me.png',
            title: '新乡汽配之家',
            label: '你问的这个发动机我们有货',
            time: '10:30',
            badge: false,
          },
          {
            url: '/static/icons/me.png',
            title: '新乡汽配之家',
            label: '你问的这个发动机我们有货',
            time: '10:30',
            badge: false,
          },
          {
            url: '/static/icons/me.png',
            title: '新乡汽配之家',
            label: '你问的这个发动机我们有货',
            time: '10:30',
            badge: false,
          },
        ],
      }
    },
    methods: {
      // 去聊天页面
      goChat() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/ChatPage')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__return {
        width: 50rpx;
        height: 50rpx;
        margin: 0 20rpx;
      }
      &__msg {
        font-size: 34rpx;
        margin: 0 16rpx;
      }
    }
    &-time {
      font-size: 30rpx;
      color: #c6c6c6;
      margin-bottom: 10rpx;
    }
    &-msg {
      &__close {
        width: 36rpx;
        height: 36rpx;
      }
      &__badge {
        margin-left: 10rpx;
      }
    }
  }
</style>
