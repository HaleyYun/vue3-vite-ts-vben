<template>
  <view class="install flex flex-column">
    <VoNav is-fixed is-have-more title="">
      <block slot="title">
        <!--  上门中  -->
        <view v-if="type === 0" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="clock-new" />
          <view class="m-l-8">上门中</view>
        </view>
        <!--  待确认  -->
        <view v-else-if="type === 1" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="clock-new" />
          <view class="m-l-8">待确认</view>
        </view>
        <!--  已完成  -->
        <view v-else-if="type === 2" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="success-circle" />
          <view class="m-l-8">已完成</view>
        </view>
        <!--  已取消  -->
        <view v-else-if="type === 3" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="warning" />
          <view class="m-l-8">已取消</view>
        </view>
      </block>
    </VoNav>
    <view v-if="deatilInfo" class="flex1 overflow-y">
      <!--  已取消状态顶部  -->
      <view v-if="type === 3" class="install-top">取消原因：{{ deatilInfo.cancelReason }}</view>
      <!--  上门中的修理厂信息  -->
      <view v-if="type === 0" class="m-t-20 bg-white">
        <RepairShop :repairShop="repairShopData">
          <!--          <view slot="navigation"></view>-->
          <view slot="bottom" class="install-slot flex flex-vertical-c">
            <view
              class="flex1 flex flex-vertical-c flex-justify-c"
              @click="$cellPhone(deatilInfo.orderAddress.phone)"
            >
              <VoIcon :size="20" color="#595959" name="mobile-new" />
              <view class="fz-24 color-block-65 m-l-12">拨打电话</view>
            </view>
            <view class="install-slot__line" />
            <view class="flex1 flex flex-vertical-c flex-justify-c" @click="goImUrl">
              <VoIcon :size="20" color="#595959" name="smile-m" />
              <view class="fz-24 color-block-65 m-l-12">发消息</view>
            </view>
          </view>
        </RepairShop>
      </view>
      <!--  其他三种状态的修理厂信息  -->
      <view v-else class="m-t-20 bg-white">
        <RepairShop :repairShop="repairShopData" :info="deatilInfo">
          <view slot="navigation" />
          <view slot="bottom" />
        </RepairShop>
      </view>
      <!--  服务信息  -->
      <view class="m-t-20 bg-white">
        <ServiceMessage :info="deatilInfo" :state="state" />
      </view>
      <!--  故障信息  -->
      <view class="m-t-20 bg-white">
        <FaultInformation :fault-info="faultInformation" describe-type="text" />
      </view>
      <!--  鉴定结果  -->
      <!--<view v-if="type === 1 || type === 2" class="m-t-20 bg-white">-->
      <view v-if="(type === 1 || type === 2) && deatilInfo.qualityResult" class="m-t-20 bg-white">
        <!--                <OldMachineInfo></OldMachineInfo>-->
        <!--        <OldMachineMessageImage :info="deatilInfo" />-->
        <IdentifyResult :data-obj="deatilInfo.qualityResult" @preViewVideo="preViewVideo" />
      </view>
      <!--  上门中的订单信息  -->
      <view v-if="type === 0" class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="doorInfoState" />
      </view>
      <!--  待确认的订单信息  -->
      <view v-else-if="type === 1" class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="confirmInfoState" />
      </view>
      <!--  已完成的订单信息  -->
      <view v-else-if="type === 2" class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="completeInfoState" />
      </view>
      <!--  已取消的订单信息  -->
      <view v-else-if="type === 3" class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="cancelInfoState" />
      </view>
    </view>
    <!--  底部按钮  -->
    <view v-if="type === 0" class="install-bottom flex flex-justify-r flex-vertical-c">
      <view class="install-bottom__left" @click.stop="toConcat">联系平台售后</view>
      <view
        class="install-bottom__right"
        @click.stop="
          $linkToEasy(`/pagesEngineer/AfterSalesOrder/SubmitAcceptanceCertificate?id=${optionsId}`)
        "
        >提交上门结果</view
      >
    </view>
    <view v-if="type === 1" class="install-bottom flex flex-justify-r flex-vertical-c">
      <view class="install-bottom__left" @click.stop="toConcat">联系客服</view>
    </view>
    <VoSafetyArea :is-fixed="false" />
    <VoHelpAction ref="helpRef" />
    <EraPreviewVideo ref="previewVideo" :videoSrc="curVideo.src" :poster="curVideo.poster" />
  </view>
</template>

<script>
  import RepairShop from '../components/RepairShop.vue'
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OrderInformation from '../components/OrderInformation.vue'
  import FaultInformation from './components/FaultInformation.vue'
  // import OldMachineMessageImage from '../components/OldMachineMessageImage.vue'
  import IdentifyResult from './components/IdentifyResult.vue'

  export default {
    name: 'DoorStatus',
    components: {
      RepairShop,
      ServiceMessage,
      OrderInformation,
      FaultInformation,
      IdentifyResult,
      // OldMachineMessageImage,
    },
    data() {
      return {
        type: 0, // 0：上门中，1：待确认，2：已完成，3：已取消
        optionsId: '',
        // 修理厂信息
        repairShopData: {
          name: '',
          address: '',
        },
        state: 3, // 服务信息售后状态
        doorInfoState: 0, // 订单信息上门中状态
        confirmInfoState: 4, // 订单信息待确认状态
        completeInfoState: 5, // 订单信息已完成状态
        cancelInfoState: 3, // 订单信息已取消状态
        // 故障信息
        faultInformation: {
          describe: '',
          faultImage: [

          ],
          audio: [''], // 音频路径
          duration: '', // 音频时长
        },
        imData: {
          // 聊天室数据
          shopUserId: '',
          type: 0,
          note: 'shopName',
          platformCode: 'platformCode',
        },
        deatilInfo: '',
        engineDetail: '', //发动机信息
        curVideo: {
          src: '',
          poster: '',
        },
      }
    },
    methods: {
      preViewVideo(info) {
        this.curVideo = info
        this.$refs.previewVideo.show(this.curVideo.src)
      },
      getDetail() {
        // 获取订单详情
        this.$VoHttp
          .apiOrderSupportAfterSaleDetail$Id({ id: this.optionsId })
          .then((res) => {
            if (res.data) {
              let data = res.data

              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                data.time =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              //订单信息
              data.timeObj = {}
              data.timeList.map((item) => {
                data.timeObj[item.timeName] = item
              })
              console.log(data.timeObj)

              //发动机信息
              if (data.engineDetail) {
                this.engineDetail = data.engineDetail
              }
              //地址
              this.repairShopData = {
                name: data.orderAddress.name,
                address: data.orderAddress.address + data.orderAddress.addressDetail,
                phone: data.orderAddress.phone,
                latitude: data.garageInfo.latitude, //纬度
                longitude: data.garageInfo.longitude, //经度
              }
              //故障信息
              if (data.faultDetail && data.faultDetail.pic) {
                data.failImg = data.faultDetail.pic.filter((item) => item.type === 'image')
                let failVideo = data.faultDetail.pic.filter((item) => item.type === 'video')
                if (failVideo.length) {
                  data.failVideoList = failVideo.map((item) => {
                    return {
                      type: 'video',
                      src: item.pic,
                      poster: '/static/demo/IMG_3839.JPG',
                    }
                  })
                } else {
                  data.failVideoList = []
                }
                this.faultInformation = {
                  describe: data.faultDetail.desc,
                  faultImage: data.failImg.map((item) => item.pic),
                  // 故障视频
                  videoList: data.failVideoList || [],
                  audio: [data.faultDetail.voice], // 音频路径
                  duration: '', // 音频时长
                }
              }
              if (data.qualityResult && data.qualityResult.video) {
                data.qualityResult.video = JSON.parse(data.qualityResult.video)
              }
              this.deatilInfo = data

              //验收视频
              // if (data.supportQualityVO) {
              //   let mediaData = JSON.parse(data.supportQualityVO.checkMsg)
              //   this.videoList = mediaData.video
              // }
              //寄回信息
              // if (data.orderDeliveryVO && data.orderDeliveryVO.logisticsDetail) {
              //   this.logisticsDetail = JSON.parse(data.orderDeliveryVO.logisticsDetail)
              //   console.log('寄回信息', this.logisticsDetail)
              // }
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      // 跳转聊天页面
      goImUrl() {
        const info = {
          targetId: this.imData.shopUserId,
          type: 0,
          note: this.imData.shopName,
          platformCode: this.imData.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      toConcat() {
        this.$refs.helpRef.open()
      },
    },
    onLoad(option) {
      console.log(option)
      const { type, id } = option
      this.type = Number(type)
      this.optionsId = id
      this.getDetail()
    },
  }
</script>

<style lang="scss" scoped>
  .install {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-slot {
      padding: 26rpx 0;
      &__line {
        width: 2rpx;
        height: 36rpx;
        background: #f7f7f8;
      }
    }
    &-top {
      font-size: 28rpx;
      margin: 24rpx 0 48rpx;
      text-align: center;
      color: $v-c0-85;
    }
    &-bottom {
      background: #fff;
      padding: 24rpx 32rpx;
      font-size: 24rpx;
      &__left {
        width: 216rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        box-sizing: border-box;
        border: 2rpx solid rgba(0, 0, 0, 0.25);
        border-radius: 126rpx;
      }
      &__right {
        width: 208rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        box-sizing: border-box;
        border: 2rpx solid #ff5319;
        border-radius: 114rpx;
        color: #ff5319;
        margin-left: 32rpx;
      }
    }
  }
</style>
