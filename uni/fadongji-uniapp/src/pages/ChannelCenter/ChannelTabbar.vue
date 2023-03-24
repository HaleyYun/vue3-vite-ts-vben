<template>
  <view>
    <view class="agent flex">
      <ChannelTabbarHome v-show="tabbarVal === 0" class="flex1" />
      <ChannelTabbarWorkbench v-show="tabbarVal === 1" class="flex1" />
      <ChannelTabbarIm v-show="tabbarVal === 2" ref="tabbarRef2" :tabbar-val="3" class="flex1" />
      <ChannelTabbarUser v-show="tabbarVal === 3" ref="tabbarUserRef" class="flex1" />
      <VoTabbar :defaultActive="tabbarVal" :tabbarList="tabbarList" @changeFn="changeTabbarFn" />
      <view class="safearea-box" />
    </view>
    <VoVersionUpdate />
  </view>
</template>
<script>
  import ChannelTabbarWorkbench from './components/ChannelTabbar/ChannelTabbarWorkbench'
  import ChannelTabbarHome from './components/ChannelTabbar/ChannelTabbarHome'
  import ChannelTabbarIm from './components/ChannelTabbar/ChannelTabbarIm'
  import ChannelTabbarUser from './components/ChannelTabbar/ChannelTabbarUser'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'

  export default {
    name: 'ChannelTabbar',
    components: {
      ChannelTabbarHome,
      ChannelTabbarWorkbench,
      ChannelTabbarIm,
      ChannelTabbarUser,
    },
    data() {
      return {
        tabbarVal: 0,
        tabbarList: [
          {
            name: '首页',
            unActiveImg: 'icon-home',
            activeImg: 'icon-home-fill',
          },
          {
            name: '工作台',
            unActiveImg: 'workbench',
            activeImg: 'workbench-fill',
          },
          {
            name: '消息',
            unActiveImg: 'instant-messaging',
            activeImg: 'instant-messaging-fill',
          },
          {
            name: '我的',
            unActiveImg: 'my-new',
            activeImg: 'my-new-fill',
          },
        ],
      }
    },
    methods: {
      /**
       * 切换身份
       */
      changeIdentity(identity) {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          terminalSource: helpUtil.appSource(),
          refreshToken,
          roleCode: identity,
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
        }
        showLoading('切换中')
        this.$VoHttp
          .switchRole(param, { noPrefix: true })
          .then((res) => {
            uni.$u.toast('切换成功')
            store.dispatch('user/setUseInfo', res.data)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      changeTabbarFn(index) {
        this.tabbarVal = index
        // #ifdef H5
        let location = window.location.href
        if (location.indexOf('tabbarVal') === -1) {
          window.location.href = location + '?tabbarVal=' + this.tabbarVal
        } else {
          window.location.href = location.split('tabbar')[0] + 'tabbarVal=' + this.tabbarVal
        }
        // #endif
      },
    },
    onLoad(options) {
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
      }
      if (this.userInfo.roleCode !== 'channelManager') {
        this.changeIdentity('channelManager')
      }
      if (this.$storage.get('toIm')) {
        this.tabbarVal = 2
        this.$storage.remove('toIm')
      }
    },
    onShow() {
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
      console.log(this.tabbarVal)
      this.$VoHttp.apiCompanyInfoDetail().then((res) => {
        const result = res.data
        const resultObj = { ...this.userInfo, ...result }
        this.$store.dispatch('user/setUseInfoItem', resultObj)
      })
      if (this.tabbarVal === 4) {
        this.$refs.tabbarUserRef?.initInfo()
      }
      if (this.tabbarVal === 2) {
        this.$refs.tabbarRef2?.refreshData()
      } else {
        setTimeout(() => {
          console.log('更新Im数据')
          this.$refs.tabbarRef2?.refreshData()
        }, 1000)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .agent {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 130rpx;
    box-sizing: border-box;
    background-color: #ffffff;
  }
</style>
