<template>
  <view class="record-item bg-white m-t-16" @click="toDetail()">
    <view class="flex flex-justify-between border-bottom p-b-32">
      <view class="fz-28">{{ orderData.time }} </view>
      <view class="color-block-45">{{ orderData.orderStatusEvent }}</view>
    </view>
    <view class="m-b-16 m-t-24 lh42">安装服务：{{ orderData.supportName }}</view>
    <view class="lh42">
      安装金额：
      <text>{{ orderData.supportAmount }}元</text>
      <!--      <VoPointPrice-->
      <!--        :price="orderData.supportAmount"-->
      <!--        :showUnit="true"-->
      <!--        class="lh48"-->
      <!--        color="rgba(0, 0, 0, 0.85)"-->
      <!--        display="inline-block"-->
      <!--      />-->
    </view>
    <view
      v-if="orderData.technicianInfo"
      class="border-top flex flex-justify-between m-b-24 p-t-24"
    >
      <view class="flex flex-vertical-c">
        <image
          :src="orderData.technicianInfo.photoUrl || '/static/default_avatar.png'"
          class="sys-img m-r-8"
        />
        <view>
          <view>集师傅：{{ orderData.technicianInfo.realName }}</view>
          <view class="fz-24 color-block-45"
            >好评率：{{ orderData.technicianInfo.favorableComment }}</view
          >
        </view>
      </view>
      <view v-if="orderData.orderStatus === 3240 || orderData.orderStatus === 3250" class="flex">
        <view @click.stop="callPhone(orderData)">
          <VoIcon :opacity="0.85" :size="20" class="m-r-8" color="#000000" name="mobile-new" />
        </view>

        <VoIcon
          :opacity="0.85"
          :size="24"
          color="#000000"
          name="smile-s"
          @click.native.stop="goImUrl"
        />
      </view>
    </view>
    <view
      v-if="
        (+orderData.orderStatus === 3240 || +orderData.orderStatus === 3241) &&
        orderData.homeEndTime <= nowDate
      "
      class="item-red m-t-16 m-b-24"
    >
      集师傅未按约定时间到店，可联系师傅继续等待或免费取消订单
    </view>
    <view v-else-if="orderData.orderStatus === 3231" class="item-red m-t-16 m-b-24">
      平台将会尽快为您指派集师傅
    </view>

    <view class="flex flex-justify-r">
      <!-- 3210待付款,3230待接单,3231待指派 3240待安装,3250安装中,3260已完成 3270取消 3280关闭-->
      <!-- 待安装,待指派 -->
      <view
        v-if="
          orderData.orderStatus === 3231 ||
          (orderData.orderStatus === 3240 && orderData.isWaiting) ||
          (orderData.status === 3240 && orderData.homeEndTime > nowDate)
        "
        @click.stop="operationClick('contact')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Default">联系客服</EraButton>
      </view>
      <!--待付款, 待接单, 待安装 -->
      <view
        v-if="
          orderData.orderStatus === 3210 ||
          orderData.orderStatus === 3230 ||
          orderData.orderStatus === 3231 ||
          (orderData.orderStatus === 3240 && orderData.homeStartTime > nowDate) ||
          orderData.isWaiting
        "
        @click.stop="operationClick('cancel')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Default">取消订单</EraButton>
      </view>
      <!-- 待付款, 待接单， 待指派 -->
      <view
        v-if="
          orderData.orderStatus === 3210 ||
          orderData.orderStatus === 3230 ||
          orderData.orderStatus === 3231
        "
        @click.stop="toEdit()"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Wire"> 修改订单 </EraButton>
      </view>
      <!-- 待付款 -->
      <view
        v-if="orderData.orderStatus === 3210 && orderData.supportSource === 1"
        @click.stop="operationClick('pay')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Wire">去支付</EraButton>
      </view>
      <!-- 待安装,待指派 -->
      <!--      <view-->
      <!--        v-if="-->
      <!--          orderData.orderStatus === 3231 ||-->
      <!--          orderData.orderStatus === 3240 ||-->
      <!--          (orderData.orderStatus === 3240 && orderData.isWaiting) ||-->
      <!--          (orderData.status === 3240 && orderData.homeEndTime > nowDate)-->
      <!--        "-->
      <!--        @click.stop="operationClick('contact')"-->
      <!--      >-->
      <!--        <EraButton class="m-l-20" size="mini" theme-type="Default">联系客服</EraButton>-->
      <!--      </view>-->
      <!-- 待安装超时 -->
      <view
        v-if="
          orderData.orderStatus === 3240 && orderData.homeEndTime <= nowDate && !orderData.isWaiting
        "
        @click.stop="operationClick('wait')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Default">继续等待</EraButton>
      </view>
      <view
        v-if="
          orderData.orderStatus === 3240 && orderData.homeEndTime <= nowDate && !orderData.isWaiting
        "
        @click.stop="operationClick('nowait')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Default">不等待</EraButton>
      </view>
      <!--安装中,已完成  -->
      <view
        v-if="orderData.orderStatus === 3250 || orderData.orderStatus === 3260"
        @click.stop="operationClick('contact')"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Default">投诉</EraButton>
      </view>
      <!--安装中  -->
      <view v-if="orderData.orderStatus === 3250" @click.stop="operationClick('finish')">
        <EraButton class="m-l-20" size="long-mini" theme-type="Wire">确认安装完成</EraButton>
      </view>
      <!-- 已完成 -->
      <view
        v-if="orderData.orderStatus === 3260 && !orderData.isEvaluation"
        @click.stop="toEvaPage()"
      >
        <EraButton class="m-l-20" size="mini" theme-type="Wire">评价</EraButton>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderItem',
    components: {},

    props: {
      orderData: {
        type: Object,
        orderData: {},
      },
    },
    data() {
      return {
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      }
    },
    created() {},
    methods: {
      // 跳转技术工聊天页面
      goImUrl() {
        const info = {
          targetId: this.orderData.technicianInfo.userId,
          type: 0,
          note: this.orderData.technicianInfo.realName,
          platformCode: 'skilledWorker',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 拨打电话
       */
      async callPhone(data) {
        console.log('callphone', data.technicianInfo.userName)
        const phone = data.technicianInfo.userName
        this.$cellPhone(phone)
      },
      operationClick(key) {
        this.$emit('operationClick', key)
      },
      // 修改订单
      toEdit() {
        this.$linkToEasy('/pagesGarage/InstallOrderUser/EditOrder?id=' + this.orderData.id)
      },
      //去评价
      toEvaPage() {
        this.$linkToEasy(
          `/pagesGarage/InstallOrder/SendEvaluation?type=order&id=${this.orderData.id}`,
        )
      },
      /**
       *
       * @param index
       * @param data
       */
      bottomBtnClick(index, data) {
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      toDetail() {
        let url = '/pagesGarage/InstallOrderUser/OrderDetail?id=' + this.orderData.id
        if (this.orderData.orderStatus === 3240) {
          // 待安装跳转地图
          // #ifdef H5
          url = `/pagesCommon/MapDrag/MapDrag?title=待安装&origin=4&id=${this.orderData.id}`
          // #endif
          // #ifdef APP-PLUS
          url = `/pagesCommon/MapDrag/MapDragApp?title=待安装&origin=4&id=${this.orderData.id}`
          // #endif
        }
        this.$linkToEasy(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .record-item {
    padding: 24rpx 32rpx 32rpx 32rpx;
    box-sizing: border-box;
    .sys-img {
      width: 64rpx;
      height: 64rpx;
    }
    .border-top {
      border-top: 2rpx solid #f7f7f8;
      margin-top: 24rpx;
    }
    .item-red {
      font-size: 28rpx;
      line-height: 150%;
      color: #f20014;
    }
  }
</style>
