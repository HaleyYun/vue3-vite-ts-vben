<template>
  <view class="details">
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
        <EraStepsItem :desc="detailInfo.auditTime || ''" title="未通过">
          <text slot="icon">
            <voIcon :size="24" color="#EE0A24" name="close-fill" />
          </text>
        </EraStepsItem>
      </EraSteps>
    </view>
    <view v-if="type === 'success'" class="details-steps">
      <EraSteps :current="currentStep" activeColor="#FFECE5">
        <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
          <text v-if="currentStep === 0" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 0" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
        </EraStepsItem>
        <EraStepsItem :desc="currentStep > 1 ? detailInfo.auditTime || '' : ''" title="审核通过">
          <text v-if="currentStep === 1" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 1" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
        </EraStepsItem>
        <EraStepsItem :desc="detailInfo.upLoadNumTime || ''" title="上传物流单号">
          <text v-if="currentStep === 2" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 2" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
        </EraStepsItem>
        <EraStepsItem :desc="detailInfo.refundInformation.finishTime || ''" title="退货退款完成">
          <text v-if="currentStep === 3" slot="icon">
            <voIcon :size="24" color="#FF5319" name="more-fill" />
          </text>
          <text v-else-if="currentStep > 3" slot="icon">
            <voIcon :size="24" color="#00B359" name="success-fill" />
          </text>
        </EraStepsItem>
      </EraSteps>
    </view>

    <!--进度条显示语-->
    <block v-if="detailInfo.status === 3 || detailInfo.status === 4">
      <view class="details-state">
        <view v-if="detailInfo.status === 3">
          <view>退款申请审核未通过</view>
          <view v-show="detailInfo.auditRemark">原因：{{ detailInfo.auditRemark }}</view>
        </view>
        <block v-else>
          <view>退款申请已取消</view>
          <view>原因：用户手动取消</view>
        </block>
      </view>
    </block>
    <block v-else>
      <view class="details-state">
        <view v-if="detailInfo.refundInformation.status === 2110"
          >申请提交成功，请等待平台审核</view
        >
        <view v-if="detailInfo.refundInformation.status === 2120"
          >审核通过，请上传商品寄回物流单号</view
        >
        <view v-if="detailInfo.refundInformation.status === 2130">退货已签收，等待银行退款</view>
        <view v-if="detailInfo.refundInformation.status === 2140">
          {{
            detailInfo.isSuccess
              ? '退款成功' + detailInfo.refundInformation.amount + '元，退货待签收'
              : '退货待签收'
          }}
        </view>
        <view v-else-if="detailInfo.refundInformation.status === 2150">
          退款成功{{ detailInfo.refundInformation.amount }}元，退货已签收
        </view>
      </view>
    </block>

    <!--  平台处理审核  -->
    <!--  审核失败 || 取消审核  -->
    <PlatformProcessingAudit
      v-if="detailInfo.status === 3 || detailInfo.status === 4"
      :audit-list="auditFail"
    />
    <!--  平台处理审核  -->
    <PlatformProcessingAudit v-if="detailInfo.status === 2" :audit-list="auditSuccess" />
    <!--  退还商品收货地址  -->
    <ShippingAddress v-if="detailInfo.status === 2" :address-list="addressList" />
    <!--  商品寄回信息  -->
    <ReturnGoodLogistics v-if="currentStep === 2" @confirmLogistics="confirmLogistics" />
    <ProductReturnInfo
      v-if="currentStep === 3"
      :return-info-list="returnInfoButton"
      @confirmReceipt="confirmReceipt"
    />
    <ProductReturnInfo
      v-if="currentStep === 4"
      :return-info-list="returnInfoButton"
      @confirmReceipt="confirmReceipt"
    />
    <!--  商品交易信息  -->
    <TransactionInfo :transaction-list="transactionList" />
    <!--  售后信息  -->
    <AfterSalesInformation :after-sales-list="afterSalesList" />
    <!--  描述及凭证  -->
    <DescribeProof
      v-show="describeProofList.info || describeProofList.imageList.length > 0"
      :describe-proof-list="describeProofList"
    />
    <!--  订单信息  -->
    <OrderInformation
      :order-id="detailInfo.refundInformation.oriOrderId || ''"
      :order-time="detailInfo.refundGoods.orderCreateTime"
    />
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  import AfterSalesInformation from './components/AfterSalesInformation'
  import DescribeProof from './components/DescribeProof'
  import TransactionInfo from './components/TransactionInfo'
  import OrderInformation from './components/OrderInformation'
  import PlatformProcessingAudit from './components/PlatformProcessingAudit'
  import ShippingAddress from './components/ShippingAddress'
  import ProductReturnInfo from './components/ProductReturnInfo'
  import ReturnGoodLogistics from './components/ReturnGoodLogistics'

  export default {
    name: 'ReturnRefundDetails',
    components: {
      AfterSalesInformation,
      DescribeProof,
      TransactionInfo,
      OrderInformation,
      PlatformProcessingAudit,
      ShippingAddress,
      ProductReturnInfo,
      ReturnGoodLogistics,
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
            name: '退款时间：',
            details: '',
          },
          {
            name: '处理备注：',
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
          imageList: [
            {
              proofImg: '/static/created/product/rectangle.png',
            },
          ],
          waybillNum: '',
          logistics: '',
          phone: '',
        },
      }
    },
    methods: {
      /**
       * 确认收货
       */
      confirmReceipt() {
        uni.$u.toast('确认收货')
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
        //3.审核失败 4.用户手动取消审核
        if (this.detailInfo.status === 3 || this.detailInfo.status === 4) {
          this.type = 'fail'
          this.currentStep = 1
        } else {
          this.type = 'success'
          //已提交待审核
          if (this.detailInfo.status === 1) {
            this.currentStep = 1
            return
          }
          //审核成功
          if (this.detailInfo.status === 2) {
            //退款失败 等待退款 正常情况下不存在 & 如果退款成功 等待上物流信息
            this.currentStep = 2

            //代签收 物流上传成功等待卖家签收 审核通过等待商家退款
            if (
              this.detailInfo.refundInformation.status === 2140 ||
              this.detailInfo.refundInformation.status === 2130
            ) {
              this.currentStep = 3
              return
            }
            //已完成 卖家签收 订单已完成
            if (this.detailInfo.refundInformation.status === 2150) {
              this.currentStep = 4
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
        this.returnInfoButton.imageList = [{ proofImg: logisticsData.deliveryPic }]
        this.returnInfoButton.receivingTime = this.detailInfo.receiverAddress.receivingTime

        //状态2110：待审核，2120：待发货，2130：待退款，2140:待签收,2150:已完成,2160:已关闭
        if (
          this.detailInfo.refundInformation.status === 2150 ||
          this.detailInfo.refundInformation.status === 2140 ||
          this.detailInfo.refundInformation.status === 2160
        ) {
          this.returnInfoButton.confirm = false
          return
        }
      },
      //处理平台审核数据
      processPlatformData() {
        let afterSaleData = this.detailInfo.refundInformation
        //退款成功
        if (this.detailInfo.refundInformation.status === 2150 || this.detailInfo.status === 2) {
          this.auditSuccess[0].details = '审核通过'
          this.auditSuccess[1].details = afterSaleData.amount + '元'
          if (afterSaleData.isSplit) {
            this.auditSuccess[2].details = '退款至账户余额'
          } else {
            //1：微信，11：支付宝，51：银联
            if (afterSaleData.payType === 1) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '微信'
            }
            if (afterSaleData.payType === 11) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '支付宝'
            }
            if (afterSaleData.payType === 51) {
              this.auditSuccess[2].details = '退回到原支付渠道-' + '银行卡'
            }
            if (afterSaleData.payType === 61) {
              this.auditSuccess[2].details = this.detailInfo.refundInformation.isSplit
                ? '退款至账户余额'
                : '退回到原支付渠道'
            }
          }
          this.auditSuccess[3].details = afterSaleData.refundTime
          this.auditSuccess[4].details = this.detailInfo.auditRemark
          return
        }
        //审核未通过
        if (this.detailInfo.status === 3) {
          this.auditFail[1].details = this.detailInfo.auditRemark
          return
        }
        //用户手动取消审核
        if (this.detailInfo.status === 4) {
          this.auditFail[1].details = this.detailInfo.auditRemark || '用户手动取消审核'
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
              this.returnDetailRequest(param.orderId)
            } else {
              uni.$u.toast(res.message || '提交物流信息失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提交物流信息失败')
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
      padding-top: 20rpx;
      height: 108rpx;
      background: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 28rpx;
      color: $color-primary-red;
    }
  }
</style>
