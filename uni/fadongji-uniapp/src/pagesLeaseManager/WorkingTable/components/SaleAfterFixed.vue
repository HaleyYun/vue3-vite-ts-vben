<template>
  <view class="fixed relative">
    <view class="fixed-box flex flex-row w-full bg-white">
      <view
        v-for="(item, index) in saleAfterScreen"
        :key="index"
        :class="item.isSelected ? 'fixed-screen' : 'fixed-screen1'"
        @click="changeAfterSaleStatus(index)"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SalesFixed',
    props: {
      count: {
        type: Number || String,
        default: 0,
      },
    },
    data() {
      return {
        saleAfterScreen: [
          {
            name: '全部',
            isSelected: true,
            status: null,
          },
          {
            name: '进行中',
            isSelected: false,
            status: 'handle',
          },
          {
            name: '已完成',
            isSelected: false,
            status: 'complete',
          },
        ],
      }
    },
    methods: {
      changeAfterSaleStatus(index) {
        this.saleAfterScreen.forEach((item) => {
          item.isSelected = false
        })
        this.saleAfterScreen[index].isSelected = true
        this.$emit('SaleAfterFixed', this.saleAfterScreen[index].status)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fixed {
    width: 750rpx;
    &-box {
      width: 100%;
      white-space: nowrap;
      overflow-x: scroll;
      padding: 18rpx 0 18rpx 46rpx;
      box-sizing: border-box;
    }
    &-screen {
      width: 210rpx;
      text-align: center;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 0rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
      margin-right: 28rpx;
      position: relative;
    }
    &-screen1 {
      width: 210rpx;
      text-align: center;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 0rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
      margin-right: 28rpx;
      position: relative;
    }
    &-tips {
      position: absolute;
      border-radius: 16rpx;
      right: 0rpx;
      top: -32rpx;
    }
  }
</style>
