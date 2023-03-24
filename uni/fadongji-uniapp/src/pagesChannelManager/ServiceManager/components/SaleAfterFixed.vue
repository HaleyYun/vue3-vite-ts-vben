<template>
  <view class="fixed relative">
    <view class="fixed-box flex flex-row w-full bg-white">
      <view
        :class="saleAfterScreen[0].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        @click="toSaleAfterScreen(0)"
        >全部</view
      >
      <view
        :class="saleAfterScreen[1].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        @click="toSaleAfterScreen(1)"
        >进行中</view
      >
      <view
        :class="saleAfterScreen[2].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        class="flex flex-vertical-c flex-justify-c"
        @click="toSaleAfterScreen(2)"
        >已完成
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
          },
          {
            name: '进行中',
            isSelected: false,
          },
          {
            name: '已完成',
            isSelected: false,
          },
        ],
      }
    },
    methods: {
      toSaleAfterScreen(pos) {
        let i = -1
        this.saleAfterScreen.forEach((item, index) => {
          if (item.isSelected) {
            i = index
          }
          item.isSelected = false
        })
        if (i !== pos) {
          this.saleAfterScreen[pos].isSelected = true
          this.fliterVisible = false
        }
        console.log('SaleAfterFixed', pos)
        this.$emit('SaleAfterFixed', { pos: pos })
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
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
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
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
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
