<template>
  <view>
    <view :class="{ 'p-b-130': !showPopBool }" class="agent flex">
      <TabbarWorkbench v-if="tabbarVal === 0" ref="tabbarRef0" class="flex1" />
      <TabbarIm v-if="tabbarVal === 1" ref="tabbarRef1" :tabbarVal="tabbarVal" class="flex1" />
      <TabbarSearch v-if="tabbarVal === 2" ref="tabbarRef2" class="flex1" @updatepops="showPop" />
      <TabbarCreated
        v-if="tabbarVal === 3"
        ref="tabbarRef3"
        :tabbarVal="tabbarVal"
        class="flex1"
        @showReport="showReport"
      />
      <TabbarUser v-if="tabbarVal === 4" ref="tabbarUserRef" class="flex1" />

      <view v-if="other" class="other" @click="backToChannel">返回渠道经理</view>
      <VoTabbar
        :class="{ index: showPopBool }"
        :defaultActive="tabbarVal"
        :tabbarList="tabbarList"
        @changeFn="changeTabbarFn"
      />
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
  import TabbarWorkbench from '@/pages/GarageCenter/components/GarageTabbar/TabbarWorkbench'
  import TabbarIm from '@/pages/GarageCenter/components/GarageTabbar/TabbarIm'
  import TabbarSearch from '@/pages/GarageCenter/components/GarageTabbar/TabbarSearch'
  import TabbarCreated from '@/pages/GarageCenter/components/GarageTabbar/TabbarCreated'
  import TabbarUser from '@/pages/GarageCenter/components/GarageTabbar/TabbarUser'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'

  export default {
    name: 'GarageCenter',
    components: {
      TabbarUser,
      TabbarCreated,
      TabbarSearch,
      TabbarIm,
      TabbarWorkbench,
    },
    data() {
      return {
        tabbarVal: 0,
        tabbarList: [
          {
            // type:1,
            // unActiveImg: 'home-select',
            // activeImg: 'home-select',
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
            name: '找一找',
            unActiveImg: 'VIN-search-goods',
            activeImg: 'VIN-search-goods-fill',
          },
          {
            name: '汽修圈',
            unActiveImg: 'auto-repair',
            activeImg: 'auto-repair-fill',
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
        checkStatus: null,
      }
    },
    methods: {
      async checkGarageReplenishInfo() {
        if (this.checkStatus === 6) return
        const { code, data } = await this.$VoHttp.apiCompanyLegalInfo({}, { noLoading: true })
        if (+code === 20001) {
          this.checkStatus = data.checkStatus
          if (data.checkStatus === 6 && data.platformCode === 'garage') {
            // 执行跳转-进行补充信息
            uni.reLaunch({
              url: '/pages/CommonLogin/ReplenishInfo?phone=' + data.userName,
            })
          }
        }
      },
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
        // console.log('举报11')
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
      async backToChannel() {
        this.$storage.remove('other')
        await this.changeIdentity('channelManager')
        uni.$u.route({
          url: '/pages/ChannelCenter/ChannelTabbar',
          params: {
            tabbarVal: 0,
          },
        })
      },
      changeTabbarFn(index) {
        this.tabbarVal = index
        // #ifdef H5
        let location = window.location.href
        if (location.indexOf('origin') !== -1) {
          location = location.split('?')[0]
        }
        if (location.indexOf('tabbarVal') === -1) {
          window.location.href = location + '?tabbarVal=' + this.tabbarVal
        } else {
          window.location.href = location.split('tabbar')[0] + 'tabbarVal=' + this.tabbarVal
        }
        // #endif
        // #ifdef APP-PLUS
        if (this.tabbarVal === 4) {
          this.$nextTick(() => {
            this.$refs.tabbarUserRef?.initFn()
          })
        }
        if (this.tabbarVal === 3) {
          this.$nextTick(() => {
            this.$refs.tabbarRef3?.refreshData()
          })
        }
        if (this.tabbarVal === 1) {
          this.$nextTick(() => {
            this.$refs.tabbarRef1?.refreshData()
          })
        }
        if (this.tabbarVal === 2) {
          this.$nextTick(() => {
            this.$refs.tabbarRef2?.initPage()
          })
        }
        // #endif
        this.$storage.remove('searchCreate')
      },
    },
    async onLoad(options) {
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
      }
      if (options.other) {
        await this.changeIdentity('garage')
        await this.$VoHttp.apiCompanyInfoDetail().then((res) => {
          const result = res.data
          const resultObj = { ...this.userInfo, ...result }
          this.$store.dispatch('user/setUseInfoItem', resultObj)
          this.$refs.tabbarRef0?.initRoleFn()
          this.$refs.tabbarRef0?.reqMissMessageCount()
          this.$refs.tabbarRef0?.getOrderDataRequest()
          this.$refs.tabbarRef0?.getDockingPeopleRequest()
        })
        this.other = options.other
        this.$storage.set('other', 1)
      }
      if (this.$storage.get('other')) {
        this.other = 1
      }
      if (this.$storage.get('toIm')) {
        this.tabbarVal = 1
        this.$storage.remove('toIm')
      }
      uni.$off('answerRefresh')
      uni.$on('answerRefresh', (callback) => {
        this.$refs.tabbarRef3.answerRefresh()
      })
    },
    onShow() {
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
      this.$storage.remove('searchCreate')
      // 检测修理厂是否完善补充信息
      this.checkGarageReplenishInfo()
      console.log(this.tabbarVal, '----------------------------')
      this.$refs.tabbarRef2?.initPage()
      if (+this.tabbarVal === 0) {
        //首页刷新数据
        setTimeout(() => {
          this.$refs.tabbarRef0?.refreshData()

          this.$refs.tabbarRef0?.reqMissMessageCount()
        }, 1000)
      }
      // 修复提现后返回到“我的”主界面账户可提现金额不刷新
      if (+this.tabbarVal === 4) {
        this.$refs.tabbarUserRef?.initFn(true)
      }
      if (this.tabbarVal !== 1) {
        setTimeout(() => {
          this.$refs.tabbarRef1?.refreshData()
        }, 1000)
      }
    },
    //监听页面隐藏
    onHide() {
      this.$refs.tabbarRef2?.closeBlur()
    },
    //监听页面卸载
    onUnload() {
      this.$refs.tabbarRef2?.closeBlur()
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
    bottom: 20%;
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
