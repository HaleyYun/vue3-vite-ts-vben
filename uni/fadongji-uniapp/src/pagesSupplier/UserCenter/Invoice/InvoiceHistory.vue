<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="invoiceHistory flex flex-column"
  >
    <VoNav isHaveMore title="开票记录" />
    <VoNoData v-if="!historyList.length" no-data-tips="您还没有相关开票记录" />
    <view v-for="(item, index) in historyList" v-else :key="index">
      <view class="h16" />
      <InvoiceHistoryTop :history-item="item" />
    </view>
  </view>
</template>

<script>
  import InvoiceHistoryTop from './components/InvoiceHistoryTop'

  export default {
    components: {
      InvoiceHistoryTop,
    },
    data() {
      return {
        historyList: [],
      }
    },
    onLoad() {
      this.getInvoiceHistoryRequest()
    },
    methods: {
      //获取开票记录
      getInvoiceHistoryRequest() {
        let param = {
          pageSize: 99999999,
          pageNo: 1,
        }
        this.$VoHttp
          .apiInvoiceRecord(param)
          .then((res) => {
            if (res.code === '20001') {
              this.processInvoiceData(res.data.records)
            } else {
              uni.$u.toast(res.message || '开票记录获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '开票记录获取失败')
          })
      },
      //处理发票历史数据
      processInvoiceData(list) {
        list.forEach((item, index) => {
          if (index === 0) {
            item.isOpen = true
          } else {
            item.isOpen = false
          }
          this.historyList.push(item)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceHistory {
    width: 750rpx;
    height: 100vh;
  }
</style>
