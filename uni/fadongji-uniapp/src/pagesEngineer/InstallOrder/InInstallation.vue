<template>
  <view class="install flex flex-column">
    <VoNav is-fixed is-have-more title="">
      <block slot="title">
        <view class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="clock-new" />
          <view class="m-l-8">{{ deatilInfo.orderStatusEvent || '安装中' }}</view>
        </view>
      </block>
    </VoNav>
    <view v-if="deatilInfo" class="flex1 overflow-y">
      <!--  修理厂信息  -->
      <view class="m-t-20 bg-white">
        <RepairShop :repairShop="repairShopData">
          <!--          <view slot="navigation"></view>-->
          <view slot="bottom" class="install-slot flex flex-vertical-c">
            <view
              class="flex1 flex flex-vertical-c flex-justify-c"
              @click="$cellPhone(deatilInfo.garageInfo.userName)"
            >
              <VoIcon :size="20" color="#595959" name="mobile-new" />
              <view class="fz-28 color-block-65 m-l-12">拨打电话</view>
            </view>
            <view class="install-slot__line" />
            <view class="flex1 flex flex-vertical-c flex-justify-c" @click="goImUrl">
              <VoIcon :size="20" color="#595959" name="smile-m" />
              <view class="fz-28 color-block-65 m-l-12">发消息</view>
            </view>
          </view>
        </RepairShop>
      </view>
      <!--  服务信息  -->
      <view class="m-t-20 bg-white">
        <ServiceMessage :info="deatilInfo" :state="state" />
      </view>
      <!--  订单信息  -->
      <view class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="infoState" />
      </view>
    </view>
    <!--  底部按钮  -->
    <view class="install-bottom flex flex-justify-r flex-vertical-c">
      <view class="install-bottom__left" @click="operationFn">联系平台售后</view>
      <view
        v-if="!deatilInfo.supportQuality"
        class="install-bottom__right"
        @click="$linkToEasy(`/pagesEngineer/InstallOrder/SubmitInstall?id=${deatilInfo.id}`)"
        >提交安装凭证</view
      >
    </view>
    <VoSafetyArea :is-fixed="false" />
    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  import RepairShop from '../components/RepairShop.vue'
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OrderInformation from '../components/OrderInformation.vue'
  import { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'InInstallation',
    components: { RepairShop, ServiceMessage, OrderInformation },
    data() {
      return {
        repairShopData: {
          name: '',
          addr: '',
        },
        imData: {
          // 聊天室数据
          shopUserId: '',
          type: 0,
          note: 'shopName',
          platformCode: 'garage',
        },
        state: 2, // 服务信息安装状态
        infoState: 0, // 订单信息安装中状态
        optionsId: '',
        deatilInfo: '',
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.getDetail()
    },
    methods: {
      getDetail() {
        // 获取安装订单详情
        this.$VoHttp
          .apiOrderTechnicianInstallDetail$Id({ id: this.optionsId })
          .then((res) => {
            if (res.data) {
              let data = res.data
              this.imData.shopUserId = data.garageInfo.userId
              this.imData.note = data.storeName
              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                data.time =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              //组装各种时间
              data.timeObj = {}
              data.timeList.map((item) => {
                data.timeObj[item.timeName] = item
              })
              console.log(data.timeObj)

              this.deatilInfo = data
              let info = JSON.parse(data.addressDetail)
              this.repairShopData = {
                name: data.garageInfo.storeName,
                address: info.address + info.addressDetail,
                latitude: data.garageInfo.latitude, //纬度
                longitude: data.garageInfo.longitude, //经度
              }
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      /**
       * 联系平台售后
       */
      operationFn() {
        goOnlineCustomerFn(2)
        // this.$emit('helpAction')
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
