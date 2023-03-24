<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column overflow-hidden"
  >
    <VoNav isHaveMore title="销售订单" />
    <view class="market flex flex-column">
      <view class="market-top">
        <!--搜索-->
        <view class="market-top__search flex flex-vertical-c">
          <view class="flex1" @click="searchOnClick">
            <VoSearch
              v-model="searchModel"
              :actionStyle="{ color: '#fff' }"
              :showInsideAction="true"
              bgColor="#fff"
              borderColor="#FF5319"
              height="34"
              placeholder="请输入搜索"
            />
          </view>
          <view class="scree flex flex-vertical-c" @click="showTemplateType">
            <view class="fz-28 m-r-4 color-block-85 m-l-24">筛选</view>
            <VoIcon :opacity="0.25" color="#000" name="screening" size="20"></VoIcon>
            <!--            <image class="scree-icon" src="/static/created/product/screening.png" />-->
            <VoBadge :value="screenNum" class="scree-badge" />
          </view>
        </view>
        <OrderScreenAlert ref="orderScreen" class="market-top__alert" @screen="screenData" />
        <EraTabs :current="current" :list="typeList" class="m-l-8" @click="tabsClick" />
      </view>
    </view>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="orderList.length === 0 ? false : true"
      class="flex1 p-b-safe-area overflow-y"
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
      <VoNoData v-if="orderList.length === 0 && !isLoading" no-data-tips="暂无销售订单" />
      <view v-else>
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <GoodInfoItem
          v-for="(item, index) in orderList"
          :key="index"
          :isPro="false"
          :order-data="item"
          @bottomClick="bottomClick"
          @click.native="goOrderDetail(item)"
        />
        <VoLoadingText :has-more="orderList.length < total" :loading="isLoading" />
      </view>
    </scroll-view>
    <!--备注弹框-->
    <view class="position-f">
      <VoModal
        :content="content"
        :show="showRemarkModal"
        confirmText="我知道了"
        title="卖家留言"
        @confirm="showRemarkModal = false"
      />
    </view>
    <!--    <MarketOrder-->
    <!--      ref="marketRef"-->
    <!--      :search="searchModel"-->
    <!--      class="flex1"-->
    <!--      :current="current"-->
    <!--      @change="changeTab"-->
    <!--      :isPreSale="isPreSale"-->
    <!--    />-->
  </view>
</template>

<script>
  import OrderScreenAlert from '../components/OrderScreenAlert'
  import GoodInfoItem from '../components/GoodInfoItem'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    components: {
      OrderScreenAlert,
      GoodInfoItem,
    },
    data() {
      return {
        showRemarkModal: false,
        content: '',
        timeData: null,
        current: 0,
        searchModel: '',
        // 是否预售
        isPreSale: false,
        curNow: 0,
        screenNum: '0',
        deliverGoodsModel: false,
        typeList: [
          { id: '0', name: '全部' },
          { id: '1310', name: '待付款' },
          { id: '1320', name: '待发货' },
          { id: '1330', name: '已发货' },
          { id: '1340', name: '已完成' },
          { id: '1350', name: '已取消' },
          { id: '1360', name: '已关闭' },
        ],
        orderList: [],
        status: 'nomore',
        loadingText: '努力加载中',
        loadmoreText: '轻轻上拉',
        nomoreText: '暂无更多内容',
        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',
        orderId: '',
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        isLoading: false,
      }
    },
    onLoad(option) {
      if (option.search) {
        this.searchModel = option.search
      }
      if (option.index) {
        this.current = +option.index
      }
      if (option.isPreSale) {
        this.isPreSale = true
      }
    },
    onShow() {
      // let that = this
      // this.timeData=setInterval(()=>{
      //   if(that.$refs&&that.$refs.marketRef){
      //     console.log("9999999999999");
      //     clearInterval(that.timeData)
      //     that.timeData=null
      //     that.$refs.marketRef.reLoad()
      //   }
      // },200)
      this.getOrderListRequest(1)
    },
    methods: {
      searchOnClick() {
        this.$linkToEasy('/pagesRecovery/SellOrder/OrderSearch/OrderSearch')
      },
      tabsClick(item) {
        this.current = item.index
        // this.orderStartTime = ''
        // this.orderEndTime = ''
        // this.isPreSale = false
        // this.$refs.orderScreen.resetClick()
        this.getOrderListRequest(1)
      },
      changeSwiper(e) {
        this.current = e.detail.current
        //清空筛选项
        // this.$refs.orderScreen.resetClick()
      },
      showTemplateType() {
        console.log('asd')
        this.$refs.orderScreen.showShare(true)
      },
      // 筛选数据
      screenData(data) {
        console.log(data)
        this.screenNum = String(data.num)
        let timeArr = data.time
        if (timeArr.length > 0) {
          this.orderStartTime = timeArr[0]
          this.orderEndTime = timeArr[1]
        }
        //状态
        if (data.orderTypeData && data.orderTypeData.length) {
          this.isPreSale = data.orderTypeData[0].name === '预售订单'
        }
        this.getOrderListRequest(1)
        this.$forceUpdate()
      },
      //销售订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = [
          { id: '0', name: '全部' },
          { id: '1310', name: '待付款' },
          { id: '1320', name: '待发货' },
          { id: '1330', name: '已发货' },
          { id: '1340', name: '已完成' },
          { id: '1350', name: '已取消' },
          { id: '1360', name: '已关闭' },
        ]
        return
        this.typeList = []
        this.$VoHttp
          .apiOrderSellEnumStatus()
          .then((res) => {
            if (res.code === '20001') {
              let resultData = res.data
              let arr = Object.entries(resultData)
              let param = { id: '0', name: '全部' }
              this.typeList.push(param)
              for (const item of arr) {
                let param = { id: item[0], name: item[1] }
                this.typeList.push(param)
              }
            } else {
              uni.$u.toast(res.message || '销售订单状态获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('销售订单状态获取失败')
          })
      },
      changeTab(index) {
        this.current = index
      },
      /**
       * 去订单详情
       */
      goOrderDetail(data) {
        this.$linkToEasy('/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=' + data.id)
      },
      /**
       *去备注
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 11.发货 12.弹窗
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/OrderSearch/OrderRemark?data=${JSON.stringify(
              resultData,
            )}&type=2`,
          )
          return
        }
        if (index === '12') {
          this.content = resultData.remark
          this.showRemarkModal = true
          return
        }

        if (index === '1') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/ReceiveAddress/AddressList?orderId=${resultData.id}&type=2&companyId=${resultData.orderCompanyId}`,
          )
          return
        }
        if (index === '5') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/OrderDetail/DeliveryMessage?data=${resultData.id}`,
          )
          return
        }
        if (index === '11') {
          this.$linkToEasy(
            '/pagesRecovery/SellOrder/DeliverGoods/DeliverGoods?data=' + resultData.id,
          )
          return
        }
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getOrderListRequest(1)
        }
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        //   console.log('底部加载')
        //
        // }, 2000)
        this.refresh = false
        if (this.orderList.length >= this.total) {
          uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        this.getOrderListRequest()
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
      //获取订单列表请求
      getOrderListRequest(refresh) {
        let isfresh = refresh || this.refresh
        if (this.isLoading) return
        this.isLoading = true
        showLoading()
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          orderStatus: this.typeList[this.current].id,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }

        if (this.searchModel.length > 0) {
          param.param = this.searchModel
        }

        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }

        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }
        param.isPreSale = this.isPreSale
        // if (this.warnType > 0) {
        //   param.warnType = this.warnType
        // }
        console.log(param)
        this.$VoHttp
          .apiOrderOldQueryList(param)
          .then((res) => {
            console.log(res)
            if (res.code === '20001') {
              let resultData = res.data.records
              resultData.forEach((item) => {
                let totalCount = 0
                item.goodsDetail.forEach((it) => {
                  totalCount += it.goodsCount
                })
                item.totalCount = totalCount
              })
              this.total = res.data.total
              this.orderList = this.orderList.concat(resultData)
            } else {
              uni.$u.toast(res.message || '网络链接失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '网络链接失败')
          })
          .finally(() => {
            hideLoading()
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-f {
    position: fixed;
  }
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
  }
  .market {
    &-top {
      position: relative;
      width: 750rpx;
      background-color: #ffffff;

      &__alert {
        position: absolute !important;
        width: 750rpx;
        top: 98rpx !important;
        z-index: 99;
      }

      &__search {
        padding: 20rpx 32rpx 18rpx 32rpx;
        box-sizing: border-box;
        background: #fff;
        .scree {
          position: relative;

          &-icon {
            width: 48rpx;
            height: 48rpx;
          }
          &-badge {
            position: absolute;
            top: 0;
            right: -10rpx;
          }
        }
      }
      &__subsection {
        height: 100rpx;
        padding-left: 32rpx;
        padding-right: 32rpx;
        padding-top: 15rpx;
        .subsection {
          margin-top: 15rpx;
        }
      }
    }
    &-swiper {
      width: 100%;
      height: 100%;
    }
  }
  .order-scroll {
    height: 100%;
    width: 100%;

    &__scroll {
      height: 100%;
    }
  }
</style>
