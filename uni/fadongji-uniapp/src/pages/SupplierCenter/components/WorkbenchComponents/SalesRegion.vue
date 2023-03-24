<template>
  <view class="area">
    <view class="area-title">销售区</view>
    <view class="area-bottom">
      <view
        v-for="(info, index) in salesRegion"
        :key="index"
        class="area-bottom__block"
        @click="nextPage(info)"
      >
        <view class="block-left lh140 fz-b fz-32 color-block">
          <view class="news"
            >{{ info.name }}
            <VoBadge
              v-if="count && info.path == '/pagesAgent/Order/MarketOrder/MarkerOrderList'"
              :value="count"
              class="news-badge"
              max="99" /></view
        ></view>

        <image :src="info.srcImg" class="block-img" />
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn } from '@/common/helper'

  export default {
    name: 'SalesRegion',
    props: {
      count: {
        type: [Number, String],
        default: 0,
      },
    },
    data() {
      return {
        salesRegion: [
          {
            name: '代客下单',
            srcImg: '/static/supplier/home/sales_region1.png',
            path: '/pagesAgent/SubstituteOrder/SubstituteOrder',
          },
          {
            name: '商品管理',
            srcImg: '/static/supplier/home/sales_region2.png',
            path: '/pagesAgent/GoodsManage/MyGoods',
          },
          {
            name: '销售订单',
            srcImg: '/static/supplier/home/sales_region5.png',
            path: '/pagesAgent/Order/MarketOrder/MarkerOrderList',
          },
          {
            name: '应收账款',
            srcImg: '/static/supplier/home/sales_region3.png',
            path: '/pagesAgent/UserCenter/MyAccount/MyAccount',
          },
          {
            name: '退货/退款',
            srcImg: '/static/supplier/home/sales_region4.png',
            path: '/pagesAgent/Order/ReturnExchange/ReturnExchange',
            // path: '/pagesAgent/Order/ReturnExchange/ReturnExchange?type=' + 1,
          },
          // {
          //   name: '售后专区',
          //   srcImg: '/static/supplier/home/after_hosting.png',
          //   path: '',
          // },
        ],
      }
    },
    created() {
      // this.bindingInviterEexist()
    },
    methods: {
      nextPage(info) {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        this.$linkToEasy(info.path)
      },
      /**
       * 寄售订单
       */
      bindingInviterEexist() {
        this.$VoHttp
          .apiCompanyBindingInviterExist()
          .then((res) => {
            if (res.code === '20001') {
              if (res.data) {
                let param = {
                  name: '寄售订单',
                  srcImg: '/static/supplier/home/sales_region5.png',
                  path: '/pagesAgent/Order/DistributionOrder/DistributionOrderList',
                }
                this.salesRegion.push(param)
              }
            }
          })
          .catch((err) => {})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .area {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    &-title {
      padding: 32rpx;
      box-sizing: border-box;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-bottom {
      padding: 0 24rpx 32rpx;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 310rpx 310rpx;
      grid-column-gap: 18rpx;
      grid-row-gap: 24rpx;
      &__block {
        position: relative;
        width: 310rpx;
        height: 140rpx;
        background: #fef9f1;
        border-radius: 16rpx;
        overflow: hidden;
        .block-left {
          margin-left: 24rpx;
        }
        .block-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 136rpx;
          height: 140rpx;
          z-index: 1;
        }
      }
    }
  }
  .news {
    position: relative;
  }
  .news-badge {
    position: absolute;
    top: 40rpx;
    right: 120rpx;
  }
</style>
