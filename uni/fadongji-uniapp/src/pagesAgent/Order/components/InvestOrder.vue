<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="flex flex-column"
  >
    <view class="invest flex flex-column">
      <view class="invest-top">
        <!--搜索-->
        <view class="invest-top__search flex flex-vertical-c">
          <view class="flex1">
            <VoSearch
              v-model="searchModel"
              :showInsideAction="true"
              bgColor="#fff"
              borderColor="#FF5319"
              height="34"
              placeholder="请输入搜索"
              @custom="searchOnClick"
              @search="searchOnClick"
            />
          </view>
          <view class="scree flex flex-vertical-c" @click="showTemplateType">
            <view class="fz-28 m-r-4 color-block-85 m-l-24">筛选</view>
            <image class="scree-icon" src="/static/created/product/screening_grey.png" />
            <VoBadge
              :value="screenNum"
              class="scree-badge"
              customStyle="width: 40rpx;height: 40rpx;text-align: center;line-height:34rpx;justify-content: center;"
            />
          </view>
        </view>
        <OrderScreenAlert ref="orderScreen" class="invest-top__alert" @screen="screenData" />
        <EraTabs
          v-show="eraTabs"
          :current="current"
          :list="typeList"
          activeStyle="font-weight: bold;color: #FF5319;"
          inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45);"
          itemStyle="height: 49px;"
          @click="tabsClick"
        />
        <view v-if="sendType && orderNewType === 1" class="invest-top__subsection">
          <EraSubsection
            :current="curNow"
            :list="list"
            activeColor="#8C8C8C"
            class="subsection"
            customStyle="background-color: #f7f7f8"
            inactiveColor="#262626"
            @change="sectionChange"
          />
        </view>
        <view v-if="orderNewType === 0" class="invest-top__subsection">
          <EraSubsection
            :current="warehouseCur"
            :list="warehouseList"
            activeColor="#262626"
            class="subsection"
            customStyle="background-color: #f7f7f8"
            inactiveColor="#8C8C8C"
            @change="warehouseChange"
          />
        </view>
      </view>

      <swiper
        :autoplay="false"
        :current="current"
        class="invest-swiper flex1"
        @change="changeSwiper"
      >
        <swiper-item v-for="(item, index) in typeList" :key="index">
          <InvestOrderScrollView
            v-if="index === 0"
            ref="orderListRef"
            :is-request="true"
            @bottomClick="bottomClick"
            @cancelOrderClick="cancelOrderClick"
            @scrollFn="scrollFn"
          />
          <InvestOrderScrollView
            v-else
            ref="orderListRef"
            @bottomClick="bottomClick"
            @cancelOrderClick="cancelOrderClick"
            @scrollFn="scrollFn"
          />
        </swiper-item>
      </swiper>
    </view>
    <!--确认收货弹框-->
    <VoModal
      :show="confirmDeliverGoods"
      :showCancelButton="true"
      cancelText="未收到"
      confirmText="已收货"
      content="您是否收到该订单商品？"
      @cancel="confirmDeliverGoods = false"
      @confirm="confirmDeliverClick"
    />
    <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
    <!--  申请退款弹出层  -->
    <RefundReasonPopup ref="reasonPopup" :radio-list="refundReasonList" @select="selectType" />
    <!--  提醒发货弹出层  -->
    <VoModal
      :show="deliverGoodsModel"
      confirmColor="#22284B"
      confirmText="我知道了"
      content="平台已提醒商家尽快发货，请耐心等待。"
      @confirm="deliverGoodsModel = false"
    />
    <!--   取消订单弹出层   -->
    <u-popup :round="8" :show="showCancelOrder" mode="bottom" @close="close">
      <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="close" />
    </u-popup>
  </view>
</template>

<script>
  import InvestOrderScrollView from './InvestOrderScrollView'
  import OrderScreenAlert from './OrderScreenAlert'
  import CancelOrder from './CancelOrder'
  import RefundActionPopup from '@/pagesAgent/Order/ReturnExchange/components/RefundActionPopup.vue'
  import RefundReasonPopup from './RefundReasonPopup'

  export default {
    name: 'InvestOrder',

    components: {
      OrderScreenAlert,
      InvestOrderScrollView,
      CancelOrder,
      RefundActionPopup,
      RefundReasonPopup,
    },
    props: {
      //0.投资订单 1转投资订单
      orderType: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        orderId: '',
        showCancelOrder: false, // 取消订单弹出层
        current: 0,
        curNow: 0,
        warehouseCur: 0,
        screenNum: '',
        searchModel: '',
        confirmDeliverGoods: false, //确认收货弹框
        deliverGoodsModel: false, // 提醒发货弹出层
        refundReasonList: [], //退款
        sendType: false, //待发货显示催货栏 默认不显示
        list: ['全部', '催发货', '超时未发货'],
        warehouseList: ['批发到家', '全国投放'],
        typeList: [],
        //提醒类型,不传则为全部1,提醒发货,2超时发货
        warnType: 0,
        //投资订单类型(1本地,2全国)
        investType: 1,
        //控制筛选弹框显示
        screenShow: false,
        eraTabs: true, // tab栏显隐
        orderNewType: 0,
        //订单列表请求接口参数
        requestParams: {},
        acceptData: '', //收货数据
        operationData: '',
        orderData: {},
      }
    },
    created() {
      this.getOrderStatusListRequest()
      this.orderNewType = this.orderType
    },
    methods: {
      cancelOrderClick(resultData) {
        console.log(588585855)
        this.showCancelOrder = true
        this.orderId = resultData.id
      },
      /**
       *底部按钮点击事件
       */
      bottomClick(data) {
        //index 4.提醒发货 7.申请退款 8.确认收货
        let index = data.index
        let resultData = data.data
        this.operationData = data.data
        if (index === '4') {
          this.getDeliveryGoodsRequest(resultData)
          return
        }
        if (index === '7') {
          //如果是待发货状态下申请退款 全单退
          if (resultData.status === 1220) {
            this.orderData = resultData
            this.refundReasonRequest()
            return
          }
          this.$linkToEasy(
            '/pagesAgent/Order/OrderDetail/InvestDetail?data=' + resultData.id + '&type=' + '1',
          )
          return
        }
        if (index === '8') {
          this.orderId = resultData.id
          this.confirmDeliverGoods = true
        }
      },
      /**
       * 已收货
       */
      confirmDeliverClick() {
        this.confirmDeliverGoods = false
        this.confiemGoodsRequest()
      },
      //确认收货请求请求
      confiemGoodsRequest() {
        let param = {
          orderId: this.orderId,
        }
        this.$VoHttp
          .apiOrderInvestReceipt({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.current = 4
              this.acceptData = this.operationData
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收货失败')
          })
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
              console.log(res)
              let array = res.data
              this.refundReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundReasonList.push(param)
                // this.$refs.actionPopup.show()
              })
              this.$refs.reasonPopup.show()
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //提醒发货请求请求
      getDeliveryGoodsRequest(data) {
        let param = {
          orderId: data.id,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              this.deliverGoodsModel = true
              this.refresh = true
              this.getOrderListRequest()
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '您已经提醒过了')
          })
      },
      // 选择投诉类型
      selectType(item) {
        this.$refs.reasonPopup.close()
        this.refundReason = item.reason
        this.applyForRefundRequest()
      },
      //发起退款申请请求
      applyForRefundRequest() {
        let params = {
          orderId: this.orderData.id,
          source: this.orderData.source,
          shopId: this.orderData.shopId,
          shopPlatformCode: this.orderData.shopPlatformCode,
          whetherReceiptGoods: false,
          reason: this.refundReason,
        }
        params.isRefundOnly = true
        let goodsInfos = []
        this.orderData.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: this.decimalMulFn(item.payPrice, item.goodsCount),
          }
          goodsInfos.push(param)
        })
        params.goodsInfos = goodsInfos

        uni.showLoading({
          title: '加载中',
          mask: true,
        })
        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                this.refresh = true
                this.getOrderListRequest()
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
      /**
       * 关闭弹出层
       */
      close() {
        this.showCancelOrder = false
        this.showModalCancel = false
      },
      /**
       * 点击确定按钮关闭弹出层
       */
      cancelConfirm(data) {
        if (!data.reason) {
          this.$u.toast('请选择取消原因')
          return
        }
        this.showCancelOrder = false
        let param = {
          orderId: this.orderId,
          cancelReason: data.reason,
          remark: '',
        }
        this.getCancelOrderRequest(param)
      },
      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderInvestCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
              setTimeout(() => {
                // this.getOrderStatusListRequest()
                this.getOrderListRequest()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
          })
      },
      scrollFn(e, top) {
        let that = this
        uni.$u.throttle(() => {
          that.eraTabs = e >= 0
        }, 1000)
      },
      back() {
        this.$backFn()
      },
      searchOnClick() {
        console.log('zxc')
        this.getOrderListRequest()
      },
      tabsClick(item) {
        console.log('1221212121212', item.index)
        this.current = item.index
      },
      changeSwiper(e) {
        console.log('changeSwiper   ---- --sdsd  sda')
        this.current = e.detail.current
        if (e.detail.current === 2) {
          this.sendType = true
        } else {
          this.sendType = false
        }
        console.log('this.acceptData.investType', this.acceptData)
        //处理收货后跳转已完成页面区分全国和本地
        // if (this.acceptData && this.acceptData.investType === 2) {
        //   this.warehouseCur = 1
        //   this.investType = 2
        // } else {
        //   this.warehouseCur = 0
        //   this.investType = 1
        // }
        this.acceptData = ''
        this.getOrderListRequest()
      },
      //发货成功之后返回列表待发货页面
      deliverGoodsUpdate() {
        this.tabsClick({ index: 2 })
        this.getOrderListRequest()
      },
      //投资订单的仓位显示与否
      warehouseShow(index) {
        // eslint-disable-next-line vue/no-mutating-props
        if (index !== this.orderNewType) {
          this.current = 0
        }
        this.orderNewType = index
        this.getOrderListRequest()
      },
      //投资订单选择仓储
      warehouseChange(index) {
        this.warehouseCur = index
        this.investType = index + 1
        this.getOrderListRequest()
      },
      //投资订单-投资到全国
      investCountryChange() {
        let index = 1
        this.warehouseCur = index
        this.investType = index + 1
        this.getOrderListRequest()
      },
      //筛选弹框控制
      showTemplateType() {
        if (this.screenShow) {
          this.screenShow = false
          this.$refs.orderScreen.showShare(false)
        } else {
          this.screenShow = true
          this.$refs.orderScreen.showShare(true)
        }
      },
      //待收货状态的筛选
      sectionChange(index) {
        this.curNow = index
        this.warnType = index
        this.getOrderListRequest()
      },
      screenData(data) {
        console.log(data)
        let warehouseIdList = []
        if (data.mySelf && data.mySelf.length) {
          data.mySelf.map((item) => {
            warehouseIdList.push(item.id)
          })
        }
        if (data.paltform && data.paltform.length) {
          data.paltform.map((item) => {
            warehouseIdList.push(item.id)
          })
        }

        this.screenNum = String(data.num)
        let param = {}
        let timeArr = data.time
        if (timeArr.length > 0) {
          param.orderStartTime = timeArr[0]
          param.orderEndTime = timeArr[1]
        } else {
          param.orderStartTime = null
          param.orderEndTime = null
        }
        param.warehouseIdList = warehouseIdList
        this.requestParams = Object.assign(this.requestParams, param)
        this.getOrderListRequest()
      },
      getOrderListRequest() {
        console.log('typeList', this.typeList)
        let typeParam = this.typeList && this.typeList.length ? this.typeList[this.current] : ''
        console.log('typeParam', typeParam)
        if (typeParam) {
          this.requestParams.id = typeParam.id || '0'
        } else {
          this.requestParams.id = '0'
        }
        this.requestParams.searchWord = this.searchModel
        this.requestParams.orderType = this.orderNewType
        this.requestParams.warnType = this.warnType
        this.requestParams.investType = this.investType
        this.$refs.orderListRef[this.current].getOrderRequest(this.requestParams)
      },
      //投资订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = []
        let param = { isBuyer: true }
        this.$VoHttp
          .apiOrderInvestEnumStatus(param)
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
              uni.$u.toast(res.message || '投资订单状态获取失败')
            }
          })
          .catch((err) => {
            uni.$u.toast('投资订单状态获取失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invest {
    height: 100%;
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
            width: 40rpx;
            height: 40rpx;
          }
          &-badge {
            position: absolute;
            top: -10rpx;
            right: -20rpx;
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
      flex: 1;
      height: 100%;

      &__scroll {
        flex: 1;
        height: 100%;
      }
    }
  }
</style>
