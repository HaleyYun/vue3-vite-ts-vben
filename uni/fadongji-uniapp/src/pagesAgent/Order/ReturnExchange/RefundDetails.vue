<template>
  <view>
    <view class="details flex flex-column">
      <VoNav is-fixed is-have-more title="退款详情">

      </VoNav>
      <VoSafetyArea />
      <view v-if="detailInfo.refundInformation" class="details-flex1 flex1 overflow-y">
        <!--  步骤条部分  -->
        <!--  步骤条部分  -->
        <!--审核未通过-->
        <view v-if="type === 'fail'" class="details-steps">
          <EraSteps :current="1" activeColor="#FF5319">
            <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
              <text slot="icon">
                <VoIcon :size="24" color="#00B359" display="block" name="success-fill" />
              </text>
            </EraStepsItem>
            <EraStepsItem :desc="detailInfo.auditTime || ''" title="未通过">
              <text slot="icon">
                <VoIcon :size="24" color="#EE0A24" display="block" name="close-fill" />
              </text>
            </EraStepsItem>
          </EraSteps>
        </view>
        <view v-if="type === 'success'" class="details-steps">
          <EraSteps :current="currentStep" activeColor="#FFECE5">
            <EraStepsItem :desc="detailInfo.refundInformation.createTime || ''" title="提交申请">
              <text v-if="currentStep === 0" slot="icon">
                <VoIcon :size="24" color="#FF5319" display="block" name="more-fill" />
              </text>
              <text v-else-if="currentStep > 0" slot="icon">
                <VoIcon :size="24" color="#00B359" display="block" name="success-fill" />
              </text>
            </EraStepsItem>
            <EraStepsItem
              :desc="currentStep > 1 ? detailInfo.auditTime || '' : ''"
              title="审核通过"
            >
              <text v-if="currentStep === 1" slot="icon">
                <VoIcon :size="24" color="#FF5319" display="block" name="more-fill" />
              </text>
              <text v-else-if="currentStep > 1" slot="icon">
                <VoIcon :size="24" color="#00B359" display="block" name="success-fill" />
              </text>
            </EraStepsItem>
            <EraStepsItem :desc="detailInfo.refundInformation.refundTime || ''" title="退款完成">
              <text v-if="currentStep === 2" slot="icon">
                <VoIcon :size="24" color="#FF5319" display="block" name="more-fill" />
              </text>
              <text v-if="currentStep > 2" slot="icon">
                <VoIcon :size="24" color="#00B359" display="block" name="success-fill" />
              </text>
            </EraStepsItem>
          </EraSteps>
        </view>

        <!--进度条显示语-->
        <block v-if="detailInfo.status === 3 || detailInfo.status === 4">
          <view class="details-state">
            <block v-if="detailInfo.status === 3">
              <view>退款申请审核未通过</view>
              <view v-show="detailInfo.auditRemark">原因：{{ detailInfo.auditRemark }}</view>
            </block>
            <block v-else>
              <view>退款申请已取消</view>
              <view>原因：用户手动取消</view>
            </block>
          </view>
        </block>
        <block v-else>
          <view v-if="currentStep === 1" class="details-state">申请提交成功，请等待平台审核</view>
          <!--  审核通过状态start  -->
          <view v-if="currentStep === 2" class="details-state">审核通过，等待退款中</view>
          <view v-if="currentStep === 3" class="details-state"
            >退款成功，退款金额{{ detailInfo.refundInformation.amount }}元</view
          >
        </block>
        <!--  平台处理审核  -->
        <template v-if="detailInfo.status === 3 || detailInfo.status === 4">
          <PlatformProcessingAudit :audit-list="auditFail" />
        </template>
        <template v-if="detailInfo.status === 2">
          <PlatformProcessingAudit :audit-list="auditSuccess" />
        </template>

        <!--  售后信息  -->
        <AfterSalesInformation :after-sales-list="afterSalesList" />
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
  import TransactionInfo from './components/TransactionInfo'
  import OrderInformation from './components/OrderInformation'
  import PlatformProcessingAudit from './components/PlatformProcessingAudit'

  export default {
    name: 'RefundDetails',
    components: {
      AfterSalesInformation,
      TransactionInfo,
      OrderInformation,
      PlatformProcessingAudit,
    },
    onLoad(option) {
      this.orderType = Number(option.type)
      this.detailID = option.id
      this.returnDetailRequest(option.id)
    },
    data() {
      return {
        currentStep: 4,
        detailID: '',
        cancelReturn: false,
        type: '',
        orderType: 0,
        //详情数据
        detailInfo: {
          refundInformation: {},
          refundGoods: {},
        },
        //售后服务
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
            details: '',
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
      }
    },
    methods: {
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
        if (this.detailInfo.status === 3 || this.detailInfo.status === 4) {
          this.type = 'fail'
          this.currentStep = 1
        } else {
          this.type = 'success'
          this.currentStep = 1

          if (this.detailInfo.status === 2) {
            if (this.detailInfo.refundInformation.status === 2130) {
              this.currentStep = 2
              return
            }
            if (this.detailInfo.refundInformation.status === 2150) {
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
        this.afterSalesList.applyTime = afterSaleData.createTime
        this.afterSalesList.afterType = afterSaleData.isRefundOnly ? '仅退款' : '退货退款'
        this.afterSalesList.productNum = this.detailInfo.refundGoods.goodsCount
        this.afterSalesList.refund = afterSaleData.amount
        this.afterSalesList.reason = afterSaleData.reason
        this.afterSalesList.whetherReceiptGoods = afterSaleData.whetherReceiptGoods
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
        //审核取消
        if (this.detailInfo.status === 4) {
          this.auditFail[1].details = '用户手动取消'
          return
        }
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
      height: 108rpx;
      line-height: 108rpx;
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
