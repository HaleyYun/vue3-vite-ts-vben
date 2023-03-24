<template>
  <view class="ticket-ex">
    <TicketItem :data-obj="ticketData" />
    <view class="ticket-ex__form">
      <view class="left"> 是否开启交换 </view>
      <view class="right">
        <u-switch v-model="isExchange" @change="switchChange" />
      </view>
    </view>
    <view class="ticket-ex__form">
      <view class="left"> 请设置交换的数量 </view>
      <view class="right">
        <u-number-box v-model="num" @change="valChange" />
      </view>
    </view>
    <view class="ticket-ex__tips">
      该优惠券设置交换数量后，其他用户同意您交换的申请后，则将您对应的优惠券数量扣除并将优惠券交换给对方，换取您需要的优惠券。
    </view>
    <view class="ticket-ex__form" @click="toPage()">
      <view class="left"> 设置您想得到的优惠券 </view>
      <view class="right"> > </view>
    </view>
    <TicketItem v-show="ticketData2.id" :data-obj="ticketData2" />
    <u-button type="primary" text="保存交换设置" @click="saveSet" />
  </view>
</template>

<script>
  import TicketItem from '../Components/TicketItem.vue'
  export default {
    name: 'TicketExPage',
    components: {
      TicketItem,
    },
    props: {},
    data() {
      return {
        ticketData: {},
        ticketData2: {},
        num: 0,
        isExchange: false,
      }
    },
    onLoad(options) {
      if (options.data) {
        let data = JSON.parse(options.data)
        this.ticketData = data
      }
      let data2 = uni.getStorageSync('exchange_ticket')
      console.log('data2', data2)
      if (data2) {
        this.ticketData2 = data2
      }
    },
    created() {},
    created() {},
    methods: {
      toPage() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedTicket/TicketList?data=' +
            JSON.stringify(this.ticketData),
        )
      },
      switchChange(e) {
        console.log('change', e)
      },
      valChange(e) {
        console.log('当前值为: ' + e.value)
      },
      saveSet() {
        uni.navigateBack({
          delta: 2,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket-ex {
    width: 750rpx;
    height: 100%;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    &__btns {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .btn-item {
        padding: 5px 10px;
        text-align: center;
        background-color: #eee;
        border-radius: 5px;
      }
    }

    &__form {
      display: flex;
      padding: 10px 0;
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
