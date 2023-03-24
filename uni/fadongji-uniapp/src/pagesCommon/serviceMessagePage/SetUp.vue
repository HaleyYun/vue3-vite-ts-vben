<template>
  <view class="wrap">
    <!--  头部  -->
    <VoNav :left-width="200" is-fixed isHaveMore title="消息设置" />
    <!--  消息设置  -->
    <view class="wrap-List">
      <view class="wrap-list flex flex-justify-between">
        <view class="wrap-list__word fz-32">消息免打扰</view>
        <u-switch
            v-if="isLoading"
          activeColor="#5ac725"
          :activeValue="1"
          :inactiveValue="0"
          v-model="settings.pushFlag"
          @change="change"
        />
      </view>
      <view class="fz-24 warn">开启免打扰开关后，您将不再收到该类型消息的任何推送通知</view>
      <view class="fz-28 warn">未读消息</view>
      <view class="wrap-list flex flex-justify-between">
        <view class="wrap-list__word fz-32">是否显示数字</view>
        <u-switch
            v-if="isLoading"
            activeColor="#5ac725"
          :activeValue="1"
          :inactiveValue="0"
          v-model="settings.numFlag"
          @change="change"
        />
      </view>
      <view class="fz-24 warn">开启后，接收到的该类型消息将在消息页进行数字提醒</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SetUp',
    data() {
      return {
        isLoading:false,
        settings: {
          messageType: 1,
          numFlag: 0,
          pushFlag: 0,
        },
      }
    },
    onLoad(options) {
      if (options.type) {
        this.settings.messageType = options.type
      }
    },
    mounted() {
      this.getSettingStatus()
    },
    methods: {
      getSettingStatus() {
        // 服务通知
        this.$VoHttp
          .apiContentMessageUserSettingSelect({ messageType: this.settings.messageType })
          .then((res) => {
            this.settings.numFlag = res.data.numFlag
            this.settings.pushFlag = res.data.pushFlag
            this.isLoading=true

          })
      },
      setSettingStatus() {
        // 服务通知
        this.$VoHttp.apiContentMessageUserSettingSet({ ...this.settings }).then((res) => {
          this.$u.toast('设置成功')
        })
      },
      change(e) {
        this.setSettingStatus()
        console.log('change', e)
      },
      // 返回上一页
      returnFn() {
        this.$backFn()
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
      &__left {
        .left-return {
          width: 50rpx;
          height: 50rpx;
          margin: 0 20rpx;
        }
        .left-msg {
          font-size: 36rpx;
          margin: 0 16rpx;
        }
      }
    }
    &-list {
      padding: 0 30rpx;
      height: 96rpx;
      align-items: center;
      box-sizing: border-box;
      background: #fff;
    }
  }
  .warn {
    padding: 16rpx 30rpx;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
