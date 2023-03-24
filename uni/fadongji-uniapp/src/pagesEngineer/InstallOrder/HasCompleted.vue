<template>
  <view class="install flex flex-column">
    <VoNav is-fixed is-have-more title="">
      <block slot="title">
        <view v-if="type === '已完成'" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="clock-new" />
          <view class="m-l-8">已完成</view>
        </view>
        <view v-else-if="type === '已关闭'" class="flex flex-vertical-c flex-justify-c">
          <VoIcon :size="28" name="warning" />
          <view class="m-l-8">已关闭</view>
        </view>
      </block>
    </VoNav>
    <view v-if="deatilInfo" class="flex1 overflow-y">
      <!--  修理厂信息  -->
      <view class="m-t-20 bg-white">
        <RepairShop :repairShop="repairShopData" :info="deatilInfo">
          <!--          <view slot="navigation"></view>-->
          <view slot="navigation" />
          <view slot="bottom" />
          <!-- <view slot="bottom" class="install-slot flex flex-vertical-c">
            <view
              class="flex1 flex flex-vertical-c flex-justify-c"
              @click="$cellPhone(deatilInfo.garageInfo.useName)"
            >
              <VoIcon :size="20" color="#595959" name="mobile-new" />
              <view class="fz-24 color-block-65 m-l-12">拨打电话</view>
            </view>
            <view class="install-slot__line" />
            <view class="flex1 flex flex-vertical-c flex-justify-c" @click="goImUrl">
              <VoIcon :size="20" color="#595959" name="smile-m" />
              <view class="fz-24 color-block-65 m-l-12">发消息</view>
            </view>
          </view> -->
        </RepairShop>
      </view>
      <!--  服务信息  -->
      <view class="m-t-20 bg-white">
        <ServiceMessage :info="deatilInfo" :state="state" />
      </view>
      <!--  完成情况  -->
      <view v-if="deatilInfo.finishVideo" class="m-t-20 bg-white">
        <CompleteSituation :info="deatilInfo" />
      </view>
      <!--  服务评价  -->
      <view
        v-if="
          type === '已完成' &&
          deatilInfo.installEvaluate &&
          Object.keys(deatilInfo.installEvaluate).length
        "
        class="m-t-20 bg-white"
      >
        <ServiceEvaluation
          v-if="deatilInfo.installEvaluate && Object.keys(deatilInfo.installEvaluate).length"
          :info="deatilInfo"
        />
      </view>
      <!--  订单信息  -->
      <view class="m-t-20 bg-white">
        <OrderInformation :info="deatilInfo" :info-state="infoState" />
      </view>
      <view class="m-b-20" />
    </view>
    <!--  底部按钮  -->
    <view
      v-if="type === '已完成' && !deatilInfo.finishVideo"
      class="install-bottom flex flex-justify-r flex-vertical-c"
    >
      <view class="install-bottom__right" @click="goSubmitInstall">提交安装凭证</view>
    </view>
    <VoSafetyArea :is-fixed="false" />
    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  import RepairShop from '../components/RepairShop.vue'
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OrderInformation from '../components/OrderInformation.vue'
  import CompleteSituation from '../components/CompleteSituation.vue'
  import ServiceEvaluation from '../components/ServiceEvaluation.vue'

  export default {
    name: 'HasCompleted',
    components: {
      RepairShop,
      ServiceMessage,
      OrderInformation,
      CompleteSituation,
      ServiceEvaluation,
    },
    data() {
      return {
        repairShopData: {
          name: '',
          address: '',
        },
        state: 2, // 服务信息安装状态
        infoState: 1, // 订单信息安装中状态
        type: '已关闭', // '已完成' 或 '已关闭'
        imData: {
          // 聊天室数据
          shopUserId: '',
          type: 0,
          note: 'shopName',
          platformCode: 'platformCode',
        },
        optionsId: '',
        deatilInfo: {
          installEvaluate: {
            content: [],
            pic: [],
          },
        },
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.type = options.type || ''
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

              //完成情况
              if (data.supportQuality && data.supportQuality.checkMsg) {
                data.finishVideo = JSON.parse(data.supportQuality.checkMsg)
              }

              this.deatilInfo = data
              let info = JSON.parse(data.addressDetail)
              if (this.deatilInfo.installEvaluate) {
                this.deatilInfo.installEvaluate.content = JSON.parse(
                  this.deatilInfo.installEvaluate.content,
                )
                this.deatilInfo.installEvaluate.content.pic = JSON.parse(
                  this.deatilInfo.installEvaluate.content.pic,
                )
              }

              this.repairShopData = {
                name: data.garageInfo.storeName,
                address: info.address + info.addressDetail,
                latitude: data.garageInfo.latitude, //纬度
                longitude: data.garageInfo.longitude, //经度
              }
            }
          })
          .catch((err) => {
            console.log(err.message || '获取信息失败')
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
      /**
       * 去提交安装凭证页
       */
      goSubmitInstall() {
        this.$linkToEasy(`/pagesEngineer/InstallOrder/SubmitInstall?id=${this.deatilInfo.id}`)
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
