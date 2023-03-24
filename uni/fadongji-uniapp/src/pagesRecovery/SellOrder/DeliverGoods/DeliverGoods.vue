<template>
  <view>
    <view class="deliver flex flex-column">
      <VoNav is-fixed title="发货">

      </VoNav>
      <view class="flex1 overflow-y">
        <!--   订单   -->
        <view class="deliver-order">
          <view class="deliver-order__info">订单号：{{ orderData.id }}</view>
          <view class="color-block-45 fz-28 m-t-8" v-if="orderData.goodsDetail"
            >共{{ orderData.goodsDetail.length }}种&nbsp;{{ goodNumber }}件商品待发货</view
          >
        </view>
        <!--全选-->
        <view class="deliver-choose flex flex-justify-between flex-vertical-c m-t-16">
          <view class="flex" @click="selectAllClick">
            <VoIcon v-if="isAllSelect" :size="24" color="#FF5319" name="select-right" />
            <VoIcon v-else :size="24" name="address_select" />
            <view class="color-block fz-32 fz-b">全选</view>
          </view>
          <!-- <VoIcon
            size="20"
            color="#000"
            :opacity="0.65"
            name="scan-not-vin"
            @click="scanCodeClick"
          /> -->
        </view>
        <!--   商品信息   -->
        <block v-if="orderData.goodsDetail">
          <view v-for="(item, index) in orderData.goodsDetail" :key="index" class="deliver-goods">
            <view class="flex flex-justify-between flex-vertical-c" @click="goodSelect(item)">
              <view v-if="!item.unSelected">
                <VoIcon :opacity="0.85" :size="24" name="disable-choose" />
              </view>
              <view v-else>
                <VoIcon v-if="item.selected" :size="24" color="#FF5319" name="select-right" />
                <VoIcon v-else :size="24" name="address_select" />
              </view>
              <view class="p-t-26 flex flex1 m-l-10">
                <view class="deliver-goods__img">
                  <image
                    v-if="!item.unSelected"
                    class="text"
                    src="/static/noData/good-deliver-no.png"
                  />
                </view>
                <view class="flex1 m-l-16">
                  <!-- v-for="(item, index) in orderData.goodsDetail"
                :key="index" -->
                  <GoodItem :good-data="item" />
                  <view class="flex flex-vertical-c flex-justify-between p-b-10">
                    <view v-if="item.unSelected" class="fz-26 color-red"
                      >{{
                        item.deliveryCount ? item.goodsCount - item.deliveryCount : item.goodsCount
                      }}件未发货</view
                    >
                    <view class="flex flex-vertical-c">
                      <view class="fz-26 color-block-45">本次发货数量：</view>
                      <u-number-box
                        v-model="item.newDeliveryCount"
                        :max="
                          item.deliveryCount
                            ? item.goodsCount - item.deliveryCount
                            : item.goodsCount
                        "
                        button-size="20"
                        integer
                        min="1"
                    /></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </block>

        <!--   收货信息   -->
        <view class="deliver-info">
          <view class="deliver-info__title">收货信息</view>
          <view class="deliver-info__information">
            <view class="flex flex-justify-between flex-vertical-c">
              <view class="information-people flex flex-vertical-c">
                <view v-if="orderAddress.name">{{ orderAddress.name }}</view>
                <view v-if="orderAddress.phone">{{ orderAddress.phone }}</view>
              </view>
              <view class="information-copy" @click="copyClick">复制</view>
            </view>
            <view
              v-if="orderAddress.address || orderAddress.addressDetail"
              class="m-t-8 fz-28 color-block"
            >
              {{ orderAddress.address }}{{ orderAddress.addressDetail }}
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
            <view class="deliver-info__proof"
              ><text class="proof-red m-r-4">*</text>发货凭证：</view
            >
            <view class="deliver-info__pictures">
              <view class="deliver-diy" @click="selectOcrFn" v-if="logisticsUrl">
                <image class="pictures-img" :src="logisticsUrl" />
                <image src="/static/supplier/clear.png" class="deliver-diy__del" />
              </view>
              <view class="deliver-diy" @click="selectOcrFn" v-else>
                <image class="pictures-img" src="/static/created/product/group.png" />
              </view>
            </view>

            <view class="deliver-info__Logistics">
              <view class="flex flex-vertical-c flex-justify-between m-b-16">
                <view class="color-block">运单号：</view>
                <view class="color-gray flex flex-vertical-c">
                  <input
                    v-model="orderNumber"
                    class="m-r-8 orderNumber"
                    placeholder="请输入运单号"
                    type="text"
                  />
                  <VoIcon size="20" color="#000" :opacity="0.65" name="scan-not-vin" />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-b-16">
                <view class="color-block">物流公司：</view>
                <input
                  disabled
                  v-model="companyModel"
                  class="m-r-8 color-gray orderNumber"
                  placeholder="请选择物流公司"
                  @click="pickerShow = true"
                  type="text"
                />
              </view>
              <view class="flex flex-vertical-c flex-justify-between">
                <view class="color-block">物流公司查询电话：</view>
                <input
                  v-model="mobileModel"
                  class="m-r-8 color-gray orderNumber"
                  placeholder="请输入物流电话"
                  type="text"
                />
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
    <u-picker
      :columns="columns"
      :show="pickerShow"
      @cancel="pickerClose"
      @confirm="pickerConfirm"
      confirmColor="rgba(0, 0, 0, 0.85)"
    />
  </view>
</template>

<script>
  import GoodItem from '../components/GoodItem'
  import { showLoading, hideLoading, chooseImageOcrByPromise } from '@/common/helper'

  export default {
    name: 'DeliverGoods',
    components: { GoodItem },
    data() {
      return {
        pickerShow: false, // 物流弹框
        columns: [['德邦', '京东', '顺丰', '物流']],
        orderNumber: '',
        mobileModel: '',
        companyModel: '',
        radioValue: '无需物流',
        num: 0,
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
        //商品总数量
        goodNumber: 0,
        //是否全选
        isAllSelect: false,
      }
    },
    onLoad(option) {
      this.$VoHttp
        .apiOrderOld$Id({ id: option.data })
        .then((res) => {
          this.orderData = res.data
          //地址信息
          this.orderAddress = this.orderData.orderAddress
          this.orderData.goodsDetail?.forEach((item) => {
            item.selected = false
            if (item.goodsCount - item.deliveryCount === 0) {
              item.unSelected = false
            } else {
              item.unSelected = true
            }
            this.goodNumber = this.goodNumber + item.goodsCount
            item.newDeliveryCount = 1
          })
          console.log(this.orderData.goodsDetail)
        })
        .catch((err) => {
          console.log('err', err)
          uni.$u.toast(res.message || '订单详情获取失败')
        })
      this.type = +option.type
    },
    methods: {
      //获取订单详情
      getOrderDetailRequest() {},

      groupChange(e) {
        console.log(e)
      },
      pickerConfirm(e) {
        console.log(e)
        this.companyModel = e.value[0]
        this.pickerShow = false
      },
      pickerClose(e) {
        this.pickerShow = false
        console.log(e)
      },
      selectOcrFn() {
        chooseImageOcrByPromise({
          tip: '加载中',
          count: 1,
          apiUrl: '/v1/api/file/waybill/ocr',
        })
          .then((res) => {
            const resultData = JSON.parse(res.data)
            if (+resultData.code === 20001) {
              this.orderNumber = resultData.data.waybillNum
              // this.companyModel = resultData.data.recName
              this.mobileModel = resultData.data.senderNum
              this.logisticsUrl = resultData.data.imgUrl
            } else {
              console.log(resultData.message)
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      // 选择物流
      selectLogistics(e) {
        console.log(e)
      },
      // changeCount(e) {
      //   this.num = e.value
      // },
      //商品选择
      goodSelect(good) {
        if (!good.unSelected) {
          this.$u.toast('商品已经发货了')
          return
        }
        this.orderData.goodsDetail?.forEach((item) => {
          if (item.projectId) {
            if (item.projectId === good.projectId) {
              item.selected = !item.selected
            }
          } else {
            if (item.goodsId === good.goodsId) {
              item.selected = !item.selected
            }
          }
        })
        this.updateAllSelecte()
        this.$forceUpdate()
      },
      selectAllClick() {
        this.isAllSelect = !this.isAllSelect
        if (this.isAllSelect) {
          this.orderData.goodsDetail?.forEach((item) => {
            item.selected = true
          })
        } else {
          this.orderData.goodsDetail?.forEach((item) => {
            item.selected = false
          })
        }
        this.$forceUpdate()
      },
      //控制全选按钮的选中与否
      updateAllSelecte() {
        let allStatus = '0'
        this.orderData.goodsDetail?.forEach((item) => {
          if (item.unSelected) {
            if (!item.selected) {
              allStatus = '1'
            }
          }
        })
        if (allStatus === '1') {
          this.isAllSelect = false
        } else {
          this.isAllSelect = true
        }
      },
      /**
       * 点击发货按钮
       */
      deliverGoods() {
        let goodsDetail = []
        //修改时间 2022-10-26 00:08:44 之前
        this.orderData.goodsDetail?.forEach((item) => {
          // item.goodsCount = item.newDeliveryCount
          if (item.unSelected) {
            if (item.selected) {
              let data = Object.assign({}, item)
              data.goodsCount = item.newDeliveryCount
              goodsDetail.push(data)
            }
          }
        })
        if (!goodsDetail.length) {
          this.$u.toast('请选择你要发货的商品')
          return
        }
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

          if (this.companyModel === '') {
            this.$u.toast('请输入物流公司')
            return
          }

          if (this.orderNumber === '') {
            this.$u.toast('请输入运单号')
            return
          }

          this.logisticsData.deliveryPic = this.logisticsUrl
          this.logisticsData.deliveryNum = this.orderNumber
          if (this.mobileModel) {
            this.logisticsData.deliveryMobile = this.mobileModel
          }
          this.logisticsData.deliveryCompany = this.companyModel

          param.logisticsDetail = this.logisticsData
        }
        console.log('param=============', param)
        // return
        // if (this.type === 1) {
        //   this.investDeliverGood(param)
        //   return
        // }
        this.marketDeliverGood(param)
      },
      //投资订单发货
      investDeliverGood(param) {
        showLoading()
        this.$VoHttp
          .apiOrderInvestDelivery({ param })
          .then((res) => {
            console.log(res)
            if (+res.code === 20001) {
              this.$toast('发货成功', 'success', '/static/icons/success_icon.png')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast('发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      //销售订单发货
      marketDeliverGood(param) {
        showLoading()
        this.$VoHttp
          .apiOrderOldDelivery(param)
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('发货成功', 'success', '/static/icons/success_icon.png')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast('发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.$u.toast(e.message || '网络请求失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      copyClick() {
        uni.setClipboardData({
          data: this.orderAddress.phone,
        })
      },
      /**
       * 某个radio状态发生变化时触发(选中状态)
       * @param n
       */
      radioChange(n) {
        if (n === '无需物流') {
          this.isLogistics = false
        } else {
          this.isLogistics = true
        }
      },
      uploadSuccess(res) {
        if (res[0].url) {
          this.logisticsUrl = res[0].url
        }
      },
      /**
       * 扫码发货
       */
      scanCodeClick() {
        // this.$u.toast('功能暂未开发,延期开发')
        // return
        this.$linkToEasy('/pagesRecovery/SellOrder/OrderDetail/ScanCodeDelivery')
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
    &-choose {
      padding: 0rpx 32rpx;
      height: 88rpx;
      background: #ffffff;
    }
    &-goods {
      padding: 0 32rpx;
      background: #ffffff;
      &__img {
        position: relative;
        .img {
          width: 160rpx;
          height: 160rpx;
        }
        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 96rpx;
          height: 96rpx;
          transform: translate(-50%, -50%);
          color: #ffffff;
        }
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
          display: inline-block;
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
  .deliver-diy {
    width: 110px;
    height: 110px;
    position: relative;
    &__del {
      width: 22px;
      height: 22px;
      position: absolute;
      top: 0rpx;
      right: 0rpx;
    }
  }
</style>
