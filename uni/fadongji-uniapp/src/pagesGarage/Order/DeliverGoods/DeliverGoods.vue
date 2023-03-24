<template>
  <view class="deliver flex flex-column">
    <VoNav is-fixed title="发货">

    </VoNav>
    <view class="flex1 overflow-y">
      <!--   订单   -->
      <view class="deliver-order flex flex-justify-between flex-vertical-c">
        <view class="deliver-order__info">
          <view>订单号：{{ orderData.id }}</view>
          <view class="m-t-8">
            <text>{{ orderData.warehouseName }}：</text>
            <text class="info-red">{{ orderData.predictDeliveryTime }}之前发货</text>
          </view>
        </view>
        <VoIcon color="#EE0A24" name="scan" @click="scanCodeClick" />
      </view>
      <!--   商品信息   -->
      <view v-for="(item, index) in orderData.goodsDetail" :key="index" class="deliver-goods">
        <view class="p-t-26 flex">
          <image :src="item.pic[0]" class="deliver-goods__img" />
          <view class="flex1 m-l-16">
            <view class="deliver-goods__name">{{ item.goodsName }}</view>
            <view class="flex color-gray m-t-8">
              <view>
                <view class="flex">
                  <view class="fz-28 flex flex-vertical-c">
                    <VoPointPrice :price="item.originalPrice.toString()" color="" />
                    <view class="price">元</view>
                  </view>
                </view>
                <view class="fz-22 m-t-8">现金价(元)</view>
              </view>
              <!--              <view class="m-l-44">-->
              <!--                <view class="flex flex-vertical-t">-->
              <!--                  <view class="fz-b fz-28">11400</view>-->
              <!--                  <view class="fz-22">.00</view>-->
              <!--                </view>-->
              <!--                <view class="fz-22 m-t-8">投资价(元)</view>-->
              <!--              </view>-->
              <view class="deliver-goods__num flex1 fz-b fz-28">x1</view>
            </view>
          </view>
        </view>
        <view class="p-t-36 p-b-36 flex flex-vertical-c">
          <view class="fz-26 color-gray">已添加数量：1</view>
          <view class="deliver-goods__label m-l-20">
            <view>UINV89898789787</view>
            <image class="label-icon" src="/static/created/product/delete.png" />
          </view>
        </view>
      </view>
      <!--   收货信息   -->
      <view class="deliver-info">
        <view class="deliver-info__title">收货信息</view>
        <view class="deliver-info__information">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="information-people flex flex-vertical-c">
              <view>{{ orderAddress.name }}</view>
              <view>{{ orderAddress.phone }}</view>
            </view>
            <view class="information-copy" @click="copyClick">复制</view>
          </view>
          <view class="m-t-8 fz-28 color-block">
            {{ orderAddress.addressDetail }}
          </view>
        </view>
      </view>
      <!--   发货方式   -->
      <view class="deliver-info">
        <view class="deliver-info__title">发货方式</view>
        <EraRadioGroup
          v-model="radioValue"
          class="deliver-info__group"
          placement="column"
          @change="groupChange"
        >
          <EraRadio
            v-for="(item, index) in radioList"
            :key="index"
            :customStyle="{ paddingBottom: '10px', paddingTop: '10px' }"
            :disabled="item.disabled"
            :iconSize="14"
            :label="item.name"
            :name="item.name"
            @change="radioChange"
          />
        </EraRadioGroup>
        <view v-if="isLogistics">
          <view class="deliver-info__proof">
            <text class="proof-red m-r-4">*</text>
            发货凭证：
          </view>
          <view class="deliver-info__pictures">
            <VoUpload
              :fileList="fileList1"
              :maxCount="1"
              :previewFullImage="true"
              height="109"
              multiple
              name="1"
              width="109"
              @success="uploadSuccess"
            >
              <image class="pictures-img" mode="widthFix" src="/static/created/product/group.png" />
            </VoUpload>
          </view>
          <view class="deliver-info__Logistics">
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view class="color-block">运单号：</view>
              <view class="color-gray flex flex-vertical-c">
                <input v-model="orderNumber" class="m-r-8 orderNumber" type="text" />
                <VoIcon color="#EE0A24" name="scan" />
              </view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view class="color-block">物流公司：</view>
              <view class="color-gray">德邦</view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="color-block">物流公司查询电话：</view>
              <input v-model="mobileModel" class="m-r-8 color-gray orderNumber" type="text" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--   底部固定   -->
    <view class="deliver-bottom">
      <view class="p-b-safe-area" />
      <EraButton circle text="发货" @click="deliverGoods" />
    </view>
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  export default {
    name: 'DeliverGoods',
    data() {
      return {
        orderNumber: '3564456674476544',
        mobileModel: '010-3452345',
        radioValue: '无需物流',
        // 基本案列数据
        radioList: [
          {
            name: '无需物流',
            disabled: false,
            type: 1,
          },
          {
            name: '物流发货',
            disabled: false,
            type: 2,
          },
        ],
        //是否是需要物流
        isLogistics: false,
        fileList1: [],
        //订单数据
        orderData: {},
        //地址信息
        orderAddress: {},
        //物流信息
        logisticsData: {},
        logisticsUrl: '',
        //type 1.投资订单 2.销售订单
        type: '1',
      }
    },
    onLoad(option) {
      this.orderData = JSON.parse(option.data)
      this.type = option.type
      //地址信息
      this.orderAddress = this.orderData.orderAddress
    },
    methods: {
      /**
       * 点击发货按钮
       */
      deliverGoods() {
        let goodsDetail = this.orderData.goodsDetail
        let param = {
          goodsDetail: goodsDetail,
          orderId: this.orderData.id,
          deliveryType: this.radioValue,
        }
        if (this.isLogistics) {
          if (this.logisticsUrl === '') {
            this.$u.toast('请上传发货凭证')
            return
          }

          if (this.orderNumber === '') {
            this.$u.toast('运单号')
            return
          }

          this.logisticsData.logisticsUrl = this.logisticsUrl
          this.logisticsData.orderNumber = this.orderNumber
          if (this.mobileModel) {
            this.logisticsData.mobile = this.mobileModel
          }
          this.logisticsData.company = '德邦'

          param.logisticsDetail = this.logisticsData
        }

        if (this.type === '1') {
          this.investDeliverGood(param)
          return
        }
        this.marketDeliverGood(param)
      },
      //投资订单发货
      investDeliverGood(param) {
        this.$VoHttp
          .apiOrderInvestDelivery({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('发货成功')
              setTimeout(() => {
                this.$linkToEasy(
                  '/pagesSupplier/Order/OrderDetail/InvestDetail?id=' + this.orderData.id,
                )
              }, 1500)
            } else {
              uni.$u.toast('发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
          })
      },
      //销售订单发货
      marketDeliverGood(param) {
        this.$VoHttp
          .apiOrderSellDelivery({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('发货成功')
              setTimeout(() => {
                this.$linkToEasy(
                  '/pagesSupplier/Order/OrderDetail/OrderDetail?id=' + this.orderData.id,
                )
              }, 1500)
            } else {
              uni.$u.toast('发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
          })
      },
      copyClick() {
        uni.setClipboardData({
          data: this.orderAddress.phone,
        })
      },
      /**
       * 任一个radio状态发生变化时触发
       * @param n
       */
      groupChange(n) {
        console.log('groupChange', n)
      },
      /**
       * 某个radio状态发生变化时触发(选中状态)
       * @param n
       */
      radioChange(n) {
        console.log('radioChange', n)

        if (n === '无需物流') {
          this.isLogistics = false
        } else {
          this.isLogistics = true
        }
      },
      uploadSuccess(res) {
        this.logisticsUrl = res[0].url
      },
      /**
       * 扫码发货
       */
      scanCodeClick() {
        this.$u.toast('功能暂未开发')
        return
        this.$linkToEasy('/pagesSupplier/Order/OrderDetail/ScanCodeDelivery')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .deliver {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    &-order {
      margin-top: 16rpx;
      padding: 18rpx 32rpx;
      background: #ffffff;

      &__info {
        font-size: 28rpx;
        color: $v-c0-85;
        line-height: 150%;

        .info-red {
          color: $color-primary-red;
        }
      }
    }

    &-goods {
      margin-top: 16rpx;
      padding: 0 32rpx;
      background: #ffffff;

      &__img {
        width: 160rpx;
        height: 160rpx;
      }

      &__name {
        font-weight: bold;
        font-size: 28rpx;
        line-height: 150%;
        color: $v-c0-85;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &__num {
        text-align: right;
      }

      &__label {
        position: relative;
        height: 48rpx;
        line-height: 48rpx;
        padding: 0 12rpx;
        background: $v-btn-disabled;
        border-radius: 4rpx;
        font-size: 26rpx;
        color: $v-c0-65;

        .label-icon {
          display: block;
          position: absolute;
          top: -10rpx;
          right: -10rpx;
          width: 24rpx;
          height: 24rpx;
        }
      }
    }

    &-info {
      margin-top: 16rpx;
      background: #ffffff;

      &__title {
        font-weight: bold;
        font-size: 32rpx;
        height: 48rpx;
        line-height: 48rpx;
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__information {
        padding: 16rpx 32rpx 24rpx;

        .information-people {
          font-size: 28rpx;
          height: 42rpx;
          line-height: 42rpx;
        }

        .information-copy {
          height: 42rpx;
          font-size: 28rpx;
          color: $v-tip;
        }
      }

      &__group {
        padding: 0 22rpx;
      }

      &__proof {
        padding: 24rpx 32rpx 0;
        font-size: 28rpx;

        .proof-red {
          color: $color-primary-red;
        }
      }

      &__pictures {
        margin: 22rpx 32rpx;

        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }

      &__Logistics {
        padding: 0 32rpx 32rpx;
        font-size: 28rpx;

        .orderNumber {
          text-align: right;
        }
      }
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .code {
    display: grid;
    grid-row-gap: 38rpx;
    grid-column-gap: 20rpx;
    grid-template-columns: 264rpx 264rpx;
    &-title {
      background-color: #f6f7f8;
      border-radius: 4rpx;
      font-size: 28rpx;
      line-height: 46rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .scroll {
    max-height: 240rpx;
    background: #ffffff;
  }
</style>
