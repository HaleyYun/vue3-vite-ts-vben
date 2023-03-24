<template>
  <view>
    <view class="details flex flex-column">
      <VoNav :isBack="false" is-fixed is-have-more title="退货/退款详情" @backFn="reback">
      </VoNav>
      <view v-if="detailInfo.refundInformation" class="details-flex1 flex1 overflow-y">
        <!--  步骤条部分  -->
        <!--审核未通过-->
        <view v-if="type === 'fail'" class="details-steps">
          <EraSteps :current="1" activeColor="#FFECE5">
            <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
              <text slot="icon">
                <voIcon :size="24" color="#00B359" name="success-fill" />
              </text>
            </EraStepsItem>
            <EraStepsItem :desc="detailInfo.auditTime || ''" title="审核未通过">
              <text slot="icon">
                <voIcon :size="24" color="#EE0A24" name="close-fill" />
              </text>
            </EraStepsItem>
          </EraSteps>
        </view>
        <view v-if="type === 'success'" class="details-steps">
          <EraSteps :current="currentStep" activeColor="#FFECE5">
            <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
              <text slot="icon">
                <voIcon :size="24" color="#00B359" name="success-fill" />
              </text>
            </EraStepsItem>
            <EraStepsItem
              :desc="currentStep > 1 ? detailInfo.auditTime || '' : ''"
              title="审核通过"
            >
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
            <EraStepsItem
              :desc="detailInfo.refundInformation.finishTime || ''"
              title="退货退款完成"
            >
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
          <view v-if="detailInfo.status === 3">
            <view class="details-state">
              <view>退款申请审核未通过</view>
              <view v-show="detailInfo.auditRemark"> 原因：{{ detailInfo.auditRemark }} </view>
            </view>
          </view>
          <block v-else>
            <view class="details-state">
              <view>退款申请已取消</view>
              <view>原因：用户手动取消</view>
            </view>
          </block>
        </block>
        <block v-else>
          <!--  提交申请状态start  -->
          <view v-if="currentStep === 1">
            <view v-if="type === 'success'" class="details-state"
              >申请提交成功，请等待平台审核</view
            >
          </view>
          <!--  提交申请状态end  -->
          <!--  审核通过状态start  -->
          <view v-if="currentStep > 1" class="details-state">
            <view v-if="detailInfo.refundInformation.status === 2120">
              审核通过，等待买家上传物流信息
            </view>
            <view v-if="detailInfo.refundInformation.status === 2130">
              退货已签收，等待银行退款
            </view>
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
        <template v-if="detailInfo.status === 3 || detailInfo.status === 4">
          <PlatformProcessingAudit :audit-list="auditFail" />
        </template>
        <template v-if="detailInfo.status === 2">
          <PlatformProcessingAudit :audit-list="auditSuccess" />
        </template>
        <!--  退还商品收货地址 && 我发起的退货  -->
        <ShippingAddress v-if="detailInfo.status === 2" :address-list="addressList" />
        <!--  商品寄回信息  && 我发起的退货  -->
        <ProductReturnInfo
          v-if="(currentStep === 4 || currentStep === 3) && orderType === 0"
          :return-info-list="returnInfoButton"
          @confirmReceipt="confirmReceipt"
        />
        <!--  商品寄回信息 && 我收到的退货  -->
        <ProductReturnInfo
          v-if="(currentStep === 3 || currentStep === 4) && orderType === 1"
          :return-info-list="returnInfoButton"
          @confirmReceipt="confirmReceipt"
        />
        <!--  商品寄回信息 && 我发起的退货 -->
        <ReturnGoodLogistics
          v-if="currentStep === 2 && orderType === 0"
          @confirmLogistics="confirmLogistics"
        />
        <!--  售后信息  -->
        <AfterSalesInformation :after-sales-list="afterSalesList" />
        <!--  描述及凭证  -->
        <DescribeProof :describe-proof-list="describeProofList" />
        <!--  商品交易信息  -->
        <TransactionInfo :transaction-list="transactionList" />
        <!--  订单信息  -->
        <OrderInformation
          :order-id="detailInfo.refundInformation.oriOrderId || ''"
          :order-time="detailInfo.refundGoods.orderCreateTime"
        />
      </view>
      <!--   底部固定区域   -->
      <view
        v-show="+detailInfo.status === 1 && orderType === 0"
        class="details-bottom flex flex-justify-r"
      >
        <view class="details-bottom__button" @click="cancelReturn = true">取消申请</view>
      </view>
      <view class="p-b-safe-area" />
    </view>
    <VoModal
      :show="cancelReturn"
      :showCancelButton="true"
      cancelText="取消"
      confirmColor="#22284B"
      confirmText="确定"
      content="确认要取消售后申请吗？"
      @cancel="cancelReturn = false"
      @confirm="confirmCancel"
    />
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
      this.detailID = option.id
      this.returnDetailRequest(option.id)
      this.orderType = Number(option.type)
    },
    data() {
      return {
        currentStep: 0,
        type: '',
        cancelReturn: false,
        detailID: '',
        //0.我发起的 1.我收到的
        orderType: 0,
        reviceGoods: false,
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
          periodDays: 0,
        },
        auditSuccess: [
          {
            name: '平台审核：',
            details: '审核通过',
          },
          {
            name: '退款金额：',
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
          imageList: [
            {
              proofImg: '',
            },
          ],
          waybillNum: '',
          logistics: '',
          phone: '',
          confirm: false,
          deliveryType: '',
        },
      }
    },
    methods: {
      reback() {
        if (this.reviceGoods) {
          uni.$emit('back', 1)
        }
        this.$backFn()
      },
      confirmCancel() {
        this.cancelReturn = false
        let param = {
          orderId: this.detailID,
          isRefundOnly: false,
          cause: '用户自主取消',
        }

        this.$VoHttp
          .apiRefundCancelApply(param)
          .then(() => {
            this.returnDetailRequest(this.detailID)
          })
          .catch((err) => {
            uni.$u.toast(err.message || '取消申请失败')
          })
      },
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
        console.log(this.detailInfo)
        //审核失败 && 取消审核
        if (this.detailInfo.status === 3 || this.detailInfo.status === 4) {
          this.type = 'fail'
          this.currentStep = 1
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
              this.currentStep = 3
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
        this.afterSalesList.applyTime = afterSaleData.createTime ? afterSaleData.createTime : ''
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
        this.transactionList.periodDays = goodData.periodDays
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
        //发货方式 1.物流发货 2.无需物流
        this.returnInfoButton.deliveryType = logisticsData.deliveryType
        this.returnInfoButton.imageList = [{ proofImg: logisticsData.deliveryPic }]
        this.returnInfoButton.receivingTime = this.detailInfo.receiverAddress.receivingTime

        if (this.detailInfo.refundInformation.status === 2150) {
          this.returnInfoButton.confirm = false
          return
        }
        if (this.detailInfo.refundInformation.status === 2140) {
          if (this.orderType === 1) {
            this.returnInfoButton.confirm = true
          } else {
            this.returnInfoButton.confirm = false
          }
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
          }
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
          this.auditFail[1].details = '用户手动取消'
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
            this.returnDetailRequest(param.orderId)
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
            uni.$u.toast('确认收货成功')
            this.reviceGoods = true
            this.returnDetailRequest(param.orderId)
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
    height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    &-steps {
      background: #ffffff;
      padding: 24rpx 32rpx 24rpx 0;
    }
    &-state {
      width: 750rpx;
      padding-top: 10rpx;
      padding-bottom: 40rpx;
      background: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 28rpx;
      color: $color-primary-red;
    }
    &-flex1 {
      width: 750rpx;
      overflow-x: hidden;
    }
    &-bottom {
      padding: 24rpx 32rpx 16rpx;
      box-sizing: border-box;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;
      &__button {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
        box-sizing: border-box;
      }
      &__width {
        width: 200rpx;
      }
    }
  }
</style>
