<template>
  <view>
    <VoNav
      :right-width="256"
      :title="operationType === 1 ? '我的积分' : '用户等级'"
      is-fixed
      is-have-more
      isShadow
    >
      <template #operation>
        <VoIcon :opacity="0.65" color="#000" name="customer-service-new" @click="customerService" />
        <view class="fz-28 lh150 color-block-65 m-l-24 m-r-32" @click="toRules">规则</view>
      </template>
    </VoNav>
    <view class="flex flex-vertical-c bg-white p-t-20 p-b-20 p-l-32 p-r-32">
      <view class="fz-28 lh150 color-block-65">{{
        operationType === 1 ? '当前总积分：' : '当前等级为：'
      }}</view>
      <view v-if="operationType !== 1" class="integral-red fz-40 lh60 fz-b m-l-8">{{ level }}</view>
      <view v-if="operationType === 1" class="integral-red fz-40 lh60 fz-b m-r-8">{{
        score ? score : 0
      }}</view>
      <view v-if="operationType === 1" class="integral-red fz-28 m-r-8">积分</view>
    </view>
    <scroll-view
      class="flag-scroll"
      scroll-y="true"
      style="width: 100%; height: 100%"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <block v-for="(data, pos) in infoList">
        <view :key="pos">
          <view class="integral-holder"></view>
          <view class="bg-white p-l-32 p-r-32 p-t-24 p-b-24">
            <view class="flex flex-vertical-c flex-justify-between" @click="onShowItem(pos)">
              <view class="fz-32 lh150 color-block">{{ pos }}</view>
              <view class="flex flex-vertical-c">
                <block v-if="isOpenArr[getShowArr(pos)]">
                  <view class="fz-24 lh150 color-block-45">收起</view>
                  <VoIcon :opacity="0.45" :size="16" class="m-l-4" name="arrow-top-line" />
                </block>
                <block v-else>
                  <view class="fz-24 lh150 color-block-45">展开</view>
                  <VoIcon :opacity="0.45" :size="16" class="m-l-4" name="arrow-bottom-line" />
                </block>
              </view>
            </view>
          </view>
          <block v-if="isOpenArr[getShowArr(pos)]">
            <view v-if="getShowArr(pos) !== 0" class="integral-line" />
            <block v-for="(item, index) in data">
              <view
                :key="index"
                class="flex flex-vertical-c flex-justify-between bg-white p-t-24 p-b-24 p-l-32 p-r-32"
              >
                <view>
                  <view class="fz-28 lh150 color-block fz-b">{{ item.title }}</view>
                  <view class="fz-24 lh150 color-block-65 m-t-8">{{
                    $vocenApi.VoUtils.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')
                  }}</view>
                </view>
                <block v-if="item.isAdd === 0">
                  <view class="integral-text__red flex flex-vertical-c">
                    {{ '+' + item.score }}
                    <!--                    <view class="t">积分</view>-->
                  </view>
                </block>
                <block v-else>
                  <view class="integral-text__green flex flex-vertical-c">
                    {{ item.score }}
                    <!--                    <view class="t">积分</view>-->
                  </view>
                </block>
              </view>
              <view class="integral-place"></view>
            </block>
            <view class="integral-holder"></view>
          </block>
        </view>
      </block>
    </scroll-view>
    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  export default {
    name: 'MyIntegral',
    data() {
      return {
        userinfo: {},
        score: 0, //积分
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 999,
        operationType: 1,
        level: 'Lv 0',
        infoList: {},
        keys: [],
        isOpenArr: [true],
        adds: [],
        reduces: [],
        // myIntegralList: [
        //   {
        //     date: '2022年3月',
        //     isOpen: false,
        //     incomeNum: 800,
        //     expenditureNum: 200,
        //     detail: [
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: -20,
        //       },
        //     ],
        //   },
        //   {
        //     date: '2022年3月',
        //     isOpen: false,
        //     incomeNum: 800,
        //     expenditureNum: 200,
        //     detail: [
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: -20,
        //       },
        //     ],
        //   },
        //   {
        //     date: '2022年3月',
        //     isOpen: false,
        //     incomeNum: 800,
        //     expenditureNum: 200,
        //     detail: [
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: 20,
        //       },
        //       {
        //         head: '/static/garage/user/head1.png',
        //         orderNum: '订单-2021091299009000',
        //         orderTime: '2021-09-12 12:00:00',
        //         integralNum: -20,
        //       },
        //     ],
        //   },
        // ],
      }
    },
    onLoad(options) {
      console.log(options, 'onLoad')
      this.operationType = Number(options.operationType)
      if (options.level) {
        this.level = options.level
      }
      this.getData(true)
    },
    methods: {
      onShowItem(pos) {
        this.isOpenArr[this.getShowArr(pos)] = !this.isOpenArr[this.getShowArr(pos)]
        console.log(pos, this.isOpenArr[this.getShowArr(pos)])
        this.$forceUpdate()
      },
      getShowArr(pos) {
        let i = 0
        for (let item in this.infoList) {
          if (pos === item) {
            break
          }
          i++
        }
        return i
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getData()
        }, 2000)
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
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      customerService() {
        this.$refs.helpRef.open()
      },
      toRules() {
        this.$linkToEasy('/pagesGarage/UserCenter/MyIntegralRules')
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = {}
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          operationType: this.operationType,
          createStartTime: this.createStartTime,
          createEndTime: this.createEndTime,
          // userId: this.userinfo.id,
          // companyId: this.userinfo.companyId,
        }
        if (this.orderType) {
          params['orderType'] = this.orderType
        }
        if (this.orderProperty) {
          params['orderProperty'] = this.orderProperty
        }
        this.$VoHttp
          .apiGrantRecordList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.grantRecordDTO
              this.keys = this.keys.concat(Object.keys(data))
              this.keys.forEach((item) => {
                this.isOpenArr.push(false)
              })
              this.total = res.data.total
              this.infoList = data
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              this.score = res.data.score
              for (let item in this.infoList) {
                console.log(item, ' ==>> item')
              }
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .integral {
    &-red {
      color: #f20014;
    }
    &-holder {
      background: #f6f7f8;
      height: 16rpx;
    }
    &-line {
      margin-left: 32rpx;
      background: #f7f7f8;
      height: 2rpx;
    }
    &-head {
      height: 96rpx;
      width: 96rpx;
      border-radius: 8rpx;
    }
    &-text {
      font-weight: bold;
      line-height: 48rpx;
      &__red {
        color: #f20014;
        font-size: 32rpx;
        .t {
          font-size: 24rpx;
        }
      }
      &__green {
        color: #00b259;
        font-size: 32rpx;
        .t {
          font-size: 24rpx;
        }
      }
    }
    &-place {
      background: #f7f7f8;
      height: 2rpx;
      margin-left: 32rpx;
    }
  }
</style>
