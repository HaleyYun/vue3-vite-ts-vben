<template>
  <view>
    <view class="deliver flex flex-column">
      <VoNav is-fixed title="发货">

      </VoNav>
      <view class="flex1 overflow-y">
        <!--   订单   -->
        <view class="deliver-order flex flex-justify-between flex-vertical-c">
          <view class="deliver-order__info">
            <view>订单号：{{ orderData.id }}</view>
            <view class="m-t-8"
              >{{ orderData.warehouseName }}：
              <text class="info-red">{{ orderData.predictDeliveryTime }}之前发货 </text>
            </view>
          </view>
        </view>
        <!--   商品信息   -->
        <view v-for="(item, index) in orderData.goodsDetail" :key="index" class="deliver-goods">
          <view class="p-t-26 flex">
            <image :src="item.pic[0]" class="deliver-goods__img" />
            <view class="flex1 m-l-16">
              <view class="fz-28 fz-b list-hidden">
                <text v-show="item.categoryType" class="good-tips m-r-8">{{
                  item.categoryType
                }}</text>
                <text> {{ item.goodsName }}</text>
              </view>
              <view class="good-bottom flex flex-justify-between">
                <view class="good-bottom__left flex flex-vertical-c">
                  <view class="tips"
                    >{{ item.periodDays > 0 ? `${item.periodDays}天账期` : '现金价' }}
                  </view>
                  <view class="price flex flex-vertical-c">
                    <VoPointPrice :price="item.originalPrice.toString()" />
                    <view>元</view>
                  </view>
                </view>
              </view>
              <view class="flex flex-justify-r flex-vertical-c">
                <!--                  <view class="good-bottom__num">x{{ item.goodsCount }}</view>-->
                <block v-if="item.goodsCount - item.deliveryCount > 0">
                  <view class="good-bottom__delivery"
                    >{{ item.goodsCount - item.deliveryCount }}件未发货</view
                  >
                </block>
                <block v-else>
                  <view class="color-block-45 fz-28 m-t-8 m-l-16">全部发货</view>
                </block>
              </view>
            </view>
          </view>
          <view class="p-t-36 flex flex-justify-between flex-vertical-c">
            <view class="fz-26 color-gray">已扫描数量：{{ engineArr.length }}</view>
            <view class="flex flex-vertical-c flex1 flex-justify-r">
              <view
                class="deliver-goods__button flex flex-vertical-c"
                @click="addCodeClick(item.goodsCount - item.deliveryCount)"
              >
                <view class="fz-28 color-block m-r-4">手动添加</view>
                <VoIcon :opacity="0.65" color="#000" name="add" size="20" />
              </view>
              <view
                class="deliver-goods__button flex flex-vertical-c m-l-32"
                @click="scanCodeClick(item.goodsCount - item.deliveryCount)"
              >
                <view class="fz-28 color-block m-r-4">扫码识别</view>
                <VoIcon :opacity="0.65" color="#000" name="scan-not-vin" size="20" />
              </view>
            </view>
            <!--            <view>-->
            <!--              <VoIcon-->
            <!--                :opacity="0.65"-->
            <!--                color="#000"-->
            <!--                name="add"-->
            <!--                @click="addCodeClick(item.goodsCount - item.deliveryCount)"-->
            <!--              />-->
            <!--              <VoIcon-->
            <!--                class="m-l-24"-->
            <!--                color="#000"-->
            <!--                name="scan-not-vin"-->
            <!--                @click="scanCodeClick(item.goodsCount - item.deliveryCount)"-->
            <!--              />-->
            <!--            </view>-->
          </view>
        </view>
        <!--识别码-->
        <scroll-view class="scroll" scroll-y="true">
          <view class="code">
            <view v-for="(item, index) in engineArr" :key="index" class="code-label">
              <view class="text-nowrap" @click="editEnginNumber(item, index)">{{ item }}</view>
              <image
                class="label-icon"
                src="/static/created/product/delete.png"
                @click="deleteCode(index)"
              />
            </view>
          </view>
        </scroll-view>
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
          <view class="deliver-info__mode flex flex-vertical-c">
            <view>
              <text class="fz-26 color-red m-r-4">*</text>
              <text class="fz-28 color-block">发货方式：</text>
            </view>
            <EraRadioGroup
              v-model="radioValue"
              class="deliver-info__group"
              placement="row"
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
                activeColor="#FF5319"
                @change="radioChange"
              />
            </EraRadioGroup>
          </view>
          <view v-if="isLogistics">
            <view class="deliver-info__proof">
              <text class="fz-26 proof-red m-r-4">*</text>发货凭证：
            </view>
            <view class="deliver-info__pictures">
              <VoFormUpload :limit="1" :source.sync="logisticsList" btnText="上传图片" />
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
                  <VoIcon
                    :opacity="0.65"
                    color="#000"
                    name="scan-not-vin"
                    @click.native="scanOcrFn"
                  />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-b-16">
                <view class="color-block">物流公司：</view>
                <input
                  v-model="companyModel"
                  class="m-r-8 orderNumber"
                  placeholder="请输入物流公司"
                  type="text"
                />
              </view>
              <view class="flex flex-vertical-c flex-justify-between">
                <view class="color-block">物流公司查询电话：</view>
                <input
                  v-model="mobileModel"
                  class="m-r-8 orderNumber"
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
    </view>
    <view class="p-b-safe-area" />
    <VoModal
      :show="editEnginShow"
      showCancelButton
      title="请输入发动机识别码"
      @cancel="editEnginShow = false"
      @confirm="enginConfirm"
    >
      <view class="slot-content">
        <u-input
          v-model="enginModel"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          customStyle="background-color: #F7F7F8;border-radius: 8rpx;margin: 32rpx 48rpx;height: 96rpx;width: 544rpx;line-height: 96rpx;padding-left: 12rpx;"
          fontSize="16px"
          placeholder="请输入发动机识别码"
        />
      </view>
    </VoModal>
    <!--确认发货提醒弹框-->
    <VoModal
      :content="deliverGoodsContent"
      :show="deliverGoodsTips"
      cancelText="取消"
      confirmText="确认发货"
      showCancelButton
      title="发货提醒"
      @cancel="deliverGoodsTips = false"
      @confirm="confirmDeliverGoods"
    />
  </view>
</template>

<script>
  import { chooseImageOcrByPromise, uploadOcr } from '@/common/helper'

  export default {
    name: 'DeliverGoods',
    data() {
      return {
        orderNumber: '',
        mobileModel: '',
        companyModel: '',
        radioValue: '物流发货',
        deliverGoodsContent: '',
        deliverGoodsTips: false,
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
        isLogistics: true,
        logisticsList: [],
        //订单数据
        orderData: {},
        //地址信息
        orderAddress: {},
        //物流信息
        logisticsData: {},
        logisticsUrl: '',
        //type 1.投资订单 2.销售订单
        type: '1',
        engineArr: [],
        editEnginShow: false,
        enginModel: '',
        codeIndex: '',
        codeType: true, //添加发动集识别码 true.修改 false.添加
        isLoading: false,
        deliverParam: {},
      }
    },
    onLoad(option) {
      this.orderData = this.$storage.get('sendGoodsDetail')
      console.log('11111111', this.orderData)
      this.type = option.type
      //地址信息
      this.orderAddress = this.orderData.orderAddress
    },
    watch: {
      logisticsList(val) {
        this.uploadOcrImageFn(val[0].filePatLocation)
      },
    },
    methods: {
      /**
       * 点击发货按钮
       */
      deliverGoods() {
        if (this.isLoading) {
          return
        }
        if (!this.engineArr || this.engineArr.length < 1) {
          this.$u.toast('发货数量不能为0')
          return
        }
        let detail = uni.$u.deepClone(this.orderData.goodsDetail[0])
        detail.engineNo = this.engineArr
        detail.goodsCount = this.engineArr.length
        this.deliverParam = {
          goodsDetail: [detail],
          orderId: this.orderData.id,
          deliveryType: this.radioValue,
          isWms: false,
        }
        if (this.isLogistics) {
          if (this.logisticsList && this.logisticsList.length) {
            this.logisticsUrl = this.logisticsList[0].src
          }
          if (!this.logisticsUrl) {
            this.$u.toast('请上传发货凭证')
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
          this.deliverParam.logisticsDetail = this.logisticsData
        }
        let goodsTotal = 0
        let deliverGoodsTotal = this.engineArr.length
        this.orderData.goodsDetail.forEach((item) => {
          goodsTotal = goodsTotal + (item.goodsCount - item.deliveryCount)
        })
        //当本次已添加数量 = 未发货商品数量时，用户点击【发货】后不用显示二次确认弹窗，直接显示发货成功的提示信息即可。
        if (goodsTotal === deliverGoodsTotal) {
          if (this.type === '1') {
            this.investDeliverGood(this.deliverParam)
            return
          }
          this.marketDeliverGood(this.deliverParam)
          return
        }
        this.deliverGoodsTips = true
        this.deliverGoodsContent =
          '该订单中未发货商品总数量为' +
          goodsTotal +
          '，本次发货数量为' +
          deliverGoodsTotal +
          '，请确认发货数量是否正确'
      },
      confirmDeliverGoods() {
        this.deliverGoodsTips = false
        if (this.type === '1') {
          this.investDeliverGood(this.deliverParam)
          return
        }
        this.marketDeliverGood(this.deliverParam)
      },
      //投资订单发货
      investDeliverGood(param) {
        this.isLoading = true
        this.$VoHttp
          .apiOrderInvestDelivery({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('发货成功')
              setTimeout(() => {
                uni.setStorageSync('deliveryUpdateList', 'investUpdateList')
                this.$backFn()
                this.isLoading = false
              }, 1500)
            } else {
              uni.$u.toast('发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
            this.isLoading = false
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
                uni.setStorageSync('deliveryUpdateList', 'sellUpdateList')
                this.$backFn()
                this.isLoading = false
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
          success: function () {
            this.$u.toast('复制成功')
          },
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
      /**
       * 上传发货凭证OCR识别
       */
      uploadOcrImageFn(urlStr) {
        uploadOcr({
          url: urlStr,
          isPath: true,
          formData: {},
          tip: '加载中',
          apiUrl: '/v1/api/file/waybill/ocr',
        }).then((res) => {
          const resultData = JSON.parse(res.data)
          if (+resultData.code === 20001) {
            this.orderNumber = resultData.data.waybillNum
            // this.companyModel = resultData.data.recName
            // this.mobileModel = resultData.data.senderNum
          } else {
            console.log(resultData.message)
          }
        })
      },
      /**
       * 扫码OCR识别
       */
      scanOcrFn() {
        chooseImageOcrByPromise({
          tip: '加载中',
          count: 1,
          sizeType: ['compressed'],
          apiUrl: '/v1/api/file/waybill/ocr',
        })
          .then((res) => {
            const resultData = JSON.parse(res.data)
            if (+resultData.code === 20001) {
              this.orderNumber = resultData.data.waybillNum
              // this.companyModel = resultData.data.recName
              // this.mobileModel = resultData.data.senderNum
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
      /**
       * 扫码发货
       */
      scanCodeClick(codeLength) {
        this.enginModel = ''
        this.codeType = true
        if (this.engineArr.length >= codeLength) {
          this.$u.toast('已添加数量不能超过未发货数量')
          return
        }
        chooseImageOcrByPromise({
          apiUrl: '/v1/api/business/vehicle/brand/ocr',
          tip: '加载中',
          sizeType: ['compressed'],
          formData: {
            type: 'qrcode',
          },
        })
          .then((res) => {
            console.log('res==', res)
            if (res.data) {
              const data = JSON.parse(res.data)
              if (data.success) {
                this.engineArr.push(data.data)
              } else {
                uni.$u.toast(data.message)
              }
            }
          })
          .catch((err) => {
            console.log('err==', err)
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      deleteCode(index) {
        this.engineArr.splice(index, 1)
      },
      editEnginNumber(number, index) {
        this.codeType = true
        this.codeIndex = index
        this.enginModel = number
        this.editEnginShow = true
      },
      enginConfirm() {
        if (!this.enginModel) {
          this.$u.toast('发动机识别码不能为空')
          return
        }
        this.editEnginShow = false
        if (this.codeType) {
          this.engineArr[this.codeIndex] = this.enginModel
          return
        }
        this.engineArr.push(this.enginModel)
      },
      addCodeClick(codeLength) {
        this.enginModel = ''
        this.codeType = false
        if (this.engineArr.length >= codeLength) {
          this.$u.toast('已添加数量不能超过未发货数量')
          return
        }
        this.editEnginShow = true
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
          color: #f20014;
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
      &__button {
        border: 2rpx solid $v-btn-disabled;
        border-radius: 64rpx;
        height: 58rpx;
        line-height: 58rpx;
        padding: 0 24rpx;
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
      &__mode {
        padding: 4rpx 32rpx;
      }
      &__group {
        padding: 0 22rpx;
      }
      &__proof {
        padding: 0 32rpx;
        font-size: 28rpx;
        .proof-red {
          color: #f20014;
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
          color: $v-c0-65;
          width: 400rpx;
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
  .good-bottom {
    &__left {
      margin-top: 16rpx;
      height: 42rpx;
      .tips {
        padding: 0 4rpx;
        height: 28rpx;
        line-height: 28rpx;
        text-align: center;
        background: #ffe5e8;
        border: 2rpx solid #fa3243;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #fa3243;
      }
      .price {
        font-size: 28rpx;
        color: #f20014;
        margin-left: 8rpx;
      }
    }
    &__num {
      margin-top: 8rpx;
      height: 42rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-45;
    }
    &__delivery {
      margin-top: 8rpx;
      margin-left: 16rpx;
      color: $color-primary-red;
      font-size: 26rpx;
    }
  }
  .code {
    background-color: #ffffff;
    padding-bottom: 24rpx;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    &-label {
      position: relative;
      height: 48rpx;
      line-height: 48rpx;
      padding: 0 8rpx;
      margin: 20rpx 0 20rpx 32rpx;
      text-align: center;
      display: inline-block;
      background-color: $v-btn-disabled;
      border-radius: 4rpx;
      font-size: 28rpx;
      color: $v-c0-65;
      .label-icon {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        width: 24rpx;
        height: 24rpx;
      }
    }
    &-label:nth-child(2n) {
      margin-right: 0;
    }
  }

  .scroll {
    max-height: 260rpx;
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
  .scan-class {
    width: 24px;
    height: 24px;
    display: block;
  }
  ::v-deep .u-radio {
    margin-left: 48rpx;
  }
</style>
