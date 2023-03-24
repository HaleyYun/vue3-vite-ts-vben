<template>
  <view class="product">
    <view class="product-title">项目信息</view>
    <view class="product-info">商品别称：
      <text v-show="productData.categoryType" class="good-tips m-r-8">{{productData.categoryType}}</text>
      {{ productData.name }}
    </view>
    <view class="product-tip">
      <view class="tag">{{ productData.shippingType === 1 ? '包邮' : '到付' }}</view>
<!--      <view class="tip">现在下单-->
<!--      注释发货时效  -->
<!--        ，预计{{ arrivalTime }}送达-->
<!--      </view>-->
    </view>
    <view class="product-content">
      <block v-for="(item, index) in list" :key="index">
        <view
          v-if="
            item.name === '30天账期' &&
            productData.accountPeriodDays > 0 &&
            productData.accountPrice > 0
          "
          class="product-content__item"
        >
          <block>
            <view class="price">
              <VoPointPrice
                v-if="productData.accountPrice"
                :price="productData.accountPrice"
                :show-unit="true"
                color="#FF5319"
              />
              <text v-else>--</text>
            </view>
            <view class="title"> {{ productData.accountPeriodDays }}天账期 </view>
          </block>
        </view>

        <view v-else-if="item.name === '已售量/总量'" class="product-content__item">
          <view class="price">
            {{ productData.alreadyInvestedNum || 0 }}/{{ productData.totalInvestment }}
          </view>
          <view class="title"> {{ item.name }} </view>
        </view>
        <view v-else-if="item.name === '起批要求'" class="product-content__item">
          <view class="price">
            {{ productData.startNumber }}-{{ productData.investmentLimit }}
          </view>
          <view class="title"> {{ item.name }} </view>
        </view>
        <view v-else-if="item.name !== '30天账期'" class="product-content__item">
          <view class="price">
            <VoPointPrice
              v-if="item.value === 'cashPrice'"
              :price="productData.cashPrice"
              color="#FF5319"
            />
            <text v-else>{{ productData[item.value] }}</text>
            <text v-if="item.value === 'rol'">%</text>
          </view>
          <view class="title flex flex-vertical-c">
            {{ item.name }}
            <VoTooltip v-if="item.value === 'rol'" :conLeft="15" :padding="8" placement="bottom">
              <view slot="content">
                <view>具体回报率以实际收益</view>
                <view>为准</view>
              </view>
              <VoIcon :opacity="0.45" :size="16" color="#000000" name="account-question" />
            </VoTooltip>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProductInfo',
    props: {
      productData: {
        type: Object,
        productData: {},
      },
    },
    data() {
      return {
        list: [
          {
            name: '现金价',
            value: 'cashPrice',
          },
          {
            name: '30天账期',
            value: 'accountPrice',
          },
          {
            name: '回报率',
            value: 'rol',
          },
          {
            name: '已售量/总量',
            value: '',
          },
          {
            name: '起批要求',
            value: '',
          },
          {
            name: '发货仓库',
            value: 'warehouseName',
          },
        ],
        arrivalTime: '未知',
      }
    },
    created() {
      if (this.productData.arrivalTime) {
        let nowDate = new Date()
        //后台返回的是天数，转换为日期
        let num = Number(this.productData.arrivalTime)
        // 24小时毫秒数
        let dayStamp = 24 * 60 * 60 * 1000
        let nextDate = new Date(nowDate.getTime() + num * dayStamp)
        this.arrivalTime = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'yyyy-mm-dd')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product {
    padding: 24rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-title {
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-info {
      margin-top: 16rpx;
      color: $v-c0-85;
      font-size: 26rpx;
    }
    &-tip {
      display: flex;
      align-items: center;
      padding-top: 8rpx;
      .tag {
        width: 80rpx;
        height: 36rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24rpx;
        line-height: 36rpx;
        margin-right: 16rpx;
        text-align: center;
      }
      .tip {
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
      }
    }
    &-content {
      margin-top: 16rpx;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: 16rpx;
      grid-column-gap: 20rpx;

      &__item {
        width: 216rpx;
        padding: 8rpx 0;
        background: #f7f7f8;
        border-radius: 8rpx;

        .price {
          color: $color-primary-yellow;
          font-weight: bold;
          font-size: 28rpx;
          text-align: center;
          padding-top: 4rpx;
        }
        .title {
          margin-top: 8rpx;
          font-size: 24rpx;
          text-align: center;
          color: $v-c0-65;
          padding-bottom: 8rpx;
          justify-content: center;
          align-items: center;
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
