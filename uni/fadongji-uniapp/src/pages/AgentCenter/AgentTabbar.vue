<template>
  <view>
    <view :class="{ 'p-b-130': !showPopBool }" class="agent">
      <AgentTabbarHome
        v-if="tabbarVal === 0"
        ref="tabbarRef0"
        class="flex1"
        @toComplaint="toComplaint"
        @updateshowHandle="updateshowHandleFn"
      />
      <AgentTabbarStock
        v-if="tabbarVal === 1"
        ref="tabbarRef1"
        class="flex1"
        @updatepops="showPop"
      />
      <AgentTabbarCreate
        v-if="tabbarVal === 2"
        ref="tabbarRef2"
        :tabbarVal="tabbarVal"
        class="flex1"
        @showReport="showReport"
        @updatepops="showPop"
      />
      <AgentTabbarIm v-if="tabbarVal === 3" ref="tabbarRef3" :tabbarVal="tabbarVal" class="flex1" />
      <AgentTabbarUser v-if="tabbarVal === 4" ref="tabbarRef4" class="flex1" />
      <view v-if="other" class="other" @click="backToChannel">返回渠道经理</view>
      <VoTabbar
        :class="{ index: showPopBool }"
        :defaultActive="tabbarVal"
        :tabbarList="tabbarList"
        @changeFn="changeTabbarFn"
      />
      <view class="safearea-box" />
    </view>
    <!--  底部悬浮end  -->
    <VoComplaintAction ref="complaintRef" />
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

    <VoModal
      :show="showHandle"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      title="输入发动机识别码"
      @cancel="closeHandler"
      @close="closeHandler"
      @confirm="handleInputFn"
    >
      <view class="slot-content w-full">
        <EraForm
          ref="scanForm"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="content"
          >
            <u-input v-model.trim="formData.content" clearable />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
  </view>
</template>

<script>
  import AgentTabbar from '@/components/VoTabbar/VoTabbar'
  import AgentTabbarHome from './components/AgentTabbar/AgentTabbarHome'
  import AgentTabbarStock from './components/AgentTabbar/AgentTabbarStock'
  import AgentTabbarCreate from './components/AgentTabbar/AgentTabbarCreate'
  import AgentTabbarIm from './components/AgentTabbar/AgentTabbarIm'
  import AgentTabbarUser from './components/AgentTabbar/AgentTabbarUser/AgentTabbarUser'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'
  import { VoHttp } from "@/common/unifyGlobalReg";

  export default {
    name: 'AgentTabbar',
    components: {
      AgentTabbar,
      AgentTabbarHome,
      AgentTabbarStock,
      AgentTabbarCreate,
      AgentTabbarIm,
      AgentTabbarUser,
    },
    data() {
      return {
        showHandle: false,
        // 编辑内容
        formData: {
          content: '',
        },
        // 表单验证
        rules: {
          content: [
            {
              type: 'string',
              required: true,
              message: '请输入识别码',
              trigger: ['blur'],
            },
            {
              type: 'string',
              min: 4,
              required: true,
              message: '识别码长度不可少于4位',
              trigger: ['blur'],
            },
          ],
        },
        tabbarVal: 0,
        tabbarList: [
          {
            name: '工作台',
            unActiveImg: 'workbench',
            activeImg: 'workbench-fill',
          },
          {
            name: '统计',
            unActiveImg: 'statistics-new',
            activeImg: 'statistics-new-fill',
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
        other: null,
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
    methods: {
      async handleInputFn() {
        let res = await this.$refs.scanForm.validate()
        console.log(res)
        if (!res) return
        this.showHandle = false
        uni.$emit('handleInput', { content: this.formData.content })
      },
      closeHandler() {
        this.formData.content = ''
        this.showHandle = false
      },
      updateshowHandleFn(boo) {
        console.log(boo, 'updateshowHandle')
        this.formData.content = ''
        this.showHandle = boo
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
      /**
       * 投诉建议
       */
      toComplaint() {
        this.$refs.complaintRef.open()
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
        // #ifdef APP-PLUS
        if (!this.tabbarVal) {
          this.$nextTick(() => {
            this.$refs.tabbarRef0?.getOrderList()
          })
        }
        if (this.tabbarVal === 4) {
          this.$nextTick(() => {
            this.$refs.tabbarRef4?.initInfo()
          })
        }
        if (this.tabbarVal === 2) {
          this.$nextTick(() => {
            this.$refs.tabbarRef2?.refreshData()
          })
        }
        if (this.tabbarVal === 3) {
          this.$nextTick(() => {
            this.$refs.tabbarRef3?.refreshData()
          })
        }
        // #endif
        this.$storage.remove('searchCreate')
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
    },
    async onLoad(options) {
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
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
      }
      if (options.other) {
        await this.changeIdentity('agent')
        await this.$VoHttp.apiCompanyInfoDetail({}, { noLoading: true }).then((res) => {
          if (res && res.data) {
            const result = res.data
            const resultObj = { ...this.userInfo, ...result }
            this.$store.dispatch('user/setUseInfoItem', resultObj)
            this.$refs.tabbarRef0?.initFn()
            this.$refs.tabbarRef0?.reqMissMessageCount()
            this.$refs.tabbarRef0?.initHomeStatisticsData()
          }
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
        this.$refs.tabbarRef2.answerRefresh()
      })
    },

    onReachBottom() {
      this.$refs['tabbarRef' + this.tabbarVal].reachBottom()
    },
    onShow() {
      // if (this.$storage.get('other')) {
      //   this.$VoHttp.apiCompanyInfoDetail().then((res) => {
      //     const result=res.data
      //     const resultObj={...this.userInfo,...result}
      //     this.$store.dispatch('user/setUseInfoItem',resultObj)
      //   })
      // }

      if (+this.tabbarVal === 3) {
        this.$refs.tabbarRef3?.refreshData()
      }
      // 修复提现后返回到“我的”主界面账户可提现金额不刷新
      if (+this.tabbarVal === 4) {
        this.$refs.tabbarRef4?.initInfo()
      }
      setTimeout(() => {
        this.$refs.tabbarRef0?.refreshData()
      }, 1000)
      this.$storage.set('refreshIm', 0)
      if (this.tabbarVal !== 3) {
        setTimeout(() => {
          this.$refs.tabbarRef3?.refreshData()
        }, 1000)
      }
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
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
