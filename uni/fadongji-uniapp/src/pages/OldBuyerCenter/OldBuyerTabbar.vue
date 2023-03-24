<template>
  <view>
    <view class="agent">
      <OldBuyerHome
        v-if="tabbarVal === 0"
        ref="tabbarRef0"
        class="flex1"
        @hideBar="hideBar"
        @updatepops="showPop"
      />
      <OldBuyerCart v-if="tabbarVal === 1" ref="tabbarRef1" class="flex1" />
      <OldBuyerCreate
        v-if="tabbarVal === 2"
        ref="tabbarRef2"
        :tabbar-val="tabbarVal"
        class="flex1"
        @showReport="showReport"
        @updatepops="showPop"
      />
      <OldBuyerIm v-if="tabbarVal === 3" ref="tabbarRef3" :tabbar-val="tabbarVal" class="flex1" />
      <OldBuyerUser v-if="tabbarVal === 4" ref="tabbarRef4" class="flex1" />

      <VoTabbar
        :class="{ hideTab: hideTabBool, index: showPopBool }"
        :defaultActive="tabbarVal"
        :tabbarList="tabbarList"
        @changeFn="changeTabbarFn"
      />
      <!--    <view class="safearea-box" />-->
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
  import OldBuyerCart from './components/OldBuyerCart'
  import OldBuyerCreate from './components/OldBuyerCreate'
  import OldBuyerHome from './components/OldBuyerHome'
  import OldBuyerIm from './components/OldBuyerIm'
  import OldBuyerUser from './components/OldBuyerUser'

  export default {
    name: 'OldBuyerTabbar',
    components: {
      OldBuyerCart,
      OldBuyerCreate,
      OldBuyerHome,
      OldBuyerIm,
      OldBuyerUser,
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
            name: '购物车',
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
        showPopBool: false, // 筛选弹窗
        hideTabBool: false, // 隐藏tab
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
      hideBar(bool) {
        this.hideTabBool = bool
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
            this.$refs.tabbarRef4?.initInfo()
          })
        }
        if (this.tabbarVal === 2) {
          this.$nextTick(() => {
            this.$refs.tabbarRef2?.refreshData()
          })
        }
        if (!this.tabbarVal) {
          this.$nextTick(() => {
            this.$refs.tabbarRef0?.initInfo()
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
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(options) {
      if (options.tabbarVal) {
        this.tabbarVal = Number(options.tabbarVal)
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
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {
      this.$VoHttp.IM.apiImMessageListSelectNotReadNum({},{noLoading:true}).then((res) => {
        console.log(res);
        this.$store.dispatch('im/setNotReadNum', +res.data)
      })
      // this.$VoHttp.apiCompanyInfoDetail().then((res) => {
      //   const result = res.data
      //   const resultObj = { ...this.userInfo, ...result }
      //   this.$store.dispatch('user/setUseInfoItem', resultObj)
      // })
      if (this.tabbarVal == 0 || !this.tabbarVal) {
        this.$refs.tabbarRef0?.initInfo()
      }
      // 修复提现后返回到“我的”主界面账户可提现金额不刷新
      if (+this.tabbarVal === 4) {
        this.$refs.tabbarRef4?.initInfo()
      }
      if (this.tabbarVal == 1) {
        this.$refs.tabbarRef1?.refreshData()
      }
      this.$store.dispatch('user/getFullUserInfo')
      if (this.tabbarVal !== 3) {
        setTimeout(() => {
          console.log('更新Im数据')
          this.$refs.tabbarRef3?.refreshData()
        }, 1000)
      }
    },
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
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

  .hideTab {
    z-index: -1;
  }

  .p-b-130 {
    padding-bottom: 130rpx;
  }
</style>
