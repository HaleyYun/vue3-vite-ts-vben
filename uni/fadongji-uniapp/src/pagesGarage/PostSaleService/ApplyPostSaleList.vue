<template>
  <view class="page" @click="closeFn">
    <vo-qi-mo-customer ref="qiMoRef" :is-platform="2" :show-phone="false"></vo-qi-mo-customer>

    <view class="header">
      <VoNav :is-fixed="false" is-have-more title="售后专区" />
      <view class="tab">
        <view>
          <EraTabs
            :current="currentTab"
            :lineBottom="0"
            :list="list1"
            activeStyle="font-weight: bold;color: #FF5319;font-size: 16px"
            inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 14px"
            line-color="#FF5319"
            @click="tabTap"
          />
        </view>
        <view class="flex flex-vertical-c" @click="overlayShow = true">
          <view class="line-holder m-r-16"></view>
          <text class="fz-26 color-block lh150 m-r-4">筛选</text>
          <VoIcon :opacity="0.45" :size="20" class="vo_icon" color="#000" name="select" />
          <u-badge
            v-if="currentFilterIndex"
            :offset="[8, -8]"
            absolute
            bgColor="#F20014"
            max="99"
            value="1"
          />
        </view>
      </view>
    </view>
    <view class="content">
      <swiper :autoplay="false" :current="currentTab" class="swiper" @change="changeSwiper">
        <block v-for="(value, key) in list1">
          <swiper-item :key="key">
            <scroll-view
              :refresher-threshold="10"
              :refresher-triggered="triggered"
              :scroll-y="true"
              class="order-scroll flex1"
              refresher-background="#F7F7F8"
              refresher-default-style="none"
              refresher-enabled="true"
              scroll-top="0"
              @refresherabort="onAbort"
              @refresherpulling="onPulling"
              @refresherrefresh="onRefresh"
              @refresherrestore="onRestore"
              @scroll="onScroll"
              @scrolltolower="scrolltolower"
            >
              <!-- 下拉刷新组件 -->
              <VoListFresh :show="loadingStatus" />
              <block v-if="dataList && dataList.length">
                <ApplyPostSaleItem
                  v-for="(item, index) in dataList"
                  :key="index"
                  :dataItem="item"
                  @cancel="cancelModel"
                />
                <vo-loading-text :has-more="dataList.length < total" :loading="isLoading" />
              </block>
              <VoNoData v-else-if="isOverLoading" no-data-tips="暂无数据" />
            </scroll-view>
          </swiper-item>
        </block>
      </swiper>
      <u-modal
        :show="sureCancel"
        cancel-text="取消"
        confirm-text="确定"
        confirmColor="#22284B"
        show-cancel-button
        @cancel="cancelFn"
        @confirm="confirmHandler"
      >
        <view class="info-content">确定取消售后申请吗？</view>
      </u-modal>
      <u-overlay :show="overlayShow">
        <view class="u-overlay">
          <view class="header">
            <VoNav :is-fixed="false" is-have-more title="售后专区" />
            <view class="tab">
              <view>
                <EraTabs
                  :current="currentTab"
                  :list="list1"
                  activeStyle="font-weight: bold;color: #FF5319;font-size: 16px"
                  inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 14px"
                  line-color="#FF5319"
                  @click="tabTap"
                />
              </view>
              <view @click="overlayShow = false">
                <text>筛选</text>
                <VoIcon class="vo_icon" color="#8C8C8C" name="select" size="16" />
                <u-badge v-if="currentFilterIndex" :offset="[-5, -5]" absolute max="99" value="1" />
              </view>
            </view>
          </view>
          <view class="overly_content">
            <view class="overly_title">发起售后时间</view>
            <view class="overly_btns">
              <view
                v-for="(item, index) in searchEnum"
                :key="index"
                :class="{ isActive: index === currentFilterIndex }"
                class="content_item"
                @click="tapFilterItem(index)"
                >{{ item }}</view
              >
            </view>
          </view>
          <view class="overly_btm">
            <view
              ><u-button class="custom-style" shape="circle" text="重置" @click="resetOverlay"
            /></view>
            <view
              ><u-button
                class="custom-style"
                color="#FF5319"
                shape="circle"
                text="筛选"
                @click="setTime"
            /></view>
          </view>
        </view>
      </u-overlay>
    </view>
  </view>
</template>

<script>
  import ApplyPostSaleItem from './components/ApplyPostSaleItem.vue'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'

  export default {
    components: {
      ApplyPostSaleItem,
      VoDragButton,
    },
    data() {
      return {
        isOverLoading: false,
        id: '',

        sureCancel: false,
        overlayShow: false,
        isLowerRefresh: true,
        currentFilterIndex: '',
        currentTab: 0,
        dataList: [],
        timer: null,
        list1: [
          {
            name: '处理中',
            value: 'handle',
            index: '0',
          },
          {
            name: '售后评价',
            value: 'comment',
            index: '1',
          },
          {
            name: '申请记录',
            value: '',
            index: '2',
          },
        ],
        search: {
          pageNo: 1,
          pageSize: 10,
          searchWord: '',
          orderStatus: 'handle', //	处理中 handle  评价 comment ,其余不传
          orderStartTime: '',
          orderEndTime: '',
        },
        statusEnum: {
          0: 'handle',
          1: 'comment',
          2: '',
        },
        searchEnum: {
          all: '全部',
          '1m': '1个月内',
          '3m': '1-3个月内',
          '6m': '半年以内',
          '12m': '一年以内',
          other: '一年以上',
        },
        optionsOrigin: '',
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        isLoading: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
      }
    },
    onShow() {
      if (this.optionsOrigin === 'voice') {
        //万能喊返回的数据
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        console.log(dataVoice)
        if (dataVoice.records && dataVoice.records.records && dataVoice.records.records.length) {
          console.log('dataVoice', dataVoice.records.records)
          this.dataList = dataVoice.records.records
        } else {
          this.resetReqList()
        }
      } else {
        this.resetReqList()
      }
    },
    onLoad(options) {
      this.optionsOrigin = options.origin || ''
    },
    watch: {
      currentTab: {
        handler(val) {
          this.resetReqList()
        },
      },
    },
    mounted() {
      this.getOrderStatusEnum()
    },
    methods: {
      closeFn() {
        this.$refs.qiMoRef?.close()
      },
      cancelModel(val) {
        console.log(val)
        this.sureCancel = true
        this.id = val
      },
      cancelFn() {
        this.sureCancel = false
      },
      async confirmHandler() {
        try {
          const res = await this.$VoHttp.apiOrderAfterSaleCancel({
            req: { orderId: this.id, cancelReason: '...' },
          })
          if (res.success) {
            uni.$u.toast(res.message)
            this.sureCancel = false
            this.resetReqList()
          }
        } catch (err) {
          uni.$u.toast(err.message)
        } finally {
          this.sureCancel = false
        }
      },
      changeSwiper(val) {
        this.currentTab = val.detail.current
        console.log(val)
      },
      tabTap(val) {
        this.currentTab = val.index
      },
      resetReqList() {
        this.dataList = []
        this.isOverLoading = false

        this.search.pageNo = 1
        this.reqList()
      },
      tapFilterItem(val) {
        this.currentFilterIndex = val
        console.log(val)
      },
      async reqList(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        } else {
          if (this.isLoading) return
          this.isLoading = !this.isLoading
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderStatus: this.statusEnum[this.currentTab],
        }
        this.$VoHttp
          .apiOrderAfterSaleQueryList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records || []
              this.total = res.data.total
              this.$nextTick(() => {
                this.dataList = this.dataList.concat(data)
              })
              console.log('this.dataList', this.dataList)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.isLoading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
        // const res = await this.$VoHttp.apiOrderAfterSaleQueryList({
        //   ...this.search,
        //   orderStatus: this.statusEnum[this.currentTab],
        // })
        // this.isOverLoading = true
        // if (res.success) {
        //   if (!res.data.records || !res.data.records.length) {
        //     if (this.search.pageNo == 1) {
        //       this.dataList = res.data.records
        //     } else {
        //       this.search.pageNo--
        //     }
        //     return
        //   }
        //   if (this.search.pageNo == 1) {
        //     this.dataList = res.data.records
        //     this.isLowerRefresh = true
        //   } else {
        //     this.dataList = [...this.dataList, ...res.data.records]
        //   }
        //   if (res.data.records.length === 10) {
        //     this.search.pageNo++
        //   } else {
        //     this.isLowerRefresh = false
        //   }
        //   return
        // }
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.isLoading = false
          this.reqList(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        // }, 2000)
        console.log('底部加载', this.dataList.length, this.total)
        this.refresh = false
        if (this.dataList.length >= this.total) {
          // uni.$u.toast('没有更多了')
          this.noMore = true
          return false
        }
        this.isLoading = false
        this.noMore = false
        this.pageNo++
        this.reqList()
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
      },
      async getOrderStatusEnum() {
        const res = await this.$VoHttp.apiOrderAfterSaleEnumStatus({}, { noLoading: true })
        console.log(res)
      },
      resetOverlay() {
        this.currentFilterIndex = ''
      },
      lowerRefash() {
        if (this.isLowerRefresh) {
          this.reqList()
        }
      },
      setTime() {
        // all: '全部',
        //   '1m': '1个月内',
        //   '3m': '1-3个月内',
        //   '6m': '半年以内',
        //   '12m': '一年以内',
        //   other: '一年以上',

        switch (this.currentFilterIndex) {
          case '1m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss')
            console.log(this.search.orderStartTime, this.search.orderEndTime)
            break
          case '3m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(3, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss')
            break
          case '6m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(6, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss')
            break
          case '12m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss')
            break
          case 'other':
            this.search.orderStartTime = ''
            this.search.orderEndTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD HH:mm:ss')
            break
          default:
            this.search.orderStartTime = ''
            this.search.orderEndTime = ''
            break
        }
        this.overlayShow = false
        this.resetReqList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      background-color: #fff;
      .tab {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26rpx;
        padding-right: 30rpx;
        > :nth-child(2) {
          //   display: flex;
          //   align-items: center;
          position: relative;
          color: rgba(0, 0, 0, 0.45);
          .vo_icon {
            vertical-align: middle;
          }
        }
      }
    }
    .content {
      flex-grow: 1;
      overflow: auto;
    }
    .u-overlay {
      width: 750rpx;
      height: 132rpx;
      position: relative;
      .overly_content {
        background-color: #fff;
        padding: 24rpx 32rpx;
        .overly_title {
          font-size: 32rpx;
          font-weight: bold;
          padding-bottom: 16rpx;
          border-bottom: 1rpx solid #f7f7f8;
        }
        .overly_btns {
          margin: 24rpx 0 80rpx 0;
          .content_item {
            width: 200rpx;
            height: 64rpx;
            box-sizing: border-box;
            display: inline-block;
            font-size: 24rpx;
            border-radius: 80rpx;
            margin-bottom: 32rpx;
            color: rgba(0, 0, 0, 0.85);
            background-color: #f7f7f8;
            border: 1px solid #f7f7f8;
            text-align: center;
            line-height: 64rpx;
          }
          > :nth-child(3n-1) {
            margin: 0 38rpx;
          }
          .isActive {
            color: #ff5319;
            border: 1px solid #ff5319;
            background-color: #ffece5;
          }
        }
      }
      .overly_btm {
        position: absolute;
        left: 0;
        transform: translateY(-100%);
        width: 100%;
        height: 132rpx;
        display: flex;
        justify-content: space-between;
        > :nth-child(n) {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .custom-style {
            width: 325rpx;
            height: 80rpx;
          }
        }
      }
    }
    .swiper {
      height: 100%;
    }
    .order-scroll {
      height: 100%;
    }
    .workbench-fixbtns {
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 99;
      height: 264rpx;
      width: 190rpx;
      &__item {
        color: #ffffff;
        font-size: 26rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
        mix-blend-mode: normal;
        display: flex;
        align-items: center;
        padding-left: 12rpx;
        padding-right: 16rpx;
        border-radius: 100rpx;
        margin-bottom: 24rpx;
      }
    }
  }
  .line-holder {
    height: 96rpx;
    width: 2rpx;
    background-color: #f7f7f8;
  }
</style>
