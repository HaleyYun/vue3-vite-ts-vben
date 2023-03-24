<template>
  <view
    class="register"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <!--  logo模块：start  -->
    <image class="register-logo" src="/static/common/logo.png" />
    <!--  logo模块：end  -->
    <!--  中间说明模块：start  -->
    <view class="register-explain">
      <view class="register-explain__one">{{ title }}</view>
      <view class="register-explain__two">您可以点击下方链接下载APP</view>
      <view class="register-explain__button" @click="goDownload">去应用市场下载</view>
    </view>
    <!--  中间说明模块：end  -->
    <!--  底部固定模块：start  -->
    <view class="register-footer">
      <text class="register-footer__word">拨打电话：</text>
      <text class="register-footer__num" @click="$cellPhone('400-893-5518')">400-893-5518</text>
    </view>
    <!--  底部固定模块：end  -->
  </view>
</template>
<script>
  import { toast } from "@/common/helper";

  export default {
    name: 'DownloadApp',
    data() {
      return {
        title: '欢迎您注册成为发动集共创平台代理商',
      }
    },
    onLoad(options) {
      this.title =
        // ? '某某某邀请您加入发动集共创平台'
        // : '欢迎您注册成为发动集共创平台代理商'
        options.pages === 'app' ? '您已注册成功，请下载APP登录' : '您已注册成功，请下载APP登录'
    },
    methods: {
      /**
       * 去下载
       */
      goDownload() {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

        //true 是正式 false 是测试
        let isProduct = true
        if (location.href.indexOf('testm.') > -1) {
          isProduct = false
        }

        if (isAndroid) {
          if (isProduct) {
            const u = navigator.userAgent.toLowerCase()
            let isApp =
              u.match(/MicroMessenger/i) == `micromessenger` ||
              u.indexOf('dingtalk') !== -1 ||
              u.indexOf('qq') !== -1
            if (isApp) {
              toast('请用默认浏览器打开当前页面','none')
              return
            }
            window.location.href = 'https://dcp.fdjcyl.com/GongChuangJi/fadongji.apk'+'?t='+Date.parse(String(new Date()))
            return
          }

          window.location.href = 'https://www.pgyer.com/IDhE'
          return
        }

        if (isiOS) {
          if (isProduct) {
            window.location.href =
              'https://apps.apple.com/us/app/%E5%8F%91%E5%8A%A8%E9%9B%86/id6443510654'
            return
          }
          window.location.href = 'https://www.pgyer.com/BhC3'
          return
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    text-align: center;
    &-logo {
      width: 240rpx;
      height: 240rpx;
      margin: 48rpx 0;
    }
    &-explain {
      width: 100%;
      &__one {
        width: 544rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        font-size: 32rpx;
        text-align: center;
        margin: 0 auto 16rpx;
      }
      &__two {
        width: 544rpx;
        height: 36rpx;
        line-height: 150%;
        font-size: 24rpx;
        text-align: center;
        color: $v-c0-45;
        margin: 0 auto 72rpx;
      }
      &__button {
        width: 646rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: $v-bg-white;
        background: $color-primary-yellow;
        margin: 0 auto;
      }
    }
    &-footer {
      position: fixed;
      left: calc(50% - 298rpx / 2);
      bottom: 112rpx;
      font-size: 24rpx;
      &__word {
        color: $v-c0-65;
      }
      &__num {
        color: $v-tip;
      }
    }
  }
</style>
