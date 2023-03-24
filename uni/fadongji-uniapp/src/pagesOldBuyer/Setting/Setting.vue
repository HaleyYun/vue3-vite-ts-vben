<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="setting flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="设置" />
      <view class="setting-content flex1 overflow-y">
        <EraCell
          :title="setPassword"
          isLink
          rightIcon="right-arrow"
          url="/pages/CommonLogin/PwdChange?isChange=1"
        />

        <EraCell title="修改手机号" @click.native="changeMobileClick">
          <view slot="value">
            <view class="flex flex-justify-between">
              <view class="setting-content__right"> {{ userInfo.userName }}</view>
              <VoIcon :size="24" color="#BFBFBF" name="right-arrow" />
            </view>
          </view>
        </EraCell>

        <view class="setting-content__line" />

        <template v-if="userInfo.roleCode === 'supplier'">
          <EraCell isLink title="发货地址" url="/pagesSupplier/Setting/AddressHome" />
        </template>
        <template v-else>
          <EraCell isLink title="收货地址" url="/pagesSupplier/Setting/AddressHome" />
        </template>
        <EraCell :border="false" title="语音播报">
          <view slot="value">
            <EraSwitch
              v-model="switchValue"
              activeColor="#22284B"
              inactiveColor="rgba(24, 34, 65, 0.25)"
              size="26"
              @click="changeSelecte"
            />
          </view>
        </EraCell>

        <view class="setting-content__line" />

        <EraCell title="用户协议" @click.native="pushWebClick('1')" />
        <EraCell :border="false" title="隐私政策" @click.native="pushWebClick('2')" />

        <view class="setting-content__line" />
        <!--        <EraCell :border="false" title="支持与保护" @click.native="pushWebClick('3')" />-->
        <EraCell title="清除缓存" @click.native="cleanCacheClick">
          <view slot="value">
            <view class="setting-content__right">{{ cacheString }}</view>
          </view>
        </EraCell>
        <EraCell title="当前版本">
          <view slot="value">
            <view class="setting-content__right">{{ versionFn() }}</view>
          </view>
        </EraCell>
        <view class="setting-content__line" />
        <EraCell :border="false" isLink title="关于我们" url="/pagesSupplier/Setting/AboutUS" />
        <EraCell
          :border="false"
          isLink
          title="注销供应商"
          url="/pagesSupplier/Setting/LogoutSupplier"
        />
        <EraCell title="当前环境">
          <view slot="value">
            <view class="setting-content__right">{{ devConf.apiBaseUrl }}</view>
          </view>
        </EraCell>
      </view>
      <view class="setting-bottom p-b-safe-area">
        <view class="setting-bottom__quit" @click="quitClick">退出登录</view>
      </view>
    </view>
    <VoModal
      :show="cacheShow"
      confirmColor="#22284B"
      content="是否清除缓存？"
      showCancelButton
      @cancel="cancel"
      @confirm="confirm"
    />
    <VoModal
      :show="quitShow"
      confirmColor="#22284B"
      content="确认退出登录吗？"
      showCancelButton
      @cancel="cancel"
      @confirm="confirmQuit"
    />
  </view>
</template>

<script>
  import VoModal from '@/components/VoModal/VoModal'
  import helper from '@/common/helper'
  import devConf from '@/common/env'
  import { storage } from '@/common/unifyGlobalReg'
  import { androidEnvVersion, iosEnvVersion } from '@/common/envVersion'

  export default {
    components: { VoModal },
    data() {
      return {
        setPassword: '修改密码',
        devConf: devConf,
        cacheShow: false,
        quitShow: false,
        switchValue: '',
        switchSelecte: true,
        cacheString: '100M',
        version: 'V1.0.1',
        currentUserFullInfo: {},
      }
    },
    onLoad() {
      console.log(storage.get('userInfo'))
      this.currentUserFullInfo = storage.get('userInfo')
    },
    methods: {
      versionFn() {
        let platform = uni.getSystemInfoSync().platform
        if (platform == 'android') {
          return 'V' + androidEnvVersion
        } else if (platform == 'ios') {
          return 'V' + iosEnvVersion
        }
      },
      changeSelecte() {
        this.switchSelecte = !this.switchSelecte
      },
      //清除缓存
      cleanCacheClick() {
        this.cacheShow = true
      },
      /**
       * 修改手机号
       */
      changeMobileClick() {
        this.$linkToEasy('/pagesSupplier/Setting/ChangeMobile')
      },
      /**
       *
       * @param e 1.用户协议 2.隐私政策 3.支持与保护
       */
      pushWebClick(e) {
        let title
        if (e === '1') {
          title = '用户协议'
          // #ifdef H5
          this.$linkToEasy('/pages/CommonWeb/UserPolicy?show=1')
          // #endif
          // #ifndef H5
          this.$linkToWebView(devConf.shareBaseUrl + '/pages/CommonWeb/UserPolicy')
          // #endif
          return
        }

        if (e === '2') {
          title = '隐私政策'
          // #ifdef H5
          this.$linkToEasy('/pages/CommonWeb/PrivacyPolicy?show=1')
          // #endif
          // #ifndef H5
          this.$linkToWebView(devConf.shareBaseUrl + '/pages/CommonWeb/PrivacyPolicy')
          // #endif
          return
        }

        if (e === '3') {
          title = '支持与保护'
          // #ifdef H5
          this.$linkToEasy('/pages/CommonWeb/PrivacyPolicy?show=1')
          // #endif
          // #ifndef H5
          this.$linkToWebView(devConf.shareBaseUrl + '/pages/CommonWeb/PrivacyPolicy')
          // #endif
          return
        }
      },
      //退出登录
      quitClick() {
        this.quitShow = true
      },
      confirm() {
        try {
          uni.clearStorageSync()
        } catch (e) {
          // error
        }
        this.cacheString = '0M'
        this.cancel()
        this.$u.toast('清除缓存成功！')
      },
      confirmQuit() {
        this.cancel()
        helper.showLoading()
        const roleCode = this.userInfo.platformCode
        this.$VoHttp
          .logoff({}, { noPrefix: true })
          .then((res) => {
            this.vocenPluginJPushModule()
            this.$store.dispatch('user/setUseInfo', {})
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
              })
            }, 1500)
            uni.$u.toast('退出成功')
          })
          .catch((e) => {
            this.$store.dispatch('user/setUseInfo', {})
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
              })
            }, 1500)
            uni.$u.toast('退出成功')
          })
          .finally(() => {
            helper.hideLoading()
          })
      },
      cancel() {
        this.cacheShow = false
        this.quitShow = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .setting {
    width: 750rpx;
    height: 100vh;
    //padding-bottom: 132rpx;

    &-content {
      margin-top: 16rpx;
      //background-color: #ffffff;

      &__right {
        color: $v-c0-65;
        padding-right: 8rpx;
        font-size: 32rpx;
      }

      &__line {
        height: 16rpx;
        width: 100%;
        background-color: #f8f8f8;
      }
    }

    &-bottom {
      //position: fixed;
      //left: 0rpx;
      //bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__quit {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
