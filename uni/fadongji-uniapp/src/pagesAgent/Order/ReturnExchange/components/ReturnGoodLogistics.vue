<template>
  <view class="block">
    <view class="block-title">商品寄回信息</view>
    <EraRadioGroup v-model="radioValue" class="block-info" placement="column" @change="groupChange">
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
    <view class="block-info__proof"><text class="proof-red m-r-4">*</text>发货凭证：</view>
    <view class="block-info__pictures">
      <VoFormUpload :limit="1" :source.sync="logisticsList" btnText="上传图片" />
    </view>
    <view v-if="isLogistics">
      <view class="block-info__Logistics">
        <view class="flex flex-vertical-c flex-justify-between m-b-16">
          <view class="color-block"><text class="color-red m-r-4">*</text>运单号：</view>
          <view class="color-block flex flex-vertical-c">
            <input
              v-model="orderNumber"
              class="m-r-8 orderNumber"
              placeholder="请输入运单号"
              type="text"
            />
            <VoIcon color="#EE0A24" name="scan" @click.native="scanOcrFn" />
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-b-16">
          <view class="color-block"><text class="color-red m-r-4">*</text>物流公司：</view>
          <input
            v-model="companyName"
            class="m-r-8 orderNumber"
            placeholder="请输入物流公司"
            type="text"
          />
        </view>
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="color-block">物流公司查询电话：</view>
          <input
            v-model="mobileModel"
            class="m-r-8 color-block orderNumber"
            placeholder="请输入电话号"
            type="text"
          />
        </view>
      </view>
    </view>

    <view class="block-confirm">
      <view class="block-confirm__button" @click="confirmReceipt">提交</view>
    </view>
  </view>
</template>

<script>
import { chooseImageOcrByPromise, uploadOcr } from '@/common/helper'

  export default {
    name: 'ReturnGoodLogistics',
    props: {
      /**
       * info 发货凭证
       * imageList 凭证列表
       * imageList.proofImg 凭证列表的图片
       * waybillNum 运单号
       * logistics 物流公司
       * phone 物流公司查询电话
       * confirm 是否存在确认收货按钮
       */
      returnInfoList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        //是否是需要物流
        isLogistics: false,
        radioValue: '无需物流',
        orderNumber: '',
        companyName: '',
        mobileModel: '',
        logisticsList: [],
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
      }
    },
    watch: {
      logisticsList(val) {
        this.uploadOcrImageFn(val[0].filePatLocation)
      },
    },
    methods: {
      confirmReceipt() {
        if (this.logisticsList.length < 1) {
          this.$u.toast('请上传物流凭证')
          return
        }
        let url = this.logisticsList[0].src

        if (!url) {
          this.$u.toast('请上传物流凭证')
          return
        }

        if (!this.isLogistics) {
          let param = {
            deliveryType: '2',
            logisticsDetail: {
              deliveryPic: url,
            },
          }
          console.log(param)
          this.$emit('confirmLogistics', param)
          return
        }

        if (!this.orderNumber) {
          this.$u.toast('请输入运单号')
          return
        }
        if (!this.companyName) {
          this.$u.toast('请输入物流信息')
          return
        }
        if (!this.mobileModel) {
          this.$u.toast('请输入电话号')
          return
        }
        let param = {
          deliveryType: '1',
          logisticsDetail: {
            deliveryPic: url,
            deliveryNum: this.orderNumber,
            deliveryCompany: this.companyName,
            deliveryMobile: this.mobileModel,
          },
        }
        this.$emit('confirmLogistics', param)
      },
      radioChange(n) {
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
        }).catch((err) => {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 16rpx;
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
    &-title {
      padding: 24rpx 0;
      margin: 0 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      padding: 16rpx 32rpx 24rpx;
      font-size: 28rpx;
    }
    &-proof {
      display: grid;
      padding: 0 32rpx 24rpx;
      grid-template-columns: 218rpx 218rpx 218rpx;
      grid-column-gap: 16rpx;
      grid-row-gap: 40rpx;
      &__img {
        width: 218rpx;
        height: 218rpx;
      }
    }
    &-list {
      padding: 0 32rpx 32rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
      &__right {
        color: $v-c0-45;
        flex: 1;
        text-align: right;
      }
    }
    &-confirm {
      padding: 0 32rpx 32rpx;
      &__button {
        width: 686rpx;
        height: 92rpx;
        line-height: 92rpx;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
      }
    }
  }
</style>
