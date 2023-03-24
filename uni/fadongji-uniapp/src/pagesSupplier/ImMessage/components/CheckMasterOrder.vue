<template>
  <view
    :class="{
      'wrap-bubble': orderInfoList.direction === 'from',
      'wrap-bubble__main': orderInfoList.direction === 'to',
    }"
    class="order"
    @click="goToOrderFn"
  >
    <view
      v-if="
        orderInfoList.type === 'masterCancelInstallation' ||
        orderInfoList.type === 'masterCancelRecovery'
      "
      class="order-title"
      >{{ orderInfoList.content.masterName }} 已取消接单！
    </view>
    <view
      v-if="orderInfoList.type === 'masterInstallation' || orderInfoList.type === 'masterRecovery'"
      class="order-title"
      >{{ orderInfoList.content.masterName }} 已经接单！
    </view>
    <view
      v-if="
        orderInfoList.type === 'garageCancelInstallation' ||
        orderInfoList.type === 'garageCancelRecovery'
      "
      class="order-title"
      >很抱歉，订单已取消
    </view>
    <view class="order-con">
      <view class="order-con__row"> 订单编号：{{ orderInfoList.content.id }}</view>
      <view class="order-con__row"> 下单时间：{{ orderInfoList.content.orderCreateTime }}</view>
      <view class="order-con__row color-block-85">
        服务名称：{{ orderInfoList.content.supportName }}
      </view>
      <view v-if="userInfo.platformCode === 'garage'" class="order-con__row color-block-85">
        支付金额：<span class="row-red">{{ orderInfoList.content.supportAmount }}元</span>
      </view>
      <view v-if="userInfo.platformCode === 'skilledWorker'" class="order-con__row color-block-85">
        支付金额：<span class="row-red">{{ orderInfoList.content.supportAmountWork }}元</span>
      </view>
      <view class="order-con__row color-block-85">
        上门时间：{{ orderInfoList.content.homeStartTime }}
      </view>
    </view>
  </view>
</template>
<script>
  import { mapGetters } from '@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common'

  export default {
    name: 'CheckOrderInfo',
    props: {
      /**
       * orderTitle 标题
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       * orderImage 商品图片
       * orderName 商品名称
       * orderNum 商品数量
       * price 总价
       * name 姓名
       * phone 电话
       * address 地址
       * type 1确认订单 2已确认
       */
      orderInfoList: {
        type: Object,
        default() {
          return { content: {}, direction: 'from' }
        },
      },
    },
    data() {
      return {
        orderDetail: null,
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    created() {
      console.log(this.orderInfoList);
      this.getOrderDetail(this.orderInfoList.content.id)
    },
    methods: {
      getOrderDetail(id) {
        if (this.orderInfoList.messageType === 10) {
          // 安装订单
          this.$VoHttp
            .apiOrderInstallDetail$Id({ id }, { noLoading: true })
            .then((res) => {
              console.log(res.data);
              this.orderDetail = res.data
            })
            .catch((e) => {
              this.$u.toast(e.message || '网络链接失败')
            })
        } else if (this.orderInfoList.messageType === 11) {
          // 回收订单
          this.$VoHttp
            .apiOrderRecycleDetail({ id }, { noLoading: true })
            .then((res) => {
              console.log(res.data);
              this.orderDetail = res.data
            })
            .catch((e) => {
              this.$u.toast(e.message || '网络链接失败')
            })
        }
      },
      /**
       * @description 跳转到订单详情
       */
      goToOrderFn() {
        let url = ''
        if (this.userInfo.platformCode === 'skilledWorker') {
          if(this.orderInfoList.type==='garageCancelInstallation'||this.orderInfoList.type==='garageCancelRecovery'||this.orderInfoList.type==='masterCancelInstallation'||this.orderInfoList.type==='masterCancelRecovery'){
            return;
          }
          //集师傅
          if (this.orderInfoList.content.supportType === 32) {
            //安装
            // 待安装
            // #ifdef H5
            url = `/pagesCommon/MapDrag/MapDrag?title=待安装&origin=1&id=${this.orderInfoList.content.id}`
            // #endif
            // #ifdef APP-PLUS
            url = `/pagesCommon/MapDrag/MapDragApp?title=待安装&origin=1&id=${this.orderInfoList.content.id}`
            // #endif
            this.$store.dispatch('mapDrag/setMapData', this.orderInfoList)
          } else if (this.orderInfoList.content.supportType === 33) {
            // #ifdef H5
            url = `/pagesCommon/MapDrag/MapDrag?title=待上门&origin=2&id=${this.orderInfoList.content.id}`
            // #endif
            // #ifdef APP-PLUS
            url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&origin=2&id=${this.orderInfoList.content.id}`
            // #endif
            //回收
          } else if (this.orderInfoList.content.supportType === 31) {
            //售后
            // 待上门
            // #ifdef H5
            url = `/pagesCommon/MapDrag/MapDrag?title=待上门&origin=3&id=${this.orderInfoList.content.id}`
            // #endif
            // #ifdef APP-PLUS
            url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&origin=3&id=${this.orderInfoList.content.id}`
            // #endif
          }
        } else if (this.userInfo.platformCode === 'garage') {
          // 修理厂
          console.log(this.orderInfoList);
          // return;
          if(this.orderInfoList.type==='garageCancelInstallation'||this.orderInfoList.type==='garageCancelRecovery'||this.orderInfoList.type==='masterCancelInstallation'||this.orderInfoList.type==='masterCancelRecovery'){
            return;
          }

          if (this.orderInfoList.content.supportType === 32) {
            // 安装
            url = `/pagesGarage/InstallOrderUser/OrderDetail?id=${this.orderInfoList.content.id}`
            if (this.orderDetail.orderStatus === 3240) {
              // 待安装跳转地图
              // #ifdef H5
              url = `/pagesCommon/MapDrag/MapDrag?title=待安装&origin=4&id=${this.orderDetail.id}`
              // #endif
              // #ifdef APP-PLUS
              url = `/pagesCommon/MapDrag/MapDragApp?title=待安装&origin=4&id=${this.orderDetail.id}`
              // #endif
            }
          } else if (this.orderInfoList.content.supportType === 33) {
            //回收
            url = `/pagesGarage/RecoveryOrder/RecoveryOrderDetails?id=${this.orderInfoList.content.id}`
            if (this.orderDetail.status === 3340 || this.orderDetail.status === 3341) {
              // 待安装跳转地图
              // #ifdef H5
              url = `/pagesCommon/MapDrag/MapDrag?title=待上门&hideIcon=1&origin=5&id=${this.orderDetail.id}`
              // #endif
              // #ifdef APP-PLUS
              url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&hideIcon=1&origin=5&id=${this.orderDetail.id}`
              // #endif
            }
          } else if (this.orderInfoList.content.supportType === 31) {
            // 售后
            url = `/pagesGarage/PostSaleService/ApplyPostSaleDetail?id=${this.orderInfoList.content.id}`
          }
        }
        console.log(this.orderInfoList.type,"99999999999999");

        this.$linkToEasy(url)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap-bubble {
    background: #fff;
    font-size: 28rpx;
    padding: 24rpx;
    border-radius: 10rpx;
    position: relative;
    max-width: 472rpx;
    width: 472rpx;

    &::before {
      content: '';
      position: absolute;
      left: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-right: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }

  .wrap-bubble__main {
    background: #fff;
    font-size: 28rpx;
    padding: 24rpx;
    max-width: 472rpx;
    width: 472rpx;
    border-radius: 10rpx;
    text-align: left;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      right: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-left: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }

  .order {
    display: inline-block;
    background: #fff;

    &-title {
      margin: 0 24rpx;
      font-weight: bold;
      font-size: 28rpx;
      padding-bottom: 24rpx;
      border-bottom: 2rpx solid #f7f7f8;
    }

    &-con {
      max-width: 100%;
      padding: 24rpx 0rpx 0rpx 0rpx;

      &__row {
        margin: 0 24rpx 12rpx;
        font-size: 24rpx;
        height: 36rpx;
        line-height: 36rpx;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.45);

        &:last-child {
          margin-bottom: 0rpx;
        }
      }
    }

    &-info {
      max-width: 100%;
      margin-left: 24rpx;
      color: $v-c0-45;
    }

    &-button {
      width: 144rpx;
      height: 48rpx;
      line-height: 48rpx;
      border-radius: 30rpx;
      text-align: center;
      font-size: 26rpx;
      margin-top: 20rpx;
      margin-left: auto;
      margin-right: 24rpx;

      &.confirm {
        background: $color-primary-yellow;
        color: #ffffff;
      }

      &.already {
        background: $v-btn-disabled;
        color: $v-c0-25;
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

  .color-block-85 {
    color: rgba(0, 0, 0, 0.85) !important;
  }
  .row-red {
    color: #f20014 !important;
  }
</style>
