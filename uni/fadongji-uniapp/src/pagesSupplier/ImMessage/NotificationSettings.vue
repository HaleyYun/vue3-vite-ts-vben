<template>
  <view class="setting">
    <VoNav is-fixed is-have-more title="通知设置">

    </VoNav>
    <!-- #ifdef APP-PLUS -->
    <view class="setting-tips">通知接收</view>
    <!-- #endif -->
    <view class="setting-notice">
      <!-- #ifdef APP-PLUS -->
      <view
        class="setting-notice__list flex flex-justify-between flex-vertical-c"
        @click="goSystemSettings"
      >
        <view class="">新消息系统通知</view>
        <view class="flex flex-vertical-c">
          <view class="list-right fz-28">{{ setupText }}</view>
          <VoIcon :opacity="0.25" name="right-arrow" />
        </view>
      </view>
      <!-- #endif -->
      <view
        class="setting-notice__list flex flex-justify-between flex-vertical-c"
        @click="goBlackList"
      >
        <view class="">黑名单</view>
        <VoIcon :opacity="0.25" name="right-arrow" />
      </view>
    </view>
    <!-- <view class="setting-tips">声音与振动</view>
    <view class="setting-fun">
      <view class="setting-fun__switch flex flex-justify-between flex-vertical-c">
        <view class="fz-32 color-block">声音</view>
        <u-switch v-model="voiceValue" activeColor="#00B359" size="30" />
      </view>
      <view class="setting-fun__switch flex flex-justify-between flex-vertical-c">
        <view class="fz-32 color-block">震动</view>
        <u-switch v-model="vibrationValue" activeColor="#00B359" size="30" />
      </view>
    </view> -->
  </view>
</template>

<script>
  export default {
    name: 'NotificationSettings',
    data() {
      return {
        setupText: '',
        voiceValue: false, // 声音开关选择器
        vibrationValue: false, // 震动开关选择器
      }
    },
    created() {
      // #ifdef APP-PLUS
      if (uni.getSystemInfoSync().platform == 'android') {
        var main = plus.android.runtimeMainActivity()
        var NotificationManagerCompat = plus.android.importClass(
          'androidx.core.app.NotificationManagerCompat',
        )
        console.log(NotificationManagerCompat)
        var packageNames = NotificationManagerCompat.from(main)
        console.log(JSON.stringify(packageNames))
        if (packageNames.areNotificationsEnabled()) {
          console.log('已开启通知权限')
          this.setupText = '已开启'
        } else {
          this.setupText = '未开启，去“设置”修改'
        }
      }
      if (uni.getSystemInfoSync().platform == 'ios') {
        var UIApplication = plus.ios.import('UIApplication')
        var app = UIApplication.sharedApplication()
        var enabledTypes = 0
        if (app.currentUserNotificationSettings) {
          var settings = app.currentUserNotificationSettings()
          enabledTypes = settings.plusGetAttribute('types')
        } else {
          //针对低版本ios系统
          enabledTypes = app.enabledRemoteNotificationTypes()
        }
        if (enabledTypes) {
          console.log('已开启通知权限')
          this.setupText = '已开启'
        } else {
          this.setupText = '未开启，去“设置”修改'
        }
      }
      // #endif
    },
    methods: {
      goBlackList() {
        this.$linkToEasy('/pagesSupplier/ImMessage/BlackList')
      },

      /**
       * 调起手机的通知设置功能
       */
      goSystemSettings() {
        // android平台
        if (uni.getSystemInfoSync().platform == 'android') {
          var main = plus.android.runtimeMainActivity()
          var pkName = main.getPackageName()
          var Intent = plus.android.importClass('android.content.Intent')
          var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS') //可设置表中所有Action字段
          intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
          main.startActivity(intent)
        }
        // ios平台
        if (uni.getSystemInfoSync().platform == 'ios') {
          var UIApplication = plus.ios.import('UIApplication')
          var app = UIApplication.sharedApplication()
          var enabledTypes = 0
          if (app.currentUserNotificationSettings) {
            var settings = app.currentUserNotificationSettings()
            enabledTypes = settings.plusGetAttribute('types')
          } else {
            //针对低版本ios系统
            enabledTypes = app.enabledRemoteNotificationTypes()
          }
          if (0 == enabledTypes) {
            console.log('请先打开APP通知权限')
          }
          plus.ios.deleteObject(app)
          var UIApplication = plus.ios.import('UIApplication')
          var NSURL = plus.ios.import('NSURL')
          var setting = NSURL.URLWithString('app-settings:')
          var application = UIApplication.sharedApplication()
          application.openURL(setting)
          plus.ios.deleteObject(setting)
          plus.ios.deleteObject(application)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .setting {
    width: 750rpx;
    height: 100vh;
    &-tips {
      height: 42rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-45;
      padding: 16rpx 32rpx;
    }
    &-notice {
      background: #ffffff;
      &__list {
        padding: 24rpx 32rpx 24rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        font-size: 32rpx;
        color: $v-c0-85;
        .list-right {
          color: $v-c0-65;
          margin-right: 4rpx;
        }
      }
    }
    &-fun {
      background: #ffffff;
      &__switch {
        padding: 16rpx 32rpx 16rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        &:last-child {
          border-bottom: 2rpx solid transparent;
        }
      }
    }
  }
</style>
