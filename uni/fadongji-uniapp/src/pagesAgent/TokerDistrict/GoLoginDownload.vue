<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="register"
  >
    <!--    <VoNav is-fixed isHaveMore title="发动集">-->
    <!--      <template #back>-->
    <!--        <VoIcon :opacity="0.45" color="#000000" name="close" />-->
    <!--      </template>-->
    <!--    </VoNav>-->
    <!--  logo模块：start  -->
    <image class="register-logo" src="/static/common/logo.png" />
    <!--  logo模块：end  -->
    <!--  中间说明模块：start  -->
    <view class="register-explain">
      <view class="register-explain__one">{{ title }}</view>
      <view class="register-explain__two">您可以点击下方链接下载APP</view>
      <view class="register-explain__button" @click="goDownload" v-if="phoneType===2">直接下载</view>
      <view class="register-explain__button" @click="goDownload" v-else-if="phoneType===1">去AppStore下载</view>
    </view>
    <!--    <view>{{ options }}</view>-->
    <!--  中间说明模块：end  -->
    <!--  底部固定模块：start  -->
    <image v-if="options.app" :src="img" class="register-img" />
    <view class="register-footer">
      <text class="register-footer__word">拨打电话：</text>
      <text class="register-footer__num" @click="$cellPhone('400-893-5518')">400-893-5518</text>
    </view>
    <!--  底部固定模块：end  -->


    <div id="showDownload" class="bg"  v-if="showTip">
      <img class="bg-text" src="/static/app/downloadText.png" >
    </div>
  </view>
</template>

<script>
  import { toast } from "@/common/helper";

  export default {
    name: 'GoLoginDownload',
    data() {
      return {
        showTip:false,
        phoneType:'', // 1是苹果  2是安卓
        img: require('@/static/agent/binding_footer.png'),
        title: '欢迎您注册成为发动集共创平台汽修商',
        options: '',
        roleArr: [],
        info: {}, // 下载app携带参数，预留字段
      }
    },
    async onLoad(options) {
      // this.roleArr = await this.$store.dispatch('role/getRoleArr')
      let u = navigator.userAgent
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      this.phoneType=isiOS?1:2
      if (options.data) {
        this.options = JSON.parse(options.data)
      }
      // this.title = '当前手机号已接受邀请，请直接登录'
      this.title = '您已注册成功，请下载APP登录'
      if (options.app) {
        this.options.app = +options.app
        // this.title = '欢迎您注册成为发动集共创平台汽修商'
        this.title = '您已注册成功，请下载APP登录'
      }
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
              // toast('请用默认浏览器打开当前页面','none')
              this.showTip=true
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
      margin: 72rpx 0;
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
        background: #ff5319;
        margin: 0 auto;
      }
    }
    &-img {
      position: fixed;
      bottom: 212rpx;
      width: 686rpx;
      height: 232rpx;
      left: 32rpx;
      right: 32rpx;
      border-radius: 8rpx;
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
  .bg {
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
  }
  .bg-text {
    position: fixed;
    right: 22px;
    top: 0;
    width: 280px;
    height: 160px;
  }
</style>
