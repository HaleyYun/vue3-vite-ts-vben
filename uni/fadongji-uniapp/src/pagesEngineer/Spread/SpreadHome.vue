<template>
  <view class="page">
    <VoNav is-fixed is-have-more title="我要推广" />
    <!--    <VoShareQrCodeView ref="sharePop" :params="params" />-->
    <view class="page-top flex">
      <view
        class="page-top__box m-r-24 flex1"
        @click="$linkToEasy('/pagesAgent/Order/PromoteOrder/PromoteOrderList?source=2')"
      >
        <view class="fz-b fz-40 lh60">{{ info.count }}</view>
        <view class="fz-24 color-block-45 lh36 m-t-4">推广订单</view>
      </view>
      <!--   用type=2区分从推广进收益页还是其他页面进收益页   -->
      <view
        class="page-top__box flex1"
        @click="$linkToEasy(`/pagesEngineer/MyAccount/AccountDetail?amount=${info.income}&type=2`)"
      >
        <text class="fz-b fz-40 lh60">{{ info.income }}</text>
        <text class="fz-b fz-24 color-block lh36">元</text>
        <view class="fz-24 color-block-45 lh36 m-t-4">推广收益</view>
      </view>
    </view>
    <view class="page-block">
      <image class="page-block__img" src="/static/lease/home/yepair_shop.png"></image>
      <view class="page-block__title">修理厂推广</view>
      <view class="flex flex-vertical-c fz-28 color-block m-t-16" @click="goSpreadList(1)">
        <view>已邀请修理厂</view>
        <view class="fz-b m-l-8 m-r-16">{{ info.garageNum }}</view>
        <VoIcon color="#373A4E" name="arrow-right" size="20"></VoIcon>
      </view>
      <view class="flex flex-justify-between m-t-58">
        <view class="page-block__button1 m-l-16" @click="toInvite(1)">去邀请修理厂</view>
        <view class="page-block__button1 m-r-16" @click="goMapFn">点亮修理厂</view>
      </view>
    </view>
    <view class="page-block">
      <image class="page-block__img" src="/static/lease/home/technician.png"></image>
      <view class="page-block__title">集师傅推广</view>
      <view class="flex flex-vertical-c fz-28 color-block m-t-16" @click="goSpreadList(2)">
        <view>已邀请集师傅</view>
        <view class="fz-b m-l-8 m-r-16">{{ info.technicianNum }}</view>
        <VoIcon color="#373A4E" name="arrow-right" size="20"></VoIcon>
      </view>
      <view class="page-block__button2" @click="toInvite(2)">去邀请集师傅</view>
    </view>
    <!--    <view class="spread_head">-->
    <!--      <view @click="goSpreadList(1)">-->
    <!--        <text>{{ info.garageNum }}</text>-->
    <!--        <text>修理厂邀请数</text>-->
    <!--      </view>-->
    <!--      <view @click="goSpreadList(2)">-->
    <!--        <text>{{ info.technicianNum }}</text>-->
    <!--        <text>集师傅邀请数</text>-->
    <!--      </view>-->
    <!--      <view @click="$linkToEasy('/pagesAgent/Order/PromoteOrder/PromoteOrderList?source=2')">-->
    <!--        <text>{{ info.count }}</text>-->
    <!--        <text>推广订单</text>-->
    <!--      </view>-->
    <!--    </view>-->
    <!--    <view class="content">-->
    <!--      <view>-->
    <!--        <view class="m-t-60">-->
    <!--          &lt;!&ndash;          <VoQRCode&ndash;&gt;-->
    <!--          &lt;!&ndash;            class="top-bottom__code"&ndash;&gt;-->
    <!--          &lt;!&ndash;            ref="qrcode1"&ndash;&gt;-->
    <!--          &lt;!&ndash;            canvas-id="qrcode1"&ndash;&gt;-->
    <!--          &lt;!&ndash;            :value="`${link}${paramsGarge}`"&ndash;&gt;-->
    <!--          &lt;!&ndash;            :size="160"&ndash;&gt;-->
    <!--          &lt;!&ndash;          />&ndash;&gt;-->
    <!--          <VoCodeImage-->
    <!--            v-if="show"-->
    <!--            ref="qrcode1"-->
    <!--            :loadMake="loadMake()"-->
    <!--            :size="160"-->
    <!--            :usingComponents="true"-->
    <!--            :val="`${link}${paramsGarge}`"-->
    <!--            cid="qrcode1"-->
    <!--            class="top-bottom__code"-->
    <!--            unit="px"-->
    <!--            @result="qrR"-->
    <!--          />-->
    <!--        </view>-->
    <!--        <view class="flex flex-vertical-c flex-justify-between px-44">-->
    <!--          <view class="btn harf" @click="toInvite(1)">去邀请修理厂</view>-->
    <!--          <view class="btn harf" @click="goMapFn">点亮修理厂</view>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--      <view>-->
    <!--        <view class="m-t-60">-->
    <!--          &lt;!&ndash;          <VoQRCode&ndash;&gt;-->
    <!--          &lt;!&ndash;            class="top-bottom__code"&ndash;&gt;-->
    <!--          &lt;!&ndash;            ref="qrcode2"&ndash;&gt;-->
    <!--          &lt;!&ndash;            canvas-id="qrcode2"&ndash;&gt;-->
    <!--          &lt;!&ndash;            :value="`${link}${paramsWorker}`"&ndash;&gt;-->
    <!--          &lt;!&ndash;            :size="160"&ndash;&gt;-->
    <!--          &lt;!&ndash;          />&ndash;&gt;-->
    <!--          <VoCodeImage-->
    <!--            v-if="show"-->
    <!--            ref="qrcode2"-->
    <!--            :loadMake="loadMake()"-->
    <!--            :size="160"-->
    <!--            :usingComponents="true"-->
    <!--            :val="`${link}${paramsWorker}`"-->
    <!--            cid="qrcode2"-->
    <!--            class="top-bottom__code"-->
    <!--            unit="px"-->
    <!--            @result="qrR"-->
    <!--          />-->
    <!--        </view>-->
    <!--        <view class="btn" @click="toInvite(2)">去邀请集师傅</view>-->
    <!--      </view>-->
    <!--    </view>-->
  </view>
</template>

<script>
  import devConf from '@/common/env'
  // import VoQRCode from '@/components/VoQRCode/VoQRCode/VoQRCode'
  import VoCodeImage from '@/components/VoCodeImage/VoCodeImage'
  // import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView.vue'

  export default {
    components: {
      // VoShareQrCodeView,
      // VoQRCode,
      VoCodeImage,
    },
    data() {
      return {
        params: {},
        info: '',
        paramsWorker: '',
        paramsGarge: '',
        link: '',
        show: false,
      }
    },
    async onShow() {
      this.initFn()
      console.log(this.userInfo)
      const { id, companyId, userName } = this.userInfo
      this.params = {
        inviteUserId: id,
        companyId,
        userName,
      }
      let paramsGarge = Object.assign({}, this.params)
      paramsGarge.roleCode = 'garage'

      let paramsWorker = Object.assign({}, this.params)
      paramsWorker.roleCode = 'skilledWorker'

      // this.link = 'http://10.0.7.143:8080/pagesAgent/TokerDistrict/RegisterMobilePage?data='
      // this.link = devConf.shareBaseUrl + '/pagesAgent/TokerDistrict/RegisterMobilePage?data='
      this.link = devConf.shareBaseUrl + '/pages/ShareRegister?code='
      try {
        let resGarge = await this.$VoHttp.apiShareLinkAdd({
          shareInfo: JSON.stringify(paramsGarge),
        })
        this.paramsGarge = resGarge.data
        let resWorker = await this.$VoHttp.apiShareLinkAdd({
          shareInfo: JSON.stringify(paramsWorker),
        })
        this.paramsWorker = resWorker.data
        if (resGarge && resGarge.data && resWorker && resWorker.data) {
          this.show = true
        } else {
          this.$u.toast(e.message || '网络请求失败')
        }
        console.log(resGarge)
        console.log(resWorker)
      } catch (e) {
        this.$u.toast(e.message || '网络请求失败')
      }
    },
    methods: {
      /**
       * 去地图页
       */
      goMapFn() {
        console.log(5555555555555555)
        // #ifdef H5
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkers?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
        // #ifdef APP-PLUS
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkersApp?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
      },
      // qrR(res) {
      //   console.log(res)
      // },
      // loadMake(res) {
      //   return true
      //   console.log(res)
      // },
      // 页面跳转方法
      goSpreadList(tab) {
        let url = `/pagesEngineer/Spread/SpreadList?info=${JSON.stringify(
          this.info,
        )}&defaultTab=${tab}&garageCode=${this.paramsGarge}&workerCode=${this.paramsWorker}`
        this.$linkToEasy(url)
      },
      /**
       * 邀请注册
       */
      toInvite(type) {
        let path
        // let router = '/pagesAgent/TokerDistrict/RegisterMobilePage'
        let router = '/pages/ShareRegister'
        // let data
        if (type === 1) {
          // this.params.roleCode = 'garage'
          // data = JSON.stringify(this.params)
          // path = `/pagesCommon/SharePoste/SharePoste?params=${data}&router=${router}`
          if (!this.paramsGarge) return
          path = `/pagesCommon/SharePoste/SharePoste?code=${this.paramsGarge}&router=${router}`
        } else {
          // this.params.roleCode = 'skilledWorker'
          // data = JSON.stringify(this.params)
          // path = `/pagesCommon/SharePoste/SharePoste?params=${data}&type=1&router=${router}`
          if (!this.paramsWorker) return
          path = `/pagesCommon/SharePoste/SharePoste?code=${this.paramsWorker}&type=1&router=${router}`
        }
        // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterMobilePage')
        this.$linkToEasy(path)
      },
      /**
       * 技术工邀请列表统计数
       */
      async initFn() {
        try {
          const res = await this.$VoHttp.apiCompanyInfoTechnicianRelationCount()
          this.info = res.data
          const { data } = await this.$VoHttp.apiOrderSellQueryInviterCount()
          console.log(data)
          this.info.count = data
          const obj = await this.$VoHttp.apiAccountDetailsBalance()
          this.info.income = obj.data
          this.$forceUpdate()
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    width: 750rpx;
    height: 100vh;
    //background-color: #fff;
    .top-bottom__code {
      width: fit-content;
      height: fit-content;
      margin: auto;
      box-shadow: 4rpx 6rpx 16rpx rgba(170, 182, 200, 0.45);
    }
    &-top {
      padding: 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__box {
        padding: 24rpx;
        background: #f7f7f8;
        border-radius: 16rpx;
        text-align: center;
      }
    }
    &-block {
      position: relative;
      margin: 80rpx 32rpx 0;
      background: #fff;
      padding: 32rpx 40rpx;
      box-sizing: border-box;
      &__img {
        position: absolute;
        top: -42rpx;
        right: 16rpx;
        width: 260rpx;
        height: 260rpx;
      }
      &__title {
        margin-top: 32rpx;
        font-weight: bold;
        font-size: 40rpx;
      }
      &__button1 {
        width: 248rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #fff;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        border-radius: 80rpx;
        font-size: 28rpx;
      }
      &__button2 {
        width: 574rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #fff;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        border-radius: 80rpx;
        font-size: 28rpx;
        margin: 58rpx 16rpx 0;
      }
    }
    .spread_head {
      display: flex;
      justify-content: space-between;
      padding: 32rpx 32rpx 0 32rpx;
      margin-bottom: 72rpx;

      > :nth-child(n) {
        width: 218rpx;
        height: 144rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 24rpx 0;
        border-radius: 16rpx;
        background-color: #f9f9f9;

        > :nth-child(1) {
          font-size: 40rpx;
          color: rgba(0, 0, 0, 0.85);
        }

        > :nth-child(2) {
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }

    .content {
      > :nth-child(n) {
        > :nth-child(n) {
          margin: 0 auto;
          text-align: center;
          margin-bottom: 80rpx;
        }

        > :nth-child(1) {
          //width: 320rpx;
          //height: 320rpx;
          overflow: hidden;
          margin-bottom: 40rpx;
        }
      }
      .btn {
        width: 400rpx;
        height: 92rpx;
        font-size: 32rpx;
        line-height: 92rpx;
        border-radius: 24px;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        color: #fff;
        &.harf {
          width: 320rpx;
        }
      }
      ::v-deep .u-qrcode {
        margin: auto;
      }
    }
  }
</style>
