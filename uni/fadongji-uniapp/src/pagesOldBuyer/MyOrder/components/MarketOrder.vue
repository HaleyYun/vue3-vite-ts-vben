<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="market flex flex-column"
  >
    <view class="market-top">
      <!--搜索-->
      <view class="market-top__search flex flex-vertical-c">
        <view class="flex1">
          <VoSearch
            v-model="searchModel"
            height="34"
            borderColor="#FF5319"
            bgColor="#fff"
            :actionStyle="{color:'#fff'}"
            :showInsideAction="true"
            placeholder="请输入搜索"
            @custom="searchEvent"
            @search="searchEvent"
          />
        </view>
        <view class="scree flex flex-vertical-c" @click="showTemplateType">
          <view class="m-r-4 fz-28 color-block lh42">筛选</view>
          <image class="scree-icon" src="/static/created/product/screening_grey.png" />
          <VoBadge :value="screenNum" class="scree-badge" />
        </view>
      </view>
      <OrderScreenAlert ref="orderScreen" class="market-top__alert" @screen="screenData" />
      <EraTabs :current="current" :list="typeList" itemStyle="height: 49px;" @click="tabsClick" />
    </view>

    <swiper :autoplay="false" :current="current" class="market-swiper flex1" @change="changeSwiper">
      <swiper-item v-for="(item, index) in typeList" :key="index">
        <MarketScrollView
          ref="orderListRef"
          :is-request="index === 0"
          :search-model="searchModel"
          @cancelOrder="cancelOrder"
          @deliverGoodsModel="deliverGoodsModel = true"
          @orderReceive="orderReceive"
          @showRefun="showRefun"
        />
      </swiper-item>
    </swiper>
    <view>
      <VoModal
        v-if="deliverGoodsModel"
        :show="true"
        confirmColor="#22284B"
        confirmText="我知道了"
        content="平台已提醒商家尽快发货，并对商家超时未发货做出处罚。您可以选择申请退款，或者继续等待商家发货。"
        @confirm="deliverGoodsModel = false"
      />
      <!--是否收到货-->
      <VoModal
        v-if="showModalCancel"
        :show="true"
        :showCancelButton="true"
        cancelColor="#B7B7B7"
        cancelText="未收到"
        confirmText="已收到"
        content="您是否收到该订单商品"
        @cancel="close"
        @confirm="confiemGoodsRequest"
      />
      <!--   取消订单弹出层   -->
      <u-popup v-if="showCancelOrder" :show="true" mode="bottom" @close="close" height="700">
        <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="close" :list="cancelList" />
      </u-popup>
      <!--申请退款-->
      <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
    </view>
  </view>
</template>

<script>
  import MarketScrollView from './MarketScrollView'
  import OrderScreenAlert from './OrderScreenAlert'
  import CancelOrder from '@/pagesOldBuyer/MyOrder/components/CancelOrder'
  import RefundActionPopup from '@/pagesOldBuyer/MyOrder/components/RefundActionPopup'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'MarketOrder',

    components: {
      OrderScreenAlert,
      MarketScrollView,
      CancelOrder,
      RefundActionPopup,
    },
    props: {
      search: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        current: 0,
        curNow: 0,
        searchModel: '',
        screenNum: '0',
        deliverGoodsModel: false,
        typeList: [],
        showCancelOrder: false, // 取消订单弹出层
        showModalCancel: false, //确认收货弹出层
        refundReasonList: [],
        reasonString: '', // 退款原因
        cur: '', // 当前选中数据
        cancelList: [],
      }
    },
    created() {
      // this.searchModel = this.search
      this.getOrderStatusListRequest()
      this.refundReasonRequest()
      this.getCancelList()
    },
    methods: {
      getCancelList() {
        this.$VoHttp.apiOrderCancelCauseQueryList().then(res => {
          let arr = []
          res.data.forEach(item => {
            arr.push({
              name: item,
              disabled: false
            })
          })
          this.cancelList = arr
        }).catch(e=> {
          console.log(e);
          uni.$u.toast(e.message || '网络错误')
        })
      },
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderSearch/OrderSearch')
      },
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
      },
      tabsClick(item) {
        this.current = item.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
        //清空筛选项
        this.$refs.orderScreen.resetClick()
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      screenData(data) {
        console.log(data)
        this.screenNum = data.num ? String(data.num) : ''
        let param = {}
        let timeArr = data.time
        if (timeArr && timeArr.length > 0) {
          param.orderStartTime = timeArr[0] ? timeArr[0].orderStartTime : ''
          param.orderEndTime = timeArr[0] ? timeArr[0].orderEndTime : ''
        }

        let preSaleArr = data.mySelf
        if (preSaleArr && preSaleArr.length > 0) {
          param.isPreSale = preSaleArr[0].isPreSale
        }
        //状态
        let typeParam = this.typeList[this.current]
        param.id = typeParam.id
        this.$refs.orderListRef[this.current].getOrderRequest(param)
      },
      searchEvent(data) {
        this.$refs.orderListRef[this.current].getOrderListRequest(true)
      },
      /**
       * 关闭弹出层
       */
      close() {
        this.showCancelOrder = false
        this.showModalCancel = false
      },
      // 确认收货弹窗
      orderReceive(data) {
        this.cur = data
        this.showModalCancel = true
      },
      //确认收货请求请求
      confiemGoodsRequest() {
        this.showModalCancel = false
        let param = {
          orderId: this.cur.id,
        }
        this.$VoHttp
          .apiOrderOldReceive(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.$refs.orderListRef[this.current].getOrderListRequest(true)
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('收货失败')
          })
      },
      //确认收货成功
      confirmReviceGood() {
        this.typeList.forEach((item, index) => {
          if (item.id === '1340') {
            this.current = index
          }
        })
      },
      //销售订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = []
        this.$VoHttp
          .apiOrderOldEnumStatus()
          .then((res) => {
            console.log(res, 'getOrderStatusListRequest')
            if (res.code === '20001') {
              let resultData = res.data
              let arr = Object.entries(resultData)
              let param = { id: '0', name: '全部' }
              this.typeList.push(param)
              for (const item of arr) {
                let param = { id: item[0], name: item[1] }
                this.typeList.push(param)
              }
              console.log(this.typeList)
            } else {
              uni.$u.toast(res.message || '销售订单状态获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('销售订单状态获取失败')
          })
      },
      showRefun(data) {
        this.cur = data
        this.$refs.actionPopup.show()
      },
      // 选择退款原因类型
      selectType(item) {
        this.$refs.actionPopup.close()
        this.reasonString = item.name
        this.getRefundCalculateAmount(this.cur)
      },
      //仅退款原因
      refundReasonRequest() {
        let params = {
          type: 1,
        }
        this.$VoHttp
          .apiOrderRefundCauseQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              let array = res.data
              this.refundReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundReasonList.push(param)
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //计算可退金额请求
      getRefundCalculateAmount(refunData) {
        let params = {
          orderId: refunData.id,
          goodsId: refunData.goodsDetail[0].goodsId,
          goodsCount: refunData.goodsDetail[0].goodsCount,
          projectId: 0,
        }
        this.$VoHttp
          .apiRefundCalculateAmount(params)
          .then((res) => {
            if (res.code === '20001') {
              this.applyForRefundRequest(res.data, refunData)
            } else {
              uni.$u.toast(res.message || '退款金额获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款金额获取失败')
          })
      },
      //发起退款申请请求
      applyForRefundRequest(price, refunData) {
        let params = {
          orderId: refunData.id,
          goodsId: refunData.goodsDetail[0].goodsId,
          goodsCount: refunData.goodsDetail[0].goodsCount,
          amount: price,
          source: refunData.source,
          shopId: refunData.shopId,
          whetherReceiptGoods: false,
          shopPlatformCode: refunData.shopPlatformCode,
          reason: this.reasonString,
          isRefundOnly: true,
        }
        let goodsInfos = []
        refunData.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: item.payPrice * item.goodsCount,
          }
          goodsInfos.push(param)
        })
        params.goodsInfos = goodsInfos

        uni.showLoading({
          title: '加载中',
        })

        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                this.$refs.orderListRef[this.current].getOrderListRequest(true)
              }, 1500)
            } else {
              uni.$u.toast(res.message || '发起退货失败')
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
            uni.$u.toast(err.message || '发起退货失败')
          })
      },
      // 打开取消订单弹窗
      cancelOrder(data) {
        this.showCancelOrder = true
        this.cur = data
      },
      /**
       * 点击确定按钮关闭弹出层
       */
      cancelConfirm(data) {
        this.showCancelOrder = false
        let param = {
          orderId: this.cur.id,
          cancelReason: data.reason,
          remark: '',
        }
        this.getCancelOrderRequest(param)
      },
      refreshList() {
        this.$refs.orderListRef?.[this.current].getOrderListRequest(true)
      },
      //取消订单请求
      getCancelOrderRequest(data) {
        showLoading()
        this.$VoHttp
          .apiOrderOldCancel(data)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '订单取消成功')
              this.$refs.orderListRef[this.current].getOrderListRequest(true)
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
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
          margin-left: 24rpx;
          &-icon {
            width: 40rpx;
            height: 40rpx;
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
</style>
