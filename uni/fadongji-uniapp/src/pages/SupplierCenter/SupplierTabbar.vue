<template>
  <view>
    <view :class="{ 'p-b-130': !showPopBool }" class="agent">
      <TabbarWorkbench v-if="tabbarVal === 0" ref="tabbarWorkbench" class="flex1" />
      <TabbarSellGood v-if="tabbarVal === 1" class="flex1" />
      <TabbarCreated
        v-if="tabbarVal === 2"
        ref="tabbarCreated"
        :tabbarVal="tabbarVal"
        class="flex1"
        @showReport="showReport"
        @updatepops="showPop"
      />
      <TabbarIm v-if="tabbarVal === 3" ref="TabbarIm" :tabbarVal="tabbarVal" class="flex1" />
      <TabbarUser v-if="tabbarVal === 4" ref="tabbarUserRef" class="flex1" />
      <VoTabbar
        :class="{ index: showPopBool }"
        :defaultActive="tabbarVal"
        :tabbarList="tabbarList"
        @changeFn="changeTabbarFn"
      />
      <view v-if="other" class="other" @click="backToLease">返回招商经理</view>
      <view class="safearea-box" />
    </view>
    <!-- 举报弹层 -->

    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="showAction = false"
      @select="actionSelect"
    />
    <VoVersionUpdate />
  </view>
</template>

<script>
  import TabbarUser from './components/SupplierTabbar/TabbarUser'
  import TabbarIm from './components/SupplierTabbar/TabbarIm'
  import TabbarCreated from './components/SupplierTabbar/TabbarCreated'
  import TabbarSellGood from './components/SupplierTabbar/TabbarSellGood'
  import TabbarWorkbench from './components/SupplierTabbar/TabbarWorkbench'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'

  export default {
    name: 'SupplierTabbar',
    components: {
      TabbarWorkbench,
      TabbarSellGood,
      TabbarCreated,
      TabbarIm,
      TabbarUser,
    },
    data() {
      return {
        updateVisible: true,
        tabbarVal: 0,
        tabbarList: [
          {
            name: '工作台',
            unActiveImg: 'workbench',
            activeImg: 'workbench-fill',
          },
          {
            name: '多卖货',
            unActiveImg: 'more-sell-goods',
            activeImg: 'more-sell-goods-fill',
          },
          {
            name: '汽修圈',
            unActiveImg: 'auto-repair',
            activeImg: 'auto-repair-fill',
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
        other: 0,
        showPopBool: false, // 筛选弹窗
        reportData: '',
        showAction: false,
        actions: [
          {
            name: '举报作者',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },

          {
            name: '举报内容',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },

          {
            name: '拉黑用户',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },
        ],
      }
    },
    computed: {},
    methods: {
      //举报弹层选择
      actionSelect(e) {
        console.log(e.name)

        if (e.name === '举报作者') {
          showLoading()

          setTimeout(() => {
            hideLoading()

            this.$u.toast('举报成功')
          }, 1500)

          return
        }

        if (e.name === '拉黑用户') {
          showLoading()

          setTimeout(() => {
            hideLoading()

            this.$u.toast('拉黑成功')
          }, 1000)

          return
        }

        if (e.name === '举报内容') {
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=' +
              JSON.stringify(this.reportData),
          )

          return
        }
      },
      //举报

      showReport(obj) {
        console.log('举报11')
        this.$emit('showReport', obj)
        this.reportData = obj
        this.showAction = true
      },
      /**
       * 打开筛选弹窗
       * @param bool
       */
      showPop(bool) {
        console.log(bool)
        this.showPopBool = bool
      },
      changeTabbarFn(index) {
        console.log(this.tabbarVal)
        this.tabbarVal = index
        // #ifdef H5
        let location = window.location.href
        if (location.indexOf('tabbarVal') === -1) {
          window.location.href = location + '?tabbarVal=' + this.tabbarVal
        } else {
          window.location.href = location.split('tabbar')[0] + 'tabbarVal=' + this.tabbarVal
        }
        // #endif
        // #ifdef APP-PLUS
        if (this.tabbarVal === 4) {
          this.$nextTick(() => {
            this.$refs.tabbarUserRef?.initInfo()
          })
        }
        if (this.tabbarVal === 2) {
          this.$nextTick(() => {
            this.$refs.tabbarCreated?.refreshData()
          })
        }
        if (this.tabbarVal === 3) {
          this.$nextTick(() => {
            this.$refs.TabbarIm?.refreshData()
          })
        }
        // #endif
        this.$storage.remove('searchCreate')
      },
      async backToLease() {
        this.$storage.remove('other')
        await this.changeIdentity('investmentManager')
        uni.$u.route({
          url: '/pages/LeaseCenter/LeaseTabbar',
          params: {
            tabbarVal: 0,
          },
        })
      },
      /**
       * 切换身份
       */
      async changeIdentity(identity) {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          terminalSource: helpUtil.appSource(),
          refreshToken,
          roleCode: identity,
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
        }
        showLoading('切换中')
        await this.$VoHttp
          .switchRole(param, { noPrefix: true })
          .then((res) => {
            if (!res || !res.data) return
            uni.$u.toast('切换成功')
            store.dispatch('user/setUseInfo', res.data)
          })
          .catch((e) => {
            console.log(e)
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
    },
    async onLoad(options) {
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
      }
      if (options.other) {
        await this.changeIdentity('supplier')
        await this.$VoHttp.apiCompanyInfoDetail().then((res) => {
          const result = res.data
          const resultObj = { ...this.userInfo, ...result }
          this.$store.dispatch('user/setUseInfoItem', resultObj)
          this.$refs.tabbarWorkbench?.initRoleFn()
          this.$refs.tabbarWorkbench?.getBannerList()
          this.$refs.tabbarWorkbench?.reqMissMessageCount()
          this.$refs.tabbarWorkbench?.getOrderDataRequest()
          this.$refs.tabbarWorkbench?.getStaticData()
        })
        this.other = options.other
        this.$storage.set('other', 1)
      }
      if (this.$storage.get('other')) {
        this.other = 1
      }
      if (this.$storage.get('toIm')) {
        this.tabbarVal = 3
        this.$storage.remove('toIm')
      }
      uni.$off('answerRefresh')
      uni.$on('answerRefresh', (callback) => {
        this.$refs.tabbarCreated.answerRefresh()
      })
    },
    onShow() {
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
      // 修复提现后返回到“我的”主界面账户可提现金额不刷新
      if (this.tabbarVal === 4) {
        this.$refs.tabbarUserRef?.initInfo()
      }
      setTimeout(() => {
        this.$refs.tabbarWorkbench?.getOrderDataRequest()
      }, 1000)

      if (this.tabbarVal !== 3) {
        setTimeout(() => {
          console.log('更新Im数据')
          this.$refs.TabbarIm?.refreshData()
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
    //padding-bottom: 130rpx;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .index {
    z-index: 0;
  }

  .other {
    position: fixed;
    z-index: 10;
    right: 0;
    bottom: 15%;
    padding: 12rpx 16rpx;
    font-size: 26rpx;
    color: #fff;
    background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
    border-radius: 100rpx 0px 0px 100rpx;
  }

  .p-b-130 {
    padding-bottom: 130rpx;
  }
</style>
