<template>
  <!-- 订单状态 3310：待付款，3320：待质检，3330：待接单，3331：待指派，3340：待上门，3350：回收中，3351：待发货，3352：待收货，3360：已完成，3370：已取消，3380：已关闭； -->
  <view class="item" @click.stop="toDetail">
    <view class="flex flex-row flex-vertical-c flex-justify-between">
      <view class="fz-28 lh150 color-block">{{
        itemOrder.homeStartTime.substr(0, 16) + '-' + itemOrder.homeEndTime.substr(11, 5)
      }}</view>
      <view v-if="itemOrder.status == 3310" class="fz-28 lh150 color-block-45">待付款</view>
      <view v-else-if="itemOrder.status == 3320" class="fz-28 lh150 color-block-45">待查验</view>
      <view v-else-if="itemOrder.status == 3330" class="fz-28 lh150 color-block-45">待接单</view>
      <view
        v-else-if="
          itemOrder.status === 3360 || itemOrder.status === 3351 || itemOrder.status === 3352
        "
        class="fz-28 lh150 color-block-45"
        >已完成</view
      >
      <view v-else class="fz-28 lh150 color-block-45">{{ itemOrder.statusEvent }}</view>
    </view>
    <view class="placeholder m-t-24 m-b-24" />
    <view class="flex flex-row flex-vertical-c">
      <view class="fz-28 lh150 color-block-45">回收服务：</view>
      <view class="fz-28 lh150 color-block m-l-8">{{ itemOrder.supportName }}</view>
    </view>
    <view class="flex flex-row flex-vertical-c">
      <view class="fz-28 lh150 color-block-45">回收价格：</view>
      <VoPointPrice
        :left-size="16"
        :price="itemOrder.supportAmount"
        :right-size="14"
        :show-unit="true"
        class="m-l-8"
        color="#FF5319"
        display="inline-block"
      />
    </view>
    <!--  个人信息    -->
    <view
      v-if="itemOrder.technicianInfo"
      class="m-t-24 bg-white flex flex-row flex-vertical-c flex-justify-between p-t-24 p-b-24"
    >
      <view class="flex flex-row flex-vertical-c">
        <image :src="itemOrder.technicianInfo.photoUrl" class="item-head" />
        <view class="m-l-16">
          <view class="flex flex-row">
            <view class="fz-b fz-28 lh150 color-block">集师傅：</view>
            <view class="fz-b fz-28 lh150 color-block m-l-8">{{
              itemOrder.technicianInfo.realName
            }}</view>
          </view>
          <view class="flex flex-row m-t-4">
            <view class="fz-24 lh150 color-block-45">好评率：</view>
            <view class="fz-24 lh150 color-block-45 m-l-8">{{
              itemOrder.technicianInfo.favorableComment
            }}</view>
          </view>
        </view>
      </view>
      <view
        v-if="itemOrder.status == 3340 || itemOrder.status == 3350 || itemOrder.status == 3341"
        class="flex flex-row flex-vertical-c"
      >
        <view class="flex flex-row flex-justify-c">
          <view @click.stop="$cellPhone(itemOrder.technicianInfo.userName)">
            <VoIcon :size="24" name="mobile-new" />
          </view>
          <view @click.stop="goImUrl(itemOrder.technicianInfo)">
            <VoIcon :size="24" class="m-l-32" name="smile-m" />
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="
        itemOrder.homeEndTime <= nowDate &&
        (+itemOrder.status === 3341 || +itemOrder.status === 3340)
      "
      class="item-red m-t-16 m-b-24"
    >
      集师傅未按约定时间到店，可联系师傅继续等待或免费取消订单
    </view>
    <view v-else-if="itemOrder.status == 3331" class="item-red m-t-16 m-b-24">
      平台将会尽快为您指派集师傅
    </view>
    <view class="flex flex-row flex-justify-r m-t-24">
      <!-- 订单状态
      3310：待付款，3320：待质检，3330：待接单，
      3331：待指派，3340：待上门，3350：回收中，
      3351：待发货，3352：待收货，3360：已完成，
      3370：已取消，3380：已关闭；
      -->
      <!-- 3331：超时待指派；3341：超时继续等待；3340：待上门 3350：回收中 -->
      <view
        v-if="
          itemOrder.status === 3331 ||
          itemOrder.status === 3341 ||
          (itemOrder.status === 3340 && itemOrder.homeEndTime > nowDate) ||
          itemOrder.isWaiting ||
          itemOrder.status === 3350
        "
        class="item-button1"
        @click.stop="customerService"
      >
        联系客服
      </view>
      <!-- 3331：超时待指派 3330：待接单 3310：待付款 -->
      <!--      <view-->
      <!--        v-if="itemOrder.status === 3310 || itemOrder.status === 3330 || itemOrder.status === 3331"-->
      <!--        class="item-button1 m-l-32"-->
      <!--        @click.stop="modifyOrder"-->
      <!--      >-->
      <!--        修改订单-->
      <!--      </view>-->
      <!-- 3340：待上门 itemOrder.homeEndTime <= nowDate 超时-->
      <view
        v-if="
          (itemOrder.status === 3340 || itemOrder.status === 3341) &&
          itemOrder.homeEndTime <= nowDate &&
          !itemOrder.isWaiting
        "
        class="item-button1 m-l-32"
        @click.stop="toContinue"
      >
        继续等待
      </view>
      <view
        v-if="
          (itemOrder.status === 3340 || itemOrder.status === 3341) &&
          itemOrder.homeEndTime <= nowDate &&
          !itemOrder.isWaiting
        "
        class="item-button2 m-l-32"
        @click.stop="assignMechanic"
      >
        不等待
      </view>

      <!-- 3341：超时继续等待，3331：超时待指派，3340：待上门 -->
      <view
        v-if="
          itemOrder.status == 3331 ||
          itemOrder.status == 3340 ||
          itemOrder.status == 3320 ||
          (itemOrder.status == 3341 && itemOrder.isWaiting)
        "
        class="item-button1 m-l-32"
        @click.stop="cancleOrder"
      >
        取消订单
      </view>
      <!-- 3331：超时待指派 3330：待接单 3310：待付款 -->
      <view
        v-if="itemOrder.status === 3310 || itemOrder.status === 3330 || itemOrder.status === 3331"
        class="item-button2 m-l-32"
        @click.stop="modifyOrder"
      >
        修改订单
      </view>
      <!-- 3351：待发货，3352：待收货，3360：已完成 -->
      <view
        v-if="
          (itemOrder.status === 3360 || itemOrder.status === 3351 || itemOrder.status === 3352) &&
          !itemOrder.isEvaluate
        "
        class="item-button2 m-l-32"
        @click.stop="toEvaluate"
      >
        评价
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ItemOrder',
    props: {
      itemOrder: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        stateList: ['待查验', '待接单', '待指派', '待上门', '回收中', '已完成', '已取消', '已关闭'],
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      }
    },
    methods: {
      setList(res) {
        this.itemOrder = res
      },
      /**
       * 跳转联系客服
       */
      customerService() {
        this.$emit('customerService', {})
      },
      /**
       * 到聊天界面
       * @param info
       */
      goImUrl(info) {
        const data = {
          targetId: info.userId,
          type: 0,
          note: info.realName,
          platformCode: 'skilledWorker',
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 取消订单弹窗
       */
      cancleOrder() {
        this.$emit('cancleOrder', this.itemOrder)
      },
      /**
       * 不等待 弹窗
       */
      assignMechanic() {
        console.log('不等待')
        this.$emit('assignMechanic', this.itemOrder)
      },
      /**
       * 是否到达弹窗
       */
      showArrived() {
        this.$emit('arrived', {})
      },
      /**
       * 提示语
       * @param res 提示语内容
       */
      showToast(res) {
        this.$u.toast(res, 2000)
      },
      /**
       * 评价
       */
      toEvaluate() {
        console.log('toEvaluate')
        this.$emit('toEvaluate', this.itemOrder)
      },
      /**
       * 修改订单
       */
      modifyOrder() {
        //todo
        this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderModify?id=' + this.itemOrder.id)
      },
      /**
       * 跳转详情
       */
      toDetail() {
        console.log('toDetail')
        console.log(this.itemOrder)
        let url = '/pagesGarage/RecoveryOrder/RecoveryOrderDetails?id=' + this.itemOrder.id
        if (this.itemOrder.status === 3340 || this.itemOrder.status === 3341) {
          // 待安装跳转地图
          // #ifdef H5
          url = `/pagesCommon/MapDrag/MapDrag?title=待上门&hideIcon=1&origin=5&id=${this.itemOrder.id}`
          // #endif
          // #ifdef APP-PLUS
          url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&hideIcon=1&origin=5&id=${this.itemOrder.id}`
          // #endif
        }
        this.$linkToEasy(url)
      },
      /**
       * 展示继续等待
       */
      toContinue() {
        this.$emit('continue', this.itemOrder)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    background-color: #fff;
    padding: 24rpx 32rpx;
    border-top: 16rpx solid $v-bg-light;
    &-head {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
    }
    &-red {
      font-size: 28rpx;
      line-height: 150%;
      color: #f20014;
    }
    &-button1 {
      padding: 10rpx 50rpx;
      border-radius: 64rpx;
      border: 2rpx solid $v-c0-25;
      box-sizing: border-box;
      color: $v-c0-85;
      font-size: 24rpx;
      //line-height: 150%;
    }
    &-button2 {
      padding: 10rpx 50rpx;
      border-radius: 64rpx;
      border: 2rpx solid #ff5319;
      box-sizing: border-box;
      color: #ff5319;
      font-size: 24rpx;
      //line-height: 150%;
    }
  }
  .placeholder {
    height: 2rpx;
    background-color: $v-bg-light;
  }
</style>
