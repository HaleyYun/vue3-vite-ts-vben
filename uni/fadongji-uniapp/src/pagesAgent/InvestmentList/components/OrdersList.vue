<template>
  <view class="order">
    <block v-if="!disabled">
      <view class="order-list">
        <view
          v-for="(good, goodIndex) of cartDetailstList"
          :key="goodIndex"
          @click="goGoodDetail(good)"
        >
          <view class="flex flex-vertical-t p-t-24">
            <view class="fz-b fz-26 m-r-16 color-block"
              >{{ good.warehouseName || info.cityName }}发货</view
            >
<!--            <view class="fz-24 color-block-45"-->
<!--              >预计-->
<!--              <text class="color-red">{{-->
<!--                info.arrivalTime || formateTime(good.arrivalTime) || '&#45;&#45;'-->
<!--              }}</text-->
<!--              >送达</view-->
<!--            >-->
          </view>
          <view class="flex m-t-16">
            <block v-if="good.pic">
              <image
                v-if="good.pic.split('.').pop() === 'mp4'"
                :src="good.pic + '&type=3'"
                class="order-img"
              />
              <image v-else :src="good.pic + '&type=1'" class="order-img" />
            </block>

            <block v-else-if="good.pricture && good.pricture.length">
              <image
                v-if="good.pricture[0].split('.').pop() === 'mp4'"
                :src="good.pricture[0] + '&type=3'"
                class="order-img"
              />
              <image v-else :src="good.pricture[0] + '&type=1'" class="order-img" />
            </block>
            <image v-else src="/static/default_logo.png" class="order-img" />
            <view class="flex1">
              <view class="fz-b fz-32 lh48 color-block overTwoEllipsis">
                <text v-show="good.categoryType" class="good-tips m-r-8">{{
                  good.categoryType
                }}</text>
                {{ good.goodsName }}
              </view>
              <view class="flex">
                <view class="order-free order-stock m-t-8">{{
                  Number(good.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-justify-between flex-vertical-c m-t-16">
                <!--   金额   -->
                <view class="flex flex-vertical-c">
                  <view class="order-cash m-r-8">
                    <text v-if="Number(good.isCash) === 1"> 现金价 </text>
                    <text v-else>{{
                      (good.accountPeriodDays || good.accountPeriodTime) + '天账期'
                    }}</text>
                  </view>
                  <view class="color-red lh42">
                    <VoPointPrice
                      :price="Number(good.isCash) === 1 ? good.cashPrice : good.accountPrice"
                      :show-unit="true"
                    />
                  </view>
                </view>
                <!--     商品在该地区暂不支持购买     -->
                <!--     <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>     -->
                <view class="lh40 color-block-45 fz-26">X{{ good.investmentNum }}</view>
              </view>
              <view v-if="good.warehouseNum < good.investmentNum" class="order-inventory"
                >库存不足</view
              >
            </view>
          </view>
          <view class="flex flex-justify-between fz-28 lh150 m-t-24" @click="toRemark(good)">
            <view class="color-block">备注：</view>
            <view class="flex flex-vertical-c remark-w-600 flex-justify-r">
              <view class="color-block-65 m-l-8 m-r-8 overEllipsis flex1">{{
                good.remark || '请先和厂家协商一致'
              }}</view>
              <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
            </view>
          </view>
        </view>
      </view>
    </block>
    <view v-if="disabled" class="order-list">
      <view class="flex">
        <image class="order-img" src="/static/demo/rectangle.png" />
        <view class="flex1">
          <view class="fz-b fz-32 lh48 color-block-45">
            {{ good.goodsName }}
          </view>
          <view class="flex">
            <view class="order-free order-noStock m-t-8">{{
              Number(good.shippingType) === 1 ? '包邮' : '到付'
            }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-16">
            <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>
            <view class="lh40 color-block-45 fz-26">X{{ good.goodsNum }}</view>
          </view>
          <!-- <view class="order-inventory">库存紧张</view> -->
        </view>
      </view>
      <view class="flex flex-justify-between fz-28 lh150 m-t-24" @click="toRemark(good)">
        <view class="color-block">备注：</view>
        <view class="flex flex-vertical-c remark-w-600 flex-justify-r flex-justify-between">
          <view class="color-block-65 m-l-8 m-r-8 overEllipsis flex1">{{
            good.remark || '请先和厂家协商一致'
          }}</view>
          <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrdersList',
    props: {
      info: {
        type: Object,
        require: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        cartDetailstList: [],
        remarkData: '',
      }
    },
    // watch: {
    //   info: {
    //     deep: true,
    //     handler(newVal) {
    //       this.cartDetailstList = newVal.cartDetailstList
    //     },
    //   },
    // },
    mounted() {
      this.cartDetailstList = this.info.cartDetailstList
      console.log('this.cartDetailstList', this.cartDetailstList)
      uni.$on('setContent', (res) => {
        console.log('agentRemark22', res, this.remarkData)
        // let remarkData = this.$storage.get('remarkData')
        if (res) {
          // this.$emit('getRemark', this.remark)
          this.cartDetailstList.forEach((data) => {
            if (data.id === this.remarkData.id) {
              data.remark = res
            }
          })
          this.$forceUpdate()
        }
      })
    },
    methods: {
      formateTime(day) {
        console.log(day)
        let val = day * 24
        if (val <= 12) {
          return '12小时内'
        } else if (val <= 24) {
          return '24小时内'
        } else if (val <= 36) {
          return '36小时内'
        } else if (val <= 48) {
          return '48小时内'
        } else {
          return this.$vocenApi.dayjs().add(parseInt(day), 'day').format('MM月DD日')
        }
      },
      toRemark(data) {
        // this.$storage.set('remarkData', data)
        this.remarkData = data
        this.$linkToEasy(
          '/pagesOldBuyer/CartModule/OrderRemark?data=' + JSON.stringify(this.info) + '&sign=agent',
        )
      },
      toInvest() {
        this.$emit('toInvest')
      },
      goGoodDetail(good) {
        console.log(good);
        if (good.queryType) {
          this.$linkToEasy(`/pagesAgent/InvestmentList/ProjectDetails?id=${good.id}&queryType=${good.queryType}`)
          return
        }
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsDetail?id=${good.goodsId}&wid=${good.warehouseId}&companyId=${
            good.companyId || 0
          }`,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    //border-bottom: 2rpx solid $v-bg-light;
    &-list {
      padding: 0 32rpx 24rpx 0;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-img {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }
    &-free {
      height: 36rpx;
      line-height: 36rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      border-radius: 8rpx;
    }
    &-stock {
      color: $v-c0-85;
      background: #f7f7f8;
    }
    &-noStock {
      border: 2rpx solid rgba(0, 0, 0, 0.45);
      color: $v-c0-45;
    }
    &-cash {
      font-size: 24rpx;
      color: #ec404d;
      line-height: 28rpx;
      padding: 2rpx 4rpx;
      box-sizing: border-box;
      background: #fdf2f3;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
    }
    &-inventory {
      line-height: 36rpx;
      margin-top: 4rpx;
      font-size: 24rpx;
      color: #e50012;
      text-align: right;
    }
  }
  .remark-w-600 {
    width: 600rpx;
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
