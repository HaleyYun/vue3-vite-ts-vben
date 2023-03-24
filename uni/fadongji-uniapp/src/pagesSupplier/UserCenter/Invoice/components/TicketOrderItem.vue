<template>
  <view class="ticket flex flex-vertical-c">
    <VoIcon
      v-if="dataObj.selected"
      :size="24"
      color="#FF5319"
      name="select-right"
      @click="select()"
    />
    <VoIcon v-else :opacity="0.15" :size="24" color="#000000" name="circle" @click="select()" />
    <view class="m-l-8 flex1 flex flex-vertical-c">
      <view class="left flex1">
        <view class="left-row fz-28 fw-500 color-block">订单编号：{{ dataObj.id }}</view>
        <view class="left-row fz-28 color-block-65">企业名称：{{ dataObj.shopName }}</view>
        <view class="left-row fz-28 color-block-65">下单时间：{{ dataObj.createTime }}</view>
      </view>
      <view class="right">
        <VoPointPrice :price="dataObj.payAmount || 0" :show-unit="true" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TicketOrderItem',
    props: {
      dataObj: {
        type: Object,
      },
    },
    data() {
      return {
        isSelected: false,
      }
    },
    methods: {
      select() {
        this.$emit('select', this.dataObj)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket {
    background-color: #ffffff;
    padding: 32rpx;
    box-sizing: border-box;
    .left {
      &-row {
        padding-bottom: 16rpx;
      }
    }
    .fw-500 {
      font-weight: 500;
    }
  }
</style>
