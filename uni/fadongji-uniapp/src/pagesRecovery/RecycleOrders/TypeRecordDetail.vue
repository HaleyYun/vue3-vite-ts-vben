<template>
  <view>
    <view v-if="info" class="recall flex flex-column">
      <VoNav is-fixed is-have-more title="">
        <block slot="title">
          <view class="flex flex-vertical-c flex-justify-c">
            <VoIcon v-if="info.status === 3360" class="m-r-12" name="success-circle" size="28" />
            <VoIcon v-else-if="info.status === 3370" class="m-r-12" name="warning" size="28" />
            {{ titleList[statusList.indexOf(info.status)] }}
          </view>
        </block>
      </VoNav>
      <view v-if="info.status === 3370" class="recall-top">取消原因：修理厂手动取消订单</view>
      <view v-if="info.status === 3380" class="recall-top">关闭原因：旧机查验未通过</view>
      <view class="flex1 overflow-y">
        <!--  寄回信息  -->
        <view v-if="info.orderDeliveryVO" class="m-t-20 bg-white">
          <SendInformation :info="info.orderDeliveryVO" />
        </view>
        <!--  验收情况  -->
        <view v-if="info.supportQualityVO">
          <view
            v-if="
              (info.supportQualityVO.checkMsg.pic && info.supportQualityVO.checkMsg.pic.length) ||
              (info.supportQualityVO.checkMsg.video && info.supportQualityVO.checkMsg.video.length)
            "
            class="m-t-20 bg-white"
          >
            <AcceptanceCondition :info="info" />
          </view>
        </view>
        <!--  服务评价  -->
        <view v-if="info.orderServiceEvaluateVO" class="m-t-20 bg-white">
          <ServiceEvaluation :info="info.orderServiceEvaluateVO" />
        </view>
        <!--  修理厂信息  -->
        <view v-if="info.addressDetail.addressDetail" class="m-t-20 bg-white">
          <GarageInfo :info="info" />
        </view>
        <!--  回收商品  -->
        <view v-if="info.supportName" class="m-t-20 bg-white">
          <ServiceProject :info="info" />
        </view>
        <!--  商品信息  -->
        <view v-if="info.engineMsg" class="m-t-20 bg-white">
          <OldMachineMessage :info="info" />
        </view>
        <!--  集师傅  -->
        <view v-if="info.technicianInfo" class="m-t-20 bg-white">
          <TheMaster :info="info" />
        </view>
        <!--  订单信息  -->
        <view v-if="info.id" class="m-t-20 bg-white">
          <OrderInformation :info="info" />
        </view>
      </view>
      <!--  底部固定按钮  -->
      <!--  底部按钮  -->
      <view v-if="info.status === 3320" class="recall-bottom flex flex-justify-r flex-vertical-c">
        <view class="recall-bottom__button right" @click="toCheck">查验</view>
      </view>
      <view
        v-else-if="info.status === 3352"
        class="recall-bottom flex flex-justify-r flex-vertical-c"
      >
        <!--        <view class="recall-bottom__button left">查看物流信息</view>-->
        <view class="recall-bottom__button right" @click="confirmReceipt">确认收货</view>
      </view>
      <VoSafetyArea :is-fixed="false" />
    </view>
    <QualityTestModal ref="qualityTestModal" @updateFn="updateFn" />
    <ConfirmReceiptModal
      ref="confirmReceiptModal"
      :goodsStatus="goodsStatus"
      :radioList="radioList"
      :type="type"
      @updateFn="updateFn"
    />
  </view>
</template>

<script>
  import SendInformation from './components/SendInformation.vue'
  import AcceptanceCondition from './components/AcceptanceCondition.vue'
  import ServiceEvaluation from './components/ServiceEvaluation.vue'
  import GarageInfo from './components/GarageInfo.vue'
  import ServiceProject from './components/ServiceProject.vue'
  import OldMachineMessage from './components/OldMachineMessage.vue'
  import TheMaster from './components/TheMaster.vue'
  import OrderInformation from './components/OrderInformation.vue'
  import QualityTestModal from './components/QualityTestModal'
  import ConfirmReceiptModal from './components/ConfirmReceiptModal'

  export default {
    name: 'TypeRecordDetail',
    components: {
      SendInformation,
      AcceptanceCondition,
      ServiceEvaluation,
      GarageInfo,
      ServiceProject,
      OldMachineMessage,
      TheMaster,
      OrderInformation,
      QualityTestModal,
      ConfirmReceiptModal,
    },
    data() {
      return {
        radioList: [],
        goodsStatus: 0,
        type: 1,
        // 当前选中id
        optionsId: '',
        // 接口返回数据
        info: {
          addressDetail: {},
          supportQualityVO: {
            checkMsg: {
              pic: [],
              video: [],
            },
          },
          garageInfo: {},
          engineMsg: {
            pic: [],
          },
          orderDeliveryVO: {
            logisticsDetail: '',
          },
        },
        titleList: [
          '待付款',
          '待查验',
          '待接单',
          '待指派',
          '待上门',
          '待上门',
          '回收中',
          '待发货',
          '待收货',
          '已完成',
          '已取消',
          '已关闭',
        ],
        statusList: [3310, 3320, 3330, 3331, 3340, 3341, 3350, 3351, 3352, 3360, 3370, 3380],
      }
    },
    onLoad(options) {
      this.optionsId = options.id || ''
      this.getData()
    },
    methods: {
      // 获取数据
      async getData() {
        try {
          const { data } = await this.$VoHttp.apiOrderRecycleDetail({ id: this.optionsId })
          console.log('asd', data)

          data.engineMsg = JSON.parse(data.engineMsg, (key, val) => {
            if (key == 'modelId') return BigInt(val).toString()
            else return val
          })
          console.log(data.engineMsg, 159753)
          data.addressDetail = JSON.parse(data.addressDetail)
          console.log(data.addressDetail, 'this.info.addressDetail')
          if (data.orderServiceEvaluateVO) {
            data.orderServiceEvaluateVO.content = JSON.parse(
              data.orderServiceEvaluateVO.content,
            )
          }
          //寄回信息
          if (data.orderDeliveryVO && data.orderDeliveryVO.logisticsDetail) {
            data.logisticsDetail = JSON.parse(data.orderDeliveryVO.logisticsDetail)
            console.log('寄回信息', data.logisticsDetail)
          }
          if (data.supportQualityVO) {
            console.log(
              JSON.parse(data.supportQualityVO.checkMsg),
              'this.info.supportQualityVO.checkMsg',
            )
            data.supportQualityVO.checkMsg = JSON.parse(data.supportQualityVO.checkMsg)
          }
          this.info = Object.assign({}, data)
          this.$forceUpdate()
        } catch (e) {
          uni.$u.toast(e.message || '请求失败')
        }
      },
      //查验
      toCheck() {
        this.$refs.qualityTestModal.show({ id: this.optionsId })
      },
      // 确定查验后刷新列表
      updateFn() {
        this.getData()
      },
      /**
       * 确认收货
       */
      async confirmReceipt() {
        const { modelId } = this.info.engineMsg
        const res = await this.$VoHttp.apiGoodsRecyleResaleQueryByModelId({ modelId })
        console.log(res)
        if (res.data) {
          this.type = 1
          this.goodsStatus = res.data.status
          this.radioList = res.data.levelInfoVOS.map((item) => {
            return { name: item.level + '类', value: item.level }
          })
        } else {
          this.type = 0
        }
        this.$refs.confirmReceiptModal.show(this.info)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .recall {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-top {
      font-size: 28rpx;
      margin: 24rpx 0 20rpx;
      text-align: center;
      color: $v-c0-85;
    }
    &-bottom {
      background: #fff;
      padding: 24rpx 32rpx;
      font-size: 24rpx;
      &__button {
        padding: 0 68rpx;
        box-sizing: border-box;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 126rpx;
        &.left {
          border: 2rpx solid rgba(0, 0, 0, 0.25);
        }
        &.right {
          border: 2rpx solid #ff5319;
          color: #ff5319;
          margin-left: 32rpx;
        }
      }
    }
  }
</style>
