<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="pay flex flex-column"
    >
      <VoNav isHaveMore title="还款订单" />
      <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="flex1 overflow-y m-t-16"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        refresher-enabled="true"
        scroll-top="0"
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
        <view v-for="(item, indexIt) in totalList" :key="indexIt" class="bg-white">
          <view class="pay-total flex">
            <VoIcon
              :name="item.checked ? 'select-right' : 'address_select'"
              class="pay-total__icon"
              color="#FF5319"
              @click="checkParent(item)"
            />
            <view class="flex1">
              <view class="fz-b fz-28 color-block lh42">订单编号：{{ item.id }}</view>
              <view class="flex flex-vertical-c m-t-14">

                <view class="pay-total__label">
                  <!-- ENG-6543 -->
                  <block v-if="userInfo.platformCode === 'garage'">未还款</block>
                  <block v-else>{{ repayStatus[item.repayStatus] }}</block>
                </view>
                <!-- <view class="pay-total__label">部分还款</view>
                <view class="pay-total__label">部分逾期</view>
                <view class="pay-total__label">未还款</view> -->
              </view>
              <view class="pay-total__text">
                含{{ item.goodsNum || 0 }}个商品，共{{ item.goodsTotalNum }}件
              </view>
              <view class="pay-total__text">还款时间：{{ item.expireTime }}</view>
            </view>
            <view class="text-right">
              <view @click="openPoints(item)">
                <view v-if="!item.showPoints" class="flex flex-vertical-c flex-justify-r">
                  <view class="fz-24 color-block-45 m-r-4">展开</view>
                  <VoIcon name="arrow-bottom-line" size="16" />
                </view>
                <view v-else class="flex flex-vertical-c flex-justify-r">
                  <view class="fz-24 color-block-45 m-r-4">收起</view>
                  <VoIcon name="arrow-top-line" size="16" />
                </view>
              </view>
              <VoPointPrice
                :left-size="16"
                :price="item.payableAmount"
                :show-unit="true"
                class="m-t-12 lh48"
                color="#F20014"
              />
            </view>
          </view>
          <view v-for="(info, indexIn) of item.goodsDetails" :key="indexIn">
            <view v-show="item.showPoints" class="pay-points flex">
              <!-- <VoIcon
                :name="info.checked ? 'select-right' : 'address_select'"
                class="m-t-32"
                color="#FF5319"
                @click="check(info)"
              /> -->
              <view class="flex1">
                <view class="fz-b fz-28 color-block lh42">
                  <text v-show="info.categoryType" class="good-tips m-r-8">{{info.categoryType}}</text>
                  <text> {{ info.goodsName }}</text>
                </view>
                <view class="m-t-16 flex flex-vertical-c">
                  <view class="fz-26 color-block-65">还款数量：</view>
                  <view class="pay-points__num">{{ info.goodsCount }}</view>
                </view>
              </view>
              <view class="text-right">
                <VoPointPrice
                  :left-size="16"
                  :price="info.payPrice"
                  :show-unit="true"
                  class="lh48"
                  color="#F20014"
                />
                <view class="m-t-12 fz-28 color-block-45"> x{{ info.goodsCount || 0 }} </view>
              </view>
            </view>
          </view>
        </view>
        <VoLoadingText
          v-if="totalList.length > 0"
          :has-more="totalList < total"
          :loading="loading"
        />
        <VoNoData v-if="!totalList.length && !refresh" />
      </scroll-view>

      <view class="pay-bottom flex flex-justify-between flex-vertical-c" v-if="totalList.length">
        <view class="flex flex-vertical-c" @click="checkAll">
          <VoIcon :name="selectAll ? 'select-right' : 'address_select'" color="#FF5319" />
          <view class="fz-28 color-block-45">全选</view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="fz-28 color-block">合计：</view>
          <VoPointPrice
            :left-size="16"
            :price="totalPrice"
            :show-unit="true"
            class="m-r-24"
            color="#F20014"
          />
          <view
            class="pay-bottom__button"
            :class="btnDisabled ? 'btnDisabled' : ''"
            @click="payClick"
            >去还款</view
          >
        </view>
      </view>
    </view>
    <VoPayPopup
      v-if="showPay"
      :show.sync="showPay"
      :total-price="totalPrice"
      @confirm="payHandler"
    />
  </view>
</template>

<script>
  import { decimalAddFn, decimalMulFn, appSource, hideLoading, showLoading, goWechat } from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'PaymentOrder',
    data() {
      return {
        showPay: false, // 支付弹框
        selectAll: false, // 全选
        totalPrice: 0, // 总价
        totalList: [
          // {
          //   id: 1,
          //   checked: false,
          //   showPoints: false, // 是否显示子项商品
          //   payAmount: 100, // 价格
          //   goodsDetails: [
          //     {
          //       id: 6,
          //       checked: false,
          //     },
          //     {
          //       id: 7,
          //       checked: false,
          //     },
          //     {
          //       id: 8,
          //       checked: false,
          //     },
          //   ],
          // },
        ],
        repayStatus: { 0: '未还款', 1: '已还款', 2: '已逾期' },
        loadingStatus: false,
        refresh: false,
        triggered: false,
        scrollTop: 0,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        btnDisabled: true,
      }
    },
    watch: {
      totalList: {
        handler(val) {
          let arr = val.filter((item) => item.checked)
          if (arr.length > 0) {
            this.btnDisabled = false
          } else {
            this.btnDisabled = true
          }
          if (arr.length === val.length) {
            this.selectAll = true
          } else {
            this.selectAll = false
          }
          this.calcPrice()
        },
        deep: true,
      },
    },
    methods: {
      /**
       * 展开收起
       * @param open 当前选中对象展开收起
       */
      openPoints(open) {
        this.totalList.forEach((item) => {
          if (open.id === item.id) {
            item.showPoints = !item.showPoints
          }
        })
      },
      /**
       * 选中商品
       * @param item  当前点击对象
       */
      check(item) {
        // 当前选中状态取反
        item.checked = !item.checked
        // this.calcPrice()
        this.$forceUpdate()
      },
      // 全选商品
      checkAll() {
        let that = this
        // 全局记录全选状态，对子项赋值
        this.selectAll = !that.selectAll
        this.totalList.map((plat) => {
          // 父级订单选中状态赋值
          plat.checked = that.selectAll
          // plat.goodsDetails.map((item) => {
          //   // 子订单选中状态赋值
          //   item.checked = that.selectAll
          // })
        })
        // this.calcPrice()
        // this.$forceUpdate()
      },
      /**
       * 选择商铺下的所有商品
       * @param item  商铺对象
       */
      checkParent(item) {
        // 当前父级取反
        item.checked = !item.checked
        // 对子级循环赋值未父级选中状态
        item.goodsDetails.forEach((it) => {
          it.checked = item.checked
        })
        // this.calcPrice()
        this.$forceUpdate()
      },
      /**
       * 计算价格
       */
      calcPrice() {
        let price = 0 // 总价格
        let parentCount = 0 // 父级被选中状态数量
        this.totalList.forEach((item) => {
          let sonCount = 0 // 子级被选中状态数量
          if (item.checked) {
            price = decimalAddFn(price, item.payableAmount)
          }
          // item.goodsDetails.forEach((it) => {
          //   if (it.checked) {
          //     sonCount++
          //     // price = decimalAddFn(price, decimalMulFn(it.price, it.count))
          //     // price = decimalAddFn(price, decimalMulFn(it.payPrice, it.goodsCount))
          //   }
          // })
          // 如果子级被选中的数量等于子级列表长度，则父级全选,需求已去除子级商品选中
          // if (sonCount === item.goodsDetails.length) {
          //   item.checked = true
          //   parentCount++
          // } else {
          //   item.checked = false
          // }
        })
        console.log('price========', price)
        // 被选中的父级数量若等于订单列表长度，则页面列表全选
        // this.selectAll = parentCount === this.totalList.length 挪到上面去
        // 页面总价赋值
        this.totalPrice = price || 0
        this.$forceUpdate()
      },
      /**
       * 去还款
       */
      payClick() {
        // 获取订单
        if (this.btnDisabled) return
        // this.$u.toast('去支付')
        let arr = this.totalList.filter((item) => item.checked)
        if (arr.length > 0) {
          this.showPay = true
        }
      },
      async payHandler(info) {
        let that = this
        let repaymentOrderLogBOList = []
        that.totalList.forEach((item) => {
          if (item.checked) {
            repaymentOrderLogBOList.push({
              amount: item.orderAmount,
              // buyerId: 160817148749545472, //买方客户id
              goodsNum: item.goodsNum,
              goodsTotalNum: item.goodsTotalNum,
              orderId: item.id,
              repayAmount: item.payableAmount,
              // shopId: item.shopId, //卖方商家id
            })
          }
        })
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          // userId: this.orderData.buyerId,
          cashAmount: that.totalPrice,
          // orderId: this.orderId,
          accountAmount: 0,
          repaymentOrderLogBOList: repaymentOrderLogBOList,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', e => {
            var args = plus.runtime.arguments;
            console.log(`args`, args);
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: orderId })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent');
                  that.initList(true)
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                  this.$u.toast(e.message || '网络错误')
                })
            }
          })
          return
        }
        console.log('req', req)
        showLoading('加载中')
        const { payInfo, extendInfo } = await this.$VoHttp
          .payRepaymentPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        let orderId = extendInfo.split(':')[1]
        console.log('orderId', orderId)
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                that.initList(true)
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
                this.$u.toast(e.message || '网络错误')
              })
          }
        })
      },
      initList(refresh) {
        if (this.loading) return
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.totalList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          isRepayment: 0,
        }

        this.$VoHttp
          .apiOrderAccountPeriodPayableList(params)
          .then((res) => {
            if (res && res.data) {
              let data = res.data.records.map((item) => {
                return {
                  checked: false,
                  showPoints: false,
                  ...item,
                }
              })
              this.total = res.data.total
              this.totalList = this.totalList.concat(data)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = false
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
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.initList(true)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.totalList.length >= this.total) {
            uni.$u.toast('已经到底了')
            return false
          }
          this.pageNo++
          this.initList()
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
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
    onShow() {
      this.initList(true)
      this.showPay = false
    },
  }
</script>

<style lang="scss" scoped>
  .pay {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-total {
      background: #fff;
      padding: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
      &__icon {
        margin-right: 8rpx;
        align-self: center;
      }
      &__label {
        height: 36rpx;
        line-height: 36rpx;
        padding: 0 16rpx;
        box-sizing: border-box;
        color: #ec404d;
        font-size: 24rpx;
        background: #feecee;
        border-radius: 24rpx;
        margin-right: 8rpx;
      }
      &__text {
        margin-top: 8rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        color: $v-c0-65;
      }
    }
    &-points {
      margin-left: 88rpx;
      padding: 32rpx 32rpx 32rpx 0;
      border-bottom: 2rpx solid $v-bg-light;
      background: #fff;
      &__num {
        border: 2rpx solid rgba(0, 0, 0, 0.65);
        border-radius: 8rpx;
        font-size: 24rpx;
        height: 52rpx;
        line-height: 52rpx;
        padding: 0 16rpx;
        box-sizing: border-box;
      }
    }
    &-bottom {
      background: #fff;
      padding: 20rpx 32rpx;
      height: 184rpx;
      box-sizing: border-box;
      &__button {
        width: 240rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background: #ff5319;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #ffffff;
        &.btnDisabled {
          background: #f6f7f8;
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
