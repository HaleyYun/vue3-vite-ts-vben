<template>
  <view>
    <view
      class="invoiceTop flex flex-vertical-c flex-justify-between"
      @click="openClick(historyItem)"
    >
      <view class="invoiceTop-time flex flex-vertical-c">
        <view> {{ historyItem.historyTime }} </view>
        <VoIcon v-if="historyItem.isOpen" name="close-arrow-t" :size="12" />
        <VoIcon v-else name="open-arrow-b" :size="12" />
      </view>
      <view class="invoiceTop-right flex flex-vertical-c">
        <view v-if="historyItem.isOpen">收起</view>
        <view v-else>展开</view>
        <VoIcon v-if="historyItem.isOpen" name="arrow-top-line" :size="16" />
        <VoIcon v-else name="arrow-bottom-line" :size="16" />
      </view>
    </view>
    <view v-if="historyItem.isOpen">
      <InvoiceHistoryItem
        v-for="(item, index) in historyItem.list"
        :key="index"
        :invoice-item="item"
        @click.native="invoiceDetailClick(item)"
      />
    </view>
  </view>
</template>

<script>
  import InvoiceHistoryItem from './InvoiceHistoryItem'
  export default {
    name: 'InvoiceHistoryTop',
    components: {
      InvoiceHistoryItem,
    },
    props: {
      historyItem: {
        type: Object,
        historyItem: {},
      },
    },
    methods: {
      openClick(data) {
        data.isOpen = !data.isOpen
      },
      /**
       * 发票详情
       */
      invoiceDetailClick(item) {
        this.$linkToEasy('/pagesSupplier/UserCenter/Invoice/HistoryInvoiceDetail?id=' + item.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceTop {
    background-color: #ffffff;
    height: 96rpx;
    line-height: 96rpx;
    padding: 0rpx 32rpx;
    &-time {
      color: $v-c0-85;
      font-size: 32rpx;
    }
    &-right {
      color: $v-c0-45;
      font-size: 24rpx;
    }
  }
</style>
