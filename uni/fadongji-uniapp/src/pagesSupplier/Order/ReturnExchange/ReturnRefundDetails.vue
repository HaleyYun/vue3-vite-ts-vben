<template>
  <view v-if="detailInfo.refundInformation" class="details">
    <VoNav is-fixed is-have-more title="退货/退款详情">

    </VoNav>
    <!--  步骤条部分  -->
    <!--审核未通过-->
    <view v-if="type === 'fail'" class="details-steps">
      <EraSteps :current="1" activeColor="#FFECE5">
        <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
          <text slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
        </EraStepsItem>
        <EraStepsItem :desc="detailInfo.auditTime || ''">
          <text slot="icon">
            <voIcon :size="24" color="#EE0A24" name="close-fill" />
          </text>
          <text slot="title" class="step-future__fail">未通过</text>
        </EraStepsItem>
      </EraSteps>
    </view>
    <view v-if="type === 'success'" class="details-steps">
      <EraSteps :current="currentStep" activeColor="#FFECE5">
        <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''">
          <text v-if="currentStep === 0" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
          <text v-if="currentStep < 0" slot="title" class="step-future">提交申请</text>
          <text v-else-if="currentStep === 0" slot="title" class="step-future__current"
            >提交申请</text
          >
          <text v-else slot="title" class="step-future__past">提交申请</text>
        </EraStepsItem>
        <EraStepsItem :desc="currentStep > 1 ? detailInfo.auditTime || '' : ''">
          <text v-if="currentStep === 1" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
          <text v-if="currentStep < 1" slot="title" class="step-future">审核通过</text>
          <text v-else-if="currentStep === 1" slot="title" class="step-future__current"
            >审核通过</text
          >
          <text v-else slot="title" class="step-future__past">审核通过</text>
        </EraStepsItem>
        <EraStepsItem :desc="detailInfo.upLoadNumTime || ''">
          <text v-if="currentStep === 2" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 2" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
          <text v-if="currentStep < 2" slot="title" class="step-future">上传物流单号</text>
          <text v-else-if="currentStep === 2" slot="title" class="step-future__current"
            >上传物流单号</text
          >
          <text v-else slot="title" class="step-future__past">上传物流单号</text>
        </EraStepsItem>
        <EraStepsItem :desc="detailInfo.receiverAddress.receivingTime || ''">
          <text v-if="currentStep === 3" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 3" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
          <text v-if="currentStep < 3" slot="title" class="step-future">退货退款完成</text>
          <text v-else-if="currentStep === 3" slot="title" class="step-future__current"
            >退货退款完成</text
          >
          <text
            v-else
            slot="title"
            :class="currentStep ? 'theme-color' : ''"
            class="step-future__past"
            >退货退款完成</text
          >
        </EraStepsItem>
      </EraSteps>
    </view>

    <!--进度条显示语-->
    <block v-if="detailInfo.status === 3 || detailInfo.status === 4">
      <view v-if="detailInfo.status === 3">
        <view class="step-future__fail bg-white text-center">退款申请审核未通过</view>
        <view v-show="detailInfo.auditRemark" class="step-future__fail text-center bg-white"
          >原因：{{ detailInfo.auditRemark }}</view
        >
        <view class="h32 bg-white"></view>
      </view>
      <block v-else>
        <view class="step-future__fail bg-white text-center">退款申请已取消</view>
        <view class="step-future__fail bg-white text-center">原因：用户手动取消</view>
        <view class="h32 bg-white"></view>
      </block>
    </block>
    <block v-else>
      <!--  提交申请状态start  -->
      <view v-if="currentStep === 0">
        <view v-if="type === 'success'" class="details-state">申请提交成功，请等待平台审核</view>
      </view>

      <!--  提交申请状态end  -->
      <!--  审核通过状态start  -->
      <view v-if="currentStep > 1" class="details-state">
        <view v-if="detailInfo.refundInformation.status === 2120">
          审核通过，等待买家上传物流信息
        </view>
        <view v-if="detailInfo.refundInformation.status === 2130"> 退货已签收，等待银行退款 </view>
        <view v-if="detailInfo.refundInformation.status === 2140">
          {{
            detailInfo.isSuccess
              ? '退款成功' + detailInfo.refundInformation.amount + '元，退货待签收'
              : '退货待签收'
          }}
        </view>
        <view v-if="detailInfo.refundInformation.status === 2150">
          退款成功{{ detailInfo.refundInformation.amount }}元，退货已签收
        </view>
      </view>
    </block>

    <!--  平台处理审核  -->
    <block v-if="detailInfo.status === 3 || detailInfo.status === 4">
      <PlatformProcessingAudit :audit-list="auditFail" />
    </block>
    <block v-if="detailInfo.status === 2">
      <PlatformProcessingAudit :audit-list="auditSuccess" />
    </block>
    <!--退还商品收货地址 -->
    <ShippingAddress
      v-if="
        detailInfo.refundInformation.status === 2140 || detailInfo.refundInformation.status === 2150
      "
      :address-list="addressList"
    ></ShippingAddress>
    <ProductReturnInfo
      v-if="currentStep === 3 || currentStep === 4"
      :return-info-list="returnInfoButton"
      @confirmReceipt="confirmReceipt"
    />
    <!--  售后信息  -->
    <AfterSalesInformation :after-sales-list="afterSalesList" />
    <!--  描述及凭证  -->
    <DescribeProof
      v-if="
        this.describeProofList.info ||
        (this.describeProofList.imageList && this.describeProofList.imageList.length)
      "
      :describe-proof-list="describeProofList"
    />
    <!--  商品交易信息  -->
    <TransactionInfo :transaction-list="transactionList" />
    <!--  订单信息  -->
    <OrderInformation
      :order-id="detailInfo.refundInformation.oriOrderId || ''"
      :order-time="detailInfo.refundGoods.orderCreateTime"
    />
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  import AfterSalesInformation from './components/AfterSalesInformation'
  import DescribeProof from './components/DescribeProof'
  import TransactionInfo from './components/TransactionInfo'
  import OrderInformation from './components/OrderInformation'
  import PlatformProcessingAudit from './components/PlatformProcessingAudit'
  import ProductReturnInfo from './components/ProductReturnInfo'
  import ShippingAddress from './components/ShippingAddress'

  export default {
    name: 'ReturnRefundDetails',
    components: {
      AfterSalesInformation,
      DescribeProof,
      TransactionInfo,
      OrderInformation,
      PlatformProcessingAudit,
      ProductReturnInfo,
      ShippingAddress,
    },
    onLoad(option) {
      this.returnDetailRequest(option.id)
    },
    data() {
      return {
        currentStep: 0,
        type: '',
        //详情数据
        detailInfo: {
          refundInformation: {},
          refundGoods: {},
          receiverAddress: {},
        },
        afterSalesList: {
          serviceNum: '',
          applicant: '',
          applyTime: '',
          afterType: '',
          productNum: 0,
          refund: '',
          reason: '',
          whetherReceiptGoods: '',
        },
        describeProofList: {
          info: '',
          imageList: [],
        },
        transactionList: {
          infoImg: '',
          content: '',
          price: '',
          num: '',
          categoryType: '',
        },
        auditSuccess: [
          {
            name: '平台审核：',
            details: '审核通过',
          },
          {
            name: '确认退款金额：',
            details: '',
          },
          {
            name: '退款方式：',
            details: '',
          },
          {
            name: '处理备注：',
            details: '',
          },
          {
            name: '',
            details: '',
          },
        ],
        auditFail: [
          {
            name: '平台审核：',
            details: '审核未通过',
          },
          {
            name: '未通过原因：',
            details: '',
          },
        ],
        addressList: {
          point: '',
          name: '',
          address: '',
          phone: '',
        },
        returnInfoButton: {
          info: '发货凭证：',
          waybillNum: '',
          imageList: [],
          phone: '',
          logistics: '',
          deliveryType: '',
        },
      }
    },
    methods: {
      /**
       * 确认收货
       */
      confirmReceipt() {
        let param = { orderId: this.detailInfo.refundInformation.id }
        this.confirmGoodRequest(param)
      },
      /**
       * 退款详情请求
       */
      returnDetailRequest(orderId) {
        let params = {
          id: orderId,
        }
        this.$VoHttp
          .apiRefundDetail(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退款详情', res)
              this.detailInfo = res.data
              this.processTopData()
              this.processAfterSaleData()
              this.processGoodData()
              this.processAddressData()
              this.processLogisticsData()
              this.processPlatformData()
            } else {
              uni.$u.toast(res.message || '退款详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款详情获取失败')
          })
      },
      //控制顶部进度条
      processTopData() {
        //审核失败 && 取消审核
        if (this.detailInfo.status === 3 || this.detailInfo.status === 4) {
          this.type = 'fail'
        } else {
          this.type = 'success'
          if (this.detailInfo.status === 1) {
            this.currentStep = 1
            return
          }
          if (this.detailInfo.status === 2) {
            this.currentStep = 2
            if (this.detailInfo.refundInformation.status === 2140) {
              this.currentStep = 3
              return
            }
            if (this.detailInfo.refundInformation.status === 2150) {
              this.currentStep = 4
              return
            }
            if (this.detailInfo.refundInformation.status === 2130) {
              this.currentStep = 2
              return
            }
          }
        }
      },
      //处理售后信息 和 描述凭证
      processAfterSaleData() {
        let afterSaleData = this.detailInfo.refundInformation

        //售后信息
        this.afterSalesList.serviceNum = afterSaleData.id
        this.afterSalesList.applicant = afterSaleData.name
        this.afterSalesList.applyTime = afterSaleData.createTime
        this.afterSalesList.afterType = afterSaleData.isRefundOnly ? '仅退款' : '退货退款'
        this.afterSalesList.productNum = this.detailInfo.refundGoods.goodsCount
        this.afterSalesList.refund = afterSaleData.amount
        this.afterSalesList.reason = afterSaleData.reason
        this.afterSalesList.whetherReceiptGoods = afterSaleData.whetherReceiptGoods

        //描述凭证
        console.log('describeProofList', this.describeProofList)
        this.describeProofList.info = afterSaleData.remark
        if (afterSaleData.refundPic.indexOf(',') > -1) {
          this.describeProofList.imageList = afterSaleData.refundPic.split(',')
        } else {
          if (afterSaleData.refundPic === '{}' || afterSaleData.refundPic === '') {
            this.describeProofList.imageList = []
          } else {
            this.describeProofList.imageList = [afterSaleData.refundPic]
          }
        }
      },
      //处理商品交易信息
      processGoodData() {
        let goodData = this.detailInfo.refundGoods

        this.transactionList.infoImg = JSON.parse(goodData.pic)[0]
        this.transactionList.content = goodData.goodsName
        this.transactionList.price = goodData.payPrice
        this.transactionList.num = 'x' + goodData.goodsCount
        this.transactionList.categoryType = goodData.categoryType
        this.transactionList.engineNoList = goodData.engineNoList
      },
      //处理收货地址信息
      processAddressData() {
        let addressData = this.detailInfo.receiverAddress
        console.log(addressData)

        this.addressList.point = this.detailInfo.refundGoods.refundWarehouseName
        this.addressList.name = addressData.name
        this.addressList.address = addressData.areaName
          ? addressData.areaName
          : '' + addressData.address
          ? addressData.address
          : ''
        this.addressList.phone = addressData.mobile
      },
      //处理物流信息
      processLogisticsData() {
        let logisticsData = this.detailInfo.deliveryDetails

        this.returnInfoButton.waybillNum = logisticsData.deliveryNum
        this.returnInfoButton.logistics = logisticsData.deliveryCompany
        this.returnInfoButton.phone = logisticsData.deliveryMobile
        this.returnInfoButton.deliveryType = logisticsData.deliveryType
        this.returnInfoButton.imageList = [{ proofImg: logisticsData.deliveryPic }]
        this.returnInfoButton.receivingTime = this.detailInfo.receiverAddress.receivingTime

        if (this.detailInfo.refundInformation.status === 2150) {
          this.returnInfoButton.confirm = false
          return
        }
        if (this.detailInfo.refundInformation.status === 2140) {
          this.returnInfoButton.confirm = true
          return
        }
      },
      //处理平台审核数据
      processPlatformData() {
        let afterSaleData = this.detailInfo.refundInformation
        //添加退款时间字段
        if (
          this.detailInfo.refundInformation.status === 2150 ||
          this.detailInfo.refundInformation.status === 2140
        ) {
          this.auditSuccess[4].details = afterSaleData.refundTime
          this.auditSuccess[4].name = '退款时间'
        }
        //退款成功
        if (this.detailInfo.refundInformation.status === 2150 || this.detailInfo.status === 2) {
          this.auditSuccess[0].details = '审核通过'
          this.auditSuccess[1].details = afterSaleData.amount + '元'
          if (afterSaleData.isSplit) {
            this.auditSuccess[2].details = '退款至账户余额'
          } else {
            //1：微信，11：支付宝，51：银联 61:账期支付
            if (afterSaleData.payType === 1) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '微信'
            }
            if (afterSaleData.payType === 11) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '支付宝'
            }
            if (afterSaleData.payType === 51) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '银行卡'
            }
          }
          // this.auditSuccess[3].details = afterSaleData.refundTime
          this.auditSuccess[3].details = this.detailInfo.auditRemark
          return
        }
        //审核未通过
        if (this.detailInfo.status === 3) {
          this.auditFail[1].details = this.detailInfo.auditRemark
          return
        }
        //审核取消
        if (this.detailInfo.status === 4) {
          this.auditFail[1].details = '买家手动取消'
          return
        }
      },
      /**
       * 提交物流信息
       */
      confirmLogistics(param) {
        param.orderId = this.detailInfo.refundInformation.id
        this.returnRequest(param)
      },
      /**
       * 发起退货单
       */
      returnRequest(param) {
        this.$VoHttp
          .apiRefundCreateDelivery(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('提交物流信息成功')
              this.returnDetailRequest(param.id)
            } else {
              uni.$u.toast(res.message || '提交物流信息失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提交物流信息失败')
          })
      },
      /**
       * 确认收货
       */
      confirmGoodRequest(param) {
        this.$VoHttp
          .apiRefundReceipt(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.returnDetailRequest(param.orderId)
            } else {
              uni.$u.toast(res.message || '确认收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '确认收货失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    width: 750rpx;
    min-height: 100vh;
    &-steps {
      background: #ffffff;
      padding: 24rpx 32rpx 24rpx 0;
    }
    &-state {
      width: 750rpx;
      height: 108rpx;
      line-height: 108rpx;
      background: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 28rpx;
      color: $color-primary-red;
    }
  }
  .step-future {
    color: $v-c0-25;
    font-size: 28rpx;
    line-height: 42rpx;
    &__current {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #ff5319;
      font-weight: bold;
    }
    &__past {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &__fail {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #f20014;
    }
  }
</style>
