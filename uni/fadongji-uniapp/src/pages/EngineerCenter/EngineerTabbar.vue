<template>
  <view>
    <view :class="{ 'p-b-130': !showPopBool }" class="agent">
      <EngineerHome v-if="tabbarVal === 0" ref="tabbarRef0" class="flex1" @updatepops="showPop" />
      <EngineerOrder v-if="tabbarVal === 1" ref="tabbarRef1" class="flex1" />
      <EngineerCreate
        v-if="tabbarVal === 2"
        ref="tabbarRef2"
        :tabbar-val="tabbarVal"
        class="flex1"
        @showReport="showReport"
        @updatepops="showPop"
      />
      <EngineerIm v-if="tabbarVal === 3" ref="tabbarRef3" :tabbar-val="tabbarVal" class="flex1" />
      <EngineerUser v-if="tabbarVal === 4" ref="tabbarRef4" class="flex1" />

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
  import EngineerCreate from '@/pages/EngineerCenter/components/EngineerCreate'
  import EngineerHome from '@/pages/EngineerCenter/components/EngineerHome'
  import EngineerOrder from '@/pages/EngineerCenter/components/EngineerOrder'
  import EngineerIm from '@/pages/EngineerCenter/components/EngineerIm'
  import EngineerUser from '@/pages/EngineerCenter/components/EngineerUser'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'EngineerTabbar',
    components: {
      EngineerCreate,
      EngineerHome,
      EngineerOrder,
      EngineerIm,
      EngineerUser,
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
            name: '服务单',
            unActiveImg: 'service-order',
            activeImg: 'service-order-fill',
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
        timer: null,
        showPopBool: false,
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
    watch: {
      tabbarVal(val) {
        console.log('调用了1')
        if (val > 1) {
          this.$refs.tabbarRef0?.clearTimer()
          this.$refs.tabbarRef1?.clearTimer()
        }
      },
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
        if (!this.tabbarVal) {
          this.$nextTick(() => {
            this.$refs.tabbarRef0?.initInfo()
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
        if (this.tabbarVal === 1) {
          this.$refs.tabbarRef1?.getData(true)
        }
        // #endif
        this.$storage.remove('searchCreate')
      },
      /**
       * 设置获取定位轮巡
       */
      setLocationTerval() {
        console.log(this.timer, 'this.timer')
        if (!this.timer) {
          this.timer = setInterval(() => {
            console.log('asd')
            helpUtil.getLocation().then((res) => {
              this.$store.dispatch('mapDrag/setLocation', res)
              this.$refs.tabbarRef0?.getData(true)
              this.$refs.tabbarRef1?.getData(true)
            })
          }, 300000)
        }
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
      this.$VoHttp.apiCompanyInfoDetail().then((res) => {
        const result = res.data
        const resultObj = { ...this.userInfo, ...result }
        this.$store.dispatch('user/setUseInfoItem', resultObj)
      })
      if (!this.tabbarVal || this.tabbarVal == 0) {
        this.$refs.tabbarRef0?.init()
      }
      if (this.tabbarVal === 1) {
        this.$refs.tabbarRef1?.getData(true)
      }
      if (this.tabbarVal == 4) {
        this.$refs.tabbarRef4?.initInfo()
      }
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
    onHide() {
      this.$refs.tabbarRef0?.clearTimer()
      this.$refs.tabbarRef1?.clearTimer()
    },
    //监听页面卸载
    onUnload() {
      this.$refs.tabbarRef0?.clearTimer()
      this.$refs.tabbarRef1?.clearTimer()
    },
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

  .p-b-130 {
    padding-bottom: 130rpx;
  }
</style>
