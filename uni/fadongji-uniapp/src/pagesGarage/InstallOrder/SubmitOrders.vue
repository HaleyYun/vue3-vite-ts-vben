<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="submit flex flex-column color-block fz-28"
    >
      <VoNav :is-fixed="false" is-have-more title="提交订单" />
      <view class="flex1 overflow-y">
        <view
          v-if="addressInfo"
          class="submit-address flex flex-vertical-c bg-white"
          @click="$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')"
        >
          <VoIcon class="m-r-8 m-b-36" name="address" />
          <view class="flex1">
            <view class="fz-28 color-block-65 lh42 flex">
              <text class="m-r-8">{{ addressInfo.name }}</text>
              <text>{{ addressInfo.mobile }}</text>
              <view class="add-tag m-l-8 fz-24">安装地址</view>
            </view>
            <view class="fz-b fz-28 m-t-8 lh42">
              {{ addressInfo.provinceName }}-{{ addressInfo.cityName }}-{{
                addressInfo.areaName
              }}-{{ addressInfo.address }}
            </view>
          </view>
          <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
        </view>
        <!-- <view
		  class="submit-address bg-white flex flex-vertical-c flex-justify-between"
		  @click="$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')"
		>
		  <VoIcon class="m-r-8" name="address" />
		  <view class="flex flex-vertical-c">
			<view class="fz-30 color-gray">请选择地址</view>
			<VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
		  </view>
		</view> -->
        <view v-if="orderData.goodsDetail" class="bg-white m-t-16 p-b-16 p-t-24">
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            class="flex m-t-16 padding-box"
          >
            <image v-if="googSrc" :src="googSrc" class="list-img" />
            <view class="flex1 flex flex-column">
              <view class="fz-b fz-32 lh48 color-block flex1">
                <text v-show="item.categoryType" class="good-tips m-r-8"
                  >{{ item.categoryType }}
                </text>
                <text> {{ item.goodsName || '未知' }}</text>
              </view>
              <!--              <view class="color-block-45 fz-28">{{ item.brandName }}</view>-->
            </view>
          </view>
          <view class="m-t-32 padding-box">
            <view class="flex flex-justify-between m-b-24">
              <view>服务名称</view>
              <view>{{ orderData.goodsDetail[0].modelName }}安装</view>
            </view>
            <view class="flex flex-justify-between m-b-24">
              <view>上门时间</view>
              <view class="color-block-65 flex flex-vertical-c" @click="showTimePicker()">
                {{ upTime || '请选择时间' }}
                <VoIcon :opacity="0.45" :size="20" class="m-l-8" color="#000" name="right-arrow" />
              </view>
            </view>
            <view class="flex flex-justify-between m-b-24">
              <view>服务费用</view>
              <VoPointPrice :price="installationFee || 0" :show-unit="true" />
            </view>
          </view>
        </view>
      </view>
      <view class="submit-bottom flex flex-justify-r flex-vertical-c p-b-safe-area">
        <view class="m-r-24 flex flex-column">
          <view class="fz-28 lh48">
            合计：
            <VoPointPrice :price="installationFee" :show-unit="true" display="inline-block" />
          </view>
          <!-- <view v-if="serviceFlag" class="fz-24 lh54 color-block-65">
			含服务费
			<VoPointPrice
			  :price="productInfo.goodsInfo.codingPrice"
			  :show-unit="true"
			  display="inline-block"
			/> -->
          <!-- <text class="fz-b color-red">{{ productInfo.goodsInfo.codingPrice }}</text>
            <text v-if="false" class="fz-36 color-red">.00元</text> -->
          <!-- </view> -->
        </view>
        <view class="submit-bottom__button" @click="submitOrderHandler">提交订单</view>
      </view>
      <VoPayPopup
        :show.sync="showPay"
        :total-price="installationFee"
        @close="cancelPayHandler"
        @confirm="payHandler"
      />
    </view>
    <VoTimePicker
      :default-time.sync="serviceDefaultDate"
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
    <!--    <VoModal-->
    <!--      :show="installShow"-->
    <!--      confirmColor="#22284B"-->
    <!--      confirmText="我知道了"-->
    <!--      :content="installContent"-->
    <!--      @confirm="deliverGoodsModel = false"-->
    <!--    />-->
    <VoModal
      :show="installShow"
      :showCancelButton="true"
      cancelColor="#B7B7B7"
      cancelText="取消"
      confirmColor="#333333"
      confirmText="联系客服"
      :content="installContent"
      @cancel="installShow = false"
      @confirm="contactService"
    />
  </view>
</template>

<script>
  import {
    appSource,
    hideLoading,
    showLoading,
    goWechat,
    fetchNextTimeDistance,
  } from '@/common/helper'
  // import TimePicker from './components/TimePicker'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'SubmitOrders',
    components: {},
    data() {
      return {
        serviceDefaultDate: '',
        showPay: false,
        installShow: false,
        installContent: '',
        uploadImg: [],
        newServiceuploadImg: [],
        fileList1: [],
        productInfo: null,
        serviceFlag: true,
        installFlag: true,
        newFlag: true,
        installServiceModal: false,
        priceServiceModal: false,
        selectNoticeCheck: true,
        installModal: false,
        errorModal: false,
        addedServices: [
          {
            supportType: 34,
            count: 1,
            name: '定制服务',
            picList: [],
            price: 0,
          },
        ],

        addressInfo: null,
        submitForm: {
          // activityDetail: {},
          buyerInfo: {
            addressId: '',
            buyerId: '',
            buyerName: '',
          },
          isValet: false,
          source: 1,
          goodsInfoList: [],
        },
        goodsGoodsShopInfoVO: null,
        totalPrice: 0,
        payOrderInfo: this.$storage.get('OrderPayInfo'),
        loading: false,
        timePickerShow: false,
        upTime: '',
        timeData: {
          homeStartTime: '',
          homeEndTime: '',
        },

        optionsId: '',
        orderData: '', //订单详情数据
        goodsDetail: '',
        installationFee: 0,
        childrenIdList: [],
        googSrc: '',
      }
    },
    watch: {
      uploadImg: {
        deep: true,
        handler(newVal) {
          this.addedServices[0].picList = newVal.map((item) => item.src)
        },
      },
    },
    mounted() {
      uni.$on('ChooseAddress', (res) => {
        this.addressInfo = res
        this.submitForm.buyerInfo.addressId = res.id
      })
      // console.log(this.userInfo.companyId)
      // this.submitForm.buyerInfo.buyerId = this.userInfo.companyId
      // console.log(this.submitForm.buyerInfo)
    },
    // @es-
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    destroyed() {
      // this.$storage.remove('OrderPayInfo')
    },
    onShow() {
      // this.productInfo = this.$storage.get('ProductInfo')
      // if (!this.productInfo) {
      //   return this.$u.toast('暂无商品信息')
      // }
      // if (this.productInfo.goodsInfo.isCoding) {
      //   this.addedServices[0].name = '定制服务'
      //   this.addedServices[0].price =
      //     this.addedServices[0].price || this.productInfo.goodsInfo.codingPrice
      //   this.addedServices[0].count = 1
      //   this.addedServices[0].picList = this.addedServices[0].picList || []
      //   this.totalPrice = this.decimalAddFn(
      //     this.productInfo.goodsInfo.originalPrice,
      //     this.productInfo.goodsInfo.codingPrice,
      //   )
      //   return
      // }
      // this.totalPrice = this.productInfo.goodsInfo.originalPrice
      this.timePickerConfirm(fetchNextTimeDistance(true))
    },
    onLoad(options) {
      this.optionsId = options.id

      // this.installationFee = options.installationFee
      this.initDefaultAddress()
      this.getOrderDetailRequest(options.id)
    },
    onHide() {
      // this.$storage.remove('OrderPayInfo')
    },
    methods: {
      //获取订单详情
      async getOrderDetailRequest(id) {
        let param = { id: id }
        //订单详情
        let res = await this.$VoHttp.apiOrderSell$Id(param)
        this.orderData = res.data
        if (res.data.goodsDetail && res.data.goodsDetail.length) {
          this.goodsDetail = res.data.goodsDetail[0]
          //商品详情接口
          let resGood = await this.$VoHttp.GOODS.apiGoodsGarageDetail({
            goodsId: this.goodsDetail.goodsId,
            warehouseId: this.orderData.warehouseId,
            companyId: this.userInfo.companyId,
          })
          this.installationFee = resGood.data.installationFee || 0

          let detail = res.data.goodsDetail[0]
          if (detail && detail.pic && detail.pic.length > 0) {
            let imageList = detail.pic
            if (imageList.length > 1) {
              let item = imageList[0]
              if (item.indexOf('.mp4') > -1 || item.indexOf('.MP4') > -1) {
                this.googSrc = imageList[1]
              } else {
                this.googSrc = imageList[0]
              }
            }
          }
        }
      },
      //上门时间
      showTimePicker() {
        this.timePickerShow = true
      },
      timePickerConfirm(data) {
        console.log(data, 'timeData')
        this.upTime = data.dateTime
        this.serviceDefaultDate = data.dateTime
        const timeArr = data.time.split('-')
        this.timeData.homeStartTime = data.date + ' ' + timeArr[0] + ':00'
        this.timeData.homeEndTime = data.date + ' ' + timeArr[1] + ':00'
        console.log(this.timeData)
        this.timePickerShow = false
      },
      confirm() {
        this.installServiceModal = false
      },
      cancelPayHandler() {
        this.$u.route('/pagesGarage/InstallOrderUser/OrderList?tabIndex=2')
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          source: appSource(),
          userId: that.orderData.buyerId,
          cashAmount: this.installationFee,
          accountAmount: 0,
          orderId: that.payOrderInfo.orderId,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.payOrderInfo.orderId })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  this.childrenIdList = that.payOrderInfo.childrenIdList
                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                      res.data.status +
                      '&price=' +
                      this.installationFee +
                      '&childrenIdList=' +
                      JSON.stringify(this.childrenIdList) +
                      '&origin=install',
                  })
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          this.showPay = false
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .apiOrderInstallPay(req)
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.payOrderInfo.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                this.childrenIdList = that.payOrderInfo.childrenIdList
                uni.redirectTo({
                  url:
                    '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                    res.data.status +
                    '&price=' +
                    this.installationFee +
                    '&childrenIdList=' +
                    JSON.stringify(this.childrenIdList) +
                    '&origin=install',
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      // 提交订单操作
      async submitOrderHandler() {
        if (!this.addressInfo) {
          return this.$u.toast('请添加收货地址')
        }
        if (!this.timeData.homeStartTime || !this.timeData.homeEndTime) {
          return this.$u.toast('请选择上门时间')
        }
        let params = {
          addressId: this.addressInfo.id, //地址id
          relationOrderId: this.orderData.id, //关联订单id,安装,回收订单关联的是order_sell.id 售后上门订单关联的是order_after_sale.id
          homeStartTime: this.timeData.homeStartTime, //区间,上门开始时间
          homeEndTime: this.timeData.homeEndTime, //区间,上门结束时间
          supportAmount: this.installationFee, //服务价格
          supportName: `${this.goodsDetail.modelName}安装`, //服务名称
          source: appSource(), //订单来源(1：安卓，2：ios，3：h5，4：pc 5：小程序 6：公众号)
        }

        try {
          if (this.loading) return
          this.loading = true
          const { data, code } = await this.$VoHttp.apiOrderInstallSubmitOrder(params)
          this.loading = false
          if (+code === 20001) {
            // 支付成功
            this.payOrderInfo = {
              orderId: data.id,
              ...data,
            }
            this.$storage.set('OrderPayInfo', this.payOrderInfo)
            console.log('OrderPayInfo', this.payOrderInfo)
            // 正常逻辑是掉起支付方式，然后选择支付方式后，进行下单支付走原生拉起支付
            this.showPay = true
          }
        } catch (e) {
          this.loading = false
          console.warn(e, 'SubmitOrders')
          if (e.code === 'A0001') {
            this.installShow = true
            this.installContent = e?.message || e?.data?.message || e?.error || '服务端错误'
            return
          }
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
          // if (e.code === 'O0010') {
          //   setTimeout(() => {
          //     this.$linkToEasy(
          //       `/pagesGarage/ShopList/GoodsDetail?id=${this.productInfo.goodsInfo.goodsId}&wid=${this.productInfo.goodsInfo.warehouseId}`,
          //     )
          //   }, 1500)
          // }
        }
      },
      // 初始化默认地址获取
      async initDefaultAddress() {
        try {
          const { data } = await this.$VoHttp.USER.apiReceiverAddressDefault()
          this.addressInfo = data
        } catch (e) {
          console.warn(e, 'TargetFile=>>SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      uploadSuccess() {
        this.videoSrc = ''
      },
      //联系客服
      contactService() {
        const userInfo = getApp().$storage.get('userInfo')
        let url =
          'https://ykf-webchat.7moor.com/wapchat.html?accessId=b3c770c0-ab23-11ec-8fcc-d9e18082232d&fromUrl=&urlTitle=&language=ZHCN&otherParams='
        let otherParams = {
          nickName: userInfo.storeName,
        }
        url += JSON.stringify(otherParams) + '&clientId=' + userInfo.accountId

        // #ifdef APP-PLUS
        url = encodeURIComponent(url)
        getApp().$linkToEasy('/pages/CommonWeb/WebView?encode=1&url=' + url)
        // #endif
        // #ifndef APP-PLUS
        window.open(url, '_self')
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .submit {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    .padding-box {
      padding: 0 32rpx;
      box-shadow: border-box;
    }

    &-address {
      background: #fff;
      padding: 24rpx 32rpx 24rpx 24rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
    }

    &-money {
      padding-left: 32rpx;
      box-sizing: border-box;
      margin: 16rpx 0 24rpx;
      background: #fff;

      &__line {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__total {
        text-align: right;
        padding: 14rpx 34rpx;
        line-height: 48rpx;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }

    .list-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }

    .list-cash {
      font-size: 24rpx;
      color: #ec404d;
      line-height: 28rpx;
      padding: 2rpx 4rpx;
      box-sizing: border-box;
      background: #fdf2f3;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;

      &__button {
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 24rpx;
        font-size: 32rpx;
        color: #fff;
        background: #ff5319;
        border-radius: 48rpx;
        display: inline-block;
      }
    }
  }

  .install {
    background: #fff;
    width: 640rpx;
    height: 892rpx;
    border-radius: 20rpx !important;
  }

  .add-tag {
    height: 36rpx;
    background: #ffe6e8;
    border-radius: 10px;
    color: #fa3243;
    text-align: center;
    line-height: 36rpx;
    padding: 0 16rpx;
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
