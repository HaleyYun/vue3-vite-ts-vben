<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="orderList flex flex-column"
  >
    <!--    <VoNav :is-fixed="false" :leftWidth="60" title="服务订单" />-->
    <view :class="scrollTop > 10 ? 'fixed' : ''">
      <VoBatteryBar bg-color="transparent" />
      <view v-if="scrollTop < 10" class="orderList-title">服务订单</view>
      <EraTabs
        :current="current"
        :list="tabList"
        activeStyle="font-weight: bold;color: #FF5319;font-size:16px;"
        class="order-tab"
        inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size:14px;"
        line-color="#FF5319"
        @click="changeTabFn"
      />
    </view>
    <view v-if="scrollTop < 10" class="order-type flex">
      <view
        v-for="(item, index) in statusNavList"
        :key="item.value"
        :class="supportTypes.indexOf(item.value) > -1 ? 'act' : ''"
        class="order-type-btn"
        @click="changeStatus(item.value)"
      >
        {{ item.name }}
      </view>
    </view>
    <swiper
      :autoplay="false"
      :current="current"
      class="swiper flex1 p-b-130 m-b-130"
      @change="changeSwiperFn"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <scroll-view
          :refresher-threshold="30"
          :refresher-triggered="triggered"
          class="scroll-list flex1"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          scroll-y="true"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <block v-if="orderList.length">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :info="item"
              :locationInfo="LocationInfo"
              @helpAction="operationFn"
              @refresh="getData(1)"
              @success="success"
            />
            <VoLoadingText :has-more="orderList.length < total" :loading="loading" />
          </block>
          <VoNoData v-if="!orderList.length && !refresh" no-data-tips="暂无数据" />
          <view class="placeholder" />
          <vo-safety-area />
        </scroll-view>
      </swiper-item>
    </swiper>
    <VoHelpAction ref="helpRef" />
    <!--  底部悬浮start  -->
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>
<script>
  import OrderItem from './OrderComponents/OrderItem'
  import store from '@/store'
  import { mapGetters } from 'vuex'
  import { getLocation } from '@/common/helper'

  export default {
    name: 'EngineerOrder',
    components: {
      OrderItem,
    },
    data() {
      return {
        current: 0,
        //服务单类型,31:售后回收单 32:安装单 33:回收单
        statusNavList: [
          {
            name: '安装',
            value: 32,
          },
          {
            name: '回收',
            value: 33,
          },
          {
            name: '售后',
            value: 31,
          },
        ],
        // 当前选中状态
        orderStatus: 0, //订单状态,查全部时传0,1服务中,2已完成，9已取消，8已关闭
        supportTypes: [], //服务单类型,31:售后回收单 32:安装单 33:回收单
        tabList: [
          {
            name: '全部',
            value: 0,
          },
          {
            name: '服务中',
            value: 1,
          },
          {
            name: '已完成',
            value: 2,
          },
          {
            name: '已取消',
            value: 9,
          },
          {
            name: '已关闭',
            value: 8,
          },
        ],
        orderList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        currentUserFullInfo: {},
        showApprove: false, // 认证弹窗
        LocationInfo: null,
        timer: null,
        locationgTips: {
          message: '为更好的为您推送服务单，请尽快打开位置开关。',
          cancel: '再想想',
          confirm: '去打开',
        },
      }
    },
    // computed: {
    //   ...mapGetters('serviceNotification', ['getMissMessageCount']),
    //   ...mapGetters({
    //     locationInfo: 'mapDrag/getLocationInfo',
    //   }),
    // },
    // watch: {
    //   locationInfo: {
    //     deep: true,
    //     handler(newVal) {
    //       console.log(newVal, '更新了')
    //       this.LocationInfo = newVal
    //     },
    //   },
    // },
    created() {
      store.dispatch('user/getFullUserInfo').then((res) => {
        this.currentUserFullInfo = res
      })
    },
    async mounted() {
      await this.getData(true, 1)
    },
    methods: {
      clearTimer() {
        try {
          clearInterval(this.timer)
          this.timer = null
        } catch (e) {
          console.log(e)
        }
      },
      /**
       * 设置获取定位轮巡
       */
      setLocationTerval() {
        console.log(this.timer, 'this.timer')
        if (!this.timer) {
          this.timer = setInterval(() => {
            console.log('asd')
            getLocation(this.locationgTips)
              .then((res) => {
                this.$store.dispatch('mapDrag/setLocation', res)
                this.LocationInfo = res
                const { latitude, longitude } = res
                this.$VoHttp.apiOrderRecycleTechnologyMapLocation({ latitude, longitude })
              })
              .catch(() => {
                this.LocationInfo = null
              })
          }, 31000)
        }
      },
      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      /**
       * swiper滑动事件
       */
      changeSwiperFn(e) {
        this.current = e.detail.current
        this.orderStatus = this.tabList[this.current].value
        this.getData(true)
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.current = e.index
        // this.orderStatus = e.value
        // this.getData(true)
      },
      // 组件成功回调
      success() {
        // 拼参数走接口
      },
      // 切换状态
      changeStatus(val) {
        let inx = this.supportTypes.indexOf(val)
        if (inx > -1) {
          this.supportTypes.splice(inx, 1)
        } else {
          this.supportTypes.push(val)
        }
        this.getData(true)
      },
      /**
       * @description 点击右侧
       */
      operationFn() {
        this.$refs.helpRef.open()
      },
      //获取列表数据
      async getData(refresh, isLocation) {
        if (!this.LocationInfo && isLocation) {
          console.log(isLocation, 'isLocation')
          try {
            this.LocationInfo = await getLocation(this.locationgTips)
            if (this.LocationInfo) {
              if (!this.timer) {
                this.setLocationTerval()
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderStatus: this.orderStatus,
          supportTypes: this.supportTypes,
          longitude: this.LocationInfo ? this.LocationInfo.longitude : '', //距离筛选时必传
          latitude: this.LocationInfo ? this.LocationInfo.latitude : '', //距离筛选时必传
        }
        this.$VoHttp
          .apiOrderTechnicianQueryList(params)
          .then((res) => {
            if (res && res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                //组装时间段
                if (item.homeStartTime && item.homeEndTime) {
                  item.time =
                    this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                    '-' +
                    this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
                }
              })
              this.orderList.push(...data)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        if (this.orderList.length >= this.total) {
          // uni.$u.toast('没有更多了')
          return false
        }
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getData()
        }, 500)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        console.log(e, '*************')
        let that = this
        uni.$u.debounce(() => {
          that.scrollTop = e.detail.scrollTop
        }, 1000)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .orderList {
    width: 750rpx;
    height: 100vh;

    &-title {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background: #fff;
      color: rgba(0, 0, 0, 0.85);
      font-size: 36rpx;
      text-align: center;
      font-weight: 500;
    }

    .scroll-list {
      height: 100%;
      background: #f7f7f8;
    }

    .order-tab {
      background: #fff;
    }

    &.fixed {
      background: #fff;
      box-sizing: border-box;
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
    }

    .order-type {
      width: 100%;
      background: #fff;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;

      &-btn {
        width: 144rpx;
        height: 48rpx;
        background: #f7f7f8;
        border-radius: 200rpx;
        line-height: 48rpx;
        margin-right: 28rpx;
        border: 1px solid #f7f7f8;

        &.act {
          color: #ff5319;
          border-color: #ff5319;
          background: #ffece5;
        }
      }
    }
  }

  .placeholder {
    height: 130rpx;
  }

  //::v-deep .uni-scroll-view-content{
  //  width: 100vw;
  //  .u-tabs__wrapper__nav__item{
  //    width: 25vw;
  //    padding: 0;
  //  }
  //}
  .suspension {
    z-index: 99;
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 62rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    &__tips {
      font-size: 24rpx;
      color: #ffffff;
    }
    &__button {
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
      font-size: 24rpx;
      width: 130rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      &.bg {
        background: #ff9b05;
      }
    }
  }
</style>
