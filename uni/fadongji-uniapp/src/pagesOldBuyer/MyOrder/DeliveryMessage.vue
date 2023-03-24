<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="delivery flex flex-column"
  >
    <VoNav isHaveMore title="发货信息" />
    <view v-if="deliverInfo && deliverInfo.length">
      <view class="delivery-orderNum">订单编号：{{ id }}</view>
      <block v-for="(item, index) in deliverInfo">
        <!--无需物流-->
        <view
          :key="`a${index}`"
          v-if="item.deliveryType === '无需物流' || item.deliveryType === ''"
          class="delivery-info"
        >
          <view class="delivery-info__logistics flex flex-justify-between" @click="deliverOpen(item)">
            <view class="logistics">无包裹发货</view>
            <VoIcon v-if="item.deliverSelect" :size="24" name="arrow-top-line" style="opacity: 0.25" />
            <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
          </view>
          <view v-show="item.deliverSelect">
            <view class="delivery-info__line" />
            <view class="delivery-info__type flex flex-justify-between">
              <view class="title">发货方式</view>
              <view class="deliverType">{{ item.deliveryType }}</view>
            </view>

            <view class="delivery-info__time flex flex-justify-between">
              <view class="title">发货时间</view>
              <view class="time">{{ item.createTime }}</view>
            </view>
            <!--todao 先去除，后端也没有返回字段-->
            <!--<view class="delivery-info__code flex flex-justify-between">-->
            <!--<view class="title">识别码</view>-->
            <!--<view class="code">-->
            <!--<view>CZ345656777888</view>-->
            <!--<view>CZ345656777888</view>-->
            <!--<view>CZ345656777888</view>-->
            <!--</view>-->
            <!--</view>-->
          </view>

          <view class="delivery-info__good">
            <view class="title">包裹中的商品</view>
            <OrderGoodItem v-for="(it, ind) in item.goodsDetail" :key="ind" :good-data="it" />
          </view>
        </view>
        <!--物流发货-->
        <view v-else :key="`b${index}`" class="delivery-info">
          <view class="delivery-info__logistics flex flex-justify-between" @click="deliverOpen(item)">
            <view class="logistics">{{ item.logisticsInfo.deliveryCompany }}:</view>
            <view class="flex flex-vertical-c">
              <view class="number">{{ item.logisticsInfo.deliveryNum }}</view>
              <view class="copy" @click.stop="copyClick(item.logisticsInfo.deliveryNum)">复制</view>
              <VoIcon v-if="item.deliverSelect" :size="24" name="arrow-top-line" style="opacity: 0.25" />
              <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
            </view>
          </view>
          <view v-show="item.deliverSelect">
            <view class="delivery-info__line" />
            <view class="delivery-info__photo flex flex-justify-between">
              <view class="title">物流查询电话</view>
              <view class="mobile"> {{ item.logisticsInfo.deliveryMobile }} </view>
            </view>
            <view class="delivery-info__type flex flex-justify-between">
              <view class="title">发货方式</view>
              <view class="deliverType">{{ item.deliveryType === 1 ? '包邮' : '到付' }}</view>
            </view>

            <view class="delivery-info__time flex flex-justify-between">
              <view class="title">发货时间</view>
              <view class="time">{{ item.createTime }}</view>
            </view>

            <view v-if="item.logisticsInfo.deliveryPic" class="delivery-info__send">
              <view class="title">发货凭证</view>
              <image :src="item.logisticsInfo.deliveryPic" class="sendImage" />
            </view>
          </view>
          <view class="delivery-info__good">
            <view class="title">包裹中的商品</view>
            <OrderGoodItem
              v-for="(it, ind) in item.goodsDetail"
              :key="'c' + ind"
              :good-data="it"
            />
          </view>
        </view>
      </block>
    </view>
    <view v-else class="noData">
      <VoNoData />
    </view>
  </view>
</template>

<script>
  import OrderGoodItem from './components/OrderGoodItem'

  export default {
    components: {
      OrderGoodItem,
    },
    data() {
      return {
        id: {},
        deliverInfo: [],
        logisticsInfo: {},
        //发货详情下拉
        deliverSelect: false,
      }
    },
    onLoad(option) {
      this.id = option.id
      this.marketGetDeliverDetailRequest()
    },
    methods: {
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      deliverOpen(item) {
        item.deliverSelect = !item.deliverSelect
        this.$forceUpdate()
      },
      //销售订单获取发货详情
      marketGetDeliverDetailRequest() {
        let param = { id: this.id }
        this.$VoHttp
          .apiOrderOldSend$Id(param)
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
      },
      //投资订单发货详情
      investGetDeliverDetailRequest() {
        let param = { id: this.id }
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
      },
      //处理发货信息
      deliverDetailProcessData(data) {
        console.log(data)
        this.deliverInfo = data
        try {
          this.deliverInfo.forEach((item) => {
            if (item.logisticsDetail instanceof String) {
              item.logisticsInfo = JSON.parse(item.logisticsDetail)
            } else {
              item.logisticsInfo = item.logisticsDetail
            }
          })
        } catch (e) {
          console.log(e)
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
      box-sizing: border-box;
      border: 1rpx solid transparent;
      margin-bottom: 28rpx;
      &__logistics {
        padding: 28rpx 0;
        box-sizing: border-box;
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
        margin-top: 20rpx;
        background-color: $v-bg-light;
        width: 100%;
      }
      &__photo {
        padding-top: 24rpx;
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
  .noData {
    flex-grow: 1;
    background: #fff;
  }
</style>
