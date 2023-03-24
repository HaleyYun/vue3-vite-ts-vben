<template>
  <view>
    <view class="garage">
      <VoNav is-fixed is-have-more title="修理厂详情">

      </VoNav>
      <ServiceInfo :infos="garageInfo" />
      <u-sticky>
        <EraTabs
          :current="current"
          :list="tabList"
          :scrollable="false"
          activeStyle="font-weight: bold;color: #FF5319"
          class="garage-tab"
          inactiveStyle="color: rgba(0, 0, 0, 0.45)"
          line-color="#FF5319"
          @click="changeTabFn"
        ></EraTabs>
        <PaymentAmount v-if="current === 1 && serviceInfo.bindStatus !== 0"></PaymentAmount>
      </u-sticky>
      <!--      <view class="garage-swiper">-->
      <!--  基本信息  -->
      <view v-if="current === 0" class="garage-swiper">
        <!--    未完成信息认证时     -->
        <VoNoData
          v-if="serviceInfo.bindStatus === 0"
          :no-data-tips="['该修理厂未完成信息认证，', '暂无该模块数据']"
        />
        <!--    待审核和已认证时的基本信息     -->
        <BasicInformation v-else :information="garageInfo"></BasicInformation>
        <!--    提交信息完成注册时      -->
        <!--    <CompleteRegistration></CompleteRegistration>      -->
      </view>
      <!--  账款信息  -->
      <view v-if="current === 1" class="garage-swiper">
        <!--    未完成信息认证时     -->
        <VoNoData
          v-if="serviceInfo.bindStatus === 0"
          :no-data-tips="['该修理厂未完成信息认证，', '暂无该模块数据']"
        />
        <AccountOrder v-else></AccountOrder>
      </view>
      <!--  订单信息  -->
      <view v-if="current === 2" class="garage-swiper">
        <!--    未完成信息认证时     -->
        <VoNoData
          v-if="serviceInfo.bindStatus === 0"
          :no-data-tips="['该修理厂未完成信息认证，', '暂无该模块数据']"
        />
        <OrderInformation v-else :order-info="orderInfo"></OrderInformation>
      </view>
      <!--      </view>-->
      <view v-if="current === 0 && garageInfo.checkStatus === 1" class="garage-bottom">
        <view class="flex flex-justify-between flex-vertical-c">
          <view class="garage-bottom__button line" @click="showFail = true">审核不通过</view>
          <view class="garage-bottom__button fill">审核通过</view>
        </view>
        <VoSafetyArea :is-fixed="false"></VoSafetyArea>
      </view>
      <view v-if="current === 0 && garageInfo.checkStatus === 4" class="garage-bottom">
        <view class="garage-bottom__button2 line" @click="goToBuy">代客下单</view>
      </view>
    </view>
    <NotApprovedPopup :show.sync="showFail"></NotApprovedPopup>
  </view>
</template>

<script>
  import ServiceInfo from './components/ServiceInfo'
  import CompleteRegistration from './components/CompleteRegistration'
  import BasicInformation from './components/BasicInformation'
  import NotApprovedPopup from './components/NotApprovedPopup'
  import OrderInformation from './components/OrderInformation'
  import PaymentAmount from './components/PaymentAmount'
  import AccountOrder from './components/AccountOrder'

  export default {
    name: 'GarageDetails',
    components: {
      ServiceInfo,
      CompleteRegistration,
      BasicInformation,
      NotApprovedPopup,
      OrderInformation,
      PaymentAmount,
      AccountOrder,
    },
    data() {
      return {
        garageInfo: {},
        current: 0,
        tabList: [
          {
            name: '基本信息',
          },
          {
            name: '账款信息',
          },
          {
            name: '订单信息',
          },
        ],
        serviceInfo: {
          src: '/static/demo/rectangle.png', // 卡片头像
          bindStatus: 1, // 绑定认证状态  0：未认证；1、待审核；2、已认证
          title: '江陵动力修理厂', // 标题
        },
        // 订单信息
        orderInfo: [
          {
            order: '订单号-E2022010110001',
            time: '2022-01-01 12:00:00',
            amount: '订单金额',
            price: '11500.00',
          },
          {
            order: '订单号-E2022010110001',
            time: '2022-01-01 12:00:00',
            amount: '订单金额',
            price: '11500.00',
          },
          {
            order: '订单号-E2022010110001',
            time: '2022-01-01 12:00:00',
            amount: '订单金额',
            price: '11500.00',
          },
        ],
        showFail: false, // 审核不通过弹窗
      }
    },
    methods: {
      // 代客下单
      goToBuy() {
        this.$storage.set('garageArea', this.garageInfo.areaCode)
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsList?companyId=${this.garageInfo.companyId}&salesArea=${this.garageInfo.areaCode}`,
        )
      },
      confirmFn(resultData) {
        console.log(resultData)
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.current = e.index
      },
      initInfoFn() {
        this.$VoHttp
          .apiCompanyInfoManagerGarageInfo({
            companyId: this.companyId,
            inviterId: this.inviterId,
          })
          .then((res) => {
            this.garageInfo = res.data
          })
      },
    },
    onLoad(options) {
      this.inviterId = options.inviterId
      this.companyId = options.companyId
      this.initInfoFn()
    },
  }
</script>

<style lang="scss" scoped>
  .garage {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-tab {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 2;
      margin-top: 16rpx;
    }
    &-swiper {
      height: 100%;
    }
    &-bottom {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__button {
        //width: 320rpx;
        height: 88rpx;
        text-align: center;
        line-height: 88rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
        &.line {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
        &.fill {
          background: #ff5319;
          border: 2rpx solid #ff5319;
          color: #fff;
        }
      }
      &__button2 {
        width: 656rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 32rpx;
        background: #ff5319;
        border-radius: 48rpx;
        color: #ffffff;
      }
    }
  }
</style>
