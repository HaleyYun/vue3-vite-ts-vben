<template>
  <view class="title flex flex-vertical-c flex-justify-between">
    <image class="title-img" src="/static/supplier/home/slogan_garage.png" />
    <view class="flex flex-vertical-c">
      <view class="title-switch flex flex-vertical-c flex-justify-c">
        <VoTooltip
          :is-padding-top="false"
          :padding="8"
          class="fz-0"
          color="rgba(17, 17, 17)"
          placement="bottom-start"
        >
          <view slot="content" class="tooltip-box">
            <view
              v-for="(role, roleIndex) of myRoleArr"
              :key="roleIndex"
              class="tooltip-box__item"
              @click="switchRoleFn(role)"
            >
              {{ role.roleName }}
            </view>
            <view class="tooltip-box__item" @click="addRoleFn">新增角色</view>
          </view>
          <view
            :class="{
              'background-transparent': sliding === false,
              'background-gray': sliding === true,
            }"
            class="workbench-action__switch flex flex-vertical-c flex-justify-c"
          >
            <view class="switch-name">{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>
            <VoIcon :size="20" name="switch-to" />
          </view>
        </VoTooltip>
      </view>
      <view
        class="title-news m-r-10"
        @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
      >
        <VoIcon name="message-bell" />
        <VoBadge :value="count" class="title-news__badge" max="99" />
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import helpUtil, { showLoading, toRoleHome } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'

  export default {
    name: 'SupplierTitle',
    props: {
      sliding: {
        type: Boolean,
        default: false,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        value: 8,
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
        roleArrGet: 'role/roleArrGetter',
      }),
      myRoleArr: function () {
        if (this.userInfo && this.userInfo.roleCodeList) {
          return this.userInfo.roleCodeList.filter((item) => {
            return String(item.roleCode) !== String(this.userInfo.roleCode)
          })
        }
        return []
      },
    },

    methods: {
      goTo(val) {
        this.$linkToEasy(val)
      },
      switchRoleFn(role) {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          terminalSource: helpUtil.appSource(),
          refreshToken,
          roleCode: role.roleCode,
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
        }
        showLoading('切换中')
        this.$VoHttp
          .switchRole(param, { noPrefix: true })
          .then((res) => {
            uni.$u.toast('切换成功')
            store.dispatch('user/setUseInfo', res.data)
            setTimeout(() => {
              toRoleHome()
            }, 1000)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      addRoleFn() {
        const userName = this.userInfo.userName
        this.$store.dispatch('user/setUseInfo', {})
        this.$store.dispatch('im/closeIMCTX')
        uni.reLaunch({
          url: '/pages/CommonLogin/UserLogin?userName=' + userName,
        })
      },
      getRoleName(role, roleArr) {
        if (roleArr.length <= 0 || String(role) === '') return ''
        let findRole = roleArr.find((element) => element.roleCode === role)
        return findRole?.roleName || ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    width: 750rpx;
    height: 108rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    &-img {
      width: 354rpx;
      height: 92rpx;
      display: block;
    }
    .title-switch {
      width: 152rpx;
      height: 54rpx;
      border-radius: 38rpx;
      &__name {
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }
    .title-news {
      position: relative;
      width: 48rpx;
      height: 48rpx;
      margin-left: 24rpx !important;
      &__badge {
        position: absolute;
        top: -4rpx;
        right: -10rpx;
        display: inline-block;
      }
    }
  }
  .background-transparent {
    background: rgba(255, 255, 255, 0.45) !important;
    border: 2rpx solid #ffffff !important;
  }
  .background-gray {
    background: #f7f7f8 !important;
    border: 2rpx solid #f7f7f8 !important;
  }
  .tooltip-box {
    width: 208rpx;
    font-size: 28rpx;
    color: #ffffff;
    &__item {
      height: 98rpx;
      line-height: 98rpx;
      text-align: center;
      border-bottom: 2rpx solid #bfbfbf;
      &:last-child {
        border-bottom: 0rpx;
      }
    }
  }
  .workbench {
    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
      padding: 0 32rpx 20rpx;
      box-sizing: border-box;
      // #ifdef H5
      padding-top: 20rpx;
      // #endif
      &__box {
        width: 426rpx;
        height: 68rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
      }
      &__switch {
        width: 152rpx;
        height: 54rpx;
        border-radius: 38rpx;
        background: #f7f7f8;
        border: 2rpx solid #f7f7f8;
        margin-left: 24rpx;
        .switch-name {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }
      &__news {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        margin-left: 24rpx;
        .news-badge {
          position: absolute;
          top: -6rpx;
          right: -10rpx;
          display: inline-block;
        }
      }
    }
  }
</style>
