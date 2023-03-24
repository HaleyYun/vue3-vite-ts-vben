<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="delivery flex flex-column"
  >
    <VoNav isHaveMore title="发货信息" />
    <block v-for="(item, index) in deliverInfo">
      <view class="delivery-orderNum">订单编号：{{ item.orderId }}</view>
      <!--无需物流-->
      <view
        v-if="item.deliveryType === '无需物流' || item.deliveryType === ''"
        class="delivery-info"
        :key="'a' + index"
      >
        <view class="delivery-info__logistics flex flex-justify-between" @click="deliverOpen(item)">
          <view class="logistics p-b-20">无包裹发货</view>
          <VoIcon v-if="item.deliverSelect" :size="24" name="arrow-top-line" style="opacity: 0.25" />
          <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
        </view>
        <view v-show="item.deliverSelect">
          <view class="delivery-info__line" />
          <view class="delivery-info__type flex flex-justify-between m-t-10">
            <view class="title">发货方式</view>
            <view class="deliverType">{{ item.deliveryType }}</view>
          </view>

          <view class="delivery-info__time flex flex-justify-between">
            <view class="title">发货时间</view>
            <view class="time">{{ item.createTime }}</view>
          </view>
        </view>

        <view class="delivery-info__good" v-if="item.goodsDetail">
          <view class="title">包裹中的商品</view>
          <OrderGoodItem
            v-for="(item, index) in item.goodsDetail"
            :key="index"
            :good-data="item"
          />
        </view>
      </view>
      <!--物流发货-->
      <view :key="'b' + index" v-else class="delivery-info">
        <view class="delivery-info__logistics p-b-20 flex flex-justify-between" @click="deliverOpen(item)">
          <view class="logistics flex flex-vertical-c">
            <view>{{ item.logisticsDetail.deliveryCompany }}:</view>
            <view class="number">{{ item.logisticsDetail.deliveryNum }}</view>
            <view class="copy" @click.stop="copyClick(item.logisticsDetail.deliveryNum)">复制</view>
          </view>
          <view class="flex flex-vertical-c">
            <VoIcon v-if="item.deliverSelect" :size="24" name="arrow-top-line" style="opacity: 0.25" />
            <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
          </view>
        </view>
        <!-- 展开的详情没有字段 -->
        <view v-show="item.deliverSelect">
          <view class="delivery-info__line" />

          <view class="delivery-info__type flex flex-justify-between m-t-20">
            <view class="title">发货方式</view>
            <view class="deliverType">{{ item.deliveryType }}</view>
          </view>
          <view class="delivery-info__photo flex flex-justify-between">
            <view class="title">物流公司</view>
            <view class="mobile"> {{ item.logisticsDetail.company || item.logisticsDetail.deliveryCompany }} </view>
          </view>
          <view class="delivery-info__photo flex flex-justify-between">
            <view class="title">物流查询电话</view>
            <view class="mobile"> {{ item.logisticsDetail.mobile || item.logisticsDetail.deliveryMobile }} </view>
          </view>
          <view class="delivery-info__time flex flex-justify-between">
            <view class="title">发货时间</view>
            <view class="time">{{ item.createTime }}</view>
          </view>

          <!--        <view class="delivery-info__code flex flex-justify-between" v-if="deliverInfo.goodsDetail">-->
          <!--          <view class="title">识别码</view>-->
          <!--          <view class="code">-->
          <!--            <view v-for="(item, index) of deliverInfo.goodsDetail[0].engineNo" :key="index">{{-->
          <!--              item-->
          <!--            }}</view>-->
          <!--          </view>-->
          <!--        </view>-->

          <view v-if="item.logisticsDetail.deliveryPic" class="delivery-info__send">
            <view class="title">发货凭证</view>
            <image
              :src="item.logisticsDetail.deliveryPic + '&type=1'"
              class="sendImage"
              @click="previewImage([item.logisticsDetail.deliveryPic])"
            />
          </view>
        </view>
        <view class="delivery-info__good" v-if="item.goodsDetail">
          <view class="title">包裹中的商品</view>
          <OrderGoodItem
            v-for="(item, index) in item.goodsDetail"
            :key="index"
            :good-data="item"
            :is-pre-sale="orderDetail.isPreSale"
          />
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import OrderGoodItem from '../components/OrderGoodItem'
  import { showLoading, hideLoading } from '@/common/helper'
  export default {
    components: {
      OrderGoodItem,
    },
    data() {
      return {
        orderDetail: {},
        deliverInfo: [
          {
            logisticsDetail: {},
          },
        ],
        orderId: '',
        type: '',
      }
    },
    onLoad(option) {
      this.orderId = option.data
      this.type = option.type || ''
      // this.deliverInfo = this.orderDetail
      // this.deliverInfo.deliveryType = '无需物流'
      // this.deliverInfo.createTime = '2022-08-10 14:07:55'
      // this.item.logisticsDetail = this.orderDetail
      // this.item.logisticsDetail.orderNumber = '6666666666666666'
      // this.item.logisticsDetail.mobile = '13639612345'
      // this.item.logisticsDetail.deliveryType = '物流发货'
      if (+this.type === 1) {
        this.investGetDeliverDetailRequest()
        return
      }
      this.marketGetDeliverDetailRequest()
    },
    methods: {
      previewImage(val) {
        uni.previewImage({ urls: val, current: 0 })
      },
      deliverOpen(item) {
        console.log(item);
        item.deliverSelect = !item.deliverSelect
      },
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: String(orderNumber)
        })
      },
      //销售订单获取发货详情
      marketGetDeliverDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderOldSend$Id(param)
          .then((res) => {
            if (+res.code === 20001) {
              this.deliverDetailProcessData(res.data)
            } else {
              uni.$u.toast(res.message || '发货详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '发货详情获取失败')
          })
      },
      //投资订单发货详情
      investGetDeliverDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderInvestSend$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.deliverDetailProcessData(res.data)
            } else {
              uni.$u.toast(res.message || '发货详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货详情获取失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      //处理发货信息
      deliverDetailProcessData(data) {
        console.log(data)
        try {
          data.forEach((item, index) => {
            if (index === 0) {
              item.deliverSelect = true
            } else {
              item.deliverSelect = false
            }
          })
          this.deliverInfo = data
        } catch (e) {
          console.log(e);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .delivery {
    width: 750rpx;
    height: 100vh;
    &-orderNum {
      margin: 24rpx 32rpx;
      color: $v-c0-65;
      font-size: 28rpx;
    }

    &-info {
      background-color: #ffffff;
      padding: 0rpx 32rpx;

      &__logistics {
        margin-top: 28rpx;
        font-size: 28rpx;
        color: &v-c0-85;

        .copy {
          padding-right: 17rpx;
          color: $v-tip;
          font-size: 28rpx;
        }
        .number {
          padding-right: 8rpx;
          color: $v-c0-65;
          font-size: 28rpx;
        }
      }
      &__line {
        height: 2rpx;
        background-color: $v-bg-light;
        width: 100%;
      }
      &__photo {
        padding-bottom: 16rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
        }
        .mobile {
          color: $v-c0-45;
          font-size: 28rpx;
        }
      }
      &__type {
        padding-bottom: 16rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
        }
        .content {
          color: $v-tip;
          font-size: 28rpx;
          padding-left: 8rpx;
          //超出隐藏
          overflow-x: hidden;
          //溢出显示
          text-overflow: ellipsis;
          //文本一行不换行直到遇到换行符
          white-space: nowrap;
        }
        .deliverType {
          color: $v-c0-65;
          font-size: 28rpx;
          padding-left: 8rpx;
        }
      }
      &__time {
        padding-bottom: 16rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
        }
        .time {
          color: $v-c0-45;
          font-size: 28rpx;
          padding-left: 8rpx;
        }
      }
      &__code {
        padding-bottom: 16rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
        }
        .code {
          color: $v-c0-45;
          font-size: 28rpx;
          padding-left: 8rpx;
        }
      }
      &__send {
        padding-bottom: 24rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
        }
        .sendImage {
          margin-top: 24rpx;
          width: 218rpx;
          height: 218rpx;
          border-radius: 8rpx;
        }
      }
      &__good {
        padding-bottom: 32rpx;

        .title {
          color: $v-c0-85;
          font-size: 28rpx;
          padding-bottom: 24rpx;
        }
      }
    }
  }
</style>
