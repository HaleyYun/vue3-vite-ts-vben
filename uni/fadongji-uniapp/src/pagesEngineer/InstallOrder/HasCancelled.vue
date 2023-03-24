<template>
  <view class="install">
    <VoNav is-fixed is-have-more title="">
      <block slot="title">
        <view class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="warning" />
          <view class="m-l-8">已取消</view>
        </view>
      </block>
    </VoNav>
    <view class="install-top">取消原因：{{ deatilInfo.cancelReason || '未知' }}</view>
    <!--  修理厂信息  -->
    <view class="m-t-20 bg-white">
      <RepairShop :info="deatilInfo" :repairShop="repairShopData">
        <view slot="navigation" />
        <view slot="bottom" class="flex flex-vertical-c">
          <view class="send_message flex1 border_right" @click="callPhone">
            <VoIcon :opacity="0.65" :size="20" color="#000" name="mobile-new" />
            <view class="fz-28 m-l-14 send_message-text">拨打电话</view>
          </view>
          <view class="send_message flex1" @click="goImUrl">
            <VoIcon :opacity="0.65" :size="20" color="#000" name="smile-m" />
            <view class="fz-28 m-l-14 send_message-text">发消息</view>
          </view>
        </view>
      </RepairShop>
      <!--      <RepairShop :repairShop="repairShopData">-->
      <!--        <view slot="bottom" class="install-slot flex flex-vertical-c">-->
      <!--          <view-->
      <!--            class="flex1 flex flex-vertical-c flex-justify-c"-->
      <!--            @click="$cellPhone(deatilInfo.garageInfo.useName)"-->
      <!--          >-->
      <!--            <VoIcon :size="20" color="#595959" name="mobile-new" />-->
      <!--            <view class="fz-24 color-block-65 m-l-12">拨打电话</view>-->
      <!--          </view>-->
      <!--          <view class="install-slot__line" />-->
      <!--          <view class="flex1 flex flex-vertical-c flex-justify-c" @click="goImUrl">-->
      <!--            <VoIcon :size="20" color="#595959" name="smile-m" />-->
      <!--            <view class="fz-24 color-block-65 m-l-12">发消息</view>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </RepairShop>-->
    </view>
    <!--  服务信息  -->
    <view v-if="deatilInfo" class="m-t-20 bg-white">
      <ServiceMessage :info="deatilInfo" :state="state" />
    </view>
    <!--  订单信息  -->
    <view v-if="deatilInfo" class="m-t-20 bg-white">
      <OrderInformation :info="deatilInfo" :info-state="infoState" />
    </view>
    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  import RepairShop from '../components/RepairShop.vue'
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OrderInformation from '../components/OrderInformation.vue'

  export default {
    name: 'HasCancelled',
    components: { RepairShop, ServiceMessage, OrderInformation },
    data() {
      return {
        repairShopData: {
          name: '郑州大黄蜂汽修厂',
          address: '河南省-郑州市-金水区-龙子湖街道正商木华广场3号楼A座7楼',
        },

        state: 2, // 服务信息安装状态
        infoState: 1, // 订单信息已取消状态
        optionsId: '',
        deatilInfo: '',
        phone: '',
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

              this.deatilInfo = data
              let info = JSON.parse(data.addressDetail)
              this.repairShopData = {
                name: data.garageInfo.storeName,
                address: info.address + info.addressDetail,
                latitude: data.garageInfo.latitude, //纬度
                longitude: data.garageInfo.longitude, //经度
              }
              this.phone = info.phone
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      /**
       * 拨打电话
       */
      callPhone() {
        const phone = this.phone
        this.$cellPhone(String(phone))
      },
      // 跳转聊天页面
      goImUrl() {
        if (this.deatilInfo.orderStatus == 3270) {
          this.$u.toast('订单已取消，不能聊天')
        }
        return
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
    &-top {
      font-size: 28rpx;
      margin: 24rpx 0 48rpx;
      text-align: center;
      color: $v-c0-85;
    }
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
  .send_message {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26rpx 0;
    border-top: 2rpx solid $v-bg-light;
    &-text {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .border_right {
    border-right: 2rpx solid $v-bg-light;
  }
</style>
