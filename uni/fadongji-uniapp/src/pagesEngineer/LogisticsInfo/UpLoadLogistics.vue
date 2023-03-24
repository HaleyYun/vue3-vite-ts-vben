<template>
  <view class="flex flex-column vh-full">
    <view class="flex1 overflow-y">
      <VoNav is-fixed is-have-more title="上传物流信息" />
      <view class="m-t-20 bg-white">
        <view class="repair_shop-con">
          <view class="fz-32 p-b-24 fz-b repaire_shop-title">收货信息</view>
          <view class="repair_shop-name">
            <text class="fz-28 fz-b">{{ repairShop.name }}</text>
            <text class="fz-28 fz-b m-l-8">{{ repairShop.phone }}</text>
          </view>
          <view class="flex flex-row flex-justify-between">
            <view class="repair_shop-address flex1">
              {{ repairShop.address }}
            </view>
            <view
              class="copy-text"
              @click="copyHandler(repairShop.name + repairShop.phone + repairShop.address)"
              >复制
            </view>
          </view>
        </view>
      </view>
      <view class="m-t-20 bg-white">
        <view class="repair_shop-con">
          <view class="fz-32 p-b-24 fz-b repaire_shop-title">发货信息</view>
        </view>
        <view class="flex-row flex flex-vertical-c m-l-32 m-r-32 m-b-28" @click="selected1">
          <VoIcon v-if="isSelect1" color="#FF5319" name="select-right" size="24" />
          <VoIcon v-else color="#fff" name="address_select" size="24" />
          <view class="fz-28 lh150 color-block m-l-8">无需物流</view>
        </view>
        <view class="flex-row flex flex-vertical-c m-l-32 m-r-32 m-t-28 p-b-28" @click="selected2">
          <VoIcon v-if="isSelect2" color="#FF5319" name="select-right" size="24" />
          <VoIcon v-else color="#fff" name="address_select" size="24" />
          <view class="fz-28 lh150 color-block m-l-8">物流发货</view>
        </view>
        <view v-if="isSelect2">
          <view class="flex flex-row flex-vertical-c m-l-32 m-r-32">
            <view class="red-tips">*</view>
            <view class="m-l-4 fz-28 lh150 color-block">发货凭证:</view>
          </view>
          <view class="flex-row flex text-center m-l-32 p-b-24">
            <view>
              <view class="pictures">
                <VoFormUpload
                  :limit="1"
                  :source.sync="fileList1"
                  :video-limit="0"
                  btnText="上传图片"
                  uploadType="image"
                  iconWidth="210rpx"
                />
              </view>
            </view>
          </view>
          <EraForm
            ref="form"
            :model="formData"
            :rules="rules"
            class="pay-form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem
              class="pay-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="运单号"
              prop="scan"
            >
              <u--input
                v-model="formData.scan"
                border="none"
                disabledColor="#ffffff"
                fontSize="14px"
                inputAlign="right"
                placeholder="可手输，可扫码"
                placeholderClass="pay-form__placeholder"
              />

              <image @click="scan" src="/static/icons/scan.png" class="scan-class m-l-8" />
            </EraFormItem>
            <EraFormItem
              class="pay-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="物流公司:"
              prop="logistics"
            >
              <u--input
                v-model="formData.logistics"
                border="none"
                disabledColor="#ffffff"
                fontSize="14px"
                inputAlign="right"
                placeholder="请选择物流公司"
                placeholderClass="pay-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="pay-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="物流公司查询电话："
              prop="phone"
              labelWidth="200"
            >
              <u--input
                v-model="formData.phone"
                border="none"
                disabledColor="#ffffff"
                fontSize="14px"
                inputAlign="right"
                placeholder="物流公司查询电话"
                placeholderClass="pay-form__placeholder"
              />
            </EraFormItem>
          </EraForm>
        </view>
      </view>
    </view>

    <view class="upload-bottom p-b-safe-area">
      <view
        :class="
          isSelect1 ||
          isSelect2 ||
          (fileList1.length !== 0 && formData.scan && formData.logistics && formData.phone)
            ? 'upload-bottom__submit2'
            : 'upload-bottom__submit1'
        "
        @click="submitFn()"
        >提交
      </view>
    </view>
  </view>
</template>

<script>
  import { chooseImageOcrByPromise, uploadOcr } from '@/common/helper'

  export default {
    name: 'UpLoadLogistics',
    data() {
      const _this = this
      return {
        formData: {
          scan: '', //运单号
          logistics: '', //物流公司
          phone: '', // 手机号
        },
        rules: {
          phone: [
            {
              type: 'string',
              required: true,
              message: '请输入物流公司查询电话',
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value) => {
                return (
                  _this.$vocenApi.Pattern.isPhone(value) || _this.$vocenApi.Pattern.isMobile(value)
                )
              }, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '电话格式不正确',
              trigger: ['blur', 'change'],
            },
          ],
          logistics: {
            type: 'string',
            required: true,
            message: '请填写物流公司名字',
            trigger: ['blur', 'change'],
          },
          scan: {
            type: 'string',
            required: true,
            message: '请填运单号',
            trigger: ['blur', 'change'],
          },
        },
        company: '德邦',
        orderNum: '可手输，可扫码',
        fileList1: [],
        fileList2: [],
        fileList3: [],
        isSelect1: true,
        isSelect2: false,
        repairShop: {
          name: '',
          phone: '',
          address: '',
        },
        isLoading: false,
        optionsId: '',
        deatilInfo: '',
      }
    },
    watch: {
      fileList1(val) {
        this.uploadOcrImageFn(val[0].filePatLocation)
      },
    },
    onLoad(options) {
      this.optionsId = options.id
      this.getAddressInfo()
      this.getDetail()
    },
    methods: {
      //获取地址信息
      async getAddressInfo() {
        //获取回收公司id
        let res = await this.$VoHttp.apiCompanyInfoRecycling()
        let id = res.data
        //获取地址信息
        let addressRes = await this.$VoHttp.apiReceiverAddressList({ companyId: id })
        console.log('addressRes', addressRes.data)
        if (addressRes.data && addressRes.data.length) {
          let addressData = addressRes.data[0]
          this.repairShop = {
            name: addressData.name,
            address: addressData.provinceName + addressData.cityName + addressData.areaName + addressData.address,
            phone: addressData.mobile,
            areaCode: addressData.areaCode,
          }
        }
      },
      getDetail() {
        // 获取回收订单详情
        this.$VoHttp
          .apiOrderRecycleOrderDetail$Id({ id: this.optionsId })
          .then((res) => {
            if (res.data) {
              let data = res.data

              //组装时间段
              // if (data.homeStartTime && data.homeEndTime) {
              //   data.time =
              //     this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
              //     '-' +
              //     this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              // }
              //组装各种时间
              data.timeObj = {}
              data.timeList.map((item) => {
                data.timeObj[item.timeName] = item
              })
              console.log(data.timeObj)

              this.deatilInfo = data
              // let info = JSON.parse(data.addressDetail)
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      uploadSuccess() {
        // this.videoSrc = '可手输，可扫码'
      },
      selected1() {
        this.isSelect1 = true
        this.isSelect2 = false
      },
      selected2() {
        this.isSelect1 = false
        this.isSelect2 = true
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
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
            this.formData.scan = resultData.data.waybillNum
          } else {
            console.log(resultData.message)
          }
        })
      },
      //扫一扫
      scan() {
        chooseImageOcrByPromise({
          tip: '加载中',
          count: 1,
          apiUrl: '/v1/api/file/waybill/ocr',
        })
          .then((res) => {
            const resultData = JSON.parse(res.data)
            if (+resultData.code === 20001) {
              this.formData.scan = resultData.data.waybillNum
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
      //提交
      submitFn() {
        if (this.isLoading) {
          return
        }
        if (!this.isSelect1 && !this.isSelect2) {
          return
        }
        let params = {
          type: 33, //业务订单类型0主订单,11销售订单，12投资订单 21售后订单 33回收订单
          orderId: this.deatilInfo.id,
          isWms: false, //是否wms发货
          deliveryType: this.isSelect2 ? '物流发货' : '无需物流',
          goodsDetail: '{}',
          logisticsDetail: '{}',
          receiveAddress: '{}',
        }
        if (this.isSelect2) {
          console.log('11111', this.fileList1)
          if (this.fileList1 && this.fileList1.length > 0 && this.fileList1[0].src) {
            let logisticsDetail = {
              sendCerti: this.fileList1[0].src, //发货凭证
              trackNum: this.formData.scan, //运单号
              logCompany: this.formData.logistics, //物流公司
              logPhone: this.formData.phone, //物流查询电话
            }
            params.logisticsDetail = JSON.stringify(logisticsDetail)
            //{"name": "阿萨服磨刀器", "phone": "17638181552", "address": "河南省郑州市二七区", "areaCode": "410103", "isEdited": false, "addressDetail": "66号花园路"}
            params.receiveAddress = JSON.stringify(this.repairShop)
          } else {
            this.$u.toast('请上传发货凭证')
            return
          }
        }
        this.isLoading = true
        this.$VoHttp
          .apiOrderRecycleSaveLogistics(params)
          .then((res) => {
            this.$u.toast('提交成功')
            setTimeout(() => {
              // this.$backFn()
              uni.reLaunch({
                url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=1',
              })
              this.isLoading = false
            }, 1000)
          })
          .catch((err) => {
            this.$u.toast(err.message || '提交失败')
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .repair_shop-con {
    padding: 24rpx;

    .repaire_shop-title {
      border-bottom: 1rpx solid $v-bg-light;
    }

    .repair_shop-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 24rpx 0;

      .repair_shop-name-btn {
        display: flex;
        width: 144rpx;
        height: 56rpx;
        box-sizing: border-box;
        border-radius: 200rpx;
        justify-content: center;
        align-items: center;
        border: 1rpx solid #155bd4;

        &-text {
          color: #155bd4;
        }
      }
    }

    .repair_shop-address {
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }
  }

  .copy-text {
    margin-left: 24rpx;
    font-size: 28rpx;
    line-height: 150%;
    color: #0d66ff;
  }

  .red-tips {
    font-size: 24rpx;
    line-height: 150%;
    color: #e50012;
  }

  .pictures {
    margin-top: 32rpx;
    box-sizing: border-box;

    .pictures-img {
      width: 218rpx;
      height: 218rpx;
    }
  }

  .pay-form {
    padding: 0 32rpx;
    margin-bottom: 8rpx;

    &__item {
      //padding: 0rpx 32rpx;
      box-sizing: border-box;
      text-align: right;
      border-bottom: 2rpx solid $v-bg-light;
      font-size: 28rpx;
    }

    &__code {
      font-size: 32rpx;
      line-height: 1.5;
      color: var(--color-primary);
      margin-left: 44rpx;
    }

    &__placeholder {
      text-align: right;
      color: $v-c0-25 !important;
    }
  }

  .upload-bottom {
    background-color: $v-bg-white;

    &__submit2 {
      border-radius: 48rpx;
      background-color: #ff5319;
      color: white;
      font-size: 32rpx;
      padding: 22rpx 0;
      box-sizing: border-box;
      text-align: center;
      margin: 20rpx 32rpx;
    }

    &__submit1 {
      background-color: #f6f7f8;
      color: $v-c0-25;
      font-size: 32rpx;
      line-height: 150%;
      vertical-align: center;
      text-align: center;
      padding: 22rpx 0;
      border-radius: 48rpx;
      margin: 20rpx 32rpx;
    }
  }

  .scan-class {
    width: 24px;
    height: 24px;
    display: block;
  }
</style>
