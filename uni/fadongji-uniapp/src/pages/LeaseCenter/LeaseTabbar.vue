<template>
  <view>
    <view class="agent flex">
      <LeaseTabbarHome v-if="tabbarVal === 0" ref="tabbarRef0" class="flex1" />
      <LeaseTabbarWorkbench v-if="tabbarVal === 1" ref="tabbarRef1" class="flex1" />
      <LeaseTabbarIm v-if="tabbarVal === 2" ref="tabbarRef3" :tabbarVal="3" class="flex1" />
      <LeaseTabbarUser v-if="tabbarVal === 3" ref="tabbarRef4" class="flex1" />

      <VoTabbar :defaultActive="tabbarVal" :tabbarList="tabbarList" @changeFn="changeTabbarFn" />
      <view class="safearea-box" />
    </view>
    <VoVersionUpdate />
  </view>
</template>

<script>
  import LeaseTabbarHome from './components/LeaseTabbar/LeaseTabbarHome'
  import LeaseTabbarWorkbench from './components/LeaseTabbar/LeaseTabbarWorkbench'
  import LeaseTabbarIm from './components/LeaseTabbar/LeaseTabbarIm'
  import LeaseTabbarUser from './components/LeaseTabbar/LeaseTabbarUser'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'

  export default {
    name: 'LeaseTabbar',
    components: {
      LeaseTabbarHome,
      LeaseTabbarWorkbench,
      LeaseTabbarIm,
      LeaseTabbarUser,
    },
    data() {
      return {
        tabbarVal: 0,
        tabbarList: [
          {
            name: '首页',
            unActiveImg: 'take-stroll',
            activeImg: 'take-stroll-fill',
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
      // #ifdef APP-PLUS
      plus.device.getInfo({
        success: function (e) {
          //这里获取到imei 剩下的逻辑也写在这里面
          var imei = e.imei
          //里面写接下来的逻辑
          console.log('imei=' + imei, 'eeee', e) //这里是能获取imei的
        },
      })
      // #endif
      if (this.userInfo.roleCode !== 'investmentManager') {
        this.changeIdentity('investmentManager')
      }
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
      }
      if (this.$storage.get('toIm')) {
        this.tabbarVal = 2
        this.$storage.remove('toIm')
      }
    },
    onReachBottom() {
      this.$refs['tabbarRef' + this.tabbarVal]?.reachBottom()
    },
    onShow() {
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
      console.log(this.tabbarVal)
      this.$VoHttp.apiCompanyInfoDetail().then((res) => {
        console.log(res)
        const result = res.data
        const resultObj = { ...this.userInfo, ...result }
        this.$store.dispatch('user/setUseInfoItem', resultObj)
      })
      if (this.tabbarVal === 3) {
        this.$refs?.tabbarRef4.initInfo()
      }
      if (this.tabbarVal === 2) {
        this.$refs.tabbarRef3?.refreshData()
      } else {
        setTimeout(() => {
          console.log('更新Im数据')
          this.$refs.tabbarRef3?.refreshData()
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
