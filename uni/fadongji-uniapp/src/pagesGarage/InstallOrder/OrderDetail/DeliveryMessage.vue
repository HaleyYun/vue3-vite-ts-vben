<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="delivery flex flex-column"
  >
    <VoNav isHaveMore title="发货信息" />
    <view class="delivery-orderNum"
      >订单编号：{{ deliverListInfo[0] ? deliverListInfo[0].orderId : '' }}</view
    >
    <view v-for="(delivery, index) in deliverListInfo" :key="index">
      <!--无需物流-->
      <view
        v-if="delivery.deliveryType === '无需物流' || delivery.deliveryType === ''"
        class="delivery-info"
      >
        <view
          class="delivery-info__logistics flex flex-justify-between"
          @click="deliverOpen(delivery)"
        >
          <view class="logistics">厂家配送</view>
          <VoIcon
            v-if="delivery.deliverSelect"
            :size="24"
            name="arrow-top-line"
            style="opacity: 0.25"
          />
          <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
        </view>
        <view v-show="delivery.deliverSelect">
          <view class="delivery-info__line m-b-24" />
          <view class="delivery-info__type flex flex-justify-between">
            <view class="title">发货方式</view>
            <view class="deliverType">{{ delivery.deliveryType }}</view>
          </view>

          <view class="delivery-info__time flex flex-justify-between">
            <view class="title">发货时间</view>
            <view class="time">{{ delivery.createTime }}</view>
          </view>
          <!--识别码,修理厂只有一个-->
          <view class="delivery-info__code">
            <view class="title">识别码</view>
          </view>
          <view class="m-t-20 p-b-20">
            <scroll-view class="scroll" scroll-y="true">
              <view class="code">
                <view v-for="(item, index) in delivery.engineNoList" :key="index">
                  <view class="code-title">{{ item }}</view>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="delivery-info__good">
          <view class="title">包裹中的商品</view>
          <OrderGoodItem
            v-for="(item, index) in delivery.goodsDetail"
            :key="index"
            :good-data="item"
          />
        </view>
      </view>
      <!--物流发货-->
      <view v-else class="delivery-info">
        <view
          class="delivery-info__logistics flex flex-justify-between"
          @click="deliverOpen(delivery)"
        >
          <view class="logistics">{{ delivery.logisticsInfo.deliveryCompany }}:</view>
          <view class="flex flex-vertical-c">
            <view class="number">{{ delivery.logisticsInfo.deliveryNum }}</view>
            <view class="copy" @click.stop="copyClick(delivery.logisticsInfo.deliveryNum)"
              >复制</view
            >
            <VoIcon
              v-if="delivery.deliverSelect"
              :size="24"
              name="arrow-top-line"
              style="opacity: 0.25"
            />
            <VoIcon v-else :size="24" name="arrow-bottom-line" style="opacity: 0.25" />
          </view>
        </view>
        <view v-show="delivery.deliverSelect">
          <view class="delivery-info__line" />
          <view class="delivery-info__photo flex flex-justify-between">
            <view class="title">物流查询电话</view>
            <view class="mobile"> {{ delivery.logisticsInfo.deliveryMobile }} </view>
          </view>
          <view class="delivery-info__type flex flex-justify-between">
            <view class="title">发货方式</view>
            <view class="deliverType">{{ delivery.deliveryType }}</view>
          </view>

          <view class="delivery-info__time flex flex-justify-between">
            <view class="title">发货时间</view>
            <view class="time">{{ delivery.createTime }}</view>
          </view>
          <!--识别码-->
          <view class="delivery-info__code">
            <view class="title">识别码</view>
          </view>
          <view class="m-t-20 p-b-20">
            <scroll-view class="scroll" scroll-y="true">
              <view v-for="(item, index) in delivery.engineNoList" :key="index" class="code">
                <view class="code-title">{{ item }}</view>
              </view>
            </scroll-view>
          </view>
          <view v-if="delivery.logisticsInfo.deliveryPic" class="delivery-info__send">
            <view class="title">发货凭证</view>
            <image
              :src="delivery.logisticsInfo.deliveryPic"
              class="sendImage"
              @click="lookPreviewImage(delivery.logisticsInfo.deliveryPic)"
            />
          </view>
        </view>
        <view class="delivery-info__good">
          <view class="title">包裹中的商品</view>
          <OrderGoodItem
            v-for="(item, index) in delivery.goodsDetail"
            :key="index"
            :good-data="item"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import OrderGoodItem from '../components/OrderGoodItem'

  export default {
    components: {
      OrderGoodItem,
    },
    data() {
      return {
        orderDetail: {},
        deliverListInfo: [],
        logisticsInfo: {},
        //type 1.投资订单 2.销售订单
        type: '1',
        optionOrderId: '',
      }
    },
    onLoad(option) {
      this.optionOrderId = option.id || ''
      this.type = option.type

      if (this.type === '1') {
        this.investGetDeliverDetailRequest()
        return
      }
      this.marketGetDeliverDetailRequest()
    },
    methods: {
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      deliverOpen(good) {
        console.log(good)
        this.deliverListInfo.forEach((item) => {
          if (item.id === good.id) {
            item.deliverSelect = !item.deliverSelect
          }
        })
        this.$forceUpdate()
      },
      //销售订单获取发货详情
      marketGetDeliverDetailRequest() {
        let param = { id: this.optionOrderId }
        this.$VoHttp
          .apiOrderSellSend$Id(param)
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
        let param = { id: this.optionOrderId }
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
        this.deliverInfo = data[0]
        data.forEach((item) => {
          item.deliverSelect = true
          item.logisticsInfo = item.logisticsDetail
          //发动集识别码
          if (item.goodsDetail && item.goodsDetail.length > 0) {
            let engineNoList = []
            item.goodsDetail.forEach((good) => {
              if (good.engineNo && good.engineNo.length > 0) {
                good.engineNo.forEach((engineNo) => {
                  engineNoList.push(engineNo)
                  item.engineNoList = engineNoList
                })
              }
            })
          }
          this.deliverListInfo.push(item)
        })
      },
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
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
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-info {
      background-color: #ffffff;
      padding: 0rpx 32rpx;
      margin-bottom: 28rpx;

      &__logistics {
        padding-top: 28rpx;
        font-size: 28rpx;
        color: &v-c0-85;

        .copy {
          padding-right: 17rpx;
          color: #0d66ff;
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
          color: #0d66ff;
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
  .code {
    //display: flex;
    // grid-row-gap: 38rpx;
    // grid-column-gap: 20rpx;
    // grid-template-columns: 320rpx 320rpx;
    &-title {
      padding: 0 32rpx;
      display: inline-block;
      background-color: #f6f7f8;
      border-radius: 4rpx;
      font-size: 28rpx;
      line-height: 46rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      word-break: break-all;
    }
  }
  .scroll {
    max-height: 240rpx;
    background: #ffffff;
  }
</style>
